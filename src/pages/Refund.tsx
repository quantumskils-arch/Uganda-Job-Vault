export default function Refund() {
  return (
    <div className="min-h-screen bg-black text-white max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Refund &amp; Cancellation Policy</h1>
      <p className="text-white/50 text-sm mb-8">Last updated: July 2026</p>
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
        <p className="text-white/80 text-sm"><strong>In short:</strong> Digital products are non-refundable once delivered. Subscriptions can be cancelled anytime — refunds are issued only for charges made in error.</p>
      </div>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Digital Products</h2>
        <p className="text-white/50 text-sm leading-relaxed">All products sold on Uganda Job Vault — including past papers, CV templates, interview guides, and AI-generated CVs — are digital downloads or instant-access content.</p>
        <ul className="mt-3 space-y-2 text-white/50 text-sm">
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span>All sales are final once the product is downloaded, accessed, or delivered.</li>
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span>No refunds if you changed your mind, bought the wrong product, or did not find the content useful.</li>
          <li className="flex gap-2"><span className="text-[#F5C518]">—</span>If a product is defective (corrupted file, wrong file, or technical error), contact us within 7 days for a replacement or full refund.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">How to Request a Refund</h2>
        <p className="text-white/50 text-sm leading-relaxed">Email <a href="mailto:keys@opportunityradar.africa" className="text-[#25D366] underline">keys@opportunityradar.africa</a> with your order reference and a brief explanation. We respond within 3 business days. Refunds are processed to the original payment method within 7 business days of approval.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Contact</h2>
        <p className="text-white/50 text-sm leading-relaxed">MARISEN PAGES (Lumendigital)<br />Kampala, Uganda<br /><a href="mailto:keys@opportunityradar.africa" className="text-[#25D366] underline">keys@opportunityradar.africa</a></p>
      </section>
      <a href="/" className="inline-block mt-8 text-white/40 hover:text-white text-sm transition-colors">{'\u2190'} Back to Uganda Job Vault</a>
    </div>
  );
}
