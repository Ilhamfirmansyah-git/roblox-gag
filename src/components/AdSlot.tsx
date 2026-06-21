interface AdSlotProps {
  slot: string;
  className?: string;
  label?: string;
}

// Placeholder for Google AdSense / Ezoic ad units.
// Replace the inner content with actual ad code from your ad network.
// Set ADSENSE_PUBLISHER_ID and slot IDs in .env (see .env.example).
export function AdSlot({ slot, className = '', label = 'Advertisement' }: AdSlotProps) {
  return (
    <div className={`ad-slot flex items-center justify-center bg-gray-800 border border-gray-700 rounded text-gray-500 text-xs ${className}`} data-slot={slot}>
      {/* TODO: Replace this div content with AdSense <ins> tag */}
      <span>{label}</span>
    </div>
  );
}
