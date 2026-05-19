# Elconekt — Alsarh System

Sales & Container Operations management app for Elconekt. Bilingual (English / Arabic with RTL), light theme, LYD currency with USD shown alongside.

## Run locally

The app is a static React build using in-browser Babel — no toolchain required. Serve the folder over HTTP and open `Elconekt.html`.

```bash
npx http-server . -p 5173 -c-1
# then open http://localhost:5173/Elconekt.html
```

`file://` won't work because the entry point loads `app/*.jsx` modules via `<script src>`, which browsers block from disk.

## Structure

```
Elconekt.html              Entry shell — loads React UMD + Babel standalone + all app modules
Container Management.html  Standalone container-management page
app/
  i18n.jsx                 English + Arabic strings, RTL handling
  data.jsx                 Mock dataset (containers, inventory, clients, invoices)
  ui.jsx                   Shared primitives — icons, buttons, avatar, tokens
  shell.jsx                App provider, sidebar, topbar, routing, role state
  view-overview.jsx        Overview + Reports views
  view-containers.jsx      Container list + detail (dual USD/LYD rate)
  view-inventory.jsx       Inventory view
  view-clients.jsx         Clients view
  view-invoices.jsx        Invoices view
assets/
  elconekt-logo.png        Brand mark
```

## Roles

- **Admin** — full access (Overview, Containers, Reports + everything else)
- **Sales** — Inventory, Clients, Invoices only

Toggle role from the sidebar.

## Design

- Brand navy `#0a1838`, accent blue `#1d4ed8`
- Inter for UI text, IBM Plex Sans Arabic for Arabic, JetBrains Mono for all financial figures
- Per-container locked USD/LYD rate drives all cost and profit calculations
