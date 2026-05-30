import { create } from 'zustand';
import i18n from 'i18next';
import type { Result } from '../domain/types';
import { parseImperialNotation } from '../domain/parser';
import { convertLength } from '../domain/categories/length';
import { convertVolume, shouldShowDualOutput } from '../domain/categories/volume';
import { convertMass } from '../domain/categories/mass';
import { convertTemperature } from '../domain/categories/temperature';
import { convertArea } from '../domain/categories/area';
import { convertSpeed } from '../domain/categories/speed';
import { getCategory, getUnit } from '../domain/registry';
import { roundToPrecision } from '../utils/precision';
interface ConverterState {
  category: string;
  fromUnit: string;
  toUnit: string;
  inputValue: string;
  result: Result | null;
  secondaryResult: Result | null;
  error: string | null;
  setCategory: (id: string) => void;
  setFromUnit: (id: string) => void;
  setToUnit: (id: string) => void;
  setInputValue: (v: string) => void;
  swap: () => void;
  calculate: () => void;
}
const converters: Record<string, (v: number, f: string, t: string) => number> = {
  length: convertLength,
  volume: convertVolume,
  mass: convertMass,
  temperature: convertTemperature,
  area: convertArea,
  speed: convertSpeed,
};
function getDefaultUnits(categoryId: string) {
  const cat = getCategory(categoryId);
  const metricFirst = cat.units.find(u => u.system === 'metric');
  const imperialFirst = cat.units.find(u => u.system === 'imperial');
  return {
    fromUnit: metricFirst?.id ?? cat.units[0]?.id ?? '',
    toUnit: imperialFirst?.id ?? cat.units[1]?.id ?? cat.units[0]?.id ?? '',
  };
}
export const useConverterStore = create<ConverterState>((set, get) => ({
  ...getDefaultUnits('length'),
  category: 'length',
  inputValue: '',
  result: null,
  secondaryResult: null,
  error: null,
  setCategory: (id: string) => {
    const defaults = getDefaultUnits(id);
    set({
      category: id,
      fromUnit: defaults.fromUnit,
      toUnit: defaults.toUnit,
      inputValue: '',
      result: null,
      secondaryResult: null,
      error: null,
    });
    // Recalcular si había un valor
    const { inputValue } = get();
    if (inputValue.trim()) get().calculate();
  },
  setFromUnit: (id: string) => {
    set({ fromUnit: id, result: null, secondaryResult: null, error: null });
    const { inputValue } = get();
    if (inputValue.trim()) get().calculate();
  },
  setToUnit: (id: string) => {
    set({ toUnit: id, result: null, secondaryResult: null, error: null });
    const { inputValue } = get();
    if (inputValue.trim()) get().calculate();
  },
  setInputValue: (v: string) => {
    set({ inputValue: v, result: null, secondaryResult: null, error: null });
    if (v.trim()) get().calculate();
  },
  swap: () => {
    const { fromUnit, toUnit, inputValue } = get();
    set({ fromUnit: toUnit, toUnit: fromUnit, result: null, secondaryResult: null, error: null });
    if (inputValue.trim()) get().calculate();
  },
  calculate: () => {
    const { category, fromUnit, toUnit, inputValue } = get();
    if (!inputValue.trim()) {
      set({ result: null, secondaryResult: null, error: null });
      return;
    }
    try {
      let numericValue: number;
      let effectiveFromUnit: string;
      // Intentar parsear notación compuesta (6'2", 5ft 10in, 2 cups, etc.)
      const parsed = parseImperialNotation(inputValue, category);
      if (parsed) {
        numericValue = parsed.value;
        effectiveFromUnit = parsed.unitId;
      } else {
        const floatVal = parseFloat(inputValue);
        if (isNaN(floatVal)) {
          set({ error: i18n.t('error.invalidNumber'), result: null, secondaryResult: null });
          return;
        }
        numericValue = floatVal;
        effectiveFromUnit = fromUnit;
      }
      const converter = converters[category];
      if (!converter) throw new Error(i18n.t('error.unknownCategory', { category }));
      const converted = converter(numericValue, effectiveFromUnit, toUnit);
      const rounded = roundToPrecision(converted, toUnit, category);
      const toUnitAbbr = getUnit(category, toUnit).abbreviation;
      const primaryResult: Result = {
        primaryValue: rounded,
        primaryUnit: toUnitAbbr,
      };
      // Resultado secundario dual en volumen
      let secondaryResult: Result | null = null;
      if (category === 'volume' && shouldShowDualOutput(effectiveFromUnit, toUnit)) {
        const dualTarget = toUnit === 'l' ? 'cm3' : toUnit === 'gal' ? 'l' : null;
        if (dualTarget) {
          const dualConverted = converter(numericValue, effectiveFromUnit, dualTarget);
          const dualRounded = roundToPrecision(dualConverted, dualTarget, category);
          const dualAbbr = getUnit(category, dualTarget).abbreviation;
          secondaryResult = {
            primaryValue: dualRounded,
            primaryUnit: dualAbbr,
          };
        }
      }
      set({ result: primaryResult, secondaryResult, error: null });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : i18n.t('error.conversion'),
        result: null,
        secondaryResult: null,
      });
    }
  },
}));