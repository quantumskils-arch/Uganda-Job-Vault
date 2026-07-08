export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-white/50 text-sm mb-8">Last updated: July 2026</p>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">What We Collect</h2>
        <ul className="space-y-2 text-white/50 text-sm">
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span><strong className="text-white">Email address</strong> — if you contact us or sign up for updates</li>
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span><strong className="text-white">Payment information</strong> — processed entirely by Selar (our payment provider). We never see or store your card number, mobile money PIN, or bank details.</li>
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span><strong className="text-white">Order details</strong> — which products you purchased, for order fulfillment</li>
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span><strong className="text-white">Usage data</strong> — anonymised page visits (via Vercel Analytics) to improve the site</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">How We Use It</h2>
        <ul className="space-y-2 text-white/50 text-sm">
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span>To deliver digital products you purchased</li>
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span>To respond to support requests</li>
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span>To improve our products and site experience</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Third Parties</h2>
        <p className="text-white/50 text-sm leading-relaxed">We use <strong className="text-white">Selar</strong> for payment processing. Your payment data goes directly to Selar — we never receive or store your financial details. See Selar's privacy policy for how they handle your data. We also use <strong className="text-white">Vercel</strong> for hosting and Vercel Analytics for anonymised site usage statistics.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Contact</h2>
        <p className="text-white/50 text-sm leading-relaxed">MARISEN PAGES (Lumendigital)<br />Kampala, Uganda<br /><a href="mailto:keys@opportunityradar.africa" className="text-[#25D366] underline">keys@opportunityradar.africa</a></p>
      </section>
      <a href="/" className="inline-block mt-8 text-white/40 hover:text-white text-sm transition-colors">{'\u2190'} Back to Uganda Job Vault</a>
    </div>
  );
}
