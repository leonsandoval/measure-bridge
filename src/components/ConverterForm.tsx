import { useTranslation } from 'react-i18next';
import { useConversion } from '../hooks/useConversion';
import { getCategory } from '../domain/registry';
import UnitSelect from './UnitSelect';
import  ResultDisplay from './ResultDisplay';
export default function ConverterForm() {
  const { t } = useTranslation();
  const {
    category,
    fromUnit,
    toUnit,
    inputValue,
    result,
    secondaryResult,
    error,
    setFromUnit,
    setToUnit,
    setInputValue,
    swap,
  } = useConversion();
  const cat = getCategory(category);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          <UnitSelect
            label={t('form.from')}
            value={fromUnit}
            units={cat.units}
            onChange={setFromUnit}
          />
        </div>
        <button
          onClick={swap}
          className="self-center sm:self-auto mb-0 sm:mb-0.5 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
          title={t('form.swap.title')}
          aria-label={t('form.swap.aria')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90 sm:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <UnitSelect
            label={t('form.to')}
            value={toUnit}
            units={cat.units}
            onChange={setToUnit}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="value-input" className="text-xs text-slate-400 font-medium">{t('form.value')}</label>
        <input
          id="value-input"
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('form.placeholder')}
          className="bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-base
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     placeholder:text-slate-500"
        />
        <span className="text-xs text-slate-500 mt-0.5">
          {t('form.helper')}
        </span>
      </div>
      <ResultDisplay
        result={result}
        secondaryResult={secondaryResult}
        error={error}
      />
    </div>
  );
}