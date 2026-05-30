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
    title: 'URA Aptitude Test — Past Questions & Answers (2026 Edition)',
    description: '200+ real-style URA aptitude questions with full answers. Covers Numerical Reasoning, Verbal Reasoning, Situational Judgement, Logical Reasoning + top tips from candidates who passed.',
    price: 'UGX 15,000',
    priceUSD: '$4',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'papers',
    badge: '🔥 Live Now',
  },
  {
    id: 'govt-interview',
    title: 'Uganda Government Jobs 2026 — Interview Preparation Guide',
    description: 'Ministry of Public Service recruitment open. 20 PSC interview questions with model answers, panel scoring, dress code, CV format, application letter structure, disqualification checklist.',
    price: 'UGX 15,000',
    priceUSD: '$4',
    selarLink: 'https://selar.com/31g77v364b',
    category: 'interview',
    badge: '🏛️ Hot Right Now',
  },
  {
    id: 'unra-interview',
    title: 'UNRA Interview Questions — Complete Guide',
    description: 'Every question UNRA uses in technical and management interviews. Model answers and insider tips from successful candidates.',
    price: 'UGX 12,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/31g77v364b',
    category: 'interview',
    badge: '🚧 Coming Soon',
  },
  {
    id: 'ngo-cv',
    title: 'Best NGO CV Format in Uganda — Premium Template',
    description: 'The exact CV format that wins jobs at USAID, GIZ, UN, World Bank projects. Donor-language glossary and ATS-optimised layout.',
    price: 'UGX 10,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'cv',
    badge: '🚧 Coming Soon',
  },
  {
    id: 'banking-pack',
    title: 'Stanbic / DFCU Graduate Trainee Pack',
    description: 'Past aptitude tests, interview questions and answer guides for Uganda top bank graduate trainee programmes.',
    price: 'UGX 18,000',
    priceUSD: '$5',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'papers',
    badge: '🏦 Coming Soon',
  },
  {
    id: 'free-checklist',
    title: 'FREE — Uganda Job Application Checklist',
    description: '7-point checklist used by successful applicants. Free download, share with friends.',
    price: 'FREE',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'cv',
    free: true,
  },
];

export const SELAR_STORE = 'https://selar.com/4l25fn1k5s';