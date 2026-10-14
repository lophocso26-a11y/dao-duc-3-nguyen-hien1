/**
 * Professional PCM & WAV Audio Decoder and Web Audio Player.
 * Correctly handles both raw 16-bit PCM and standard RIFF WAV files,
 * avoiding distortion, squeaks, or electronic noise.
 */

export interface DecodedAudioInfo {
  isWav: boolean;
  sampleRate: number;
  channels: number;
  bitsPerSample: number;
  dataSize: number;
  durationSec: number;
}

/**
 * Inspect raw base64 data to extract header metadata (or detect raw PCM).
 */
export function inspectAudioData(base64Str: string): DecodedAudioInfo {
  const binaryString = atob(base64Str.replace(/\s+/g, ''));
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Check if starts with RIFF (0x52, 0x49, 0x46, 0x46)
  const isWav =
    bytes.length >= 44 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46;

  if (isWav) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const channels = view.getUint16(22, true);
    const sampleRate = view.getUint32(24, true);
    const bitsPerSample = view.getUint16(34, true);

    // Find "data" chunk
    let dataOffset = 36;
    let dataSize = bytes.length - 44;
    for (let i = 12; i < bytes.length - 8; i++) {
      if (
        bytes[i] === 0x64 &&
        bytes[i + 1] === 0x61 &&
        bytes[i + 2] === 0x74 &&
        bytes[i + 3] === 0x61
      ) {
        dataOffset = i + 8;
        dataSize = view.getUint32(i + 4, true);
        break;
      }
    }

    const bytesPerSample = (bitsPerSample / 8) * channels;
    const durationSec = bytesPerSample > 0 ? dataSize / (sampleRate * bytesPerSample) : 0;

    return {
      isWav: true,
      sampleRate,
      channels,
      bitsPerSample,
      dataSize,
      durationSec,
    };
  }

  // Raw 16-bit Mono PCM (Gemini default 24000Hz)
  const sampleRate = 24000;
  const channels = 1;
  const bitsPerSample = 16;
  const dataSize = bytes.length;
  const durationSec = dataSize / (sampleRate * 2);

  return {
    isWav: false,
    sampleRate,
    channels,
    bitsPerSample,
    dataSize,
    durationSec,
  };
}

/**
 * Convert base64 audio (WAV or raw PCM) into an AudioBuffer using Web Audio API.
 * Uses exact Int16 -> Float32 conversion to prevent any digital distortion.
 */
export async function decodeToAudioBuffer(
  base64Str: string,
  audioCtx: AudioContext
): Promise<{ buffer: AudioBuffer; info: DecodedAudioInfo }> {
  const binaryString = atob(base64Str.replace(/\s+/g, ''));
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const info = inspectAudioData(base64Str);

  if (info.isWav) {
    // Try native decodeAudioData first
    try {
      const arrayBuf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      const decodedBuffer = await audioCtx.decodeAudioData(arrayBuf);
      return { buffer: decodedBuffer, info };
    } catch {
      // If native decode fails, fallback to manual PCM unpack
    }
  }

  // Manual raw PCM conversion: Int16 little-endian -> Float32 [-1, 1]
  let pcmOffset = 0;
  let pcmLength = bytes.length;

  if (info.isWav) {
    // Skip 44 byte header if it was WAV
    pcmOffset = 44;
    pcmLength = Math.max(0, bytes.length - 44);
  }

  const numSamples = Math.floor(pcmLength / 2);
  const audioBuffer = audioCtx.createBuffer(info.channels, numSamples, info.sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  const view = new DataView(bytes.buffer, bytes.byteOffset + pcmOffset, numSamples * 2);
  for (let i = 0; i < numSamples; i++) {
    const int16 = view.getInt16(i * 2, true); // little-endian
    channelData[i] = int16 < 0 ? int16 / 32768 : int16 / 32767;
  }

  return { buffer: audioBuffer, info };
}

/**
 * Package raw PCM or WAV bytes into a valid Blob URL for HTMLAudioElement.
 */
export function createWavBlobUrl(base64Str: string, sampleRate = 24000): { url: string; info: DecodedAudioInfo } {
  const binaryString = atob(base64Str.replace(/\s+/g, ''));
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const info = inspectAudioData(base64Str);

  if (info.isWav) {
    const blob = new Blob([bytes], { type: 'audio/wav' });
    return { url: URL.createObjectURL(blob), info };
  }

  // Add 44-byte RIFF header to raw PCM
  const wavBuffer = new Uint8Array(44 + bytes.length);
  const view = new DataView(wavBuffer.buffer);

  // "RIFF"
  wavBuffer.set([0x52, 0x49, 0x46, 0x46], 0);
  view.setUint32(4, 36 + bytes.length, true);
  // "WAVE"
  wavBuffer.set([0x57, 0x41, 0x56, 0x45], 8);
  // "fmt "
  wavBuffer.set([0x66, 0x6d, 0x74, 0x20], 12);
  view.setUint32(16, 16, true); // subchunk1 size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono (1 channel)
  view.setUint32(24, sampleRate, true); // Sample rate (24000)
  view.setUint32(28, sampleRate * 1 * 2, true); // Byte rate (sampleRate * channels * 2)
  view.setUint16(32, 2, true); // Block align (channels * 2)
  view.setUint16(34, 16, true); // Bits per sample (16)
  // "data"
  wavBuffer.set([0x64, 0x61, 0x74, 0x61], 36);
  view.setUint32(40, bytes.length, true);

  // Copy PCM data
  wavBuffer.set(bytes, 44);

  const blob = new Blob([wavBuffer], { type: 'audio/wav' });
  return { url: URL.createObjectURL(blob), info };
}
