import { describe, it, expect } from 'vitest';
import { convertSpeed } from '../speed';
describe('convertSpeed', () => {
  // Métrico → Métrico
  it('km/h → m/s', () => {
    const result = convertSpeed(3.6, 'kmh', 'ms');
    expect(result).toBeCloseTo(1, 2);
  });
  it('m/s → km/h', () => {
    const result = convertSpeed(1, 'ms', 'kmh');
    expect(result).toBeCloseTo(3.6, 2);
  });
  // Imperial → Imperial
  it('mph → ft/s', () => {
    const result = convertSpeed(1, 'mph', 'fts');
    expect(result).toBeCloseTo(1.4667, 2);
  });
  it('kn → mph', () => {
    const result = convertSpeed(1, 'kn', 'mph');
    expect(result).toBeCloseTo(1.1508, 2);
  });
  // Métrico → Imperial
  it('m/s → mph', () => {
    const result = convertSpeed(10, 'ms', 'mph');
    expect(result).toBeCloseTo(22.3694, 2);
  });
  // Imperial → Métrico
  it('mph → m/s', () => {
    const result = convertSpeed(22.3694, 'mph', 'ms');
    expect(result).toBeCloseTo(10, 1);
  });
  // Misma unidad
  it('misma unidad retorna el mismo valor', () => {
    expect(convertSpeed(50, 'kmh', 'kmh')).toBe(50);
  });
});