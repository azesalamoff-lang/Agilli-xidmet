import React from 'react';
import {
  X,
  User,
  Fingerprint,
  Camera,
  FileText,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import type { CitizenProfile } from '../types.ts';
import { CURRENT_VITALS } from '../data/mockData.ts';

interface CitizenCabinetModalProps {
  isOpen: boolean;
  onClose: () => void;
  citizen: CitizenProfile;
}

export const CitizenCabinetModal: React.FC<CitizenCabinetModalProps> = ({
  isOpen,
  onClose,
  citizen
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-emerald-400">
              <img src={citizen.avatarUrl} alt={citizen.fullName} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">{citizen.fullName}</h3>
              <p className="text-xs text-sky-200 font-mono">FİN: {citizen.finCode} • Şəxsi Kabinet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Biometric Verification Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-emerald-950">Üz Tanıma</div>
                <div className="text-[10px] text-emerald-700">ICAO Standartı Təsdiqli</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <div className="font-bold text-blue-950">Barmaq İzi</div>
                <div className="text-[10px] text-blue-700">Daktiloskopik Aktiv</div>
              </div>
            </div>
          </div>

          {/* Citizen Bio Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
              <span className="text-slate-500">Doğum Tarixi:</span>
              <span className="font-bold text-slate-800">{citizen.birthDate}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
              <span className="text-slate-500">Qan Qrupu:</span>
              <span className="font-bold text-slate-800">{citizen.bloodType}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
              <span className="text-slate-500">Əlaqə:</span>
              <span className="font-bold text-slate-800">{citizen.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ünvan:</span>
              <span className="font-bold text-slate-800 text-right">{citizen.address}</span>
            </div>
          </div>

          {/* Recent MediSkaner Health Card */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-rose-950">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>Son MediSkaner Nəticəsi</span>
              </div>
              <span className="text-[10px] text-slate-500">{CURRENT_VITALS.scanDate}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-white p-2 rounded-lg border border-rose-100">
                <div className="text-[10px] text-slate-400">Nəbz</div>
                <div className="font-black text-slate-800">{CURRENT_VITALS.pulse} bpm</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-rose-100">
                <div className="text-[10px] text-slate-400">Təzyiq</div>
                <div className="font-black text-slate-800">{CURRENT_VITALS.systolicBP}/{CURRENT_VITALS.diastolicBP}</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-rose-100">
                <div className="text-[10px] text-slate-400">SpO2</div>
                <div className="font-black text-slate-800">%{CURRENT_VITALS.spo2}</div>
              </div>
            </div>
          </div>

          {/* Active Documents Archive */}
          <div className="space-y-2">
            <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Elektron Dövlət Sənədləri Portfeli</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Şəxsiyyət vəsiqəsi (Yeni Nəsil)</div>
                  <div className="text-[10px] text-slate-400">AA 1849204 • Qüvvədədir</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Aktiv</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Doğum haqqında şəhadətnamə</div>
                  <div className="text-[10px] text-slate-400">Qeydiyyat №: 104/2026-AZ</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">Reyestrdə</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer hover:bg-slate-800 transition-colors"
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
};
