import React from 'react'
import { CheckItem } from '../data/gradeGuides'

interface CheckListProps {
  items: CheckItem[]
}

export default function CheckList({ items }: CheckListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            background: 'rgba(0,0,0,0.03)',
            borderRadius: 8,
            padding: '10px 12px',
          }}
        >
          <span
            style={{
              flexShrink: 0,
              fontSize: 14,
              color: item.ok ? '#1D9E75' : '#BA7517',
              fontWeight: 700,
            }}
          >
            {item.ok ? '✓' : '⚠'}
          </span>
          <span style={{ fontSize: 11, color: '#444', lineHeight: 1.5 }}>{item.text}</span>
        </div>
      ))}
    </div>
  )
}
