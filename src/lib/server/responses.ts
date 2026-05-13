import { NextResponse } from 'next/server'

export type ApiError = {
  field?: string
  message: string
}

export function ok<TData>(data: TData, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function fail(message: string, status = 400, errors: ApiError[] = []) {
  return NextResponse.json({ success: false, message, errors }, { status })
}

export async function readJson<TBody>(request: Request): Promise<TBody> {
  try {
    return (await request.json()) as TBody
  } catch {
    return {} as TBody
  }
}
