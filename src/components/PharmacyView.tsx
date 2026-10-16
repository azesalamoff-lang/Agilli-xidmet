import React, { useState } from 'react';
import {
  Pill,
  Scan,
  ShoppingCart,
  CheckCircle,
  Plane,
  AlertCircle,
  FileCheck,
  Search,
  Sparkles,
  Layers
} from 'lucide-react';
import { PHARMACY_ITEMS } from '../data/mockData.ts';
import type { PharmacyItem, CartItem } from '../types.ts';

interface PharmacyViewProps {
  onAddToCart: (item: CartItem) => void;
  onVoiceAnnounce?: (msg: string) => void;
  onGoToDroneDelivery?: () => void;
}

export const PharmacyView: React.FC<PharmacyViewProps> = ({
  onAddToCart,
  onVoiceAnnounce,
  onGoToDroneDelivery
}) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>('Hamısı');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanningPrescription, setIsScanningPrescription] = useState(false);
  const [scannedSuccess, setScannedSuccess] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const pharmacies = ['Hamısı', 'Avromed', 'Zeytun', 'Qazarmed', 'Buta Aptek'];

  const filteredMedicines = PHARMACY_ITEMS.filter(med => {
    const matchesPharmacy = selectedPharmacy === 'Hamısı' || med.pharmacy === selectedPharmacy;
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          med.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPharmacy && matchesSearch;
  });

  const handleScanPrescription = () => {
    setIsScanningPrescription(true);
    setScannedSuccess(false);
    onVoiceAnnounce?.('Resept skaneri aktivdir. Zəhmət olmasa həkim təyinat vərəqəsini skan bölməsinə yaxınlaşdırın.');

    setTimeout(() => {
      setIsScanningPrescription(false);
      setScannedSuccess(true);
      onVoiceAnnounce?.('Resept oxundu! Təyin olunan dərmanlar siyahıda qeyd edildi.');
    }, 1500);
  };

  const handleAddMed = (med: PharmacyItem) => {
    onAddToCart({
      id: med.id,
      title: `${med.name} (${med.count})`,
      price: med.price,
      quantity: 1,
      provider: med.pharmacy,
      type: 'medicine',
      weightKg: 0.15
    });

    setAddedIds(prev => ({ ...prev, [med.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [med.id]: false }));
    }, 1500);

    onVoiceAnnounce?.(`${med.name} səbətə əlavə edildi.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner matching Image 6 (app6.jpeg) */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-cyan-950 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 border border-teal-400/30 text-xs font-semibold">
              <span className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center font-bold text-xs text-white">3</span>
              <span>Resept əsasında dərman sifarişi və dronla çatdırılma</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Pill className="w-7 h-7 text-teal-400" />
              <span>Aptek Şəbəkəsi</span>
            </h2>
            <p className="text-teal-100 text-xs sm:text-sm max-w-2xl">
              Avromed, Zeytun, Qazarmed və Buta Aptek vahid bazada: reseptin skan edilməsi, 
              real vaxtda qiymət müqayisəsi və təcili dərmanların xüsusi temperatur rejimi ilə dronla çatdırılması.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleScanPrescription}
              disabled={isScanningPrescription}
              className="px-4 py-2.5 rounded-xl bg-white text-teal-950 hover:bg-teal-50 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              <Scan className={`w-4 h-4 text-teal-600 ${isScanningPrescription ? 'animate-spin' : ''}`} />
              <span>{isScanningPrescription ? 'Skan edilir...' : 'Resepti Skan Et'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prescription scan notification */}
      {scannedSuccess && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-300 text-teal-900 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-teal-600 shrink-0" />
            <div>
              <span className="font-bold">Resept uğurla tanındı!</span> Ağdam RMX həkiminin təyin etdiyi Vitamin D3 və Paracetamol bazada tapıldı.
            </div>
          </div>
          <button
            onClick={() => setScannedSuccess(false)}
            className="text-teal-700 hover:text-teal-900 font-bold cursor-pointer"
          >
            Bağla
          </button>
        </div>
      )}

      {/* Main Grid: Screen UI + Bullet Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Kiosk Screen Interface matching app6.jpeg */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-5">
          {/* Pharmacy Provider Selector Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Aptek seçin:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {pharmacies.map(pharm => (
                <button
                  key={pharm}
                  onClick={() => setSelectedPharmacy(pharm)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all text-center cursor-pointer ${
                    selectedPharmacy === pharm
                      ? 'bg-teal-600 text-white shadow-xs ring-2 ring-teal-500/20'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {pharm}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Dərman adı və ya tərkib axtarın (məs: Paracetamol, Vitamin D3)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Medicine List (faithful to app6.jpeg table/card list) */}
          <div className="divide-y divide-slate-100">
            {filteredMedicines.map(med => {
              const isAdded = addedIds[med.id];
              return (
                <div
                  key={med.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={med.image}
                      alt={med.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{med.name}</h4>
                        {med.requiresPrescription && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            Reseptli
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{med.dosage} • {med.count}</p>
                      <span className="inline-block mt-0.5 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                        {med.pharmacy} • Qalıq: {med.stock} ədəd
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-base font-black text-slate-900">{med.price.toFixed(2)} ₼</div>
                      <span className="text-[10px] text-slate-400">Dövlət qiymət reyestri</span>
                    </div>

                    <button
                      onClick={() => handleAddMed(med)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Əlavə olundu</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
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

        {/* Right 4 Cols: Features & Delivery Callout from app6.jpeg */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Aptek İnteqrasiyasının Üstünlükləri</span>
            </h3>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <span className="font-bold text-slate-900">Reseptin skan edilməsi:</span> Əlyazma və ya QR kodlu elektron reseptin avtomatik oxunması.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <span className="font-bold text-slate-900">İnteqrasiya olunmuş aptek şəbəkəsi:</span> Avromed, Zeytun, Qazarmed və Buta Aptek.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <span className="font-bold text-slate-900">Real vaxtda qiymət və mövcudluq:</span> Ən sərfəli variantın müqayisə ilə seçilməsi.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <span className="font-bold text-slate-900">Onlayn ödəniş:</span> Kart, nağd və ya mobil tətbiq üzərindən.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <span className="font-bold text-slate-900">Dron vasitəsilə çatdırılma:</span> Təcili dərmanların 15-20 dəqiqəyə kəndə çatdırılması.
                </div>
              </li>
            </ul>
          </div>

          {/* Dronla Çatdırılma Banner Widget */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-4 border border-teal-500/30">
            <div className="flex items-center gap-2 mb-2 text-cyan-300 font-bold text-xs">
              <Plane className="w-4 h-4 text-cyan-400" />
              <span>Dronla Təcili Çatdırılma</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Soyuq zəncir tələb edən və təcili preparatlar xüsusi izotermik qutuda Ağdam mərkəzindən Papravəndə 
              uçuş koridoru ilə göndərilir.
            </p>
            <button
              onClick={onGoToDroneDelivery}
              className="w-full py-2 px-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Uçuş Radarına Bax</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
