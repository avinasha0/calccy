const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

export async function fetchTools() {
  const response = await fetch(`${API_BASE_URL}/tools`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Unable to fetch tools list.')
  }

  return response.json()
}

export async function calculateTool(slug, payload) {
  const response = await fetch(`${API_BASE_URL}/tools/${slug}/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.message ?? 'Unable to calculate tool.')
  }

  return response.json()
}
