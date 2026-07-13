import { ExternalLink, Star } from 'lucide-react';
import { AffiliateLink } from '../lib/affiliateLinks';

const CATEGORY_COLORS: Record<string, string> = {
  'hosting': 'border-blue-500/20 hover:border-blue-500/40',
};

const CATEGORY_BG: Record<string, string> = {
  'hosting': 'bg-blue-500/10 text-blue-400',
};

const CATEGORY_LABEL: Record<string, string> = {
  'hosting': 'Hosting',
};

function trackClick(linkId: string) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'affiliate_click', { link_id: linkId });
  }
}

export default function ToolsCard({ tool }: { tool: AffiliateLink }) {
  const borderColor = CATEGORY_COLORS[tool.category] ?? 'border-white/10 hover:border-white/20';
  const badgeBg = CATEGORY_BG[tool.category] ?? 'bg-white/10 text-white/60';

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-[#111] overflow-hidden
                  transition-all duration-200 ${borderColor}`}
    >
      {tool.featured && (
        <div className="absolute top-3 right-3 z-10">
          <Star size={14} className="text-[#F5C518] fill-[#F5C518]" />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">{tool.icon}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm text-white/90 group-hover:text-[#F5C518] transition-colors duration-150">
              {tool.name}
            </h3>
            {tool.badge && (
              <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none ${badgeBg}`}>
                {tool.badge}
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-white/45 leading-relaxed flex-1">
          {tool.description}
        </p>

        <a
          href={tool.url}
          target="_blank"
          rel="nofollow sponsored noopener"
          onClick={() => trackClick(tool.id)}
          className="flex items-center justify-center gap-1.5 w-full text-xs font-semibold px-4 py-2.5 rounded-lg
                     bg-white/8 text-white/60 border border-white/10
                     hover:bg-[#F5C518] hover:text-black hover:border-transparent
                     transition-all duration-150"
        >
          <ExternalLink size={12} />
          Visit Site
        </a>
      </div>
    </div>
  );
}
