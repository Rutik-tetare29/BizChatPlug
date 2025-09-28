'use server';
/**
 * @fileOverview This file contains the Genkit flow for escalating a chat to a human agent.
 *
 * - escalateChatToHuman - A function that initiates the chat escalation process.
 * - EscalateChatToHumanInput - The input type for the escalateChatToHuman function.
 * - EscalateChatToHumanOutput - The return type for the escalateChatToHuman function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EscalateChatToHumanInputSchema = z.object({
  chatId: z.string().describe('The ID of the chat to escalate.'),
  message: z.string().describe('The user message that triggered the escalation.'),
  customerName: z.string().optional().describe('The name of the customer initiating the chat.'),
  customerEmail: z.string().email().optional().describe('The email address of the customer.'),
  webhookUrl: z.string().url().describe('The webhook URL to notify the human agent.'),
});
export type EscalateChatToHumanInput = z.infer<typeof EscalateChatToHumanInputSchema>;

const EscalateChatToHumanOutputSchema = z.object({
  success: z.boolean().describe('Indicates whether the escalation was successful.'),
  ticketId: z.string().optional().describe('The ID of the created ticket, if successful.'),
  message: z.string().describe('A message indicating the status of the escalation.'),
});
export type EscalateChatToHumanOutput = z.infer<typeof EscalateChatToHumanOutputSchema>;

export async function escalateChatToHuman(input: EscalateChatToHumanInput): Promise<EscalateChatToHumanOutput> {
  return escalateChatToHumanFlow(input);
}

const escalateChatToHumanFlow = ai.defineFlow(
  {
    name: 'escalateChatToHumanFlow',
    inputSchema: EscalateChatToHumanInputSchema,
    outputSchema: EscalateChatToHumanOutputSchema,
  },
  async input => {
    try {
      // Simulate sending a request to the human agent webhook.
      const response = await fetch(input.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: input.chatId,
          message: input.message,
          customerName: input.customerName,
          customerEmail: input.customerEmail,
        }),
      });

      if (!response.ok) {
        console.error('Failed to notify human agent:', response.status, response.statusText);
        return {
          success: false,
          message: `Failed to notify human agent: ${response.status} ${response.statusText}`,
        };
      }

      const data = await response.json();
      const ticketId = data.ticketId || 'TICKET-SIMULATED'; // Simulate ticket ID.

      return {
        success: true,
        ticketId: ticketId,
        message: 'Chat escalated to human agent successfully.',
      };
    } catch (error: any) {
      console.error('Error escalating chat:', error);
      return {
        success: false,
        message: `Error escalating chat: ${error.message}`,
      };
    }
  }
);
