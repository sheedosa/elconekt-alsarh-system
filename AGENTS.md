# Elconekt — Alsarh System

Static React app for Elconekt's sales and container operations. Bilingual
English / Arabic with RTL, light theme, LYD with USD shown alongside.

## No build step

`Elconekt.html` loads React and Babel standalone from a CDN, then the nine
`app/*.jsx` files as `<script type="text/babel">`. There is no bundler, no
`package.json`, and no test suite. Edit the `.jsx` files directly.

Serve over HTTP — `file://` will not work, because browsers block the
`app/*.jsx` module loads from disk:

```bash
npx http-server . -p 5173 -c-1
# then open http://localhost:5173/Elconekt.html
```

`Container Management.html` is an orphaned second entry point: it references
`mockdata.jsx`, `design-canvas.jsx`, `direction-a/b/c.jsx` and `canvas.jsx`,
none of which exist in the repo. It is dead — do not treat it as a working page.

## Conventions

- All state is in-memory `useState` seeded from the mock dataset in
  `app/data.jsx`; nothing persists, and a reload resets everything.
- Modules communicate through globals on `window` (`window.ELK`,
  `window.ELK_I18N`, `window.MODAL_REGISTRY`) — there is no module system.
- User-facing strings live in `app/i18n.jsx` and must be added in **both**
  `en` and `ar`.
- `app/shell.jsx` holds the app provider, routing and the `useIsMobile(768)`
  hook the responsive layout branches on.

## Commit identity

Commits in this repo are authored **`Claude <noreply@anthropic.com>`**, which is
the configured global git identity and the GitHub user `claude`. Just commit —
do not set the identity.

- **Never** pass `-c user.name` / `-c user.email` / `--author` to git.
- **Never** use the operator's Claude-account address (e.g. the value of
  `CLAUDE_CODE_USER_EMAIL`) as the author. That address belongs to whoever is
  driving the session and has nothing to do with this project.

An explicit `-c` override beats every config file, so nothing in this repo can
stop you — the rule is the only guard. An author GitHub cannot resolve to an
account lands the commit as Unverified, because signing is mandatory and the key
is registered to `noreply@anthropic.com`. In the sibling repo
`elconekt-alsarh-v2` it additionally causes Vercel to refuse the preview build
with "Deployment was blocked", about a second after the push and before any
build output exists.
