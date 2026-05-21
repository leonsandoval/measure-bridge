// Factores de conversión a la unidad base del sistema
// Métrico → mililitro (mL), Imperial → onza líquida (fl oz)
const toMetricBase: Record<string, number> = {
  ml: 1,
  l: 1000,
  cm3: 1,       // 1 mL = 1 cm³
  m3: 1_000_000, // 1 m³ = 1,000,000 mL
};
const toImperialBase: Record<string, number> = {
  floz: 1,
  pt: 16,          // 1 pinta = 16 fl oz
  qt: 32,          // 1 cuarto = 32 fl oz
  gal: 128,        // 1 galón = 128 fl oz
  cup: 8,          // 1 taza = 8 fl oz
  tbsp: 0.5,       // 1 cucharada = 0.5 fl oz
  tsp: 0.1666667,  // 1 cucharadita = 1/6 fl oz
};
// 1 mililitro = 0.033814 onzas líquidas
const METRIC_TO_IMPERIAL_BASE = 0.033814;
const IMPERIAL_TO_METRIC_BASE = 1 / 0.033814;
export function convertVolume(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) return value;
  const fromIsMetric = toMetricBase[fromUnit] !== undefined;
  const toIsMetric = toMetricBase[toUnit] !== undefined;
  const fromIsImperial = toImperialBase[fromUnit] !== undefined;
  const toIsImperial = toImperialBase[toUnit] !== undefined;
  // Métrico → Métrico
  if (fromIsMetric && toIsMetric) {
    const inMl = value * toMetricBase[fromUnit];
    return inMl / toMetricBase[toUnit];
  }
  // Imperial → Imperial
  if (fromIsImperial && toIsImperial) {
    const inFlOz = value * toImperialBase[fromUnit];
    return inFlOz / toImperialBase[toUnit];
  }
  // Métrico → Imperial
  if (fromIsMetric && toIsImperial) {
    const inMl = value * toMetricBase[fromUnit];
    const inFlOz = inMl * METRIC_TO_IMPERIAL_BASE;
    return inFlOz / toImperialBase[toUnit];
  }
  // Imperial → Métrico
  if (fromIsImperial && toIsMetric) {
    const inFlOz = value * toImperialBase[fromUnit];
    const inMl = inFlOz * IMPERIAL_TO_METRIC_BASE;
    return inMl / toMetricBase[toUnit];
  }
  throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
}
/**
 * Determina si se deben mostrar resultados duales (L + cm³, gal + cm³, etc.)
 */
export function shouldShowDualOutput(fromUnit: string, toUnit: string): boolean {
  const volumetric = ['gal', 'qt', 'pt', 'l', 'ml', 'm3'];
  const fromVol = volumetric.includes(fromUnit);
  const toVol = volumetric.includes(toUnit);
  return fromVol && toVol;
}