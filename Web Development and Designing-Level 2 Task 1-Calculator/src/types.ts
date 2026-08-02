export type ThemeId = 'boldTypography' | 'obsidian' | 'nordic' | 'cyberpunk' | 'monochrome';

export interface Theme {
  id: ThemeId;
  name: string;
  badge: string;
  bgClass: string;
  cardBg: string;
  displayBg: string;
  displayText: string;
  subDisplayText: string;
  numBtn: string;
  opBtn: string;
  fnBtn: string;
  equalBtn: string;
  clearBtn: string;
  accentText: string;
  borderClass: string;
  glowColor: string;
}

export type CalcMode = 'standard' | 'sequential' | 'scientific' | 'converter';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
  isError?: boolean;
}

export type ButtonType = 'number' | 'operator' | 'function' | 'action' | 'equal' | 'memory' | 'clear';

export interface KeyButtonConfig {
  id: string;
  label: string;
  subLabel?: string;
  value: string;
  type: ButtonType;
  keyCodes?: string[];
  gridSpan?: string; // e.g. 'col-span-2'
  ariaLabel?: string;
}

export interface UnitCategory {
  id: string;
  name: string;
  icon: string;
  units: { [key: string]: number }; // scale relative to base unit
  offsets?: { [key: string]: number }; // for temperature e.g. celsius to fahrenheit
}

export interface MemoryState {
  value: number;
  hasValue: boolean;
}
