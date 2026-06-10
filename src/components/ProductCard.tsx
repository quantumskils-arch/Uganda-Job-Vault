import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Download, Check, BookOpen, FileText, Users, Package } from 'lucide-react';
import { Product } from '../data/products';

const CATEGORY_STYLE: Record<string, { gradient: string; icon: React.ReactNode }> = {
  papers:    { gradient: 'from-amber-950 via-orange-950 to-amber-900',   icon: <BookOpen size={36} strokeWidth={1.5} className="text-amber-400/30" /> },
  interview: { gradient: 'from-blue-950 via-indigo-950 to-blue-900',     icon: <Users    size={36} strokeWidth={1.5} className="text-blue-400/30" /> },
  cv:        { gradient: 'from-emerald-950 via-teal-950 to-emerald-900', icon: <FileText size={36} strokeWidth={1.5} className="text-emerald-400/30" /> },
  bundle:    { gradient: 'from-purple-950 via-violet-950 to-purple-900', icon: <Package  size={36} strokeWidth={1.5} className="text-purple-400/30" /> },
};

export default function ProductCard({ product: p }: { product: Product }) {
  const [imgFailed, setImgFailed] = useState(false);
  const style = CATEGORY_STYLE[p.category] ?? CATEGORY_STYLE.papers;
  const showPlaceholder = !p.coverImage || imgFailed;

  return (
    <Link
      to={`/product/${p.id}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-[#111] overflow-hidden
                 hover:border-[#F5C518]/50 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(245,197,24,0.08)]
                 transition-all duration-200 cursor-pointer"
    >
      {/* ── Cover ── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden shrink-0">
        {showPlaceholder ? (
          <div className={`w-full h-full bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
            {style.icon}
          </div>
        ) : (
          <img
            src={p.coverImage}
            alt={p.title}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
          />
        )}

        {/* Gradient scrim so badge is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Badge */}
        {(p.badge || p.free) && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full leading-none
            ${p.free
              ? 'bg-[#F5C518] text-black'
              : 'bg-black/60 backdrop-blur-sm text-[#F5C518] border border-[#F5C518]/25'
            }`}
          >
            {p.free ? 'FREE' : p.badge}
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Title */}
        <h3 className="font-bold text-sm leading-snug text-white/90 group-hover:text-[#F5C518]
                       transition-colors duration-150 line-clamp-2">
          {p.title}
        </h3>

        {/* What's inside */}
        {p.whatsInside && p.whatsInside.length > 0 && (
          <ul className="flex flex-col gap-1.5 flex-1">
            {p.whatsInside.slice(0, 4).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/45 leading-snug">
                <Check size={10} className="text-[#F5C518] mt-[3px] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* ── Footer: price + CTA ── */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-white/[0.06]">
          <div className="leading-none">
            <span className={`font-black text-base ${p.free ? 'text-[#F5C518]' : 'text-white'}`}>
              {p.price}
            </span>
            {p.priceUSD && (
              <span className="block text-white/30 text-[11px] mt-0.5">≈ {p.priceUSD}</span>
            )}
          </div>

          <a
            href={p.selarLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                            transition-all duration-150
            ${p.free
              ? 'bg-[#F5C518] text-black group-hover:bg-yellow-300'
              : 'bg-white/8 text-white/60 border border-white/10 group-hover:bg-[#F5C518] group-hover:text-black group-hover:border-transparent'
            }`}
          >
            {p.free ? <Download size={11} /> : <ExternalLink size={11} />}
            {p.free ? 'Download' : 'Get This'}
          </a>
        </div>
      </div>
    </Link>
  );
}
