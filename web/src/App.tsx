import { useState, useRef, useEffect } from 'react'
import './App.css'
import { gradeGuides } from './data/gradeGuides'
import TopBar from './components/TopBar'
import PillSelector from './components/PillSelector'
import GradeSelector, { gradeMap } from './components/GradeSelector'
import TopicSelector from './components/TopicSelector'
import PhotoUploadCard from './components/PhotoUploadCard'
import SubmitButton from './components/SubmitButton'
import ResultCard from './components/ResultCard'

const SERVER = 'https://handwrite-pro.onrender.com'

function guideKey(cat: string): string {
  if (cat === '2차논술고사') return '2차논술'
  return cat
}

interface FormState {
  gender: '남' | '여'
  gradeCategory: string
  subGrade: string
  scriptType: string
  topics: string[]
  photos: Record<string, File>
}

export default function App() {
  const [form, setForm] = useState<FormState>({
    gender: '남',
    gradeCategory: '초등',
    subGrade: '1학년',
    scriptType: '한글',
    topics: [],
    photos: {},
  })
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [aiIntro, setAiIntro] = useState<string | undefined>(undefined)
  const [showResult, setShowResult] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const setGender = (g: string) =>
    setForm(f => ({ ...f, gender: g as '남' | '여' }))

  const setGradeCategory = (cat: string) => {
    const subs = gradeMap[cat] ?? []
    setForm(f => ({ ...f, gradeCategory: cat, subGrade: subs[0] ?? '' }))
  }

  const setSubGrade = (sub: string) => setForm(f => ({ ...f, subGrade: sub }))

  const setScriptType = (t: string) => setForm(f => ({ ...f, scriptType: t }))

  const setTopics = (topics: string[]) => {
    const removed = form.topics.filter(t => !topics.includes(t))
    setForm(f => {
      const newPhotos = { ...f.photos }
      removed.forEach(t => delete newPhotos[t])
      return { ...f, topics, photos: newPhotos }
    })
    if (removed.length > 0) {
      setPreviews(p => {
        const n = { ...p }
        removed.forEach(t => delete n[t])
        return n
      })
    }
  }

  const handlePhoto = (topic: string, file: File) => {
    setForm(f => ({ ...f, photos: { ...f.photos, [topic]: file } }))
    setPreviews(p => ({ ...p, [topic]: URL.createObjectURL(file) }))
  }

  const generate = async () => {
    if (form.topics.length === 0) {
      alert('교정 주제를 1개 이상 선택해주세요.')
      return
    }
    setLoading(true)
    setShowResult(false)
    setAiIntro(undefined)
    try {
      const fd = new FormData()
      fd.append('gender', form.gender)
      fd.append('grade', `${form.gradeCategory} ${form.subGrade}`)
      fd.append('type', form.scriptType)
      form.topics.forEach(t => fd.append('topics', t))
      form.topics.forEach(t => {
        if (form.photos[t]) fd.append(`photo_${t}`, form.photos[t])
      })
      const res = await fetch(`${SERVER}/generate`, { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        const firstLine = (data.content as string)
          .split('\n')
          .find((l: string) => l.trim() && !l.startsWith('#'))
        setAiIntro(firstLine?.trim() ?? undefined)
      }
    } catch {
      // 서버 실패 시 정적 가이드만 표시
    } finally {
      setLoading(false)
      setShowResult(true)
    }
  }

  useEffect(() => {
    if (showResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showResult])

  const currentGuide = gradeGuides[guideKey(form.gradeCategory)] ?? gradeGuides['일반인']

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '0 auto',
        padding: '1.5rem 1rem',
        fontFamily: 'sans-serif',
        color: '#222',
        fontSize: 13,
      }}
    >
      <TopBar
        onSave={() => alert('저장 기능은 준비 중입니다.')}
        title="우리 아이 악필 탈출 3단계 핵심 가이드"
        sub="뇌과학 기반 · 자세 교정 · 일상 실전 전략"
      />

      <div
        style={{
          background: '#fff',
          border: '0.5px solid rgba(0,0,0,0.1)',
          borderRadius: 12,
          padding: '1.25rem',
          marginBottom: '1rem',
          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        }}
      >
        {/* 성별 */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 20px' }}>
          <legend style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 8, padding: 0, display: 'block' }}>
            성별
          </legend>
          <PillSelector options={['남', '여']} selected={form.gender} onSelect={setGender} />
        </fieldset>

        {/* 학년 */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 20px' }}>
          <legend style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 8, padding: 0, display: 'block' }}>
            학년 선택
          </legend>
          <GradeSelector
            category={form.gradeCategory}
            subGrade={form.subGrade}
            onCategoryChange={setGradeCategory}
            onSubGradeChange={setSubGrade}
          />
        </fieldset>

        {/* 글씨 유형 */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 20px' }}>
          <legend style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 8, padding: 0, display: 'block' }}>
            글씨 유형
          </legend>
          <PillSelector
            options={['한글', '영어', '숫자']}
            selected={form.scriptType}
            onSelect={setScriptType}
          />
        </fieldset>

        {/* 교정 주제 */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 20px' }}>
          <legend style={{ padding: 0, marginBottom: 8, display: 'block' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#444' }}>교정 주제</span>
            <span style={{ fontSize: 11, color: '#999', marginLeft: 6 }}>
              (최대 3개 · {form.topics.length}/3 선택됨)
            </span>
          </legend>
          <TopicSelector selected={form.topics} onChange={setTopics} />
        </fieldset>

        {/* 사진 업로드 */}
        {form.topics.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 8 }}>
              주제별 사진 업로드
              <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 6 }}>
                (선택 — 첨부 시 더 정확한 분석)
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 10,
              }}
            >
              {form.topics.map(topic => (
                <PhotoUploadCard
                  key={topic}
                  topic={topic}
                  preview={previews[topic]}
                  onFile={file => handlePhoto(topic, file)}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA 버튼 */}
        <SubmitButton loading={loading} disabled={form.topics.length === 0} onClick={generate} />
        {form.topics.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: 11, color: '#bbb', margin: '8px 0 0' }}>
            교정 주제를 선택하면 버튼이 활성화됩니다
          </p>
        )}
      </div>

      {/* 결과 카드 */}
      {showResult && (
        <div ref={resultRef}>
          <ResultCard
            guide={currentGuide}
            aiIntro={aiIntro}
            onSave={() => alert('저장 기능은 준비 중입니다.')}
            onRegenerate={generate}
          />
        </div>
      )}
    </div>
  )
}
