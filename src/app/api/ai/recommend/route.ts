import { getAiRecommendation } from '@/lib/server/ai'
import { fail, readJson } from '@/lib/server/responses'
import type { AiRecommendationRequest } from '@/types/ai'

export async function POST(request: Request) {
  try {
    const payload = await readJson<AiRecommendationRequest>(request)
    return Response.json(await getAiRecommendation(payload))
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Không xử lý được yêu cầu AI', 400)
  }
}
