# AUCA Summer App — Time Management PWA

Production PWA for international students and host families: schedule, diary, survival guide, and real-time family visibility — without changing backend schema during refactors.

**Stack:** React 18 · TypeScript · Vite 5 · Tailwind CSS · Framer Motion · Firebase Firestore · Zustand · i18next · PWA · `@vitejs/plugin-legacy` (Android 5+)

---

## Problem & solution

| Challenge | Approach |
|-----------|----------|
| Two audiences (student vs family) with different permissions | Role-based onboarding, PIN for family, separate UI copy (RU/EN) |
| Offline / demo use without Firebase | Demo mode in repositories + localStorage fallback |
| Old Android WebViews (white screen) | Legacy bundle + polyfills, `cssTarget: chrome49`, boot error fallback |
| Live production — schema must stay stable | Repository layer; collections and field names unchanged |

---

## User roles

- **Student** — creates personal schedule events, writes diary entries, receives reminders, shares presence with family.
- **Family** — read-only view of student activity, preferences alerts, schedule overview (no diary editing).

---

## Architecture

```
src/
├── pages/              # Thin route shells (lazy-loaded)
├── features/           # Domain UI modules
│   ├── dashboard/
│   ├── schedule/
│   ├── diary/
│   └── welcome/
├── repositories/       # Firestore I/O + demo mode (no React)
├── hooks/              # Data & side-effect hooks
├── components/ui/      # Design system (Button, Card, Toast, …)
├── contexts/           # App, theme, toast
└── store/              # Zustand (role, user id, cached slices)
```

**Data flow:** Page → feature hook → repository → Firestore (or demo storage).

---

## Firestore (read-only overview)

| Collection / doc | Purpose |
|------------------|---------|
| `events` | Schedule events (student + admin seed data) |
| `diary_entries` | Student mood + journal entries |
| `users/student_profile` | Display name and profile metadata |

> Field names and collection IDs are frozen for production compatibility. New features should extend via repositories, not renames.

---

## Scripts

```bash
npm install
npm run dev          # local dev server
npm run build        # tsc + Vite + PWA service worker
npm run preview      # preview production build
npm run deploy       # Vercel production (if configured)
npm run check:firebase
npm run seed:events  # seed events (requires Firebase env)
```

Copy `.env.example` → `.env` with Firebase config before connecting to a real project.

---

## Browser support

- Modern browsers: ES modules + PWA install
- Legacy: `Android >= 5`, no IE11 — separate legacy chunks in `dist/`
- Service worker is ES-only; very old WebViews may skip SW but still load the legacy app bundle

---

## Screenshots checklist (portfolio)

- [ ] Welcome — role selection (glass + gradients)
- [ ] Dashboard — hero, stats, upcoming events
- [ ] Schedule — week view + add event modal
- [ ] Diary — impressions + preferences tabs
- [ ] Settings — notifications & PWA install
- [ ] Dark mode side-by-side

---

## Deploy notes

1. Set Firebase env vars on the host (Vercel / Firebase Hosting).
2. `npm run build` — verify `dist/` includes `*-legacy-*` chunks if targeting old Android.
3. PWA manifest and icons live in `public/`; SW built from `src/sw.ts`.
4. Smoke test after deploy: `/` onboarding, `/dashboard`, `/schedule`, `/diary` for both roles.

---

## License

Private — client project. Contact owner for reuse terms.
