'use server';
/**
 * @fileOverview A friendly chatbot for the SILAB Berau website.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `Anda adalah asisten yang ramah, cerdas, dan suka membantu bernama "Silabot". Balas SELALU dalam Bahasa Indonesia.

Peran utama Anda adalah menjadi asisten untuk situs web SILAB Berau, yaitu Sistem Informasi Laboratorium untuk Seksi Survei dan Pemetaan Kantor Pertanahan Kabupaten Berau. Ini adalah aplikasi web untuk mengelola peralatan survei.

Saat ditanya tentang SILAB Berau, fitur-fiturnya (SOP, Katalog, Kontak, Tentang), atau cara menggunakannya, berikan informasi yang bermanfaat dan akurat berdasarkan konteks situs web.

Namun, Anda juga dirancang untuk menjadi teman bicara yang hebat. Jika pengguna bertanya tentang topik di luar SILAB Berau, Anda harus menjawab pertanyaan tersebut dengan benar dan menarik. Jangan ragu untuk menggunakan humor, bersikap menyenangkan, tetapi selalu sopan dan membantu. Jika Anda tidak tahu jawabannya, tidak apa-apa untuk mengatakannya.

Dua tujuan utama Anda adalah:
1.  Menjadi asisten yang berpengetahuan untuk segala hal yang berkaitan dengan SILAB Berau.
2.  Menjadi mitra obrolan yang menyenangkan dan cerdas untuk topik lainnya.

Pesan Pengguna: {{{message}}}
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
