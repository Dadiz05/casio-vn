import type {
  AiInsightRequest,
  AiInsightResult,
  AiProductCopyRequest,
  AiProductCopyResult,
  AiProductSuggestion,
  AiRecommendationRequest,
  AiRecommendationResult,
  ProductBrief,
} from '@/types/ai'

type AiKind = 'recommend' | 'product-copy' | 'insights'

const DEFAULT_MODEL = 'gpt-5-mini'

type OpenAiResponseContent = {
  type?: string
  text?: string
}

type OpenAiResponseOutput = {
  type?: string
  content?: OpenAiResponseContent[]
}

type OpenAiResponse = {
  output_text?: string
  output?: OpenAiResponseOutput[]
}

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const formatVnd = (value: number) => `${value.toLocaleString('vi-VN')} đ`

const parseNumber = (value?: string) => {
  if (!value) return 0
  const parsed = Number(value.replace(/[^\d]/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

const unique = (items: string[]) =>
  Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)))

const getQueryBudget = (query: string) => {
  const millionMatch = query.match(/(\d+(?:[.,]\d+)?)\s*(trieu|tr|m)\b/)
  if (millionMatch?.[1]) return Number(millionMatch[1].replace(',', '.')) * 1_000_000

  const thousandMatch = query.match(/(\d+(?:[.,]\d+)?)\s*(k|nghin)\b/)
  if (thousandMatch?.[1]) return Number(thousandMatch[1].replace(',', '.')) * 1_000

  return undefined
}

const scoreProduct = (product: ProductBrief, normalizedQuery: string, budget?: number) => {
  const reasons: string[] = []
  let score = product.stock > 0 ? 18 : -80
  const searchableText = normalizeText(
    [
      product.name,
      product.description,
      product.category,
      product.movement,
      product.gender,
      product.waterResistance,
      product.caseMaterial,
      product.strapMaterial,
      ...(product.features ?? []),
      ...(product.tags ?? []),
    ]
      .filter(Boolean)
      .join(' ')
  )

  if (normalizedQuery.includes(normalizeText(product.category))) {
    score += 24
    reasons.push(`đúng dòng ${product.category}`)
  }

  if (normalizedQuery.includes(normalizeText(product.gender))) {
    score += 18
    reasons.push(`hợp nhóm ${product.gender}`)
  }

  if (budget) {
    if (product.price <= budget) {
      score += 24
      reasons.push(`nằm trong ngân sách ${formatVnd(budget)}`)
    } else {
      score -= 28
    }
  }

  normalizedQuery
    .split(/\s+/)
    .filter((word) => word.length >= 4)
    .forEach((word) => {
      if (searchableText.includes(word)) score += 3
    })

  if (normalizedQuery.match(/\b(the thao|ben|chong soc|ngoai troi|di phuot)\b/)) {
    if (product.category === 'G-Shock') score += 24
  }

  if (normalizedQuery.match(/\b(cong so|di lam|lich su|thanh lich|doanh nhan)\b/)) {
    if (product.category === 'Edifice' || product.category === 'Classic') score += 22
  }

  score += Math.min(product.sold / 8, 14)
  score += Math.min(product.rating * 2, 10)

  return {
    product,
    score: Math.max(0, Math.min(100, Math.round(score))),
    reasons,
  }
}

