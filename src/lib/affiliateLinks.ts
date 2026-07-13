export type AffiliateCategory = 'hosting' | 'other';

export interface AffiliateLink {
  id: string;
  name: string;
  description: string;
  url: string;
  category: AffiliateCategory;
  icon: string;
  badge?: string;
  featured?: boolean;
}

export const TOOLS: AffiliateLink[] = [
  {
    id: 'hostinger',
    name: 'Hostinger',
    description: 'Fast, affordable web hosting to build your portfolio, personal site, or professional online presence.',
    url: 'https://www.hostinger.com?REFERRALCODE=DLCQUANTUDN9',
    category: 'hosting',
    icon: '🌐',
    badge: 'Hosting',
    featured: true,
  },
];
