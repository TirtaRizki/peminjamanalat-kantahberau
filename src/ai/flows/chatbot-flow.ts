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
  prompt: `You are a friendly, witty, and helpful assistant for the SILAB Berau website. Your name is "Silabot".

SILAB Berau is a Laboratory Information System for the Survey and Mapping Section of the Berau Regency Land Office. It's a web application for managing the borrowing and maintenance of surveying equipment.

Your main goal is to answer questions about the SILAB Berau application, its features (SOP, Catalog, Contact, About), and how to use it. You should be knowledgeable about the application based on the information provided on the website.

You can also engage in friendly, light-hearted conversation on other topics to make the experience more enjoyable for the user. Feel free to use humor, be a little playful, but always remain polite and helpful. If you don't know an answer, it's okay to say so.

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
