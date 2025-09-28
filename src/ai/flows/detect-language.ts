'use server';

/**
 * @fileOverview This file defines a Genkit flow for detecting the language of a user's message.
 *
 * - detectLanguage - A function that detects the language of a message.
 * - DetectLanguageInput - The input type for the detectLanguage function.
 * - DetectLanguageOutput - The return type for the detectLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectLanguageInputSchema = z.object({
  message: z.string().describe('The message to detect the language of.'),
});
export type DetectLanguageInput = z.infer<typeof DetectLanguageInputSchema>;

const DetectLanguageOutputSchema = z.object({
  language: z.string().describe('The detected language (e.g., "English", "Hindi", "Marathi").'),
});
export type DetectLanguageOutput = z.infer<typeof DetectLanguageOutputSchema>;

export async function detectLanguage(input: DetectLanguageInput): Promise<DetectLanguageOutput> {
  return detectLanguageFlow(input);
}

const detectLanguagePrompt = ai.definePrompt({
  name: 'detectLanguagePrompt',
  input: {schema: DetectLanguageInputSchema},
  output: {schema: DetectLanguageOutputSchema},
  prompt: `Detect the language of the following message. Respond with "English", "Hindi", or "Marathi". If it's not one of those, respond with "English".\n\n{{message}}`,
  model: 'googleai/gemini-2.0-flash-exp',
});

const detectLanguageFlow = ai.defineFlow(
  {
    name: 'detectLanguageFlow',
    inputSchema: DetectLanguageInputSchema,
    outputSchema: DetectLanguageOutputSchema,
  },
  async input => {
    const {output} = await detectLanguagePrompt(input);
    return output!;
  }
);
