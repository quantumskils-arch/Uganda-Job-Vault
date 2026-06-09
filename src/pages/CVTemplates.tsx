import { PRODUCTS, SELAR_STORE } from '../data/products';
import ProductCard from '../components/ProductCard';

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
          <ProductCard key={p.id} product={p} />
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
