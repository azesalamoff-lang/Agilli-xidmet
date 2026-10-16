import type {
  CitizenProfile,
  StateServiceDoc,
  HealthVitals,
  PharmacyItem,
  MarketItem,
  DroneTelemetry
} from '../types.ts';

export const INITIAL_CITIZEN: CitizenProfile = {
  finCode: '7A9BX24',
  fullName: 'Rəşad Əliyev Məmməd oğlu',
  birthDate: '14.05.1984',
  phone: '+994 50 482 19 02',
  address: 'Ağdam rayonu, Papravənd kəndi, ev 42',
  bloodType: 'A (II) Rh+',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  photoVerified: true,
  fingerprintVerified: true
};

export const STATE_SERVICES: StateServiceDoc[] = [
  // 1. ASAN xidmət
  {
    id: 'passport',
    title: 'Ümumvətəndaş Pasportu',
    category: 'ASAN xidmət',
    fee: 25.0,
    processingTime: '1 iş günü (Dronla çatdırılma və ya köşkdən götürmə)',
    requirements: ['Şəxsiyyət vəsiqəsi', 'Biometrik foto', 'Dövlət rüsumu'],
    description: 'Xaricə getmək üçün beynəlxalq biometrik ümumvətəndaş pasportunun rəsmiləşdirilməsi.',
    iconName: 'BookOpen',
    sampleTemplate: {
      title: 'AZERBAIJAN REPUBLIC PASSPORT',
      fields: {
        'Passport No': 'P 9382104',
        'Surname / Name': 'ALIYEV RASHAD',
        'Nationality': 'AZE',
        'Date of Birth': '14 MAY 1984',
        'Issuing Authority': 'ASAN Mobil Köşk 04'
      },
      stampType: 'BEYNƏLXALQ BİOMETRİK ÇİP TƏSDİQİ'
    }
  },

  // 2. Ədliyyə Nazirliyi
  {
    id: 'birth_cert',
    title: 'Doğumun qeydə alınması',
    category: 'Ədliyyə Nazirliyi',
    fee: 0.0,
    processingTime: 'Dərhal (Yerində təsdiq və çap)',
    requirements: ['Valideynlərin şəxsiyyət vəsiqələri', 'Tibbi doğum arayışı', 'Nikah haqqında şəhadətnamə'],
    description: 'Yeni doğulmuş uşağın dövlət qeydiyyatına alınması və doğum şəhadətnaməsinin anında verilməsi.',
    iconName: 'Baby',
    sampleTemplate: {
      title: 'DOĞUM HAQQINDA ŞƏHADƏTNAMƏ',
      fields: {
        'Uşağın adı': 'Əliyeva Leyla Rəşad qızı',
        'Doğulduğu yer': 'Ağdam rayonu, Papravənd kəndi',
        'Doğum tarixi': '10.10.2026',
        'Akt qeydi №': '104/2026-AZ',
        'Qeydiyyat şöbəsi': 'Ədliyyə Nazirliyi Qeydiyyat Şöbəsi'
      },
      stampType: 'ƏDLİYYƏ NAZİRLİYİ DÖVLƏT GERBLİ MÖHRÜ'
    }
  },
  {
    id: 'marriage_cert',
    title: 'Nikahın qeydə alınması',
    category: 'Ədliyyə Nazirliyi',
    fee: 10.0,
    processingTime: 'Dərhal (QR kodlu rəsmi şəhadətnamə)',
    requirements: ['Tərəflərin razılığı', 'Şəxsiyyəti təsdiq edən sənədlər', 'Tibbi arayış'],
    description: 'Rəsmi nikahın dövlət qeydiyyatına alınması və nikah şəhadətnaməsinin dərhal çıxarılması.',
    iconName: 'HeartHandshake',
    sampleTemplate: {
      title: 'NİKAH HAQQINDA ŞƏHADƏTNAMƏ',
      fields: {
        'Ər': 'Əliyev Rəşad Məmməd oğlu',
        'Arvad': 'Əliyeva (Qasımova) Nigar Elçin qızı',
        'Qeydiyyat tarixi': '22.08.2015',
        'Akt qeydi №': 'NK-773190',
        'Qeydiyyat orqanı': 'Ədliyyə Nazirliyi VVAQ şöbəsi'
      },
      stampType: 'RƏQƏMSAL TƏSDİQ MÖHRÜ'
    }
  },
  {
    id: 'divorce_cert',
    title: 'Nikahın pozulmasının qeydə alınması',
    category: 'Ədliyyə Nazirliyi',
    fee: 15.0,
    processingTime: 'Dərhal (Elektron reyestr arayışı)',
    requirements: ['Məhkəmə qətnaməsi və ya qarşılıqlı razılıq ərizəsi', 'Şəxsiyyət vəsiqəsi'],
    description: 'Nikahın pozulmasının rəsmi dövlət qeydiyyatına alınması və şəhadətnamənin təqdim edilməsi.',
    iconName: 'FileX',
    sampleTemplate: {
      title: 'NİKAHIN POZULMASI HAQQINDA ŞƏHADƏTNAMƏ',
      fields: {
        'Keçmiş ər': 'Məmmədov İlqar Samir oğlu',
        'Keçmiş arvad': 'Məmmədova Günel Əli qızı',
        'Pozulma əsası': 'Məhkəmə qətnaməsi № 2-108/2026',
        'Qeydiyyat tarixi': '05.10.2026'
      },
      stampType: 'ƏDLİYYƏ QEYDİYYAT ŞÖBƏSİ MÖHRÜ'
    }
  },
  {
    id: 'death_cert',
    title: 'Ölümün qeydə alınması',
    category: 'Ədliyyə Nazirliyi',
    fee: 0.0,
    processingTime: 'Dərhal (Ödənişsiz rəsmi arayış)',
    requirements: ['Həkim ölüm arayışı', 'Vəfat etmiş şəxsin şəxsiyyət vəsiqəsi'],
    description: 'Ölüm faktının dövlət qeydiyyatına alınması və ölüm haqqında şəhadətnamənin verilməsi.',
    iconName: 'FileHeart',
    sampleTemplate: {
      title: 'ÖLÜM HAQQINDA ŞƏHADƏTNAMƏ',
      fields: {
        'Vəfat edən şəxs': 'Əliyev Məmməd Qasım oğlu',
        'Doğum tarixi': '12.03.1948',
        'Vəfat tarixi': '11.10.2026',
        'Akt qeydi №': 'ÖL-4091/2026',
        'Dövlət orqanı': 'Ədliyyə Nazirliyi Qeydiyyat Şöbəsi'
      },
      stampType: 'DÖVLƏT GERBLİ VVAQ MÖHRÜ'
    }
  },
  {
    id: 'notary_service',
    title: 'Notariat',
    category: 'Ədliyyə Nazirliyi',
    fee: 8.0,
    processingTime: '3 dəqiqə (Video təsdiq, surət təsdiqi və etibarnamə)',
    requirements: ['Biometrik identifikasiya', 'Əsl sənədin skanı', 'Elektron imza'],
    description: 'Etibarnamələrin verilməsi, sənədlərin surətinin təsdiqi, müqavilələrin notarial rəsmiləşdirilməsi.',
    iconName: 'Scale',
    sampleTemplate: {
      title: 'NOTARİAT HƏRƏKƏTİ HAQQINDA ŞƏHADƏTNAMƏ',
      fields: {
        'Hərəkətin növü': 'Sənəd surətinin və etibarnamənin rəsmi təsdiqi',
        'Müraciət edən': 'Əliyev Rəşad Məmməd oğlu (FİN: 7A9BX24)',
        'Notariat reyestr №': 'NT-55928/2026',
        'Elektron notariat kodu': 'E-NOTARY-AZ-2026'
      },
      stampType: 'ELEKTRON NOTARİUS İMZASI VƏ ŞTAMPI'
    }
  },

  // 3. Daxili İşlər Nazirliyi
  {
    id: 'din_id_replace',
    title: 'Şəxsiyyət vəsiqələrinin dəyişdirilməsi',
    category: 'Daxili İşlər Nazirliyi',
    fee: 5.0,
    processingTime: 'Dərhal (Köşkdə biometrik yoxlama, çap və təhvil)',
    requirements: ['Köhnə vəsiqənin skanı', 'Biometrik foto çəkilişi', 'Barmaq izi skanı'],
    description: 'Müddəti bitmiş, zədələnmiş və ya itirilmiş yeni nəsil biometrik şəxsiyyət vəsiqəsinin dəyişdirilməsi.',
    iconName: 'ShieldAlert',
    sampleTemplate: {
      title: 'AZƏRBAYCAN RESPUBLİKASI DAXİLİ İŞLƏR NAZİRLİYİ',
      fields: {
        'Sənəd': 'YENİ NƏSİL BİOMETRİK ŞƏXSİYYƏT VƏSİQƏSİ',
        'Soyadı, Adı': 'ƏLİYEV RƏŞAD MƏMMƏD OĞLU',
        'FİN': '7A9BX24',
        'Seriya və Nömrə': 'AA 1849204',
        'Verilmə səbəbi': 'Vaxtın bitməsi ilə əlaqədar dəyişdirilmə',
        'Qeydiyyat ünvanı': 'Ağdam rayonu, Papravənd kəndi',
        'Verən orqan': 'DİN Baş Pasport, Qeydiyyat və Miqrasiya İdarəsi'
      },
      stampType: 'DİN BAŞ PASPORT İDARƏSİ MÖHRÜ VƏ ÇİP'
    }
  },

  // 4. Əmək və Əhalinin Sosial Müdafiəsi Nazirliyi
  {
    id: 'sosial_medical_results',
    title: 'Sonuncu tibbi müayinə nəticələri',
    category: 'Əmək və Əhalinin Sosial Müdafiəsi Nazirliyi',
    fee: 0.0,
    processingTime: 'Dərhal (Elektron sağlamlıq və ekspertiza arayışı)',
    requirements: ['Şəxsiyyət vəsiqəsi', 'Elektron imza'],
    description: 'Tibbi-sosial ekspertiza, əlillik dərəcəsi və sonuncu profilaktik/dispanser müayinə nəticələri haqqında rəsmi elektron çıxarış.',
    iconName: 'FileCheck',
    sampleTemplate: {
      title: 'TİBBİ-SOSİAL EKSPERTİZA VƏ SAĞLAMLIQ ARAYIŞI',
      fields: {
        'Vətəndaş': 'Əliyev Rəşad Məmməd oğlu (FİN: 7A9BX24)',
        'Müayinə tarixi': '16.10.2026',
        'Sağlamlıq vəziyyəti': 'Qənaətbəxş (Fiziki məhdudiyyət yoxdur)',
        'Dispanser qeydiyyatı': 'Yoxdur',
        'Təsdiq edən alt sistem': 'TƏBİB və ƏƏSMN Mərkəzləşdirilmiş Elektron İnformasiya Sistemi'
      },
      stampType: 'ƏƏSMN MEİS ELEKTRON QR KODLU REJİM'
    }
  },
  {
    id: 'sosial_pension',
    title: 'Pensiyaların təyin edilməsi',
    category: 'Əmək və Əhalinin Sosial Müdafiəsi Nazirliyi',
    fee: 0.0,
    processingTime: 'Dərhal (Proaktiv elektron xidmət)',
    requirements: ['Əmək kitabçası / Sığorta stajı reyestri', 'FİN kod'],
    description: 'Yaşa görə və ya əmək stajı əsasında dövlət pensiyasının proaktiv hesablanması, təyin edilməsi və təsdiq arayışı.',
    iconName: 'BadgePercent',
    sampleTemplate: {
      title: 'PENSİYA TƏYİNATI VƏ SIĞORTA STAJA DAİR ARAYIŞ',
      fields: {
        'Pensiyaçı': 'Əliyev Rəşad Məmməd oğlu',
        'Pensiya növü': 'Əmək pensiyası (Proaktiv təyinat)',
        'Fərdi hesab №': '320984129',
        'Sığorta stajı': '18 il 4 ay',
        'Aylıq təyin olunan məbləğ': '480.00 AZN',
        'Dövlət Fondu': 'Dövlət Sosial Müdafiə Fondu (DSMF)'
      },
      stampType: 'DSMF RƏQƏMSAL TƏSDİQ ELEKTRON ŞTAMPI'
    }
  },

  // 5. İqtisadiyyat Nazirliyi
  {
    id: 'economy_tax_service',
    title: 'Vergi xidməti',
    category: 'İqtisadiyyat Nazirliyi',
    fee: 0.0,
    processingTime: 'Dərhal (VÖEN və borc arayışının generasiyası)',
    requirements: ['VÖEN / FİN kod', 'Asan İmza və ya biometrik təsdiq'],
    description: 'Dövlət Vergi Xidməti üzrə VÖEN məlumatları, vergi borcunun olmaması barədə arayış və bəyannamə qəbulu.',
    iconName: 'FileSpreadsheet',
    sampleTemplate: {
      title: 'DÖVLƏT VERGİ XİDMƏTİ RƏSMİ ARAYIŞI',
      fields: {
        'Vergi ödəyicisi': 'Əliyev Rəşad Məmməd oğlu',
        'VÖEN': '2004819281',
        'Qeydiyyat vergi orqanı': '12 saylı Ərazi Vergilər Baş İdarəsi (Qarabağ)',
        'Büdcəyə borc': '0.00 AZN (Borc yoxdur)',
        'Fəaliyyət növü': 'Kənd təsərrüfatı və xidmət fəaliyyəti'
      },
      stampType: 'DÖVLƏT VERGİ XİDMƏTİ REYESTR QR ŞTAMPI'
    }
  },
  {
    id: 'economy_business_license',
    title: 'Sahibkarlıq fəaliyyəti üçün lisenziyalar',
    category: 'İqtisadiyyat Nazirliyi',
    fee: 20.0,
    processingTime: '5 dəqiqə (Elektron lisenziya reyestri)',
    requirements: ['Sahibkarlıq qeydiyyatı (VÖEN)', 'Müvafiq fəaliyyət növü ərizəsi'],
    description: 'Kənd təsərrüfatı, ticarət və xidmət sahələrində sahibkarlıq fəaliyyəti üçün elektron lisenziya və icazələrin verilməsi.',
    iconName: 'Award',
    sampleTemplate: {
      title: 'SAHİBKARLIQ FƏALİYYƏTİ ÜÇÜN RƏSMİ LİSENZİYA',
      fields: {
        'Sahibkar': 'F/Ş Əliyev Rəşad Məmməd oğlu',
        'Lisenziyanın predmeti': 'Kənd təsərrüfatı məhsullarının istehsalı və satışı',
        'Lisenziya №': 'LİC-2026/0894',
        'Verilmə tarixi': '16.10.2026',
        'Qüvvədə olma müddəti': 'Müddətsiz'
      },
      stampType: 'İQTİSADİYYAT NAZİRLİYİ PORTAL ELEKTRON MÖHRÜ'
    }
  }
];

