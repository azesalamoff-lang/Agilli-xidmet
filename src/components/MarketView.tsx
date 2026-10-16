import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  CheckCircle,
  Apple,
  Milk,
  Sparkles,
  Baby,
  Package,
  Plane,
  ChevronRight
} from 'lucide-react';
import { MARKET_ITEMS } from '../data/mockData.ts';
import type { MarketItem, CartItem } from '../types.ts';

interface MarketViewProps {
  onAddToCart: (item: CartItem) => void;
  onVoiceAnnounce?: (msg: string) => void;
  onOpenCart?: () => void;
  onGoToDroneDelivery?: () => void;
}

export const MarketView: React.FC<MarketViewProps> = ({
  onAddToCart,
  onVoiceAnnounce,
  onOpenCart,
  onGoToDroneDelivery
}) => {
  const [selectedMarket, setSelectedMarket] = useState<string>('Hamısı');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hamısı');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const markets = ['Hamısı', 'Bravo', 'Rahat', 'Araz', 'OBA'];
  const categories = [
    { label: 'Hamısı', icon: Package },
    { label: 'Qida məhsulları', icon: Milk },
    { label: 'Meyvə-tərəvəz', icon: Apple },
    { label: 'Məişət təmizliyi', icon: Sparkles },
    { label: 'Uşaq məhsulları', icon: Baby }
  ];

  const filteredItems = MARKET_ITEMS.filter(item => {
    const matchesMarket = selectedMarket === 'Hamısı' || item.market === selectedMarket;
    const matchesCat = selectedCategory === 'Hamısı' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMarket && matchesCat && matchesSearch;
  });

  const handleAddItem = (item: MarketItem) => {
    onAddToCart({
      id: item.id,
      title: `${item.name} (${item.unit})`,
      price: item.price,
      quantity: 1,
      provider: item.market,
      type: 'grocery',
      weightKg: item.weightKg
    });

    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [item.id]: false }));
    }, 1500);

    onVoiceAnnounce?.(`${item.name} səbətə əlavə edildi.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner matching Image 5 (app5.jpeg) */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-xs font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-white">4</span>
              <span>Gündəlik ləvazimatların sifarişi və dronla çatdırılma</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <ShoppingCart className="w-7 h-7 text-emerald-400" />
              <span>Market Şəbəkəsi</span>
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl">
              Bravo, Rahat, Araz və OBA elektron kataloqları: təzə ərzaq, süd, çörək, uşaq və gigiyenik məhsulların 
              kəndə operativ çatdırılması.
            </p>
          </div>

          <button
            onClick={onOpenCart}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-colors self-start md:self-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Səbətə və Sifarişə Keç</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Screen Interface + Bullets matching app5.jpeg */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Kiosk Screen Interface */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-5">
          {/* Market selector (Bravo, Rahat, Araz, OBA) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Market seçin:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {markets.map(mkt => (
                <button
                  key={mkt}
                  onClick={() => setSelectedMarket(mkt)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all text-center cursor-pointer ${
                    selectedMarket === mkt
                      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {mkt}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Məhsul axtarın (məs: Süd, Çörək, Meyvə, Tərəvəz)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Tabs from app5.jpeg */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedCategory === cat.label
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Product Cards Grid matching app5.jpeg screenshot layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map(item => {
              const isAdded = addedIds[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-3.5 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-36 rounded-xl overflow-hidden mb-3 border border-slate-200 bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold shadow-xs">
                        {item.market}
                      </span>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-semibold">
                        {item.weightKg} kq
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">{item.unit}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-slate-900">{item.price.toFixed(2)} ₼</div>
                      <span className="text-[10px] text-slate-400">Qalıq: {item.stock}</span>
                    </div>

                    <button
                      onClick={() => handleAddItem(item)}
                      className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Əlavə olundu</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Səbətə əlavə et</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Features & Bullets from app5.jpeg */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Gündəlik Ehtiyaclar Xidməti</span>
            </h3>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <span className="font-bold text-slate-900">Onlayn market seçimi:</span> Bravo, Rahat, Araz və digər inteqrasiya olunmuş şəbəkələr.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <span className="font-bold text-slate-900">İstədiyiniz məhsulların səbətə əlavə edilməsi:</span> Ərzaqdan uşaq ləvazimatlarına qədər vahid sifariş.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <span className="font-bold text-slate-900">Onlayn ödəniş:</span> Köşkdə təmassız kart, nağd və ya mobil tətbiqlə.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <span className="font-bold text-slate-900">Dron vasitəsilə sürətli çatdırılma:</span> Əlverişli hava şəraitində qapıya və ya kənd mərkəzinə operativ göndəriş.
                </div>
              </li>
            </ul>
          </div>

          {/* Dronla Çatdırılma Banner Widget */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-4 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2 text-emerald-300 font-bold text-xs">
              <Plane className="w-4 h-4 text-emerald-400" />
              <span>Qış Mövsümü Dron Çatdırılması</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Qar yağışı və buz bağlamış kənd yolları səbəbindən avtomobil hərəkəti məhdudlaşdıqda, 
              avtonom kuryer dronları ilə təcili ərzaq və uşaq qidası təchizatı fasiləsiz təmin edilir.
            </p>
            <button
              onClick={onGoToDroneDelivery}
              className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Uçuş Radarına Bax</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
