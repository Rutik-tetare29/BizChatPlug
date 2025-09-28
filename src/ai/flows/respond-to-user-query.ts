'use server';

/**
 * @fileOverview Responds to user queries using a combination of relevant FAQs and an LLM.
 *
 * - respondToUserQuery - A function that handles responding to user queries.
 * - RespondToUserQueryInput - The input type for the respondToUserQuery function.
 * - RespondToUserQueryOutput - The return type for the respondToUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RespondToUserQueryInputSchema = z.object({
  userQuery: z.string().describe('The user query to respond to.'),
  faqContext: z.string().describe('The relevant FAQ context to include.'),
});
export type RespondToUserQueryInput = z.infer<typeof RespondToUserQueryInputSchema>;

const RespondToUserQueryOutputSchema = z.object({
  response: z.string().describe('The LLM generated response to the user query.'),
});
export type RespondToUserQueryOutput = z.infer<typeof RespondToUserQueryOutputSchema>;

export async function respondToUserQuery(input: RespondToUserQueryInput): Promise<RespondToUserQueryOutput> {
  return respondToUserQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'respondToUserQueryPrompt',
  input: {schema: RespondToUserQueryInputSchema},
  output: {schema: RespondToUserQueryOutputSchema},
  prompt: `You are a helpful chatbot assistant.

  Answer the user query using the provided FAQ context. If the FAQ context is not relevant, answer the query to the best of your ability.

  FAQ Context:
  {{faqContext}}

  User Query:
  {{userQuery}}
  `,
  model: 'googleai/gemini-2.0-flash-exp',
});

const respondToUserQueryFlow = ai.defineFlow(
  {
    name: 'respondToUserQueryFlow',
    inputSchema: RespondToUserQueryInputSchema,
    outputSchema: RespondToUserQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
