# AQI Dashboard — déploiement Vercel

## Structure
```
aqi-dashboard/
├── api/                # Serverless functions (Node)
│   ├── kpis.js
│   ├── cities.js
│   ├── timeseries.js
│   ├── pollutants.js
│   └── missing.js
├── lib/
│   └── db.js           # Pool Postgres partagé
├── public/
│   └── index.html       # Frontend (fetch vers /api/*)
├── package.json
└── .gitignore
```

## 1. Test en local

```bash
npm install
npm i -g vercel        # si pas déjà installé
vercel dev
```

Crée un fichier `.env` local (jamais commité, déjà dans .gitignore) :
```
DATABASE_URL=postgresql://neondb_owner:TON_MDP@ep-xxxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

`vercel dev` charge automatiquement `.env`. Ouvre http://localhost:3000

## 2. Déploiement

```bash
vercel login
vercel
```

Suis les prompts (nouveau projet, garde les defaults).

## 3. Variable d'environnement en production — ÉTAPE CRITIQUE

Le déploiement va échouer côté API (erreur 500 sur /api/*) tant que la variable
n'est pas configurée sur Vercel lui-même (le `.env` local ne suit pas en prod) :

```bash
vercel env add DATABASE_URL
```
Colle ta connection string Neon complète (avec `sslmode=require`), choisis
l'environnement **Production** (et Preview si tu veux tester les branches).

Puis redéploie pour que la variable soit prise en compte :
```bash
vercel --prod
```

## 4. Vérifier que ça marche

Une fois déployé, teste direct une route API dans le navigateur :
```
https://TON-PROJET.vercel.app/api/kpis
```
Tu dois voir du JSON (`avg_aqi`, `max_aqi`, etc.), pas une erreur 500.
Si erreur 500 → vérifie la variable DATABASE_URL (étape 3), et vérifie les
logs avec `vercel logs TON-PROJET.vercel.app`.

## Notes

- Le pool Postgres est limité à `max: 3` connexions par fonction (lib/db.js) car
  chaque route est une lambda séparée — en cas de pic de requêtes simultanées,
  augmente cette valeur seulement si Neon te le permet (tier gratuit limité).
- CORS est ouvert (`Access-Control-Allow-Origin: *`) pour simplifier — pas un
  souci ici puisque les données AQI sont publiques.
- Si `dim_city`/`dim_time` sont vides ou les noms diffèrent, adapte les
  requêtes SQL dans `api/*.js` (les noms de colonnes utilisés : city_name,
  lat, lon, full_date, aqi, pm2_5, pm10, no2, o3, co, so2, nh3,
  has_missing_pollutant, dt_interpolated).
