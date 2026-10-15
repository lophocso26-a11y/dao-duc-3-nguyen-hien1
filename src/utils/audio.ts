import { getPrebuiltAudioPath } from '../data/prebuiltAudio';
/**
 * High-fidelity Audio & Voice Service for Vietnamese 3D Interactive Flipbook.
 * Handles Gemini TTS 24kHz audio via PCM/WAV decoding, Web Speech API (Vietnamese only),
 * teacher audio uploads, and strictly forbids any electronic beeps or English voices.
 */

import { CharacterRole } from '../types/book';
import { decodeToAudioBuffer, createWavBlobUrl, inspectAudioData, DecodedAudioInfo } from './audioDecoder';

export interface TTSDiagnosticResult {
  success: boolean;
  model: string;
  mimeType?: string;
  sampleRate?: number;
  dataSize?: number;
  durationSec?: number;
  decodeStatus?: string;
  playStatus?: string;
  errorMessage?: string;
  audioUrl?: string;
}

class SoundService {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentBufferSource: AudioBufferSourceNode | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isBgmEnabled: boolean = true;

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopCurrentVoice();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setBgmEnabled(enabled: boolean) {
    this.isBgmEnabled = enabled;
  }

  public getBgmEnabled(): boolean {
    return this.isBgmEnabled;
  }

  public stopCurrentVoice() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if (this.currentBufferSource) {
      try {
        this.currentBufferSource.stop();
      } catch {
        // Ignore already stopped
      }
      this.currentBufferSource = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }

