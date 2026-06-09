import { Page } from '../App';
import { ArrowRight, Download, Users, Star, BookOpen, Zap, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { PRODUCTS, SELAR_STORE } from '../data/products';

interface LandingProps {
  navigate: (p: Page) => void;
}

export default function Landing({ navigate }: LandingProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      window.open('https://selar.com/m/ugandaJobVault', '_blank');
    }
  };

  const featuredProducts = PRODUCTS.filter(p => p.badge && !p.free).slice(0, 3);

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#F5C518 1px, transparent 1px), linear-gradient(90deg, #F5C518 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F5C518]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 border border-[#F5C518]/30 bg-[#F5C518]/5 rounded-full px-4 py-1.5 text-sm text-[#F5C518] mb-8">
            <span className="w-2 h-2 bg-[#F5C518] rounded-full animate-pulse" />
            Uganda's #1 Career Prep Platform
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.95] tracking-tight mb-6">
            Land Your Next
            <br />
            <span className="text-[#F5C518]">Uganda Job</span>
            <br />
            Faster.
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Real past papers. NGO-optimised CVs. AI-generated cover letters.
            <br className="hidden md:block" />
            Everything Ugandan job seekers need — in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <button
              onClick={() => navigate('papers')}
              className="bg-[#F5C518] text-black px-8 py-4 rounded-xl font-bold text-base hover:bg-yellow-400 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Browse Past Papers <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('cv-generator')}
              className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <Zap size={18} className="text-[#F5C518]" /> Try AI CV Generator
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { val: '2,400+', label: 'Job Seekers Helped' },
              { val: '50+', label: 'Past Paper Sets' },
              { val: '4.9★', label: 'Average Rating' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-[#F5C518]">{s.val}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* FREE LEAD MAGNET */}
      <section className="bg-[#F5C518] py-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-black/60 text-sm font-bold uppercase tracking-widest mb-2">Free Download</div>
            <h2 className="font-display font-black text-2xl md:text-3xl text-black mb-2">
              Uganda Job Application Checklist
            </h2>
            <p className="text-black/70 text-sm leading-relaxed">
              The 7-point checklist used by candidates who actually get called back.
              NGO, government, and private sector editions included.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            {!submitted ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-xl bg-black/10 placeholder-black/40 text-black border border-black/20 focus:outline-none focus:border-black/50 text-sm"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black/80 transition-colors flex items-center gap-2 justify-center whitespace-nowrap"
                >
                  <Download size={16} /> Get Free PDF
                </button>
              </form>
            ) : (
              <div className="bg-black text-white px-8 py-4 rounded-xl font-bold text-center">
                ✓ Check your email!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-4">
          The Smart Funnel to Your Dream Job
        </h2>
        <p className="text-white/40 text-center mb-14 max-w-xl mx-auto">
          We've reverse-engineered what Ugandan employers actually want. Follow the steps.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              icon: <BookOpen size={24} />,
              title: 'Practice with Real Papers',
              desc: 'URA, UNRA, Public Service Commission — download actual past aptitude tests and ace them.',
              cta: 'Browse Papers',
              page: 'papers' as Page,
            },
            {
              step: '02',
              icon: <FileText size={24} />,
              title: 'Perfect Your Application',
              desc: 'NGO-optimised CVs, cover letter templates, and interview prep guides written for Uganda.',
              cta: 'Get Templates',
              page: 'cv-templates' as Page,
            },
            {
              step: '03',
              icon: <Zap size={24} />,
              title: 'Generate with AI',
              desc: 'Our AI knows Ugandan HR language. Input your details, get a professional CV in 60 seconds.',
              cta: 'Try AI CV',
              page: 'cv-generator' as Page,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="absolute -top-3 -left-3 bg-[#F5C518] text-black w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black">
                {item.step}
              </div>
              <div className="text-[#F5C518] mb-4">{item.icon}</div>
              <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{item.desc}</p>
              <button
                onClick={() => navigate(item.page)}
                className="text-[#F5C518] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                {item.cta} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display font-black text-3xl md:text-4xl">
              Most Popular <span className="text-[#F5C518]">Products</span>
            </h2>
            <button
              onClick={() => window.open(SELAR_STORE, '_blank')}
              className="text-[#F5C518] text-sm font-semibold hidden md:flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="border border-white/10 rounded-2xl p-5 bg-white/[0.02] flex flex-col gap-3 hover:border-[#F5C518]/30 transition-colors"
              >
                {p.badge && (
                  <span className="text-xs font-bold text-[#F5C518] bg-[#F5C518]/10 px-3 py-1 rounded-full w-fit">
                    {p.badge}
                  </span>
                )}
                <h3 className="font-bold text-base leading-snug">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{p.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="font-black text-lg text-[#F5C518]">{p.price}</div>
                    {p.priceUSD && <div className="text-white/30 text-xs">≈ {p.priceUSD}</div>}
                  </div>
                  <button
                    onClick={() => window.open(p.selarLink, '_blank')}
                    className="bg-[#F5C518] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => window.open(SELAR_STORE, '_blank')}
              className="border border-white/20 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              View All Products on Selar →
            </button>
          </div>
        </div>
      </section>

      {/* EARLY ACCESS SOCIAL PROOF */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/30 text-[#F5C518] text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
          <Star size={12} className="fill-[#F5C518]" /> Early Access — Limited Offer
        </div>
        <h2 className="font-display font-black text-3xl md:text-4xl mb-6">
          Be Among the First.<br />
          <span className="text-[#F5C518]">Get 50% Off & Share Your Story.</span>
        </h2>
        <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Uganda Job Vault just launched. Early buyers get 50% off all products — and when you land that job,
          we'll feature your success story right here. Real results. Real Ugandans.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: '🎯',
              title: 'Targeted Content',
              desc: 'Every guide is built specifically for URA, PSC, UNRA, Stanbic, KCCA — not generic advice.',
            },
            {
              icon: '⚡',
              title: 'Instant Download',
              desc: 'Pay with MTN MoMo or Airtel Money and get your files immediately. No waiting, no account needed.',
            },
            {
              icon: '🇺🇬',
              title: 'Built for Uganda',
              desc: 'Created by someone who studied every past paper so you don\'t have to. Local context, real results.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] text-left"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <div className="font-bold text-sm mb-2">{card.title}</div>
              <div className="text-white/50 text-sm leading-relaxed">{card.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-sm">
          ✓ Secure checkout via Selar &nbsp;·&nbsp; ✓ Instant delivery &nbsp;·&nbsp; ✓ Used by job seekers across Uganda
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">
            Your next job starts here.
          </h2>
          <p className="text-white/40 mb-8">
            Pay with MTN MoMo or Airtel Money. Instant download. No account needed.
          </p>
          <button
            onClick={() => window.open(SELAR_STORE, '_blank')}
            className="bg-[#F5C518] text-black px-10 py-4 rounded-xl font-black text-base hover:bg-yellow-400 transition-all hover:scale-105"
          >
            Browse All Products →
          </button>
        </div>
      </section>
    </div>
  );
}
