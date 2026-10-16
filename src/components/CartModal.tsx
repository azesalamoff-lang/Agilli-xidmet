import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plane,
  CreditCard,
  ShoppingBag,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateOrderTotals, validateDroneFlight } from '../utils/serviceRules.ts';
import type { CartItem, CitizenProfile } from '../types.ts';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (method: 'drone' | 'kiosk_pickup') => void;
  citizen: CitizenProfile;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  citizen
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'drone' | 'kiosk_pickup'>('drone');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'asan_pay'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totals = calculateOrderTotals(items, deliveryMethod, 2.50);
  const droneCheck = validateDroneFlight(totals.totalWeightKg, 4.2, 88);

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
      onOrderSuccess(deliveryMethod);
      onClearCart();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Sifariş Səbəti</h3>
              <p className="text-xs text-slate-500">{items.length} adda məhsul</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {items.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-slate-600">Səbətiniz boşdur</p>
              <p className="text-xs text-slate-400">Aptek və ya market bölməsindən məhsul əlavə edin.</p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl p-2 bg-slate-50/50">
                {items.map(item => (
                  <div key={item.id} className="py-2.5 px-2 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.provider} • {item.quantity} ədəd × {item.price.toFixed(2)} ₼
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-xs text-slate-900">
                        {(item.price * item.quantity).toFixed(2)} ₼
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Option Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Çatdırılma növü:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setDeliveryMethod('drone')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      deliveryMethod === 'drone'
                        ? 'border-cyan-500 bg-cyan-50/70 ring-2 ring-cyan-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Plane className={`w-4 h-4 ${deliveryMethod === 'drone' ? 'text-cyan-600' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100 px-1.5 py-0.5 rounded">
                        +2.50 ₼
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900">Dronla Çatdırılma</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">15-20 dəq (Papravənd)</div>
                  </button>

                  <button
                    onClick={() => setDeliveryMethod('kiosk_pickup')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      deliveryMethod === 'kiosk_pickup'
                        ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <MapPin className={`w-4 h-4 ${deliveryMethod === 'kiosk_pickup' ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        0.00 ₼
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900">Köşkdən Götürmə</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Mərkəzdə dərhal təhvil</div>
                  </button>
                </div>

                {deliveryMethod === 'drone' && !droneCheck.canFly && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{droneCheck.reason}</span>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Ödəniş üsulu:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Bank Kartı
                  </button>
                  <button
                    onClick={() => setPaymentMethod('asan_pay')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'asan_pay'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ASAN Pay
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === 'cash'
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Köşkdə Nağd
                  </button>
                </div>
              </div>

              {/* Order Totals Summary */}
              <div className="p-4 rounded-xl bg-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Məhsulların dəyəri:</span>
                  <span className="font-bold text-slate-900">{totals.subtotal.toFixed(2)} ₼</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Ümumi çəki:</span>
                  <span>{totals.totalWeightKg.toFixed(2)} kq</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Çatdırılma xərci:</span>
                  <span className="font-bold text-slate-900">
                    {totals.deliveryFee === 0 ? 'Ödənişsiz' : `${totals.deliveryFee.toFixed(2)} ₼`}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Yekun Ödəniləcək:</span>
                  <span className="text-blue-600 text-base">{totals.totalAmount.toFixed(2)} ₼</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Davam et
            </button>
            <button
              disabled={isSubmitting || (deliveryMethod === 'drone' && !droneCheck.canFly)}
              onClick={handleConfirmOrder}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Sifariş rəsmiləşdirilir...' : `Ödənişi Təsdiqlə (${totals.totalAmount.toFixed(2)} ₼)`}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