  /**
   * Synthesize realistic paper page turn rustle sound.
   */
  public playPageTurn() {
    if (this.isMuted || !this.isBgmEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.3);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.34);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // AudioContext policy
    }
  }

  /**
   * Play crystal star chime for rewards.
   */
  public playStarChime() {
    if (this.isMuted || !this.isBgmEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.36);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Play fanfare when finishing quiz.
   */
  public playTriumphFanfare() {
    if (this.isMuted || !this.isBgmEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const melody = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 0.15 },
        { f: 783.99, d: 0.15, t: 0.3 },
        { f: 1046.5, d: 0.45, t: 0.45 },
      ];
      melody.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, ctx.currentTime + note.t);

        gain.gain.setValueAtTime(0, ctx.currentTime + note.t);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + note.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.t + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + note.t);
        osc.stop(ctx.currentTime + note.t + note.d + 0.05);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Play speech using Web Audio API buffer or Blob URL.
   * NEVER plays sine waves or electronic beeps!
   */
  public async playVoiceLine({
    text,
    role = 'narrator',
    speed = 1.0,
    onStart,
    onEnd,
    onError,
  }: {
    text: string;
    role?: CharacterRole;
    speed?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (errMsg: string) => void;
  }) {
    if (this.isMuted) return;
    this.stopCurrentVoice();

    // 0. Prefer bundled MP3/WAV: works on every device and does not consume TTS quota.
    const bundledPath = getPrebuiltAudioPath(role, text);
    if (bundledPath) {
      try {
        const response = await fetch(bundledPath, { method: 'HEAD' });
        if (response.ok && (response.headers.get('content-type') || '').toLowerCase().includes('audio')) {
          const audio = new Audio(bundledPath);
          this.currentAudioElement = audio;
          audio.playbackRate = speed;
          audio.onplay = () => onStart?.();
          audio.onended = () => { this.currentAudioElement = null; onEnd?.(); };
          audio.onerror = () => { this.currentAudioElement = null; onError?.('Không thể phát tệp âm thanh: ' + bundledPath); };
          await audio.play();
          return;
        }
      } catch (err) {
        console.warn('Prebuilt audio unavailable, trying other sources:', bundledPath, err);
      }
    }

    // 1. Check custom uploaded audio in localStorage first
    const customKey = `custom_audio_${role}_${text.trim().substring(0, 40)}`;
    const localCustomAudio = localStorage.getItem(customKey);
    if (localCustomAudio) {
      try {
        const audio = new Audio(localCustomAudio);
        this.currentAudioElement = audio;
        audio.playbackRate = speed;
        audio.onplay = () => onStart?.();
        audio.onended = () => {
          this.currentAudioElement = null;
          onEnd?.();
        };
        audio.onerror = () => {
          this.currentAudioElement = null;
          this.fallbackSpeechSynthesis({ text, role, speed, onStart, onEnd, onError });
        };
        await audio.play();
        return;
      } catch (e) {
        console.warn('Custom audio playback failed, falling back:', e);
      }
    }

    // 2. Fetch from Backend Gemini TTS endpoint
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, role }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audioBase64) {
          const { url } = createWavBlobUrl(data.audioBase64, data.sampleRate || 24000);
          const audio = new Audio(url);
          this.currentAudioElement = audio;
          audio.playbackRate = speed;

          audio.onplay = () => onStart?.();
          audio.onended = () => {
            this.currentAudioElement = null;
            URL.revokeObjectURL(url);
            onEnd?.();
          };
          audio.onerror = (e) => {
            console.warn('Audio element error:', e);
            this.currentAudioElement = null;
            URL.revokeObjectURL(url);
            this.fallbackSpeechSynthesis({ text, role, speed, onStart, onEnd, onError });
          };

          await audio.play();
          return;
        }
      } else {
        const errJson = await response.json().catch(() => ({}));
        if (errJson.error === 'RESOURCE_EXHAUSTED' || response.status === 429) {
          console.info('Gemini TTS quota limit reached, attempting Vietnamese device speech');
        }
      }
    } catch (err) {
      console.warn('API /api/tts call failed, attempting client fallback:', err);
    }

    // 3. Fallback: Web Speech Synthesis ONLY if real Vietnamese voice exists
    this.fallbackSpeechSynthesis({ text, role, speed, onStart, onEnd, onError });
  }

  /**
   * Diagnostic test function for AI Audio Test panel.
   */
  public async testTeacherAudio(text: string): Promise<TTSDiagnosticResult> {
    try {
      const response = await fetch('/api/tts/test-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          model: data.model || 'gemini-3.8-flash-tts',
          errorMessage: data.message || data.details || 'Lỗi gọi API',
        };
      }

      // Inspect received audio bytes
      const info = inspectAudioData(data.audioBase64);
      const { url } = createWavBlobUrl(data.audioBase64, info.sampleRate);

      return {
        success: true,
        model: data.model,
        mimeType: info.isWav ? 'audio/wav (RIFF)' : 'audio/l16 (Raw PCM 16-bit)',
        sampleRate: info.sampleRate,
        dataSize: info.dataSize,
        durationSec: Math.round(info.durationSec * 10) / 10,
        decodeStatus: 'Giải mã thành công (16-bit Mono, Little-Endian)',
        playStatus: 'Sẵn sàng phát',
        audioUrl: url,
      };
    } catch (err: unknown) {
      return {
        success: false,
        model: 'gemini-3.8-flash-tts',
        errorMessage: err instanceof Error ? err.message : String(err),
      };
    }
  }

  private fallbackSpeechSynthesis({
    text,
    role,
    speed,
    onStart,
    onEnd,
    onError,
  }: {
    text: string;
    role: CharacterRole;
    speed: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (errMsg: string) => void;
  }) {
    if (!('speechSynthesis' in window)) {
      onError?.('Trình duyệt chưa hỗ trợ Web Speech Synthesis.');
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.startsWith('vi') || v.lang.includes('VIE'));

    // STRICT RULE: Never use English voice to speak Vietnamese text!
    if (!viVoice) {
      onError?.(
        'Hạn mức Gemini TTS miễn phí đã đạt giới hạn (10 lượt/ngày) và thiết bị chưa có gói giọng đọc tiếng Việt offline. Thầy/Cô có thể tải lên tệp MP3/WAV hoặc ghi âm trực tiếp.'
      );
      onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = viVoice;
    utterance.lang = 'vi-VN';
    utterance.rate = speed;

    if (role === 'hien') {
      utterance.pitch = 1.3;
    } else if (role === 'mother') {
      utterance.pitch = 0.95;
    } else if (role === 'teacher') {
      utterance.pitch = 0.85;
    } else {
      utterance.pitch = 1.05;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => {
      this.currentUtterance = null;
      onEnd?.();
    };
    utterance.onerror = (e) => {
      this.currentUtterance = null;
      onError?.(e.error || 'Lỗi phát giọng đọc');
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }
}

export const soundService = new SoundService();

export function checkVietnameseVoiceAvailability(): { hasViVoice: boolean; voiceName: string } {
  if (!('speechSynthesis' in window)) {
    return { hasViVoice: false, voiceName: '' };
  }
  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find((v) => v.lang.startsWith('vi') || v.lang.includes('VIE'));
  return {
    hasViVoice: Boolean(viVoice),
    voiceName: viVoice ? viVoice.name : '',
  };
}
