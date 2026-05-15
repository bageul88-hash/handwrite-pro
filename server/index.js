require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const { GoogleGenerativeAI } = require('@google/generative-ai')
const Anthropic = require('@anthropic-ai/sdk')

const app = express()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin.endsWith('.vercel.app') ||
        origin === 'https://handwrite-pro.onrender.com' ||
        origin === 'https://handwrite-pro-production.up.railway.app' ||
        origin === 'http://localhost:5173' ||
        origin === 'http://localhost:5174' ||
        origin === 'http://localhost:5175') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())

// MongoDB
let mongoConnected = false
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => { mongoConnected = true; console.log('✅ MongoDB 연결 성공') })
    .catch(e => console.error('❌ MongoDB 연결 실패:', e.message))
} else {
  console.warn('⚠️ MONGODB_URI 없음 — 기본 프롬프트로 동작')
}

const promptSchema = new mongoose.Schema({
  key: { type: String, default: 'main' },
  content: String,
}, { timestamps: true })
const Prompt = mongoose.model('Prompt', promptSchema)

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

app.get('/', (req, res) => {
  res.json({ message: '글씨교정 AI 서버 작동 중!' })
})

// 메인 생성 엔드포인트 — 사진 첨부 가능
app.post('/generate', upload.any(), async (req, res) => {
  const { grade, gender, type, audience = '학부형' } = req.body
  const topics = Array.isArray(req.body.topics)
    ? req.body.topics
    : req.body.topics ? [req.body.topics] : []

  if (!grade || !type || topics.length === 0) {
    return res.status(400).json({ success: false, error: '필수 항목(학년, 유형, 주제)을 입력해주세요.' })
  }

  // 업로드된 사진을 topic별로 매핑
  const imageMap = {}
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const topic = file.fieldname.replace(/^photo_/, '')
      imageMap[topic] = { data: file.buffer.toString('base64'), mimeType: file.mimetype }
    }
  }
  const hasImages = Object.keys(imageMap).length > 0

  try {
    const model = genai.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const topicSections = topics.map(topic => `## ${topic}
1. 문제 원인 분석
2. 뇌과학적 근거 (해마·대뇌피질·소뇌)
3. 신체 자세 교정 (손목/팔뚝/어깨/허리/목/다리)
4. 구체적 해결 방법
5. ${audience} 실천 가이드`).join('\n\n')

    const promptText = `당신은 글씨교정 전문가이자 뇌과학 전문가입니다.
성별: ${gender || '미입력'} | 학년: ${grade} | 글씨 유형: ${type} | 대상: ${audience}
분석 주제: ${topics.join(', ')}

${hasImages ? '첨부된 사진을 직접 분석하여 ' : ''}각 주제별로 구체적인 교정 가이드를 한국어로 작성해주세요.

${topicSections}`

    const parts = [{ text: promptText }]
    for (const [topic, img] of Object.entries(imageMap)) {
      parts.push({ text: `\n[${topic} 사진 분석]:` })
      parts.push({ inlineData: { data: img.data, mimeType: img.mimeType } })
    }

    console.log(`📝 grade=${grade} gender=${gender} type=${type} topics=${topics.join(',')} images=${Object.keys(imageMap).length}`)
    const result = await model.generateContent(parts)
    res.json({ success: true, content: result.response.text(), topics })
  } catch(e) {
    console.error('오류:', e.message)
    res.status(500).json({ success: false, error: e.message })
  }
})

// 관리자 프롬프트 저장
app.post('/admin/prompt', async (req, res) => {
  const { prompt } = req.body
  if (!prompt) return res.status(400).json({ success: false, error: '프롬프트가 없습니다' })
  if (!mongoConnected) return res.status(503).json({ success: false, error: 'MongoDB 미연결 — MONGODB_URI 환경변수를 설정해주세요' })
  try {
    await Prompt.findOneAndUpdate(
      { key: 'main' },
      { content: prompt },
      { upsert: true, new: true }
    )
    res.json({ success: true, message: '프롬프트 저장 완료!' })
  } catch(e) {
    res.status(500).json({ success: false, error: 'DB 저장 실패: ' + e.message })
  }
})

