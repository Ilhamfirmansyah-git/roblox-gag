import type { Trend } from '../types/item';

export function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === 'up') return <span className="text-green-400 font-bold text-lg" title="Trending up">↑</span>;
  if (trend === 'down') return <span className="text-red-400 font-bold text-lg" title="Trending down">↓</span>;
  return <span className="text-gray-400 font-bold text-lg" title="Stable">→</span>;
}
