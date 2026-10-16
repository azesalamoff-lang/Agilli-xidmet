import type { HealthVitals, HealthComparisonResult, CartItem } from '../types.ts';

export interface HealthRiskSummary {
  riskScore: number; // 0-100
  riskCategory: 'Aşağı / Sağlam' | 'Orta / Nəzarət tələb olunur' | 'Yüksək / Həkimə müraciət tövsiyə edilir';
  alerts: string[];
  recommendation: string;
  referralRecommended: boolean;
}

/**
 * Evaluates health risk based on clinical vitals.
 */
export function evaluateHealthRisks(vitals: HealthVitals): HealthRiskSummary {
  const alerts: string[] = [];
  let riskScore = 0;

  // Blood Pressure check
  if (vitals.systolicBP >= 140 || vitals.diastolicBP >= 90) {
    alerts.push(`Yüksək qan təzyiqi müşahidə olunur: ${vitals.systolicBP}/${vitals.diastolicBP} mmHg`);
    riskScore += 35;
  } else if (vitals.systolicBP <= 90 || vitals.diastolicBP <= 60) {
    alerts.push(`Aşağı qan təzyiqi (hipotoniya): ${vitals.systolicBP}/${vitals.diastolicBP} mmHg`);
    riskScore += 20;
  }

  // Pulse check
  if (vitals.pulse > 100) {
    alerts.push(`Taxikardiya (yüksək nəbz): ${vitals.pulse} vurğu/dəq`);
    riskScore += 20;
  } else if (vitals.pulse < 55) {
    alerts.push(`Bradikardiya (aşağı nəbz): ${vitals.pulse} vurğu/dəq`);
    riskScore += 15;
  }

  // Oxygen saturation (SpO2)
  if (vitals.spo2 < 93) {
    alerts.push(`Təhlükəli dərəcədə aşağı oksigen səviyyəsi: %${vitals.spo2}`);
    riskScore += 45;
  } else if (vitals.spo2 < 95) {
    alerts.push(`Sərhəd oksigen səviyyəsi: %${vitals.spo2}`);
    riskScore += 15;
  }

  // Blood glucose
  if (vitals.bloodGlucose > 7.0) {
    alerts.push(`Yüksək qan şəkəri: ${vitals.bloodGlucose} mmol/L`);
    riskScore += 25;
  } else if (vitals.bloodGlucose < 3.5) {
    alerts.push(`Hipoglikemiya (aşağı şəkər): ${vitals.bloodGlucose} mmol/L`);
    riskScore += 30;
  }

  // Body Temperature
  if (vitals.temperature > 37.8) {
    alerts.push(`Qızdırma: ${vitals.temperature}°C`);
    riskScore += 25;
  }

  let riskCategory: HealthRiskSummary['riskCategory'] = 'Aşağı / Sağlam';
  let recommendation = 'Bütün əsas göstəricilər qənaətbəxşdir. Sağlam həyat tərzinizi davam etdirin.';
  let referralRecommended = false;

  if (riskScore >= 40) {
    riskCategory = 'Yüksək / Həkimə müraciət tövsiyə edilir';
    recommendation = 'Göstəricilərdə normadan kənaraçıxmalar aşkarlandı. Rayon Mərkəzi Xəstəxanasına elektron göndəriş təklif olunur.';
    referralRecommended = true;
  } else if (riskScore >= 20) {
    riskCategory = 'Orta / Nəzarət tələb olunur';
    recommendation = 'Bəzi göstəricilər həddə yaxındır. Dincəlmək, maye qəbul etmək və 1 həftə sonra təkrar skan məsləhətdir.';
    referralRecommended = false;
  }

  return {
    riskScore: Math.min(riskScore, 100),
    riskCategory,
    alerts,
    recommendation,
    referralRecommended
  };
}

/**
 * Compares current scan results with previous historical record.
 */
