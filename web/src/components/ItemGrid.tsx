import React from 'react'
import { GridItem } from '../data/gradeGuides'

interface ItemGridProps {
  items: GridItem[]
}

export default function ItemGrid({ items }: ItemGridProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: 'rgba(0,0,0,0.03)',
            borderRadius: 8,
            padding: '10px 12px',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 4 }}>
            {item.label}
          </div>
          <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  )
}
