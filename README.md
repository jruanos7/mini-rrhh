# Mini RRHH

Aplicación de gestión de recursos humanos hecha con React y TypeScript. Permite iniciar sesión, ver un dashboard con estadísticas y administrar empleados (crear, editar, filtrar y eliminar) según el rol del usuario.

## Sitio desplegado

**https://mini-rrhh-gkut.vercel.app**

> Las credenciales de acceso son las de la instancia de API-RH entregadas por el docente.
> La API de empleados corre en el plan gratuito de Render, que se "duerme" con la inactividad. Si la lista tarda en cargar la primera vez, espera cerca de un minuto y pulsa **Reintentar**.

## Tecnologías

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- React Router 7
- TanStack Query (estado del servidor)
- Zustand (sesión)
- React Hook Form + Zod (formularios y validación)
- Axios (con interceptores de errores)
- React Hot Toast (notificaciones)
- json-server (API simulada de empleados)

## Funcionalidades

- Inicio de sesión contra API-RH, con renovación del token.
- Rutas protegidas y restricción por rol (`ADMIN`, `HR_MANAGER`, `EMPLOYEE`).
- Gestión de empleados: listado, búsqueda, filtros por departamento y estado, creación, edición y cambio de estado.
- Eliminar empleados está permitido solo al rol `ADMIN`.

## Actividad 4

- **`NotFoundPage.tsx`**: página 404 con diseño propio en Tailwind y un botón para volver al dashboard. Se muestra en la ruta `*`.
- **Hook `usePageNotFound`**: usa `useLocation` de React Router y registra con `console.warn` la URL que no se encontró.
- **Error visible en `EmployeesPage`**: cuando `isError` es verdadero se muestra una card con el mensaje del error (mediante `extractErrorMessage`) y un botón **Reintentar** que ejecuta `refetch`.
- **Refactor**: el hook `useHasRole` se movió a `src/hooks/useHasRole.ts` para mantener el Fast Refresh en `RoleGuard.tsx`.

## Ejecutar en local

1. Instala las dependencias:

```bash
   npm install
```

2. Crea un archivo `.env.local` en la raíz, tomando como base `.env.example`:

```dotenv
   VITE_API_URL=http://localhost:3001
   VITE_AUTH_API_URL=<URL de la instancia de API-RH>
```

3. Levanta la API simulada de empleados (puerto 3001):

```bash
   npm run mock-api
```

4. En otra terminal, levanta la aplicación:

```bash
   npm run dev
```

## Probar la Actividad 4

- **404:** abre una ruta que no existe, por ejemplo `/algo-raro?x=1`, y revisa la consola del navegador.
- **Error visible:** con la app abierta en `/empleados`, apaga `npm run mock-api` y recarga. Aparecerá la card de error. Vuelve a encender la API y pulsa **Reintentar**.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run lint` | Revisión con ESLint |
| `npm run mock-api` | API simulada con json-server |

## Despliegue

- **Frontend:** Vercel. El archivo `vercel.json` reescribe las rutas hacia `index.html` y reenvía `/api/v1/*` a API-RH para evitar problemas de CORS.
- **API de empleados:** Render (json-server con `db.json`).
