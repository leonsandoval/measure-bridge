import { useEffect } from 'react';
import { useConverterStore } from '../store/useConverterStore';
export function useConversion() {
  const {
    category,
    fromUnit,
    toUnit,
    inputValue,
    result,
    secondaryResult,
    error,
    setCategory,
    setFromUnit,
    setToUnit,
    setInputValue,
    swap,
    calculate,
  } = useConverterStore();
  // Recalcular automáticamente cuando cambian category, fromUnit, toUnit o inputValue
  useEffect(() => {
    if (inputValue.trim()) {
      calculate();
    }
  }, [category, fromUnit, toUnit, inputValue, calculate]);
  return {
    category,
    fromUnit,
    toUnit,
    inputValue,
    result,
    secondaryResult,
    error,
    setCategory,
    setFromUnit,
    setToUnit,
    setInputValue,
    swap,
  };
}