const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}))

app.use(express.json())

app.get('/', (req: any, res: any) => {
  res.json({ message: '글씨교정 AI 서버 작동 중!' })
})

app.post('/generate', async (req: any, res: any) => {
  const { grade, type, topics, audience = '학부형' } = req.body

  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genai.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `당신은 글씨교정 전문가입니다.
${grade} 학생의 ${type} 글씨에서 나타나는 [${topics.join(', ')}] 문제를
${audience}에게 알기 쉽게 설명하고,
뇌과학적 근거와 신체 자세(손목/팔뚝/어깨/허리/목/다리)를 연결하여
문제점과 해결 방법을 조목조목 한국어로 작성해주세요.`

    const result = await model.generateContent(prompt)
    const content = result.response.text()
    res.json({ success: true, content })

  } catch (error: any) {
    console.error('AI 오류:', error.message)
    res.status(500).json({ success: false, error: error.message })
  }
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`)
})