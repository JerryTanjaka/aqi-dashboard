# AGENTS.md — aqi-dashboard

## Contexte projet

Dashboard de qualité de l'air (AQI) pour Madagascar. Frontend statique
(public/index.html, Chart.js) + Serverless Functions Vercel (api/*.js) qui
interrogent une base Postgres Neon via le package `pg`.

## Structure

- `api/kpis.js` — AQI moyen/max, nb mesures, % manquant, nb interpolé
- `api/cities.js` — AQI moyen par ville (city_name, lat, lon)
- `api/timeseries.js` — évolution journalière de l'AQI par ville
- `api/pollutants.js` — moyennes pm2_5, pm10, no2, o3, co, so2, nh3 par ville
- `api/missing.js` — % données manquantes + interpolées par ville
- `lib/db.js` — pool pg partagé, `max: 3`, SSL, lit `DATABASE_URL`
- `public/index.html` — frontend, fetch `/api/*`, 3 onglets Chart.js

## Base de données (Neon Postgres)

- `fact_air_quality` (fact_id, city_id, time_id, dt, aqi, co, no, no2, o3,
  so2, pm2_5, pm10, nh3, has_missing_pollutant, dt_interpolated, inserted_at)
- `dim_city` (city_id, city_name, lat, lon, country)
- `dim_time` (time_id, full_date, hour, year, month, month_name, day,
  day_of_week, day_name, is_weekend)

## Commandes

- Install : `npm install`
- Dev local : `vercel dev` (charge `.env`, serveur sur http://localhost:3000)
- Deploy : `vercel --prod`
- Env vars : `vercel env add NAME production` (valeur via stdin)

## Variables d'environnement

- `DATABASE_URL` — chaîne Neon complète. **Jamais committée.** Dans `.env`
  (gitignoré) en local + `vercel env add` en production.

## Points d'attention

- Le pooler Neon (`-pooler`) peut être injoignable selon le réseau :
  utiliser l'hôte direct `ep-...-asbfmbxg.c-4...neon.tech` si ETIMEDOUT.
- `channel_binding=require` dans la chaîne Neon : peut poser problème avec
  `pg`, l'omettre si échec.
- CORS ouvert (`Access-Control-Allow-Origin: *`), erreurs SQL renvoyées
  telles quelles dans les 500 (acceptable, données publiques).
- Pool limité à `max: 3` (serverless, tier Neon gratuit).

## Déploiement actuel

- Projet Vercel : `jerrytanjakas-projects/aqi-dashboard`
- Production : https://aqi-dashboard-olive.vercel.app
- Compte : jerrytanjaka
