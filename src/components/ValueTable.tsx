import { useState, useMemo, Fragment } from 'react';
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
  return n.toLocaleString();
}

function DemandBar({ demand }: { demand: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-3 rounded-sm ${i < demand ? 'bg-purple-500' : 'bg-gray-700'}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-400">{demand}/10</span>
    </div>
  );
}

function ItemImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      width="56"
      height="56"
      onError={(e) => {
        const el = e.currentTarget;
        el.style.display = 'none';
      }}
    />
  );
}

export function ValueTable({ items }: { items: Item[] }) {
  const [search, setSearch] = useState('');
  const [rarityFilter, setRarityFilter] = useState<Rarity | ''>('');
  const [sortKey, setSortKey] = useState<SortKey>('value');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [showUnobtainable, setShowUnobtainable] = useState(true);

  const filtered = useMemo(() => {
    let list = items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchRarity = rarityFilter ? item.rarity === rarityFilter : true;
      const matchObtainable = showUnobtainable ? true : item.obtainable;
      return matchSearch && matchRarity && matchObtainable;
    });
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'value') cmp = a.value - b.value;
      else if (sortKey === 'demand') cmp = a.demand - b.demand;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [items, search, rarityFilter, sortKey, sortDir, showUnobtainable]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

  const sortLabel = (key: SortKey) => sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '';

  return (
    <div>
      {/* Search + Filter Bar */}
      <div className="flex flex-col gap-3 mb-4">
        <input
          type="search"
          placeholder="🔍 Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-base"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={rarityFilter}
            onChange={e => setRarityFilter(e.target.value as Rarity | '')}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm"
          >
            <option value="">All Rarities</option>
            {RARITIES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <label className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 cursor-pointer text-sm text-gray-300 select-none">
            <input
              type="checkbox"
              checked={showUnobtainable}
              onChange={e => setShowUnobtainable(e.target.checked)}
              className="w-3.5 h-3.5 accent-purple-500"
            />
            Show Unobtainable
          </label>
          <div className="flex gap-1.5 ml-auto">
            {(['value', 'demand', 'name'] as SortKey[]).map(key => (
              <button
                key={key}
                onClick={() => toggleSort(key)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${sortKey === key ? 'bg-purple-700 border-purple-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}{sortLabel(key)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ad Slot - top of list */}
      <AdSlot slot="value-list-top" className="w-full h-16 mb-4" label="Advertisement" />

      {/* Results count */}
      <p className="text-gray-500 text-xs mb-3">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>

      {/* Mobile: Cards */}
      <div className="sm:hidden space-y-2">
        {filtered.map((item, idx) => (
          <Fragment key={item.id}>
            {idx > 0 && idx % 10 === 0 && (
              <AdSlot slot="in-list" className="w-full h-14 my-2" label="Advertisement" />
            )}
            <a
              href={`/item/${item.id}`}
              className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl p-3 hover:border-purple-700 transition-all active:scale-[0.99]"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 flex items-center justify-center">
                <ItemImage src={item.image} alt={item.name} className="w-14 h-14 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-bold text-white text-sm truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <RarityBadge rarity={item.rarity} />
                  {!item.obtainable && (
                    <span className="text-xs bg-red-950 text-red-400 px-1.5 py-0.5 rounded border border-red-900">
                      Unobtainable
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-yellow-400 font-bold">{formatValue(item.value)}</span>
                  <TrendIcon trend={item.trend} />
                  <span className="text-gray-500 text-xs">Demand {item.demand}/10</span>
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </Fragment>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 bg-gray-900 border-b border-gray-800 text-xs uppercase tracking-wider">
              <th className="text-left py-3 px-4">#</th>
              <th className="text-left py-3 px-4">Item</th>
              <th className="text-left py-3 px-4">Rarity</th>
              <th
                className="text-right py-3 px-4 cursor-pointer hover:text-white select-none"
                onClick={() => toggleSort('value')}
              >
                Value{sortLabel('value')}
              </th>
              <th
                className="text-center py-3 px-4 cursor-pointer hover:text-white select-none"
                onClick={() => toggleSort('demand')}
              >
                Demand{sortLabel('demand')}
              </th>
              <th className="text-center py-3 px-4">Trend</th>
              <th className="text-center py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <Fragment key={item.id}>
                {idx > 0 && idx % 10 === 0 && (
                  <tr key={`ad-${idx}`}>
                    <td colSpan={7} className="py-2 px-4">
                      <AdSlot slot="in-list" className="w-full h-12" label="Advertisement" />
                    </td>
                  </tr>
                )}
                <tr className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors">
                  <td className="py-3 px-4 text-gray-600 text-xs">{idx + 1}</td>
                  <td className="py-3 px-4">
                    <a href={`/item/${item.id}`} className="flex items-center gap-3 hover:text-purple-400 transition-colors group">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 flex items-center justify-center group-hover:ring-2 ring-purple-700 transition-all">
                        <ItemImage src={item.image} alt={item.name} className="w-10 h-10 object-contain" />
                      </div>
                      <span className="font-semibold">{item.name}</span>
                    </a>
                  </td>
                  <td className="py-3 px-4"><RarityBadge rarity={item.rarity} /></td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-yellow-400 font-bold">{formatValue(item.value)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <DemandBar demand={item.demand} />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center"><TrendIcon trend={item.trend} /></td>
                  <td className="py-3 px-4 text-center">
                    {item.obtainable ? (
                      <span className="text-xs bg-green-950 text-green-400 px-2 py-0.5 rounded border border-green-900">Obtainable</span>
                    ) : (
                      <span className="text-xs bg-red-950 text-red-400 px-2 py-0.5 rounded border border-red-900">Unobtainable</span>
                    )}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">🔍</div>
          <p>No items found. Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}
