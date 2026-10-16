import React, { useState } from 'react';
import {
  Building2,
  CheckCircle,
  FileText,
  Printer,
  Camera,
  Fingerprint,
  CreditCard,
  Download,
  Sparkles,
  QrCode,
  ShieldCheck,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STATE_SERVICES } from '../data/mockData.ts';
import type { StateServiceDoc, CitizenProfile } from '../types.ts';

interface StateServicesViewProps {
  citizen: CitizenProfile;
  onVoiceAnnounce?: (msg: string) => void;
}

export const StateServicesView: React.FC<StateServicesViewProps> = ({
  citizen,
  onVoiceAnnounce
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Hamısı');
  const [activeDoc, setActiveDoc] = useState<StateServiceDoc | null>(null);
  const [applyStep, setApplyStep] = useState<'details' | 'biometrics' | 'payment' | 'printed'>('details');
  const [isProcessing, setIsProcessing] = useState(false);
  const [electronicSign, setElectronicSign] = useState(false);
  const [photoReady, setPhotoReady] = useState(true);

  const categories = [
    'Hamısı',
    'ASAN xidmət',
    'Ədliyyə Nazirliyi',
    'Daxili İşlər Nazirliyi',
    'Əmək və Əhalinin Sosial Müdafiəsi Nazirliyi',
    'İqtisadiyyat Nazirliyi'
  ];

  const filteredDocs = selectedCategory === 'Hamısı'
    ? STATE_SERVICES
    : STATE_SERVICES.filter(doc => doc.category === selectedCategory);

  const handleStartApply = (doc: StateServiceDoc) => {
    setActiveDoc(doc);
    setApplyStep('details');
    setElectronicSign(false);
    onVoiceAnnounce?.(`Siz ${doc.title} xidmətini seçdiniz. Sənədin hazırlanması üçün məlumatları təsdiqləyin.`);
  };

  const handleProceedToBiometrics = () => {
    setApplyStep('biometrics');
    onVoiceAnnounce?.('Zəhmət olmasa, biometrik identifikasiya və kamera yoxlamasını təsdiq edin.');
  };

  const handleProceedToPayment = () => {
    setApplyStep('payment');
    onVoiceAnnounce?.('Dövlət rüsumunun ödəniş mərhələsi. Kart və ya nağd üsulunu seçin.');
  };

  const handleCompleteAndPrint = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setApplyStep('printed');
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      onVoiceAnnounce?.('Sənədiniz uğurla rəsmiləşdirildi və dərhal çap olunur!');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner matching Image 3 (app3.jpeg) */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-sky-200 border border-sky-400/30 text-xs font-semibold">
              <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs text-white">1</span>
              <span>Xidmət sahələri və iş prinsipi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Building2 className="w-7 h-7 text-sky-400" />
              <span>Dövlət xidmətləri</span>
            </h2>
            <p className="text-sky-200 text-xs sm:text-sm max-w-2xl">
              ASAN xidmət, Ədliyyə Nazirliyi, Daxili İşlər Nazirliyi, Əmək və Əhalinin Sosial Müdafiəsi Nazirliyi 
              və İqtisadiyyat Nazirliyi xidmətlərinin ucqar məntəqədə avtomatlaşdırılmış rəqəmsal köşk vasitəsilə həyata keçirilməsi.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs space-y-1.5 self-start md:self-auto">
            <div className="text-sky-300 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dövlət İnteqrasiyası</span>
            </div>
            <div className="text-slate-200">ASAN Pay, Hökumət Ödəniş Portalı</div>
            <div className="text-slate-300 text-[11px]">Yerində çap və QR rəqəmsal təsdiq</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      {!activeDoc ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 Cols: Kiosk Screen & Document Selector */}
          <div className="lg:col-span-8 space-y-4">
            {/* Category Filter Pills (matching screen on app3.jpeg) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Document Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredDocs.map(doc => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {doc.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {doc.description}
                    </p>

                    <div className="space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-2 mb-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dövlət rüsumu:</span>
                        <span className="font-bold text-slate-900">
                          {doc.fee === 0 ? 'Ödənişsiz' : `${doc.fee.toFixed(2)} ₼`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">İcra müddəti:</span>
                        <span className="font-medium text-slate-700">{doc.processingTime}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartApply(doc)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Müraciət et və Çap et</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right 4 Cols: Bullet points & Features list from app3.jpeg */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>İş Prinsipi və Təminatlar</span>
              </h3>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Sima tanıma və ya barmaqizi ilə giriş:</span> Vətəndaş dərhal sistem tərəfindən tanınır.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Şəxsi kabinetin avtomatik yaradılması:</span> Bütün müraciətlər bir bazada toplanır.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Sənəd müraciətinin qəbulu:</span> Şəxsiyyət vəsiqəsi, vətəndaş pasportu, doğum qeydiyyatı, nikah və etibarnamə.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Şəklin çəkilməsi və biometrik qəbul:</span> Daxili İCAO standartlı kamera ilə anında foto.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Ödəniş və elektron imza:</span> Nağd, bank kartı və ya ASAN Pay ilə dərhal ödəniş.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Hazır sənədin yerində çapı:</span> Müdafiə nişanlı xüsusi blankda çap və təhvil.
                  </div>
                </li>
              </ul>
            </div>

              {/* Sample Document Thumbnails (as shown on app3.jpeg right side) */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800">
                <div className="text-xs font-semibold text-slate-300 mb-2">Hazır Sənəd Nümunələri:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-[10px]">ID</div>
                    <span className="truncate">Şəxsiyyət vəsiqəsi</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-[10px]">PAS</div>
                    <span className="truncate">Vətəndaş pasportu</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-[10px]">DĞ</div>
                    <span className="truncate">Doğum şəhadətnaməsi</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-[10px]">ETB</div>
                    <span className="truncate">Etibarnamə</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      ) : (
        /* Document Application Flow / Stepper */
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm max-w-3xl mx-auto">
          {/* Header of Active Form */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <button
              onClick={() => setActiveDoc(null)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Geri qayıt</span>
            </button>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-600">{activeDoc.category}</span>
              <h3 className="font-extrabold text-slate-900 text-lg">{activeDoc.title}</h3>
            </div>
          </div>

          {/* Step 1: Details confirmation */}
          {applyStep === 'details' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-900 space-y-1">
                <span className="font-bold">Avtomatik identifikasiya:</span> Vətəndaşın biometrik məlumatları dövlət reyestrindən daxil edildi.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Soyadı, Adı və Ata adı</label>
                  <input
                    type="text"
                    readOnly
                    value={citizen.fullName}
                    className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">FİN kod</label>
                  <input
                    type="text"
                    readOnly
                    value={citizen.finCode}
                    className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Qeydiyyat ünvanı</label>
                  <input
                    type="text"
                    readOnly
                    value={citizen.address}
                    className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-800 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Əlaqə nömrəsi</label>
                  <input
                    type="text"
                    readOnly
                    value={citizen.phone}
                    className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-800 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleProceedToBiometrics}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Məlumatları təsdiqlə və Davam et</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Biometrics & Photo Verification */}
          {applyStep === 'biometrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Photo Check */}
                <div className="p-4 rounded-xl border border-slate-200 text-center space-y-3">
                  <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-emerald-500 relative shadow-inner">
                    <img src={citizen.avatarUrl} alt="Vətəndaş fotosu" className="w-full h-full object-cover" />
                    <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Biometrik Kamera</h4>
                    <p className="text-[11px] text-slate-500">ICAO standartı təsdiqləndi</p>
                  </div>
                  <button
                    onClick={() => setPhotoReady(true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-blue-600" />
                    <span>Şəkli Yenilə</span>
                  </button>
                </div>

                {/* Fingerprint Scanner */}
                <div className="p-4 rounded-xl border border-slate-200 text-center space-y-3">
                  <div className="w-24 h-24 mx-auto rounded-xl bg-sky-50 border-2 border-sky-400 flex items-center justify-center text-sky-600 shadow-inner">
                    <Fingerprint className="w-12 h-12 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Barmaq İzi Skaneri</h4>
                    <p className="text-[11px] text-emerald-600 font-semibold">Daktiloskopik uyğunluq: %99.8</p>
                  </div>
                  <label className="flex items-center justify-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={electronicSign}
                      onChange={e => setElectronicSign(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Elektron imzanı təsdiq edirəm</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  onClick={() => setApplyStep('details')}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Geri
                </button>
                <button
                  disabled={!electronicSign}
                  onClick={handleProceedToPayment}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                    electronicSign
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Ödənişə keç ({activeDoc.fee === 0 ? 'Ödənişsiz' : `${activeDoc.fee.toFixed(2)} ₼`})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {applyStep === 'payment' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Xidmət üzrə rüsum:</div>
                  <div className="text-lg font-black text-slate-900">
                    {activeDoc.fee === 0 ? '0.00 ₼ (Dövlət tərəfindən ödənişsiz)' : `${activeDoc.fee.toFixed(2)} ₼`}
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Hökumət Ödəniş Portalı
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border-2 border-blue-600 bg-blue-50/40 cursor-pointer flex flex-col items-center justify-center text-center">
                  <CreditCard className="w-6 h-6 text-blue-600 mb-1" />
                  <span className="text-xs font-bold text-blue-900">Bank Kartı / ASAN Pay</span>
                  <span className="text-[10px] text-blue-700">Toxunuşla dərhal ödəniş</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer flex flex-col items-center justify-center text-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs mb-1">₼</div>
                  <span className="text-xs font-bold text-slate-800">Köşkdə Nağd Ödəniş</span>
                  <span className="text-[10px] text-slate-500">Əskinaz qəbuledici</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  onClick={() => setApplyStep('biometrics')}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Geri
                </button>
                <button
                  onClick={handleCompleteAndPrint}
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isProcessing ? 'Sənəd təsdiqlənir...' : 'Təsdiqlə və Çap et'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Printed Ready Document */}
          {applyStep === 'printed' && (
            <div className="space-y-6">
              {/* Official Document Preview Card */}
              <div className="border-4 border-double border-slate-300 rounded-xl p-6 bg-amber-50/20 text-slate-900 space-y-4 shadow-sm relative overflow-hidden">
                <div className="text-center border-b-2 border-slate-300 pb-3">
                  <div className="w-10 h-10 mx-auto rounded-full bg-blue-950 text-white flex items-center justify-center font-bold text-xs mb-1">
                    AZE
                  </div>
                  <h4 className="font-black text-sm tracking-wide text-slate-900">
                    {activeDoc.sampleTemplate.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Mərkəz: Ağdam - Papravənd Modul Köşkü № 04
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {Object.entries(activeDoc.sampleTemplate.fields).map(([key, val]) => (
                    <div key={key} className="border-b border-slate-200 pb-1">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">{key}</span>
                      <span className="font-bold text-slate-900">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-10 h-10 text-slate-800" />
                    <div className="text-[10px] text-slate-600">
                      <div>Rəqəmsal QR kodu ilə təsdiq olunub</div>
                      <div className="font-mono text-emerald-700 font-bold">VERIFIED: OK</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-blue-900">{activeDoc.sampleTemplate.stampType}</div>
                    <div className="text-[9px] text-slate-400">Verilmə anı: 16.10.2026 09:42</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setActiveDoc(null);
                    setApplyStep('details');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Yeni sənəd seçin
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      confetti({ particleCount: 30, spread: 50 });
                      alert('Sənəd köşk daxili lazer printerinə göndərildi. Təhvil gözündən götürün.');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Təkrar Çap</span>
                  </button>
                  <button
                    onClick={() => {
                      alert('PDF formatında rəsmi elektron nüsxə yükləndi.');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF Yüklə</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
