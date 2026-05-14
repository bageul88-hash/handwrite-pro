import React from 'react'

interface SectionCardProps {
  badge: string
  badgeBg: string
  badgeText: string
  title: string
  desc: string
  children: React.ReactNode
}

export default function SectionCard({
  badge,
  badgeBg,
  badgeText,
  title,
  desc,
  children,
}: SectionCardProps) {
  return (
    <div
      style={{
        border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          padding: '12px 14px',
          background: '#fafafa',
          borderBottom: '0.5px solid rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: 999,
            background: badgeBg,
            color: badgeText,
            fontSize: 13,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {badge}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>{title}</div>
          {desc && <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{desc}</div>}
        </div>
      </div>
      <div style={{ padding: '12px 14px' }}>{children}</div>
    </div>
  )
}
