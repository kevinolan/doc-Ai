-- Enforce booking rules in the database, not in the language model or browser.
revoke insert on public.appointments from authenticated;
revoke update on public.appointments from authenticated;
grant update (status) on public.appointments to authenticated;

create or replace function public.book_appointment(
  p_doctor_id uuid,
  p_starts_at timestamptz,
  p_ends_at timestamptz,
  p_booking_note text default null,
  p_patient_id uuid default null
)
returns public.appointments
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor uuid := auth.uid();
  v_role public.app_role;
  v_patient uuid;
  v_department uuid;
  v_duration integer;
  v_result public.appointments;
begin
  if v_actor is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  v_role := public.current_app_role();
  if v_role is null then
    raise exception 'Profile not found' using errcode = '42501';
  end if;

  if v_role in ('doctor', 'receptionist', 'admin') then
    v_patient := coalesce(p_patient_id, v_actor);
  else
    if p_patient_id is not null and p_patient_id <> v_actor then
      raise exception 'Patients may only book for themselves' using errcode = '42501';
    end if;
    v_patient := v_actor;
  end if;

  select d.department_id, d.consultation_minutes
    into v_department, v_duration
  from public.doctors d
  where d.id = p_doctor_id and d.is_active = true;

  if not found then
    raise exception 'Doctor is not available for booking' using errcode = 'P0002';
  end if;

  if p_ends_at <= p_starts_at
     or p_ends_at <> p_starts_at + make_interval(mins => v_duration) then
    raise exception 'Appointment duration is invalid' using errcode = '22007';
  end if;

  if not exists (
    select 1 from public.doctor_availability a
    where a.doctor_id = p_doctor_id
      and a.is_available = true
      and a.starts_at <= p_starts_at
      and a.ends_at >= p_ends_at
  ) then
    raise exception 'Requested time is outside the doctor availability' using errcode = 'P0001';
  end if;

  insert into public.appointments (
    patient_id, doctor_id, department_id, starts_at, ends_at,
    status, booking_note, created_by
  ) values (
    v_patient, p_doctor_id, v_department, p_starts_at, p_ends_at,
    'confirmed', nullif(trim(p_booking_note), ''), v_actor
  )
  returning * into v_result;

  return v_result;
exception
  when exclusion_violation then
    raise exception 'This appointment slot has just been booked. Please choose another time.' using errcode = '23P01';
end;
$$;

revoke all on function public.book_appointment(uuid, timestamptz, timestamptz, text, uuid) from public;
grant execute on function public.book_appointment(uuid, timestamptz, timestamptz, text, uuid) to authenticated;
