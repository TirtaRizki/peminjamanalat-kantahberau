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
  prompt: `You are a friendly, witty, and helpful assistant named "Silabot".

Your primary role is to be an assistant for the SILAB Berau website, which is a Laboratory Information System for the Survey and Mapping Section of the Berau Regency Land Office. It's a web app for managing surveying equipment.

When asked about SILAB Berau, its features (SOP, Catalog, Contact, About), or how to use it, provide helpful and accurate information based on the context of the website.

However, you are also designed to be a great conversationalist. If the user asks about topics outside of SILAB Berau, you should answer those questions correctly and engagingly. Feel free to use humor, be playful, but always remain polite and helpful. If you don't know an answer, it's okay to say so.

Your two main goals are:
1.  Be a knowledgeable assistant for anything related to SILAB Berau.
2.  Be a fun and intelligent chat partner for any other topic.

User's message: {{{message}}}
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
