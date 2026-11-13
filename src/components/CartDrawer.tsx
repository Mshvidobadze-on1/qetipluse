import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { formatGEL } from '../data/products';
import type { CartItem } from '../types';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 1000;
const PROMO_CODES = ['QETI2026', 'PLUS10'];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [view, setView] = useState<'cart' | 'checkout' | 'success'>('cart');

  // Checkout form state
  const [city, setCity] = useState('თბილისი');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('+995 5');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'installment' | 'cash'>('card');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(0, subtotal - discount);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES.includes(code)) {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('არასწორი პრომო კოდი (სცადეთ QETI2026 ან PLUS10)');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `QP-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(code);
    setView('success');
    onClearCart();
  };

  const handleClose = () => {
    if (view === 'success') {
      setView('cart');
      setAppliedPromo(null);
      setPromoInput('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm" onClick={handleClose}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-white dark:bg-[#12151E] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {view === 'checkout' && (
              <button
                onClick={() => setView('cart')}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <ShoppingBag className="w-5 h-5 text-indigo-500" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              {view === 'cart' && `კალათა (${items.reduce((s, i) => s + i.quantity, 0)})`}
              {view === 'checkout' && 'შეკვეთის გაფორმება'}
              {view === 'success' && 'შეკვეთა მიღებულია'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="დახურვა"
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {view === 'success' ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-emerald-500" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              მადლობა შეკვეთისთვის!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs">
              თქვენი შეკვეთა <strong className="font-mono text-indigo-500">{orderNumber}</strong> წარმატებით გაფორმდა. კურიერი დაგიკავშირდებათ ნომერზე{' '}
              <span className="font-semibold">{phone}</span>.
            </p>
            <div className="w-full rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">ქალაქი:</span>
                <span className="font-bold text-slate-900 dark:text-white">{city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">მისამართი:</span>
                <span className="font-bold text-slate-900 dark:text-white">{address || 'მითითებული'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">მიწოდება:</span>
                <span className="font-bold text-emerald-500">ექსპრეს 2 საათში</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold cursor-pointer"
            >
              მაღაზიაში დაბრუნება
            </button>
          </div>
        ) : view === 'checkout' ? (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                ქალაქი
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-indigo-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-[#090A0F] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="თბილისი">თბილისი</option>
                  <option value="ბათუმი">ბათუმი</option>
                  <option value="ქუთაისი">ქუთაისი</option>
                  <option value="რუსთავი">რუსთავი</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                მისამართი
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="მაგ: ჭავჭავაძის გამზ. 34, ბინა 12"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-[#090A0F] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                ტელეფონის ნომერი
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-indigo-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+995 5XX XX XX XX"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-[#090A0F] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 tabular-nums"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                გადახდის მეთოდი
              </label>
              <div className="space-y-2">
                {[
                  { id: 'card', label: 'ბარათით გადახდა (Visa / Mastercard / Apple Pay)' },
                  { id: 'installment', label: 'TBC / BOG ონლაინ განვადება' },
                  { id: 'cash', label: 'კურიერთან გადახდა (ნაღდი / ტერმინალი)' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      paymentMethod === opt.id
                        ? 'bg-indigo-500/15 border-indigo-500 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === opt.id}
                      onChange={() => setPaymentMethod(opt.id as 'card' | 'installment' | 'cash')}
                      className="accent-indigo-600"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl bg-slate-100 dark:bg-[#090A0F] border border-slate-200 dark:border-white/10 p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>ჯამი</span>
                <span className="tabular-nums font-semibold">{formatGEL(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-500 font-semibold">
                  <span>პრომო ფასდაკლება ({appliedPromo})</span>
                  <span className="tabular-nums">-{formatGEL(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>მიწოდება</span>
                <span className="font-semibold text-emerald-500">
                  {remainingForFreeShipping === 0 ? 'უფასო' : '10 ₾'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/10">
                <span>გადასახდელი</span>
                <span className="tabular-nums">
                  {formatGEL(finalTotal + (remainingForFreeShipping === 0 ? 0 : 10))}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-extrabold shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              შეკვეთის დადასტურება
            </button>
          </form>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              თქვენი კალათა ცარიელია
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              დაამატეთ სასურველი ტექნიკა კალათაში და ისარგებლეთ 0%-იანი განვადებით ან ექსპრეს მიწოდებით.
            </p>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress Bar */}
            <div className="px-5 py-3 bg-slate-50 dark:bg-[#090A0F]/60 border-b border-slate-200 dark:border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    🎉 თქვენ გეკუთვნით უფასო ექსპრეს მიწოდება!
                  </span>
                ) : (
                  <span className="text-slate-600 dark:text-slate-300">
                    უფასო მიწოდებამდე დარჩა{' '}
                    <strong className="text-indigo-500 tabular-nums">
                      {formatGEL(remainingForFreeShipping)}
                    </strong>
                  </span>
                )}
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02]"
                >
                  <div className="p-1.5 rounded-xl bg-white dark:bg-[#090A0F] border border-slate-200 dark:border-white/10 shrink-0">
                    <ProductVisual
                      type={product.visualType}
                      imageUrl={product.imageUrl}
                      alt={product.name}
                      accentColor={product.accentColor}
                      size="sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5 tabular-nums">
                      {formatGEL(product.price * quantity)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090A0F]">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold tabular-nums text-slate-900 dark:text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        aria-label="წაშლა"
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer: Promo & Checkout CTA */}
            <div className="p-5 border-t border-slate-200 dark:border-white/10 space-y-3 bg-slate-50/70 dark:bg-[#090A0F]/60">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="პრომო კოდი (QETI2026)"
                    className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-[#12151E] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                >
                  გამოყენება
                </button>
              </form>
              {promoError && <p className="text-[11px] text-rose-500">{promoError}</p>}
              {appliedPromo && (
                <p className="text-[11px] text-emerald-500 font-semibold">
                  ✓ პრომო კოდი {appliedPromo} გააქტიურდა (-10% ფასდაკლება)
                </p>
              )}

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>ჯამი</span>
                  <span className="tabular-nums font-semibold">{formatGEL(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>ფასდაკლება (10%)</span>
                    <span className="tabular-nums">-{formatGEL(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-1">
                  <span>სულ გადასახდელი</span>
                  <span className="tabular-nums">{formatGEL(finalTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => setView('checkout')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-extrabold shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
              >
                შეკვეთის გაფორმება
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};
