import { useConversion } from '../hooks/useConversion';
import { getCategory } from '../domain/registry';
import UnitSelect from './UnitSelect';
import  ResultDisplay from './ResultDisplay';
export default function ConverterForm() {
  const {
    category,
    fromUnit,
    toUnit,
    inputValue,
    result,
    secondaryResult,
    error,
    setFromUnit,
    setToUnit,
    setInputValue,
    swap,
  } = useConversion();
  const cat = getCategory(category);
  return (
    <div className="flex flex-col gap-4">
      {/* Selectores De / A */}
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <UnitSelect
            label="De"
            value={fromUnit}
            units={cat.units}
            onChange={setFromUnit}
          />
        </div>
        {/* Botón Swap */}
        <button
          onClick={swap}
          className="mb-0.5 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
          title="Invertir origen y destino"
          aria-label="Intercambiar unidades"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
        <div className="flex-1">
          <UnitSelect
            label="A"
            value={toUnit}
            units={cat.units}
            onChange={setToUnit}
          />
        </div>
      </div>
      {/* Input de valor */}
      <div className="flex flex-col gap-1">
        <label htmlFor="value-input" className="text-xs text-slate-400 font-medium">Valor</label>
        <input
          id="value-input"
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ej: 6'2¨, 2 cups, 100"
          className="bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-base
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     placeholder:text-slate-500"
        />
        <span className="text-xs text-slate-500 mt-0.5">
          Acepta números y notación imperial (6'2¨, 5ft 10in, 2 cups, 10 lb 5 oz)
        </span>
      </div>
      {/* Resultado */}
      <ResultDisplay
        result={result}
        secondaryResult={secondaryResult}
        error={error}
      />
    </div>
  );
}