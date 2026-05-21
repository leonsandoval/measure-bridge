import { describe, it, expect } from 'vitest';
import { convertMass } from '../mass';
describe('convertMass', () => {
  // Métrico → Métrico
  it('g → kg', () => {
    expect(convertMass(1000, 'g', 'kg')).toBe(1);
  });
  it('kg → g', () => {
    expect(convertMass(1, 'kg', 'g')).toBe(1000);
  });
  it('t → kg', () => {
    expect(convertMass(1, 't', 'kg')).toBe(1000);
  });
  // Imperial → Imperial
  it('lb → oz', () => {
    expect(convertMass(1, 'lb', 'oz')).toBe(16);
  });
  it('oz → lb', () => {
    expect(convertMass(16, 'oz', 'lb')).toBe(1);
  });
  it('st → lb', () => {
    expect(convertMass(1, 'st', 'lb')).toBe(14);
  });
  // Métrico → Imperial
  it('kg → lb', () => {
    // 1 kg ≈ 2.20462 lb
    const result = convertMass(1, 'kg', 'lb');
    expect(result).toBeCloseTo(2.2046, 2);
  });
  it('g → oz', () => {
    // 28.3495 g ≈ 1 oz
    const result = convertMass(28.3495, 'g', 'oz');
    expect(result).toBeCloseTo(1, 1);
  });
  // Imperial → Métrico
  it('lb → kg', () => {
    const result = convertMass(1, 'lb', 'kg');
    expect(result).toBeCloseTo(0.4536, 2);
  });
  it('oz → g', () => {
    const result = convertMass(1, 'oz', 'g');
    expect(result).toBeCloseTo(28.3495, 1);
  });
  // Misma unidad
  it('misma unidad retorna el mismo valor', () => {
    expect(convertMass(5, 'kg', 'kg')).toBe(5);
  });
});