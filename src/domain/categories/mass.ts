// Factores de conversión a la unidad base del sistema
// Métrico → kilogramo (kg), Imperial → onza (oz)
const toMetricBase: Record<string, number> = {
  g: 0.001,
  kg: 1,
  t: 1000,
};
const toImperialBase: Record<string, number> = {
  oz: 1,
  lb: 16,   // 1 libra = 16 onzas
  st: 224,  // 1 stone = 224 onzas (14 lb × 16 oz/lb)
};
// 1 kilogramo = 35.274 onzas
const METRIC_TO_IMPERIAL_BASE = 35.274;
const IMPERIAL_TO_METRIC_BASE = 1 / 35.274;
export function convertMass(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) return value;
  const fromIsMetric = toMetricBase[fromUnit] !== undefined;
  const toIsMetric = toMetricBase[toUnit] !== undefined;
  const fromIsImperial = toImperialBase[fromUnit] !== undefined;
  const toIsImperial = toImperialBase[toUnit] !== undefined;
  // Métrico → Métrico
  if (fromIsMetric && toIsMetric) {
    const inKg = value * toMetricBase[fromUnit];
    return inKg / toMetricBase[toUnit];
  }
  // Imperial → Imperial
  if (fromIsImperial && toIsImperial) {
    const inOz = value * toImperialBase[fromUnit];
    return inOz / toImperialBase[toUnit];
  }
  // Métrico → Imperial
  if (fromIsMetric && toIsImperial) {
    const inKg = value * toMetricBase[fromUnit];
    const inOz = inKg * METRIC_TO_IMPERIAL_BASE;
    return inOz / toImperialBase[toUnit];
  }
  // Imperial → Métrico
  if (fromIsImperial && toIsMetric) {
    const inOz = value * toImperialBase[fromUnit];
    const inKg = inOz * IMPERIAL_TO_METRIC_BASE;
    return inKg / toMetricBase[toUnit];
  }
  throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
}