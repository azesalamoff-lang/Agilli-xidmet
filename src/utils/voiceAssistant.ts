// Səsli və vizual süni intellekt köməkçisi (Voice & Visual AI Guide)
// Yalnız təmiz və orijinal Azərbaycan dilində səsləndirmə (No Turkish voices)

export type VoicePromptKey =
  | 'welcome'
  | 'fingerprint_prompt'
  | 'face_prompt'
  | 'service_select'
  | 'doc_confirm'
  | 'mediscan_start'
  | 'mediscan_complete'
  | 'pharmacy_scan'
  | 'payment_prompt'
  | 'done_drone'
  | 'referral_sent';

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
    az: 'MediSkaner başladıldı, nəticələr tezliklə göstəriləcək.',
    sub: 'MediSkaner başladıldı, nəticələr tezliklə göstəriləcək.'
  },
  mediscan_complete: {
    az: 'Müayinə tamamlandı. Göstəriciləriniz normadadır, əvvəlki ayla müqayisəli hesabat hazırdır.',
    sub: 'Müayinə tamamlandı. Göstəriciləriniz normadadır, hesabat hazırdır.'
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
    az: 'Sifarişiniz təsdiqləndi! Dron dərhal Papravənd kəndinə yola salınır.',
    sub: 'Uğurla tamamlandı! Sənəd çap edilir və ya dronla göndərilir.'
  },
  referral_sent: {
    az: 'Elektron göndəriş Ağdam Rayon Mərkəzi Xəstəxanasına göndərildi.',
    sub: 'Elektron göndəriş uğurla təsdiq olunub mərkəzə yönləndirildi.'
  }
};

let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

// Audio element cache for instant playback
const AUDIO_ELEMENTS: Partial<Record<VoicePromptKey, HTMLAudioElement>> = {};

if (typeof window !== 'undefined') {
  // Preload known Azerbaijani audio files
  const keys: VoicePromptKey[] = ['mediscan_start', 'mediscan_complete', 'welcome', 'done_drone'];
  keys.forEach(k => {
    try {
      const a = new Audio(`/audio/${k}.wav`);
      a.preload = 'auto';
      AUDIO_ELEMENTS[k] = a;
    } catch {
      // ignore
    }
  });
}

/**
 * Strictly searches for authentic Azerbaijani voice synthesizers only.
 * NEVER returns Turkish voices to honor "Make speech in Azerbaijani, not in Turkish".
 */
function findStrictAzerbaijaniVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  return voices.find(v => 
    v.lang.toLowerCase().startsWith('az') || 
    v.name.toLowerCase().includes('azerba') || 
    v.name.toLowerCase().includes('azərbayc')
  ) || null;
}

export function stopSpeaking() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // ignore
    }
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      currentUtterance = null;
    } catch {
      // ignore
    }
  }
}

/**
 * Plays speech using backend authentic Azerbaijani TTS API (`/api/tts`)
 */
async function playFromBackendTTS(text: string, onStart?: () => void, onEnd?: () => void): Promise<boolean> {
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!res.ok) return false;

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;

    audio.onplay = () => {
      onStart?.();
    };

    audio.onended = () => {
      currentAudio = null;
      URL.revokeObjectURL(url);
      onEnd?.();
    };

    audio.onerror = () => {
      currentAudio = null;
      URL.revokeObjectURL(url);
      onEnd?.();
    };

    await audio.play();
    return true;
  } catch {
    return false;
  }
}

/**
 * Speaks raw Azerbaijani text. First tries Azerbaijani backend TTS, then strict Azerbaijani Web Speech.
 * NEVER falls back to Turkish.
 */
export async function speakRawAzerbaijani(text: string, onStart?: () => void, onEnd?: () => void) {
  stopSpeaking();

  // 1. Try real-time Azerbaijani TTS endpoint
  const played = await playFromBackendTTS(text, onStart, onEnd);
  if (played) return;

  // 2. Try strictly Azerbaijani browser voice (never Turkish)
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const azVoice = findStrictAzerbaijaniVoice();
    if (azVoice) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = azVoice;
        utterance.lang = azVoice.lang || 'az-AZ';
        utterance.rate = 0.95;
        utterance.onstart = () => onStart?.();
        utterance.onend = () => {
          onEnd?.();
          currentUtterance = null;
        };
        utterance.onerror = () => {
          onEnd?.();
          currentUtterance = null;
        };
        currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        return;
      } catch {
        onEnd?.();
      }
    }
  }

  onEnd?.();
}

/**
 * Plays pre-recorded studio-grade Azerbaijani voice files (/audio/<key>.wav).
 * Guarantees 100% Azerbaijani pronunciation with zero Turkish accents.
 */
export function speakPrompt(key: VoicePromptKey, onStart?: () => void, onEnd?: () => void) {
  stopSpeaking();
  const prompt = AI_PROMPTS[key];
  const audioSrc = `/audio/${key}.wav`;

  let audio = AUDIO_ELEMENTS[key];
  if (!audio) {
    audio = new Audio(audioSrc);
    AUDIO_ELEMENTS[key] = audio;
  }

  currentAudio = audio;
  audio.currentTime = 0;

  let didFallback = false;
  const triggerFallback = async () => {
    if (didFallback) return;
    didFallback = true;
    currentAudio = null;
    if (prompt) {
      await speakRawAzerbaijani(prompt.az, onStart, onEnd);
    } else {
      onEnd?.();
    }
  };

  audio.onplay = () => {
    onStart?.();
  };

  audio.onended = () => {
    currentAudio = null;
    onEnd?.();
  };

  audio.onerror = () => {
    triggerFallback();
  };

  audio.play().catch(() => {
    triggerFallback();
  });
}

/**
 * Voice dispatcher: routes recognized phrases to pre-recorded authentic Azerbaijani audio
 * or synthesizes directly via Azerbaijani TTS.
 */
export function speakCustomAzerbaijani(text: string, onStart?: () => void, onEnd?: () => void) {
  const clean = text.toLowerCase().trim();

  if (clean.includes('mediskaner') && (clean.includes('başla') || clean.includes('tezliklə') || clean.includes('nəticə'))) {
    speakPrompt('mediscan_start', onStart, onEnd);
    return;
  }

  if (clean.includes('müayinə tamamlandı') || clean.includes('göstəriciləriniz normadadır')) {
    speakPrompt('mediscan_complete', onStart, onEnd);
    return;
  }

  if (clean.includes('dron') && (clean.includes('yola salınır') || clean.includes('təsdiqləndi'))) {
    speakPrompt('done_drone', onStart, onEnd);
    return;
  }

  if (clean.includes('şəxsi kabinet') || clean.includes('xoş gəlmisiniz')) {
    speakPrompt('welcome', onStart, onEnd);
    return;
  }

  if (clean.includes('barmağınızı') || clean.includes('barmaq')) {
    speakPrompt('fingerprint_prompt', onStart, onEnd);
    return;
  }

  if (clean.includes('kameraya baxın') || clean.includes('üz tanıma')) {
    speakPrompt('face_prompt', onStart, onEnd);
    return;
  }

  if (clean.includes('xidməti seçin')) {
    speakPrompt('service_select', onStart, onEnd);
    return;
  }

  if (clean.includes('göndəriş') && clean.includes('xəstəxana')) {
    speakPrompt('referral_sent', onStart, onEnd);
    return;
  }

  speakRawAzerbaijani(text, onStart, onEnd);
}
