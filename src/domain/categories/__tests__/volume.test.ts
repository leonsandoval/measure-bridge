import { describe, it, expect } from 'vitest';
import { convertVolume, shouldShowDualOutput } from '../volume';
describe('convertVolume', () => {
  // Métrico → Métrico
  it('L → mL', () => {
    expect(convertVolume(1, 'l', 'ml')).toBe(1000);
  });
  it('mL → L', () => {
    expect(convertVolume(1000, 'ml', 'l')).toBe(1);
  });
  it('cm³ → mL', () => {
    expect(convertVolume(1, 'cm3', 'ml')).toBe(1); // 1 cm³ = 1 mL
  });
  it('m³ → L', () => {
    expect(convertVolume(1, 'm3', 'l')).toBe(1000);
  });
  // Imperial → Imperial
  it('gal → qt', () => {
    expect(convertVolume(1, 'gal', 'qt')).toBe(4);
  });
  it('qt → pt', () => {
    expect(convertVolume(1, 'qt', 'pt')).toBe(2);
  });
  it('pt → fl oz', () => {
    expect(convertVolume(1, 'pt', 'floz')).toBe(16);
  });
  it('cup → fl oz', () => {
    expect(convertVolume(1, 'cup', 'floz')).toBe(8);
  });
  it('tbsp → fl oz', () => {
    expect(convertVolume(2, 'tbsp', 'floz')).toBeCloseTo(1, 2);
  });
  it('tsp → tbsp', () => {
    expect(convertVolume(3, 'tsp', 'tbsp')).toBeCloseTo(1, 2);
  });
  // Métrico → Imperial
  it('mL → fl oz', () => {
    // 29.5735 mL ≈ 1 fl oz
    const result = convertVolume(29.5735, 'ml', 'floz');
    expect(result).toBeCloseTo(1, 1);
  });
  it('L → gal', () => {
    // 3.78541 L ≈ 1 gal
    const result = convertVolume(3.78541, 'l', 'gal');
    expect(result).toBeCloseTo(1, 1);
  });
  // Imperial → Métrico
  it('gal → L', () => {
    const result = convertVolume(1, 'gal', 'l');
    expect(result).toBeCloseTo(3.7854, 2);
  });
  it('cup → mL', () => {
    const result = convertVolume(1, 'cup', 'ml');
    expect(result).toBeCloseTo(236.588, 1);
  });
  // Misma unidad
  it('misma unidad retorna el mismo valor', () => {
    expect(convertVolume(7, 'l', 'l')).toBe(7);
  });
});
describe('shouldShowDualOutput', () => {
  it('gal → l muestra dual', () => {
    expect(shouldShowDualOutput('gal', 'l')).toBe(true);
  });
  it('l → gal muestra dual', () => {
    expect(shouldShowDualOutput('l', 'gal')).toBe(true);
  });
  it('tsp → tbsp no muestra dual', () => {
    expect(shouldShowDualOutput('tsp', 'tbsp')).toBe(false);
  });
});