export const CURRENT_VITALS: HealthVitals = {
  pulse: 76,
  systolicBP: 122,
  diastolicBP: 79,
  spo2: 98,
  temperature: 36.6,
  bloodGlucose: 5.4,
  stressLevel: 'Normal',
  scanDate: '16.10.2026 09:40'
};

export const PREVIOUS_VITALS: HealthVitals = {
  pulse: 82,
  systolicBP: 135,
  diastolicBP: 88,
  spo2: 96,
  temperature: 36.8,
  bloodGlucose: 6.1,
  stressLevel: 'Yüksək',
  scanDate: '14.09.2026 11:15'
};

export const PHARMACY_ITEMS: PharmacyItem[] = [
  {
    id: 'med_paracetamol',
    name: 'Paracetamol 500 mg',
    dosage: '500 mq',
    count: '20 tablet',
    price: 5.20,
    pharmacy: 'Avromed',
    requiresPrescription: false,
    category: 'Ağrıkəsici və qızdırmasalıcı',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'med_vitamind3',
    name: 'Vitamin D3 2000 IU',
    dosage: '2000 BV',
    count: '30 tablet',
    price: 12.50,
    pharmacy: 'Zeytun',
    requiresPrescription: false,
    category: 'Vitaminlər və minerallar',
    stock: 32,
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'med_omega3',
    name: 'Omega-3 Balıq Yağı',
    dosage: '1000 mq',
    count: '60 kapsul',
    price: 18.00,
    pharmacy: 'Qazarmed',
    requiresPrescription: false,
    category: 'Ürək və damar dəstəyi',
    stock: 28,
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'med_aspirin',
    name: 'Aspirin Kardio 100 mg',
    dosage: '100 mq',
    count: '28 tablet',
    price: 4.80,
    pharmacy: 'Buta Aptek',
    requiresPrescription: false,
    category: 'Qandurulaşdırıcı',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'med_amoxicillin',
    name: 'Amoksisilin 500 mg',
    dosage: '500 mq',
    count: '16 kapsul',
    price: 9.60,
    pharmacy: 'Avromed',
    requiresPrescription: true,
    category: 'Antibiotik (Reseptli)',
    stock: 19,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'med_ibuprofen',
    name: 'İbuprofen 400 mg',
    dosage: '400 mq',
    count: '20 kapsul',
    price: 6.40,
    pharmacy: 'Zeytun',
    requiresPrescription: false,
    category: 'İltihab əleyhinə',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80'
  }
];

