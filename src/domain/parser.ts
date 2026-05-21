import type { ParserResult } from './types';
// ========================
// PARSER DE NOTACIÓN COMPUESTA
// ========================
/**
 * Parsea notación imperial compuesta a valor en la unidad base imperial.
 *
 * Casos:
 * - "6'2""  → 74 (pulgadas)
 * - "5ft 10in" → 70 (pulgadas)
 * - "2 cups"  → 2 (tazas)
 * - "10 lb 5 oz" → 165 (onzas)
 * - "3 tbsp"  → 3 (cucharadas)
 */
// Patrones de unidades imperiales compuestas
const PATTERNS: { regex: RegExp; imperialUnit: string; parse: (matches: RegExpMatchArray) => number }[] = [
  // Longitud: 6'2" o 6' 2"
  {
    regex: /^(\d+)'[\s]?(\d+)"$/,
    imperialUnit: 'in',
    parse: (m) => parseInt(m[1]) * 12 + parseInt(m[2]),
  },
  // Longitud: 5ft 10in o 5ft10in
  {
    regex: /^(\d+)\s*ft\s*(\d+)\s*in$/i,
    imperialUnit: 'in',
    parse: (m) => parseInt(m[1]) * 12 + parseInt(m[2]),
  },
  // Longitud: solo ft
  {
    regex: /^(\d+)\s*ft$/i,
    imperialUnit: 'in',
    parse: (m) => parseInt(m[1]) * 12,
  },
  // Longitud: solo ' y solo "
  {
    regex: /^(\d+)'$/,
    imperialUnit: 'in',
    parse: (m) => parseInt(m[1]) * 12,
  },
  {
    regex: /^(\d+)"$/,
    imperialUnit: 'in',
    parse: (m) => parseInt(m[1]),
  },
  // Masa: 10 lb 5 oz o 10lb5oz
  {
    regex: /^(\d+)\s*lb\s*(\d+)\s*oz$/i,
    imperialUnit: 'oz',
    parse: (m) => parseInt(m[1]) * 16 + parseInt(m[2]),
  },
  // Masa: solo lb
  {
    regex: /^(\d+)\s*lb$/i,
    imperialUnit: 'oz',
    parse: (m) => parseInt(m[1]) * 16,
  },
  // Volumen: 2 cups, 3 tbsp, 1 tsp
  {
    regex: /^(\d+(?:\.\d+)?)\s*(cup|cups|tbsp|tsp|gal|qt|pt|floz?)\s*$/i,
    imperialUnit: '', // se determina del match
    parse: (m) => {
      const value = parseFloat(m[1]);
      const unit = m[2].toLowerCase();
      if (unit.startsWith('cup')) return value; // en cups
      if (unit === 'tbsp') return value;
      if (unit === 'tsp') return value;
      if (unit === 'gal') return value;
      if (unit === 'qt') return value;
      if (unit === 'pt') return value;
      if (unit.startsWith('floz') || unit === 'fl oz') return value;
      return value;
    },
  },
];
export function parseImperialNotation(input: string, categoryId: string): ParserResult {
  const trimmed = input.trim();
  for (const pattern of PATTERNS) {
    const match = trimmed.match(pattern.regex);
    if (match) {
      const value = pattern.parse(match);
      // Para volumen, necesitamos determinar la unidad exacta
      if (categoryId === 'volume' && pattern.imperialUnit === '') {
        const unitMatch = trimmed.match(/(cup|cups|tbsp|tsp|gal|qt|pt|floz?)\s*$/i);
        if (unitMatch) {
          const unitMap: Record<string, string> = {
            cup: 'cup', cups: 'cup',
            tbsp: 'tbsp', tsp: 'tsp',
            gal: 'gal', qt: 'qt', pt: 'pt',
            floz: 'floz', fl: 'floz',
          };
          const unit = unitMap[unitMatch[1].toLowerCase()] || null;
          if (unit) return { value, unitId: unit };
        }
        return null;
      }
      return { value, unitId: pattern.imperialUnit };
    }
  }
  // Si no hay patrón imperial, intentar parsear como número simple
  // (se usará la unidad seleccionada en el store)
  return null;
}
/**
 * Determina si el input usa notación imperial compuesta.
 */
export function isCompositeNotation(input: string): boolean {
  const trimmed = input.trim();
  return PATTERNS.some(p => p.regex.test(trimmed));
}