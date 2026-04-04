import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeviceFilters from '../components/DeviceFilters'
import DeviceActionsDropdown from '../components/DeviceActionsDropdown'
import DeviceEditModal from '../components/DeviceEditModal'
import { devicesService } from '../services/devicesService'

function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleString()
}

function normalizeDevice(device) {
  return {
    id: device.id,
    device_type_id: device.device_type_id || '',
    code: device.code || '',
    name: device.name || '',
    description: device.description || '',
    serial_number: device.serial_number || '',
    mac_address: device.mac_address || '',
    firmware_version: device.firmware_version || '',
    hardware_version: device.hardware_version || '',
    api_key: device.api_key || '',
    wifi_name: device.wifi_name || '',
    wifi_password: device.wifi_password || '',
    status: device.status || '',
    last_seen_on: device.last_seen_on || null,
    is_active: Boolean(device.is_active),
    modified_by: device.modified_by || '',
  }
}

export default function DevicesPage() {
  const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    code: '',
    name: '',
    serial_number: '',
    description: '',
    device_type_id: '',
    status: '',
    is_active: '',
  })

  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).filter((value) => value !== '').length
  }, [activeFilters])

  async function loadDevices(filters = activeFilters) {
    setIsLoading(true)
    setError('')

    try {
      const payload = await devicesService.searchDevices(filters)
      setItems(payload.items || [])
    } catch (err) {
      setError(err.message || 'No s’han pogut carregar els dispositius.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDevices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSearch(filters) {
    setActiveFilters(filters)
    await loadDevices(filters)
  }

  async function handleReset() {
    const emptyFilters = {
      code: '',
      name: '',
      serial_number: '',
      description: '',
      device_type_id: '',
      status: '',
      is_active: '',
    }
    setActiveFilters(emptyFilters)
    await loadDevices(emptyFilters)
  }

  function handleEdit(device) {
    setSelectedDevice(normalizeDevice(device))
    setIsEditOpen(true)
  }

  async function handleSaveDevice(formData) {
    if (!selectedDevice?.id) return

    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      await devicesService.updateDevice(selectedDevice.id, {
        ...normalizeDevice(selectedDevice),
        ...formData,
      })

      setSuccess('Dispositiu actualitzat correctament.')
      setIsEditOpen(false)
      setSelectedDevice(null)
      await loadDevices()
    } catch (err) {
      setError(err.message || 'No s’ha pogut actualitzar el dispositiu.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleToggleActive(device) {
    const nextValue = !device.is_active
    const confirmed = window.confirm(
      nextValue
        ? 'Vols activar aquest dispositiu?'
        : 'Vols desactivar aquest dispositiu?'
    )

    if (!confirmed) return

    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      await devicesService.updateDevice(device.id, {
        ...normalizeDevice(device),
        is_active: nextValue,
      })

      setSuccess(
        nextValue
          ? 'Dispositiu activat correctament.'
          : 'Dispositiu desactivat correctament.'
      )

      await loadDevices()
    } catch (err) {
      setError(err.message || 'No s’ha pogut actualitzar l’estat del dispositiu.')
    } finally {
      setIsSaving(false)
    }
  }

  function handleGoToReadings(device) {
    navigate(`/readings?deviceId=${encodeURIComponent(device.id)}&deviceName=${encodeURIComponent(device.name || '')}`)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-600">Operativa</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Dispositius
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Cerca, consulta i mantén els dispositius registrats a la plataforma.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
            Filtres actius: <span className="font-semibold text-slate-900">{activeFilterCount}</span>
          </div>
        </div>
      </section>

      <DeviceFilters
        initialFilters={activeFilters}
        onSearch={handleSearch}
        onReset={handleReset}
        disabled={isLoading || isSaving}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Llistat de dispositius</h2>
            <p className="mt-1 text-sm text-slate-500">
              Resultats: {items.length}
            </p>
          </div>
        </div>

        {isLoading ? <p className="mt-4 text-sm text-slate-500">Carregant...</p> : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        {success ? <p className="mt-4 text-sm text-emerald-600">{success}</p> : null}

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="px-3 py-3">Nom</th>
                <th className="px-3 py-3">Codi</th>
                <th className="px-3 py-3">Serial</th>
                <th className="px-3 py-3">MAC</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Actiu</th>
                <th className="px-3 py-3">Last seen</th>
                <th className="px-3 py-3 text-right">Accions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="px-3 py-3">{item.name || '-'}</td>
                  <td className="px-3 py-3">{item.code || '-'}</td>
                  <td className="px-3 py-3">{item.serial_number || '-'}</td>
                  <td className="px-3 py-3">{item.mac_address || '-'}</td>
                  <td className="px-3 py-3">{item.status || '-'}</td>
                  <td className="px-3 py-3">{item.is_active ? 'Sí' : 'No'}</td>
                  <td className="px-3 py-3">{formatDate(item.last_seen_on)}</td>
                  <td className="px-3 py-3 text-right">
                    <DeviceActionsDropdown
                      device={item}
                      onEdit={handleEdit}
                      onToggleActive={handleToggleActive}
                      onGoToReadings={handleGoToReadings}
                      disabled={isSaving}
                    />
                  </td>
                </tr>
              ))}

              {!isLoading && items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-slate-500">
                    No s’han trobat dispositius.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <DeviceEditModal
        isOpen={isEditOpen}
        device={selectedDevice}
        onClose={() => {
          if (isSaving) return
          setIsEditOpen(false)
          setSelectedDevice(null)
        }}
        onSave={handleSaveDevice}
        isSaving={isSaving}
      />
    </div>
  )
}
