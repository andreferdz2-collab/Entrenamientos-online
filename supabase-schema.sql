-- Ejecuta esto una vez en Supabase: Project -> SQL Editor -> New query -> pega y "Run"

create table if not exists kv_store (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

alter table kv_store enable row level security;

-- Esta app no usa un login "de verdad" (Supabase Auth) — el acceso de cada
-- clienta se controla con nombre+PIN dentro de la propia app, y el de la
-- entrenadora con su contraseña. Por eso la política de abajo permite leer y
-- escribir a cualquiera que tenga la URL pública de tu proyecto (la clave
-- "anon"). Es el mismo nivel de protección que ya tenía la versión de
-- Claude: PIN/contraseña dentro de la app, pero no cifrado a nivel de base
-- de datos. Si más adelante quieres subir el nivel de seguridad, el
-- siguiente paso natural es migrar a Supabase Auth real por clienta.
create policy "acceso publico app entrenamiento"
  on kv_store
  for all
  using (true)
  with check (true);
