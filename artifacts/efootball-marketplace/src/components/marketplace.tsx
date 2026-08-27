import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Check, ChevronRight, Copy, Heart, Menu, Package, Search, ShieldCheck, ShoppingBag, Sparkles, UserRound, X } from 'lucide-react';
import { toast } from 'sonner';
import { type Product } from '@/data';

type MarketContextValue = { cartCount: number; addToCart: (product: Product) => void; clearCart: () => void; };
const MarketContext = createContext<MarketContextValue | null>(null);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const value = useMemo(() => ({
    cartCount,
    addToCart: (product: Product) => { setCartCount((n) => n + 1); toast.success('Added to your order', { description: product.title }); },
    clearCart: () => setCartCount(0),
  }), [cartCount]);
  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}
export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) throw new Error('useMarket must be used inside MarketProvider');
  return context;
}

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" className="flex items-center gap-2.5" data-testid="link-logo">
    <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-[#b71649] text-white shadow-lg shadow-[#b71649]/20">
      <span className="display text-2xl font-bold italic">e</span><span className="absolute bottom-1 h-0.5 w-5 bg-[#6de8f5]" />
    </span>
    <span className="leading-none"><span className={`block text-[15px] font-bold tracking-tight ${inverse ? 'text-white' : 'text-[#1b2744]'}`}>eFootball</span><span className={`mt-1 block text-[9px] font-bold uppercase tracking-[.22em] ${inverse ? 'text-[#9aaac2]' : 'text-[#8390a7]'}`}>market</span></span>
  </Link>;
}

