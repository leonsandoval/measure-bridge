// Factores de conversión a la unidad base del sistema
// Métrico → metro (m), Imperial → pulgada (in)
const toMetricBase: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
};
const toImperialBase: Record<string, number> = {
  in: 1,
  ft: 12,
  yd: 36,
  mi: 63360,
};
// 1 metro = 39.3701 pulgadas
const METRIC_TO_IMPERIAL_BASE = 39.3701;
const IMPERIAL_TO_METRIC_BASE = 1 / 39.3701;
export function convertLength(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) return value;
  const fromIsMetric = toMetricBase[fromUnit] !== undefined;
  const toIsMetric = toMetricBase[toUnit] !== undefined;
  const fromIsImperial = toImperialBase[fromUnit] !== undefined;
  const toIsImperial = toImperialBase[toUnit] !== undefined;
  // Métrico → Métrico
  if (fromIsMetric && toIsMetric) {
    const inMeters = value * toMetricBase[fromUnit];
    return inMeters / toMetricBase[toUnit];
  }
  // Imperial → Imperial
  if (fromIsImperial && toIsImperial) {
    const inInches = value * toImperialBase[fromUnit];
    return inInches / toImperialBase[toUnit];
  }
  // Métrico → Imperial
  if (fromIsMetric && toIsImperial) {
    const inMeters = value * toMetricBase[fromUnit];
    const inInches = inMeters * METRIC_TO_IMPERIAL_BASE;
    return inInches / toImperialBase[toUnit];
  }
  // Imperial → Métrico
  if (fromIsImperial && toIsMetric) {
    const inInches = value * toImperialBase[fromUnit];
    const inMeters = inInches * IMPERIAL_TO_METRIC_BASE;
    return inMeters / toMetricBase[toUnit];
  }
  throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
}