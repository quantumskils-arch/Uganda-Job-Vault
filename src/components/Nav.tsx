import { Page } from '../App';
import { Calculator } from 'lucide-react';
import { BookOpen, FileText, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavProps {
  page: Page;
  navigate: (p: Page) => void;
}

export default function Nav({ page, navigate }: NavProps) {
  const [open, setOpen] = useState(false);

  const links: { label: string; page: Page; icon: JSX.Element }[] = [
    { label: 'Past Papers', page: 'papers', icon: <BookOpen size={15} /> },
    { label: 'CV Templates', page: 'cv-templates', icon: <FileText size={15} /> },
    { label: 'AI CV Generator', page: 'cv-generator', icon: <Zap size={15} /> },
    { label: 'PAYE Calculator', page: 'uganda-paye-calculator', icon: <Calculator size={15} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-[#F5C518] rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-sm">UJ</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Uganda<span className="text-[#F5C518]">Job</span>Vault
          </span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => navigate(l.page)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all ${
                page === l.page
                  ? 'bg-[#F5C518] text-black font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.icon}
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => window.open('https://selar.com/m/ugandaJobVault', '_blank')}
          className="hidden md:block bg-[#F5C518] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors"
        >
          Browse All →
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0A0A] px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => { navigate(l.page); setOpen(false); }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all text-left ${
                page === l.page
                  ? 'bg-[#F5C518] text-black font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.icon}
              {l.label}
            </button>
          ))}
          <button
            onClick={() => window.open('https://selar.com/m/ugandaJobVault', '_blank')}
            className="mt-2 bg-[#F5C518] text-black px-4 py-3 rounded-lg text-sm font-bold"
          >
            Browse All Products →
          </button>
        </div>
      )}
    </nav>
  );
}
