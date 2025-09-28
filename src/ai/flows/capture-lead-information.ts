'use server';

/**
 * @fileOverview A lead capture AI agent.
 *
 * - captureLeadInformation - A function that handles the lead capture process.
 * - CaptureLeadInformationInput - The input type for the captureLeadInformation function.
 * - CaptureLeadInformationOutput - The return type for the captureLeadInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CaptureLeadInformationInputSchema = z.object({
  userInput: z.string().describe('The user input string.'),
  pageUrl: z.string().describe('The URL of the page where the user is interacting with the chatbot.'),
});
export type CaptureLeadInformationInput = z.infer<typeof CaptureLeadInformationInputSchema>;

const CaptureLeadInformationOutputSchema = z.object({
  shouldCaptureLead: z.boolean().describe('Whether or not the user input indicates lead potential.'),
  name: z.string().optional().describe('The name of the lead, if available.'),
  email: z.string().optional().describe('The email address of the lead, if available.'),
  phone: z.string().optional().describe('The phone number of the lead, if available.'),
  productOfInterest: z.string().optional().describe('The product or service the lead is interested in, if available.'),
});
export type CaptureLeadInformationOutput = z.infer<typeof CaptureLeadInformationOutputSchema>;

export async function captureLeadInformation(input: CaptureLeadInformationInput): Promise<CaptureLeadInformationOutput> {
  return captureLeadInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'captureLeadInformationPrompt',
  input: {schema: CaptureLeadInformationInputSchema},
  output: {schema: CaptureLeadInformationOutputSchema},
  prompt: `You are an expert lead generation AI, tasked with analyzing user input to determine lead potential and extract contact information.

  Based on the user input and the page URL, determine if the user is expressing interest in a product or service and should be captured as a lead. Capture user's name, email, phone number and the product they are interested in, if provided.

  User Input: {{{userInput}}}
  Page URL: {{{pageUrl}}}

  Output in JSON format:
  {
    "shouldCaptureLead": true/false,
    "name": "User's Name" (if available),
    "email": "user@example.com" (if available),
    "phone": "+15551234567" (if available),
    "productOfInterest": "Product Name" (if available)
  }`,
});

const captureLeadInformationFlow = ai.defineFlow(
  {
    name: 'captureLeadInformationFlow',
    inputSchema: CaptureLeadInformationInputSchema,
    outputSchema: CaptureLeadInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
