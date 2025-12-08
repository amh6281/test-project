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

export type StorageShape = {
  summaries: MonthSummary[];
};
