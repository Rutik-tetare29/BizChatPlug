'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating user messages to English.
 *
 * - translateUserMessage - A function that translates user messages to English.
 * - TranslateUserMessageInput - The input type for the translateUserMessage function.
 * - TranslateUserMessageOutput - The return type for the translateUserMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateUserMessageInputSchema = z.object({
  message: z.string().describe('The message to translate.'),
  sourceLanguage: z.string().describe('The language of the message.'),
});
export type TranslateUserMessageInput = z.infer<typeof TranslateUserMessageInputSchema>;

const TranslateUserMessageOutputSchema = z.object({
  translatedMessage: z.string().describe('The translated message in English.'),
});
export type TranslateUserMessageOutput = z.infer<typeof TranslateUserMessageOutputSchema>;

export async function translateUserMessage(input: TranslateUserMessageInput): Promise<TranslateUserMessageOutput> {
  return translateUserMessageFlow(input);
}

const translateUserMessagePrompt = ai.definePrompt({
  name: 'translateUserMessagePrompt',
  input: {schema: TranslateUserMessageInputSchema},
  output: {schema: TranslateUserMessageOutputSchema},
  prompt: `Translate the following message from {{sourceLanguage}} to English:\n\n{{message}}`,
});

const translateUserMessageFlow = ai.defineFlow(
  {
    name: 'translateUserMessageFlow',
    inputSchema: TranslateUserMessageInputSchema,
    outputSchema: TranslateUserMessageOutputSchema,
  },
  async input => {
    const {output} = await translateUserMessagePrompt(input);
    return output!;
  }
);
