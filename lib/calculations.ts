// 순자산 계산: 현금 + 투자자산 - 부채
export const calculateNetAssets = (
  cash: number,
  investment: number,
  debt: number = 0,
): number => {
  return cash + investment - debt;
};

// 저축액 계산: 수입 - 지출
export const calculateSavingAmount = (
  income: number,
  expense: number,
): number => {
  return income - expense;
};

// 저축률 계산: 저축액 / 수입 (수입이 0 이하이면 0)
export const calculateSavingRate = (
  income: number,
  expense: number,
): number => {
  if (income <= 0) return 0;
  const savingAmount = calculateSavingAmount(income, expense);
  return savingAmount / income;
};

// 증감 계산: 현재값 - 이전값, 증감률 = 이전값 대비 비율 (이전값 없거나 0 이하면 0)
export const calculateDelta = (
  current: number,
  previous: number | undefined,
) => {
  const delta = previous !== undefined ? current - previous : current;
  const deltaRate = previous && previous > 0 ? delta / previous : 0;
  return { delta, deltaRate };
};

// 저축률 구간별 코멘트 반환
export const getComment = (savingRate: number): string => {
  if (savingRate >= 0.3) {
    return '이번 달 저축률이 아주 좋네요 🎉 지금 페이스를 유지해보세요.';
  }
  if (savingRate >= 0.1) {
    return '무난한 한 달이었어요. 다음 달엔 고정비를 한 번 점검해보는 것도 좋아요.';
  }
  return '이번 달은 지출이 조금 많았어요. 지출 패턴을 한 번 돌아보면 좋겠어요.';
};
