import { ArrowLeft, SearchX } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="flex min-h-[60dvh] w-full items-center justify-center px-5">
      <div className="surface w-full max-w-md rounded-[26px] p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fff1f4] text-[#b71649]"><SearchX size={25} /></div>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[.2em] text-[#b71649]">Offside</p>
        <h1 className="display mt-2 text-5xl font-bold uppercase text-[#18233e]">That page moved.</h1>
        <p className="mt-3 text-sm leading-6 text-[#758298]">The listing or page you are looking for is not in this matchday.</p>
        <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#17213c] px-5 py-3 text-sm font-bold text-white" data-testid="link-not-found-home"><ArrowLeft size={15} /> Back to discovery</Link>
      </div>
    </div>
  );
}
