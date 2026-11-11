-- MediFlow AI initial schema for Supabase/PostgreSQL.
-- Apply with: supabase db push (after linking the intended Supabase project).

create extension if not exists pgcrypto;
create extension if not exists btree_gist;

create type public.app_role as enum ('patient', 'doctor', 'receptionist', 'admin');
create type public.appointment_status as enum ('pending', 'confirmed', 'checked_in', 'completed', 'cancelled', 'no_show');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  role public.app_role not null default 'patient',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.doctors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  department_id uuid not null references public.departments(id),
  specialization text not null,
  consultation_minutes integer not null default 30 check (consultation_minutes between 5 and 240),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.doctor_availability (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  is_available boolean not null default true,
  check (ends_at > starts_at),
  unique (doctor_id, starts_at, ends_at)
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.profiles(id),
  doctor_id uuid not null references public.doctors(id),
  department_id uuid not null references public.departments(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.appointment_status not null default 'confirmed',
  booking_note text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at),
  constraint appointments_doctor_no_overlap
    exclude using gist (doctor_id with =, tstzrange(starts_at, ends_at, '[)') with &&)
    where (status <> 'cancelled')
);

create index appointments_patient_starts_idx on public.appointments(patient_id, starts_at desc);
create index appointments_doctor_starts_idx on public.appointments(doctor_id, starts_at);
create index doctor_availability_doctor_starts_idx on public.doctor_availability(doctor_id, starts_at);

create or replace function public.current_app_role()
returns public.app_role
language sql stable security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_staff()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce(public.current_app_role() in ('doctor', 'receptionist', 'admin'), false)
$$;

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce(public.current_app_role() = 'admin', false)
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), new.raw_user_meta_data->>'phone');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.departments enable row level security;
alter table public.doctors enable row level security;
alter table public.doctor_availability enable row level security;
alter table public.appointments enable row level security;

create policy "Users can read their own profile" on public.profiles
for select to authenticated using (id = auth.uid() or public.is_admin());

create policy "Users can update their own basic profile" on public.profiles
for update to authenticated using (id = auth.uid()) with check (id = auth.uid() and role = public.current_app_role());

create policy "Staff can read profiles" on public.profiles
for select to authenticated using (public.is_staff());

create policy "Authenticated users can read active departments" on public.departments
for select to authenticated using (is_active or public.is_staff());

create policy "Admins manage departments" on public.departments
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Authenticated users can read active doctors" on public.doctors
for select to authenticated using (is_active or public.is_staff());

create policy "Admins manage doctors" on public.doctors
for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Authenticated users can read availability" on public.doctor_availability
for select to authenticated using (true);

create policy "Doctors manage own availability" on public.doctor_availability
for all to authenticated using (
  exists (select 1 from public.doctors d where d.id = doctor_id and d.profile_id = auth.uid())
  or public.is_admin()
) with check (
  exists (select 1 from public.doctors d where d.id = doctor_id and d.profile_id = auth.uid())
  or public.is_admin()
);

create policy "Patients read own appointments; staff read all" on public.appointments
for select to authenticated using (patient_id = auth.uid() or public.is_staff());

create policy "Patients and staff can create appointments" on public.appointments
for insert to authenticated with check (
  (patient_id = auth.uid() and created_by = auth.uid())
  or public.is_staff()
);

create policy "Patients cancel own appointments; staff manage appointments" on public.appointments
for update to authenticated using (
  (patient_id = auth.uid() and status in ('pending', 'confirmed'))
  or public.is_staff()
) with check (
  (patient_id = auth.uid() and status = 'cancelled')
  or public.is_staff()
);

-- The exclusion constraint above is the final concurrency guard: two simultaneous
-- requests cannot reserve overlapping time for the same doctor.
-- The application must validate doctor availability and authorization before insert.
