import { config } from 'dotenv';
config();

import '@/ai/flows/translate-user-message.ts';
import '@/ai/flows/escalate-chat-to-human.ts';
import '@/ai/flows/respond-to-user-query.ts';
import '@/ai/flows/capture-lead-information.ts';
import '@/ai/flows/detect-language.ts';
