// 월별 요약 데이터
export type MonthSummary = {
  month: string; // 기준 월 ('YYYY-MM')
  cash: number; // 현금
  investment: number; // 투자 자산
  debt: number; // 부채
  income: number; // 월 수입
  expense: number; // 월 지출
  netAssets: number; // 순자산 = cash + investment - debt
  savingAmount: number; // 저축액 = income - expense
  savingRate: number; // 저축률 = savingAmount / income
};

// 스토리지 데이터 구조
export type StorageShape = {
  summaries: MonthSummary[];
};

// 필드 에러
export type FieldErrors = {
  month?: string;
  income?: string;
  expense?: string;
  assets?: string;
};

// 최신 및 이전 요약 데이터
export type SummaryPair = {
  latestSummary: MonthSummary | null;
  previousSummary: MonthSummary | null;
};
