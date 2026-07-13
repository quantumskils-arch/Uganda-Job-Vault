import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const COOKIE_KEY = 'ugandajobvault_cookies_accepted';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-white/50 text-xs leading-relaxed">
          This site uses cookies for analytics and personalised ads. By continuing, you agree to our{' '}
          <a href="/privacy" className="text-[#F5C518] underline">Privacy Policy</a>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={accept}
            className="bg-[#F5C518] text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap"
          >
            Accept
          </button>
          <button
            onClick={accept}
            className="text-white/30 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
