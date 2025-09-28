import {NextRequest} from 'next/server';

// Mock function to simulate a delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content || '';

    // A simple mock response
    const mockResponse = `This is a simulated real-time AI response for your message: "${userMessage}". I can answer FAQs, capture leads, and escalate to a human agent. Try asking "What is your return policy?" or "I'd like to talk to a sales rep."`;
    
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for (const char of mockResponse) {
          await sleep(10); // Simulate token generation delay
          controller.enqueue(encoder.encode(char));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('[CHAT_API_ERROR]', error);
    return new Response('Something went wrong', { status: 500 });
  }
}
