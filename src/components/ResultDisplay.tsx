import { useTranslation } from 'react-i18next';
import type { Result } from '../domain/types';
import { formatResult } from '../utils/format';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
interface ResultDisplayProps {
  result: Result | null;
  secondaryResult: Result | null;
  error: string | null;
}
export default function ResultDisplay({ result, secondaryResult, error }: ResultDisplayProps) {
  const { t } = useTranslation();
  const { copy, copied } = useCopyToClipboard();
  if (!result && !error) {
    return (
      <div className="mt-4 p-6 rounded-xl bg-slate-800/50 border border-dashed border-slate-600 text-center">
        <p className="text-slate-400 text-sm">{t('result.empty')}</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="mt-4 p-4 rounded-xl bg-red-900/30 border border-red-700 text-center">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }
  if (result) {
    const primaryText = formatResult(result.primaryValue, result.primaryUnit);
    const secondaryText = secondaryResult
      ? formatResult(secondaryResult.primaryValue, secondaryResult.primaryUnit)
      : null;
    return (
      <div className="mt-4 p-6 rounded-xl bg-slate-800 border border-slate-600 overflow-hidden">
        <div className="text-center break-words">
          <p className="text-3xl font-bold text-white">{primaryText}</p>
          {secondaryText && (
            <p className="text-sm text-slate-400 mt-1">≈ {secondaryText}</p>
          )}
        </div>
        <button
          onClick={() => copy(primaryText)}
          className={`
            mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors
            ${copied
              ? 'bg-green-600 text-white'
              : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
            }
          `}
        >
          {copied ? t('result.copied') : t('result.copy')}
        </button>
      </div>
    );
  }
  return null;
}