import type { Product as ApiProduct } from '@workspace/api-client-react';

export type Product = {
  id: string;
  title: string;
  kind: 'Account' | 'Coins' | 'GP';
  price: number;
  coins: number;
  gp: string;
  rating: number;
  players: string[];
  edition: string;
  accent: string;
  featured?: boolean;
  badge?: string;
  description: string;
};

export function formatGp(value: number): string {
  if (!value) return '—';
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}M`;
  }
  return value.toLocaleString();
}

export function toMarketplaceProduct(product: ApiProduct): Product {
  const presentation = {
    Account: { accent: '#263f74', edition: 'Epic Selection', rating: Math.max(90, Math.min(99, Math.round(product.coins / 130))) },
    Coins: { accent: '#0b8499', edition: 'Currency pack', rating: 0 },
    GP: { accent: '#39447d', edition: 'Currency pack', rating: 0 },
  }[product.category] ?? { accent: '#17213c', edition: product.category, rating: 0 };

  return {
    id: product.id,
    title: product.title,
    kind: product.category as Product['kind'],
    price: product.price,
    coins: product.coins,
    gp: formatGp(product.gp),
    rating: presentation.rating,
    players: [],
    edition: presentation.edition,
    accent: presentation.accent,
    featured: product.featured,
    badge: product.featured ? 'Featured' : undefined,
    description: product.description,
  };
}

export const offers = [
  { id: 'offer-1', label: 'FIRST KICK', title: '10% off your first order', detail: 'Use code FIRSTKICK at checkout. Applies to account listings and currency packs.', code: 'FIRSTKICK', tint: '#b71649' },
  { id: 'offer-2', label: 'SQUAD BUILDER', title: 'Bundle any 2 currency packs', detail: 'Save 150 EGP when you combine a Coins and GP pack.', code: 'BUILD150', tint: '#086f89' },
  { id: 'offer-3', label: 'CAPTAIN’S PICK', title: 'Free delivery on Rare accounts', detail: 'Selected Collector and Epic listings include priority handover at no extra cost.', code: 'PRIORITY', tint: '#263665' },
];

export const faqs = [
  ['How fast is delivery?', 'Most orders are handed over within 15–30 minutes after payment proof is approved.'],
  ['How do I receive my account?', 'A specialist sends the account credentials and a short handover guide through your order status page.'],
  ['Is my payment secure?', 'We only use the proof you submit to verify your mock order. No payment is processed in this demo.'],
  ['Can I request a specific player?', 'Send your squad wish list to support and we will point you to the closest available listing.'],
];