export function compareHealthHistories(current: HealthVitals, previous: HealthVitals): HealthComparisonResult[] {
  const comparisons: HealthComparisonResult[] = [];

  // Pulse
  const pulseDiff = current.pulse - previous.pulse;
  comparisons.push({
    vital: 'Nəbz (Ürək döyüntüsü)',
    current: `${current.pulse} bpm`,
    previous: `${previous.pulse} bpm`,
    change: pulseDiff === 0 ? 'Dəyişməz' : `${pulseDiff > 0 ? '+' : ''}${pulseDiff} bpm`,
    status: Math.abs(pulseDiff) > 15 ? 'warning' : 'normal',
    note: pulseDiff > 0 ? 'Əvvəlki aya nisbətən artıb' : pulseDiff < 0 ? 'Əvvəlki aya nisbətən azalıb' : 'Stabil'
  });

  // Blood Pressure
  const sysDiff = current.systolicBP - previous.systolicBP;
  comparisons.push({
    vital: 'Qan təzyiqi',
    current: `${current.systolicBP}/${current.diastolicBP} mmHg`,
    previous: `${previous.systolicBP}/${previous.diastolicBP} mmHg`,
    change: `${sysDiff > 0 ? '+' : ''}${sysDiff} mmHg (sistolik)`,
    status: current.systolicBP >= 140 ? 'alert' : Math.abs(sysDiff) >= 15 ? 'warning' : 'normal',
    note: current.systolicBP >= 140 ? 'Yüksək təzyiq müşahidə edilir' : 'Norma daxilindədir'
  });

  // SpO2
  const spo2Diff = current.spo2 - previous.spo2;
  comparisons.push({
    vital: 'Oksigen (SpO2)',
    current: `%${current.spo2}`,
    previous: `%${previous.spo2}`,
    change: `${spo2Diff > 0 ? '+' : ''}${spo2Diff}%`,
    status: current.spo2 < 95 ? 'warning' : 'normal',
    note: current.spo2 >= 96 ? 'Əla tənəffüs göstəricisi' : 'Diqqət yetirilməlidir'
  });

  // Glucose
  const glucoseDiff = Number((current.bloodGlucose - previous.bloodGlucose).toFixed(1));
  comparisons.push({
    vital: 'Qan şəkəri',
    current: `${current.bloodGlucose} mmol/L`,
    previous: `${previous.bloodGlucose} mmol/L`,
    change: `${glucoseDiff > 0 ? '+' : ''}${glucoseDiff} mmol/L`,
    status: current.bloodGlucose > 6.5 ? 'warning' : 'normal',
    note: current.bloodGlucose > 6.5 ? 'Göstərici normadan yüksəkdir' : 'Normadadır'
  });

  return comparisons;
}

/**
 * Validates drone dispatch safety conditions
 */
export function validateDroneFlight(
  payloadKg: number,
  windSpeedMs: number,
  batteryPercent: number,
  maxPayloadKg: number = 5.0
): { canFly: boolean; reason?: string } {
  if (batteryPercent < 25) {
    return { canFly: false, reason: 'Batareya səviyyəsi təhlükəsiz uçuş üçün kifayət deyil (minimum 25%).' };
  }
  if (payloadKg > maxPayloadKg) {
    return { canFly: false, reason: `Yük həddi aşıldı! Maksimum icazə: ${maxPayloadKg} kq, hazırkı çəki: ${payloadKg.toFixed(2)} kq.` };
  }
  if (windSpeedMs > 12.0) {
    return { canFly: false, reason: `Küləyin sürəti (${windSpeedMs} m/s) təhlükəsiz uçuş limitindən (12 m/s) yüksəkdir.` };
  }
  return { canFly: true };
}

/**
 * Calculates cart totals including drone dispatch logistics
 */
export function calculateOrderTotals(
  items: CartItem[],
  deliveryMethod: 'drone' | 'kiosk_pickup',
  droneFlightFee: number = 2.50
): {
  subtotal: number;
  totalWeightKg: number;
  deliveryFee: number;
  totalAmount: number;
  itemCount: number;
} {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWeightKg = items.reduce((sum, item) => sum + (item.weightKg || 0.25) * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'drone' ? droneFlightFee : 0;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal: Number(subtotal.toFixed(2)),
    totalWeightKg: Number(totalWeightKg.toFixed(2)),
    deliveryFee: Number(deliveryFee.toFixed(2)),
    totalAmount: Number((subtotal + deliveryFee).toFixed(2)),
    itemCount
  };
}
