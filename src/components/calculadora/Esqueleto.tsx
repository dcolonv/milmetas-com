/** What the server sends in place of the calculator: same footprint, no numbers. */
export function Esqueleto() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" aria-busy="true">
      <div className="min-h-[640px] rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <p className="font-display text-xl font-bold">Tu meta</p>
        <p className="mt-2 text-muted">Cargando la calculadora…</p>
      </div>
      <div className="min-h-[640px] rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <p className="font-display text-xl font-bold">Tu plan</p>
        <p className="mt-2 text-muted">
          En un momento verás aquí el ritmo por día, semana y mes, y si vas a tiempo.
        </p>
      </div>
    </div>
  );
}
