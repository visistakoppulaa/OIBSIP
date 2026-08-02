/**
 * Unit conversion data and conversion functions
 */

export interface UnitCategory {
  id: string;
  name: string;
  units: Record<string, { label: string; ratio: number; offset?: number }>;
}

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    name: 'Length',
    units: {
      m: { label: 'Meters (m)', ratio: 1 },
      km: { label: 'Kilometers (km)', ratio: 1000 },
      cm: { label: 'Centimeters (cm)', ratio: 0.01 },
      mm: { label: 'Millimeters (mm)', ratio: 0.001 },
      ft: { label: 'Feet (ft)', ratio: 0.3048 },
      in: { label: 'Inches (in)', ratio: 0.0254 },
      mi: { label: 'Miles (mi)', ratio: 1609.344 },
    },
  },
  {
    id: 'mass',
    name: 'Mass & Weight',
    units: {
      kg: { label: 'Kilograms (kg)', ratio: 1 },
      g: { label: 'Grams (g)', ratio: 0.001 },
      mg: { label: 'Milligrams (mg)', ratio: 0.000001 },
      lb: { label: 'Pounds (lbs)', ratio: 0.45359237 },
      oz: { label: 'Ounces (oz)', ratio: 0.028349523125 },
    },
  },
  {
    id: 'temperature',
    name: 'Temperature',
    units: {
      c: { label: 'Celsius (°C)', ratio: 1, offset: 0 },
      f: { label: 'Fahrenheit (°F)', ratio: 5 / 9, offset: 32 },
      k: { label: 'Kelvin (K)', ratio: 1, offset: 273.15 },
    },
  },
  {
    id: 'data',
    name: 'Digital Data',
    units: {
      b: { label: 'Bytes (B)', ratio: 1 },
      kb: { label: 'Kilobytes (KB)', ratio: 1024 },
      mb: { label: 'Megabytes (MB)', ratio: 1048576 },
      gb: { label: 'Gigabytes (GB)', ratio: 1073741824 },
      tb: { label: 'Terabytes (TB)', ratio: 1099511627776 },
    },
  },
];

export function convertValue(
  value: number,
  categoryKey: string,
  fromUnitKey: string,
  toUnitKey: string
): number {
  if (isNaN(value)) return 0;
  const cat = UNIT_CATEGORIES.find((c) => c.id === categoryKey);
  if (!cat) return value;

  const from = cat.units[fromUnitKey];
  const to = cat.units[toUnitKey];
  if (!from || !to) return value;

  if (categoryKey === 'temperature') {
    // Convert to Celsius first
    let inCelsius = value;
    if (fromUnitKey === 'f') {
      inCelsius = (value - 32) * (5 / 9);
    } else if (fromUnitKey === 'k') {
      inCelsius = value - 273.15;
    }

    // Convert from Celsius to target
    if (toUnitKey === 'f') {
      return inCelsius * (9 / 5) + 32;
    } else if (toUnitKey === 'k') {
      return inCelsius + 273.15;
    }
    return inCelsius;
  }

  // Base ratio conversion
  const baseValue = value * from.ratio;
  return baseValue / to.ratio;
}
