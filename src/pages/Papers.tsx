import { useState } from 'react';
import { PRODUCTS, SELAR_STORE } from '../data/products';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Papers', 'Interview', 'CV', 'Bundle'];

export default function Papers() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      cat === 'All' ||
      p.category === cat.toLowerCase() ||
      (cat === 'CV' && p.category === 'cv');
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">
      <div className="mb-10">
        <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
          Past Papers & <span className="text-[#F5C518]">Career Guides</span>
        </h1>
        <p className="text-white/50 max-w-xl">
          Real aptitude tests, interview guides, and CV templates — all built for Ugandan job seekers.
          Pay with MTN MoMo or Airtel Money.
        </p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search URA, UNRA, NGO, banking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F5C518]/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                cat === c
                  ? 'bg-[#F5C518] text-black'
                  : 'border border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/30">
          No products found for "{search}"
        </div>
      )}

      <div className="text-center mt-12">
        <p className="text-white/40 text-sm mb-3">Looking for something else?</p>
        <button
          onClick={() => window.open(SELAR_STORE, '_blank')}
          className="text-[#F5C518] font-semibold text-sm hover:underline"
        >
          Browse the full store on Selar →
        </button>
      </div>
    </div>
  );
}
