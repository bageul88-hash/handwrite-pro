import React from 'react'
import { GradeGuide } from '../data/gradeGuides'
import TopBar from './TopBar'
import SectionCard from './SectionCard'
import ItemGrid from './ItemGrid'
import CheckList from './CheckList'
import TextBlock from './TextBlock'

const PRIMARY = '#534AB7'
const PRIMARY_BG = '#EEEDFE'
const PRIMARY_TEXT = '#3C3489'
const BORDER = '#AFA9EC'

interface ResultCardProps {
  guide: GradeGuide
  aiIntro?: string
  onSave?: () => void
  onRegenerate?: () => void
}

export default function ResultCard({ guide, aiIntro, onSave, onRegenerate }: ResultCardProps) {
  return (
    <div
      style={{
        background: '#fff',
        border: `1.5px solid ${BORDER}`,
        borderRadius: 12,
        padding: '1.25rem',
        boxShadow: '0 1px 6px rgba(83,74,183,0.08)',
      }}
    >
      <TopBar onSave={onSave} title={guide.pill} sub={guide.sub} />

      {aiIntro && (
        <p
          style={{
            fontSize: 13,
            color: '#555',
            lineHeight: 1.7,
            marginBottom: 16,
            borderLeft: `3px solid ${PRIMARY}`,
            paddingLeft: 12,
            margin: '0 0 16px',
          }}
        >
          {aiIntro}
        </p>
      )}

      <SectionCard
        badge="1"
        badgeBg="#E1F5EE"
        badgeText="#085041"
        title={guide.step1.title}
        desc={guide.step1.desc}
      >
        <ItemGrid items={guide.step1.items} />
      </SectionCard>

      <SectionCard
        badge="2"
        badgeBg="#E6F1FB"
        badgeText="#0C447C"
        title={guide.step2.title}
        desc={guide.step2.desc}
      >
        {guide.step2.gridItems ? (
          <ItemGrid items={guide.step2.gridItems} />
        ) : guide.step2.checks ? (
          <CheckList items={guide.step2.checks} />
        ) : null}
      </SectionCard>

      <SectionCard
        badge="3"
        badgeBg="#FAEEDA"
        badgeText="#633806"
        title={guide.step3.title}
        desc={guide.step3.desc}
      >
        <TextBlock blocks={guide.step3.blocks} />
      </SectionCard>

      <SectionCard
        badge="4"
        badgeBg={PRIMARY_BG}
        badgeText={PRIMARY_TEXT}
        title={guide.step4.title}
        desc=""
      >
        <ItemGrid items={guide.step4.items} />
      </SectionCard>

      <div
        style={{
          background: 'rgba(0,0,0,0.02)',
          borderRadius: 8,
          padding: '10px 14px',
          marginTop: 4,
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: '#888',
            margin: 0,
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          *교사·교정사 손 기술이 아니라, 아이의 뇌와 몸이 함께하는 변화를 배우는 성장 경험입니다.*
        </p>
      </div>

      {onRegenerate && (
        <button
          onClick={onRegenerate}
          style={{
            width: '100%',
            marginTop: 12,
            padding: '10px',
            borderRadius: 10,
            border: 'none',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            background: PRIMARY_BG,
            color: PRIMARY,
          }}
        >
          재생성
        </button>
      )}
    </div>
  )
}
