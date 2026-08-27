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

export const products: Product[] = [
  { id: 'efm-1042', title: 'Nostalgia XI · Messi Edition', kind: 'Account', price: 1290, coins: 9730, gp: '11.96M', rating: 96, players: ['Lionel Messi', 'Neymar Jr', 'K. Mbappé'], edition: 'Epic Selection', accent: '#cb1246', featured: true, badge: 'Best seller', description: 'A carefully stacked account for classic number-10 football. Built for players who want a complete squad from day one.' },
  { id: 'efm-1088', title: 'Barcelona Icons · Match Pass', kind: 'Account', price: 990, coins: 9690, gp: '11.98M', rating: 94, players: ['L. Messi', 'Xavi', 'R. Lewandowski'], edition: 'Big Time', accent: '#a41446', featured: true, badge: 'New drop', description: 'A balanced Barça-inspired lineup with premium forwards, a deep bench and enough GP to shape your own style.' },
  { id: 'efm-1104', title: 'The Collector · 12 Epic Cards', kind: 'Account', price: 2250, coins: 12480, gp: '15.2M', rating: 98, players: ['C. Ronaldo', 'Zidane', 'Beckenbauer'], edition: 'Epic / Big Time', accent: '#172754', featured: true, badge: 'Rare', description: 'For the collector who wants a head start. Twelve high-rated cards and a strong GP reserve make this a complete premium build.' },
  { id: 'efm-0981', title: 'Kickoff Coins · 2,180', kind: 'Coins', price: 430, coins: 2180, gp: '—', rating: 0, players: [], edition: 'Currency pack', accent: '#0b8499', description: 'A clean coin top-up for your next pack opening. Delivered to your account after proof review.' },
  { id: 'efm-1003', title: 'Weekend GP Reserve · 8.5M', kind: 'GP', price: 590, coins: 0, gp: '8.5M', rating: 0, players: [], edition: 'Currency pack', accent: '#39447d', description: 'Enough GP to renew contracts, develop your squad and keep your weekend league rolling.' },
  { id: 'efm-1120', title: 'Defensive Wall · Van Dijk Build', kind: 'Account', price: 1480, coins: 8820, gp: '10.4M', rating: 95, players: ['Virgil van Dijk', 'Rúben Dias', 'M. Neuer'], edition: 'Highlight', accent: '#263f74', description: 'A composed, defense-first account for patient build-up and clean sheets. Strong CB pairing included.' },
  { id: 'efm-1147', title: 'Pack Opening · 5,700 Coins', kind: 'Coins', price: 980, coins: 5700, gp: '—', rating: 0, players: [], edition: 'Currency pack', accent: '#a81e52', badge: 'Popular', description: 'Five thousand seven hundred coins to spend on the players you actually want.' },
  { id: 'efm-1165', title: 'Manager Mode · 14.8M GP', kind: 'GP', price: 850, coins: 0, gp: '14.8M', rating: 0, players: [], edition: 'Currency pack', accent: '#1c556c', description: 'A sizable GP wallet for training, renewals and building a squad that plays like yours.' },
];

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