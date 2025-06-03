import { sendMessage } from './sendMessage.js';
import { clues } from './cluePreset.js';
import { startSession, getSession } from './sessions.js';

export async function handleIncomingMessage(from, text) {
  const session = getSession(from);

  if (!session) {
    const [name, mode] = text.split('-').map(t => t.trim());
    if (name && (mode === 'easy' || mode === 'hard')) {
      startSession(from, name, mode);
      const intro = `🕵️ Hai ${name}, kamu memilih mode *${mode}*. Berikut clue pertamamu:\n\n${clues[mode][0]}`;
      await sendMessage(from, intro);
    } else {
      await sendMessage(from, 'Kirim pesan dengan format: Nama - easy/hard');
    }
  } else {
    // Placeholder: validasi GPT + simpan ke spreadsheet
    await sendMessage(from, '🔍 Jawaban diterima. Evaluasi sedang diproses...');
  }
}