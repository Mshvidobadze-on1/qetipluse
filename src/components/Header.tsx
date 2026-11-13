import React, { useEffect, useRef } from 'react';
import {
  Heart,
  Moon,
  PhoneCall,
  Scale,
  Search,
  ShoppingBag,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { formatGEL } from '../data/products';
import { QetiPluseLogo } from './QetiPluseLogo';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  showAnnouncement: boolean;
  onDismissAnnouncement: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  compareCount: number;
  onOpenCompare: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onResetHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  showAnnouncement,
  onDismissAnnouncement,
  searchQuery,
  onSearchChange,
  compareCount,
  onOpenCompare,
  wishlistCount,
  onOpenWishlist,
  cartCount,
  cartTotal,
  onOpenCart,
  onResetHome,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Top Announcement Bar */}
      {showAnnouncement && (
        <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white text-xs py-2 px-10 text-center font-semibold tracking-wide">
          <p className="truncate flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-300" />
            <span>
              უფასო ექსპრეს მიწოდება თბილისში 2 საათში • 0%-იანი განვადება TBC და BOG ბანკებში • Trade-In სპეც-პირობები
            </span>
          </p>
          <button
            onClick={onDismissAnnouncement}
            aria-label="შეტყობინების დახურვა"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Sticky Glass Header (No Duplicate Category Bar!) */}
      <div className="backdrop-blur-2xl bg-white/85 dark:bg-[#090A0F]/85 border-b border-slate-200/80 dark:border-white/10 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-5 h-16 sm:h-20">
            {/* Custom Brand Logo */}
            <button
              onClick={onResetHome}
              className="text-left shrink-0 cursor-pointer focus:outline-none"
            >
              <QetiPluseLogo size="md" />
            </button>

            {/* Modern Live Search Bar */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 opacity-0 group-focus-within:opacity-35 blur-xs transition-opacity pointer-events-none" />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="რას ეძებთ? მაგ: iPhone 18 Pro, Galaxy S24 Ultra, MacBook, PS5..."
                  className="relative w-full pl-11 pr-20 py-2.5 rounded-2xl text-sm font-medium bg-slate-100/90 dark:bg-[#12151E] border border-slate-200/90 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-[#161A26] focus:border-indigo-500 transition-all"
                />
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange('')}
                    aria-label="ძებნის გასუფთავება"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[11px] font-bold rounded-lg bg-white dark:bg-white/10 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 shadow-2xs">
                    ⌘K
                  </kbd>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Hotline Pill (Desktop) */}
              <a
                href="tel:*2026"
                className="hidden xl:flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold hover:bg-emerald-500/15 transition-colors"
                title="ცხელი ხაზი *2026"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
                <span>*2026</span>
              </a>

              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                aria-label="თემის შეცვლა"
                title={isDark ? 'ნათელი რეჟიმი' : 'ბნელი რეჟიმი'}
                className="p-2.5 rounded-2xl bg-slate-100/90 dark:bg-[#12151E] border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-indigo-500/60 transition-all cursor-pointer"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600" />
                )}
              </button>

              {/* Compare Trigger */}
              <button
                onClick={onOpenCompare}
                className="relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2.5 rounded-2xl bg-slate-100/90 dark:bg-[#12151E] border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-indigo-500/60 transition-all text-xs font-bold cursor-pointer"
                title="შედარება"
              >
                <Scale className="w-4 h-4 text-indigo-500" />
                <span className="hidden lg:inline">შედარება</span>
                {compareCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-indigo-500 text-white tabular-nums">
                    {compareCount}
                  </span>
                )}
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={onOpenWishlist}
                className="relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2.5 rounded-2xl bg-slate-100/90 dark:bg-[#12151E] border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-rose-500/60 transition-all text-xs font-bold cursor-pointer"
                title="სურვილები"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlistCount > 0
                      ? 'text-rose-500 fill-rose-500'
                      : 'text-slate-500 dark:text-slate-300'
                  }`}
                />
                <span className="hidden lg:inline">სურვილები</span>
                {wishlistCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white tabular-nums">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Cart Trigger */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 transition-all text-xs sm:text-sm font-bold cursor-pointer"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-emerald-400 text-[#090A0F] text-[10px] font-black flex items-center justify-center tabular-nums">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">კალათა</span>
                {cartTotal > 0 && (
                  <span className="hidden sm:inline pl-2 border-l border-white/25 tabular-nums font-extrabold">
                    {formatGEL(cartTotal)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="pb-3 md:hidden">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ძებნა: iPhone, Galaxy, MacBook, Sony..."
                className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-slate-100 dark:bg-[#12151E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
