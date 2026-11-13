import React, { useEffect, useState } from 'react';
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  CreditCard,
  Flame,
  Gamepad2,
  Laptop,
  LayoutGrid,
  Monitor,
  Plane,
  RefreshCw,
  ShoppingBag,
  Smartphone,
  Speaker,
  Tablet,
  Watch,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, formatGEL } from '../data/products';
import type { CategoryId, Product } from '../types';

interface BentoHeroProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  flagshipProduct: Product;
  flashProduct: Product;
  onBuyNow: (product: Product) => void;
  onOpenInstallment: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const SIDEBAR_ICONS: Record<CategoryId, React.ReactNode> = {
  all: <LayoutGrid className="w-4 h-4" />,
  smartphones: <Smartphone className="w-4 h-4" />,
  tablets: <Tablet className="w-4 h-4" />,
  smartwatches: <Watch className="w-4 h-4" />,
  laptops: <Laptop className="w-4 h-4" />,
  'audio-tv': <Speaker className="w-4 h-4" />,
  gaming: <Gamepad2 className="w-4 h-4" />,
  'tv-monitors': <Monitor className="w-4 h-4" />,
  'photo-video': <Camera className="w-4 h-4" />,
  drones: <Plane className="w-4 h-4" />,
};

export const BentoHero: React.FC<BentoHeroProps> = ({
  selectedCategory,
  onSelectCategory,
  flagshipProduct,
  flashProduct,
  onBuyNow,
  onOpenInstallment,
  onQuickView,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [showAllCats, setShowAllCats] = useState(false);

  // Live ticking countdown timer for Flash Deal
  const [secondsLeft, setSecondsLeft] = useState(4 * 3600 + 38 * 60 + 19);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 4 * 3600 + 38 * 60 + 19));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const findProduct = (id: string) =>
    PRODUCTS.find((p) => p.id === id) || flagshipProduct;

  const slides = [
    {
      id: 'iphone-18-pro-burgundy',
      title: 'iphone 18 pro | Pro Max',
      subtitle: 'Deep Burgundy Titanium • 256GB • ოფიციალური გარანტია',
      badgeText: 'Trade in',
      esim: true,
      bgClass: 'from-[#81586B] via-[#684355] to-[#462A38]',
      archOuter: 'border-[#573444]/90 bg-[#613C4E]/45',
      archMid: 'border-[#4D2D3B]/90 bg-[#523141]/55',
      archInner: 'border-[#3E222E]/95 bg-[#381E29]/70',
      glowColor: 'rgba(244, 114, 182, 0.28)',
      product: findProduct('iphone-18-pro-max-burgundy'),
    },
    {
      id: 'iphone-18-pro-blue',
      title: 'iPhone 18 Pro | Sierra Blue',
      subtitle: 'Sierra Ice Blue • A18 Pro Silicon • 120Hz Super Retina XDR',
      badgeText: 'Trade in',
      esim: true,
      bgClass: 'from-[#4A6E91] via-[#345373] to-[#1E344D]',
      archOuter: 'border-[#2B4764]/90 bg-[#365677]/45',
      archMid: 'border-[#223B54]/90 bg-[#294461]/55',
      archInner: 'border-[#182B3E]/95 bg-[#192D42]/70',
      glowColor: 'rgba(56, 189, 248, 0.30)',
      product: findProduct('iphone-18-pro-ice-blue'),
    },
    {
      id: 'samsung-s24-ultra-slide',
      title: 'Galaxy S24 Ultra | Galaxy AI',
      subtitle: '200MP ოთხმაგი კამერა • S-Pen კომპლექტში • Titanium Gray',
      badgeText: '0% განვადება',
      esim: true,
      bgClass: 'from-[#564779] via-[#3F325F] to-[#241B3B]',
      archOuter: 'border-[#372A55]/90 bg-[#433565]/45',
      archMid: 'border-[#2C2046]/90 bg-[#332750]/55',
      archInner: 'border-[#1F1635]/95 bg-[#211838]/70',
      glowColor: 'rgba(167, 139, 250, 0.28)',
      product: findProduct('samsung-s24-ultra'),
    },
    {
      id: 'galaxy-tab-s10-ultra-slide',
      title: 'Galaxy Tab S10 Ultra 14.6"',
      subtitle: 'Dynamic AMOLED 2X • S-Pen კომპლექტში • ულტრათხელი 5.4mm',
      badgeText: 'ნაწილ-ნაწილ 0%',
      esim: false,
      bgClass: 'from-[#2D6A62] via-[#1F5049] to-[#11312D]',
      archOuter: 'border-[#19443E]/90 bg-[#235750]/45',
      archMid: 'border-[#133833]/90 bg-[#1A433D]/55',
      archInner: 'border-[#0D2925]/95 bg-[#102E2A]/70',
      glowColor: 'rgba(52, 211, 153, 0.28)',
      product: findProduct('galaxy-tab-s10-ultra'),
    },
    {
      id: 'iphone-16-pro-max-slide',
      title: 'iPhone 16 Pro Max 256GB',
      subtitle: 'Desert Titanium • 4K 120fps Dolby Vision • თვეში 162 ₾-დან',
      badgeText: 'Trade in',
      esim: true,
      bgClass: 'from-[#785E4B] via-[#594435] to-[#36281E]',
      archOuter: 'border-[#4D3A2C]/90 bg-[#5E4838]/45',
      archMid: 'border-[#3F2F23]/90 bg-[#4A382B]/55',
      archInner: 'border-[#2E2118]/95 bg-[#33251B]/70',
      glowColor: 'rgba(251, 191, 36, 0.26)',
      product: findProduct('iphone-16-pro-max'),
    },
    {
      id: 'pixel-9-pro-xl-slide',
      title: 'Google Pixel 9 Pro XL 5G',
      subtitle: '16GB RAM • Tensor G4 • Gemini AI • Super Actua OLED',
      badgeText: '-11% SALE',
      esim: true,
      bgClass: 'from-[#4B586B] via-[#354050] to-[#1D2430]',
      archOuter: 'border-[#2D3746]/90 bg-[#3A4658]/45',
      archMid: 'border-[#232C38]/90 bg-[#2D3746]/55',
      archInner: 'border-[#181F29]/95 bg-[#1C232E]/70',
      glowColor: 'rgba(148, 163, 184, 0.28)',
      product: findProduct('google-pixel-9-pro-xl'),
    },
  ];

  // Continuous automatic slideshow rotation every 3.6 seconds (never freezes!)
  useEffect(() => {
    const tickMs = 60;
    const durationMs = 3600;
    const step = (tickMs / durationMs) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev + step >= 100) {
          setActiveSlide((s) => (s + 1) % slides.length);
          return 0;
        }
        return prev + step;
      });
    }, tickMs);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleManualSlide = (nextIdx: number) => {
    setActiveSlide(nextIdx);
    setSlideProgress(0);
  };

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const sidebarCategories = CATEGORIES.filter((c) => c.id !== 'all');
  const visibleSidebarCategories = showAllCats
    ? CATEGORIES
    : sidebarCategories.slice(0, 9);

  const currentSlide = slides[activeSlide];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
      {/* Compact Category Strip ONLY on Mobile (< lg) where Left Sidebar is hidden */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-3.5">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                active
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-md shadow-indigo-500/25'
                  : 'bg-white dark:bg-[#12151E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
              }`}
            >
              {SIDEBAR_ICONS[cat.id]}
              <span>{cat.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Vertical Category Sidebar (3 Columns - Modernized Zoommer-style Card) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-between">
          <div className="rounded-3xl bg-white dark:bg-[#12151E] border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-white/5">
            {visibleSidebarCategories.map((cat) => {
              const active = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) =>
                      cat.id === 'gaming'
                        ? p.category === 'gaming' || p.id === 'asus-rog-strix-g16'
                        : p.category === cat.id
                    ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    onSelectCategory(active && cat.id !== 'all' ? 'all' : cat.id)
                  }
                  className={`relative w-full flex items-center justify-between px-4 py-3.5 text-left text-[13px] font-bold transition-all cursor-pointer group ${
                    active
                      ? 'bg-indigo-50/90 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50/90 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 inset-y-2 w-1 rounded-r-full bg-gradient-to-b from-indigo-500 to-fuchsia-500" />
                  )}
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                        active
                          ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/30'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                      }`}
                    >
                      {SIDEBAR_ICONS[cat.id]}
                    </span>
                    <span className="tracking-tight">{cat.label}</span>
                  </div>
                  <span
                    className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full tabular-nums transition-colors ${
                      active
                        ? 'bg-indigo-600/15 text-indigo-600 dark:text-indigo-300'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Expand / Reset Chevron Button */}
          <button
            onClick={() => setShowAllCats((v) => !v)}
            aria-label="ყველა კატეგორიის ჩვენება"
            className="mt-1.5 mx-auto flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            {showAllCats ? (
              <>
                <span>შემოკლება</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Right Hero Banner Carousel + Quick Bento Strip (9 Columns) */}
        <div className="lg:col-span-9 flex flex-col justify-between gap-4">
          {/* Main Architectural Arch Carousel Banner */}
          <div
            className={`relative rounded-3xl overflow-hidden bg-gradient-to-b ${currentSlide.bgClass} text-white shadow-xl min-h-[360px] sm:min-h-[395px] flex flex-col items-center justify-between pt-6 px-6 pb-0 transition-all duration-700 select-none`}
          >
            {/* Top Animated Auto-Slideshow Progress Bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-black/20 z-30">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-fuchsia-400 transition-all duration-75"
                style={{ width: `${slideProgress}%` }}
              />
            </div>

            {/* Concentric 3D Architectural Arch Rings in Center */}
            <div className="absolute inset-x-0 bottom-0 top-3 flex items-end justify-center pointer-events-none overflow-hidden">
              {/* Ambient Radial Spotlight Behind Product */}
              <div
                className="absolute bottom-4 w-[320px] sm:w-[440px] h-[280px] rounded-full blur-3xl transition-all duration-700"
                style={{ background: currentSlide.glowColor }}
              />

              <div
                className={`w-[330px] sm:w-[480px] h-[335px] sm:h-[372px] rounded-t-[250px] border-[15px] ${currentSlide.archOuter} flex items-end justify-center pt-5 px-5 shadow-[inset_0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-700`}
              >
                <div
                  className={`w-full h-full rounded-t-[230px] border-[14px] ${currentSlide.archMid} flex items-end justify-center pt-5 px-5 shadow-[inset_0_12px_28px_rgba(0,0,0,0.4)] transition-all duration-700`}
                >
                  <div
                    className={`w-full h-full rounded-t-[210px] border-[12px] ${currentSlide.archInner} shadow-[inset_0_15px_35px_rgba(0,0,0,0.45)] transition-all duration-700`}
                  />
                </div>
              </div>
            </div>

            {/* Top Center Banner Headline + Trade-In & e-SIM Badges */}
            <div className="relative z-20 flex flex-col items-center text-center">
              <div className="flex items-center gap-2.5 flex-wrap justify-center">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                  {currentSlide.title}
                </h1>
                {currentSlide.esim && (
                  <span className="inline-flex flex-col items-center justify-center px-2 py-0.5 rounded-lg bg-white text-[#EA580C] font-black text-[10px] leading-tight shadow-lg rotate-[-6deg] border border-orange-400">
                    <span className="text-xs leading-none">e</span>
                    <span className="text-[8px] tracking-tighter">e-SIM</span>
                  </span>
                )}
              </div>

              {/* Orange Trade-In Pill */}
              <div className="mt-2 flex items-center gap-2">
                <span className="px-3.5 py-0.5 rounded-md bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white font-extrabold text-xs sm:text-sm shadow-md">
                  {currentSlide.badgeText}
                </span>
                <span className="hidden sm:inline text-xs font-semibold text-white/90 bg-black/25 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  {currentSlide.subtitle}
                </span>
              </div>
            </div>

            {/* Center Transparent Cutout Product Image (ZERO Background, ZERO Box Border!) */}
            <div
              key={currentSlide.id}
              onClick={() => onQuickView(currentSlide.product)}
              className="relative z-20 mt-1 w-64 sm:w-80 h-60 sm:h-68 cursor-pointer group flex items-end justify-center"
            >
              <img
                src={currentSlide.product.imageUrl}
                alt={currentSlide.product.name}
                className="w-full h-full object-contain object-bottom drop-shadow-[0_24px_32px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Glass Action Bar at Bottom of Banner */}
            <div className="absolute bottom-3.5 z-30 flex flex-wrap items-center justify-center gap-2.5 px-4">
              <button
                onClick={() => onBuyNow(currentSlide.product)}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-white text-slate-900 hover:bg-indigo-50 shadow-xl transition-all cursor-pointer flex items-center gap-1.5 tabular-nums"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />
                <span>ყიდვა — {formatGEL(currentSlide.product.price)}</span>
              </button>
              <button
                onClick={() => onOpenInstallment(currentSlide.product)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5 text-orange-400" />
                <span>განვადებით: {Math.round(currentSlide.product.price / 24)} ₾/თვე</span>
              </button>
            </div>

            {/* Left Circular White Arrow */}
            <button
              onClick={() =>
                handleManualSlide((activeSlide - 1 + slides.length) % slides.length)
              }
              aria-label="წინა სლაიდი"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:scale-110 shadow-xl flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Circular White Arrow */}
            <button
              onClick={() => handleManualSlide((activeSlide + 1) % slides.length)}
              aria-label="შემდეგი სლაიდი"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:scale-110 shadow-xl flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Dots (Top Right) */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleManualSlide(idx)}
                  aria-label={`სლაიდი ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === activeSlide ? 'w-6 bg-white' : 'w-2 bg-white/45 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom 2-Card Bento Strip (Flash Deal + Bank Installment & Trade-In) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Flash Deal Mini Bento */}
            <div
              onClick={() => onQuickView(flashProduct)}
              className="rounded-2xl bg-white dark:bg-[#12151E] border border-slate-200/80 dark:border-white/10 hover:border-amber-500/50 p-3.5 flex items-center justify-between gap-3 cursor-pointer shadow-xs transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-13 h-13 rounded-xl bg-slate-100 dark:bg-white/5 p-1 shrink-0 border border-slate-200/70 dark:border-white/10 flex items-center justify-center">
                  <img
                    src={flashProduct.imageUrl}
                    alt={flashProduct.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      <Flame className="w-3 h-3" />
                      დღის შეთავაზება -{flashProduct.discountPercent}%
                    </span>
                    <span className="text-[11px] font-bold text-rose-500">
                      დარჩა {flashProduct.stockCount} ერთ.
                    </span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate mt-0.5">
                    {flashProduct.name} — {formatGEL(flashProduct.price)}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 tabular-nums">
                  <Clock className="w-3 h-3" />
                  {hours}:{mins}:{secs}
                </span>
              </div>
            </div>

            {/* Trade-In & 0% Installment Mini Bento */}
            <div
              onClick={() => onOpenInstallment(flagshipProduct)}
              className="rounded-2xl bg-white dark:bg-[#12151E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/50 p-3.5 flex items-center justify-between gap-3 cursor-pointer shadow-xs transition-all"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Trade-In: ჩააბარე ძველი, წაიღე ახალი
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  ნაწილ-ნაწილ / 0%-იანი განვადება 6 თვემდე გაძვირების გარეშე
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                  TBC 0%
                </span>
                <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                  BOG 0%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
