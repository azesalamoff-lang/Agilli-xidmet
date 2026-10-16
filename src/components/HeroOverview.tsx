import React from 'react';
import { Target, Users, TrendingUp, Sparkles, ArrowRight, ShieldCheck, Cpu, Plane, HeartPulse, Building2, Pill, ShoppingCart } from 'lucide-react';
import type { AppTab } from '../types.ts';

interface HeroOverviewProps {
  onNavigateTab: (tab: AppTab) => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner & Container Module (Faithful to Image 1: app1.jpeg) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-sky-950 text-white shadow-xl border border-sky-900/40">
        {/* Subtle background glow & mountain silhouette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/15 via-transparent to-transparent pointer-events-none" />
        
        {/* Snow mountains decorative backdrop */}
        <div 
          className="absolute inset-0 opacity-25 mix-blend-screen bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80')`
          }}
        />

        <div className="relative p-6 sm:p-8 md:p-10 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 cols: Brand Hero, Container Module Presentation & Interactive Entry */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs font-semibold backdrop-blur-md mb-4 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Dövlət xidmətləri, sağlamlıq, aptek və market – bir məkanda, bir toxunuşla!</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Ağıllı Mobil <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-white">
                    Xidmət Mərkəzi
                  </span>
                </h1>
                
                <p className="mt-2 text-lg sm:text-xl font-medium text-sky-200">
                  Ucqar ərazilərdə həyat daha yaxın
                </p>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  Ağdam rayonunun Papravənd kəndi kimi ucqar məntəqələrdə qış aylarında yolların bağlanması və 
                  mərkəzə gediş çətinliyini aradan qaldıran, süni intellekt və dron texnologiyaları ilə təchiz olunmuş 
                  avtonom mobil xidmət kompleksi.
                </p>
              </div>

              {/* Modular Container Pavillion Visual Representation */}
              <div className="rounded-xl bg-slate-900/80 border border-sky-500/30 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-semibold text-slate-200">Modul Kompleks: Ağdam / Papravənd Stansiyası</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-cyan-300 text-[11px]">
                    <Plane className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Dron eniş platforması aktivdir</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => onNavigateTab('state_services')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/20 text-center transition-all group"
                  >
                    <Building2 className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-xs font-bold text-white">Dövlət xidmətləri</span>
                    <span className="text-[10px] text-sky-300/80">ASAN & Notariat</span>
                  </button>

                  <button
                    onClick={() => onNavigateTab('mediscan')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/20 text-center transition-all group"
                  >
                    <HeartPulse className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-xs font-bold text-white">MediSkaner</span>
                    <span className="text-[10px] text-rose-300/80">Ağıllı müayinə</span>
                  </button>

                  <button
                    onClick={() => onNavigateTab('pharmacy')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-teal-950/40 hover:bg-teal-900/60 border border-teal-500/20 text-center transition-all group"
                  >
                    <Pill className="w-6 h-6 text-teal-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-xs font-bold text-white">Aptek şəbəkəsi</span>
                    <span className="text-[10px] text-teal-300/80">Resept & Dron</span>
                  </button>

                  <button
                    onClick={() => onNavigateTab('market')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/20 text-center transition-all group"
                  >
                    <ShoppingCart className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-xs font-bold text-white">Market şəbəkəsi</span>
                    <span className="text-[10px] text-emerald-300/80">Bravo & Rahat</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateTab('kiosk')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all cursor-pointer hover:translate-y-[-1px]"
                >
                  <Cpu className="w-4 h-4 text-amber-300" />
                  <span>İnteraktiv Köşkü Başlat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateTab('drone')}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-sky-200 border border-white/15 font-semibold text-sm backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Plane className="w-4 h-4 text-cyan-300" />
                  <span>Dron Çatdırılmasını İzlə</span>
                </button>
              </div>
            </div>

            {/* Right 5 cols: 3 Cards from Image 1 (Layihənin məqsədi, Hədəf qrup, Gözlənilən nəticələr) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Card 1: Layihənin məqsədi */}
              <div className="rounded-xl bg-sky-900/60 border border-sky-400/30 p-4 sm:p-5 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-sky-500/30 border border-sky-400/50 flex items-center justify-center text-sky-300">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-white">Layihənin məqsədi</h3>
                </div>
                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed pl-11">
                  Ucqar kəndlərdə yaşayan vətəndaşlara əsas xidmətləri bir məkanda, sürətli, rahat və müasir texnologiyalarla əlçatan etmək.
                </p>
              </div>

              {/* Card 2: Hədəf qrup */}
              <div className="rounded-xl bg-blue-950/80 border border-blue-400/30 p-4 sm:p-5 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-500/30 border border-blue-400/50 flex items-center justify-center text-blue-300">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-white">Hədəf qrup</h3>
                </div>
                <ul className="text-xs sm:text-sm text-slate-200 space-y-1.5 pl-11">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></span>
                    <span>Ucqar kənd sakinləri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></span>
                    <span>Yaşlılar və hərəkət məhdudiyyətli şəxslər</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></span>
                    <span>Qış aylarında əlaqəsi kəsilən ərazilər</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></span>
                    <span>Dövlət xidmətlərinə çətin çıxışı olan vətəndaşlar</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Gözlənilən nəticələr (Green Accent from app1.jpeg) */}
              <div className="rounded-xl bg-emerald-950/60 border border-emerald-400/30 p-4 sm:p-5 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-emerald-200">Gözlənilən nəticələr</h3>
                </div>
                <ul className="text-xs sm:text-sm text-emerald-100/90 space-y-1.5 pl-11">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>Xidmətlərə bərabər çıxış imkanı</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>Vaxt və nəqliyyat xərclərinin azalması</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>Vətəndaş məmnuniyyətinin artması</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>Rəqəmsal dövlət xidmətlərinin genişlənməsi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>Ucqar ərazilərin sosial rifahının dəstəklənməsi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
