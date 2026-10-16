export type AppTab = 
  | 'overview'
  | 'kiosk'
  | 'state_services'
  | 'mediscan'
  | 'pharmacy'
  | 'market'
  | 'drone'
  | 'resources';

export interface CitizenProfile {
  finCode: string;
  fullName: string;
  birthDate: string;
  phone: string;
  address: string;
  bloodType: string;
  avatarUrl: string;
  photoVerified: boolean;
  fingerprintVerified: boolean;
}

export interface StateServiceDoc {
  id: string;
  title: string;
  category: 
    | 'ASAN xidmət' 
    | 'Ədliyyə Nazirliyi' 
    | 'Daxili İşlər Nazirliyi' 
    | 'Əmək və Əhalinin Sosial Müdafiəsi Nazirliyi' 
    | 'İqtisadiyyat Nazirliyi';
  fee: number;
  processingTime: string;
  requirements: string[];
  description: string;
  iconName: string;
  sampleTemplate: {
    title: string;
    fields: Record<string, string>;
    stampType: string;
  };
}

export interface HealthVitals {
  pulse: number; // bpm (60-100)
  systolicBP: number; // mmHg (90-120)
  diastolicBP: number; // mmHg (60-80)
  spo2: number; // % (95-100)
  temperature: number; // °C (36.0 - 37.2)
  bloodGlucose: number; // mmol/L (4.0 - 6.0)
  stressLevel: 'Normal' | 'Yüksək' | 'Kritik';
  scanDate: string;
}

export interface HealthComparisonResult {
  vital: string;
  current: number | string;
  previous: number | string;
  change: string;
  status: 'normal' | 'warning' | 'alert';
  note: string;
}

export interface PharmacyItem {
  id: string;
  name: string;
  dosage: string;
  count: string;
  price: number;
  pharmacy: 'Avromed' | 'Zeytun' | 'Qazarmed' | 'Buta Aptek';
  requiresPrescription: boolean;
  category: string;
  stock: number;
  image: string;
}

export interface MarketItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  market: 'Bravo' | 'Rahat' | 'Araz' | 'OBA';
  category: 'Qida məhsulları' | 'Meyvə-tərəvəz' | 'Məişət təmizliyi' | 'Uşaq məhsulları';
  stock: number;
  weightKg: number;
  image: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  provider: string;
  type: 'medicine' | 'grocery' | 'service';
  weightKg?: number;
}

export interface DroneTelemetry {
  droneId: string;
  model: string;
  status: 'Hazır' | 'Uçuşda' | 'Çatdırıldı' | 'Yüklənir';
  batteryPercent: number;
  payloadKg: number;
  maxPayloadKg: number;
  cargoTempC: number;
  windSpeedMs: number;
  flightAltitudeM: number;
  speedKmh: number;
  currentLocation: {
    lat: number;
    lng: number;
    locationName: string;
  };
  destination: {
    lat: number;
    lng: number;
    locationName: string;
  };
  estimatedMinutesArrival: number;
}
