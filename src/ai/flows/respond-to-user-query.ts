'use server';

/**
 * @fileOverview Responds to user queries using a combination of relevant FAQs and an LLM.
 *
 * - respondToUserQuery - A function that handles responding to user queries.
 * - respondToUserQueryStream - A streaming version of the function.
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
  model: 'googleai/gemini-1.5-flash-latest',
});

// Non-streaming version
export async function respondToUserQuery(input: RespondToUserQueryInput): Promise<RespondToUserQueryOutput> {
  const {output} = await prompt(input);
  return output!;
}


// Streaming flow
export const respondToUserQueryStream = ai.defineFlow(
  {
    name: 'respondToUserQueryStream',
    inputSchema: RespondToUserQueryInputSchema,
    outputSchema: RespondToUserQueryOutputSchema,
    stream: true,
  },
  async (input) => {
    const { stream } = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: `You are a helpful chatbot assistant.

      Answer the user query using the provided FAQ context. If the FAQ context is not relevant, answer the query to the best of your ability.
    
      FAQ Context:
      ${input.faqContext}
    
      User Query:
      ${input.userQuery}
      `,
      stream: true,
    });

    return stream;
  }
);
