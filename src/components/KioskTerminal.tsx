import React, { useState } from 'react';
import {
  Fingerprint,
  Camera,
  CheckCircle2,
  Building2,
  HeartPulse,
  Pill,
  ShoppingCart,
  Volume2,
  Sparkles,
  UserCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import type { CitizenProfile, AppTab } from '../types.ts';
import { speakPrompt } from '../utils/voiceAssistant.ts';

interface KioskTerminalProps {
  citizen: CitizenProfile;
  isLoggedIn: boolean;
  onLogin: () => void;
  onNavigateTab: (tab: AppTab) => void;
  voiceEnabled: boolean;
}

export const KioskTerminal: React.FC<KioskTerminalProps> = ({
  citizen,
  isLoggedIn,
  onLogin,
  onNavigateTab,
  voiceEnabled
}) => {
  const [authStep, setAuthStep] = useState<'idle' | 'fingerprint' | 'face' | 'authenticated'>(
    isLoggedIn ? 'authenticated' : 'idle'
  );
  const [currentPrompt, setCurrentPrompt] = useState<string>(
    'Xoş gəlmisiniz! Şəxsi kabinetinizə daxil olmaq üçün biometrik identifikasiyadan keçin.'
  );

  const handleStartAuth = () => {
    setAuthStep('fingerprint');
    setCurrentPrompt('Zəhmət olmasa, barmağınızı skanerə yerləşdirin.');
    if (voiceEnabled) {
      speakPrompt('fingerprint_prompt');
    }
  };

  const handleFingerprintScanned = () => {
    setAuthStep('face');
    setCurrentPrompt('Şəxsiyyətinizi təsdiqləmək üçün kameraya baxın.');
    if (voiceEnabled) {
      speakPrompt('face_prompt');
    }
  };

  const handleFaceRecognized = () => {
    setAuthStep('authenticated');
    onLogin();
    setCurrentPrompt('Xoş gəlmisiniz, Rəşad bəy! Zəhmət olmasa, almaq istədiyiniz xidməti seçin.');
    if (voiceEnabled) {
      speakPrompt('service_select');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Physical Terminal Frame Emulation */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 border-4 border-slate-700 shadow-2xl text-white relative">
        {/* Terminal Header Banner */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              AI
            </div>
            <div>
              <div className="font-black text-base sm:text-lg tracking-wide text-white">
                AĞILLI MOBİL XİDMƏT KÖŞKÜ
              </div>
              <div className="text-xs text-sky-400 font-mono">
                Stansiya: Papravənd (Ağdam) • Köşk № 04
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono text-emerald-400">CANLI BAĞLANTI</span>
          </div>
        </div>

        {/* AI Voice & Visual Guidance Bar (Prominent requirement from Section 2) */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-sky-400/30 flex items-center gap-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 animate-pulse">
            <Volume2 className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">
              Süni İntellekt Səsli və Vizual Təlimatı:
            </div>
            <div className="text-sm font-semibold text-white mt-0.5">
              “{currentPrompt}”
            </div>
          </div>
        </div>

        {/* Auth Screen / State */}
        {authStep !== 'authenticated' ? (
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-8 text-center space-y-6">
            {authStep === 'idle' && (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="w-20 h-20 rounded-full bg-blue-600/20 border-2 border-blue-500/40 text-blue-400 mx-auto flex items-center justify-center">
                  <UserCheck className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Biometrik İdentifikasiya</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Üz tanıma və ya barmaq izi ilə şəxsi kabinetinizə sürətli və təhlükəsiz giriş.
                  </p>
                </div>
                <button
                  onClick={handleStartAuth}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 font-bold text-sm shadow-lg shadow-blue-600/30 cursor-pointer transition-all"
                >
                  Giriş etmək üçün toxunun
                </button>
              </div>
            )}

            {authStep === 'fingerprint' && (
              <div className="space-y-5 max-w-md mx-auto">
                <div
                  onClick={handleFingerprintScanned}
                  className="w-28 h-28 rounded-2xl bg-sky-500/10 border-2 border-dashed border-sky-400 text-sky-400 mx-auto flex flex-col items-center justify-center cursor-pointer hover:bg-sky-500/20 transition-all group"
                >
                  <Fingerprint className="w-16 h-16 group-hover:scale-110 transition-transform animate-pulse" />
                  <span className="text-[10px] font-bold mt-1 uppercase tracking-wider text-sky-300">Toxunun</span>
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Barmaq İzi Skaneri</h4>
                  <p className="text-xs text-slate-400">
                    Skaner panelinə sağ şəhadət barmağınızı qoyun və ya simulyasiya üçün toxunun.
                  </p>
                </div>
              </div>
            )}

            {authStep === 'face' && (
              <div className="space-y-5 max-w-md mx-auto">
                <div
                  onClick={handleFaceRecognized}
                  className="w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-400 mx-auto relative cursor-pointer shadow-lg shadow-emerald-500/20 group"
                >
                  <img src={citizen.avatarUrl} alt="Üz tanıma kamerası" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors">
                    <Camera className="w-8 h-8 text-white animate-bounce" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Üz Tanıma (Kamera)</h4>
                  <p className="text-xs text-slate-400">
                    Başınızı düz saxlayaraq kameraya baxın. Təsdiq üçün toxunun.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Authenticated Dashboard / Service Selection matching app3 screen */
          <div className="space-y-6">
            {/* User Greeting pill */}
            <div className="flex items-center justify-between bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={citizen.avatarUrl}
                  alt={citizen.fullName}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-400"
                />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Xoş gəlmisiniz,</div>
                  <h3 className="font-bold text-base text-white">{citizen.fullName}</h3>
                  <div className="text-[11px] text-sky-400 font-mono">FİN: {citizen.finCode} • Ağdam / Papravənd</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  Biometrik İdentifikasiya: Təsdiqləndi
                </span>
              </div>
            </div>

            {/* 4 Primary Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Service 1: Dövlət xidmətləri */}
              <button
                onClick={() => onNavigateTab('state_services')}
                className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/40 hover:border-blue-400 text-left hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-white text-base mb-1">1. Dövlət Xidmətləri</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    ASAN xidmət, Ədliyyə Nazirliyi, Şəxsiyyət vəsiqəsi, Pasport, Doğum və Nikah arayışları, Etibarnamə.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-400">
                  <span>Xidmətlərə daxil ol</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Service 2: MediSkaner */}
              <button
                onClick={() => onNavigateTab('mediscan')}
                className="p-5 rounded-2xl bg-gradient-to-br from-rose-900/40 to-slate-900 border border-rose-500/40 hover:border-rose-400 text-left hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-rose-600/30 text-rose-400 flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-white text-base mb-1">2. MediSkaner Müayinəsi</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Bütün bədənin kontaktsız skanı, təzyiq, SpO2, şəkər, keçmiş tarixlə müqayisə və Ağdam RMX elektron göndərişi.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <span>Kapsulaya daxil ol</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Service 3: Aptek şəbəkəsi */}
              <button
                onClick={() => onNavigateTab('pharmacy')}
                className="p-5 rounded-2xl bg-gradient-to-br from-teal-900/40 to-slate-900 border border-teal-500/40 hover:border-teal-400 text-left hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-600/30 text-teal-400 flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Pill className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-white text-base mb-1">3. Aptek Şəbəkəsi</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Avromed, Zeytun, Qazarmed, Buta. Reseptin skan edilməsi, qiymət müqayisəsi və dronla təcili çatdırılma.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-teal-400">
                  <span>Dərman seç və sifariş et</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Service 4: Market şəbəkəsi */}
              <button
                onClick={() => onNavigateTab('market')}
                className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-left hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-white text-base mb-1">4. Market Şəbəkəsi</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Bravo, Rahat, Araz, OBA. Ərzaq, süd, təzə çörək, meyvə-tərəvəz və gündəlik təchizat malları.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <span>Marketi aç</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
