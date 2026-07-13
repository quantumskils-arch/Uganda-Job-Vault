import { Page } from '../App';

interface FooterProps {
  navigate: (p: Page) => void;
}

const JOB_VAULT_STORE = 'https://selar.com/m/ugandaJobVault';

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="border-t border-white/5 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#F5C518] rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-xs">UJ</span>
              </div>
              <span className="font-display font-bold">UgandaJobVault</span>
            </div>
            <p className="text-white/30 text-sm max-w-xs leading-relaxed">
              Uganda's career prep platform. Real papers. Real CVs. Real jobs.
            </p>
            <p className="text-white/20 text-xs mt-3">
              Payments via MTN MoMo & Airtel Money · Powered by Selar
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <div className="text-white/40 text-xs uppercase tracking-widest mb-3">Products</div>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('papers')} className="text-white/60 hover:text-white transition-colors">Past Papers</button></li>
                <li><button onClick={() => navigate('cv-templates')} className="text-white/60 hover:text-white transition-colors">CV Templates</button></li>
                <li><button onClick={() => navigate('cv-generator')} className="text-white/60 hover:text-white transition-colors">AI CV Generator</button></li>
                <li><button onClick={() => navigate('tools')} className="text-white/60 hover:text-white transition-colors">Tools & Resources</button></li>
                <li><button onClick={() => navigate('blog')} className="text-white/60 hover:text-white transition-colors">Blog</button></li>
                <li><a href={JOB_VAULT_STORE} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">Full Store</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white/40 text-xs uppercase tracking-widest mb-3">Popular</div>
              <ul className="space-y-2 text-sm">
                <li><a href="https://selar.com/m/ugandaJobVault" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">URA Aptitude Test</a></li>
                <li><a href="https://selar.com/872b89172a" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">UNRA Interview Guide</a></li>
                <li><a href="https://selar.com/9h31ut8775" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">NGO CV Format</a></li>
                <li><a href="https://selar.com/31g77v364b" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">Govt Interview Prep</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-white/20 text-xs">
          <span>&copy; 2026 UgandaJobVault &middot; Kampala, Uganda</span>
          <span className="flex flex-wrap items-center gap-x-2">
            <a href="/about" className="text-white/40 hover:text-white/60 transition-colors">About</a>
            <span className="text-white/20">·</span>
            <a href="/contact" className="text-white/40 hover:text-white/60 transition-colors">Contact</a>
            <span className="text-white/20">·</span>
            <a href="/refund" className="text-white/40 hover:text-white/60 transition-colors">Refund Policy</a>
            <span className="text-white/20">·</span>
            <a href="/privacy" className="text-white/40 hover:text-white/60 transition-colors">Privacy Policy</a>
            <span className="text-white/20">·</span>
            <a href="/terms" className="text-white/40 hover:text-white/60 transition-colors">Terms of Service</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
