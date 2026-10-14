import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '30mb' }));

// Ensure public/audio_prebuilt exists
const prebuiltDir = path.resolve(process.cwd(), 'public/audio_prebuilt');
if (!fs.existsSync(prebuiltDir)) {
  fs.mkdirSync(prebuiltDir, { recursive: true });
}

// Initialize GoogleGenAI server-side with User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory audio cache: Map<cacheKey, { base64: string, mimeType: string, sampleRate: number, sizeBytes: number }>
const audioCache = new Map<
  string,
  { base64: string; mimeType: string; sampleRate: number; sizeBytes: number }
>();

// Character voice configuration matching Vietnamese pedagogical context
const ROLE_VOICE_MAP: Record<string, { voiceName: string; style: string }> = {
  narrator: {
    voiceName: 'Kore',
    style: 'Cô giáo tiểu học Việt Nam dịu dàng, ấm áp, truyền cảm, phát âm tiếng Việt chuẩn xác từng dấu',
  },
  hien: {
    voiceName: 'Puck',
    style: 'Cậu bé Nguyễn Hiền thông minh, lễ phép, trong sáng, quyết tâm và hào hứng',
  },
  mother: {
    voiceName: 'Zephyr',
    style: 'Người mẹ Việt Nam dịu dàng, yêu thương, trìu mến và xúc động',
  },
  teacher: {
    voiceName: 'Charon',
    style: 'Thầy giáo già điềm đạm, ân cần, tự hào về học trò',
  },
};

// API: Check TTS status & Diagnostic info
app.get('/api/tts/status', (_req, res) => {
  res.json({
    hasKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash-tts',
    cachedCount: audioCache.size,
    supportedVoices: {
      narrator: 'Kore (Nữ ấm áp - Cô giáo)',
      hien: 'Puck (Nam trẻ trung - Nguyễn Hiền)',
      mother: 'Zephyr (Nữ dịu dàng - Người mẹ)',
      teacher: 'Charon (Nam trầm ấm - Thầy giáo)',
    },
  });
});

// API: Dedicated Teacher Test Voice Diagnostic Endpoint
app.post('/api/tts/test-teacher', async (req, res) => {
  const text =
    req.body.text ||
    'Xin chào các em học sinh lớp 3A6! Hôm nay, cô và các em sẽ cùng khám phá câu chuyện Cậu học trò nghèo ham học. Các em đã sẵn sàng chưa nào?';

  if (!ai) {
    res.status(500).json({
      success: false,
      error: 'NO_API_KEY',
      message: 'Chưa cấu hình GEMINI_API_KEY trên máy chủ.',
      model: 'gemini-3.8-flash-tts',
    });
    return;
  }

  const cacheKey = `test:narrator:${text.trim()}`;
  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey)!;
    res.json({
      success: true,
      cached: true,
      model: 'gemini-3.8-flash-tts',
      mimeType: cached.mimeType,
      sampleRate: cached.sampleRate,
      dataSize: cached.sizeBytes,
      audioBase64: cached.base64,
    });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.trim(),
              speechMetadata: {
                style: ROLE_VOICE_MAP.narrator.style,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    const base64Audio = part?.inlineData?.data;

    if (base64Audio) {
      const buffer = Buffer.from(base64Audio, 'base64');
      const isWav = buffer.length >= 44 && buffer.subarray(0, 4).toString() === 'RIFF';
      const sampleRate = isWav ? buffer.readUInt32LE(24) : 24000;
      const mimeType = isWav ? 'audio/wav' : 'audio/l16;rate=24000';

      const entry = {
        base64: base64Audio,
        mimeType,
        sampleRate,
        sizeBytes: buffer.length,
      };
      audioCache.set(cacheKey, entry);

      res.json({
        success: true,
        cached: false,
        model: 'gemini-3.8-flash-tts',
        mimeType,
        sampleRate,
        dataSize: buffer.length,
        audioBase64: base64Audio,
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'EMPTY_AUDIO',
      message: 'Gemini API trả về nội dung rỗng (không có dữ liệu âm thanh inlineData).',
      model: 'gemini-3.8-flash-tts',
    });
  } catch (err: unknown) {
    const errorString = String(err);
    const is429 = errorString.includes('429') || errorString.includes('RESOURCE_EXHAUSTED');
    res.status(is429 ? 429 : 500).json({
      success: false,
      error: is429 ? 'RESOURCE_EXHAUSTED' : 'API_ERROR',
      message: is429
        ? 'Hạn mức miễn phí 10 lượt/ngày của Gemini TTS đã đạt giới hạn trên dự án này. Để tiếp tục tạo giọng AI, hãy cấu hình khóa API trả phí trong panel Secrets. Quý thầy cô vẫn có thể tải tệp MP3/WAV hoặc dùng giọng đọc của máy.'
        : `Lỗi kết nối Gemini API: ${errorString.substring(0, 300)}`,
      model: 'gemini-3.8-flash-tts',
      details: errorString,
    });
  }
});

