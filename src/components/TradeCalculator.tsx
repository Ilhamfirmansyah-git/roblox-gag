import { useState, useCallback } from 'react';
import type { Item } from '../types/item';
import { RarityBadge } from './RarityBadge';
import { AdSlot } from './AdSlot';

function formatValue(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

function ItemPicker({
  allItems,
  selected,
  onAdd,
  onRemove,
  label,
}: {
  allItems: Item[];
  selected: Item[];
  onAdd: (item: Item) => void;
  onRemove: (id: string) => void;
  label: string;
}) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const suggestions = allItems
    .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8);

  return (
    <div className="flex-1">
      <h3 className="font-bold text-lg mb-3 text-center">{label}</h3>

      {/* Selected items */}
      <div className="min-h-24 bg-gray-800 rounded-xl p-3 mb-3 space-y-2">
        {selected.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">Add items below</p>
        )}
        {selected.map(item => (
          <div key={item.id} className="flex items-center gap-2 bg-gray-900 rounded-lg p-2">
            <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover bg-gray-700" loading="lazy" width="32" height="32" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{item.name}</div>
              <div className="text-xs text-yellow-400">{formatValue(item.value)}</div>
            </div>
            <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-300 text-lg leading-none flex-shrink-0">×</button>
          </div>
        ))}
      </div>

      {/* Search to add */}
      {selected.length < 6 && (
        <div className="relative">
          <input
            type="search"
            placeholder="Search to add item..."
            value={search}
            onChange={e => { setSearch(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          {open && search && (
            <div className="absolute z-10 w-full bg-gray-900 border border-gray-700 rounded-lg mt-1 overflow-hidden shadow-xl">
              {suggestions.length === 0 && (
                <div className="text-gray-500 text-sm px-3 py-2">No items found</div>
              )}
              {suggestions.map(item => (
                <button
                  key={item.id}
                  onMouseDown={() => { onAdd(item); setSearch(''); setOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-800 transition-colors text-left"
                >
                  <span className="text-sm font-semibold text-white flex-1 truncate">{item.name}</span>
                  <span className="text-xs text-yellow-400 flex-shrink-0">{formatValue(item.value)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getVerdict(yourTotal: number, theirTotal: number): { text: string; color: string; bg: string } {
  if (theirTotal === 0 && yourTotal === 0) return { text: 'FAIR', color: 'text-yellow-400', bg: 'bg-yellow-900/30' };
  if (theirTotal === 0) return { text: 'LOSE', color: 'text-red-400', bg: 'bg-red-900/30' };
  const ratio = yourTotal / theirTotal;
  if (ratio > 1.1) return { text: 'WIN', color: 'text-green-400', bg: 'bg-green-900/30' };
  if (ratio < 0.9) return { text: 'LOSE', color: 'text-red-400', bg: 'bg-red-900/30' };
  return { text: 'FAIR', color: 'text-yellow-400', bg: 'bg-yellow-900/30' };
}

export function TradeCalculator({ items, initialItemId }: { items: Item[]; initialItemId?: string }) {
  const initial = initialItemId ? items.find(i => i.id === initialItemId) : undefined;
  const [yourItems, setYourItems] = useState<Item[]>(initial ? [initial] : []);
  const [theirItems, setTheirItems] = useState<Item[]>([]);
  const [copied, setCopied] = useState(false);

  const yourTotal = yourItems.reduce((s, i) => s + i.value, 0);
  const theirTotal = theirItems.reduce((s, i) => s + i.value, 0);
  const diff = yourTotal - theirTotal;
  const verdict = getVerdict(yourTotal, theirTotal);
  const hasItems = yourItems.length > 0 || theirItems.length > 0;

  const addToYour = useCallback((item: Item) => {
    setYourItems(prev => prev.length < 6 ? [...prev, item] : prev);
  }, []);
  const removeFromYour = useCallback((id: string) => {
    setYourItems(prev => prev.filter(i => i.id !== id));
  }, []);
  const addToTheir = useCallback((item: Item) => {
    setTheirItems(prev => prev.length < 6 ? [...prev, item] : prev);
  }, []);
  const removeFromTheir = useCallback((id: string) => {
    setTheirItems(prev => prev.filter(i => i.id !== id));
  }, []);

  function shareResult() {
    const params = new URLSearchParams();
    if (yourItems.length) params.set('you', yourItems.map(i => i.id).join(','));
    if (theirItems.length) params.set('them', theirItems.map(i => i.id).join(','));
    const url = `${window.location.origin}/calculator?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function reset() {
    setYourItems([]);
    setTheirItems([]);
  }

  return (
    <div>
      <AdSlot slot="calculator-top" className="w-full h-14 mb-6" label="Advertisement" />

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <ItemPicker allItems={items} selected={yourItems} onAdd={addToYour} onRemove={removeFromYour} label="Your Side" />

        {/* Divider */}
        <div className="flex sm:flex-col items-center justify-center gap-2 text-gray-500 text-2xl">
          <div className="hidden sm:block w-px bg-gray-800 flex-1" />
          <span>⇄</span>
          <div className="hidden sm:block w-px bg-gray-800 flex-1" />
        </div>

        <ItemPicker allItems={items} selected={theirItems} onAdd={addToTheir} onRemove={removeFromTheir} label="Their Side" />
      </div>

      {/* Result Panel */}
      {hasItems && (
        <div className={`rounded-2xl p-6 ${verdict.bg} border border-gray-800 mb-6`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-xs text-gray-400 mb-1">Your Value</div>
                <div className="text-2xl font-black text-white">{formatValue(yourTotal)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Their Value</div>
                <div className="text-2xl font-black text-white">{formatValue(theirTotal)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Difference</div>
                <div className={`text-2xl font-black ${diff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {diff >= 0 ? '+' : ''}{formatValue(diff)}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Verdict</div>
              <div className={`text-4xl font-black ${verdict.color}`}>{verdict.text}</div>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={shareResult}
          disabled={!hasItems}
          className="flex-1 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-bold transition-colors"
        >
          {copied ? '✓ Copied!' : '🔗 Share Result'}
        </button>
        <button
          onClick={reset}
          className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-bold transition-colors"
        >
          Reset
        </button>
      </div>

      {!hasItems && (
        <p className="text-center text-gray-500 text-sm mt-4">Add items to both sides to see the trade verdict.</p>
      )}
    </div>
  );
}
