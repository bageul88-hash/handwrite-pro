import React, { useState } from 'react'

const menuItems = [
  { id: 'dashboard', label: '대시보드', icon: '📊' },
  { id: 'contents', label: '콘텐츠 관리', icon: '📝' },
  { id: 'users', label: '회원 관리', icon: '👥' },
  { id: 'prompts', label: 'AI 프롬프트', icon: '🤖' },
  { id: 'revenue', label: '매출 통계', icon: '💰' },
  { id: 'notify', label: '알림 발송', icon: '🔔' },
]

const stats = [
  { label: '총 생성 건수', value: '48,230', change: '↑ 12%' },
  { label: '활성 회원', value: '3,812', change: '↑ 8%' },
  { label: '오늘 수익', value: '₩284,000', change: '↑ 15%' },
  { label: '평균 만족도', value: '4.9 ★', change: '↑ 0.2' },
]

const recentUsers = [
  { name: '김학부모', email: 'kim@email.com', plan: '24회', date: '2026.05.08', status: '활성' },
  { name: '이선생님', email: 'lee@email.com', plan: '48회', date: '2026.05.08', status: '활성' },
  { name: '박일반인', email: 'park@email.com', plan: '7회', date: '2026.05.07', status: '활성' },
  { name: '최학부모', email: 'choi@email.com', plan: '24회', date: '2026.05.07', status: '만료' },
]

