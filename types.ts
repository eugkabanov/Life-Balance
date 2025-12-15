export type OptionKey = 'time' | 'comfort' | 'savings';

export interface OptionConfig {
  key: OptionKey;
  label: string;
  color: string;
  description: string;
}

export const OPTIONS: OptionConfig[] = [
  { 
    key: 'time', 
    label: 'Время', 
    color: '#3b82f6', // blue
    description: 'Быстро, эффективно, без ожиданий.'
  },
  { 
    key: 'comfort', 
    label: 'Комфорт', 
    color: '#8b5cf6', // purple
    description: 'Удобно, приятно, качественно.'
  },
  { 
    key: 'savings', 
    label: 'Накопления', 
    color: '#22c55e', // green
    description: 'Дешево, экономично, бережливо.'
  },
];