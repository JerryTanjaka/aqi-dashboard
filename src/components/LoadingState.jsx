const skeletonCard = () => (
  <div className="min-w-45 flex-1 animate-pulse rounded-2xl border border-border bg-panel p-5 backdrop-blur">
    <div className="mb-2 h-3 w-24 rounded bg-panel-2" />
    <div className="h-8 w-32 rounded bg-panel-2" />
  </div>
)

const skeletonPanel = () => (
  <div className="min-w-80 flex-1 animate-pulse rounded-2xl border border-border bg-panel p-5 backdrop-blur">
    <div className="mb-2 h-4 w-36 rounded bg-panel-2" />
    <div className="mb-4 h-3 w-48 rounded bg-panel-2" />
    <div className="h-64 rounded bg-panel-2/60" />
  </div>
)

export default function LoadingState() {
  return (
    <main className="mx-auto max-w-7xl p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i}>{skeletonCard()}</div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i}>{skeletonPanel()}</div>
        ))}
      </div>
    </main>
  )
}
