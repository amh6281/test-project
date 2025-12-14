import type { FieldErrors } from '@/types';

// 필드 검증
export const validateFields = (
  month: string,
  income: number,
  expense: number,
  cash: number,
  investment: number,
): FieldErrors => {
  const nextErrors: FieldErrors = {};
  if (!month) nextErrors.month = '기준 월을 선택해주세요.';
  if (income <= 0) nextErrors.income = '수입을 입력해주세요.';
  if (expense < 0) nextErrors.expense = '지출은 0 이상이어야 해요.';
  if (cash + investment <= 0)
    nextErrors.assets = '현금 또는 투자 금액을 입력해주세요.';
  return nextErrors;
};
