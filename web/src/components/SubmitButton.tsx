import React from 'react'

interface SubmitButtonProps {
  disabled: boolean
  onClick: () => void
}

const PRIMARY = '#534AB7'
const PRIMARY_DARK = '#3C3489'

export default function SubmitButton({ disabled, onClick }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: 14,
        border: 'none',
        fontSize: 15,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: disabled ? '#bbb' : PRIMARY,
        color: '#fff',
        letterSpacing: '0.3px',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = PRIMARY_DARK
      }}
      onMouseLeave={e => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = PRIMARY
      }}
    >
      ✨ pentwo를 통해 교정하기
    </button>
  )
}
