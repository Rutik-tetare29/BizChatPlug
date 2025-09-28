# BizChatPlug

An AI-powered chatbot widget for business websites that provides real-time customer support, lead generation, and analytics.

## Features

- 🤖 **AI-Powered Responses** - Real-time chat using Google Gemini AI
- 🌍 **Multi-Language Support** - English, Hindi, and Marathi
- 📊 **Lead Generation** - Automatic lead capture and tracking
- 📈 **Analytics Dashboard** - Comprehensive chat and lead analytics
- 🔄 **Human Escalation** - Route complex queries to human agents
- ⚡ **Real-time Streaming** - Instant AI responses with streaming

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Google AI API key:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
```

**Get your API key from:** https://ai.google.dev/

### 3. Start Development Server
```bash
npm run dev
```

Visit http://localhost:9002 to see your application.

### 4. Start Genkit Development (Optional)
For AI flow development and debugging:
```bash
npm run genkit:dev
```

## Project Structure

```
src/
├── ai/                 # AI flows and Genkit configuration
│   ├── flows/         # Individual AI processing flows
│   ├── genkit.ts      # Genkit configuration
│   └── dev.ts         # Development entry point
├── app/               # Next.js app router
│   ├── api/chat/      # Chat API endpoint
│   ├── dashboard/     # Admin dashboard pages
│   └── page.tsx       # Landing page
├── components/        # React components
│   ├── chat/         # Chat widget components
│   ├── dashboard/    # Dashboard components
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
└── lib/              # Utilities and types
```

## Configuration

### Environment Variables
- `GOOGLE_GENERATIVE_AI_API_KEY` - Your Google AI API key (required)
- `GEMINI_API_KEY` - Alternative API key variable name
- `GOOGLE_API_KEY` - Another alternative API key variable name

### Styling
The project uses Tailwind CSS with a custom design system:
- **Primary Color**: Dark blue (#30475E)
- **Accent Color**: Teal (#26A69A) 
- **Font**: Inter (body/headlines), Source Code Pro (code)

## Deployment

This project is configured for Firebase App Hosting:

```bash
npm run build
```

The `apphosting.yaml` file contains the deployment configuration.

## Development

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run genkit:dev` - Start Genkit development mode
- `npm run genkit:watch` - Start Genkit with file watching

### Chat Widget Integration
To integrate the chat widget into other websites, simply include the chat widget component:

```tsx
import ChatWidget from '@/components/chat/chat-widget';

// Add to your layout or page
<ChatWidget />
```

## License

MIT License - see LICENSE file for details.
