import { describe, it, expect } from 'vitest';
import { parseImperialNotation, isCompositeNotation } from '../parser';
describe('parseImperialNotation', () => {
  // Longitud compuesta
  it('parsea 6\'2" → 74 in (longitud)', () => {
    const result = parseImperialNotation("6'2\"", 'length');
    expect(result).toEqual({ value: 74, unitId: 'in' });
  });
  it('parsea 5ft 10in → 70 in (longitud)', () => {
    const result = parseImperialNotation('5ft 10in', 'length');
    expect(result).toEqual({ value: 70, unitId: 'in' });
  });
  it('parsea 5ft → 60 in', () => {
    const result = parseImperialNotation('5ft', 'length');
    expect(result).toEqual({ value: 60, unitId: 'in' });
  });
  it('parsea 12" → 12 in', () => {
    const result = parseImperialNotation('12"', 'length');
    expect(result).toEqual({ value: 12, unitId: 'in' });
  });
  // Masa compuesta
  it('parsea 10 lb 5 oz → 165 oz (masa)', () => {
    const result = parseImperialNotation('10 lb 5 oz', 'mass');
    expect(result).toEqual({ value: 165, unitId: 'oz' });
  });
  it('parsea 1 lb → 16 oz', () => {
    const result = parseImperialNotation('1 lb', 'mass');
    expect(result).toEqual({ value: 16, unitId: 'oz' });
  });
  // Volumen simple con unidad
  it('parsea 2 cups → 2 (volumen)', () => {
    const result = parseImperialNotation('2 cups', 'volume');
    expect(result).toEqual({ value: 2, unitId: 'cup' });
  });
  it('parsea 3 tbsp → 3 (volumen)', () => {
    const result = parseImperialNotation('3 tbsp', 'volume');
    expect(result).toEqual({ value: 3, unitId: 'tbsp' });
  });
  it('parsea 1 tsp → 1 (volumen)', () => {
    const result = parseImperialNotation('1 tsp', 'volume');
    expect(result).toEqual({ value: 1, unitId: 'tsp' });
  });
  it('parsea 1 gal → 1 (volumen)', () => {
    const result = parseImperialNotation('1 gal', 'volume');
    expect(result).toEqual({ value: 1, unitId: 'gal' });
  });
  it('parsea 2.5 cups → 2.5 (volumen)', () => {
    const result = parseImperialNotation('2.5 cups', 'volume');
    expect(result).toEqual({ value: 2.5, unitId: 'cup' });
  });
  // Input no reconocido → null
  it('número simple → null', () => {
    expect(parseImperialNotation('42', 'length')).toBeNull();
  });
  it('texto sin patrón → null', () => {
    expect(parseImperialNotation('hola', 'length')).toBeNull();
  });
});
describe('isCompositeNotation', () => {
  it('detecta notación compuesta 6\'2"', () => {
    expect(isCompositeNotation("6'2\"")).toBe(true);
  });
  it('detecta 5ft 10in', () => {
    expect(isCompositeNotation('5ft 10in')).toBe(true);
  });
  it('detecta 10 lb 5 oz', () => {
    expect(isCompositeNotation('10 lb 5 oz')).toBe(true);
  });
  it('no detecta número simple', () => {
    expect(isCompositeNotation('42')).toBe(false);
  });
});