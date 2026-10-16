// Səsli və vizual süni intellekt köməkçisi (Voice & Visual AI Guide)

export type VoicePromptKey =
  | 'welcome'
  | 'fingerprint_prompt'
  | 'face_prompt'
  | 'service_select'
  | 'doc_confirm'
  | 'mediscan_start'
  | 'pharmacy_scan'
  | 'payment_prompt'
  | 'done_drone';

export const AI_PROMPTS: Record<VoicePromptKey, { az: string; sub: string }> = {
  welcome: {
    az: 'Ağıllı Mobil Xidmət Mərkəzinə xoş gəlmisiniz. Şəxsi kabinetinizə daxil olmaq üçün biometrik identifikasiyadan keçin.',
    sub: 'Mərkəzə xoş gəlmisiniz! Şəxsi kabinet üçün biometrik identifikasiya tələb olunur.'
  },
  fingerprint_prompt: {
    az: 'Zəhmət olmasa, barmağınızı skanerə yerləşdirin.',
    sub: 'Biometrik yoxlama: Barmağınızı skaner panelinə toxundurun.'
  },
  face_prompt: {
    az: 'Şəxsiyyətinizi təsdiqləmək üçün kameraya baxın.',
    sub: 'Üz tanıma: Zəhmət olmasa başınızı düz saxlayaraq kameraya baxın.'
  },
  service_select: {
    az: 'Zəhmət olmasa, almaq istədiyiniz xidməti seçin.',
    sub: 'Dövlət xidmətləri, MediSkaner, Aptek və ya Market xidmətini seçin.'
  },
  doc_confirm: {
    az: 'Sənədin hazırlanması üçün tələb olunan məlumatları təsdiqləyin.',
    sub: 'Məlumatların düzgünlüyünü yoxlayıb elektron imzanızla təsdiq edin.'
  },
  mediscan_start: {
    az: 'MediSkaner kapsuluna daxil olun. Bütün bədən skanı başlayır. Hərəkətsiz qalın.',
    sub: 'MediSkaner: Sensorlar aktivdir, sağlamlıq göstəriciləri analiz edilir.'
  },
  pharmacy_scan: {
    az: 'Reseptinizi skanerə yerləşdirin və ya aptek şəbəkəsindən dərmanları seçin.',
    sub: 'Elektron resept skanı və aptek qiymət müqayisəsi aktivdir.'
  },
  payment_prompt: {
    az: 'Ödəniş üsulunu seçin: bank kartı, nağd və ya ASAN Pay ilə dərhal ödəyə bilərsiniz.',
    sub: 'Ödəniş terminalı hazırdır.'
  },
  done_drone: {
    az: 'Müraciətiniz qəbul olundu. Sənədiniz çap edilir və ya sifarişiniz dronla ünvanınıza yola salınır.',
    sub: 'Uğurla tamamlandı! Sənəd çap edilir və ya dronla göndərilir.'
  }
};

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakPrompt(key: VoicePromptKey, onStart?: () => void, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const prompt = AI_PROMPTS[key];
    if (!prompt) return;

    const utterance = new SpeechSynthesisUtterance(prompt.az);
    // Prefer Azerbaijani or Turkish if available
    const voices = window.speechSynthesis.getVoices();
    const azVoice = voices.find(v => v.lang.startsWith('az') || v.lang.startsWith('tr'));
    if (azVoice) {
      utterance.voice = azVoice;
      utterance.lang = azVoice.lang;
    } else {
      utterance.lang = 'tr-TR'; // Turkish voice closely handles Azerbaijani phonetics gracefully
    }
    utterance.rate = 0.95; // Slightly measured and authoritative yet friendly
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = () => {
      onEnd?.();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error, fallback to visual prompt:', err);
    onEnd?.();
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
