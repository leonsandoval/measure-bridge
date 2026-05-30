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
  it('renders form with selects and input', () => {
    render(<TestApp />);
    expect(screen.getByText('From')).toBeDefined();
    expect(screen.getByText('To')).toBeDefined();
    expect(screen.getByPlaceholderText(/6'2/)).toBeDefined();
  });
  it('switches category from tabs', async () => {
    const user = userEvent.setup();
    render(<TestApp />);
    await user.click(screen.getByRole('button', { name: /volume/i }));
    const state = useConverterStore.getState();
    expect(state.category).toBe('volume');
  });
  it('types a value and sees the result', async () => {
    const user = userEvent.setup();
    render(<TestApp />);
    const input = screen.getByPlaceholderText(/6'2/);
    await user.type(input, '1');
    const result = await screen.findByText('3.28 ft');
    expect(result).toBeDefined();
  });
  it('swaps units with swap button', async () => {
    const user = userEvent.setup();
    render(<TestApp />);
    const before = useConverterStore.getState();
    expect(before.fromUnit).toBe('m');
    expect(before.toUnit).toBe('ft');
    await user.click(screen.getByLabelText('Swap units'));
    const after = useConverterStore.getState();
    expect(after.fromUnit).toBe('ft');
    expect(after.toUnit).toBe('m');
  });
});