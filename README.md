# ATS-NG — Secure Hiring Platform

React 19 + TypeScript + MUI 6 + Vite 5 implementation of the ATS-NG recruitment dashboard.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript strict |
| Build | Vite 5 |
| UI | MUI 6 (`@mui/material`) |
| Styling | `@mui/styles` makeStyles exclusively |
| Routing | React Router v6 |
| Charts | Recharts |

## Project Structure

```
src/
├── main.tsx          Entry point (StrictMode)
├── App.tsx           Router + ThemeProvider
├── theme.tsx         MUI theme (palette, typography, component overrides)
└── pages/
    ├── Layout/       MainLayout.tsx + MainLayout.style.ts
    ├── Login/        Login.tsx + Login.style.ts
    ├── Dashboard/    Dashboard.tsx + Dashboard.style.ts
    ├── Vacancy/      Vacancy.tsx + Vacancy.style.ts
    └── Application/  Application.tsx + Application.style.ts
```

## Routes

| Path | Page |
|------|------|
| `/` | → redirect to `/login` |
| `/login` | Login page |
| `/dashboard` | Home dashboard |
| `/vacancy/:id` | Vacancy detail |
| `/application/:id` | Application detail |

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev        # dev server at http://localhost:5173
npm run build      # production build
npx tsc --noEmit   # type check
```

On the login page click **Sign in** (any credentials) to enter the app.

## Key Notes

- All styles use `makeStyles` from `@mui/styles` — no `styled()`, no CSS files
- Grid layouts use `Grid2` (aliased as `Grid`) for the `size` responsive prop
- `@mui/icons-material` must stay at `^6.x` to match `@mui/material@6`
- WCAG 2.1 AA: all interactive elements have aria-labels, keyboard nav, skip link
