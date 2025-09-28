import {NextRequest, NextResponse} from 'next/server';
import {respondToUserQueryStream} from '@/ai/flows/respond-to-user-query';
import {captureLeadInformation} from '@/ai/flows/capture-lead-information';
import {escalateChatToHuman} from '@/ai/flows/escalate-chat-to-human';
import {detectLanguage} from '@/ai/flows/detect-language';
import {translateUserMessage} from '@/ai/flows/translate-user-message';
import {mockFaqs, mockLeads} from '@/lib/mock-data';


// Helper to create a streaming response from a Genkit stream
function createStreamingResponse(iterator: AsyncGenerator<any>) {
  const stream = new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        const responseText = typeof value === 'string' ? value : value.response;
        controller.enqueue(new TextEncoder().encode(responseText));
      }
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

// Helper to create a simple text response
function createTextResponse(text: string) {
   const iterator = (async function* () {
      yield { response: text };
    })();
   return createStreamingResponse(iterator);
}


async function translate(message: string, sourceLanguage: string, targetLanguage: string) {
    if (sourceLanguage.toLowerCase() === targetLanguage.toLowerCase()) {
        return message;
    }
    const result = await translateUserMessage({message, sourceLanguage: `${sourceLanguage} to ${targetLanguage}`});
    return result.translatedMessage;
}


export async function POST(req: NextRequest) {
  try {
    const {messages} = await req.json();
    let userMessage = messages[messages.length - 1]?.content || '';
    const pageUrl = req.headers.get('referer') || '';

    // 1. Detect Language
    const { language } = await detectLanguage({ message: userMessage });
    const userLanguage = language;

    // Translate user message to English for processing if necessary
    const englishUserMessage = userLanguage !== 'English'
      ? await translate(userMessage, userLanguage, 'English')
      : userMessage;

    // 2. Concurrently check for lead capture and escalation
    const [leadInfo, escalationCheck] = await Promise.all([
      captureLeadInformation({userInput: englishUserMessage, pageUrl}),
      Promise.resolve(englishUserMessage.toLowerCase().includes('human') || englishUserMessage.toLowerCase().includes('agent') || englishUserMessage.toLowerCase().includes('sales rep'))
    ]);
    
    // 3. Handle Lead Capture if applicable
    if (leadInfo.shouldCaptureLead) {
      const newLead = {
        id: (mockLeads.length + 1).toString(),
        name: leadInfo.name || 'N/A',
        email: leadInfo.email || 'N/A',
        phone: leadInfo.phone || '',
        status: 'New' as const,
        createdAt: new Date().toISOString().split('T')[0],
        sourceUrl: pageUrl,
      };
      console.log('Captured new lead:', newLead);
      
      let leadResponse = `Thanks, ${leadInfo.name || 'friend'}! Someone from our team will be in touch shortly about your interest in ${leadInfo.productOfInterest || 'our services'}.`;
      
      if (userLanguage !== 'English') {
        leadResponse = await translate(leadResponse, 'English', userLanguage);
      }
      return createTextResponse(leadResponse);
    }

    // 4. Handle Escalation if applicable
    if (escalationCheck) {
      const webhookUrl = 'https://your-crm.com/api/escalate-webhook'; 
      const escalationResult = await escalateChatToHuman({
        chatId: 'simulated-chat-id',
        message: englishUserMessage,
        webhookUrl: webhookUrl,
      });

      let escalationResponse = escalationResult.success 
        ? "I've escalated your request to a human agent. They will be with you shortly."
        : "I'm sorry, I couldn't escalate to a human agent right now. Please try again later.";
      
      if (userLanguage !== 'English') {
        escalationResponse = await translate(escalationResponse, 'English', userLanguage);
      }
      return createTextResponse(escalationResponse);
    }
    
    // 5. FAQ Answering & Streaming Response
    const faqContext = mockFaqs
      .filter(faq => faq.language.toLowerCase() === 'English') // Always use English context
      .map(faq => `Q: ${faq.question}\nA: ${faq.answer}`)
      .join('\n\n');

    // Get the streaming iterator
    const { stream: responseStream, response: finalResponsePromise } = await respondToUserQueryStream({
      userQuery: englishUserMessage,
      faqContext: faqContext,
    });
    
    // If the user's language is not English, we need to translate the stream.
    if (userLanguage !== 'English') {
        const finalResponse = await finalResponsePromise;
        const translatedResponse = await translate(finalResponse.response, 'English', userLanguage);
        return createTextResponse(translatedResponse);
    }

    // Otherwise, we can return the stream directly.
    return createStreamingResponse(responseStream);

  } catch (error: any) {
    console.error('[CHAT_API_ERROR]', error);
    let errorMessage = 'An unknown error occurred';
    if (error) {
      errorMessage = error.message || JSON.stringify(error);
    }
    
    const status = error.cause?.status || 500;
    
    // Provide more specific error messages based on the underlying error
    if (errorMessage.includes('API key')) {
      return new NextResponse(JSON.stringify({
        error: 'AI service configuration error.', 
        details: 'Missing or invalid Google AI API key. Please check your environment variables.'
      }), {status: 500});
    }

    if (status === 503 || errorMessage.includes('Service Unavailable')) {
      return new NextResponse(JSON.stringify({error: 'The AI service is temporarily unavailable. Please try again in a few moments.', details: errorMessage}), {status: 503});
    }

    return new NextResponse(JSON.stringify({error: 'Something went wrong', details: errorMessage}), {status: status});
  }
}
