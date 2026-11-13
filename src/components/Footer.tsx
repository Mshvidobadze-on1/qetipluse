import React from 'react';
import { Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { QetiPluseLogo } from './QetiPluseLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-white/10 bg-white/85 dark:bg-[#0D0F16] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column with Custom Logo */}
          <div className="space-y-4">
            <QetiPluseLogo size="sm" />
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ოფიციალური ტექნიკა, მომენტალური 0%-იანი ონლაინ განვადება და ექსპრეს მიწოდება მთელი საქართველოს მასშტაბით.
            </p>
          </div>

          {/* Tbilisi Branches */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              ფილიალები თბილისში
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>საბურთალო — პეკინის გამზ. №18</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>ვაკე — ი. ჭავჭავაძის გამზ. №44</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>გლდანი — ო. ხიზანიშვილის ქ. №15</span>
              </li>
            </ul>
          </div>

          {/* Hotline & Warranty */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              კონტაქტი და გარანტია
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  ცხელი ხაზი: <strong className="text-slate-900 dark:text-white">*2026</strong> /{' '}
                  <span className="tabular-nums">032 2 12 20 26</span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>ყოველდღე: 10:00 — 21:00</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>1–2 წლიანი ოფიციალური სერვის ცენტრის გარანტია ყველა პროდუქტზე</span>
              </li>
            </ul>
          </div>

          {/* Payment Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              გადახდის პარტნიორები
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'TBC Bank', cls: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30' },
                { label: 'BOG ნაწილ-ნაწილ', cls: 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30' },
                { label: 'Credo Bank', cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
                { label: 'VISA', cls: 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10' },
                { label: 'Mastercard', cls: 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10' },
                { label: 'Apple Pay', cls: 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10' },
              ].map((partner) => (
                <span
                  key={partner.label}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border ${partner.cls}`}
                >
                  {partner.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 QetiPluse (ქეთი პლუსი). ყველა უფლება დაცულია.</p>
          <p>შექმნილია პრემიუმ სტანდარტით თბილისში ⚡</p>
        </div>
      </div>
    </footer>
  );
};
