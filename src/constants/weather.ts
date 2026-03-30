import type {MoodType} from './tokens';

interface WeatherScene {
  key: MoodType;
  label: string;
  labelNo: string;
  gradientColors: [string, string, string];
  symbol: string;
}

export const weatherScenes: WeatherScene[] = [
  {
    key: 'sunny',
    label: 'Sunny',
    labelNo: 'Sol',
    gradientColors: ['#F6D365', '#FDA085', '#F5F1E8'],
    symbol: '\u2600',
  },
  {
    key: 'cloudy',
    label: 'Cloudy',
    labelNo: 'Overskyet',
    gradientColors: ['#8E9EAB', '#B8C6D0', '#D5DDE3'],
    symbol: '\u2601',
  },
  {
    key: 'rainy',
    label: 'Rainy',
    labelNo: 'Regn',
    gradientColors: ['#4B6584', '#6B8BA4', '#8FA8BF'],
    symbol: '\u{1F327}',
  },
  {
    key: 'stormy',
    label: 'Stormy',
    labelNo: 'Storm',
    gradientColors: ['#2C3E50', '#4A5568', '#636E72'],
    symbol: '\u26C8',
  },
  {
    key: 'foggy',
    label: 'Foggy',
    labelNo: 'Tåke',
    gradientColors: ['#C4C4C4', '#D5D5D5', '#E8E8E8'],
    symbol: '\u{1F32B}',
  },
];
