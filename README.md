## Note App

A small, fast notes app where you can:

- Create notes with a title, content, date, and priority.
- Switch between grid and list views.
- Reorder notes with drag-and-drop (within their group).
- Mark notes open or completed.
- Sign up/log in (simple email + password). Auth state is stored in the `user` cookie.

### Tech

- **Next.js (App Router)** with React 19 and Turbopack dev server
- **Tailwind CSS v4** and `next-themes` for theming
- **Radix UI** dialogs, **lucide-react** icons
- **react-hook-form** + **zod** validation
- **axios** for API calls

### Requirements

- Node 18+ recommended
- An API base URL exposed as `NEXT_PUBLIC_API_URL`

Create a `.env.local` in the project root:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

The app expects endpoints like:

- `POST /Users` → create user
- `GET /Users/:UserId/Notes` → list notes
- `POST /Users/:UserId/Notes` → create note
- `PUT /Users/:UserId/Notes/:id` → update note or status
- `DELETE /Users/:UserId/Notes/:id` → delete note

See `src/lib/endpoints.ts` for exact calls.

### Run it

```bash
npm install
npm run dev
# or: pnpm install && pnpm dev
```

Open `http://localhost:3000`.

### How to use

1. Click Sign Up and create an account (email + password). You’ll be logged in automatically.
2. Add a note from the header. Pick a date and priority.
3. Toggle a note’s status (open/completed) with the checkbox icon.
4. Reorder by dragging notes within their group:
   - Grid view: within the same priority column
   - List view: within each status/priority group
5. Switch between Grid/List using the toggle in the header actions.

### Scripts

- `dev` — start the dev server
- `build` — production build
- `start` — start the production server
- `lint` — run ESLint

### Project map (quick)

- `src/app/(main)` — main UI
- `src/app/(auth)` — login/sign up
- `src/actions` — server actions for auth and notes
- `src/lib` — axios client, endpoints, utilities
- `src/components` — UI, notes, and layout components

### Notes on data

Notes are normalized in server actions. Priority is one of `urgent | high | low`. Status is `open | completed`. Dates from the API are stored as unix seconds and converted to `Date` objects in the UI.

### License

No license specified. Use at your own discretion.
