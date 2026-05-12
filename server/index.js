require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const { GoogleGenerativeAI } = require('@google/generative-ai')

const app = express()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin.endsWith('.vercel.app') ||
        origin === 'https://handwrite-pro.onrender.com' ||
        origin === 'https://handwrite-pro-production.up.railway.app') {
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

app.listen(process.env.PORT || 4000, () => console.log('✅ 서버 실행 중!'))
