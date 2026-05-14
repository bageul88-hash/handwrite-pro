import React from 'react'

interface PillSelectorProps {
  options: string[]
  selected: string
  onSelect: (v: string) => void
  scrollable?: boolean
}

const PRIMARY = '#534AB7'

export default function PillSelector({ options, selected, onSelect, scrollable }: PillSelectorProps) {
  return (
    <div
      className={scrollable ? 'scroll-x-hidden' : ''}
      style={{
        display: 'flex',
        gap: 8,
        ...(scrollable ? { overflowX: 'auto' } : { flexWrap: 'wrap' }),
      }}
    >
      {options.map(opt => {
        const active = opt === selected
        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            style={{
              flexShrink: 0,
              padding: '7px 14px',
              borderRadius: 999,
              border: '0.5px solid',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'sans-serif',
              whiteSpace: 'nowrap',
              background: active ? PRIMARY : '#fff',
              color: active ? '#fff' : '#555',
              borderColor: active ? PRIMARY : '#ddd',
              transition: 'all 0.15s',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