export function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useMarket();
  const links = [['/', 'Discover'], ['/products', 'Marketplace'], ['/offers', 'Offers'], ['/support', 'Support']];
  return <div className="app-shell noise">
    <div className="bg-[#17213c] py-2 text-center text-[10px] font-bold uppercase tracking-[.18em] text-[#b8c8e1]">Verified handovers · Mock marketplace experience · Built for eFootball players</div>
    <header className="sticky top-0 z-40 border-b border-[#dfe5ee] bg-[#f5f7fa]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([href, label]) => <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${location === href ? 'bg-[#e9f8fa] text-[#067b91]' : 'text-[#647087] hover:bg-white hover:text-[#17213c]'}`}>{label}{label === 'Offers' && <span className="ml-2 rounded-full bg-[#b71649] px-1.5 py-0.5 text-[9px] text-white">3</span>}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/account" className="hidden rounded-full p-2.5 text-[#637087] transition hover:bg-white hover:text-[#17213c] sm:block" data-testid="link-account"><UserRound size={19} /></Link>
          <Link href="/checkout" className="relative rounded-full bg-[#17213c] p-3 text-white transition hover:-translate-y-0.5 hover:bg-[#26365c]" data-testid="link-cart"><ShoppingBag size={18} />{cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-[#f5f7fa] bg-[#b71649] px-1 text-[10px] font-bold">{cartCount}</span>}</Link>
          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-full p-2 text-[#17213c] md:hidden" data-testid="button-mobile-menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="border-t border-[#dfe5ee] bg-[#f5f7fa] px-5 py-3 md:hidden">{links.concat([['/account', 'My account']]).map(([href, label]) => <Link onClick={() => setMenuOpen(false)} key={href} href={href} className="block border-b border-[#e5eaf1] py-3 text-sm font-semibold text-[#243250]" data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>{label}</Link>)}</nav>}
    </header>
    <main>{children}</main>
    <Footer />
  </div>;
}

function Footer() {
  return <footer className="mt-20 bg-[#17213c] text-[#dbe4f2]"><div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
    <div><Logo inverse /><p className="mt-5 max-w-[260px] text-sm leading-6 text-[#92a1ba]">A cleaner way to build your next eFootball squad. Real value, clear listings, zero guesswork.</p><p className="mono mt-8 text-[10px] text-[#6e7d98]">EFM / 2025 / CAIRO</p></div>
    <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-[#8291ab]">Shop</p><Link href="/products" className="block py-1.5 text-sm hover:text-[#6de8f5]" data-testid="link-footer-marketplace">Marketplace</Link><Link href="/offers" className="block py-1.5 text-sm hover:text-[#6de8f5]" data-testid="link-footer-offers">Offers</Link><Link href="/orders" className="block py-1.5 text-sm hover:text-[#6de8f5]" data-testid="link-footer-orders">Order status</Link></div>
    <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-[#8291ab]">Help</p><Link href="/support" className="block py-1.5 text-sm hover:text-[#6de8f5]" data-testid="link-footer-support">Support center</Link><Link href="/login" className="block py-1.5 text-sm hover:text-[#6de8f5]" data-testid="link-footer-login">Sign in</Link><Link href="/register" className="block py-1.5 text-sm hover:text-[#6de8f5]" data-testid="link-footer-register">Create account</Link></div>
    <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-[#8291ab]">Trust note</p><div className="flex gap-3 text-[#6de8f5]"><ShieldCheck size={20} /><p className="text-xs leading-5 text-[#92a1ba]">Every listing is checked before it appears in the market.</p></div></div>
  </div><div className="border-t border-white/10 px-5 py-5 text-center text-[11px] text-[#71809b]">Demo storefront · No real payment or account credentials are collected</div></footer>;
}

export function SectionHeading({ eyebrow, title, detail, action }: { eyebrow: string; title: string; detail?: string; action?: ReactNode }) {
  return <div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#b71649]">{eyebrow}</p><h2 className="display text-4xl font-bold uppercase tracking-tight text-[#18233e] sm:text-5xl">{title}</h2>{detail && <p className="mt-2 max-w-xl text-sm text-[#718097]">{detail}</p>}</div>{action}</div>;
}

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart } = useMarket();
  return <article className={`group surface relative overflow-hidden rounded-[20px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(32,48,74,.14)] ${compact ? '' : ''}`} data-testid={`card-product-${product.id}`}>
    <Link href={`/products/${product.id}`} className="block" data-testid={`link-product-${product.id}`}>
      <div className="relative h-[190px] overflow-hidden p-4" style={{ background: `linear-gradient(135deg, ${product.accent}, #17213c)` }}>
        <div className="absolute -right-8 -top-12 h-44 w-44 rounded-full border-[24px] border-white/10" /><div className="absolute -bottom-16 left-10 h-44 w-44 rounded-full border-[20px] border-[#6de8f5]/10" />
        <div className="relative flex items-start justify-between"><span className="rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.15em] text-white backdrop-blur">{product.kind}</span>{product.badge && <span className="rounded-full bg-[#6de8f5] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#17213c]">{product.badge}</span>}</div>
        <div className="absolute bottom-3 left-4 flex items-end gap-3"><div className="player-art relative grid h-[106px] w-[76px] place-items-center overflow-hidden rounded-xl border-2 border-white/60 shadow-xl"><div className="absolute h-20 w-20 rounded-full bg-[#17213c]/25" /><span className="display relative z-10 text-5xl font-bold italic text-white/90">{product.kind === 'Account' ? '9' : product.kind === 'Coins' ? 'C' : 'G'}</span><span className="absolute bottom-1 left-1 text-[7px] font-bold tracking-widest text-white/80">EFM</span></div><div className="pb-1 text-white"><p className="display text-3xl font-bold">{product.kind === 'Account' ? product.rating : product.kind === 'Coins' ? (product.coins / 10).toFixed(0) : product.gp}</p><p className="text-[10px] uppercase tracking-[.16em] text-white/65">{product.kind === 'Account' ? 'team rating' : product.kind === 'Coins' ? 'coins' : 'available GP'}</p></div></div>
      </div>
    </Link>
      <div className="p-4"><div className="mb-2 flex items-start justify-between gap-3"><Link href={`/products/${product.id}`} className="text-sm font-bold leading-5 text-[#1e2b47] transition hover:text-[#087f95]" data-testid={`link-product-title-${product.id}`}>{product.title}</Link><ChevronRight className="mt-0.5 shrink-0 text-[#9ba6b7]" size={16} /></div><div className="flex items-center gap-4 text-xs"><span className="flex items-center gap-1.5 font-semibold text-[#9b7215]"><span className="coin">C</span>{product.coins.toLocaleString()}</span><span className="flex items-center gap-1.5 font-semibold text-[#315485]"><span className="gp">G</span>{product.gp}</span></div><div className="mt-4 flex items-center justify-between border-t border-[#edf0f4] pt-3"><span className="display text-2xl font-bold text-[#17213c]">{product.price.toLocaleString()} <small className="font-sans text-[10px] uppercase tracking-wider text-[#78859a]">EGP</small></span><button onClick={() => addToCart(product)} className="rounded-full bg-[#e9f8fa] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#067b91] opacity-100 transition hover:bg-[#d7f3f5] sm:opacity-0 sm:group-hover:opacity-100" data-testid={`button-add-${product.id}`}>Add</button></div></div>
  </article>;
}

export function CopyId({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(id); setCopied(true); toast.success('Product ID copied', { description: id }); window.setTimeout(() => setCopied(false), 1800); };
  return <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-[#dce3ec] bg-white px-3 py-2 text-xs font-semibold text-[#5c6c84] transition hover:border-[#6de8f5] hover:text-[#087f95]" data-testid={`button-copy-${id}`}>{copied ? <Check size={14} className="text-[#087f95]" /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy ID'}</button>;
}

export function SearchBox({ value, onChange, placeholder = 'Search products, players, packs...' }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="flex h-12 items-center gap-3 rounded-xl border border-[#dce3ec] bg-white px-4 shadow-sm focus-within:border-[#46c8d9] focus-within:ring-4 focus-within:ring-[#6de8f5]/15"><Search size={18} className="text-[#8c98a9]" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm text-[#1c2945] outline-none placeholder:text-[#9ca7b6]" data-testid="input-search" /></label>;
}

export function EmptyState({ title, detail, action }: { title: string; detail: string; action?: ReactNode }) {
  return <div className="surface rounded-2xl px-6 py-16 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#e9f8fa] text-[#087f95]"><Package size={25} /></div><h3 className="mt-5 text-lg font-bold text-[#1b2946]" data-testid="text-empty-title">{title}</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7a879a]">{detail}</p>{action && <div className="mt-6">{action}</div>}</div>;
}

export function SkeletonGrid() {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map((item) => <div className="surface overflow-hidden rounded-[20px]" key={item}><div className="skeleton h-[190px]" /><div className="space-y-3 p-4"><div className="skeleton h-4 w-3/4 rounded" /><div className="skeleton h-3 w-1/2 rounded" /><div className="skeleton h-8 w-1/3 rounded" /></div></div>)}</div>;
}