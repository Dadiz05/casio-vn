import { getAiInsights } from '@/lib/server/ai'
import { fail, readJson } from '@/lib/server/responses'
import type { AiInsightRequest } from '@/types/ai'

export async function POST(request: Request) {
  try {
    const payload = await readJson<AiInsightRequest>(request)
    return Response.json(await getAiInsights(payload))
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Không xử lý được yêu cầu AI', 400)
  }
}
