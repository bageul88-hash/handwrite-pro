import React from 'react'

interface SubmitButtonProps {
  loading: boolean
  disabled: boolean
  onClick: () => void
}

const PRIMARY = '#534AB7'
const PRIMARY_DARK = '#3C3489'

export default function SubmitButton({ loading, disabled, onClick }: SubmitButtonProps) {
  const inactive = disabled || loading
  return (
    <button
      onClick={onClick}
      disabled={inactive}
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: 14,
        border: 'none',
        fontSize: 15,
        fontWeight: 700,
        cursor: inactive ? 'not-allowed' : 'pointer',
        background: inactive ? '#bbb' : PRIMARY,
        color: '#fff',
        letterSpacing: '0.3px',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => {
        if (!inactive) (e.currentTarget as HTMLButtonElement).style.background = PRIMARY_DARK
      }}
      onMouseLeave={e => {
        if (!inactive) (e.currentTarget as HTMLButtonElement).style.background = PRIMARY
      }}
    >
      {loading ? '✨ AI 분석 중...' : '✨ pentwo를 통해 교정하기'}
    </button>
  )
}
