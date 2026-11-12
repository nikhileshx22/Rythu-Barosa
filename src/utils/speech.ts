import { Language } from '../types';

export class VoiceService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  // Speak text in appropriate Indian language
  public static speak(text: string, lang: Language, onEnd?: () => void): boolean {
    if (!this.synth) return false;

    try {
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      // Select voice based on language code
      const langCode = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.lang = langCode;

      // Attempt to pick a matching localized voice
      const voices = this.synth.getVoices();
      const matchedVoice = voices.find((v) => v.lang.startsWith(lang === 'te' ? 'te' : lang === 'hi' ? 'hi' : 'en'));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.rate = 0.92; // Slightly gentler pace for rural farmers
      utterance.pitch = 1.0;

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis notice:', e);
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      return false;
    }
  }

  public static stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    return Boolean(this.synth?.speaking);
  }

  // Speech Recognition (Voice Input)
  public static createSpeechRecognizer(
    lang: Language,
    onResult: (transcript: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ): any {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError('Speech recognition not supported in this browser');
      return null;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        onResult(text);
      };

      recognition.onerror = (event: any) => {
        onError(event.error || 'Speech error');
      };

      recognition.onend = () => {
        onEnd();
      };

      return recognition;
    } catch (e: any) {
      onError(e.message || 'Failed to initialize speech');
      return null;
    }
  }
}
