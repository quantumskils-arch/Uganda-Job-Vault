import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <p className="text-white/50 text-sm leading-relaxed mb-10">
        Have a question about a product, need help with your download, or want to suggest a resource we should add? We read every message.
      </p>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#F5C518]/10 rounded-xl flex items-center justify-center shrink-0">
            <Mail size={20} className="text-[#F5C518]" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm mb-1">Email</h2>
            <p className="text-white/50 text-sm mb-3">Best for product support, billing questions, and partnership enquiries. We respond within 24 hours on business days.</p>
            <a href="mailto:keys@opportunityradar.africa" className="text-[#F5C518] underline text-sm font-medium">
              keys@opportunityradar.africa
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#F5C518]/10 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-[#F5C518] font-bold text-lg">T</span>
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm mb-1">Telegram</h2>
            <p className="text-white/50 text-sm mb-3">For job alerts, opportunity searches, and quick questions. Message our bot directly.</p>
            <a href="https://t.me/OpportunityRadarAfricaBot" target="_blank" rel="noreferrer" className="text-[#F5C518] underline text-sm font-medium">
              @OpportunityRadarAfricaBot
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-white/30 text-xs leading-relaxed">
        <p>MARISEN PAGES (Lumendigital)</p>
        <p>Kampala, Uganda</p>
      </div>

      <a href="/" className="inline-block mt-8 text-white/40 hover:text-white text-sm transition-colors">&larr; Back to Uganda Job Vault</a>
    </div>
  );
}
