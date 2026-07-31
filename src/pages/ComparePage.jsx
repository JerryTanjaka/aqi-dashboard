import Panel from '../components/Panel'
import BarCities from '../components/charts/BarCities'
import StackedPollutants from '../components/charts/StackedPollutants'

const pollutants = [
  { name: 'PM2.5', desc: 'Particules fines de moins de 2,5 µm. Pénètrent profondément dans les poumons et le sang.' },
  { name: 'PM10', desc: 'Particules de moins de 10 µm : poussières, sable, combustion, érosion.' },
  { name: 'NO2', desc: "Dioxyde d'azote, issu de la combustion (trafic, industries). Irrite les voies respiratoires." },
  { name: 'O3', desc: "Ozone au niveau du sol, formé au soleil à partir d'autres polluants. Irrite les yeux et les poumons." },
  { name: 'CO', desc: "Monoxyde de carbone, gaz de combustion incomplète. Réduit l'apport d'oxygène dans le sang." },
  { name: 'SO2', desc: 'Dioxyde de soufre, émis par les combustibles soufrés (centrales, navires). Contribue aux pluies acides.' },
  { name: 'NH3', desc: 'Ammoniac, principalement agricole (engrais, élevage). Précureur de particules secondaires.' },
]

export default function ComparePage({ data }) {
  return (
    <main className="fade-in mx-auto max-w-7xl p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="AQI moyen par ville" subtitle="Trié décroissant">
          <BarCities cities={data.cities} />
        </Panel>
        <Panel title="Polluants par ville" subtitle="PM2.5 / PM10 / NO2 / O3 (µg/m³)">
          <StackedPollutants rows={data.pollutants} />
        </Panel>
      </div>
      <div className="mt-6">
        <Panel title="À quoi correspondent les polluants ?" subtitle="Unité : µg/m³ (microgrammes par mètre cube d'air)">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pollutants.map((p) => (
              <div key={p.name} className="rounded-xl border border-[var(--color-border)] p-3">
                <div className="text-sm font-semibold text-[var(--color-accent)]">{p.name}</div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </main>
  )
}
