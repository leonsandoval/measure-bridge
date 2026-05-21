export function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) return value;
  // °C → °F: (C × 9/5) + 32
  if (fromUnit === 'c' && toUnit === 'f') {
    return (value * 9 / 5) + 32;
  }
  // °F → °C: (F - 32) × 5/9
  if (fromUnit === 'f' && toUnit === 'c') {
    return (value - 32) * 5 / 9;
  }
  throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
}