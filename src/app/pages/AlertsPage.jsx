import BackofficeListHeader from '../components/BackofficeListHeader'

export default function AlertsPage() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <BackofficeListHeader title="Llistat d'alertes" total={0} />
      <p className="mt-6 text-sm text-slate-500">
        Aquesta pantalla queda preparada amb el mateix format visual del backoffice. La integració funcional del llistat d’alertes es pot afegir sobre aquest esquelet.
      </p>
    </section>
  )
}
