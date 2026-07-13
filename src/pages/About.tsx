export default function About() {
  return (
    <div className="min-h-screen bg-black text-white max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">About Uganda Job Vault</h1>

      <p className="text-white/50 text-sm leading-relaxed mb-6">
        Uganda Job Vault is a career preparation platform built specifically for Ugandan job seekers. We provide affordable, high-quality digital resources — past papers, CV templates, interview guides, aptitude test packs, and sector-specific study materials — designed to help you prepare for competitive government, NGO, and private-sector recruitment processes.
      </p>

      <p className="text-white/50 text-sm leading-relaxed mb-6">
        Every resource on this platform is created with the Uganda job market in mind. Our aptitude packs mirror real PSC, URA, and Bank of Uganda test formats. Our interview guides cover actual questions asked by real panels. Our CV templates follow the format Ugandan recruiters expect.
      </p>

      <p className="text-white/50 text-sm leading-relaxed mb-6">
        We believe career preparation shouldn't be expensive or hard to find. That's why all our products are priced for the Ugandan market — with payments via MTN MoMo and Airtel Money — and delivered as instant PDF downloads.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Part of a Wider Ecosystem</h2>
        <p className="text-white/50 text-sm leading-relaxed">
          Uganda Job Vault is part of the <strong className="text-white">Lumendigital</strong> ecosystem, alongside <a href="https://opportunityradar.africa" className="text-[#F5C518] underline">OpportunityRadar</a> — East Africa's opportunity platform delivering jobs, grants, and tender alerts via Telegram.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Company Details</h2>
        <div className="text-white/50 text-sm leading-relaxed space-y-1">
          <p>Trading name: Uganda Job Vault</p>
          <p>Registered entity: MARISEN PAGES (Lumendigital)</p>
          <p>Registered in: Uganda</p>
          <p>Email: <a href="mailto:keys@opportunityradar.africa" className="text-[#F5C518] underline">keys@opportunityradar.africa</a></p>
        </div>
      </section>

      <a href="/" className="inline-block mt-8 text-white/40 hover:text-white text-sm transition-colors">&larr; Back to Uganda Job Vault</a>
    </div>
  );
}
