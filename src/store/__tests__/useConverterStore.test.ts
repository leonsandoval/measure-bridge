import { describe, it, expect, beforeEach } from 'vitest';
import { useConverterStore } from '../useConverterStore';
describe('useConverterStore', () => {
  // Resetear el store antes de cada test
  beforeEach(() => {
    useConverterStore.setState({
      category: 'length',
      fromUnit: 'm',
      toUnit: 'ft',
      inputValue: '',
      result: null,
      secondaryResult: null,
      error: null,
    });
  });
  it('setCategory cambia la categoría y resetea unidades', () => {
    useConverterStore.getState().setCategory('volume');
    const state = useConverterStore.getState();
    expect(state.category).toBe('volume');
    expect(state.fromUnit).toBe('ml');
    expect(state.toUnit).toBe('floz');
    expect(state.result).toBeNull();
  });
  it('setFromUnit cambia la unidad de origen', () => {
    useConverterStore.getState().setFromUnit('cm');
    expect(useConverterStore.getState().fromUnit).toBe('cm');
  });
  it('setToUnit cambia la unidad de destino', () => {
    useConverterStore.getState().setToUnit('in');
    expect(useConverterStore.getState().toUnit).toBe('in');
  });
  it('swap intercambia fromUnit y toUnit', () => {
    useConverterStore.getState().setInputValue('1');
    useConverterStore.getState().swap();
    const state = useConverterStore.getState();
    expect(state.fromUnit).toBe('ft');
    expect(state.toUnit).toBe('m');
  });
  it('calculate produce resultado para longitud m → ft', () => {
    useConverterStore.getState().setInputValue('1');
    const state = useConverterStore.getState();
    expect(state.result).not.toBeNull();
    expect(state.result!.primaryValue).toBeCloseTo(3.2808, 2);
    expect(state.result!.primaryUnit).toBe('ft');
  });
  it('calculate produce error para input inválido', () => {
    useConverterStore.getState().setInputValue('abc');
    const state = useConverterStore.getState();
    expect(state.error).toBeTruthy();
    expect(state.result).toBeNull();
  });
  it('calculate maneja notación compuesta 6\'2"', () => {
    useConverterStore.getState().setFromUnit('in');
    useConverterStore.getState().setToUnit('cm');
    useConverterStore.getState().setInputValue("6'2\"");
    const state = useConverterStore.getState();
    expect(state.result).not.toBeNull();
    // 6'2" = 74 in → 187.96 cm
    expect(state.result!.primaryValue).toBeCloseTo(187.96, 2);
  });
  it('volumen muestra resultado dual para gal → l', () => {
    useConverterStore.getState().setCategory('volume');
    useConverterStore.getState().setFromUnit('gal');
    useConverterStore.getState().setToUnit('l');
    useConverterStore.getState().setInputValue('2');
    const state = useConverterStore.getState();
    expect(state.result).not.toBeNull();
    expect(state.secondaryResult).not.toBeNull();
    expect(state.secondaryResult!.primaryUnit).toBe('cm³');
  });
});