'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating user messages.
 *
 * - translateUserMessage - A function that translates user messages.
 * - TranslateUserMessageInput - The input type for the translateUserMessage function.
 * - TranslateUserMessageOutput - The return type for the translateUserMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateUserMessageInputSchema = z.object({
  message: z.string().describe('The message to translate.'),
  sourceLanguage: z.string().describe('The source and target languages, e.g. "English to Hindi".'),
});
export type TranslateUserMessageInput = z.infer<typeof TranslateUserMessageInputSchema>;

const TranslateUserMessageOutputSchema = z.object({
  translatedMessage: z.string().describe('The translated message.'),
});
export type TranslateUserMessageOutput = z.infer<typeof TranslateUserMessageOutputSchema>;

export async function translateUserMessage(input: TranslateUserMessageInput): Promise<TranslateUserMessageOutput> {
  return translateUserMessageFlow(input);
}

const translateUserMessagePrompt = ai.definePrompt({
  name: 'translateUserMessagePrompt',
  input: {schema: TranslateUserMessageInputSchema},
  output: {schema: TranslateUserMessageOutputSchema},
  prompt: `Translate the following message from {{sourceLanguage}}:\n\n{{message}}`,
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
