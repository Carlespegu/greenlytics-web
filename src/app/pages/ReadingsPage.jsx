import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ReadingsPage() {
  const [searchParams] = useSearchParams()

  const deviceId = searchParams.get('deviceId')
  const deviceName = searchParams.get('deviceName')

  const title = useMemo(() => {
    if (!deviceId) return 'Lectures'
    return deviceName
      ? `Lectures · ${deviceName}`
      : `Lectures · ${deviceId}`
  }, [deviceId, deviceName])

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>

      {deviceId ? (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          S’ha aplicat el focus per al dispositiu seleccionat.
          <div className="mt-2 font-medium">deviceId: {deviceId}</div>
        </div>
      ) : null}

      <p className="mt-4 text-slate-500">
        Pantalla en construcció.
      </p>
    </section>
  )
}
