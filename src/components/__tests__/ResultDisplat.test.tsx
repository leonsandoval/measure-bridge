import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultDisplay from '../ResultDisplay';
describe('ResultDisplay', () => {
  it('shows empty state when no result or error', () => {
    render(<ResultDisplay result={null} secondaryResult={null} error={null} />);
    expect(screen.getByText(/enter a value/i)).toBeDefined();
  });
  it('shows error message', () => {
    render(<ResultDisplay result={null} secondaryResult={null} error="Input inválido" />);
    expect(screen.getByText('Input inválido')).toBeDefined();
  });
  it('shows primary result', () => {
    render(
      <ResultDisplay
        result={{ primaryValue: 100, primaryUnit: 'cm' }}
        secondaryResult={null}
        error={null}
      />
    );
    expect(screen.getByText('100.00 cm')).toBeDefined();
  });
  it('shows secondary result when present', () => {
    render(
      <ResultDisplay
        result={{ primaryValue: 1, primaryUnit: 'm' }}
        secondaryResult={{ primaryValue: 100, primaryUnit: 'cm' }}
        error={null}
      />
    );
    expect(screen.getByText('1.00 m')).toBeDefined();
    expect(screen.getByText(/100.00 cm/)).toBeDefined();
  });
  it('copies to clipboard on copy click', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
      writable: true,
    });
    render(
      <ResultDisplay
        result={{ primaryValue: 25.4, primaryUnit: 'mm' }}
        secondaryResult={null}
        error={null}
      />
    );
    await user.click(screen.getByText('Copy result'));
    expect(writeText).toHaveBeenCalledWith('25.40 mm');
  });
});