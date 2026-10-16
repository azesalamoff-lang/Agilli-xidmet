import React, { useState, useEffect } from 'react';
import {
  Plane,
  Compass,
  BatteryCharging,
  Thermometer,
  Wind,
  Gauge,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { INITIAL_DRONE_TELEMETRY } from '../data/mockData.ts';
import { validateDroneFlight } from '../utils/serviceRules.ts';
import type { DroneTelemetry } from '../types.ts';

interface DroneDeliveryViewProps {
  onVoiceAnnounce?: (msg: string) => void;
}

export const DroneDeliveryView: React.FC<DroneDeliveryViewProps> = ({ onVoiceAnnounce }) => {
  const [telemetry, setTelemetry] = useState<DroneTelemetry>(INITIAL_DRONE_TELEMETRY);
  const [isSimulating, setIsSimulating] = useState(true);
  const [progressPercent, setProgressPercent] = useState(65);

  const safetyCheck = validateDroneFlight(
    telemetry.payloadKg,
    telemetry.windSpeedMs,
    telemetry.batteryPercent,
    telemetry.maxPayloadKg
  );

  // Flight simulation loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setProgressPercent(prev => {
        if (prev >= 100) {
          setTelemetry(t => ({ ...t, status: 'Çatdırıldı', estimatedMinutesArrival: 0 }));
          return 100;
        }
        const next = prev + 1;
        const remainingMin = Math.max(1, Math.ceil((100 - next) / 10));
        setTelemetry(t => ({
          ...t,
          status: 'Uçuşda',
          estimatedMinutesArrival: remainingMin,
          batteryPercent: Math.max(20, t.batteryPercent - 0.1)
        }));
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleRestartMission = () => {
    setProgressPercent(10);
    setTelemetry({
      ...INITIAL_DRONE_TELEMETRY,
      status: 'Uçuşda',
      estimatedMinutesArrival: 9,
      batteryPercent: 95
    });
    setIsSimulating(true);
    onVoiceAnnounce?.('Yeni dron çatdırılma marşrutu başladıldı. Ağdam mərkəzindən Papravəndə uçuş icra olunur.');
  };

  return (
    <div className="space-y-6">
      {/* Banner matching Image 7 (app7.jpeg) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-sky-500/30">
        {/* Snowy Caucasus village background backdrop */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-screen bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517299321909-50939c812752?auto=format&fit=crop&w=1600&q=80')`
          }}
        />

        <div className="relative p-6 sm:p-8 z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-xs font-semibold backdrop-blur-md">
              <Plane className="w-3.5 h-3.5 text-cyan-300" />
              <span>Avtonom Hava Nəqliyyatı Koridoru</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Dronla Çatdırılma
            </h2>
            <p className="text-sky-200 text-xs sm:text-sm leading-relaxed">
              Qış aylarında yollar qarla örtüldükdə və ya təbii relyef çətinliyi zamanı, 
              dərman və zəruri ərzaq mallarının 15-20 dəqiqə ərzində ucqar kəndlərə operativ daşınması.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRestartMission}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Simulyasiyanı Yenilə</span>
            </button>
          </div>
        </div>
      </div>

      {/* Telemetry Dashboard & Flight Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Flight Radar Map Simulation */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-5 border border-slate-800 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-bold text-xs text-cyan-300">Uçuş Radarı: Ağdam - Papravənd Hava Xətti</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              ETA: {telemetry.estimatedMinutesArrival} dəqiqə
            </span>
          </div>

          {/* Radar Screen Area */}
          <div className="relative h-72 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4">
            {/* Radar concentric rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-48 h-48 rounded-full border border-cyan-400"></div>
              <div className="w-32 h-32 rounded-full border border-cyan-400 absolute"></div>
              <div className="w-16 h-16 rounded-full border border-cyan-400 absolute"></div>
            </div>

            {/* Top labels */}
            <div className="flex justify-between items-center z-10 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5 text-sky-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Çıxış: Ağdam Logistika Mərkəzi</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Təyinat: Papravənd Köşkü</span>
              </div>
            </div>

            {/* Flight Path Line */}
            <div className="relative my-auto z-10">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Drone Icon moving along flight path */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
                style={{ left: `${Math.min(95, Math.max(5, progressPercent))}%` }}
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_20px_#22d3ee] animate-bounce">
                    <Plane className="w-5 h-5 text-slate-950" />
                  </div>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono whitespace-nowrap bg-slate-900/90 border border-slate-700 px-1.5 py-0.5 rounded text-cyan-200">
                    {telemetry.speedKmh} km/saat
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Coordinates */}
            <div className="flex justify-between items-center z-10 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
              <span>Hündürlük: {telemetry.flightAltitudeM} m</span>
              <span className="text-cyan-400 font-bold">Status: {telemetry.status}</span>
              <span>GPS: 40.0984° N, 46.9742° E</span>
            </div>
          </div>

          {/* Safety check summary banner */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">Bütün uçuş təhlükəsizlik parametrləri normadadır.</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
              UÇUŞA İCAZƏ VERİLDİ
            </span>
          </div>
        </div>

        {/* Right 5 Cols: Real-time Telemetry Gauges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <Gauge className="w-4 h-4 text-cyan-600" />
              <span>Real-vaxt Telemetriya Göstəriciləri</span>
            </h3>

            <div className="space-y-3">
              {/* Battery */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <BatteryCharging className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Batareya Ehtiyatı</div>
                    <div className="text-[10px] text-slate-500">Avtonom uçuş vaxtı: 38 dəq</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-emerald-600">{telemetry.batteryPercent.toFixed(0)}%</div>
                  <span className="text-[10px] text-slate-400">Min: 25%</span>
                </div>
              </div>

              {/* Cargo Weight */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Yükün Çəkisi</div>
                    <div className="text-[10px] text-slate-500">Maksimal limit: {telemetry.maxPayloadKg} kq</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-slate-900">{telemetry.payloadKg.toFixed(2)} kq</div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Təhlükəsiz hədd</span>
                </div>
              </div>

              {/* Cargo Temp */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Konteyner Temperaturu</div>
                    <div className="text-[10px] text-slate-500">Soyuq zəncir (Dərmanlar üçün)</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-teal-700">+{telemetry.cargoTempC}°C</div>
                  <span className="text-[10px] text-slate-400">İzotermik qutu</span>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Küləyin Sürəti</div>
                    <div className="text-[10px] text-slate-500">Maksimum icazə: 12 m/s</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-slate-900">{telemetry.windSpeedMs} m/s</div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Uçuş üçün əlverişli</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
