import { api } from '../lib/api'

export const rolesService = {
  async listAssignableClientRoles() {
    const roles = await api.get('/roles')
    return (roles || [])
      .filter((role) => {
        const code = String(role.code || '').trim().toUpperCase()
        return code === 'MANAGER' || code === 'VIEWER'
      })
      .map((role) => ({
        ...role,
        id: String(role.id || ''),
        code: String(role.code || '').trim().toUpperCase(),
        name: role.name || role.code || '',
      }))
  },
}
