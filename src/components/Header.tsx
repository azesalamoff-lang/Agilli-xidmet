import React from 'react';
import {
  Building2,
  HeartPulse,
  Pill,
  ShoppingCart,
  Send,
  PieChart,
  Monitor,
  Volume2,
  VolumeX,
  User,
  MapPin,
  Snowflake,
  ShieldCheck,
  Info
} from 'lucide-react';
import type { AppTab, CitizenProfile } from '../types.ts';

interface HeaderProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  citizen: CitizenProfile;
  isLoggedIn: boolean;
  onOpenProfile: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  voiceEnabled,
  onToggleVoice,
  citizen,
  isLoggedIn,
  onOpenProfile,
  cartCount,
  onOpenCart
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner Bar with context badges matching Image 1 */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 font-medium text-sky-200">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            Ucqar kəndlər (Ağdam - Papravənd və s.)
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300">
            <Snowflake className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
            Qış aylarında əlaqəsi kəsilən ərazilər üçün fasiləsiz xidmət
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Dövlət xidmətlərinə bərabər çıxış imkanı
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Voice AI button */}
          <button
            onClick={onToggleVoice}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
              voiceEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
            title="Səsli süni intellekt təlimatlarını aç/bağla"
          >
            {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Səsli AI: {voiceEnabled ? 'Aktiv' : 'Səssiz'}</span>
          </button>

          {/* Citizen Cabinet Pill */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 text-[11px] transition-colors"
          >
            <User className="w-3.5 h-3.5 text-sky-300" />
            <span className="max-w-[120px] truncate">{isLoggedIn ? citizen.fullName.split(' ')[0] : 'Giriş / Kabinet'}</span>
            {isLoggedIn && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>

          {/* Cart preview */}
          {cartCount > 0 && (
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{cartCount} sifariş</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Brand and Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Brand */}
          <div
            onClick={() => onSelectTab('overview')}
            className="cursor-pointer flex items-center gap-3 select-none flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                  Ağıllı Mobil Xidmət Mərkəzi
                </h1>
              </div>
              <p className="text-xs text-sky-700 font-medium hidden sm:block">
                Ucqar ərazilərdə həyat daha yaxın
              </p>
            </div>
          </div>

          {/* Navigation Tab Links */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            <button
              onClick={() => onSelectTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden md:inline">Layihə İcmalı</span>
            </button>

            <button
              onClick={() => onSelectTab('kiosk')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentTab === 'kiosk'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Monitor className="w-4 h-4 text-amber-300" />
              <span>İnteraktiv Köşk</span>
            </button>

            <button
              onClick={() => onSelectTab('state_services')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentTab === 'state_services'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Dövlət Xidmətləri</span>
            </button>

            <button
              onClick={() => onSelectTab('mediscan')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentTab === 'mediscan'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>MediSkaner</span>
            </button>

            <button
              onClick={() => onSelectTab('pharmacy')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentTab === 'pharmacy'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Aptek Şəbəkəsi</span>
            </button>

            <button
              onClick={() => onSelectTab('market')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentTab === 'market'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Market Şəbəkəsi</span>
            </button>

            <button
              onClick={() => onSelectTab('drone')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentTab === 'drone'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Send className="w-4 h-4 text-cyan-300" />
              <span>Dron İzləmə</span>
            </button>

            <button
              onClick={() => onSelectTab('resources')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentTab === 'resources'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>Model & Risklər</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
