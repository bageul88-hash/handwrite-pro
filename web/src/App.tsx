import { useState, useRef } from 'react'

const SERVER = 'https://handwrite-pro.onrender.com'
const PRIMARY = '#534AB7'
const LIGHT = '#EEEDFE'
const BORDER = '#AFA9EC'

const genders = ['남', '여']
const grades = ['6-7세', '초1-2', '초3-4', '초5-6', '중등', '성인', '2차 준졸고사']
const types = ['한글', '영어', '숫자']
const topics = ['악필 교정', '집필 자세', '손목·팔뚝', '허리·어깨', '뇌과학', '손 촉각']

function chip(active: boolean, disabled = false) {
  return {
    padding: '7px 16px', borderRadius: 20, border: '1px solid',
    fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'sans-serif',
    background: active ? PRIMARY : '#fff',
    color: active ? '#fff' : disabled ? '#bbb' : '#555',
    borderColor: active ? PRIMARY : disabled ? '#eee' : '#ddd',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.15s',
  } as React.CSSProperties
}

function label(text: string, sub?: string) {
  return (
    <div style={{ marginBottom: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#444' }}>{text}</span>
      {sub && <span style={{ fontSize: 12, color: '#999', marginLeft: 6 }}>{sub}</span>}
    </div>
  )
}

// 결과 섹션 파싱 (## 헤더 기준 분리)
function parseResult(text: string) {
  const parts = text.split(/(?=^## )/m)
  const intro = parts[0].trim()
  const sections = parts.slice(1).map(s => {
    const lines = s.split('\n')
    const title = lines[0].replace(/^## /, '').trim()
    const body = lines.slice(1).join('\n').trim()
    return { title, body }
  })
  return { intro, sections }
}

export default function App() {
  const [gender, setGender] = useState('남')
  const [grade, setGrade] = useState('초1-2')
  const [type, setType] = useState('한글')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [photos, setPhotos] = useState<Record<string, File>>({})
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const [result, setResult] = useState<{ intro: string; sections: { title: string; body: string }[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const toggleTopic = (t: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(t)) {
        setPhotos(p => { const n = { ...p }; delete n[t]; return n })
        setPreviews(p => { const n = { ...p }; delete n[t]; return n })
        return prev.filter(x => x !== t)
      }
      if (prev.length >= 3) return prev
      return [...prev, t]
    })
  }

  const handlePhoto = (topic: string, file: File) => {
    setPhotos(prev => ({ ...prev, [topic]: file }))
    const url = URL.createObjectURL(file)
    setPreviews(prev => ({ ...prev, [topic]: url }))
  }

  const generate = async () => {
    if (selectedTopics.length === 0) { alert('교정 주제를 1개 이상 선택해주세요.'); return }
    setLoading(true)
    setResult(null)
    try {
      const form = new FormData()
      form.append('gender', gender)
      form.append('grade', grade)
      form.append('type', type)
      selectedTopics.forEach(t => form.append('topics', t))
      selectedTopics.forEach(t => { if (photos[t]) form.append(`photo_${t}`, photos[t]) })

      const res = await fetch(`${SERVER}/generate`, { method: 'POST', body: form })
      const data = await res.json()
      if (data.success) setResult(parseResult(data.content))
      else alert('생성 실패: ' + data.error)
    } catch { alert('서버 연결 실패. 잠시 후 다시 시도해주세요.') }
    finally { setLoading(false) }
  }

  const fullText = result
    ? [result.intro, ...result.sections.map(s => `## ${s.title}\n${s.body}`)].join('\n\n')
    : ''

  return (
    <div style={{ maxWidth: 740, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'sans-serif', color: '#222' }}>

      {/* 헤더 */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: PRIMARY }}>글씨교정 AI</h1>
        <p style={{ fontSize: 13, color: '#999', margin: '5px 0 0' }}>뇌과학 · 자세 · 집필 통합 교정 솔루션 by pentwo</p>
      </div>

      {/* 선택 폼 */}
      <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 14, padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>

        {/* 성별 */}
        <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
          {label('성별')}
          <div style={{ display: 'flex', gap: 8 }}>
            {genders.map(g => (
              <button key={g} onClick={() => setGender(g)} style={chip(gender === g)}>{g}</button>
            ))}
          </div>
        </div>

        {/* 학년 */}
        <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
          {label('학년 선택')}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {grades.map(g => (
              <button key={g} onClick={() => setGrade(g)} style={chip(grade === g)}>{g}</button>
            ))}
          </div>
        </div>

        {/* 글씨 유형 */}
        <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
          {label('글씨 유형')}
          <div style={{ display: 'flex', gap: 8 }}>
            {types.map(t => (
              <button key={t} onClick={() => setType(t)} style={chip(type === t)}>{t}</button>
            ))}
          </div>
        </div>

        {/* 교정 주제 */}
        <div style={{ marginBottom: '1.5rem' }}>
          {label('교정 주제', `(최대 3개 · ${selectedTopics.length}/3 선택됨)`)}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {topics.map(t => {
              const active = selectedTopics.includes(t)
              const disabled = !active && selectedTopics.length >= 3
              return (
                <button key={t} onClick={() => !disabled && toggleTopic(t)} style={chip(active, disabled)}>{t}</button>
              )
            })}
          </div>
        </div>

        {/* 주제별 사진 업로드 카드 */}
        {selectedTopics.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            {label('주제별 사진 업로드', '(선택 — 사진 첨부 시 더 정확한 분석)')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 10 }}>
              {selectedTopics.map(topic => (
                <div key={topic} style={{
                  border: `1.5px solid ${previews[topic] ? BORDER : '#e0e0e0'}`,
                  borderRadius: 10, padding: '0.875rem', textAlign: 'center',
                  background: previews[topic] ? LIGHT : '#fafafa'
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: PRIMARY, marginBottom: 8 }}>{topic}</div>
                  {previews[topic] ? (
                    <>
                      <img src={previews[topic]} alt={topic}
                        style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 6, marginBottom: 6 }} />
                      <button onClick={() => fileRefs.current[topic]?.click()}
                        style={{ fontSize: 11, color: '#888', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                        사진 변경
                      </button>
                    </>
                  ) : (
                    <button onClick={() => fileRefs.current[topic]?.click()}
                      style={{ width: '100%', height: 80, background: '#fff', border: '1.5px dashed #ccc', borderRadius: 8, cursor: 'pointer', fontSize: 12, color: '#aaa' }}>
                      📷 사진 선택
                    </button>
                  )}
                  <input
                    ref={el => { fileRefs.current[topic] = el }}
                    type="file" accept="image/*" style={{ display: 'none' }}
                    onChange={e => { const f = e.target.files?.[0]; if (f) handlePhoto(topic, f) }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 제출 버튼 */}
        <button onClick={generate} disabled={loading || selectedTopics.length === 0}
          style={{
            width: '100%', padding: '14px', borderRadius: 10, border: 'none', fontSize: 15,
            fontWeight: 700, cursor: loading || selectedTopics.length === 0 ? 'not-allowed' : 'pointer',
            background: loading || selectedTopics.length === 0 ? '#bbb' : PRIMARY,
            color: '#fff', letterSpacing: '0.3px', transition: 'background 0.2s'
          }}>
          {loading ? '✨ AI 분석 중...' : '✨ pentwo를 통해 교정하기'}
        </button>
        {selectedTopics.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: 12, color: '#bbb', margin: '8px 0 0' }}>교정 주제를 선택하면 버튼이 활성화됩니다</p>
        )}
      </div>

      {/* 결과 영역 */}
      {result && (
        <div style={{ background: '#fff', border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: '1.5rem', boxShadow: '0 1px 6px rgba(83,74,183,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: PRIMARY }}>AI 교정 결과</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => navigator.clipboard.writeText(fullText)}
                style={{ padding: '5px 12px', background: LIGHT, border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 12, color: PRIMARY, cursor: 'pointer' }}>복사</button>
              <button onClick={() => window.print()}
                style={{ padding: '5px 12px', background: LIGHT, border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 12, color: PRIMARY, cursor: 'pointer' }}>인쇄</button>
              <button onClick={generate}
                style={{ padding: '5px 12px', background: PRIMARY, border: 'none', borderRadius: 6, fontSize: 12, color: '#fff', cursor: 'pointer' }}>재생성</button>
            </div>
          </div>

          {/* 요약 태그 */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {[gender, grade, type, ...selectedTopics].map(tag => (
              <span key={tag} style={{ background: LIGHT, color: PRIMARY, padding: '3px 10px', borderRadius: 10, fontSize: 12, fontWeight: 500 }}>{tag}</span>
            ))}
          </div>

          {/* 인트로 */}
          {result.intro && (
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 16 }}>{result.intro}</p>
          )}

          {/* 주제별 섹션 카드 */}
          {result.sections.map((sec, i) => (
            <div key={i} style={{ background: LIGHT, borderRadius: 10, padding: '1rem 1.25rem', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: PRIMARY, marginBottom: 8 }}>{sec.title}</div>
              <pre style={{ fontSize: 13, color: '#3C3489', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{sec.body}</pre>
            </div>
          ))}

          {/* 섹션 없이 전체 텍스트만 있을 때 */}
          {result.sections.length === 0 && (
            <pre style={{ fontSize: 13, color: '#3C3489', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{result.intro}</pre>
          )}
        </div>
      )}
    </div>
  )
}
