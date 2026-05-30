import type { Category, Unit } from './types';
// ========================
// UNIDADES POR CATEGORÍA
// ========================
const lengthUnits: Unit[] = [
  { id: 'mm', abbreviation: 'mm', system: 'metric', categoryId: 'length' },
  { id: 'cm', abbreviation: 'cm', system: 'metric', categoryId: 'length' },
  { id: 'm', abbreviation: 'm', system: 'metric', categoryId: 'length' },
  { id: 'km', abbreviation: 'km', system: 'metric', categoryId: 'length' },
  { id: 'in', abbreviation: 'in', system: 'imperial', categoryId: 'length' },
  { id: 'ft', abbreviation: 'ft', system: 'imperial', categoryId: 'length' },
  { id: 'yd', abbreviation: 'yd', system: 'imperial', categoryId: 'length' },
  { id: 'mi', abbreviation: 'mi', system: 'imperial', categoryId: 'length' },
];
const volumeUnits: Unit[] = [
  { id: 'ml', abbreviation: 'mL', system: 'metric', categoryId: 'volume' },
  { id: 'l', abbreviation: 'L', system: 'metric', categoryId: 'volume' },
  { id: 'cm3', abbreviation: 'cm³', system: 'metric', categoryId: 'volume' },
  { id: 'm3', abbreviation: 'm³', system: 'metric', categoryId: 'volume' },
  { id: 'floz', abbreviation: 'fl oz', system: 'imperial', categoryId: 'volume' },
  { id: 'pt', abbreviation: 'pt', system: 'imperial', categoryId: 'volume' },
  { id: 'qt', abbreviation: 'qt', system: 'imperial', categoryId: 'volume' },
  { id: 'gal', abbreviation: 'gal', system: 'imperial', categoryId: 'volume' },
  { id: 'cup', abbreviation: 'cup', system: 'imperial', categoryId: 'volume' },
  { id: 'tbsp', abbreviation: 'tbsp', system: 'imperial', categoryId: 'volume' },
  { id: 'tsp', abbreviation: 'tsp', system: 'imperial', categoryId: 'volume' },
];
const massUnits: Unit[] = [
  { id: 'g', abbreviation: 'g', system: 'metric', categoryId: 'mass' },
  { id: 'kg', abbreviation: 'kg', system: 'metric', categoryId: 'mass' },
  { id: 't', abbreviation: 't', system: 'metric', categoryId: 'mass' },
  { id: 'oz', abbreviation: 'oz', system: 'imperial', categoryId: 'mass' },
  { id: 'lb', abbreviation: 'lb', system: 'imperial', categoryId: 'mass' },
  { id: 'st', abbreviation: 'st', system: 'imperial', categoryId: 'mass' },
];
const temperatureUnits: Unit[] = [
  { id: 'c', abbreviation: '°C', system: 'metric', categoryId: 'temperature' },
  { id: 'f', abbreviation: '°F', system: 'imperial', categoryId: 'temperature' },
];
const areaUnits: Unit[] = [
  { id: 'cm2', abbreviation: 'cm²', system: 'metric', categoryId: 'area' },
  { id: 'm2', abbreviation: 'm²', system: 'metric', categoryId: 'area' },
  { id: 'ha', abbreviation: 'ha', system: 'metric', categoryId: 'area' },
  { id: 'km2', abbreviation: 'km²', system: 'metric', categoryId: 'area' },
  { id: 'in2', abbreviation: 'in²', system: 'imperial', categoryId: 'area' },
  { id: 'ft2', abbreviation: 'ft²', system: 'imperial', categoryId: 'area' },
  { id: 'ac', abbreviation: 'ac', system: 'imperial', categoryId: 'area' },
  { id: 'mi2', abbreviation: 'mi²', system: 'imperial', categoryId: 'area' },
];
const speedUnits: Unit[] = [
  { id: 'ms', abbreviation: 'm/s', system: 'metric', categoryId: 'speed' },
  { id: 'kmh', abbreviation: 'km/h', system: 'metric', categoryId: 'speed' },
  { id: 'mph', abbreviation: 'mph', system: 'imperial', categoryId: 'speed' },
  { id: 'fts', abbreviation: 'ft/s', system: 'imperial', categoryId: 'speed' },
  { id: 'kn', abbreviation: 'kn', system: 'imperial', categoryId: 'speed' },
];
// ========================
// CATEGORÍAS
// ========================
export const categories: Record<string, Category> = {
  length: { id: 'length', icon: '📏', units: lengthUnits, metricBase: 'm', imperialBase: 'in' },
  volume: { id: 'volume', icon: '🧊', units: volumeUnits, metricBase: 'ml', imperialBase: 'floz' },
  mass: { id: 'mass', icon: '⚖️', units: massUnits, metricBase: 'kg', imperialBase: 'oz' },
  temperature: { id: 'temperature', icon: '🌡️', units: temperatureUnits, metricBase: 'c' },
  area: { id: 'area', icon: '📐', units: areaUnits, metricBase: 'm2', imperialBase: 'in2' },
  speed: { id: 'speed', icon: '🚀', units: speedUnits, metricBase: 'ms', imperialBase: 'mph' },
};
export function getCategory(id: string): Category {
  const cat = categories[id];
  if (!cat) throw new Error(`Unknown category: ${id}`);
  return cat;
}
export function getUnit(categoryId: string, unitId: string): Unit {
  const cat = getCategory(categoryId);
  const unit = cat.units.find(u => u.id === unitId);
  if (!unit) throw new Error(`Unknown unit ${unitId} in category ${categoryId}`);
  return unit;
}