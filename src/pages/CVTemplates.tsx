import { PRODUCTS, SELAR_STORE } from '../data/products';
import { ExternalLink, Download } from 'lucide-react';

export default function CVTemplates() {
  const cvProducts = PRODUCTS.filter((p) => p.category === 'cv' || p.category === 'bundle');

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">
      <div className="mb-10">
        <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
          CV & Cover Letter <span className="text-[#F5C518]">Templates</span>
        </h1>
        <p className="text-white/50 max-w-xl">
          Professionally written for Uganda's job market. NGO-language, government formats, and banking CVs.
          Pay with MTN MoMo. Instant download.
        </p>
      </div>

      {/* Why this works */}
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {[
          { title: 'Ugandanized Language', desc: 'Written using the exact phrasing Uganda HR managers respond to — not generic Western templates.' },
          { title: 'ATS Optimised', desc: 'Passes automated CV screening systems used by NGOs and large corporates.' },
          { title: 'Instant Download', desc: 'Pay via MTN MoMo or Airtel Money. File arrives instantly. Edit in Word or Google Docs.' },
        ].map((item) => (
          <div key={item.title} className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
            <div className="w-2 h-2 bg-[#F5C518] rounded-full mb-3" />
            <h3 className="font-bold text-sm mb-1">{item.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cvProducts.map((p) => (
          <div
            key={p.id}
            className={`border rounded-2xl p-5 flex flex-col gap-3 transition-colors ${
              p.free
                ? 'border-[#F5C518]/40 bg-[#F5C518]/5'
                : p.category === 'bundle'
                ? 'border-[#F5C518]/20 bg-[#F5C518]/[0.03]'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            }`}
          >
            {p.badge && (
              <span className="text-xs font-bold text-[#F5C518] bg-[#F5C518]/10 px-3 py-1 rounded-full w-fit">
                {p.badge}
              </span>
            )}
            {p.free && (
              <span className="text-xs font-bold text-black bg-[#F5C518] px-3 py-1 rounded-full w-fit">
                FREE
              </span>
            )}
            <h3 className="font-bold text-sm leading-snug">{p.title}</h3>
            <p className="text-white/50 text-xs leading-relaxed flex-1">{p.description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div>
                <div className={`font-black text-lg ${p.free ? 'text-[#F5C518]' : 'text-white'}`}>
                  {p.price}
                </div>
                {p.priceUSD && <div className="text-white/30 text-xs">≈ {p.priceUSD}</div>}
              </div>
              <button
                onClick={() => window.open(p.selarLink, '_blank')}
                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors ${
                  p.free
                    ? 'bg-[#F5C518] text-black hover:bg-yellow-400'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {p.free ? <Download size={14} /> : <ExternalLink size={14} />}
                {p.free ? 'Free Download' : 'Get This'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 border-t border-white/5 pt-10">
        <p className="text-white/40 text-sm mb-4">See all templates including aptitude papers and interview guides</p>
        <button
          onClick={() => window.open(SELAR_STORE, '_blank')}
          className="bg-[#F5C518] text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors"
        >
          Browse Full Store on Selar →
        </button>
      </div>
    </div>
  );
}
