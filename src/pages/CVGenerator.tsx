import { useState } from 'react';
import { Zap, Copy, Check, ChevronDown } from 'lucide-react';

type Mode = 'ngo' | 'government' | 'banking' | 'general';

const MODES: { value: Mode; label: string; desc: string; emoji: string }[] = [
  { value: 'ngo', label: 'NGO / UN Optimised', desc: 'USAID, GIZ, World Bank language', emoji: '🌍' },
  { value: 'government', label: 'Government Application', desc: 'Public Service Commission, URA, UNRA', emoji: '🏛️' },
  { value: 'banking', label: 'Graduate Trainee', desc: 'Stanbic, DFCU, Equity, MTN Uganda', emoji: '🏦' },
  { value: 'general', label: 'General / Private Sector', desc: 'Any Uganda private company', emoji: '💼' },
];

export default function CVGenerator() {
  const [mode, setMode] = useState<Mode>('ngo');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModes, setShowModes] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Kampala, Uganda',
    education: '',
    experience: '',
    skills: '',
    objective: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const selectedMode = MODES.find((m) => m.value === mode)!;

  const generateCV = async () => {
    setLoading(true);
    setResult('');

    const prompt = `You are an expert Uganda career consultant specialising in ${selectedMode.label} applications.

Generate a complete, professional CV for this person using EXACTLY this format:

---
${form.name.toUpperCase()}
${form.location} | ${form.phone} | ${form.email}

PROFESSIONAL SUMMARY
[2-3 sentences. Use ${mode === 'ngo' ? 'development sector language — results-oriented, community impact, donor alignment' : mode === 'government' ? 'public service language — integrity, national development, constitutional mandate' : mode === 'banking' ? 'commercial language — revenue growth, client relationship, financial acumen' : 'professional Uganda private sector language'}]

EDUCATION
[Format education from their input as: Degree | Institution | Year]

WORK EXPERIENCE
[Format each role as:
Job Title | Organisation | Period
• Achievement 1 (quantify where possible)
• Achievement 2
• Achievement 3]

KEY SKILLS
[Bullet list of 8-10 skills relevant to ${selectedMode.label} roles in Uganda]

REFEREES
Available upon request
---

Person details:
Name: ${form.name}
Education: ${form.education}
Experience: ${form.experience}
Skills: ${form.skills}
Career objective: ${form.objective}

Make it sound authentically Ugandan and professionally excellent. Quantify achievements. Use power verbs. Keep it to one page.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.find((c: { type: string }) => c.type === 'text')?.text || '';
      setResult(text);
      setStep(3);
    } catch {
      setResult('Error generating CV. Please try again.');
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/20 rounded-full px-4 py-1.5 text-[#F5C518] text-sm mb-4">
          <Zap size={14} /> AI-Powered · Ugandanized
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
          AI CV <span className="text-[#F5C518]">Generator</span>
        </h1>
        <p className="text-white/50">
          Trained on Uganda's job market. Your CV in 60 seconds.
        </p>
      </div>

      {/* Mode selector */}
      <div className="mb-6">
        <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block">CV Mode</label>
        <div className="relative">
          <button
            onClick={() => setShowModes(!showModes)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-[#F5C518]/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{selectedMode.emoji}</span>
              <span>
                <div className="text-sm font-semibold text-left">{selectedMode.label}</div>
                <div className="text-xs text-white/40">{selectedMode.desc}</div>
              </span>
            </span>
            <ChevronDown size={16} className={`text-white/40 transition-transform ${showModes ? 'rotate-180' : ''}`} />
          </button>
          {showModes && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-white/10 rounded-xl overflow-hidden z-10">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  onClick={() => { setMode(m.value); setShowModes(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left ${mode === m.value ? 'bg-[#F5C518]/10' : ''}`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  <span>
                    <div className="text-sm font-semibold">{m.label}</div>
                    <div className="text-xs text-white/40">{m.desc}</div>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'name', label: 'Full Name', placeholder: 'Nakato Brenda' },
            { key: 'phone', label: 'Phone', placeholder: '+256 77 123 4567' },
            { key: 'email', label: 'Email', placeholder: 'your@email.com' },
            { key: 'location', label: 'Location', placeholder: 'Kampala, Uganda' },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-xs text-white/40 mb-1 block">{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={set(f.key as keyof typeof form)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-white/20 focus:outline-none focus:border-[#F5C518]/50 transition-colors"
              />
            </div>
          ))}
        </div>

        {[
          {
            key: 'education',
            label: 'Education',
            placeholder: 'e.g. Bachelor of Commerce, Makerere University, 2019\nDiploma in Business Administration, Uganda Management Institute, 2016',
            rows: 3,
          },
          {
            key: 'experience',
            label: 'Work Experience',
            placeholder: 'e.g. Accounts Assistant, MTN Uganda, 2020-2023 — managed petty cash, prepared reports...\nIntern, DFCU Bank, 2019 — customer service, loan applications...',
            rows: 4,
          },
          {
            key: 'skills',
            label: 'Skills',
            placeholder: 'e.g. QuickBooks, MS Excel, data analysis, report writing, team leadership...',
            rows: 2,
          },
          {
            key: 'objective',
            label: 'Career Objective (optional)',
            placeholder: 'What kind of role are you targeting? e.g. Finance Manager at an international NGO...',
            rows: 2,
          },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-xs text-white/40 mb-1 block">{f.label}</label>
            <textarea
              placeholder={f.placeholder}
              value={form[f.key as keyof typeof form]}
              onChange={set(f.key as keyof typeof form)}
              rows={f.rows}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-white/20 focus:outline-none focus:border-[#F5C518]/50 transition-colors resize-none"
            />
          </div>
        ))}

        <button
          onClick={generateCV}
          disabled={loading || !form.name || !form.experience || !form.education}
          className="w-full bg-[#F5C518] text-black py-4 rounded-xl font-black text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Generating your CV...
            </>
          ) : (
            <>
              <Zap size={18} /> Generate My CV
            </>
          )}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">Your Generated CV</h3>
            <button
              onClick={copy}
              className="flex items-center gap-1.5 text-sm text-[#F5C518] hover:text-yellow-400 transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy CV'}
            </button>
          </div>
          <pre className="bg-white/5 border border-white/10 rounded-xl p-5 text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed">
            {result}
          </pre>
          <p className="text-white/30 text-xs mt-3 text-center">
            Copy and paste into Word or Google Docs. Want a premium formatted version? →{' '}
            <a
              href="https://selar.com/m/Quantum_wisdom"
              target="_blank"
              rel="noreferrer"
              className="text-[#F5C518] hover:underline"
            >
              Get CV Templates
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
