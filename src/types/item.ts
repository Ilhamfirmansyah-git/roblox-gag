export type Trend = 'up' | 'down' | 'stable';
export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Brainrot God' | 'Secret';

export interface Item {
  id: string;
  name: string;
  rarity: Rarity;
  value: number;
  demand: number;
  trend: Trend;
  obtainable: boolean;
  image: string;
  notes: string;
}
