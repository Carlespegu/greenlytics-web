import BackofficeListHeader from '../components/BackofficeListHeader'

export default function ReadingsPage() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <BackofficeListHeader title="Llistat de lectures" total={0} />
      <p className="mt-6 text-sm text-slate-500">
        Aquesta pantalla queda homogènia amb la resta del backoffice. La part funcional de filtres i paginació es pot connectar quan es defineixi l’endpoint de cerca definitiu.
      </p>
    </section>
  )
}
