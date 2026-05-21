import { describe, it, expect } from 'vitest';
import { convertLength } from '../length';
describe('convertLength', () => {
  // Métrico → Métrico
  it('cm → m', () => {
    expect(convertLength(100, 'cm', 'm')).toBe(1);
  });
  it('m → cm', () => {
    expect(convertLength(1, 'm', 'cm')).toBe(100);
  });
  it('km → m', () => {
    expect(convertLength(1, 'km', 'm')).toBe(1000);
  });
  it('mm → cm', () => {
    expect(convertLength(10, 'mm', 'cm')).toBe(1);
  });
  // Imperial → Imperial
  it('ft → in', () => {
    expect(convertLength(1, 'ft', 'in')).toBe(12);
  });
  it('in → ft', () => {
    expect(convertLength(12, 'in', 'ft')).toBe(1);
  });
  it('yd → ft', () => {
    expect(convertLength(1, 'yd', 'ft')).toBe(3);
  });
  it('mi → ft', () => {
    expect(convertLength(1, 'mi', 'ft')).toBe(5280);
  });
  // Métrico → Imperial
  it('cm → in', () => {
    // 2.54 cm = 1 in
    const result = convertLength(2.54, 'cm', 'in');
    expect(result).toBeCloseTo(1, 2);
  });
  it('m → ft', () => {
    // 1 m ≈ 3.28084 ft
    const result = convertLength(1, 'm', 'ft');
    expect(result).toBeCloseTo(3.2808, 2);
  });
  it('km → mi', () => {
    // 1 km ≈ 0.621371 mi
    const result = convertLength(1, 'km', 'mi');
    expect(result).toBeCloseTo(0.6214, 2);
  });
  // Imperial → Métrico
  it('in → cm', () => {
    expect(convertLength(1, 'in', 'cm')).toBeCloseTo(2.54, 1);
  });
  it('ft → m', () => {
    const result = convertLength(1, 'ft', 'm');
    expect(result).toBeCloseTo(0.3048, 2);
  });
  it('mi → km', () => {
    const result = convertLength(1, 'mi', 'km');
    expect(result).toBeCloseTo(1.6093, 2);
  });
  // Misma unidad
  it('misma unidad retorna el mismo valor', () => {
    expect(convertLength(42, 'm', 'm')).toBe(42);
  });
});