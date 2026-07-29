# Registro de entrenamiento

App real (fuera de Claude) para que la entrenadora cargue rutinas y las
clientas registren sus entrenamientos. Es la misma app que probaste como
artifact, conectada ahora a una base de datos real (Supabase) para que
funcione de forma independiente, con su propia URL.

## 1. Crear el proyecto en Supabase (gratis)

1. Entra a https://supabase.com y crea una cuenta (puedes usar tu cuenta de
   Google).
2. Crea un **New project**. Elige cualquier nombre y una contraseña de base
   de datos (guárdala, no la necesitarás para esta app pero es buena
   práctica).
3. Cuando el proyecto termine de crearse, ve a **SQL Editor** (menú
   izquierdo) → **New query**, pega el contenido del archivo
   `supabase-schema.sql` de esta carpeta, y presiona **Run**. Esto crea la
   tabla donde vivirán las rutinas, clientas y registros.
4. Ve a **Project Settings → API**. Copia:
   - **Project URL**
   - **anon public key**

## 2. Configurar el proyecto en tu computador

Necesitas tener [Node.js](https://nodejs.org) instalado (cualquier versión
reciente, 18 o superior).

```bash
cd entrenamiento-app
npm install
cp .env.example .env
```

Abre `.env` y pega los dos valores que copiaste de Supabase:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
```

## 3. Probarla en tu computador

```bash
npm run dev
```

Abre la URL que te muestra en la terminal (normalmente
`http://localhost:5173`). Prueba crear una clienta, cargar una rutina, y
registrar una sesión — debería guardar todo en tu proyecto de Supabase (lo
puedes ver en **Table Editor → kv_store** dentro de Supabase).

## 4. Publicarla con una URL real (Vercel, gratis)

1. Sube esta carpeta a un repositorio de GitHub (puedes arrastrar los
   archivos directamente en github.com si no usas git desde la terminal).
2. Entra a https://vercel.com, crea una cuenta, y elige **Add New → Project**,
   seleccionando ese repositorio.
3. En **Environment Variables**, agrega las mismas dos variables de tu
   `.env` (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`).
4. Presiona **Deploy**. En un par de minutos te da una URL pública
   (`algo.vercel.app`) — esa es la que compartes con tus clientas.

## Notas importantes

- **Costo:** con el plan gratuito de Supabase y de Vercel, esta app no
  debería generarte costo, salvo que crezca mucho en número de clientas o
  uso. Revisa el mensaje que te di sobre límites de los planes gratuitos.
- **Seguridad:** el acceso de cada clienta (nombre + PIN) y el de la
  entrenadora (contraseña) se controlan dentro de la propia app, no con un
  sistema de login real de Supabase. Es suficiente para que nadie casual
  entre a los datos de otra persona, pero no es cifrado de nivel bancario.
  Ver el comentario en `supabase-schema.sql` para más detalle.
- Si Supabase pausa tu proyecto gratuito por inactividad (pasa tras varios
  días sin uso), solo tienes que entrar a supabase.com y reactivarlo con un
  clic.
