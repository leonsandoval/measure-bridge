/**
 * Reglas de precisión por tipo de categoría y unidad.
 * 
 * Longitud: 2 decimales (cm, m, ft, in) / 4 decimales (mm)
 * Volumen: 2 decimales (L, gal, cup) / 1 decimal (mL, fl oz) / 0 decimales (cm³, m³)
 * Masa: 2 decimales (kg, lb) / 1 decimal (oz, g) / 2 decimales (t, st)
 * Temperatura: 1 decimal
 * Área: 2 decimales
 * Velocidad: 2 decimales
 */
type PrecisionRule = {
  default: number;
  overrides?: Record<string, number>;
};
const rules: Record<string, PrecisionRule> = {
  length: { default: 2, overrides: { mm: 4, km: 3 } },
  volume: { default: 2, overrides: { ml: 1, cm3: 0, m3: 3, floz: 1, tbsp: 1, tsp: 1 } },
  mass: { default: 2, overrides: { g: 1, oz: 1, st: 1 } },
  temperature: { default: 1 },
  area: { default: 2, overrides: { ha: 4, km2: 4 } },
  speed: { default: 2 },
};
export function getPrecision(unitId: string, categoryId: string): number {
  const rule = rules[categoryId];
  if (!rule) return 2;
  if (rule.overrides && rule.overrides[unitId] !== undefined) {
    return rule.overrides[unitId];
  }
  return rule.default;
}
export function roundToPrecision(value: number, unitId: string, categoryId: string): number {
  const precision = getPrecision(unitId, categoryId);
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}