# 🔧 Chat System Setup Guide

## Issue: Chat Not Working

If you're seeing errors like "Chat service is currently unavailable" or API key errors, follow these steps:

### 1. Get a Google AI API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key" 
4. Create a new API key or use an existing one
5. Copy the API key (it should start with "AIza...")

### 2. Configure Environment Variables

1. In your project root, create a file called `.env.local`
2. Add your API key to the file:

```env
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyYourActualAPIKeyHere
```

**Important:** Replace `AIzaSyYourActualAPIKeyHere` with your actual API key from Google AI Studio.

### 3. Restart the Development Server

After adding the API key:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 4. Test the Chat

1. Open http://localhost:9002
2. Click the chat bubble in the bottom-right corner
3. Try sending a message like "Hello" or "What is your return policy?"

### Troubleshooting

#### Still Getting Errors?

**"API key not valid" Error:**
1. **Generate a New API Key**: Go to [Google AI Studio](https://ai.google.dev/) and create a fresh API key
2. **Copy the Entire Key**: Make sure you copied the complete key (usually starts with "AIza")
3. **Check Permissions**: Ensure the API key has Generative AI permissions enabled
4. **Replace in .env.local**: Update your `.env.local` with the new key

**Configuration Issues:**
1. **Check API Key Format**: Make sure it starts with "AIza" and has no extra spaces
2. **Check File Name**: The file must be exactly `.env.local` (with the dot at the start)
3. **Check File Location**: The `.env.local` file should be in the project root (same folder as `package.json`)
4. **Restart Server**: Always restart the development server after changing environment variables

**Common API Key Issues:**
- Using a placeholder key (like "your_api_key_here")
- Using an expired or revoked key
- Using a key from a different Google service
- Having extra quotes or spaces around the key

#### Alternative Environment Variable Names

If the above doesn't work, try using these alternative variable names in your `.env.local`:

```env
GEMINI_API_KEY=AIzaSyYourActualAPIKeyHere
GOOGLE_API_KEY=AIzaSyYourActualAPIKeyHere
```

#### Console Errors

If you see errors in the browser console:
1. Open Developer Tools (F12)
2. Check the Console tab for detailed error messages
3. Look for network errors or API-related messages

### Success Indicators

When everything is working correctly:
- The chat bubble appears in the bottom-right corner
- Clicking it opens a chat window
- You can type and send messages
- The AI responds with helpful answers
- No errors appear in the console

### API Usage & Limits

- Google AI has generous free tier limits
- Monitor your usage at [Google AI Studio](https://ai.google.dev/)
- Consider setting up billing alerts if needed

### Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Keep your API key secure and don't share it publicly