const recentContents = [
  { title: '초1-2 한글 악필 교정', grade: '초1-2', type: '한글', date: '2026.05.08', status: '승인' },
  { title: '중등 영어 필기체 교정', grade: '중등', type: '영어', date: '2026.05.08', status: '검토중' },
  { title: '성인 자세 교정 가이드', grade: '성인', type: '한글', date: '2026.05.07', status: '승인' },
  { title: '초3-4 숫자 교정', grade: '초3-4', type: '숫자', date: '2026.05.07', status: '수정요청' },
]

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif', background: '#f5f5f5' }}>
      {/* 사이드바 */}
      <div style={{ width: 220, background: '#1e1e2e', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>✏️</span> 관리자 콘솔
        </div>
        {menuItems.map(item => (
          <button key={item.id} onClick={() => setActiveMenu(item.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8,
              border: 'none', cursor: 'pointer', fontSize: 13, textAlign: 'left',
              background: activeMenu === item.id ? '#534AB7' : 'transparent',
              color: activeMenu === item.id ? '#fff' : '#B4B2A9' }}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </div>

      {/* 메인 */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>

        {/* 대시보드 */}
        {activeMenu === 'dashboard' && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: '1.25rem', color: '#1e1e2e' }}>대시보드</div>

            {/* 통계 카드 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: '1.25rem' }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: '#1e1e2e' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#1D9E75', marginTop: 2 }}>{s.change}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {/* 최근 회원 */}
              <div style={{ background: '#fff', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: '0.75rem' }}>최근 가입 회원</div>
                <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ color: '#888' }}>
                      <th style={{ textAlign: 'left', padding: '4px 6px', borderBottom: '1px solid #eee' }}>이름</th>
                      <th style={{ textAlign: 'left', padding: '4px 6px', borderBottom: '1px solid #eee' }}>플랜</th>
                      <th style={{ textAlign: 'left', padding: '4px 6px', borderBottom: '1px solid #eee' }}>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(u => (
                      <tr key={u.email}>
                        <td style={{ padding: '6px 6px', borderBottom: '1px solid #f5f5f5' }}>
                          <div style={{ fontWeight: 500 }}>{u.name}</div>
                          <div style={{ color: '#aaa', fontSize: 11 }}>{u.email}</div>
                        </td>
                        <td style={{ padding: '6px 6px', borderBottom: '1px solid #f5f5f5' }}>
                          <span style={{ background: '#EEEDFE', color: '#534AB7', padding: '2px 8px', borderRadius: 10, fontSize: 11 }}>{u.plan}</span>
                        </td>
                        <td style={{ padding: '6px 6px', borderBottom: '1px solid #f5f5f5' }}>
                          <span style={{ color: u.status === '활성' ? '#1D9E75' : '#E24B4A', fontSize: 11 }}>● {u.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 최근 콘텐츠 */}
              <div style={{ background: '#fff', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: '0.75rem' }}>최근 콘텐츠</div>
                <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ color: '#888' }}>
                      <th style={{ textAlign: 'left', padding: '4px 6px', borderBottom: '1px solid #eee' }}>제목</th>
                      <th style={{ textAlign: 'left', padding: '4px 6px', borderBottom: '1px solid #eee' }}>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContents.map(c => (
                      <tr key={c.title}>
                        <td style={{ padding: '6px 6px', borderBottom: '1px solid #f5f5f5' }}>
                          <div style={{ fontWeight: 500 }}>{c.title}</div>
                          <div style={{ color: '#aaa', fontSize: 11 }}>{c.grade} · {c.type} · {c.date}</div>
                        </td>
                        <td style={{ padding: '6px 6px', borderBottom: '1px solid #f5f5f5' }}>
                          <span style={{
                            padding: '2px 8px', borderRadius: 10, fontSize: 11,
                            background: c.status === '승인' ? '#E1F5EE' : c.status === '검토중' ? '#FAEEDA' : '#FAECE7',
                            color: c.status === '승인' ? '#085041' : c.status === '검토중' ? '#633806' : '#712B13'
                          }}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* AI 프롬프트 관리 */}
        {activeMenu === 'prompts' && (
          <PromptManager />
        )}

        {/* 매출 통계 */}
        {activeMenu === 'revenue' && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: '1.25rem', color: '#1e1e2e' }}>매출 통계</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: '1.25rem' }}>
              {[
                { label: '이번 달 수익', value: '₩2,840,000' },
                { label: '7회 패키지', value: '142건' },
                { label: '24회 패키지', value: '89건' },
                { label: '48회 패키지', value: '34건' },
                { label: '평균 결제액', value: '₩18,200' },
                { label: '재구매율', value: '67%' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#534AB7' }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 알림 발송 */}
        {activeMenu === 'notify' && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: '1.25rem', color: '#1e1e2e' }}>알림 발송</div>
            <div style={{ background: '#fff', borderRadius: 12, padding: '1.25rem', border: '1px solid #eee', maxWidth: 500 }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>대상 선택</label>
                <select style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13 }}>
                  <option>전체 회원</option>
                  <option>학부형만</option>
                  <option>크레딧 3회 이하</option>
                  <option>만료 30일 전</option>
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>알림 제목</label>
                <input style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13 }} placeholder="알림 제목 입력" />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>내용</label>
                <textarea style={{ width: '100%', height: 100, padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, resize: 'vertical' }} placeholder="알림 내용 입력" />
              </div>
              <button style={{ width: '100%', padding: 12, background: '#534AB7', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                📨 발송하기
              </button>
            </div>
          </div>
        )}

        {/* 회원 관리 */}
        {activeMenu === 'users' && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: '1.25rem', color: '#1e1e2e' }}>회원 관리</div>
            <div style={{ background: '#fff', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
              <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: '#888', borderBottom: '1px solid #eee' }}>
                    <th style={{ textAlign: 'left', padding: '8px' }}>이름</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>이메일</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>플랜</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>가입일</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(u => (
                    <tr key={u.email} style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <td style={{ padding: '8px', fontWeight: 500 }}>{u.name}</td>
                      <td style={{ padding: '8px', color: '#666' }}>{u.email}</td>
                      <td style={{ padding: '8px' }}><span style={{ background: '#EEEDFE', color: '#534AB7', padding: '2px 8px', borderRadius: 10, fontSize: 12 }}>{u.plan}</span></td>
                      <td style={{ padding: '8px', color: '#888', fontSize: 12 }}>{u.date}</td>
                      <td style={{ padding: '8px' }}><span style={{ color: u.status === '활성' ? '#1D9E75' : '#E24B4A' }}>● {u.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 콘텐츠 관리 */}
        {activeMenu === 'contents' && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: '1.25rem', color: '#1e1e2e' }}>콘텐츠 관리</div>
            <div style={{ background: '#fff', borderRadius: 12, padding: '1rem', border: '1px solid #eee' }}>
              <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: '#888', borderBottom: '1px solid #eee' }}>
                    <th style={{ textAlign: 'left', padding: '8px' }}>제목</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>학년</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>유형</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>날짜</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContents.map(c => (
                    <tr key={c.title} style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <td style={{ padding: '8px', fontWeight: 500 }}>{c.title}</td>
                      <td style={{ padding: '8px', color: '#666' }}>{c.grade}</td>
                      <td style={{ padding: '8px', color: '#666' }}>{c.type}</td>
                      <td style={{ padding: '8px', color: '#888', fontSize: 12 }}>{c.date}</td>
                      <td style={{ padding: '8px' }}>
                        <span style={{
                          padding: '2px 8px', borderRadius: 10, fontSize: 12,
                          background: c.status === '승인' ? '#E1F5EE' : c.status === '검토중' ? '#FAEEDA' : '#FAECE7',
                          color: c.status === '승인' ? '#085041' : c.status === '검토중' ? '#633806' : '#712B13'
                        }}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── AI 프롬프트 관리 ────────────────────────────────────────────────────────

function PromptManager() {
  const SERVER = 'https://handwrite-pro.onrender.com'

  const DEFAULT_PROMPT = `당신은 글씨교정 전문가이자 뇌과학 전문가입니다.
{grade} 학생의 {type} 글씨에서 나타나는 [{topics}] 문제를
{audience}에게 아래 구조로 한국어로 작성해주세요.

1. 문제 원인 분석
2. 뇌과학적 근거 (해마·대뇌피질·소뇌)
3. 신체 자세 교정 (손목/팔뚝/어깨/허리/목/다리)
4. 구체적 해결 방법
5. 학부형 실천 가이드`

  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [savedMsg, setSavedMsg] = useState('')
  const [showTest, setShowTest] = useState(false)
  const [grade, setGrade] = useState('초3-4')
  const [type, setType] = useState('악필')
  const [topics, setTopics] = useState('글씨 크기 불균형, 획 순서 오류')
  const [audience, setAudience] = useState('학부모')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState('')

  const insertTag = (tag: string) => {
    const ta = document.getElementById('promptTa') as HTMLTextAreaElement
    if (!ta) return
    const s = ta.selectionStart, e = ta.selectionEnd
    setPrompt(prompt.slice(0, s) + tag + prompt.slice(e))
    setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + tag.length; ta.focus() }, 0)
  }

  const savePrompt = async () => {
    try {
      const res = await fetch(`${SERVER}/admin/prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      setSavedMsg(data.success ? '✓ 저장되었습니다' : '❌ 저장 실패')
      setTimeout(() => setSavedMsg(''), 2500)
    } catch {
      setSavedMsg('❌ 서버 연결 실패')
      setTimeout(() => setSavedMsg(''), 2500)
    }
  }

  const runTest = async () => {
    setLoading(true); setReport(null); setError('')
    try {
      const res = await fetch(`${SERVER}/admin/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade, type, topics, audience })
      })
      const data = await res.json()
      if (data.success) setReport(data.data)
      else setError(data.error || '오류 발생')
    } catch(e: any) { setError(e.message) }
    setLoading(false)
  }

  const card: React.CSSProperties = { background: '#fff', borderRadius: 12, padding: '1.25rem', border: '1px solid #eee', marginBottom: '1rem' }

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: '1.25rem', color: '#1e1e2e' }}>AI 프롬프트 관리</div>

      {/* 프롬프트 편집 */}
      <div style={card}>
        <div style={{ fontSize: 14, fontWeight: 600, textAlign: 'center', marginBottom: '0.75rem' }}>기본 프롬프트 편집</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 10 }}>
          {['{grade}', '{type}', '{topics}', '{audience}'].map(v => (
            <button key={v} onClick={() => insertTag(v)}
              style={{ background: '#EEEDFE', color: '#534AB7', border: 'none', borderRadius: 20, padding: '3px 12px', fontSize: 12, cursor: 'pointer' }}>
              {v}
            </button>
          ))}
        </div>
        <textarea id="promptTa" value={prompt} onChange={e => setPrompt(e.target.value)}
          style={{ width: '100%', minHeight: 200, padding: 12, borderRadius: 8, border: '1.5px solid #ddd', fontFamily: 'monospace', fontSize: 13, resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box' }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
          <button onClick={savePrompt}
            style={{ padding: '9px 20px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            저장하기
          </button>
          <button onClick={() => setShowTest(!showTest)}
            style={{ padding: '9px 20px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
            테스트
          </button>
          {savedMsg && <span style={{ fontSize: 12, color: savedMsg.startsWith('✓') ? '#1D9E75' : '#E24B4A' }}>{savedMsg}</span>}
        </div>
      </div>

      {/* 테스트 패널 */}
      {showTest && (
        <div style={card}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: '0.75rem' }}>테스트 실행</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1rem' }}>
            {[
              { label: '{grade} 학년', type: 'select', value: grade, setter: setGrade, options: ['초1-2', '초3-4', '초5-6', '중학교 1학년'] },
              { label: '{type} 유형', type: 'select', value: type, setter: setType, options: ['악필', '받아쓰기', '수학 노트', '영어 필기'] },
              { label: '{topics} 문제', type: 'input', value: topics, setter: setTopics },
              { label: '{audience} 대상', type: 'select', value: audience, setter: setAudience, options: ['학부모', '담임 선생님', '학생 본인'] },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>{f.label}</label>
                {f.type === 'select' ? (
                  <select value={f.value} onChange={e => f.setter(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13 }}>
                    {(f.options || []).map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input value={f.value} onChange={e => f.setter(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13 }} />
                )}
              </div>
            ))}
          </div>
          <button onClick={runTest} disabled={loading}
            style={{ padding: '9px 20px', background: loading ? '#aaa' : '#534AB7', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? '⏳ AI 분석 중...' : 'AI 분석 실행'}
          </button>
          {error && (
            <div style={{ marginTop: 10, background: '#fff5f5', border: '1px solid #fbc0c0', borderRadius: 8, padding: 12, color: '#c0392b', fontSize: 13 }}>
              {error}
            </div>
          )}
        </div>
      )}

      {/* 리포트 렌더링 */}
      {report && <ReportView data={report} />}
    </div>
  )
}

// ─── 리포트 뷰 ──────────────────────────────────────────────────────────────

function ReportView({ data }: { data: any }) {
  const card: React.CSSProperties = { background: '#fff', border: '1px solid #e2dfef', borderRadius: 14, marginBottom: '1rem', overflow: 'hidden' }
  const secHeader: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '1px solid #eee' }
  const numBadge: React.CSSProperties = { width: 26, height: 26, borderRadius: '50%', background: '#534AB7', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, lineHeight: '1' }
  const body: React.CSSProperties = { padding: '16px 18px' }
  const infoBox: React.CSSProperties = { background: '#f8f7ff', borderLeft: '3px solid #534AB7', borderRadius: '0 8px 8px 0', padding: '10px 14px', fontSize: 13, lineHeight: 1.75, color: '#3a3660', marginBottom: 14 }
  const th: React.CSSProperties = { background: '#f2f0ff', color: '#534AB7', fontWeight: 600, padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #e2dfef', fontSize: 13 }
  const td: React.CSSProperties = { padding: '8px 12px', borderBottom: '1px solid #f0eff8', fontSize: 13 }

  return (
    <div style={{ animation: 'fadeIn .4s ease' }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>

      {/* 헤더 */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1e1e2e', marginBottom: 4 }}>{data.reportTitle}</div>
        <div style={{ fontSize: 13, color: '#888' }}>{data.reportSub}</div>
      </div>

      {/* 섹션 1 — 원인과 뇌과학 */}
      <div style={card}>
        <div style={secHeader}>
          <div style={numBadge}>1</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{data.section1?.title}</div>
        </div>
        <div style={body}>
          <div style={infoBox}>{data.section1?.intro}</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>구분</th>
                <th style={th}>주요 특징</th>
                <th style={th}>뇌과학적 의미</th>
              </tr>
            </thead>
            <tbody>
              {(data.section1?.table || []).map((r: any, i: number) => (
                <tr key={i}>
                  <td style={td}>{r.category}</td>
                  <td style={td}>{r.features}</td>
                  <td style={{ ...td, color: '#7b7899', fontSize: 12 }}>{r.brain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 섹션 2 — 자세 체크포인트 */}
      <div style={card}>
        <div style={secHeader}>
          <div style={numBadge}>2</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{data.section2?.title}</div>
        </div>
        <div style={body}>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 14, lineHeight: 1.7 }}>{data.section2?.intro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {(data.section2?.checkpoints || []).map((c: any, i: number) => (
              <div key={i} style={{ border: '1px solid #e2dfef', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1e1e2e', marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: '#888', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 섹션 3 — Daily Solution */}
      <div style={card}>
        <div style={secHeader}>
          <div style={numBadge}>3</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{data.section3?.title}</div>
        </div>
        <div style={body}>
          {/* 훈련 2열 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[
              { title: data.section3?.motorTitle, items: data.section3?.motorItems },
              { title: data.section3?.spaceTitle,  items: data.section3?.spaceItems },
            ].map((box, i) => (
              <div key={i} style={{ border: '1px solid #e2dfef', borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#534AB7', marginBottom: 8 }}>{box.title}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(box.items || []).map((item: string, j: number) => (
                    <li key={j} style={{ fontSize: 12, color: '#1e1e2e', lineHeight: 1.8, paddingLeft: 10, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#534AB7' }}>•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 학부모 실천 수칙 */}
          <div style={{ background: '#fffbf0', border: '1px solid #f0d896', borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#b8860b', marginBottom: 10 }}>♡ {data.section3?.parentTitle}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {(data.section3?.parentItems || []).map((p: any, i: number) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 3 }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: '#7a5c00', fontWeight: 600, lineHeight: 1.4 }}>{p.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 인용 */}
          {data.section3?.quote && (
            <div style={{ background: '#f8f7ff', borderRadius: 10, padding: '14px 18px', fontSize: 13, fontStyle: 'italic', color: '#4a4680', lineHeight: 1.8, borderLeft: '3px solid #534AB7' }}>
              "{data.section3.quote}"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}