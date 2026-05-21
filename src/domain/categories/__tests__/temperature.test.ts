import { describe, it, expect } from 'vitest';
import { convertTemperature } from '../temperature';
describe('convertTemperature', () => {
  // °C → °F
  it('0°C → 32°F', () => {
    expect(convertTemperature(0, 'c', 'f')).toBe(32);
  });
  it('100°C → 212°F', () => {
    expect(convertTemperature(100, 'c', 'f')).toBe(212);
  });
  it('25°C → 77°F', () => {
    expect(convertTemperature(25, 'c', 'f')).toBe(77);
  });
  // °F → °C
  it('32°F → 0°C', () => {
    expect(convertTemperature(32, 'f', 'c')).toBe(0);
  });
  it('212°F → 100°C', () => {
    expect(convertTemperature(212, 'f', 'c')).toBe(100);
  });
  it('98.6°F → 37°C', () => {
    const result = convertTemperature(98.6, 'f', 'c');
    expect(result).toBeCloseTo(37, 1);
  });
  // Misma unidad
  it('misma unidad retorna el mismo valor', () => {
    expect(convertTemperature(42, 'c', 'c')).toBe(42);
  });
});