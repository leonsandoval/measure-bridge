import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConverterForm from '../ConverterForm';
import CategoryTabs from '../CategoryTabs';
import { useConverterStore } from '../../store/useConverterStore';
// Wrapper que renderiza tabs + formulario (como en Layout)
function TestApp() {
  return (
    <div>
      <CategoryTabs />
      <ConverterForm />
    </div>
  );
}
describe('ConverterForm', () => {
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
  it('renderiza el formulario con selects e input', () => {
  render(<TestApp />);
  expect(screen.getByText('De')).toBeDefined();
  expect(screen.getByText('A')).toBeDefined();
  expect(screen.getByPlaceholderText(/6'2/)).toBeDefined();
});
  it('cambia categoría desde los tabs', async () => {
    const user = userEvent.setup();
    render(<TestApp />);
    // Hacemos click en el botón completo (contiene emoji + texto)
    await user.click(screen.getByRole('button', { name: /volumen/i }));
    const state = useConverterStore.getState();
    expect(state.category).toBe('volume');
  });
  it('escribe un valor y ve el resultado', async () => {
    const user = userEvent.setup();
    render(<TestApp />);
    const input = screen.getByPlaceholderText(/6'2/);
    await user.type(input, '1');
    // Usamos el texto exacto del resultado para evitar ambigüedad
    const result = await screen.findByText('3,28 ft');
    expect(result).toBeDefined();
  });
  it('intercambia unidades con botón swap', async () => {
    const user = userEvent.setup();
    render(<TestApp />);
    const before = useConverterStore.getState();
    expect(before.fromUnit).toBe('m');
    expect(before.toUnit).toBe('ft');
    await user.click(screen.getByLabelText('Intercambiar unidades'));
    const after = useConverterStore.getState();
    expect(after.fromUnit).toBe('ft');
    expect(after.toUnit).toBe('m');
  });
});