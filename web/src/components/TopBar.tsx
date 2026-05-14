import React from 'react'

interface TopBarProps {
  onSave?: () => void
  title: string
  sub?: string
}

export default function TopBar({ onSave, title, sub }: TopBarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 20 }}>
      <button
        onClick={onSave}
        style={{
          flexShrink: 0,
          padding: '8px 14px',
          background: '#534AB7',
          color: '#fff',
          border: 'none',
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        ♡ 저장
      </button>
      <div
        style={{
          flex: 1,
          background: '#fff',
          border: '0.5px solid rgba(0,0,0,0.12)',
          borderRadius: 999,
          padding: '8px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>✏ {title}</div>
        {sub && <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}
