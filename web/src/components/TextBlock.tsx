import React from 'react'
import { TextBlock as Block } from '../data/gradeGuides'

interface TextBlockProps {
  blocks: Block[]
}

export default function TextBlock({ blocks }: TextBlockProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {blocks.map((block, i) => (
        <div key={i}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 6 }}>
            {block.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {block.items.map((item, j) => (
              <div key={j} style={{ fontSize: 11, color: '#555', lineHeight: 1.6, paddingLeft: 8 }}>
                — {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
