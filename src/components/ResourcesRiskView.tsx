import React from 'react';
import {
  Users,
  Laptop,
  Coins,
  Handshake,
  AlertTriangle,
  TrendingUp,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { KPIS } from '../data/mockData.ts';

export const ResourcesRiskView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner matching Image 8 (app8.jpeg) */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-slate-800">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-200 border border-sky-400/30 text-xs font-semibold mb-2">
            <span className="font-bold">4/4 Model Təhlili</span>
            <span>•</span>
            <span>Dayanıqlı, təhlükəsiz və genişlənə bilən model</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Resurslar, risklər və nəticələr
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Ağıllı Mobil Xidmət Mərkəzinin pilot tətbiqi, texniki-iqtisadi əsaslandırması, 
            potensial risklərin önlənməsi və ölçülə bilən hədəfləri.
          </p>
        </div>
      </div>

      {/* Top 4 Resource Pillars from app8.jpeg */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b border-slate-100 pb-3">
          <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            ⚖
          </div>
          <span>Resurs tələbləri</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. İnsan resursları */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/60 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
              <Users className="w-4 h-4" />
              <span>İnsan resursları</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5">
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>Layihə rəhbəri</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>İT mütəxəssisi</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>Xidmətlər üzrə mütəxəssis</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>UX/UI dizayner</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>Təhlükəsizlik mütəxəssisi</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>Yerli əlaqələndiricilər</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>Könüllülər</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>Monitorinq mütəxəssisi</li>
            </ul>
          </div>

          {/* 2. Texniki resurslar */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/60 space-y-2.5">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
              <Laptop className="w-4 h-4" />
              <span>Texniki resurslar</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5">
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>Noutbuk / planşet / sensor köşk</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>İnternet bağlantısı (Starlink / 4G)</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>Ehtiyat enerji həlli (Solar / UPS)</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>Veb və mobil platforma</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>İnzibati dispetçer paneli</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>İstifadə statistikası analitikası</li>
            </ul>
          </div>

          {/* 3. Maliyyə resursları */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-2">
                <Coins className="w-4 h-4" />
                <span>Maliyyə resursları (ilkin təxmini)</span>
              </div>
              <div className="text-2xl font-black text-emerald-800 leading-tight">
                17 000 – <br />33 000 AZN
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Bu, planlaşdırma üçün nümunəvi hesablamadır. Köşk avadanlığı, dron və ilkin sazlanma xərclərini əhatə edir.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md text-center">
              Optimal pilot büdcəsi
            </span>
          </div>

          {/* 4. Təşkilati tərəfdaşlıq */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
              <Handshake className="w-4 h-4" />
              <span>Təşkilati tərəfdaşlıq</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5">
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Dövlət qurumları (ASAN, Ədliyyə)</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Yerli icra idarələri və bələdiyyələr</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Könüllü təşkilatlar (ASAN Könüllüləri)</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Mövcud rabitə və poçt infrastrukturu</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom 3 Sections from app8.jpeg: Risks, Metrics & Future Directions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risks & Management (5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>Potensial risklər və idarəetmə</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">1.</span>
              <div>
                <span className="font-semibold text-slate-900">İnternet bağlantısının zəif olması:</span> Peyk (Starlink) və ya yerli 4G LTE ehtiyat kanalı.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">2.</span>
              <div>
                <span className="font-semibold text-slate-900">Şəxsi məlumatların sızması:</span> Dövlət təhlükəsizlik şifrələməsi, məlumatların yerli saxlanmaması.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">3.</span>
              <div>
                <span className="font-semibold text-slate-900">Süni intellektin yanlış məlumat verməsi:</span> Operator tərəfindən yekun rəy və həkim nəzarəti.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">4.</span>
              <div>
                <span className="font-semibold text-slate-900">Əhalinin sistemdən istifadə çətinliyi:</span> Azərbaycan dilində səsli AI köməkçi və yerli könüllülər.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">5.</span>
              <div>
                <span className="font-semibold text-slate-900">Maliyyə və texniki davamlılıq:</span> Dövlət-özəl tərəfdaşlıq (PPP) və aptek/market komissiyası.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">6.</span>
              <div>
                <span className="font-semibold text-slate-900">Xidmət məlumatlarının köhnəlməsi:</span> Real-vaxtda dövlət API-ləri ilə sinxronizasiya.
              </div>
            </li>
          </ul>
        </div>

        {/* Measurement of Results (KPIs) (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
            <TrendingUp className="w-4 h-4" />
            <span>Nəticələrin ölçülməsi (pilot üçün hədəflər)</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-blue-50/70 text-center">
              <div className="text-xl font-black text-blue-900">3</div>
              <div className="text-[11px] font-semibold text-blue-700">pilot kənd</div>
              <div className="text-[10px] text-slate-500">Ağdam - Papravənd və ətraf</div>
            </div>

            <div className="p-3 rounded-xl bg-sky-50/70 text-center">
              <div className="text-xl font-black text-sky-900">300</div>
              <div className="text-[11px] font-semibold text-sky-700">aktiv istifadəçi</div>
              <div className="text-[10px] text-slate-500">Kənd sakinləri</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 text-center">
              <div className="text-xl font-black text-emerald-900">≥ 80%</div>
              <div className="text-[11px] font-semibold text-emerald-700">vətəndaş məmnunluğu</div>
              <div className="text-[10px] text-slate-500">Rəy sorğuları</div>
            </div>

            <div className="p-3 rounded-xl bg-teal-50/70 text-center">
              <div className="text-xl font-black text-teal-900">≥ 85%</div>
              <div className="text-[11px] font-semibold text-teal-700">xidməti uğurla tapma</div>
              <div className="text-[10px] text-slate-500">İlk müraciətdə</div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/70 text-center">
              <div className="text-xl font-black text-indigo-900">≥ 15%</div>
              <div className="text-[11px] font-semibold text-indigo-700">təkrar səfərlərin azalması</div>
              <div className="text-[10px] text-slate-500">Rayon mərkəzinə</div>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/70 text-center">
              <div className="text-xl font-black text-purple-900">≥ 90%</div>
              <div className="text-[11px] font-semibold text-purple-700">əlçatanlıq tapşırıqları</div>
              <div className="text-[10px] text-slate-500">Yerində icra</div>
            </div>
          </div>
        </div>

        {/* Future Directions (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
            <Rocket className="w-4 h-4" />
            <span>İnkişaf istiqamətləri</span>
          </div>

          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">🎙</span>
              <div>
                <span className="font-bold text-slate-900">Səsli süni intellekt köməkçisi:</span> Azərbaycan dilinin yerli ləhcələrini anlayan səsli bələdçi.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">📋</span>
              <div>
                <span className="font-bold text-slate-900">Fərdiləşdirilmiş təlimatlar:</span> Hər yaş qrupuna uyğun addım-addım ekranda göstərmə.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">📱</span>
              <div>
                <span className="font-bold text-slate-900">Çoxkanallı istifadə:</span> Köşk + Veb-portal + Mobil tətbiq sinxronizasiyası.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">♿</span>
              <div>
                <span className="font-bold text-slate-900">Əlçatanlıq imkanları:</span> Yaşlılar və görmə məhdudiyyətli sakinlər üçün böyüdülmüş rejim.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">📊</span>
              <div>
                <span className="font-bold text-slate-900">Ehtiyacların analitikası:</span> Kənddə ən çox tələb olunan dərman və dövlət xidmətlərinin proqnozlaşdırılması.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
