export type System = 'metric' | 'imperial' | 'universal';
export interface Unit {
  id: string;
  label: string;
  abbreviation: string;
  system: System;
  categoryId: string;
}
export interface Category {
  id: string;
  label: string;
  icon: string;
  units: Unit[];
  metricBase: string;    // unit id que sirve como pivot en sistema SI
  imperialBase?: string; // unit id pivot en imperial (opcional, temperatura no tiene)
}
export interface ConversionFn {
  (value: number, fromUnit: string, toUnit: string): number;
}
export interface SimpleConversion {
  from: string;
  to: string;
  factor: number;
}
export interface Result {
  primaryValue: number;
  primaryUnit: string;
  secondaryValue?: number;
  secondaryUnit?: string;
}
export type ParserResult = {
  value: number;
  unitId: string;
} | null;
export interface ParsedInput {
  value: number;
  unitId: string;
}