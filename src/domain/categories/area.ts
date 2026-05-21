// Factores de conversión a la unidad base del sistema
// Métrico → metro cuadrado (m²), Imperial → pulgada cuadrada (in²)
const toMetricBase: Record<string, number> = {
  cm2: 0.0001,
  m2: 1,
  ha: 10000,
  km2: 1_000_000,
};
const toImperialBase: Record<string, number> = {
  in2: 1,
  ft2: 144,        // 1 ft² = 144 in²
  ac: 6_272_640,   // 1 acre = 6,272,640 in²
  mi2: 4_014_489_600, // 1 mi² = 4,014,489,600 in²
};
// 1 metro cuadrado = 1550.0031 pulgadas cuadradas
const METRIC_TO_IMPERIAL_BASE = 1550.0031;
const IMPERIAL_TO_METRIC_BASE = 1 / 1550.0031;
export function convertArea(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) return value;
  const fromIsMetric = toMetricBase[fromUnit] !== undefined;
  const toIsMetric = toMetricBase[toUnit] !== undefined;
  const fromIsImperial = toImperialBase[fromUnit] !== undefined;
  const toIsImperial = toImperialBase[toUnit] !== undefined;
  // Métrico → Métrico
  if (fromIsMetric && toIsMetric) {
    const inM2 = value * toMetricBase[fromUnit];
    return inM2 / toMetricBase[toUnit];
  }
  // Imperial → Imperial
  if (fromIsImperial && toIsImperial) {
    const inIn2 = value * toImperialBase[fromUnit];
    return inIn2 / toImperialBase[toUnit];
  }
  // Métrico → Imperial
  if (fromIsMetric && toIsImperial) {
    const inM2 = value * toMetricBase[fromUnit];
    const inIn2 = inM2 * METRIC_TO_IMPERIAL_BASE;
    return inIn2 / toImperialBase[toUnit];
  }
  // Imperial → Métrico
  if (fromIsImperial && toIsMetric) {
    const inIn2 = value * toImperialBase[fromUnit];
    const inM2 = inIn2 * IMPERIAL_TO_METRIC_BASE;
    return inM2 / toMetricBase[toUnit];
  }
  throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
}