import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  Heart,
  Loader2,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react';
import {
  BANKS,
  INSTALLMENT_DURATIONS,
  calculateInstallment,
  formatGEL,
} from '../data/products';
import type { BankId, Product } from '../types';
import { BrandIcon } from './BrandIcon';
import { ProductVisual } from './ProductVisual';

interface QuickViewModalProps {
  product: Product | null;
  initialTab?: 'specs' | 'installment';
  isWishlisted: boolean;
  isCompared: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  initialTab = 'installment',
  isWishlisted,
  isCompared,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
}) => {
  const [selectedBank, setSelectedBank] = useState<BankId>('tbc');
  const [months, setMonths] = useState<number>(initialTab === 'installment' ? 6 : 12);
  const [approvalState, setApprovalState] = useState<'idle' | 'loading' | 'approved'>('idle');
  const [applicationId, setApplicationId] = useState<string>('');

  useEffect(() => {
    if (!product) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [product, onClose]);

  if (!product) return null;

  const { monthly, total, effectiveRate } = calculateInstallment(
    product.price,
    selectedBank,
    months
  );

  const activeBank = BANKS.find((b) => b.id === selectedBank)!;

  const handleApplyInstallment = () => {
    setApprovalState('loading');
    setTimeout(() => {
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      setApplicationId(`QP-${randomCode}`);
      setApprovalState('approved');
    }, 900);
  };

  const specRows = [
    { label: 'ეკრანი', value: product.specs.screen },
    { label: 'პროცესორი', value: product.specs.processor },
    { label: 'მეხსიერება', value: product.specs.memory },
    { label: 'ელემენტი', value: product.specs.battery },
    { label: 'გარანტია', value: product.specs.warranty },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#12151E] shadow-2xl overflow-hidden my-auto max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="დახურვა"
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Visual + Specs Table */}
          <div className="lg:col-span-6 p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10 space-y-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <BrandIcon brand={product.brand} className="w-3.5 h-3.5" />
                {product.brand}
              </span>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span
                className={`text-xs font-bold ${
                  product.inStock ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                {product.inStock ? `მარაგშია (${product.stockCount} ერთ.)` : 'ამოიწურა'}
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 tabular-nums mr-8 lg:mr-0">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {product.name}
              </h2>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Visual Box */}
            <div className="relative h-56 rounded-2xl bg-slate-50 dark:bg-[#090A0F]/80 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
              <ProductVisual
                type={product.visualType}
                imageUrl={product.imageUrl}
                alt={product.name}
                accentColor={product.accentColor}
                size="lg"
                className="!w-full !h-full"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-500/15 border-rose-500/40 text-rose-500'
                      : 'bg-white dark:bg-[#12151E] border-slate-200 dark:border-white/10 text-slate-400 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={() => onToggleCompare(product.id)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isCompared
                      ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-500'
                      : 'bg-white dark:bg-[#12151E] border-slate-200 dark:border-white/10 text-slate-400 hover:text-indigo-500'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Technical Specs Table */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                ტექნიკური მახასიათებლები
              </h3>
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 divide-y divide-slate-200 dark:divide-white/10 overflow-hidden text-xs">
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start justify-between gap-3 px-3.5 py-2.5 bg-slate-50/70 dark:bg-white/[0.02]"
                  >
                    <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                      {row.label}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100 text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Georgian Bank Installment Calculator */}
          <div className="lg:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-5 bg-slate-50/50 dark:bg-[#090A0F]/40">
            <div className="space-y-5">
              {/* Price Header */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-200 dark:border-white/10">
                <div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    სრული ფასი
                  </span>
                  <div className="flex items-baseline gap-2.5 mt-0.5">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                      {formatGEL(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-slate-400 line-through tabular-nums">
                        {formatGEL(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={!product.inStock}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>კალათაში დამატება</span>
                </button>
              </div>

              {/* Installment Calculator */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-500" />
                    განვადების კალკულატორი
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    {effectiveRate === 0 ? '0% ეფექტური' : `${effectiveRate}% წლიური`}
                  </span>
                </div>

                {/* Bank Selector */}
                <div className="grid grid-cols-3 gap-2">
                  {BANKS.map((bank) => {
                    const active = selectedBank === bank.id;
                    return (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => {
                          setSelectedBank(bank.id);
                          setApprovalState('idle');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? `${bank.accentBg} ${bank.accentBorder} ring-1 ring-inset ring-white/10`
                            : 'bg-white dark:bg-[#12151E] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${bank.badgeBg}`} />
                          <span
                            className={`text-xs font-extrabold ${
                              active ? bank.accentText : 'text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {bank.shortName}
                          </span>
                        </div>
                        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {bank.name}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Duration Pills */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      განვადების ვადა
                    </span>
                    <span className="font-bold text-indigo-500 tabular-nums">{months} თვე</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {INSTALLMENT_DURATIONS.map((dur) => {
                      const active = months === dur;
                      return (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => {
                            setMonths(dur);
                            setApprovalState('idle');
                          }}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer tabular-nums ${
                            active
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-500/25'
                              : 'bg-white dark:bg-[#12151E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-indigo-500/40'
                          }`}
                        >
                          {dur} თვე
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Calculation Summary Box */}
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#12151E] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      ყოველთვიური შენატანი
                    </span>
                    <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {formatGEL(monthly)}{' '}
                      <span className="text-xs font-semibold text-slate-400">/ თვეში</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-white/10 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">ეფექტური განაკვეთი</span>
                      <span className="font-bold text-emerald-500 tabular-nums">
                        {effectiveRate === 0 ? '0% ეფექტური' : `${effectiveRate}%`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[11px]">ჯამური ღირებულება</span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        {formatGEL(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Application Feedback */}
            <div className="space-y-2.5 pt-2">
              {approvalState === 'approved' ? (
                <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/40 p-4 text-emerald-700 dark:text-emerald-300 space-y-1">
                  <div className="flex items-center gap-2 font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>წინასწარი ლიმიტი დამტკიცებულია!</span>
                  </div>
                  <p className="text-xs opacity-90">
                    {activeBank.name} • {months} თვე • თვეში {formatGEL(monthly)}. განაცხადის კოდი:{' '}
                    <strong className="font-mono">{applicationId}</strong>
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyInstallment}
                  disabled={!product.inStock || approvalState === 'loading'}
                  className="w-full py-3.5 px-5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {approvalState === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>მიმდინარეობს ბანკთან დაკავშირება...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>განვადების დამტკიცება 2 წუთში</span>
                    </>
                  )}
                </button>
              )}
              <p className="text-[11px] text-center text-slate-400">
                * საჭიროა მხოლოდ პირადობის მოწმობა • ონლაინ ხელმოწერა 2 წუთში
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
