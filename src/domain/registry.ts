import type { Category, Unit } from './types';
// ========================
// UNIDADES POR CATEGORÍA
// ========================
const lengthUnits: Unit[] = [
  { id: 'mm', label: 'Milímetro', abbreviation: 'mm', system: 'metric', categoryId: 'length' },
  { id: 'cm', label: 'Centímetro', abbreviation: 'cm', system: 'metric', categoryId: 'length' },
  { id: 'm', label: 'Metro', abbreviation: 'm', system: 'metric', categoryId: 'length' },
  { id: 'km', label: 'Kilómetro', abbreviation: 'km', system: 'metric', categoryId: 'length' },
  { id: 'in', label: 'Pulgada', abbreviation: 'in', system: 'imperial', categoryId: 'length' },
  { id: 'ft', label: 'Pie', abbreviation: 'ft', system: 'imperial', categoryId: 'length' },
  { id: 'yd', label: 'Yarda', abbreviation: 'yd', system: 'imperial', categoryId: 'length' },
  { id: 'mi', label: 'Milla', abbreviation: 'mi', system: 'imperial', categoryId: 'length' },
];
const volumeUnits: Unit[] = [
  { id: 'ml', label: 'Mililitro', abbreviation: 'mL', system: 'metric', categoryId: 'volume' },
  { id: 'l', label: 'Litro', abbreviation: 'L', system: 'metric', categoryId: 'volume' },
  { id: 'cm3', label: 'Centímetro cúbico', abbreviation: 'cm³', system: 'metric', categoryId: 'volume' },
  { id: 'm3', label: 'Metro cúbico', abbreviation: 'm³', system: 'metric', categoryId: 'volume' },
  { id: 'floz', label: 'Onza líquida', abbreviation: 'fl oz', system: 'imperial', categoryId: 'volume' },
  { id: 'pt', label: 'Pinta', abbreviation: 'pt', system: 'imperial', categoryId: 'volume' },
  { id: 'qt', label: 'Cuarto', abbreviation: 'qt', system: 'imperial', categoryId: 'volume' },
  { id: 'gal', label: 'Galón', abbreviation: 'gal', system: 'imperial', categoryId: 'volume' },
  { id: 'cup', label: 'Taza', abbreviation: 'cup', system: 'imperial', categoryId: 'volume' },
  { id: 'tbsp', label: 'Cucharada', abbreviation: 'tbsp', system: 'imperial', categoryId: 'volume' },
  { id: 'tsp', label: 'Cucharadita', abbreviation: 'tsp', system: 'imperial', categoryId: 'volume' },
];
const massUnits: Unit[] = [
  { id: 'g', label: 'Gramo', abbreviation: 'g', system: 'metric', categoryId: 'mass' },
  { id: 'kg', label: 'Kilogramo', abbreviation: 'kg', system: 'metric', categoryId: 'mass' },
  { id: 't', label: 'Tonelada', abbreviation: 't', system: 'metric', categoryId: 'mass' },
  { id: 'oz', label: 'Onza', abbreviation: 'oz', system: 'imperial', categoryId: 'mass' },
  { id: 'lb', label: 'Libra', abbreviation: 'lb', system: 'imperial', categoryId: 'mass' },
  { id: 'st', label: 'Stone', abbreviation: 'st', system: 'imperial', categoryId: 'mass' },
];
const temperatureUnits: Unit[] = [
  { id: 'c', label: 'Celsius', abbreviation: '°C', system: 'metric', categoryId: 'temperature' },
  { id: 'f', label: 'Fahrenheit', abbreviation: '°F', system: 'imperial', categoryId: 'temperature' },
];
const areaUnits: Unit[] = [
  { id: 'cm2', label: 'Centímetro cuadrado', abbreviation: 'cm²', system: 'metric', categoryId: 'area' },
  { id: 'm2', label: 'Metro cuadrado', abbreviation: 'm²', system: 'metric', categoryId: 'area' },
  { id: 'ha', label: 'Hectárea', abbreviation: 'ha', system: 'metric', categoryId: 'area' },
  { id: 'km2', label: 'Kilómetro cuadrado', abbreviation: 'km²', system: 'metric', categoryId: 'area' },
  { id: 'in2', label: 'Pulgada cuadrada', abbreviation: 'in²', system: 'imperial', categoryId: 'area' },
  { id: 'ft2', label: 'Pie cuadrado', abbreviation: 'ft²', system: 'imperial', categoryId: 'area' },
  { id: 'ac', label: 'Acre', abbreviation: 'ac', system: 'imperial', categoryId: 'area' },
  { id: 'mi2', label: 'Milla cuadrada', abbreviation: 'mi²', system: 'imperial', categoryId: 'area' },
];
const speedUnits: Unit[] = [
  { id: 'ms', label: 'Metro por segundo', abbreviation: 'm/s', system: 'metric', categoryId: 'speed' },
  { id: 'kmh', label: 'Kilómetro por hora', abbreviation: 'km/h', system: 'metric', categoryId: 'speed' },
  { id: 'mph', label: 'Milla por hora', abbreviation: 'mph', system: 'imperial', categoryId: 'speed' },
  { id: 'fts', label: 'Pie por segundo', abbreviation: 'ft/s', system: 'imperial', categoryId: 'speed' },
  { id: 'kn', label: 'Nudo', abbreviation: 'kn', system: 'imperial', categoryId: 'speed' },
];
// ========================
// CATEGORÍAS
// ========================
export const categories: Record<string, Category> = {
  length: { id: 'length', label: 'Longitud', icon: '📏', units: lengthUnits, metricBase: 'm', imperialBase: 'in' },
  volume: { id: 'volume', label: 'Volumen', icon: '🧊', units: volumeUnits, metricBase: 'ml', imperialBase: 'floz' },
  mass: { id: 'mass', label: 'Masa', icon: '⚖️', units: massUnits, metricBase: 'kg', imperialBase: 'oz' },
  temperature: { id: 'temperature', label: 'Temperatura', icon: '🌡️', units: temperatureUnits, metricBase: 'c' },
  area: { id: 'area', label: 'Área', icon: '📐', units: areaUnits, metricBase: 'm2', imperialBase: 'in2' },
  speed: { id: 'speed', label: 'Velocidad', icon: '🚀', units: speedUnits, metricBase: 'ms', imperialBase: 'mph' },
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