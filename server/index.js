require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { GoogleGenerativeAI } = require('@google/generative-ai')

const app = express()
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

// MongoDB 연결 (MONGODB_URI 없으면 기본 프롬프트로 동작)
let mongoConnected = false
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => { mongoConnected = true; console.log('✅ MongoDB 연결 성공') })
    .catch(e => console.error('❌ MongoDB 연결 실패:', e.message))
} else {
  console.warn('⚠️ MONGODB_URI 없음 — 기본 프롬프트로 동작')
}

// 프롬프트 스키마
const promptSchema = new mongoose.Schema({
  key: { type: String, default: 'main' },
  content: String,
}, { timestamps: true })
const Prompt = mongoose.model('Prompt', promptSchema)

const DEFAULT_PROMPT = `당신은 글씨교정 전문가이자 뇌과학 전문가입니다.
{grade} 학생의 {type} 글씨에서 나타나는 [{topics}] 문제를
{audience}에게 아래 구조로 한국어로 작성해주세요.

1. 문제 원인 분석
2. 뇌과학적 근거
3. 신체 자세 교정
4. 구체적 해결 방법
5. 학부형 실천 가이드`

async function getPrompt() {
  if (!mongoConnected) return DEFAULT_PROMPT
  try {
    const doc = await Prompt.findOne({ key: 'main' })
    return doc ? doc.content : DEFAULT_PROMPT
  } catch { return DEFAULT_PROMPT }
}

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

app.get('/', (req, res) => {
  res.json({ message: '글씨교정 AI 서버 작동 중!' })
})

app.post('/generate', async (req, res) => {
  const { grade, type, topics, audience = '학부형' } = req.body
  try {
    const model = genai.getGenerativeModel({ model: 'gemini-2.5-flash' })
    const template = await getPrompt()
    const prompt = template
      .replace('{grade}', grade)
      .replace('{type}', type)
      .replace('{topics}', topics.join(', '))
      .replace('{audience}', audience)
    console.log('📝 Gemini 전달 프롬프트 (앞 100자):', prompt.slice(0, 100))
    const result = await model.generateContent(prompt)
    res.json({ success: true, content: result.response.text() })
  } catch(e) {
    console.error('오류:', e.message)
    res.status(500).json({ success: false, error: e.message })
  }
})

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