// 관리자 전용 — Claude API, JSON 구조 응답
app.post('/admin/generate', async (req, res) => {
  const { grade, type, topics, audience = '학부모' } = req.body

  if (!grade || !type || !topics) {
    return res.status(400).json({ success: false, error: '필수 항목 누락' })
  }

  let promptTemplate = `당신은 글씨교정 전문가이자 뇌과학 전문가입니다.
{grade} 학생의 {type} 글씨에서 나타나는 [{topics}] 문제를 {audience}에게 분석해 주세요.`

  if (mongoConnected) {
    try {
      const saved = await Prompt.findOne({ key: 'main' })
      if (saved?.content) promptTemplate = saved.content
    } catch(e) {}
  }

  const userPrompt = promptTemplate
    .replace(/\{grade\}/g, grade)
    .replace(/\{type\}/g, type)
    .replace(/\{topics\}/g, Array.isArray(topics) ? topics.join(', ') : topics)
    .replace(/\{audience\}/g, audience)

  const finalPrompt = userPrompt + `

반드시 아래 JSON 형식으로만 응답하세요. 마크다운 코드블록(백틱) 없이 순수 JSON만 출력하세요.

{
  "reportTitle": "우리 아이 악필 탈출 3단계 요약",
  "reportSub": "${grade} · 악필 교정 분석 결과",
  "section1": {
    "title": "원인과 뇌과학적 원리",
    "intro": "글씨가 불규칙한 이유를 뇌과학적으로 설명하는 2~3문장",
    "table": [
      {"category": "불규칙", "features": "주요 특징 설명", "brain": "뇌과학적 의미"},
      {"category": "불안정", "features": "주요 특징 설명", "brain": "뇌과학적 의미"},
      {"category": "미숙함", "features": "주요 특징 설명", "brain": "뇌과학적 의미"}
    ]
  },
  "section2": {
    "title": "신체 자세 바로잡기 — 6대 체크포인트",
    "intro": "바른 자세에 대한 한 줄 설명",
    "checkpoints": [
      {"icon": "✋", "name": "손목", "desc": "구체적 자세 설명"},
      {"icon": "💪", "name": "팔꿈치", "desc": "구체적 자세 설명"},
      {"icon": "🙆", "name": "어깨", "desc": "구체적 자세 설명"},
      {"icon": "🧘", "name": "허리", "desc": "구체적 자세 설명"},
      {"icon": "👁", "name": "목", "desc": "구체적 자세 설명"},
      {"icon": "🦵", "name": "다리", "desc": "구체적 자세 설명"}
    ]
  },
  "section3": {
    "title": "구체적인 해결 전략 — Daily Solution",
    "motorTitle": "✏ 필기구 및 소근육 훈련",
    "motorItems": ["훈련 항목 1", "훈련 항목 2", "훈련 항목 3"],
    "spaceTitle": "⣿ 공간 및 형태 훈련",
    "spaceItems": ["훈련 항목 1", "훈련 항목 2", "훈련 항목 3"],
    "parentTitle": "학부모님을 위한 실천 수칙",
    "parentItems": [
      {"label": "시간", "val": "구체적 내용"},
      {"label": "칭찬", "val": "구체적 내용"},
      {"label": "과정", "val": "구체적 내용"},
      {"label": "안내", "val": "구체적 내용"}
    ],
    "quote": "핵심 인용 문장"
  }
}`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: finalPrompt }]
    })

    let raw = message.content[0].text
    raw = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(raw)
    res.json({ success: true, data: parsed })
  } catch(e) {
    console.error('Claude API 오류:', e.message)
    res.status(500).json({ success: false, error: e.message })
  }
})

app.listen(process.env.PORT || 4000, () => console.log('✅ 서버 실행 중!'))
