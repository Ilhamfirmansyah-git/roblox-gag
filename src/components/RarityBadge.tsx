import type { Rarity } from '../types/item';

const rarityColors: Record<Rarity, string> = {
  Common: 'bg-gray-500 text-gray-100',
  Rare: 'bg-blue-600 text-white',
  Epic: 'bg-purple-600 text-white',
  Legendary: 'bg-yellow-500 text-gray-900',
  Mythic: 'bg-orange-500 text-white',
  'Brainrot God': 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white',
  Secret: 'bg-red-700 text-white',
};

export function RarityBadge({ rarity }: { rarity: Rarity }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${rarityColors[rarity]}`}>
      {rarity}
    </span>
  );
}
