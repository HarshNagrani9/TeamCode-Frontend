export type GreetingSuccess = {
  ok: true
  message: string
  user: { id: string; name: string }
}

export type GreetingError = {
  ok: false
  message: string
}

export type GreetingResponse = GreetingSuccess | GreetingError

export async function fetchGreeting(token: string): Promise<GreetingResponse> {
  const res = await fetch('/api/greeting', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  let data: unknown = null
  try {
    data = await res.json()
  } catch {
    // ignore
  }

  if (!res.ok) {
    const message =
      data && typeof data === 'object' && 'message' in data
        ? String((data as { message?: unknown }).message ?? 'Request failed')
        : 'Request failed'
    return { ok: false, message }
  }

  if (data && typeof data === 'object' && 'ok' in data) {
    return data as GreetingResponse
  }

  return { ok: false, message: 'Unexpected response from server' }
}

