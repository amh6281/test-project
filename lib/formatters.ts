// 금액을 원화 통화 형식(콤마, '원')으로 포맷
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(value ?? 0);
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
