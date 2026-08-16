/**
 * Voice Service for AURA AI
 * Implements Web Speech Recognition (STT) and Web Speech Synthesis (TTS)
 * with robust iframe safety and visual fallback simulations.
 */

export interface VoiceRecognitionState {
  isListening: boolean;
  transcript: string;
  isFinal: boolean;
  error?: string;
}

export class VoiceService {
  private static instance: VoiceService;
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private isSpeaking: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      // Setup Speech Recognition if available
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;
          this.recognition.maxAlternatives = 1;
        } catch (e) {
          console.warn('Speech recognition init error:', e);
        }
      }

      if ('speechSynthesis' in window) {
        this.synthesis = window.speechSynthesis;
      }
    }
  }

  public static getInstance(): VoiceService {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService();
    }
    return VoiceService.instance;
  }

  public isSpeechRecognitionSupported(): boolean {
    return !!this.recognition;
  }

  public isSpeechSynthesisSupported(): boolean {
    return !!this.synthesis;
  }

  public startListening(
    languageLocale: string = 'en-IN',
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.recognition) {
      onError('Speech recognition is not natively supported in this browser.');
      return false;
    }

    try {
      this.recognition.lang = languageLocale;
      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const text = finalTranscript || interimTranscript;
        onResult(text, !!finalTranscript);
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        onError(event.error || 'Voice recognition error');
      };

      this.recognition.onend = () => {
        onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err: any) {
      console.warn('Speech recognition start failed:', err);
      onError(err.message || 'Microphone access restricted');
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }

  public speak(
    text: string,
    locale: string = 'en-IN',
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (!this.synthesis) {
      if (onStart) onStart();
      setTimeout(() => {
        if (onEnd) onEnd();
      }, Math.min(Math.max(text.length * 50, 1500), 4000));
      return;
    }

    // Cancel any ongoing speech
    this.synthesis.cancel();

    // Clean markdown and symbols for speech
    const cleanText = text
      .replace(/[*_#`~[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[•\n]/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = locale;
    utterance.rate = 1.02;
    utterance.pitch = 1.0;

    // Pick best available voice matching locale
    const voices = this.synthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(locale.split('-')[0]));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }
}