export const MARKET_ITEMS: MarketItem[] = [
  {
    id: 'mkt_veg_basket',
    name: 'Təzə Tərəvəz Dəsti (Pomidor, Xiyar, Göyərti)',
    unit: '1.5 kq səbət',
    price: 4.50,
    market: 'Bravo',
    category: 'Meyvə-tərəvəz',
    stock: 25,
    weightKg: 1.5,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mkt_milk',
    name: 'Kənd Südü Pasterizə 3.2%',
    unit: '1 litr şüşə',
    price: 2.30,
    market: 'Rahat',
    category: 'Qida məhsulları',
    stock: 40,
    weightKg: 1.05,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mkt_bread',
    name: 'Təndir Çörəyi / Əla Növ Baton',
    unit: '500 qram',
    price: 0.80,
    market: 'Araz',
    category: 'Qida məhsulları',
    stock: 55,
    weightKg: 0.5,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mkt_meat',
    name: 'Təzə Mal Əti (Sümüksüz Qulyaş)',
    unit: '1 kq vakuum paket',
    price: 17.50,
    market: 'Bravo',
    category: 'Qida məhsulları',
    stock: 14,
    weightKg: 1.0,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mkt_baby_diapers',
    name: 'Uşaq Bezləri (Pampers Midi 4)',
    unit: '34 ədədlik paket',
    price: 18.90,
    market: 'OBA',
    category: 'Uşaq məhsulları',
    stock: 18,
    weightKg: 1.2,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mkt_detergent',
    name: 'Antibakterial Məişət Təmizləyici',
    unit: '750 ml sprey',
    price: 3.80,
    market: 'Rahat',
    category: 'Məişət təmizliyi',
    stock: 30,
    weightKg: 0.8,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_DRONE_TELEMETRY: DroneTelemetry = {
  droneId: 'AZE-DRONE-AP01',
  model: 'AeroSky Cargo X-8 Heavy-Lift VTOL',
  status: 'Uçuşda',
  batteryPercent: 88,
  payloadKg: 2.15,
  maxPayloadKg: 5.0,
  cargoTempC: 4.2, // Cold-chain preserved
  windSpeedMs: 4.2, // Good flight weather
  flightAltitudeM: 110,
  speedKmh: 54,
  currentLocation: {
    lat: 40.0912,
    lng: 46.9621,
    locationName: 'Papravənd hava koridoru, yüksəklik 110m'
  },
  destination: {
    lat: 40.0984,
    lng: 46.9742,
    locationName: 'Papravənd kəndi, Mərkəzi Meydança (Köşk qarşısı)'
  },
  estimatedMinutesArrival: 6
};

export const KPIS = {
  pilotVillagesCount: 3,
  villagesList: ['Papravənd (Ağdam)', 'Qalayçılar (Ağdam)', 'Şıxlar (Ağdam)'],
  activeUsers: 300,
  citizenSatisfactionRate: 88, // Target >= 80%
  successFindRate: 92, // Target >= 85%
  tripReductionRate: 35, // Target >= 15%
  accessibilityTaskRate: 94, // Target >= 90%
  costMinAZN: 17000,
  costMaxAZN: 33000
};
