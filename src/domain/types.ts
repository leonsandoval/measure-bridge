export type System = 'metric' | 'imperial' | 'universal';
export interface Unit {
  id: string;
  abbreviation: string;
  system: System;
  categoryId: string;
}
export interface Category {
  id: string;
  icon: string;
  units: Unit[];
  metricBase: string;
  imperialBase?: string;
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