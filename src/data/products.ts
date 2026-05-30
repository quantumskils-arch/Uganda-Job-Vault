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
    description: '200+ URA aptitude questions with full answers. Numerical, Verbal, Situational Judgement, Logical Reasoning.',
    price: 'UGX 15,000',
    priceUSD: '$4',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'papers',
    badge: 'Live Now',
  },
  {
    id: 'govt-interview',
    title: 'Uganda Government Jobs 2026 — Interview Preparation Guide',
    description: '20 PSC interview questions with model answers, panel scoring, dress code, CV format, disqualification checklist.',
    price: 'UGX 15,000',
    priceUSD: '$4',
    selarLink: 'https://selar.com/31g77v364b',
    category: 'interview',
    badge: 'Hot Right Now',
  },
  {
    id: 'unra-interview',
    title: 'UNRA Interview Questions — Complete Guide (2026)',
    description: '30 UNRA interview questions with model answers. Technical, procurement, management roles covered.',
    price: 'UGX 12,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/31g77v364b',
    category: 'interview',
    badge: 'New',
  },
  {
    id: 'ngo-cv',
    title: 'Best NGO CV Format in Uganda — Premium Template',
    description: 'CV format that wins jobs at USAID, GIZ, UN, World Bank. Donor-language glossary included.',
    price: 'UGX 10,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'cv',
    badge: 'Coming Soon',
  },
  {
    id: 'free-checklist',
    title: 'FREE — Uganda Job Application Checklist',
    description: '7-point checklist used by successful applicants. Free download.',
    price: 'FREE',
    selarLink: 'https://selar.com/4l25fn1k5s',
    category: 'cv',
    free: true,
  },
];

export const SELAR_STORE = 'https://selar.com/4l25fn1k5s';
