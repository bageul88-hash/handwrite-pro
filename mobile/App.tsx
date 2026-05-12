import { useState } from 'react'

const grades = ['초1-2', '초3-4', '초5-6', '중등', '성인']
const types = ['한글', '영어', '숫자']
const topics = ['악필 교정', '집필 자세', '손목·팔뚝', '허리·어깨', '뇌과학', '손 촉각']
const packages = [
  { credits: 7,  price: 5900,  per: '₩843', label: '첫 구매 추천' },
  { credits: 24, price: 15900, per: '₩663', label: '가장 인기' },
  { credits: 48, price: 26900, per: '₩561', label: '최고 가성비' },
]
declare global { interface Window { IMP: any } }

export default function App() {
  const [grade, setGrade] = useState('초1-2')
  const [type, setType] = useState('한글')
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['악필 교정'])
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState(1)
  const [showPricing, setShowPricing] = useState(false)
  const [selectedPkg, setSelectedPkg] = useState(24)
  const [payLoading, setPayLoading] = useState(false)

  const toggleTopic = (t: string) =>
    setSelectedTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const generate = async () => {
    if (credits <= 0) { setShowPricing(true); return }
    setLoading(true)
    setCredits(c => c - 1)
    try {
      const res = await fetch('https://handwrite-pro.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade, type, topics: selectedTopics, audience: '학부형' })
      })
      const data = await res.json()
      if (data.success) setResult(data.content)
      else alert('생성 실패: ' + data.error)
    } catch { alert('서버 연결 실패.') }
    finally { setLoading(false) }
  }

  const handlePayment = () => {
    const pkg = packages.find(p => p.credits === selectedPkg)!
    setPayLoading(true)
    window.IMP.init('imp74368265')
    window.IMP.request_pay({
      pg: 'html5_inicis', pay_method: 'card',
      merchant_uid: `handwrite_${Date.now()}`,
      name: `글씨교정 AI ${pkg.credits}회 크레딧`,
      amount: pkg.price, buyer_name: '구매자',
    }, async (rsp: any) => {
      if (rsp.success) {
        const res = await fetch('https://handwrite-pro.onrender.com/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imp_uid: rsp.imp_uid, credits: pkg.credits })
        })
        const data = await res.json()
        if (data.success) { setCredits(c => c + data.credits); setShowPricing(false); alert(`✅ ${data.credits}회 충전!`) }
      } else { alert('결제 실패: ' + rsp.error_msg) }
      setPayLoading(false)
    })
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#534AB7' }}>글씨교정 AI</h1>
          <p style={{ fontSize: 13, color: '#888', margin: '4px 0 0' }}>뇌과학 · 자세 · 집필 통합 교정 솔루션</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ background: '#EEEDFE', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: '#534AB7', fontWeight: 500 }}>크레딧 {credits}회</div>
          <button onClick={() => setShowPricing(!showPricing)}
            style={{ padding: '6px 14px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, cursor: 'pointer' }}>
            💳 충전
          </button>
        </div>
      </div>

      {showPricing && (
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#534AB7', marginBottom: '1rem', textAlign: 'center' }}>크레딧 충전</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: '1rem' }}>
            {packages.map(pkg => (
              <div key={pkg.credits} onClick={() => setSelectedPkg(pkg.credits)}
                style={{ border: selectedPkg === pkg.credits ? '2px solid #534AB7' : '1px solid #eee',
                  borderRadius: 10, padding: '0.875rem', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: 11, background: '#EEEDFE', color: '#534AB7', borderRadius: 10, padding: '2px 8px', marginBottom: 6, display: 'inline-block' }}>{pkg.label}</div>
                <div style={{ fontSize: 24, fontWeight: 600 }}>{pkg.credits}<span style={{ fontSize: 13, color: '#888' }}>회</span></div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>₩{pkg.price.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: '#0F6E56' }}>회당 {pkg.per}</div>
              </div>
            ))}
          </div>
          <button onClick={handlePayment} disabled={payLoading}
            style={{ width: '100%', padding: 12, background: payLoading ? '#aaa' : '#534AB7',
              color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            {payLoading ? '결제 처리 중...' : `💳 ${selectedPkg}회 결제 (₩${packages.find(p=>p.credits===selectedPkg)!.price.toLocaleString()})`}
          </button>
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>학년 선택</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {grades.map(g => (
              <button key={g} onClick={() => setGrade(g)}
                style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid', fontSize: 13, cursor: 'pointer',
                  background: grade===g?'#534AB7':'#fff', color: grade===g?'#fff':'#666', borderColor: grade===g?'#534AB7':'#ddd' }}>{g}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>글씨 유형</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {types.map(t => (
              <button key={t} onClick={() => setType(t)}
                style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid', fontSize: 13, cursor: 'pointer',
                  background: type===t?'#534AB7':'#fff', color: type===t?'#fff':'#666', borderColor: type===t?'#534AB7':'#ddd' }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>교정 주제 (복수 선택)</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {topics.map(t => (
              <button key={t} onClick={() => toggleTopic(t)}
                style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid', fontSize: 13, cursor: 'pointer',
                  background: selectedTopics.includes(t)?'#EEEDFE':'#fff',
                  color: selectedTopics.includes(t)?'#534AB7':'#666',
                  borderColor: selectedTopics.includes(t)?'#534AB7':'#ddd' }}>{t}</button>
            ))}
          </div>
        </div>
        <button onClick={generate} disabled={loading}
          style={{ width: '100%', padding: '12px', background: loading?'#aaa':'#534AB7',
            color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading?'not-allowed':'pointer' }}>
          {loading ? '✨ AI 생성 중...' : '✨ AI 콘텐츠 생성하기'}
        </button>
      </div>

      {result && (
        <div style={{ background: '#EEEDFE', border: '1px solid #AFA9EC', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#534AB7', marginBottom: 8 }}>생성된 콘텐츠</div>
          <pre style={{ fontSize: 13, color: '#3C3489', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{result}</pre>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {['복사', '공유', '저장', '재생성'].map(btn => (
              <button key={btn}
                onClick={() => btn==='복사'?navigator.clipboard.writeText(result):btn==='재생성'?generate():null}
                style={{ flex: 1, padding: '7px', background: '#fff', border: '1px solid #AFA9EC',
                  borderRadius: 8, fontSize: 12, color: '#534AB7', cursor: 'pointer' }}>{btn}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}