/**
 * Formateo de números con localización.
 * Usa Intl.NumberFormat para separadores de miles y decimales consistentes.
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  }).format(value);
}
export function formatResult(value: number, unitAbbreviation: string): string {
  return `${formatNumber(value)} ${unitAbbreviation}`;
}