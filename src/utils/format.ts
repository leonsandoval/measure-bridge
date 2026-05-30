import i18n from 'i18next';

export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  }).format(value);
}
export function formatResult(value: number, unitAbbreviation: string): string {
  return `${formatNumber(value)} ${unitAbbreviation}`;
}