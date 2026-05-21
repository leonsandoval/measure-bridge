import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultDisplay from '../ResultDisplay';
describe('ResultDisplay', () => {
  it('muestra estado vacío cuando no hay resultado ni error', () => {
    render(<ResultDisplay result={null} secondaryResult={null} error={null} />);
    expect(screen.getByText(/ingresá un valor/i)).toBeDefined();
  });
  it('muestra mensaje de error', () => {
    render(<ResultDisplay result={null} secondaryResult={null} error="Input inválido" />);
    expect(screen.getByText('Input inválido')).toBeDefined();
  });
  it('muestra resultado primario', () => {
    render(
      <ResultDisplay
        result={{ primaryValue: 100, primaryUnit: 'cm' }}
        secondaryResult={null}
        error={null}
      />
    );
    expect(screen.getByText('100,00 cm')).toBeDefined();
  });
  it('muestra resultado secundario cuando existe', () => {
    render(
      <ResultDisplay
        result={{ primaryValue: 1, primaryUnit: 'm' }}
        secondaryResult={{ primaryValue: 100, primaryUnit: 'cm' }}
        error={null}
      />
    );
    expect(screen.getByText('1,00 m')).toBeDefined();
    expect(screen.getByText(/100,00 cm/)).toBeDefined();
  });
  it('copia al portapapeles cuando se hace click en copiar', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    // Mock correcto para jsdom: navigator.clipboard es read-only
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
    await user.click(screen.getByText('Copiar resultado'));
    expect(writeText).toHaveBeenCalledWith('25,40 mm');
  });
});