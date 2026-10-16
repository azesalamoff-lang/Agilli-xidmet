import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HeroOverview } from './components/HeroOverview.tsx';
import { ProcessStepper } from './components/ProcessStepper.tsx';
import { KioskTerminal } from './components/KioskTerminal.tsx';
import { StateServicesView } from './components/StateServicesView.tsx';
import { MediScanView } from './components/MediScanView.tsx';
import { PharmacyView } from './components/PharmacyView.tsx';
import { MarketView } from './components/MarketView.tsx';
import { DroneDeliveryView } from './components/DroneDeliveryView.tsx';
import { ResourcesRiskView } from './components/ResourcesRiskView.tsx';
import { CartModal } from './components/CartModal.tsx';
import { CitizenCabinetModal } from './components/CitizenCabinetModal.tsx';
import { INITIAL_CITIZEN } from './data/mockData.ts';
import { speakPrompt } from './utils/voiceAssistant.ts';
import type { AppTab, CartItem, CitizenProfile } from './types.ts';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('overview');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [citizen, setCitizen] = useState<CitizenProfile>(INITIAL_CITIZEN);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [systemNotice, setSystemNotice] = useState<string | null>(null);

  const handleToggleVoice = () => {
    const nextState = !voiceEnabled;
    setVoiceEnabled(nextState);
    if (nextState) {
      speakPrompt('welcome');
    }
  };

  const handleVoiceAnnounce = (msg: string) => {
    setSystemNotice(msg);
    setTimeout(() => {
      setSystemNotice(null);
    }, 4500);

    if (voiceEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(msg);
        utterance.lang = 'tr-TR';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Speech error:', e);
      }
    }
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (method: 'drone' | 'kiosk_pickup') => {
    if (method === 'drone') {
      setCurrentTab('drone');
      handleVoiceAnnounce('Sifarişiniz təsdiqləndi! Dron dərhal Papravənd kəndinə yola salınır.');
    } else {
      handleVoiceAnnounce('Sifarişiniz təsdiqləndi! Köşkün təhvil gözündən götürə bilərsiniz.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 selection:bg-sky-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={tab => {
          setCurrentTab(tab);
          if (tab === 'kiosk') setActiveStep(1);
          if (tab === 'state_services') setActiveStep(2);
          if (tab === 'mediscan') setActiveStep(2);
          if (tab === 'pharmacy') setActiveStep(3);
          if (tab === 'market') setActiveStep(3);
          if (tab === 'drone') setActiveStep(5);
        }}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleToggleVoice}
        citizen={citizen}
        isLoggedIn={isLoggedIn}
        onOpenProfile={() => setIsProfileOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating System Voice Subtitle Banner */}
      {systemNotice && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md bg-slate-900/95 text-white border border-sky-400/40 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-2">
          <div className="w-8 h-8 rounded-full bg-sky-500/30 text-sky-300 flex items-center justify-center shrink-0">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
          </div>
          <div className="text-xs">
            <span className="font-bold text-sky-300 block text-[10px] uppercase tracking-wider">
              Süni İntellekt Səsli Köməkçi
            </span>
            <span>{systemNotice}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Process Stepper shown on Overview and Kiosk views */}
        {(currentTab === 'overview' || currentTab === 'kiosk') && (
          <ProcessStepper
            currentStep={activeStep}
            onSelectStep={stepNum => {
              setActiveStep(stepNum);
              if (stepNum === 1) setCurrentTab('kiosk');
              if (stepNum === 2) setCurrentTab('state_services');
              if (stepNum === 3) setCurrentTab('pharmacy');
              if (stepNum === 4) setIsCartOpen(true);
              if (stepNum === 5) setCurrentTab('drone');
            }}
          />
        )}

        {/* Dynamic View rendering based on active tab */}
        {currentTab === 'overview' && (
          <div className="space-y-6">
            <HeroOverview
              onNavigateTab={tab => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            
            {/* Quick 4-Pillar Grid Cards matching Images 3, 4, 5, 6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                onClick={() => setCurrentTab('state_services')}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Dövlət xidmətləri</h3>
                <p className="text-xs text-slate-500 mb-3">
                  ASAN xidmət, Ədliyyə Nazirliyi, şəxsiyyət vəsiqəsi, doğum və nikah qeydiyyatı, etibarnamə.
                </p>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ətraflı keçid →
                </span>
              </div>

              <div 
                onClick={() => setCurrentTab('mediscan')}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-rose-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">MediSkaner</h3>
                <p className="text-xs text-slate-500 mb-3">
                  Bütün bədənin kontaktsız skanı, vital orqan analizi, əvvəlki tarixlə müqayisə və xəstəxana göndərişi.
                </p>
                <span className="text-xs font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Müayinəyə keçid →
                </span>
              </div>

              <div 
                onClick={() => setCurrentTab('pharmacy')}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Aptek şəbəkəsi</h3>
                <p className="text-xs text-slate-500 mb-3">
                  Avromed, Zeytun, Qazarmed, Buta. Reseptin skan edilməsi, qiymət müqayisəsi və dron çatdırılması.
                </p>
                <span className="text-xs font-bold text-teal-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Dərman sifarişi →
                </span>
              </div>

              <div 
                onClick={() => setCurrentTab('market')}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  4
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Market şəbəkəsi</h3>
                <p className="text-xs text-slate-500 mb-3">
                  Bravo, Rahat, Araz, OBA. Ərzaq, meyvə-tərəvəz, süd məhsulları və gündəlik təchizat.
                </p>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Kataloqa baxış →
                </span>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'kiosk' && (
          <KioskTerminal
            citizen={citizen}
            isLoggedIn={isLoggedIn}
            onLogin={() => setIsLoggedIn(true)}
            onNavigateTab={tab => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            voiceEnabled={voiceEnabled}
          />
        )}

        {currentTab === 'state_services' && (
          <StateServicesView
            citizen={citizen}
            onVoiceAnnounce={handleVoiceAnnounce}
          />
        )}

        {currentTab === 'mediscan' && (
          <MediScanView
            citizen={citizen}
            onVoiceAnnounce={handleVoiceAnnounce}
          />
        )}

        {currentTab === 'pharmacy' && (
          <PharmacyView
            onAddToCart={handleAddToCart}
            onVoiceAnnounce={handleVoiceAnnounce}
            onGoToDroneDelivery={() => setCurrentTab('drone')}
          />
        )}

        {currentTab === 'market' && (
          <MarketView
            onAddToCart={handleAddToCart}
            onVoiceAnnounce={handleVoiceAnnounce}
            onOpenCart={() => setIsCartOpen(true)}
            onGoToDroneDelivery={() => setCurrentTab('drone')}
          />
        )}

        {currentTab === 'drone' && (
          <DroneDeliveryView
            onVoiceAnnounce={handleVoiceAnnounce}
          />
        )}

        {currentTab === 'resources' && (
          <ResourcesRiskView />
        )}
      </main>

      {/* Cart Drawer / Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
        citizen={citizen}
      />

      {/* Citizen Cabinet Modal */}
      <CitizenCabinetModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        citizen={citizen}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              AI
            </div>
            <div>
              <div className="font-bold text-slate-900">Ağıllı Mobil Xidmət Mərkəzi</div>
              <div className="text-[11px] text-slate-400">
                Ucqar ərazilərdə dövlət xidmətləri, sağlamlıq, aptek və market əlçatanlığı vahid məkanda
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            <div>Pilot Layihə: Ağdam rayonu, Papravənd kəndi</div>
            <div>Dron Logistika & Biometrik Süni İntellekt Sistemi © 2026</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
