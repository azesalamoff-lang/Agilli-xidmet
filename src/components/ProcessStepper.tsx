import React from 'react';
import { UserCheck, Grid, FileEdit, CreditCard, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProcessStepperProps {
  currentStep?: number;
  onSelectStep?: (stepIndex: number) => void;
}

export const ProcessStepper: React.FC<ProcessStepperProps> = ({
  currentStep = 1,
  onSelectStep
}) => {
  const steps = [
    {
      num: 1,
      title: 'Giriş',
      desc: 'Sima tanıma və ya barmaqizi',
      icon: UserCheck,
      color: 'from-blue-600 to-sky-600'
    },
    {
      num: 2,
      title: 'Xidmət seçimi',
      desc: 'Dövlət xidməti, MediSkaner, Aptek və ya Market',
      icon: Grid,
      color: 'from-sky-600 to-cyan-600'
    },
    {
      num: 3,
      title: 'Müraciət / Sifariş',
      desc: 'Sənəd qəbulu, skan, məhsul seçimi',
      icon: FileEdit,
      color: 'from-cyan-600 to-teal-600'
    },
    {
      num: 4,
      title: 'Ödəniş',
      desc: 'Kart, nağd və ya onlayn',
      icon: CreditCard,
      color: 'from-teal-600 to-emerald-600'
    },
    {
      num: 5,
      title: 'Nəticə',
      desc: 'Sənədin çapı və ya dronla çatdırılma',
      icon: CheckCircle2,
      color: 'from-emerald-600 to-green-600'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-extrabold text-blue-950 flex items-center gap-2">
          <span>İstifadə prosesi (ümumi)</span>
        </h2>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          5 sadə addım
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.num;
          const isPassed = currentStep > step.num;
          const Icon = step.icon;

          return (
            <div key={step.num} className="relative flex flex-col">
              <button
                onClick={() => onSelectStep?.(step.num)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all h-full flex flex-col justify-between ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                    : isPassed
                    ? 'border-emerald-300 bg-emerald-50/40 text-slate-700'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-xs ${
                        isPassed
                          ? 'bg-emerald-600'
                          : isActive
                          ? 'bg-blue-600 ring-2 ring-blue-300'
                          : 'bg-slate-400'
                      }`}
                    >
                      {step.num}
                    </div>

                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-blue-600' : isPassed ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    />
                  </div>

                  <h3 className={`text-sm font-bold ${isActive ? 'text-blue-950' : 'text-slate-900'}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-snug line-clamp-2">
                    {step.desc}
                  </p>
                </div>

                {isActive && (
                  <div className="mt-2 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                    <span>Aktiv mərhələ</span>
                  </div>
                )}
              </button>

              {/* Arrow separator on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
