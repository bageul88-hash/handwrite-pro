import React from 'react'

const PRIMARY = '#534AB7'
export const allTopics = ['악필 교정', '집필 자세', '손목·팔꿈치', '허리·어깨', '뇌과학', '손 촉각']

interface TopicSelectorProps {
  selected: string[]
  onChange: (topics: string[]) => void
}

export default function TopicSelector({ selected, onChange }: TopicSelectorProps) {
  const toggle = (t: string) => {
    if (selected.includes(t)) {
      onChange(selected.filter(x => x !== t))
    } else if (selected.length < 3) {
      onChange([...selected, t])
    }
  }

  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend style={{ display: 'none' }}>교정 주제 선택</legend>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {allTopics.map(t => {
          const active = selected.includes(t)
          const disabled = !active && selected.length >= 3
          return (
            <button
              key={t}
              onClick={() => toggle(t)}
              disabled={disabled}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                border: '0.5px solid',
                fontSize: 13,
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontFamily: 'sans-serif',
                whiteSpace: 'nowrap',
                background: active ? PRIMARY : '#fff',
                color: active ? '#fff' : disabled ? '#bbb' : '#555',
                borderColor: active ? PRIMARY : disabled ? '#eee' : '#ddd',
                opacity: disabled ? 0.5 : 1,
                transition: 'all 0.15s',
              }}
            >
              {t}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
