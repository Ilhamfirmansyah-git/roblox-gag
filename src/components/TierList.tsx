import { useState, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Item } from '../types/item';

interface Tier {
  id: string;
  label: string;
  color: string;
  items: Item[];
}

const DEFAULT_TIERS: Tier[] = [
  { id: 's', label: 'S', color: '#ef4444', items: [] },
  { id: 'a', label: 'A', color: '#f97316', items: [] },
  { id: 'b', label: 'B', color: '#eab308', items: [] },
  { id: 'c', label: 'C', color: '#22c55e', items: [] },
  { id: 'd', label: 'D', color: '#3b82f6', items: [] },
];

function ItemChip({ item, dragging = false }: { item: Item; dragging?: boolean }) {
  return (
    <div
      title={item.name}
      className={`w-14 h-14 rounded-lg flex-shrink-0 overflow-hidden bg-gray-700 border-2 border-gray-600 cursor-grab active:cursor-grabbing select-none ${dragging ? 'opacity-50 ring-2 ring-purple-500' : ''}`}
    >
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" width="56" height="56" onError={(e) => {
        const el = e.target as HTMLImageElement;
        el.style.display = 'none';
        el.parentElement!.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:9px;text-align:center;color:#9ca3af;padding:2px">${item.name}</div>`;
      }} />
    </div>
  );
}

function SortableItem({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      {...attributes}
      {...listeners}
    >
      <ItemChip item={item} />
    </div>
  );
}

