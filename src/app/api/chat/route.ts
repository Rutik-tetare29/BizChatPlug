import {NextRequest, NextResponse} from 'next/server';
import {respondToUserQuery} from '@/ai/flows/respond-to-user-query';
import {captureLeadInformation} from '@/ai/flows/capture-lead-information';
import {escalateChatToHuman} from '@/ai/flows/escalate-chat-to-human';
import {detectLanguage} from '@/ai/flows/detect-language';
import {translateUserMessage} from '@/ai/flows/translate-user-message';
import {mockFaqs, mockLeads} from '@/lib/mock-data';

// Helper to create a streaming response
function createStreamingResponse(iterator: AsyncGenerator<any>) {
  const stream = new ReadableStream({
    async pull(controller) {
      const {value, done} = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(new TextEncoder().encode(value.response));
      }
    },
  });
  return new Response(stream, {
    headers: {'Content-Type': 'text/plain; charset=utf-8'},
  });
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

    if (userLanguage !== 'English') {
        userMessage = await translate(userMessage, userLanguage, 'English');
    }

    // 2. Lead Capture Check
    const leadInfo = await captureLeadInformation({userInput: userMessage, pageUrl});
    if (leadInfo.shouldCaptureLead) {
      // Simulate saving the lead
      const newLead = {
        id: (mockLeads.length + 1).toString(),
        name: leadInfo.name || 'N/A',
        email: leadInfo.email || 'N/A',
        phone: leadInfo.phone || '',
        status: 'New' as const,
        createdAt: new Date().toISOString().split('T')[0],
        sourceUrl: pageUrl,
      };
      // In a real app, you'd save this to a database.
      // mockLeads.push(newLead);
      console.log('Captured new lead:', newLead);
      
      let leadResponse = `Thanks, ${leadInfo.name || 'friend'}! Someone from our team will be in touch shortly about your interest in ${leadInfo.productOfInterest || 'our services'}.`;
      
      if (userLanguage !== 'English') {
        leadResponse = await translate(leadResponse, 'English', userLanguage);
      }

      const iterator = (async function* () {
        yield { response: leadResponse };
      })();

      return createStreamingResponse(iterator);
    }

    // 3. Escalation Check (Simple keyword-based for now)
    if (userMessage.toLowerCase().includes('human') || userMessage.toLowerCase().includes('agent') || userMessage.toLowerCase().includes('sales rep')) {
      // In a real app, you'd get this from settings.
      const webhookUrl = 'https://your-crm.com/api/escalate-webhook'; 
      const escalationResult = await escalateChatToHuman({
        chatId: 'simulated-chat-id',
        message: userMessage,
        webhookUrl: webhookUrl,
      });

      let escalationResponse = escalationResult.success 
        ? "I've escalated your request to a human agent. They will be with you shortly."
        : "I'm sorry, I couldn't escalate to a human agent right now. Please try again later.";
      
      if (userLanguage !== 'English') {
        escalationResponse = await translate(escalationResponse, 'English', userLanguage);
      }

      const iterator = (async function* () {
        yield { response: escalationResponse };
      })();
      return createStreamingResponse(iterator);
    }
    
    // 4. FAQ Answering
    const faqContext = mockFaqs
      .filter(faq => faq.language.toLowerCase() === userLanguage.toLowerCase())
      .map(faq => `Q: ${faq.question}\nA: ${faq.answer}`)
      .join('\n\n');

    const response = await respondToUserQuery({
      userQuery: userMessage,
      faqContext: faqContext,
    });
    
    let finalResponse = response.response;
    if (userLanguage !== 'English') {
        finalResponse = await translate(finalResponse, 'English', userLanguage);
    }

    // Simulate streaming for non-streaming flow
    const iterator = (async function* () {
      yield { response: finalResponse };
    })();

    return createStreamingResponse(iterator);

  } catch (error) {
    console.error('[CHAT_API_ERROR]', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(JSON.stringify({error: 'Something went wrong', details: errorMessage}), {status: 500});
  }
}