// API: Main TTS Generator for Book Pages & Audition
app.post('/api/tts', async (req, res) => {
  try {
    const { text, role = 'narrator' } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const trimmed = text.trim();
    const cacheKey = `${role}:${trimmed}`;

    // 1. Check in-memory Cache
    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      res.json({
        audioBase64: cached.base64,
        format: cached.mimeType,
        sampleRate: cached.sampleRate,
        sizeBytes: cached.sizeBytes,
        role,
        cached: true,
      });
      return;
    }

    // 2. Call Gemini TTS
    if (!ai) {
      res.status(503).json({
        error: 'NO_KEY',
        message: 'Chưa cấu hình GEMINI_API_KEY trên máy chủ.',
      });
      return;
    }

    const config = ROLE_VOICE_MAP[role] || ROLE_VOICE_MAP.narrator;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: trimmed,
                speechMetadata: {
                  style: config.style,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: config.voiceName },
            },
          },
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      const base64Audio = part?.inlineData?.data;

      if (base64Audio) {
        const buffer = Buffer.from(base64Audio, 'base64');
        const isWav = buffer.length >= 44 && buffer.subarray(0, 4).toString() === 'RIFF';
        const sampleRate = isWav ? buffer.readUInt32LE(24) : 24000;
        const mimeType = isWav ? 'audio/wav' : 'audio/l16;rate=24000';

        const entry = {
          base64: base64Audio,
          mimeType,
          sampleRate,
          sizeBytes: buffer.length,
        };
        audioCache.set(cacheKey, entry);

        res.json({
          audioBase64: base64Audio,
          format: mimeType,
          sampleRate,
          sizeBytes: buffer.length,
          role,
          cached: false,
        });
        return;
      }

      res.status(500).json({
        error: 'EMPTY_AUDIO',
        message: 'Gemini API trả về nội dung rỗng cho câu này.',
      });
    } catch (err: unknown) {
      const errStr = String(err);
      const is429 = errStr.includes('429') || errStr.includes('RESOURCE_EXHAUSTED');
      console.warn(`Gemini TTS Error for role ${role}:`, errStr.substring(0, 200));

      res.status(is429 ? 429 : 500).json({
        error: is429 ? 'RESOURCE_EXHAUSTED' : 'API_ERROR',
        message: is429
          ? 'Hạn mức miễn phí 10 lượt/ngày của Gemini TTS đã đạt giới hạn. Thầy/Cô có thể tải lên tệp âm thanh WAV/MP3 hoặc dùng giọng đọc tiếng Việt của thiết bị.'
          : 'Lỗi gọi dịch vụ Gemini TTS.',
        details: errStr,
      });
    }
  } catch (error: unknown) {
    console.error('Server TTS error:', error);
    res.status(500).json({
      error: 'TTS generation failed',
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// API: Custom audio upload for teachers
app.post('/api/tts/upload', (req, res) => {
  try {
    const { key, audioBase64, mimeType = 'audio/wav', sampleRate = 24000 } = req.body;
    if (!key || !audioBase64) {
      res.status(400).json({ error: 'Missing key or audioBase64' });
      return;
    }
    const buffer = Buffer.from(audioBase64.replace(/^data:audio\/\w+;base64,/, ''), 'base64');
    audioCache.set(key, {
      base64: buffer.toString('base64'),
      mimeType,
      sampleRate,
      sizeBytes: buffer.length,
    });
    res.json({ success: true, key, size: buffer.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload audio' });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (isProduction: ${isProduction})`);
  });
}

startServer();
