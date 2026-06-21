import { useState, useMemo } from 'react';
import type { Item, Rarity } from '../types/item';
import { RarityBadge } from './RarityBadge';
import { TrendIcon } from './TrendIcon';
import { AdSlot } from './AdSlot';

type SortKey = 'value' | 'demand' | 'name';
type SortDir = 'asc' | 'desc';

const RARITIES: Rarity[] = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Secret', 'Brainrot God'];

function formatValue(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

export function ValueTable({ items }: { items: Item[] }) {
  const [search, setSearch] = useState('');
  const [rarityFilter, setRarityFilter] = useState<Rarity | ''>('');
  const [sortKey, setSortKey] = useState<SortKey>('value');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const filtered = useMemo(() => {
    let list = items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchRarity = rarityFilter ? item.rarity === rarityFilter : true;
      return matchSearch && matchRarity;
    });
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'value') cmp = a.value - b.value;
      else if (sortKey === 'demand') cmp = a.demand - b.demand;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [items, search, rarityFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

  const sortLabel = (key: SortKey) => sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '';

  return (
    <div>
      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="search"
          placeholder="Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
        <select
          value={rarityFilter}
          onChange={e => setRarityFilter(e.target.value as Rarity | '')}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
        >
          <option value="">All Rarities</option>
          {RARITIES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <div className="flex gap-2">
          {(['value', 'demand', 'name'] as SortKey[]).map(key => (
            <button
              key={key}
              onClick={() => toggleSort(key)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${sortKey === key ? 'bg-purple-700 border-purple-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'}`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}{sortLabel(key)}
            </button>
          ))}
        </div>
      </div>

      {/* Ad Slot - top of list */}
      <AdSlot slot="value-list-top" className="w-full h-16 mb-4" label="Advertisement" />

      {/* Results count */}
      <p className="text-gray-500 text-sm mb-3">{filtered.length} items</p>

      {/* Mobile: Cards */}
      <div className="sm:hidden space-y-3">
        {filtered.map((item, idx) => (
          <div key={item.id}>
            {idx > 0 && idx % 10 === 0 && (
              <AdSlot slot="in-list" className="w-full h-14 mb-3" label="Advertisement" />
            )}
            <a href={`/item/${item.id}`} className="block bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-purple-700 transition-colors">
              <div className="flex items-start gap-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-gray-800 flex-shrink-0" loading="lazy" width="56" height="56" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white truncate">{item.name}</span>
                    {!item.obtainable && <span className="text-xs bg-red-900 text-red-300 px-1 rounded">Unobtainable</span>}
                  </div>
                  <RarityBadge rarity={item.rarity} />
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-yellow-400 font-bold">{formatValue(item.value)}</span>
                    <span className="text-gray-400">Demand: <span className="text-white font-semibold">{item.demand}/10</span></span>
                    <TrendIcon trend={item.trend} />
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="text-left py-3 px-2">Item</th>
              <th className="text-left py-3 px-2">Rarity</th>
              <th className="text-right py-3 px-2 cursor-pointer hover:text-white select-none" onClick={() => toggleSort('value')}>
                Value{sortLabel('value')}
              </th>
              <th className="text-right py-3 px-2 cursor-pointer hover:text-white select-none" onClick={() => toggleSort('demand')}>
                Demand{sortLabel('demand')}
              </th>
              <th className="text-center py-3 px-2">Trend</th>
              <th className="text-center py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <>
                {idx > 0 && idx % 10 === 0 && (
                  <tr key={`ad-${idx}`}>
                    <td colSpan={6} className="py-2">
                      <AdSlot slot="in-list" className="w-full h-14" label="Advertisement" />
                    </td>
                  </tr>
                )}
                <tr key={item.id} className="border-b border-gray-900 hover:bg-gray-900 transition-colors">
                  <td className="py-3 px-2">
                    <a href={`/item/${item.id}`} className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-gray-800 flex-shrink-0" loading="lazy" width="40" height="40" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <span className="font-semibold">{item.name}</span>
                    </a>
                  </td>
                  <td className="py-3 px-2"><RarityBadge rarity={item.rarity} /></td>
                  <td className="py-3 px-2 text-right text-yellow-400 font-bold">{formatValue(item.value)}</td>
                  <td className="py-3 px-2 text-right">{item.demand}/10</td>
                  <td className="py-3 px-2 text-center"><TrendIcon trend={item.trend} /></td>
                  <td className="py-3 px-2 text-center">
                    {item.obtainable ? (
                      <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded">Obtainable</span>
                    ) : (
                      <span className="text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded">Unobtainable</span>
                    )}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">No items found. Try a different search or filter.</div>
      )}
    </div>
  );
}
