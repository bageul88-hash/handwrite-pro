export interface GridItem { label: string; desc: string }
export interface CheckItem { ok: boolean; text: string }
export interface TextBlock { title: string; items: string[] }

export interface Step1 { title: string; desc: string; items: GridItem[] }
export interface Step2 { title: string; desc: string; gridItems?: GridItem[]; checks?: CheckItem[] }
export interface Step3 { title: string; desc: string; blocks: TextBlock[] }
export interface Step4 { title: string; items: GridItem[] }

export interface GradeGuide {
  pill: string
  sub: string
  step1: Step1
  step2: Step2
  step3: Step3
  step4: Step4
}

export const gradeGuides: Record<string, GradeGuide> = {
  유치원: {
    pill: '유치원 맞춤 교정 가이드',
    sub: '소근육 발달 · 감각 기반 · 놀이 중심 접근',
    step1: {
      title: '1단계 · 원인과 뇌과학적 관리',
      desc: '소근육이 아직 발달 중인 시기의 올바른 접근법',
      items: [
        { label: '불규칙', desc: '크기·방향·선 굵기 / 손가락 협응 미숙' },
        { label: '불안정', desc: '필압 중심 / 수상법 미숙' },
        { label: '불명확', desc: '획 순서 불규칙 / 여백 형성 중' },
      ],
    },
    step2: {
      title: '2단계 · 신체 자세 체크포인트',
      desc: '뇌의 명령이 손에 정확하게 전달되는 조건',
      gridItems: [
        { label: '손목', desc: '손등이 바닥에 닿게' },
        { label: '팔꿈치', desc: '책상 위에 올려두기' },
        { label: '어깨', desc: '좌우 균형 맞추기' },
        { label: '눈', desc: '눈거리 30cm 이상' },
        { label: '허리', desc: '등받이에 기대어 균형' },
        { label: '다리', desc: '양발이 바닥에 닿아야' },
      ],
    },
    step3: {
      title: '3단계 · 매일 실천 전략 Daily Solution',
      desc: '하루 10~15분, 꾸준히',
      blocks: [
        {
          title: '활기기 및 소근육 훈련',
          items: [
            '점토·모래·종이로 간단히 만들기',
            '소근육 놀이 — 블록 쌓기, 종이접기, 스티커 붙이기',
            '2B 연필로 큰 획부터 시작',
          ],
        },
        {
          title: '공간 및 환경 훈련',
          items: [
            '그리드 노트 — 8~10칸 규격, 큰 정중앙에 쓰기',
            '슬로우 라이팅 — 한 글자씩 소리 내어 천천히',
            '단어 사이 연필 한 자루 간격 유지',
          ],
        },
      ],
    },
    step4: {
      title: '학부모님 실천 수칙',
      items: [
        { label: '시간', desc: '매일 10~15분 집중' },
        { label: '칭찬', desc: '잘 쓴 글자에 7배 칭찬' },
        { label: '과정', desc: '바른 자세에 집중' },
        { label: '기간', desc: '최소 3개월 연속 필요' },
      ],
    },
  },

  초등: {
    pill: '초등 맞춤 교정 가이드',
    sub: '획순 습득 · 일관성 형성 · 격자 노트 훈련',
    step1: {
      title: '1단계 · 원인과 뇌과학적 관리',
      desc: '잘못 굳기 전 교정이 핵심 — 1·2학년이 임계 시점',
      items: [
        { label: '획순 오류', desc: '자음·모음 순서 역방향' },
        { label: '크기 편차', desc: '한 줄 안 30% 이상 차이' },
        { label: '필압 과다', desc: '뒷장에 자국 날 정도' },
      ],
    },
    step2: {
      title: '2단계 · 격자 노트 활용',
      desc: '5mm 격자 안에 글자 꽉 채우기',
      checks: [
        { ok: true, text: '획순 카드 옆에 두고 매 글자 확인하며 쓰기' },
        { ok: true, text: '격자 한 칸 = 글자 한 자 기준 고정' },
        { ok: false, text: '정확성 80점 미만이면 속도 훈련 금지' },
      ],
    },
    step3: {
      title: '3단계 · 매일 실천 전략 Daily Solution',
      desc: '하루 15분, 짧게 정확하게',
      blocks: [
        {
          title: '격자 노트 쓰기',
          items: [
            '5mm 격자 노트에 당일 배운 글자 10개 반복',
            '쓰고 나서 스스로 채점 — 삐뚤어진 글자에 동그라미',
          ],
        },
        {
          title: '칭찬 포인트',
          items: ['결과보다 자세와 획순이 맞을 때 칭찬'],
        },
      ],
    },
    step4: {
      title: '학부모님 실천 수칙',
      items: [
        { label: '시간', desc: '매일 15분' },
        { label: '칭찬', desc: '획순 맞을 때 즉시' },
        { label: '과정', desc: '속도보다 형태 우선' },
        { label: '기간', desc: '최소 2개월' },
      ],
    },
  },

  중등: {
    pill: '중등 맞춤 교정 가이드',
    sub: '속도·효율 균형 · 시험 필기 적응기',
    step1: {
      title: '1단계 · 속도 측정',
      desc: '분당 40자 이하라면 속도가 먼저 문제',
      items: [
        { label: '필기 속도', desc: '분당 40자 기준 측정' },
        { label: '가독성', desc: '일주일 후 재독 테스트' },
        { label: '도구 점검', desc: '0.5mm 중성펜 권장' },
      ],
    },
    step2: {
      title: '2단계 · 메트로놈 훈련',
      desc: '리듬감으로 속도·정확성 동시 향상',
      checks: [
        { ok: true, text: '80bpm 시작 → 120bpm까지 단계 상승' },
        { ok: true, text: '수학·과학 약어 자기만의 규칙 만들기' },
        { ok: false, text: '낯선 볼펜 사용 시 필압·속도 모두 무너짐' },
      ],
    },
    step3: {
      title: '3단계 · 시험 시뮬레이션',
      desc: '하루 10~15분, 실전 조건 재현',
      blocks: [
        {
          title: '실전 필기 훈련',
          items: [
            '시험 조건(책상·시간·긴장) 재현 후 필기 품질 비교',
            '처음과 마지막 줄 품질 차이 10% 이내 목표',
          ],
        },
      ],
    },
    step4: {
      title: '학부모님 실천 수칙',
      items: [
        { label: '시간', desc: '매일 10~15분' },
        { label: '칭찬', desc: '속도 향상 시 인정' },
        { label: '과정', desc: '자기 채점 습관화' },
        { label: '기간', desc: '최소 3개월' },
      ],
    },
  },

  고등: {
    pill: '고등 맞춤 교정 가이드',
    sub: '장시간 내구성 · 수능·내신 집중 전략',
    step1: {
      title: '1단계 · 핵심 자소 정비',
      desc: 'ㄱ·ㅅ·ㅎ·ㄹ 4자소가 전체 가독성 70% 결정',
      items: [
        { label: '4핵심 자소', desc: 'ㄱ·ㅅ·ㅎ·ㄹ 집중 교정' },
        { label: '내구성', desc: '50분 후 품질 저하 확인' },
        { label: '답안지', desc: 'OMR 인식률 테스트 필수' },
      ],
    },
    step2: {
      title: '2단계 · 60분 내구 훈련',
      desc: '장시간 필기 안정성 확보',
      checks: [
        { ok: true, text: '매일 60분 연속 필기 후 처음·마지막 줄 사진 비교' },
        { ok: true, text: '친구·부모에게 10초 내 판독 가능한지 테스트' },
        { ok: false, text: '손목 통증 방치 금지 — 즉시 그립 각도 점검' },
      ],
    },
    step3: {
      title: '3단계 · 채점관 시뮬레이션',
      desc: '하루 10~15분, 실전 답안지 훈련',
      blocks: [
        {
          title: '수능 답안 훈련',
          items: [
            '실제 답안지 규격으로 주 3회 이상 모의 필기',
            '시험 2주 전부터 새 교정 시도 금지',
          ],
        },
      ],
    },
    step4: {
      title: '학부모님 실천 수칙',
      items: [
        { label: '시간', desc: '매일 10~15분' },
        { label: '칭찬', desc: '잘 쓴 글자 7배 칭찬' },
        { label: '과정', desc: '바른 자세 집중' },
        { label: '기간', desc: '최소 3개월 연속' },
      ],
    },
  },

  대학: {
    pill: '대학생 맞춤 교정 가이드',
    sub: '강의 속기 효율 · 노트 가독성 · 일관성 유지',
    step1: {
      title: '1단계 · 필기 패턴 진단',
      desc: '강의 중 속도와 정확성의 균형 찾기',
      items: [
        { label: '속기 한계', desc: '강의 속도 대비 필기 누락 분석' },
        { label: '일관성', desc: '초반·후반 필기 품질 비교' },
        { label: '도구 최적화', desc: '강의별 최적 필기구 선택' },
      ],
    },
    step2: {
      title: '2단계 · 개인 약어 시스템',
      desc: '나만의 속기 시스템으로 필기 속도 30% 향상',
      checks: [
        { ok: true, text: '과목별 핵심 약어 10개 고정 → 반복 사용' },
        { ok: true, text: '강의 전 노트 구조 미리 설계 (제목·소제목 구분)' },
        { ok: false, text: '모든 내용 받아쓰기 금지 — 핵심만 캡처' },
      ],
    },
    step3: {
      title: '3단계 · 매일 실천 전략 Daily Solution',
      desc: '하루 10분, 강의 복습과 함께',
      blocks: [
        {
          title: '강의 필기 훈련',
          items: [
            '강의 후 24시간 내 핵심 키워드 다시 정리',
            '주 1회 전 강의 노트 가독성 점검',
          ],
        },
        {
          title: '일상 속 글씨 훈련',
          items: [
            '다이어리·플래너 매일 손 글씨로 작성',
            '월별 글씨 사진 비교로 변화 추적',
          ],
        },
      ],
    },
    step4: {
      title: '실천 수칙',
      items: [
        { label: '시간', desc: '매일 10분' },
        { label: '칭찬', desc: '스스로 잘한 점 기록' },
        { label: '과정', desc: '가독성 목표 집중' },
        { label: '기간', desc: '최소 2개월 지속' },
      ],
    },
  },

  일반인: {
    pill: '일반인 맞춤 교정 가이드',
    sub: '습관 교정 · 실생활 가독성 향상',
    step1: {
      title: '1단계 · 그립 재교육',
      desc: '세 손가락 그립 확인 및 필기구 최적화',
      items: [
        { label: '그립 확인', desc: '세 손가락 안정 그립' },
        { label: '필기구', desc: '성인 최적 0.7mm' },
        { label: '목표 설정', desc: '누구나 읽는 수준이면 충분' },
      ],
    },
    step2: {
      title: '2단계 · 서명 교정',
      desc: '즉각 실용 효과를 경험하세요',
      checks: [
        { ok: true, text: '서명 3가지 버전 개발 → 가장 쓰기 쉬운 것 고정' },
        { ok: true, text: '문제 상황(서명·메모·봉투) 파악 후 집중' },
        { ok: false, text: '30분 이상 연속 연습 금지' },
      ],
    },
    step3: {
      title: '3단계 · 일상 삽입 루틴',
      desc: '하루 10분, 다이어리 활용',
      blocks: [
        {
          title: '일상 필기 습관',
          items: [
            '하루 10분 다이어리 필기 — 자연스러운 노출이 지속성 높음',
            '주별 글씨 사진 비교로 변화 추적',
          ],
        },
      ],
    },
    step4: {
      title: '실천 수칙',
      items: [
        { label: '시간', desc: '매일 10분' },
        { label: '칭찬', desc: '스스로 잘한 점 기록' },
        { label: '과정', desc: '실용 목표에 집중' },
        { label: '기간', desc: '최소 3개월 지속' },
      ],
    },
  },

  '2차논술': {
    pill: '2차 논술 맞춤 교정 가이드',
    sub: '채점관 가독성 · 속도+정확성 동시 훈련',
    step1: {
      title: '1단계 · 시간당 필기량 측정',
      desc: '50분 A4 3장 이하라면 긴급 속도 교정 필요',
      items: [
        { label: '필기량 기준', desc: '50분 A4 최소 3장' },
        { label: '최소 속도', desc: '분당 80자 이상' },
        { label: '레퍼런스', desc: '기출 답안 글씨 확보' },
      ],
    },
    step2: {
      title: '2단계 · 실전 모의 훈련',
      desc: '실제 답안지 규격으로 주 3회 이상',
      checks: [
        { ok: true, text: '실제 시험 답안지 규격으로 반복 훈련' },
        { ok: true, text: '반드시 본인 필기구 지참' },
        { ok: false, text: '시험 2주 전부터 새 교정 시도 절대 금지' },
      ],
    },
    step3: {
      title: '3단계 · 마지막 2주 전략',
      desc: '현재 글씨 최적화에만 집중',
      blocks: [
        {
          title: '마무리 훈련',
          items: [
            '익숙한 필기 패턴 고정 — 실전에서 안정적',
            '제목·소제목 크기 차별화 연습',
          ],
        },
      ],
    },
    step4: {
      title: '실천 수칙',
      items: [
        { label: '시간', desc: '매일 15~20분' },
        { label: '칭찬', desc: '속도 향상 시 인정' },
        { label: '과정', desc: '답안지 규격 준수' },
        { label: '기간', desc: '시험 3개월 전 시작' },
      ],
    },
  },
}
