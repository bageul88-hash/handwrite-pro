require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Anthropic = require('@anthropic-ai/sdk')

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())

const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY })

app.get('/', (req, res) => {
  res.json({ message: '글씨교정 AI 서버 작동 중!' })
})

app.post('/generate', async (req, res) => {
  const { grade, type, topics, audience = '학부형' } = req.body
  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `당신은 글씨교정 전문가입니다.
${grade} 학생의 ${type} 글씨에서 나타나는 [${topics.join(', ')}] 문제를
${audience}에게 알기 쉽게 설명하고,
뇌과학적 근거와 신체 자세(손목/팔뚝/어깨/허리/목/다리)를 연결하여
문제점과 해결 방법을 조목조목 한국어로 작성해주세요.`
      }]
    })
    res.json({ success: true, content: message.content[0].text })
  } catch(e) {
    console.error('오류:', e.message)
    res.status(500).json({ success: false, error: e.message })
  }
})

app.listen(4000, () => console.log('✅ 서버 실행 중: http://localhost:4000'))
