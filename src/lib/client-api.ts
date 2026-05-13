type ApiEnvelope<TData> =
  | {
      success: true
      data: TData
    }
  | {
      success: false
      message: string
      errors?: { field?: string; message: string }[]
    }

export async function postJson<TResponse>(url: string, body?: unknown): Promise<TResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const payload = (await response.json()) as ApiEnvelope<TResponse>

  if (!response.ok || !payload.success) {
    throw new Error(payload.success ? `Request failed with ${response.status}` : payload.message)
  }

  return payload.data
}
