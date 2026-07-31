# AGENTS.md — aqi-dashboard

## Contexte projet

Dashboard de qualité de l'air (AQI) pour Madagascar. Frontend React + Vite +
Tailwind CSS (compilé) + Chart.js (react-chartjs-2). Serverless Functions
Vercel (api/*.js) qui interrogent une base Postgres Neon via le package `pg`.

## Structure

- `api/*.js` — 7 fonctions serverless : `kpis`, `cities`, `timeseries`,
  `pollutants`, `missing`, `patterns` (heatmap/weekend/monthly),
  `correlations` (samples + averages)
- `lib/db.js` — pool pg partagé, `max: 3`, SSL, lit `DATABASE_URL`
- `src/main.jsx` — point d'entrée React (monte App + Chart.js register)
- `src/App.jsx` — layout, chargement des données (`loadAllData`), onglets
- `src/pages/` — 5 pages : `OverviewPage`, `ComparePage`, `QualityPage`,
  `TemporalPage` (heatmap heure×jour, weekend, mensuel), `CorrelationsPage`
  (scatter PM2.5/AQI, bar polluants, table)
- `src/components/` — TopBar, KpiCards, QualityCards, RecapTable, Panel,
  Card, LoadingState, PollutantTable
- `src/components/charts/` — CityBubble, LineChart, BarCities,
  StackedPollutants, MissingChart, Heatmap, WeekendBar, MonthlyLine,
  ScatterChart, PollutantBar
- `src/lib/api.js` — fetch des 7 endpoints (5 en parallèle + lazy pour les 2 nouvelles pages)
- `src/lib/theme.js` — palette Chart.js, noms de jours/mois FR, format de date, CSS vars
- `src/context/ThemeContext.jsx` — mode clair/sombre persistant
- `src/styles.css` — Tailwind v4, thèmes clair/sombre (`.dark`), fond en
  dégradé, tokens de couleurs (`--color-accent`, `--color-grid`, ...)
- `index.html` — entrée Vite (racine)
- `vite.config.mjs` — proxy `/api` → localhost:3000 (ESM, pas de `type: module` dans package.json sinon les fonctions serverless CommonJS cassent)
- `vercel.json` — framework vite, install/dev/build commands npm

## Commandes

- Install : `npm install`
- Dev frontend : `npm run dev` (Vite, port 5173, HMR)
- Dev API (connexion DB requise) : `npm run dev:api` (`vercel dev`, port 3000)
- Build : `npm run build`
- Deploy : `vercel --prod`
- Env vars : `vercel env add NAME production` (valeur via stdin)

## Variables d'environnement

- `DATABASE_URL` — chaîne Neon complète. **Jamais committée.** Dans `.env`
  (gitignoré) en local + `vercel env add` en production.

## Points d'attention

- **Test local** : les requêtes API locales échouent si le réseau local
  bloque le port 5432 (wifi du dev). L'hôte direct
  `ep-...-asbfmbxg.c-4...neon.tech` fonctionne, le pooler (`-pooler`)
  peut donner ETIMEDOUT.
- `channel_binding=require` dans la chaîne Neon : peut poser problème avec
  `pg`, l'omettre si échec.
- CORS ouvert (`Access-Control-Allow-Origin: *`), erreurs SQL renvoyées
  telles quelles dans les 500 (acceptable, données publiques).
- Pool limité à `max: 3` (serverless, tier Neon gratuit).
- La base ne contient aucune donnée manquante (missing_pct=0 partout) :
  `MissingChart` affiche un message quand tout est à 0.

## Déploiement actuel

- Projet Vercel : `jerrytanjakas-projects/aqi-dashboard`
- Production : https://aqi-dashboard-olive.vercel.app
- Compte : jerrytanjaka
- Repo GitHub : `JerryTanjaka/aqi-dashboard`
