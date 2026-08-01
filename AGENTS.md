# AGENTS.md — aqi-dashboard

## Contexte projet

Dashboard de qualité de l'air (AQI) pour Madagascar. Frontend React + Vite +
Tailwind CSS (compilé) + Chart.js (react-chartjs-2). Serverless Functions
Vercel (api/*.js) qui interrogent une base Postgres Neon via le package `pg`.

## Structure

- `api/*.js` — 7 fonctions serverless : `kpis`, `cities`, `timeseries`,
  `pollutants`, `missing`, `patterns` (heatmap/weekend/monthly),
  `correlations` (samples + averages + matrice 8x8). Toutes acceptent les
  query params `?city=` (multi, virgule), `?from=`, `?to=` (YYYY-MM-DD).
- `lib/db.js` — pool pg partagé, `max: 3`, SSL, lit `DATABASE_URL`
- `lib/filters.js` — helper CommonJS `buildFilters`/`whereClause` : placeholders
  `$n` (pg), alias `c`=dim_city, `t`=dim_time
- `src/main.jsx` — point d'entrée React (monte App + Chart.js register)
- `src/App.jsx` — layout, chargement des données (`loadAllData`) refetché à
  chaque changement de filtres, navigation selon le mode
- `src/context/FilterContext.jsx` — état global : mode (`debutant`|`expert`),
  ville, période (présets + libres), `filtersKey`, `globalRange` (échelle santé
  figée sur le 1er chargement sans filtre)
- `src/components/FilterBar.jsx` — toggle Débutant/Expert, sélecteur ville
  (liste complète chargée à part), présets 7j/30j/90j/1an/Tout, champs from/to
- `src/pages/` — 5 pages Expert : `OverviewPage`, `ComparePage`, `QualityPage`,
  `TemporalPage` (heatmap heure×jour, weekend, mensuel), `CorrelationsPage`
  (scatter PM2.5/AQI + r, bar polluants, matrice 8x8, table). 3 pages Débutant :
  `DebutantHomePage`, `DebutantCityPage`, `DebutantTrendPage`
- `src/components/` — TopBar, FilterBar, KpiCards, QualityCards, RecapTable,
  Panel, Card, LoadingState, PollutantTable, AqiGauge, HealthBadge, ChartWhy
- `src/components/charts/` — CityBubble, LineChart, BarCities,
  StackedPollutants, MissingChart, Heatmap, WeekendBar, MonthlyLine,
  ScatterChart, PollutantBar, DonutCityShare, DonutPollutants, CorrelationsMatrix
- `src/lib/api.js` — fetch des 7 endpoints (params filtrés) + helpers `qs`
- `src/lib/theme.js` — palette Chart.js, noms de jours/mois FR, format de date, CSS vars
- `src/lib/health.js` — 5 paliers santé relatifs (min/max) + recommandations FR
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
- Les placeholders de filtres DOIVENT être `$n` (pg), jamais `?` (sinon 500).
- Plage de données réelle : 2025-08-01 → 2026-07-31 (tests from/to avec cette plage).

## Déploiement actuel

- Projet Vercel : `jerrytanjakas-projects/aqi-dashboard` (alias `aqi-std24015`)
- Production : https://aqi-std24015.vercel.app
- Compte : jerrytanjaka
- Repo GitHub : `JerryTanjaka/aqi-dashboard`
- CI/CD : l'intégration Git Vercel est connectée — un push sur `master` déclenche
  le Production Deployment automatiquement (plus besoin de `vercel --prod`).
