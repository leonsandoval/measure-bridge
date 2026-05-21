// Factores de conversión a la unidad base del sistema
// Métrico → metro por segundo (m/s), Imperial → milla por hora (mph)
const toMetricBase: Record<string, number> = {
  ms: 1,
  kmh: 0.2777778,  // 1 km/h = 0.2777778 m/s
};
const toImperialBase: Record<string, number> = {
  mph: 1,
  fts: 0.6818182,  // 1 ft/s = 0.6818182 mph (¡al revés! 1 mph = 1.46667 ft/s)
  kn: 1.15078,     // 1 nudo = 1.15078 mph
};
// 1 metro por segundo = 2.23694 millas por hora
const METRIC_TO_IMPERIAL_BASE = 2.23694;
const IMPERIAL_TO_METRIC_BASE = 1 / 2.23694;
export function convertSpeed(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) return value;
  const fromIsMetric = toMetricBase[fromUnit] !== undefined;
  const toIsMetric = toMetricBase[toUnit] !== undefined;
  const fromIsImperial = toImperialBase[fromUnit] !== undefined;
  const toIsImperial = toImperialBase[toUnit] !== undefined;
  // Métrico → Métrico
  if (fromIsMetric && toIsMetric) {
    const inMs = value * toMetricBase[fromUnit];
    return inMs / toMetricBase[toUnit];
  }
  // Imperial → Imperial
  if (fromIsImperial && toIsImperial) {
    const inMph = value * toImperialBase[fromUnit];
    return inMph / toImperialBase[toUnit];
  }
  // Métrico → Imperial
  if (fromIsMetric && toIsImperial) {
    const inMs = value * toMetricBase[fromUnit];
    const inMph = inMs * METRIC_TO_IMPERIAL_BASE;
    return inMph / toImperialBase[toUnit];
  }
  // Imperial → Métrico
  if (fromIsImperial && toIsMetric) {
    const inMph = value * toImperialBase[fromUnit];
    const inMs = inMph * IMPERIAL_TO_METRIC_BASE;
    return inMs / toMetricBase[toUnit];
  }
  throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
}