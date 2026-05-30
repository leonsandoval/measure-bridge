import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import type { Unit } from '../domain/types';
interface UnitSelectProps {
  label: string;
  value: string;
  units: Unit[];
  onChange: (unitId: string) => void;
}
export default function UnitSelect({ label, value, units, onChange }: UnitSelectProps) {
  const { t } = useTranslation();
  const id = useId();
  const metricUnits = units.filter(u => u.system === 'metric');
  const imperialUnits = units.filter(u => u.system === 'imperial');
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <label htmlFor={id} className="text-xs text-slate-400 font-medium">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm max-sm:text-xs
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
      >
        {metricUnits.length > 0 && (
          <optgroup label={t('units.metric')}>
            {metricUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {u.abbreviation} — {t(`units.${u.id}`)}
              </option>
            ))}
          </optgroup>
        )}
        {imperialUnits.length > 0 && (
          <optgroup label={t('units.imperial')}>
            {imperialUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {u.abbreviation} — {t(`units.${u.id}`)}
              </option>
            ))}
          </optgroup>
        )}
      </select>
    </div>
  );
}