import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateHealthRisks,
  compareHealthHistories,
  validateDroneFlight,
  calculateOrderTotals
} from './serviceRules.ts';
import type { HealthVitals, CartItem } from '../types.ts';

test('evaluateHealthRisks classifies normal vitals as low risk', () => {
  const normalVitals: HealthVitals = {
    pulse: 72,
    systolicBP: 118,
    diastolicBP: 78,
    spo2: 98,
    temperature: 36.6,
    bloodGlucose: 5.2,
    stressLevel: 'Normal',
    scanDate: '2026-10-15'
  };

  const result = evaluateHealthRisks(normalVitals);
  assert.equal(result.riskCategory, 'Aşağı / Sağlam');
  assert.equal(result.referralRecommended, false);
  assert.equal(result.alerts.length, 0);
});

test('evaluateHealthRisks flags hypertension and low SpO2 as high risk', () => {
  const criticalVitals: HealthVitals = {
    pulse: 108,
    systolicBP: 155,
    diastolicBP: 98,
    spo2: 91,
    temperature: 38.2,
    bloodGlucose: 8.4,
    stressLevel: 'Kritik',
    scanDate: '2026-10-15'
  };

  const result = evaluateHealthRisks(criticalVitals);
  assert.equal(result.riskCategory, 'Yüksək / Həkimə müraciət tövsiyə edilir');
  assert.equal(result.referralRecommended, true);
  assert.ok(result.riskScore >= 40);
  assert.ok(result.alerts.length >= 3);
});

test('compareHealthHistories correctly tracks changes between scans', () => {
  const current: HealthVitals = {
    pulse: 82,
    systolicBP: 130,
    diastolicBP: 85,
    spo2: 97,
    temperature: 36.6,
    bloodGlucose: 5.8,
    stressLevel: 'Normal',
    scanDate: '2026-10-15'
  };

  const previous: HealthVitals = {
    pulse: 72,
    systolicBP: 120,
    diastolicBP: 80,
    spo2: 98,
    temperature: 36.5,
    bloodGlucose: 5.1,
    stressLevel: 'Normal',
    scanDate: '2026-09-15'
  };

  const comparisons = compareHealthHistories(current, previous);
  assert.equal(comparisons.length, 4);

  const pulseComp = comparisons.find(c => c.vital.includes('Nəbz'));
  assert.ok(pulseComp);
  assert.equal(pulseComp.change, '+10 bpm');

  const bpComp = comparisons.find(c => c.vital.includes('Qan təzyiqi'));
  assert.ok(bpComp);
  assert.equal(bpComp.change, '+10 mmHg (sistolik)');
});

test('validateDroneFlight enforces battery, payload and wind constraints', () => {
  // Valid flight
  assert.deepEqual(validateDroneFlight(2.5, 6.0, 85), { canFly: true });

  // Low battery
  const lowBat = validateDroneFlight(2.0, 5.0, 15);
  assert.equal(lowBat.canFly, false);
  assert.ok(lowBat.reason?.includes('Batareya'));

  // Overweight
  const overweight = validateDroneFlight(6.2, 5.0, 90, 5.0);
  assert.equal(overweight.canFly, false);
  assert.ok(overweight.reason?.includes('Yük həddi'));

  // High wind
  const highWind = validateDroneFlight(2.0, 15.0, 90);
  assert.equal(highWind.canFly, false);
  assert.ok(highWind.reason?.includes('Küləyin sürəti'));
});

test('calculateOrderTotals computes correct sums with drone delivery fee', () => {
  const items: CartItem[] = [
    { id: '1', title: 'Paracetamol', price: 5.20, quantity: 2, provider: 'Avromed', type: 'medicine', weightKg: 0.1 },
    { id: '2', title: 'Süd 1L', price: 2.30, quantity: 1, provider: 'Bravo', type: 'grocery', weightKg: 1.0 }
  ];

  const withDrone = calculateOrderTotals(items, 'drone', 2.50);
  assert.equal(withDrone.subtotal, 12.70); // 5.20*2 + 2.30 = 12.70
  assert.equal(withDrone.deliveryFee, 2.50);
  assert.equal(withDrone.totalAmount, 15.20);
  assert.equal(withDrone.totalWeightKg, 1.20);
  assert.equal(withDrone.itemCount, 3);

  const withPickup = calculateOrderTotals(items, 'kiosk_pickup', 2.50);
  assert.equal(withPickup.deliveryFee, 0);
  assert.equal(withPickup.totalAmount, 12.70);
});
