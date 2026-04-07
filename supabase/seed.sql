-- Seed services (fixed UUIDs match demo UI in booking-wizard.tsx)
insert into public.services (id, name, description, duration_minutes, base_price, currency, active, sort_order)
values
  ('11111111-1111-1111-1111-111111111111', 'Bridal editorial', 'Full bridal look with skin prep and lash application.', 120, 8500, 'GHS', true, 1),
  ('22222222-2222-2222-2222-222222222222', 'Soft glam portrait', 'Camera-ready soft sculpt and luminous skin.', 90, 4200, 'GHS', true, 2),
  ('33333333-3333-3333-3333-333333333333', 'Private masterclass', 'Hands-on lesson tailored to your kit and goals.', 180, 11500, 'GHS', true, 3)
on conflict (id) do nothing;