function TierRow({ tier, onRemoveTier, onLabelChange, onColorChange }: {
  tier: Tier;
  onRemoveTier: (id: string) => void;
  onLabelChange: (id: string, label: string) => void;
  onColorChange: (id: string, color: string) => void;
}) {
  return (
    <div className="flex gap-2 min-h-[4rem]" data-tier={tier.id}>
      <div
        className="w-14 h-auto min-h-[3.5rem] flex-shrink-0 flex items-center justify-center rounded-lg font-black text-2xl text-white"
        style={{ backgroundColor: tier.color }}
      >
        <input
          type="text"
          value={tier.label}
          onChange={e => onLabelChange(tier.id, e.target.value.slice(0, 3))}
          className="w-full text-center bg-transparent font-black text-2xl text-white outline-none"
          maxLength={3}
        />
      </div>
      <SortableContext items={tier.items.map(i => i.id)} strategy={horizontalListSortingStrategy}>
        <div
          className="flex-1 bg-gray-900 rounded-lg p-2 flex flex-wrap gap-2 min-h-[3.5rem] border border-gray-800"
          data-droppable-tier={tier.id}
        >
          {tier.items.map(item => <SortableItem key={item.id} item={item} />)}
        </div>
      </SortableContext>
      <div className="flex flex-col gap-1">
        <input type="color" value={tier.color} onChange={e => onColorChange(tier.id, e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent" title="Change color" />
        <button onClick={() => onRemoveTier(tier.id)} className="w-7 h-7 bg-gray-800 hover:bg-red-900 text-gray-400 hover:text-red-400 rounded text-xs transition-colors" title="Remove tier">✕</button>
      </div>
    </div>
  );
}

export function TierList({ items }: { items: Item[] }) {
  const [tiers, setTiers] = useState<Tier[]>(DEFAULT_TIERS);
  const [pool, setPool] = useState<Item[]>(items);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  );

  function findItemContainer(itemId: string): { type: 'pool' } | { type: 'tier'; tierId: string } | null {
    if (pool.find(i => i.id === itemId)) return { type: 'pool' };
    for (const tier of tiers) {
      if (tier.items.find(i => i.id === itemId)) return { type: 'tier', tierId: tier.id };
    }
    return null;
  }

  function handleDragStart(event: DragStartEvent) {
    const id = String(event.active.id);
    const item = [...pool, ...tiers.flatMap(t => t.items)].find(i => i.id === id) || null;
    setActiveItem(item);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);
    const { active, over } = event;
    if (!over) return;
    const fromId = String(active.id);
    const toId = String(over.id);
    if (fromId === toId) return;

    const from = findItemContainer(fromId);
    if (!from) return;

    const draggedItem = from.type === 'pool'
      ? pool.find(i => i.id === fromId)
      : tiers.find(t => t.id === from.tierId)?.items.find(i => i.id === fromId);
    if (!draggedItem) return;

    // Determine destination
    const toTier = tiers.find(t => t.id === toId || t.items.some(i => i.id === toId));

    setTiers(prev => prev.map(tier => {
      // Remove from source tier
      if (from.type === 'tier' && tier.id === from.tierId) {
        return { ...tier, items: tier.items.filter(i => i.id !== fromId) };
      }
      // Add to destination tier
      if (toTier && tier.id === toTier.id) {
        if (tier.items.find(i => i.id === fromId)) return tier;
        const toIndex = tier.items.findIndex(i => i.id === toId);
        const newItems = [...tier.items.filter(i => i.id !== fromId)];
        if (toIndex >= 0) newItems.splice(toIndex, 0, draggedItem);
        else newItems.push(draggedItem);
        return { ...tier, items: newItems };
      }
      return tier;
    }));

    if (from.type === 'pool') setPool(prev => prev.filter(i => i.id !== fromId));
    if (!toTier) setPool(prev => prev.find(i => i.id === fromId) ? prev : [...prev, draggedItem]);
  }

  function addTier() {
    const colors = ['#8b5cf6', '#06b6d4', '#ec4899'];
    setTiers(prev => [...prev, {
      id: `tier-${Date.now()}`,
      label: 'F',
      color: colors[prev.length % colors.length],
      items: [],
    }]);
  }

  function removeTier(id: string) {
    const tier = tiers.find(t => t.id === id);
    if (tier) setPool(prev => [...prev, ...tier.items]);
    setTiers(prev => prev.filter(t => t.id !== id));
  }

  function resetAll() {
    setTiers(DEFAULT_TIERS.map(t => ({ ...t, items: [] })));
    setPool(items);
  }

  async function exportImage() {
    if (!exportRef.current) return;
    setExporting(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(exportRef.current, { cacheBust: true, backgroundColor: '#0f172a', pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'brainrot-tierlist.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    }
    setExporting(false);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div>
        {/* Exportable area */}
        <div ref={exportRef} className="bg-gray-950 p-4 rounded-2xl space-y-2 mb-4">
          {tiers.map(tier => (
            <TierRow
              key={tier.id}
              tier={tier}
              onRemoveTier={removeTier}
              onLabelChange={(id, label) => setTiers(prev => prev.map(t => t.id === id ? { ...t, label } : t))}
              onColorChange={(id, color) => setTiers(prev => prev.map(t => t.id === id ? { ...t, color } : t))}
            />
          ))}

          {/* Watermark */}
          <div className="text-right text-gray-600 text-xs pt-1">stealbrainrot.com</div>
        </div>

        {/* Pool */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4">
          <h3 className="text-gray-400 text-sm font-semibold mb-3">Item Pool — drag items to tiers</h3>
          <SortableContext items={pool.map(i => i.id)} strategy={horizontalListSortingStrategy}>
            <div className="flex flex-wrap gap-2">
              {pool.map(item => <SortableItem key={item.id} item={item} />)}
              {pool.length === 0 && <p className="text-gray-600 text-sm">All items placed in tiers</p>}
            </div>
          </SortableContext>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <button onClick={exportImage} disabled={exporting} className="flex-1 bg-purple-700 hover:bg-purple-600 disabled:opacity-60 text-white py-3 px-4 rounded-lg font-bold transition-colors">
            {exporting ? 'Exporting...' : '📸 Export as Image'}
          </button>
          <button onClick={addTier} className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-bold transition-colors">
            + Add Tier
          </button>
          <button onClick={resetAll} className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-bold transition-colors">
            Reset
          </button>
        </div>
      </div>

      <DragOverlay>
        {activeItem ? <ItemChip item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
