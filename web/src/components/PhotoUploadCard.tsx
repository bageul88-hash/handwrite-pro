import React, { useRef } from 'react'

interface PhotoUploadCardProps {
  topic: string
  preview?: string
  onFile: (file: File) => void
}

const PRIMARY = '#534AB7'
const PRIMARY_BG = '#EEEDFE'

export default function PhotoUploadCard({ topic, preview, onFile }: PhotoUploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      style={{
        background: PRIMARY_BG,
        borderRadius: 12,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 500, color: PRIMARY }}>{topic}</div>
      {preview ? (
        <>
          <img
            src={preview}
            alt={topic}
            style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 8 }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            style={{
              background: 'none',
              border: 'none',
              color: PRIMARY,
              fontSize: 11,
              cursor: 'pointer',
              textDecoration: 'underline',
              textAlign: 'left',
              padding: 0,
            }}
          >
            사진 변경
          </button>
        </>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          style={{
            width: '100%',
            height: 80,
            background: '#fff',
            border: '1.5px dashed #ccc',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 12,
            color: '#aaa',
          }}
        >
          📷 사진 선택
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => {
          const f = e.target.files?.[0]
          if (f) onFile(f)
        }}
      />
    </div>
  )
}
