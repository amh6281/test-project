import { NumberInput } from '@/components/common';

type HomeAmountInputsProps = {
  cash: number;
  investment: number;
  debt: number;
  income: number;
  expense: number;
  onCashChange: (next: number) => void;
  onInvestmentChange: (next: number) => void;
  onDebtChange: (next: number) => void;
  onIncomeChange: (next: number) => void;
  onExpenseChange: (next: number) => void;
  assetError?: string;
  incomeError?: string;
  expenseError?: string;
};

const HomeAmountInputs = ({
  cash,
  investment,
  debt,
  income,
  expense,
  onCashChange,
  onInvestmentChange,
  onDebtChange,
  onIncomeChange,
  onExpenseChange,
  assetError,
  incomeError,
  expenseError,
}: HomeAmountInputsProps) => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <NumberInput
        label='현금'
        value={cash}
        onChange={onCashChange}
        placeholder='예: 5,000,000'
        required
        error={assetError}
      />
      <NumberInput
        label='투자'
        value={investment}
        onChange={onInvestmentChange}
        placeholder='예: 15,000,000'
        required
        error={assetError}
      />
      <NumberInput
        label='부채'
        value={debt}
        onChange={onDebtChange}
        placeholder='예: 2,000,000'
        suffix='원 (선택)'
      />
      <div className='hidden md:block' />
      <NumberInput
        label='수입'
        value={income}
        onChange={onIncomeChange}
        placeholder='예: 4,000,000'
        required
        error={incomeError}
      />
      <NumberInput
        label='지출'
        value={expense}
        onChange={onExpenseChange}
        placeholder='예: 2,500,000'
        required
        error={expenseError}
      />
    </div>
  );
};

export default HomeAmountInputs;
