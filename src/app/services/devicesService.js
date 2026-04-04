import { api } from '../lib/api'

function normalizeSearchPayload(filters = {}) {
  const payload = {
    pagination_params: {
      page: 1,
      page_size: 25,
    },
  }

  if (filters.device_type_id) {
    payload.device_type_id = {
      filter_value: filters.device_type_id,
      comparator: 'equals',
    }
  }

  if (filters.code) {
    payload.code = {
      filter_value: filters.code,
      comparator: 'contains',
    }
  }

  if (filters.name) {
    payload.name = {
      filter_value: filters.name,
      comparator: 'contains',
    }
  }

  if (filters.description) {
    payload.description = {
      filter_value: filters.description,
      comparator: 'contains',
    }
  }

  if (filters.serial_number) {
    payload.serial_number = {
      filter_value: filters.serial_number,
      comparator: 'contains',
    }
  }

  if (filters.status) {
    payload.status = {
      filter_value: filters.status,
      comparator: 'equals',
    }
  }

  if (filters.is_active !== '') {
    payload.is_active = {
      filter_value: filters.is_active === 'true',
      comparator: 'equals',
    }
  }

  return payload
}

function normalizeSearchResponse(payload) {
  if (Array.isArray(payload)) {
    return { items: payload }
  }

  if (Array.isArray(payload?.items)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return { ...payload, items: payload.data }
  }

  if (Array.isArray(payload?.results)) {
    return { ...payload, items: payload.results }
  }

  return { items: [] }
}

export const devicesService = {
  async searchDevices(filters = {}) {
    const payload = await api.post('/devices/search', normalizeSearchPayload(filters))
    return normalizeSearchResponse(payload)
  },

  async updateDevice(deviceId, body) {
    return api.put(`/devices/${deviceId}`, body)
  },
}
