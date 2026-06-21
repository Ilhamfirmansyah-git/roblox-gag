// Affiliate banner for Robux top-up links.
// Replace href with your actual affiliate partner URL (see .env.example: PUBLIC_AFFILIATE_ROBUX_URL).
export function AffiliateBanner() {
  const affiliateUrl = import.meta.env.PUBLIC_AFFILIATE_ROBUX_URL || '#';
  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block w-full bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white text-center py-3 px-4 rounded-lg font-bold transition-all"
    >
      🎮 Top-up Robux — Best Rates (Affiliate)
    </a>
  );
}
