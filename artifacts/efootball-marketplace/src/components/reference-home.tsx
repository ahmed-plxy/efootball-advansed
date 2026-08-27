import { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { toast } from 'sonner';

type ReferenceListing = {
  id: string;
  coins: string;
  gp: string;
  image: string;
};

const listings: ReferenceListing[] = [
  {
    id: 'EFM-1042',
    coins: '9,730',
    gp: '11.96M',
    image: '/product-cards/featured-1.jpg',
  },
  {
    id: 'EFM-1088',
    coins: '9,690',
    gp: '11.98M',
    image: '/product-cards/featured-2.jpg',
  },
  {
    id: 'EFM-1104',
    coins: '9,615',
    gp: '12.04M',
    image: '/product-cards/featured-3.jpg',
  },
];

function CurrencyIcon({ type }: { type: 'coin' | 'gp' }) {
  return (
    <span className={`reference-currency reference-currency-${type}`} aria-hidden="true">
      {type === 'coin' ? 'e' : 'G'}
    </span>
  );
}

function ReferenceListingCard({ listing }: { listing: ReferenceListing }) {
  const [copied, setCopied] = useState(false);

  const copyId = async () => {
    try {
      await navigator.clipboard?.writeText(listing.id);
    } catch {
      // Clipboard permissions are unavailable in some preview browsers.
    }
    setCopied(true);
    toast.success('ID copied');
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article className="reference-listing">
      <div className="reference-listing-meta">
        <div className="reference-value reference-value-coins">
          <CurrencyIcon type="coin" />
          <span>{listing.coins}</span>
        </div>
        <div className="reference-value reference-value-gp">
          <CurrencyIcon type="gp" />
          <span>{listing.gp}</span>
        </div>
      </div>

      <div className="reference-listing-image">
        <img src={listing.image} alt="eFootball player card" />
      </div>

      <div className="reference-listing-action">
        <button type="button" onClick={copyId} className="reference-copy-button">
          {copied ? <Check size={21} strokeWidth={3} /> : null}
          {copied ? 'Copied' : 'Copy ID'}
        </button>
      </div>
    </article>
  );
}

export function ReferenceHome() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="reference-page">
      <header className="reference-header">
        <h1>efootball</h1>
      </header>

      <main className="reference-listings">
        {listings.map((listing) => (
          <ReferenceListingCard key={listing.id} listing={listing} />
        ))}
      </main>

      <div className={`reference-search ${searchOpen ? 'is-open' : ''}`}>
        {searchOpen ? (
          <input autoFocus aria-label="Search listings" placeholder="Search" />
        ) : null}
        <button
          type="button"
          aria-label={searchOpen ? 'Close search' : 'Search listings'}
          onClick={() => setSearchOpen((open) => !open)}
          className="reference-search-button"
        >
          <Search size={29} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}