export const fallbackRecommendation = (
  payload: AiRecommendationRequest
): AiRecommendationResult => {
  const normalizedQuery = normalizeText(payload.query)
  const budget = getQueryBudget(normalizedQuery)
  const ranked = payload.products
    .map((product) => scoreProduct(product, normalizedQuery, budget))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)

  const suggestions: AiProductSuggestion[] = ranked.map(({ product, score, reasons }) => ({
    productId: product.id,
    score,
    reason:
      reasons.slice(0, 3).join(', ') ||
      `Mẫu ${product.category} có đánh giá ${product.rating}/5 và còn ${product.stock} sản phẩm.`,
    bestFor:
      product.category === 'G-Shock'
        ? 'Người cần đồng hồ bền, thể thao.'
        : product.category === 'Edifice'
          ? 'Phong cách công sở, lịch sự.'
          : product.category === 'Baby-G'
            ? 'Phong cách năng động, dễ đeo.'
            : 'Phong cách tối giản, cổ điển.',
  }))

  const topNames = suggestions
    .map(
      (suggestion) => payload.products.find((product) => product.id === suggestion.productId)?.name
    )
    .filter(Boolean)

  return {
    answer:
      topNames.length > 0
        ? `Mình gợi ý ${topNames.join(', ')} vì các mẫu này khớp tốt với nhu cầu và tồn kho hiện tại.`
        : 'Bạn có thể mô tả rõ hơn về ngân sách, giới tính và phong cách để nhận gợi ý phù hợp.',
    querySummary: payload.query.trim() || 'Khách đang cần tư vấn đồng hồ Casio phù hợp.',
    suggestedProductIds: suggestions.map((suggestion) => suggestion.productId),
    suggestions,
    followUpQuestions: [
      'Bạn ưu tiên dây kim loại hay dây nhựa?',
      'Bạn cần đồng hồ đi làm, chơi thể thao hay làm quà tặng?',
      'Ngân sách tối đa của bạn là bao nhiêu?',
    ],
    source: 'fallback',
  }
}

export const fallbackProductCopy = ({ product }: AiProductCopyRequest): AiProductCopyResult => {
  const price = parseNumber(product.price)
  const warranty = parseNumber(product.warrantyMonths) || 24
  const tier = price >= 5_000_000 ? 'cao cấp' : price >= 2_000_000 ? 'tầm trung' : 'dễ tiếp cận'
  const style =
    product.category === 'G-Shock'
      ? 'bền bỉ, thể thao'
      : product.category === 'Edifice'
        ? 'lịch lãm, nam tính'
        : product.category === 'Baby-G'
          ? 'trẻ trung, năng động'
          : 'cổ điển, gọn nhẹ'
  const description =
    product.existingDescription ||
    `${product.name} là mẫu Casio ${product.category} phong cách ${style}, phù hợp sử dụng hằng ngày với mức giá ${tier}.`

  return {
    description,
    fullDescription: `${description} Sản phẩm hướng tới khách hàng cần đồng hồ chính hãng, dễ phối đồ, có bảo hành ${warranty} tháng và thông tin hậu mãi rõ ràng tại Casio VN Store.`,
    features: unique([
      'Hàng Casio chính hãng, đầy đủ hộp và phụ kiện',
      `Bảo hành ${warranty} tháng`,
      `Bộ máy ${product.movement} ổn định`,
      `Thiết kế phù hợp nhóm ${product.gender}`,
      product.category === 'G-Shock' ? 'Kết cấu bền bỉ cho hoạt động ngoài trời' : '',
      product.category === 'Edifice' ? 'Dễ phối với trang phục công sở' : '',
    ]).slice(0, 6),
    tags: unique([product.category, product.movement, product.gender, 'Casio chính hãng']).slice(
      0,
      8
    ),
    badge: product.badge || (parseNumber(product.stock) <= 5 ? 'Sắp hết' : 'Gợi ý'),
    seoTitle: `${product.name} chính hãng | Casio VN Store`,
    source: 'fallback',
  }
}

