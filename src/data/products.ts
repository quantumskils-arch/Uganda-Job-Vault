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
    title: 'URA Aptitude Test — Questions & Answers PDF',
    description: '200+ real past questions with detailed answers. Covers numerical reasoning, verbal ability, and situational judgement used by Uganda Revenue Authority.',
    price: 'UGX 15,000',
    priceUSD: '$4',
    selarLink: 'https://selar.com/m/Quantum_wisdom',
    category: 'papers',
    badge: '🔥 Best Seller',
  },
  {
    id: 'unra-interview',
    title: 'UNRA Interview Questions — Complete Guide',
    description: 'Every question category UNRA uses in technical and management interviews. Includes model answers and insider tips from successful candidates.',
    price: 'UGX 12,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/m/Quantum_wisdom',
    category: 'interview',
  },
  {
    id: 'ngo-cv',
    title: 'Best NGO CV Format in Uganda — Premium Template',
    description: 'The exact CV format that wins jobs at USAID, GIZ, UN, World Bank projects. Includes donor-language glossary and ATS-optimised layout.',
    price: 'UGX 10,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/m/Quantum_wisdom',
    category: 'cv',
    badge: '⭐ Top Rated',
  },
  {
    id: 'govt-interview',
    title: 'How to Pass Government Interviews in Uganda',
    description: 'Public Service Commission, URA, UNRA, KCCA interview secrets. Dress code, panel dynamics, common traps, and winning answer frameworks.',
    price: 'UGX 12,000',
    priceUSD: '$3',
    selarLink: 'https://selar.com/m/Quantum_wisdom',
    category: 'interview',
  },
  {
    id: 'ngo-jobs',
    title: 'Latest NGO Jobs in Uganda — Weekly Alert PDF',
    description: 'Curated list of active NGO, UN and development sector vacancies updated weekly. Includes application tips for each organisation.',
    price: 'UGX 5,000',
    priceUSD: '$1.5',
    selarLink: 'https://selar.com/m/Quantum_wisdom',
    category: 'papers',
  },
  {
    id: 'cover-letter',
    title: 'Sample Cover Letters for Uganda Jobs — 10 Templates',
    description: '10 professionally written cover letters for NGO, government, bank, and private sector applications. Edit and use immediately.',
    price: 'UGX 8,000',
    priceUSD: '$2',
    selarLink: 'https://selar.com/m/Quantum_wisdom',
    category: 'cv',
  },
  {
    id: 'stanbic-trainee',
    title: 'Stanbic / DFCU Graduate Trainee Pack',
    description: 'Application forms, past aptitude tests, interview questions and answer guides for Uganda\'s top bank graduate trainee programmes.',
    price: 'UGX 18,000',
    priceUSD: '$5',
    selarLink: 'https://selar.com/m/Quantum_wisdom',
    category: 'papers',
    badge: '🏦 Banking',
  },
  {
    id: 'civil-service',
    title: 'Uganda Civil Service Prep — Complete Bundle',
    description: 'Everything you need for Public Service Commission exams. Past papers, marking guides, essay frameworks, and interview prep in one package.',
    price: 'UGX 25,000',
    priceUSD: '$7',
    selarLink: 'https://selar.com/m/Quantum_wisdom',
    category: 'bundle',
    badge: '💼 Bundle Deal',
  },
  {
    id: 'free-cv-guide',
    title: 'FREE — Uganda Job Application Checklist',
    description: '7-point checklist used by successful applicants. Download free, no email required.',
    price: 'FREE',
    selarLink: 'https://selar.com/m/Quantum_wisdom',
    category: 'cv',
    free: true,
  },
];

export const SELAR_STORE = 'https://selar.com/m/Quantum_wisdom';
