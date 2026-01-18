'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/common';
import { NumberInput } from '@/components/common';
import { getGoalNetAssets, saveGoalNetAssets } from '@/lib/storage';
import { formatCurrency } from '@/lib/formatters';

const GoalSettingsForm = () => {
  const [goalNetAssets, setGoalNetAssets] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');

  useEffect(() => {
    const saved = getGoalNetAssets();
    if (saved) {
      setGoalNetAssets(saved);
    }
    setIsLoading(false);
  }, []);

  const handleSave = () => {
    if (goalNetAssets <= 0) {
      setSaveMessage('목표 자산은 0보다 큰 값이어야 합니다.');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      saveGoalNetAssets(goalNetAssets);
      setSaveMessage('목표 자산이 저장되었습니다.');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    setGoalNetAssets(0);
    setSaveMessage('');
  };

  if (isLoading) {
    return (
      <Card>
        <div className='flex min-h-[200px] items-center justify-center'>
          <p className='text-slate-500 dark:text-slate-400'>로딩 중...</p>
        </div>
      </Card>
    );
  }

  const currentGoal = getGoalNetAssets();

  return (
    <Card>
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-50'>
            목표 자산 설정
          </h3>
          <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
            달성하고 싶은 목표 순자산을 입력하세요. 리포트 페이지에서 진행
            상황을 확인할 수 있습니다.
          </p>
        </div>

        {currentGoal && (
          <div className='rounded-lg bg-primary-50 p-4 dark:bg-primary-900/30'>
            <p className='text-sm text-slate-600 dark:text-slate-300'>
              현재 목표:{' '}
              <span className='font-semibold text-primary-700 dark:text-primary-400'>
                {formatCurrency(currentGoal)}
              </span>
            </p>
          </div>
        )}

        <div className='space-y-4'>
          <NumberInput
            label='목표 순자산'
            value={goalNetAssets}
            onChange={setGoalNetAssets}
            placeholder='예: 50000000'
            suffix='원'
            required
          />

          {saveMessage && (
            <div
              className={`rounded-lg p-3 text-sm ${
                saveMessage.includes('오류')
                  ? 'bg-danger/10 text-danger'
                  : 'bg-primary-50 text-primary-700'
              }`}
              role='alert'
            >
              {saveMessage}
            </div>
          )}

          <div className='flex gap-3'>
            <button
              onClick={handleSave}
              disabled={isSaving || goalNetAssets <= 0}
              className='flex-1 rounded-xl bg-primary-600 px-4 py-3 font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {isSaving ? '저장 중...' : '저장'}
            </button>
            {goalNetAssets > 0 && (
              <button
                onClick={handleClear}
                disabled={isSaving}
                className='rounded-xl border border-slate-300 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700'
              >
                초기화
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GoalSettingsForm;
