-- Restrict profile self-service to non-privileged fields.
revoke update on public.profiles from authenticated;
grant update (full_name, phone) on public.profiles to authenticated;
