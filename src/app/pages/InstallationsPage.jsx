// ONLY SWITCH PART MODIFIED

function TriStateSwitch({ value, onChange }) {
  // value: true | false | null

  function handleClick() {
    if (value === null) onChange(true)
    else if (value === true) onChange(false)
    else onChange(null)
  }

  const bg =
    value === true
      ? 'bg-green-600'
      : value === false
      ? 'bg-gray-500'
      : 'bg-gray-300'

  const position =
    value === true
      ? 'translate-x-6'
      : value === false
      ? 'translate-x-1'
      : 'translate-x-3'

  const label =
    value === true ? 'Actiu' : value === false ? 'Inactiu' : 'Tots'

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${bg}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${position}`}
        />
      </button>
      <span className="text-sm text-slate-700">{label}</span>
    </div>
  )
}

// substituir dins del form:

{/* abans:
<FilterInput name="is_active" ... />
*/}

<div className="space-y-2 text-sm text-slate-700">
  <span className="block">Actiu</span>
  <TriStateSwitch
    value={filters.is_active}
    onChange={(value) =>
      setFilters((prev) => ({ ...prev, is_active: value }))
    }
  />
</div>

// i mantenir la lògica:

if (appliedFilters.is_active !== null) {
  filtered = filtered.filter(
    (item) => Boolean(item.is_active) === appliedFilters.is_active
  )
}
