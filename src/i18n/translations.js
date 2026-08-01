export const translations = {
  fr: {
    'brand.part1': "Qualité d'",
    'brand.part2': 'Air',
    'brand.madagascar': 'Madagascar',
    'brand.airFirst': false,

    'tab.overview': "Vue d'ensemble",
    'tab.compare': 'Comparaison villes',
    'tab.quality': 'Qualité des données',
    'tab.temporal': 'Patterns temporels',
    'tab.correlations': 'Corrélations polluants',
    'tab.accueil': 'Accueil',
    'tab.ma-ville': 'Ma ville',
    'tab.evolution': 'Évolution',

    'status.loading': 'Chargement...',
    'status.ready': 'Données à jour',
    'status.error': 'Erreur de chargement',
    'error.prefix': 'Erreur : ',
    'error.database': "Erreur : {msg}. Vérifie que DATABASE_URL est bien configurée dans les variables d'environnement Vercel.",
    'loading.patterns': 'Chargement des patterns temporels...',
    'loading.correlations': 'Chargement des corrélations...',

    'theme.light': 'Clair',
    'theme.dark': 'Sombre',
    'lang.fr': 'FR',
    'lang.en': 'EN',

    'mode.debutant': 'Débutant',
    'mode.expert': 'Expert',
    'city.all': 'Toutes les villes',
    'preset.all': 'Tout',
    'preset.7d': '7 j',
    'preset.30d': '30 j',
    'preset.90d': '90 j',
    'preset.1y': '1 an',
    'action.reset': 'Réinitialiser',

    'kpi.avg': 'AQI Moyen',
    'kpi.max': 'AQI Max',
    'kpi.count': 'Nb Mesures',
    'kpi.missing': '% Données Manquantes',
    'kpi.interpolated': 'Mesures Interpolées',
    'kpi.cities': 'Villes Couvertes',

    'table.city': 'Ville',
    'table.measurements': 'Mesures',
    'table.missing': 'Manquant',
    'table.pollutant': 'Polluant',
    'table.avg': 'Moyenne',
    'table.unit': 'Unité',

    'gauge.aqiAvg': 'AQI moyen',

    'why.title': 'Pourquoi ce graphique ? ',

    'band.bon': 'Bon',
    'band.moyen': 'Moyen',
    'band.limite': 'Limité',
    'band.mauvais': 'Mauvais',
    'band.tres-mauvais': 'Très mauvais',
    'advice.bon': 'L\u2019air est bon : profitez des activités en plein air.',
    'advice.moyen': 'Air moyen : les personnes sensibles doivent limiter les efforts prolongés.',
    'advice.limite': 'Air limité : évitez les efforts prolongés en extérieur, surtout au bord des routes.',
    'advice.mauvais': 'Air mauvais : réduisez les sorties et portez un masque si nécessaire.',
    'advice.tres-mauvais': 'Air très mauvais : restez à l\u2019intérieur autant que possible.',

    'overview.mapTitle': "Carte de la qualité de l'air à Madagascar",
    'overview.mapSubtitle': 'Couleur de chaque ville = AQI moyen (vert bon → rouge mauvais)',
    'overview.mapWhy':
      "La carte ancre immédiatement les 5 villes dans leur contexte géographique : la couleur de chaque point donne la qualité de l'air d'un coup d'œil, sans lire un tableau.",
    'overview.lineTitle': "Évolution de l'AQI",
    'overview.lineSubtitle': 'Moyenne journalière par ville',
    'overview.lineWhy':
      "La courbe est le graphique adapté à l'évolution temporelle : l'axe des dates se lit de gauche à droite et révèle la tendance de chaque ville.",
    'overview.monthlyTitle': 'AQI moyen par mois',
    'overview.monthlySubtitle': 'Moyenne mensuelle par ville',
    'overview.monthlyWhy':
      'Lisser les données par mois atténue le bruit quotidien et met en évidence les variations saisonnières.',

    'compare.barTitle': 'AQI moyen par ville',
    'compare.barSubtitle': 'Trié décroissant',
    'compare.barWhy':
      "Histogramme : la hauteur des barres rend la comparaison entre les 5 villes immédiate, précise et ordonnée.",
    'compare.stackTitle': 'Polluants par ville',
    'compare.stackSubtitle': 'PM2.5 / PM10 / NO2 / O3 (µg/m³)',
    'compare.stackWhy':
      'Les barres empilées montrent à la fois le total de pollution par ville et la part de chaque polluant.',
    'compare.donutTitle': 'Répartition moyenne des polluants',
    'compare.donutSubtitle': 'Part de chaque polluant (µg/m³)',
    'compare.donutWhy':
      "Diagramme circulaire : avec seulement 4 polluants, les parts d'un tout se comparent d'un coup d'œil, ce qu'un tableau ne permet pas.",
    'compare.glossTitle': 'À quoi correspondent les polluants ?',
    'compare.glossSubtitle': "Unité : µg/m³ (microgrammes par mètre cube d'air)",

    'pollutants.pm25.desc': 'Particules fines de moins de 2,5 µm. Pénètrent profondément dans les poumons et le sang.',
    'pollutants.pm10.desc': 'Particules de moins de 10 µm : poussières, sable, combustion, érosion.',
    'pollutants.no2.desc': "Dioxyde d'azote, issu de la combustion (trafic, industries). Irrite les voies respiratoires.",
    'pollutants.o3.desc': "Ozone au niveau du sol, formé au soleil à partir d'autres polluants. Irrite les yeux et les poumons.",
    'pollutants.co.desc': "Monoxyde de carbone, gaz de combustion incomplète. Réduit l'apport d'oxygène dans le sang.",
    'pollutants.so2.desc': 'Dioxyde de soufre, émis par les combustibles soufrés (centrales, navires). Contribue aux pluies acides.',
    'pollutants.nh3.desc': 'Ammoniac, principalement agricole (engrais, élevage). Précurseur de particules secondaires.',

    'quality.missingTitle': '% Données manquantes par ville',
    'quality.missingWhy':
      'La barre est idéale pour comparer des proportions entre villes : on repère instantanément si une ville a des données incomplètes.',
    'quality.recapTitle': 'Récap',

    'temporal.heatTitle': 'Heatmap heure × jour',
    'temporal.heatSubtitle': "Intensité de l'AQI moyen par heure (0-23h) et jour de la semaine",
    'temporal.heatWhy':
      "La heatmap est faite pour les matrices denses : l'intensité de la couleur révèle les moments critiques (pics du matin/soir) impossible à repérer dans un tableau de chiffres.",
    'temporal.weekendTitle': 'Weekend vs semaine',
    'temporal.weekendSubtitle': 'AQI moyen par ville selon is_weekend',
    'temporal.weekendWhy':
      "Les barres groupées comparent deux catégories (week-end / semaine) par ville : on mesure l'effet de l'activité humaine sur la pollution.",
    'temporal.monthlyTitle': 'Tendance mensuelle',
    'temporal.monthlySubtitle': "Évolution de l'AQI moyen par ville",
    'temporal.monthlyWhy':
      'La courbe mensuelle lisse les variations quotidiennes et dévoile les tendances saisonnières par ville.',

    'corr.scatterTitle': 'PM2.5 vs AQI',
    'corr.scatterSubtitle': 'Nuage de points, 2000 échantillons · r = {r}',
    'corr.scatterWhy':
      "Nuage de points : chaque point est une mesure réelle. Si les points s'alignent, il y a une relation — ici PM2.5 et AQI. Le coefficient r quantifie la force de cette relation (-1 à +1).",
    'corr.avgTitle': 'Moyenne globale des polluants',
    'corr.avgSubtitle': 'Trié décroissant',
    'corr.avgWhy':
      "Histogramme : la longueur des barres classe les polluants du plus au moins concentré dans l'air.",
    'corr.matrixTitle': 'Matrice de corrélations entre polluants',
    'corr.matrixSubtitle': 'r de Pearson entre 8 variables · rouge = corrélation positive, bleu = négative',
    'corr.matrixWhy':
      "La matrice résume toutes les relations deux à deux dans une grille colorée : on identifie d'un coup d'œil quels polluants varient ensemble.",
    'corr.tableTitle': 'Récapitulatif polluants',
    'corr.tableSubtitle': 'Moyenne et unité de chaque polluant',

    'home.badge': 'Madagascar · 5 villes suivies',
    'home.title': "Comment est l'air que nous respirons ?",
    'home.paragraph':
      "La pollution de l'air est la première menace environnementale pour la santé. Ce dashboard vous montre simplement la qualité de l'air dans les principales villes de Madagascar, calculée à partir de plus de 42 000 mesures. Plus le chiffre est élevé, plus l'air est pollué.",
    'home.mapTitle': "Où est l'air bon ou mauvais ?",
    'home.mapSubtitle': "Carte de Madagascar · couleur de chaque ville = qualité de l'air",
    'home.mapWhy':
      "La carte montre directement où il fait bon respirer : plus le point est vert, mieux c'est ; plus il est rouge, plus il faut être prudent.",
    'home.stateTitle': "État de l'air en ce moment",
    'home.stateSubtitle': 'Moyenne globale sur la période choisie',
    'home.stateWhy':
      "La jauge donne l'état de l'air en un coup d'œil : un seul chiffre, une seule couleur, aucune lecture technique nécessaire.",
    'home.bestTitle': 'Où respire-t-on le mieux ?',
    'home.bestSubtitle': "Classement des villes selon l'AQI moyen",
    'home.sourceTitle': "D'où viennent les mesures ?",
    'home.sourceSubtitle': 'Part des mesures de chaque ville',
    'home.sourceWhy':
      "Diagramme circulaire : quand il y a peu de parts (5 villes), le cercle montre d'un coup d'œil la contribution de chacune.",

    'mycity.title': 'Ma ville',
    'mycity.empty':
      'Choisissez une ville dans le filtre ci-dessus pour voir sa qualité de l\u2019air et les recommandations adaptées.',
    'mycity.subtitle': "Qualité de l'air moyenne sur la période choisie",
    'mycity.trendTitle': 'Évolution récente',
    'mycity.trendSubtitle': 'Moyenne journalière',
    'mycity.trendWhy': "Une courbe montre la tendance dans le temps : on repère vite si l'air s'améliore ou se dégrade.",

    'trend.title': "Comment l'air évolue ?",
    'trend.subtitle': "Moyenne journalière de l'AQI",
    'trend.why':
      'Une courbe par jour montre les variations : les sommets correspondent aux jours plus pollués, les creux aux jours plus sains.',
    'trend.monthTitle': "D'un mois à l'autre",
    'trend.monthSubtitle': 'Moyenne mensuelle',

    'chart.aqiAvg': 'AQI moyen',
    'chart.weekday': 'Semaine',
    'chart.weekend': 'Weekend',
    'heatmap.noData': 'Pas de donnée',
    'missing.none': 'Aucune donnée manquante',
    'missing.noneSub': 'Toutes les villes ont des mesures complètes',
  },

  en: {
    'brand.part1': 'Air',
    'brand.part2': 'Quality',
    'brand.madagascar': 'Madagascar',
    'brand.airFirst': true,

    'tab.overview': 'Overview',
    'tab.compare': 'City comparison',
    'tab.quality': 'Data quality',
    'tab.temporal': 'Temporal patterns',
    'tab.correlations': 'Pollutant correlations',
    'tab.accueil': 'Home',
    'tab.ma-ville': 'My city',
    'tab.evolution': 'Trend',

    'status.loading': 'Loading...',
    'status.ready': 'Data up to date',
    'status.error': 'Loading error',
    'error.prefix': 'Error: ',
    'error.database': 'Error: {msg}. Make sure DATABASE_URL is set in the Vercel environment variables.',
    'loading.patterns': 'Loading temporal patterns...',
    'loading.correlations': 'Loading correlations...',

    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'lang.fr': 'FR',
    'lang.en': 'EN',

    'mode.debutant': 'Beginner',
    'mode.expert': 'Expert',
    'city.all': 'All cities',
    'preset.all': 'All',
    'preset.7d': '7 d',
    'preset.30d': '30 d',
    'preset.90d': '90 d',
    'preset.1y': '1 y',
    'action.reset': 'Reset',

    'kpi.avg': 'Average AQI',
    'kpi.max': 'Max AQI',
    'kpi.count': 'Measurements',
    'kpi.missing': '% Missing data',
    'kpi.interpolated': 'Interpolated measurements',
    'kpi.cities': 'Cities covered',

    'table.city': 'City',
    'table.measurements': 'Measurements',
    'table.missing': 'Missing',
    'table.pollutant': 'Pollutant',
    'table.avg': 'Average',
    'table.unit': 'Unit',

    'gauge.aqiAvg': 'Avg AQI',

    'why.title': 'Why this chart? ',

    'band.bon': 'Good',
    'band.moyen': 'Moderate',
    'band.limite': 'Limited',
    'band.mauvais': 'Poor',
    'band.tres-mauvais': 'Very poor',
    'advice.bon': 'The air is good: enjoy outdoor activities.',
    'advice.moyen': 'Moderate air: sensitive people should limit prolonged exertion.',
    'advice.limite': 'Limited air: avoid prolonged outdoor exertion, especially near busy roads.',
    'advice.mauvais': 'Poor air: reduce outings and wear a mask if necessary.',
    'advice.tres-mauvais': 'Very poor air: stay indoors as much as possible.',

    'overview.mapTitle': 'Air quality map of Madagascar',
    'overview.mapSubtitle': 'City color = average AQI (green good → red poor)',
    'overview.mapWhy':
      'The map instantly anchors the 5 cities in their geographic context: each dot\u2019s color shows air quality at a glance, without reading a table.',
    'overview.lineTitle': 'AQI evolution',
    'overview.lineSubtitle': 'Daily average per city',
    'overview.lineWhy':
      'The line is the chart for time evolution: the date axis reads left to right and reveals each city\u2019s trend.',
    'overview.monthlyTitle': 'Average AQI by month',
    'overview.monthlySubtitle': 'Monthly average per city',
    'overview.monthlyWhy': 'Smoothing data by month dampens daily noise and highlights seasonal variations.',

    'compare.barTitle': 'Average AQI by city',
    'compare.barSubtitle': 'Sorted descending',
    'compare.barWhy': 'Bar chart: bar height makes comparing the 5 cities immediate, precise and ordered.',
    'compare.stackTitle': 'Pollutants by city',
    'compare.stackSubtitle': 'PM2.5 / PM10 / NO2 / O3 (µg/m³)',
    'compare.stackWhy': 'Stacked bars show both the total pollution per city and each pollutant\u2019s share.',
    'compare.donutTitle': 'Average pollutant distribution',
    'compare.donutSubtitle': 'Share of each pollutant (µg/m³)',
    'compare.donutWhy':
      'Donut chart: with only 4 pollutants, the parts of a whole compare at a glance, which a table cannot.',
    'compare.glossTitle': 'What do the pollutants correspond to?',
    'compare.glossSubtitle': 'Unit: µg/m³ (micrograms per cubic meter of air)',

    'pollutants.pm25.desc': 'Fine particles under 2.5 µm. Penetrate deep into the lungs and bloodstream.',
    'pollutants.pm10.desc': 'Particles under 10 µm: dust, sand, combustion, erosion.',
    'pollutants.no2.desc': 'Nitrogen dioxide from combustion (traffic, industry). Irritates the airways.',
    'pollutants.o3.desc': 'Ground-level ozone, formed in sunlight from other pollutants. Irritates eyes and lungs.',
    'pollutants.co.desc': 'Carbon monoxide, a product of incomplete combustion. Reduces oxygen in the blood.',
    'pollutants.so2.desc': 'Sulfur dioxide from sulfur-containing fuels (power plants, ships). Contributes to acid rain.',
    'pollutants.nh3.desc': 'Ammonia, mainly agricultural (fertilizers, livestock). Precursor of secondary particles.',

    'quality.missingTitle': '% Missing data by city',
    'quality.missingWhy':
      'A bar chart is ideal for comparing proportions between cities: you instantly spot a city with incomplete data.',
    'quality.recapTitle': 'Summary',

    'temporal.heatTitle': 'Hour × day heatmap',
    'temporal.heatSubtitle': 'Average AQI intensity by hour (0-23) and day of week',
    'temporal.heatWhy':
      'A heatmap suits dense matrices: color intensity reveals critical moments (morning/evening peaks) impossible to spot in a table of numbers.',
    'temporal.weekendTitle': 'Weekend vs weekday',
    'temporal.weekendSubtitle': 'Average AQI by city by is_weekend',
    'temporal.weekendWhy':
      'Grouped bars compare two categories (weekend / weekday) per city: you measure the effect of human activity on pollution.',
    'temporal.monthlyTitle': 'Monthly trend',
    'temporal.monthlySubtitle': 'Average AQI evolution by city',
    'temporal.monthlyWhy': 'The monthly line smooths daily variations and reveals seasonal trends per city.',

    'corr.scatterTitle': 'PM2.5 vs AQI',
    'corr.scatterSubtitle': 'Scatter plot, 2000 samples · r = {r}',
    'corr.scatterWhy':
      'Scatter plot: each dot is a real measurement. If dots align, there is a relationship — here PM2.5 and AQI. The r coefficient quantifies its strength (-1 to +1).',
    'corr.avgTitle': 'Global pollutant averages',
    'corr.avgSubtitle': 'Sorted descending',
    'corr.avgWhy': 'Bar chart: bar length ranks pollutants from most to least concentrated in the air.',
    'corr.matrixTitle': 'Correlation matrix between pollutants',
    'corr.matrixSubtitle': 'Pearson\u2019s r across 8 variables · red = positive correlation, blue = negative',
    'corr.matrixWhy':
      'The matrix summarizes all pairwise relationships in a colored grid: you identify at a glance which pollutants vary together.',
    'corr.tableTitle': 'Pollutant summary',
    'corr.tableSubtitle': 'Average and unit of each pollutant',

    'home.badge': 'Madagascar · 5 cities monitored',
    'home.title': 'How is the air we breathe?',
    'home.paragraph':
      'Air pollution is the top environmental threat to health. This dashboard simply shows air quality in Madagascar\u2019s main cities, computed from more than 42,000 measurements. The higher the number, the more polluted the air.',
    'home.mapTitle': 'Where is the air good or bad?',
    'home.mapSubtitle': 'Map of Madagascar · city color = air quality',
    'home.mapWhy':
      'The map directly shows where breathing is good: the greener the dot, the better; the redder, the more caution needed.',
    'home.stateTitle': 'Current air status',
    'home.stateSubtitle': 'Overall average over the selected period',
    'home.stateWhy':
      'The gauge shows air status at a glance: one number, one color, no technical reading needed.',
    'home.bestTitle': 'Where is the air best?',
    'home.bestSubtitle': 'City ranking by average AQI',
    'home.sourceTitle': 'Where do the measurements come from?',
    'home.sourceSubtitle': 'Share of measurements per city',
    'home.sourceWhy':
      'Donut chart: with few slices (5 cities), the circle shows each one\u2019s contribution at a glance.',

    'mycity.title': 'My city',
    'mycity.empty':
      'Pick a city in the filter above to see its air quality and tailored recommendations.',
    'mycity.subtitle': 'Average air quality over the selected period',
    'mycity.trendTitle': 'Recent trend',
    'mycity.trendSubtitle': 'Daily average',
    'mycity.trendWhy': 'A line shows the trend over time: you quickly see whether the air is improving or worsening.',

    'trend.title': 'How is the air evolving?',
    'trend.subtitle': 'Daily average AQI',
    'trend.why': 'A daily line shows variations: peaks are more polluted days, valleys are healthier days.',
    'trend.monthTitle': 'Month over month',
    'trend.monthSubtitle': 'Monthly average',

    'chart.aqiAvg': 'Average AQI',
    'chart.weekday': 'Weekday',
    'chart.weekend': 'Weekend',
    'heatmap.noData': 'No data',
    'missing.none': 'No missing data',
    'missing.noneSub': 'All cities have complete measurements',
  },
}
