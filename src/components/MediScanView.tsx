import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Send,
  Calendar,
  Sparkles,
  User,
  Clock,
  FileCheck,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { CURRENT_VITALS, PREVIOUS_VITALS } from '../data/mockData.ts';
import { evaluateHealthRisks, compareHealthHistories } from '../utils/serviceRules.ts';
import type { CitizenProfile, HealthVitals } from '../types.ts';

interface MediScanViewProps {
  citizen: CitizenProfile;
  onVoiceAnnounce?: (msg: string) => void;
}

export const MediScanView: React.FC<MediScanViewProps> = ({ citizen, onVoiceAnnounce }) => {
  const [currentVitals, setCurrentVitals] = useState<HealthVitals>(CURRENT_VITALS);
  const [previousVitals] = useState<HealthVitals>(PREVIOUS_VITALS);
  const [isScanning, setIsScanning] = useState(false);
  const [activeZone, setActiveZone] = useState<'all' | 'heart' | 'lungs' | 'vessels'>('all');
  const [referralSent, setReferralSent] = useState(false);

  const riskAssessment = evaluateHealthRisks(currentVitals);
  const comparisons = compareHealthHistories(currentVitals, previousVitals);

  const handleStartScan = () => {
    setIsScanning(true);
    setReferralSent(false);
    onVoiceAnnounce?.('MediSkaner başladıldı, nəticələr tezliklə göstəriləcək');

    setTimeout(() => {
      // Simulate slight variation in fresh scan
      setCurrentVitals({
        ...currentVitals,
        pulse: Math.floor(70 + Math.random() * 8),
        systolicBP: Math.floor(118 + Math.random() * 6),
        spo2: Math.min(100, Math.floor(97 + Math.random() * 3)),
        scanDate: new Date().toLocaleDateString('az-AZ', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
      setIsScanning(false);
      onVoiceAnnounce?.('Müayinə tamamlandı. Göstəriciləriniz normadadır, əvvəlki ayla müqayisəli hesabat hazırdır.');
    }, 2000);
  };

  const handleSendReferral = () => {
    setReferralSent(true);
    onVoiceAnnounce?.('Elektron göndəriş Ağdam Rayon Mərkəzi Xəstəxanasına göndərildi.');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner matching Image 4 (app4.jpeg) */}
      <div className="bg-gradient-to-r from-rose-900 via-pink-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30 text-xs font-semibold">
              <span className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center font-bold text-xs text-white">2</span>
              <span>Ağıllı tibbi skaner və tele-tibb xidməti</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <HeartPulse className="w-7 h-7 text-rose-400" />
              <span>MediSkaner</span>
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm max-w-2xl">
              Ucqar kənddə yaşayan vətəndaşın xəstəxanaya getmədən bütün orqanizm göstəricilərinin 
              süni intellektlə skan edilməsi, vaxt üzrə müqayisəsi və elektron göndəriş sistemi.
            </p>
          </div>

          <button
            onClick={handleStartScan}
            disabled={isScanning}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-900/40 cursor-pointer self-start md:self-auto transition-transform hover:scale-105"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Skan edilir...' : 'Yeni Skan Başlat'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Body Telemetry + Vitals & History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Cols: Futuristic Body Hologram Kiosk Visual matching app4.jpeg */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-5 border border-cyan-500/30 shadow-xl text-white relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
              <span className="text-xs font-bold text-cyan-300">MediSkaner Kapsulu № 01</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Status: {isScanning ? 'SKAN EDİLİR' : 'ONLAYN'}</span>
          </div>

          {/* Interactive Anatomical Holographic Model */}
          <div className="relative h-80 rounded-xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Grid & Scan lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan shadow-[0_0_15px_#22d3ee]"></div>
            )}

            {/* Human Silhouette SVG with Glowing Organ Targets */}
            <div className="relative w-48 h-72 flex items-center justify-center">
              <svg viewBox="0 0 100 180" className="w-full h-full text-cyan-500/40 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                {/* Body Outline */}
                <circle cx="50" cy="20" r="10" fill="currentColor" />
                <path d="M42 32 C38 38, 25 50, 20 80 C19 86, 25 88, 27 82 C30 65, 38 48, 42 45 L42 100 L35 165 C34 172, 42 172, 44 165 L50 115 L56 165 C58 172, 66 172, 65 165 L58 100 L58 45 C62 48, 70 65, 73 82 C75 88, 81 86, 80 80 C75 50, 62 38, 58 32 Z" fill="currentColor" />
                
                {/* Organs Glow Targets */}
                {/* Heart */}
                <circle cx="53" cy="50" r="4" className="fill-rose-500 animate-pulse cursor-pointer" onClick={() => setActiveZone('heart')} />
                {/* Lungs */}
                <ellipse cx="44" cy="52" rx="3" ry="6" className="fill-cyan-400/80 cursor-pointer" onClick={() => setActiveZone('lungs')} />
                <ellipse cx="58" cy="52" rx="3" ry="6" className="fill-cyan-400/80 cursor-pointer" onClick={() => setActiveZone('lungs')} />
                {/* Brain / Head */}
                <circle cx="50" cy="20" r="5" className="fill-indigo-400/70" />
                {/* Vessels / Arteries */}
                <line x1="50" y1="56" x2="50" y2="95" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2,2" />
              </svg>

              {/* HUD Sensor Labels */}
              <div className="absolute top-4 right-0 text-[10px] bg-slate-900/90 border border-slate-700 rounded px-2 py-1 text-cyan-300">
                EKQ: Stabil
              </div>
              <div className="absolute bottom-16 left-0 text-[10px] bg-slate-900/90 border border-slate-700 rounded px-2 py-1 text-rose-300">
                SpO2: %{currentVitals.spo2}
              </div>
            </div>
          </div>

          {/* Bullets directly from Image 4 */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs space-y-2 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Barmaqizi ilə sistemə təhlükəsiz giriş</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Bütün bədənin kontaktsız skan edilməsi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Mümkün risklərin ilkin analizi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Ağdam Rayon Mərkəzi Xəstəxanasına elektron göndəriş</span>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Real-time Vitals & Historical Comparison (Section 5) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Current Vitals Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Pulse */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-semibold">Nəbz (Ürək)</span>
                <HeartPulse className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-xl font-black text-slate-900">{currentVitals.pulse} <span className="text-xs font-normal text-slate-500">bpm</span></div>
              <span className="text-[11px] text-emerald-600 font-medium">Norma: 60-90</span>
            </div>

            {/* Blood Pressure */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-semibold">Qan Təzyiqi</span>
                <Activity className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {currentVitals.systolicBP}/{currentVitals.diastolicBP}
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">mmHg (Optimal)</span>
            </div>

            {/* SpO2 */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-semibold">Oksigen (SpO2)</span>
                <span className="text-xs font-bold text-cyan-600">O₂</span>
              </div>
              <div className="text-xl font-black text-slate-900">%{currentVitals.spo2}</div>
              <span className="text-[11px] text-emerald-600 font-medium">Kafi: ≥ %95</span>
            </div>

            {/* Temperature */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-semibold">Hərarət</span>
                <span className="text-xs font-bold text-amber-600">°C</span>
              </div>
              <div className="text-xl font-black text-slate-900">{currentVitals.temperature}°C</div>
              <span className="text-[11px] text-emerald-600 font-medium">Normal bədən temperaturu</span>
            </div>

            {/* Blood Glucose */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-semibold">Qan Şəkəri</span>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-xl font-black text-slate-900">{currentVitals.bloodGlucose} <span className="text-xs font-normal text-slate-500">mmol/L</span></div>
              <span className="text-[11px] text-emerald-600 font-medium">Norma: 4.1 - 5.9</span>
            </div>

            {/* Stress / Status */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-semibold">Ümumi Risk</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-base font-black text-emerald-600">Stabil</div>
              <span className="text-[11px] text-slate-500">Kritik təhlükə yoxdur</span>
            </div>
          </div>

          {/* Section 5 Feature: Əvvəlki məlumatların yadda saxlanılması və müqayisəsi */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Şəxsi Sağlamlıq Tarixçəsi və Müqayisə</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Əvvəlki müayinə: {previousVitals.scanDate} vs İndiki skan: {currentVitals.scanDate}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                AI Dinamika İzləmə
              </span>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="pb-2 font-semibold">Göstərici</th>
                    <th className="pb-2 font-semibold">Əvvəlki ay</th>
                    <th className="pb-2 font-semibold">İndiki nəticə</th>
                    <th className="pb-2 font-semibold">Fərq</th>
                    <th className="pb-2 font-semibold">Status / Rəy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisons.map(item => (
                    <tr key={item.vital} className="hover:bg-slate-50/60">
                      <td className="py-2.5 font-bold text-slate-800">{item.vital}</td>
                      <td className="py-2.5 text-slate-500">{item.previous}</td>
                      <td className="py-2.5 font-bold text-slate-900">{item.current}</td>
                      <td className="py-2.5 font-semibold text-blue-600">{item.change}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700">
                          {item.note}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* AI Clinical Summary */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-blue-900">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Süni İntellekt Qiymətləndirməsi:</span>
              </div>
              <p className="leading-relaxed">
                {riskAssessment.recommendation} Əvvəlki müayinə ilə müqayisədə qan təzyiqində 13 mmHg azalma müşahidə 
                olunub və norma səviyyəsinə qayıdıb. Ürək-damar ritmi stabildir.
              </p>
            </div>

            {/* Referral / Tele-medicine action */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-slate-600" />
                <span>İnteqrasiya olunmuş tibb məntəqəsi: Ağdam RMX</span>
              </div>

              {referralSent ? (
                <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Elektron göndəriş uğurla göndərildi</span>
                </div>
              ) : (
                <button
                  onClick={handleSendReferral}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Həkimə göndəriş tərtib et</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
