export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  priceUSD?: string;
  selarLink: string;
  category: 'papers' | 'cv' | 'interview' | 'bundle';
  badge?: string;
  free?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ura-aptitude',
    title: 'URA Aptitude Test — Past Questions & Answers (2026)',
    description: '200+ real-style URA aptitude questions with full answers. Numerical Reasoning, Verbal Reasoning, Situational Judgement, Logical Reasoning + tips from candidates who passed.',
    price: 'UGX 15,000',
    priceUSD: '$4',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'papers',
    badge: '🔥 Best Seller',
  },
  {
    id: 'govt-interview',
    title: 'Uganda Government Jobs 2026 — Interview Preparation Guide',
    description: 'Ministry of Public Service recruitment is open. 20 PSC interview questions with model answers, panel scoring breakdown, dress code, CV format, disqualification checklist.',
    price: 'UGX 15,000',
    priceUSD: '$4',
    selarLink: 'https://selar.com/31g77v364b',
    category: 'interview',
    badge: '🏛️ Hot Right Now',
  },
  {
    id: 'unra-interview',
    title: 'UNRA Interview Questions — Complete Guide (2026)',
    description: '30 UNRA interview questions with model answers. Technical questions for Engineers and Procurement. UNRA structure, current projects, panel scoring, full day-of checklist.',
    price: 'UGX 12,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/872b89172a',
    category: 'interview',
    badge: '🚧 New',
  },
  {
    id: 'kcca-interview',
    title: 'KCCA Interview Questions — Complete Guide (2026)',
    description: '35 real KCCA interview questions with model answers. All departments covered — Engineering, Revenue, Health, Finance. KCCA structure, Kampala city challenges, panel scoring criteria.',
    price: 'UGX 12,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/0162121v98',
    category: 'interview',
    badge: '🏙️ New',
  },
  {
    id: 'ngo-cv',
    title: 'NGO CV Template Uganda — Premium Guide (USAID · UN · World Bank)',
    description: 'The exact CV format that wins NGO jobs in Uganda. Full editable template, 25-term donor language glossary, ATS optimisation guide, before/after examples, and cover letter template.',
    price: 'UGX 10,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/9h31ut8775',
    category: 'cv',
    badge: '⭐ Top Rated',
  },
  {
    id: 'cover-letter',
    title: 'Sample Cover Letters for Uganda Jobs — 10 Templates',
    description: '10 professionally written cover letters for NGO, government, bank, and private sector applications in Uganda. Edit and use immediately.',
    price: 'UGX 8,000',
    priceUSD: '$2',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'cv',
    badge: '🚧 Coming Soon',
  },
  {
    id: 'banking-pack',
    title: 'Stanbic / DFCU Graduate Trainee Pack',
    description: 'Past aptitude tests, interview questions and answer guides for Uganda top bank graduate trainee programmes. Stanbic, DFCU, Equity, MTN.',
    price: 'UGX 18,000',
    priceUSD: '$5',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'papers',
    badge: '🏦 Coming Soon',
  },
  {
    id: 'free-checklist',
    title: 'FREE — Uganda Job Application Checklist (Instant Download)',
    description: '7-point checklist used by successful Uganda job applicants. Covers application letter, CV, documents, interview prep, and follow-up. Free — no payment needed.',
    price: 'FREE',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'cv',
    free: true,
  },
];

export const SELAR_STORE = 'https://selar.com/m/Quantum_wisdom?store=Uganda+Job+Vault';
export const JOB_VAULT_STORE = 'https://selar.com/4l25fn1k5s';
