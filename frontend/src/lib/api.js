function resolveApiBaseUrl() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/api`
  }

  return '/api'
}

const API_BASE_URL = resolveApiBaseUrl().replace(/\/+$/, '')

async function parseError(response, fallbackMessage) {
  const error = await response.json().catch(() => ({}))
  return error?.message ?? fallbackMessage
}

function getClientDebugContext() {
  if (typeof window === 'undefined') {
    return {}
  }

  return {
    pageUrl: window.location.href,
    pageOrigin: window.location.origin,
    apiBaseUrl: API_BASE_URL,
    online: navigator.onLine,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  }
}

function logApiIssue(event, details) {
  const payload = {
    event,
    ...getClientDebugContext(),
    ...details,
  }
  console.error('[API_DEBUG]', payload)
}

export async function fetchTools() {
  const endpoint = `${API_BASE_URL}/tools`

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      const message = await parseError(response, 'Unable to fetch tools list.')
      logApiIssue('fetch_tools_failed', {
        endpoint,
        status: response.status,
        statusText: response.statusText,
        message,
      })
      throw new Error(message)
    }

    return response.json()
  } catch (error) {
    logApiIssue('fetch_tools_exception', {
      endpoint,
      errorName: error?.name,
      errorMessage: error?.message,
    })
    throw error
  }
}

export async function calculateTool(slug, payload) {
  const endpoint = `${API_BASE_URL}/tools/${slug}/calculate`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const message = await parseError(response, 'Unable to calculate tool.')
      logApiIssue('calculate_tool_failed', {
        endpoint,
        slug,
        payload,
        status: response.status,
        statusText: response.statusText,
        message,
      })
      throw new Error(message)
    }

    return response.json()
  } catch (error) {
    logApiIssue('calculate_tool_exception', {
      endpoint,
      slug,
      payload,
      errorName: error?.name,
      errorMessage: error?.message,
    })

    if (error instanceof TypeError) {
      throw new Error('Unable to reach the calculator service. Please check your connection and try again.')
    }

    throw error
  }
}

export async function calculateSalary(payload) {
  return calculateTool('salary-calculator', payload)
}