export const fallbackInsights = (payload: AiInsightRequest): AiInsightResult => {
  const completedOrders = payload.orders.filter((order) => order.status === 'completed')
  const pendingOrders = payload.orders.filter((order) => order.status === 'pending')
  const revenue = completedOrders.reduce((sum, order) => sum + order.total, 0)
  const lowStock = payload.products.filter((product) => product.stock > 0 && product.stock <= 5)
  const outOfStock = payload.products.filter((product) => product.stock <= 0)
  const bestSellers = [...payload.products].sort((a, b) => b.sold - a.sold).slice(0, 3)

  return {
    summary: `Doanh thu hoàn tất đạt ${formatVnd(revenue)} từ ${completedOrders.length} đơn. Hệ thống có ${payload.products.length} sản phẩm, ${payload.users.length} khách hàng và ${pendingOrders.length} đơn đang chờ xử lý.`,
    actionItems: unique([
      lowStock.length > 0
        ? `Nhập thêm ${lowStock.length} mẫu sắp hết hàng trước khi chạy khuyến mãi.`
        : 'Duy trì kiểm tra tồn kho mỗi ngày.',
      pendingOrders.length > 0
        ? `Xác nhận ${pendingOrders.length} đơn đang chờ để giảm thời gian xử lý.`
        : 'Tạo kịch bản chăm sóc lại khách đã mua.',
      bestSellers[0] ? `Đẩy nổi bật mẫu bán chạy ${bestSellers[0].name}.` : '',
    ]),
    risks: unique([
      outOfStock.length > 0 ? `${outOfStock.length} mẫu đã hết hàng.` : '',
      lowStock.length > 0 ? `${lowStock.length} mẫu còn dưới 5 sản phẩm.` : '',
      payload.orders.length === 0 ? 'Chưa có đơn hàng nên insight doanh thu còn hạn chế.' : '',
    ]),
    opportunities: unique([
      bestSellers.length > 0 ? 'Tạo bộ sưu tập Bán chạy ở trang chủ.' : '',
      'Dùng AI tư vấn ở trang Shop để chuyển nhu cầu tự nhiên thành sản phẩm gợi ý.',
      'Bổ sung tag theo phong cách như công sở, thể thao, vintage.',
    ]),
    inventoryAlerts: [...outOfStock, ...lowStock].slice(0, 6).map((product) => ({
      productId: product.id,
      message:
        product.stock <= 0
          ? `${product.name} đã hết hàng.`
          : `${product.name} chỉ còn ${product.stock} sản phẩm.`,
      priority: product.stock <= 0 ? 'high' : product.stock <= 2 ? 'high' : 'medium',
    })),
    source: 'fallback',
  }
}

const extractJson = (text: string) => {
  const trimmed = text.trim()
  const fenced = trimmed.match(/```json\s*([\s\S]*?)```/)
  return fenced?.[1] ?? trimmed
}

const extractOutputText = (data: OpenAiResponse) => {
  if (data.output_text) return data.output_text

  return (
    data.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text)
      .filter(Boolean)
      .join('\n') || ''
  )
}

async function requestOpenAi<TResult>(kind: AiKind, payload: unknown): Promise<TResult | null> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
      text: {
        format: { type: 'json_object' },
      },
      input: [
        {
          role: 'system',
          content:
            'Bạn là trợ lý thương mại điện tử cho Casio VN Store. Luôn trả về JSON hợp lệ, tiếng Việt, không bịa dữ liệu ngoài payload.',
        },
        {
          role: 'user',
          content: JSON.stringify({ kind, payload }),
        },
      ],
    }),
  })

  if (!response.ok) return null
  const data = (await response.json()) as OpenAiResponse
  const outputText = extractOutputText(data)
  if (!outputText) return null

  try {
    return JSON.parse(extractJson(outputText)) as TResult
  } catch {
    return null
  }
}

export async function getAiRecommendation(payload: AiRecommendationRequest) {
  const openAi = await requestOpenAi<AiRecommendationResult>('recommend', payload)
  return openAi ? { ...openAi, source: 'openai' as const } : fallbackRecommendation(payload)
}

export async function getAiProductCopy(payload: AiProductCopyRequest) {
  const openAi = await requestOpenAi<AiProductCopyResult>('product-copy', payload)
  return openAi ? { ...openAi, source: 'openai' as const } : fallbackProductCopy(payload)
}

export async function getAiInsights(payload: AiInsightRequest) {
  const openAi = await requestOpenAi<AiInsightResult>('insights', payload)
  return openAi ? { ...openAi, source: 'openai' as const } : fallbackInsights(payload)
}
