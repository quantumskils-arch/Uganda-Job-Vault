import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check, ExternalLink, Download, ArrowLeft, BookOpen, FileText, Users, Package } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const CATEGORY_STYLE: Record<string, { gradient: string; icon: React.ReactNode }> = {
  papers:    { gradient: 'from-amber-950 via-orange-950 to-amber-900',   icon: <BookOpen size={56} strokeWidth={1.2} className="text-amber-400/30" /> },
  interview: { gradient: 'from-blue-950 via-indigo-950 to-blue-900',     icon: <Users    size={56} strokeWidth={1.2} className="text-blue-400/30" /> },
  cv:        { gradient: 'from-emerald-950 via-teal-950 to-emerald-900', icon: <FileText size={56} strokeWidth={1.2} className="text-emerald-400/30" /> },
  bundle:    { gradient: 'from-purple-950 via-violet-950 to-purple-900', icon: <Package  size={56} strokeWidth={1.2} className="text-purple-400/30" /> },
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const [imgFailed, setImgFailed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-white/50 text-lg">Product not found.</p>
        <Link to="/" className="text-[#F5C518] hover:underline flex items-center gap-1.5 text-sm">
          <ArrowLeft size={14} /> Back to Uganda Job Vault
        </Link>
      </div>
    );
  }

  const style = CATEGORY_STYLE[product.category] ?? CATEGORY_STYLE.papers;
  const showPlaceholder = !product.coverImage || imgFailed;
  const absoluteImage = product.coverImage
    ? `${window.location.origin}${product.coverImage}`
    : '';
  const numericPrice = product.price === 'FREE'
    ? 0
    : Number(product.price.replace(/[^0-9]/g, ''));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: absoluteImage || undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'UGX',
      price: numericPrice,
      availability: 'https://schema.org/InStock',
      url: product.selarLink,
    },
  };

  return (
    <>
      <Helmet>
        <title>{product.title} | Uganda Job Vault</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        {absoluteImage && <meta property="og:image" content={absoluteImage} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0A] text-white">
        {/* Minimal top nav */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={15} />
              <span className="font-display tracking-wide">Uganda<span className="text-[#F5C518]">Job</span>Vault</span>
            </Link>
          </div>
        </header>

        <main className="pt-14">
          <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
            <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">

              {/* Cover */}
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shrink-0">
                {showPlaceholder ? (
                  <div className={`w-full h-full bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
                    {style.icon}
                  </div>
                ) : (
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    onError={() => setImgFailed(true)}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-5">
                {(product.badge || product.free) && (
                  <span className={`self-start text-xs font-bold px-3 py-1 rounded-full leading-none
                    ${product.free
                      ? 'bg-[#F5C518] text-black'
                      : 'bg-white/8 text-[#F5C518] border border-[#F5C518]/25'
                    }`}
                  >
                    {product.free ? 'FREE' : product.badge}
                  </span>
                )}

                <h1 className="font-display text-3xl md:text-4xl leading-tight tracking-wide">
                  {product.title}
                </h1>

                <p className="text-white/60 leading-relaxed">{product.description}</p>

                {product.whatsInside && product.whatsInside.length > 0 && (
                  <ul className="flex flex-col gap-2.5">
                    {product.whatsInside.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-white/70 leading-snug">
                        <Check size={13} className="text-[#F5C518] mt-[2px] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price + CTA */}
                <div className="flex items-end gap-4 pt-2">
                  <div>
                    <span className={`font-black text-2xl ${product.free ? 'text-[#F5C518]' : 'text-white'}`}>
                      {product.price}
                    </span>
                    {product.priceUSD && (
                      <span className="block text-white/30 text-xs mt-0.5">≈ {product.priceUSD}</span>
                    )}
                  </div>
                </div>

                <a
                  href={product.selarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all
                    ${product.free
                      ? 'bg-[#F5C518] text-black hover:bg-yellow-300'
                      : 'bg-[#F5C518] text-black hover:bg-yellow-300'
                    }`}
                >
                  {product.free ? <Download size={15} /> : <ExternalLink size={15} />}
                  {product.free ? 'Download Free' : 'Get This on Selar'}
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
