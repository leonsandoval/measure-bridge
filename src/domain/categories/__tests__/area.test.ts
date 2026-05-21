import { describe, it, expect } from 'vitest';
import { convertArea } from '../area';
describe('convertArea', () => {
  // Métrico → Métrico
  it('m² → cm²', () => {
    expect(convertArea(1, 'm2', 'cm2')).toBe(10000);
  });
  it('ha → m²', () => {
    expect(convertArea(1, 'ha', 'm2')).toBe(10000);
  });
  // Imperial → Imperial
  it('ft² → in²', () => {
    expect(convertArea(1, 'ft2', 'in2')).toBe(144);
  });
  it('ac → ft²', () => {
    const result = convertArea(1, 'ac', 'ft2');
    expect(result).toBeCloseTo(43560, 0);
  });
  // Métrico → Imperial
  it('m² → ft²', () => {
    const result = convertArea(1, 'm2', 'ft2');
    expect(result).toBeCloseTo(10.7639, 2);
  });
  // Imperial → Métrico
  it('ft² → m²', () => {
    const result = convertArea(1, 'ft2', 'm2');
    expect(result).toBeCloseTo(0.0929, 2);
  });
  // Misma unidad
  it('misma unidad retorna el mismo valor', () => {
    expect(convertArea(10, 'm2', 'm2')).toBe(10);
  });
});