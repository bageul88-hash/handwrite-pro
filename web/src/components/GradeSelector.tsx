import React from 'react'
import PillSelector from './PillSelector'

export const gradeMap: Record<string, string[]> = {
  '유치원':      ['5세(만3세)', '6세(만4세)', '7세(만5세)'],
  '초등':        ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'],
  '중등':        ['중1', '중2', '중3'],
  '고등':        ['고1', '고2', '고3'],
  '대학':        ['1학년', '2학년', '3학년', '4학년'],
  '일반인':      ['20대', '30대', '40대 이상'],
  '2차논술고사': ['의대', '법학', '일반'],
}

export const gradeCategories = Object.keys(gradeMap)

interface GradeSelectorProps {
  category: string
  subGrade: string
  onCategoryChange: (cat: string) => void
  onSubGradeChange: (sub: string) => void
}

const PRIMARY = '#534AB7'

export default function GradeSelector({
  category,
  subGrade,
  onCategoryChange,
  onSubGradeChange,
}: GradeSelectorProps) {
  return (
    <div>
      <PillSelector
        options={gradeCategories}
        selected={category}
        onSelect={onCategoryChange}
        scrollable
      />
      <div style={{ height: 8 }} />
      <PillSelector
        options={gradeMap[category] ?? []}
        selected={subGrade}
        onSelect={onSubGradeChange}
        scrollable
      />
      <div style={{ marginTop: 8, fontSize: 12, color: PRIMARY, fontWeight: 600 }}>
        {category} · {subGrade}
      </div>
    </div>
  )
}
