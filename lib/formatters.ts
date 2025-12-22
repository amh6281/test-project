// 금액을 천 단위 콤마 형식으로 포맷 (원 표시 없음)
export const formatCurrency = (value: number, includeWon: boolean = true): string => {
  const formatted = new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: 0,
  }).format(value ?? 0);
  return includeWon ? `${formatted}원` : formatted;
};

// 소수 입력 비율을 퍼센트 문자열로 변환 (예: 0.32 -> "32%")
export const formatPercent = (value: number, digits: number = 0): string => {
  const percentValue = Number.isFinite(value) ? value * 100 : 0;
  return `${percentValue.toFixed(digits)}%`;
};

// 'YYYY-MM' 또는 Date를 받아 'YYYY-MM' 형태로 정규화
export const formatMonth = (value: string | Date): string => {
  if (typeof value === 'string') {
    const [year, month] = value.split('-');
    if (year && month)
      return `${year.padStart(4, '0')}-${month.padStart(2, '0')}`;
    return value;
  }

  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}`;
};

// 'YYYY-MM' 형식을 'YYYY년 MM월' 형식으로 변환
export const formatMonthKorean = (month: string): string => {
  const [year, monthNum] = month.split('-');
  if (!year || !monthNum) return month;
  return `${year}년 ${parseInt(monthNum, 10)}월`;
};
