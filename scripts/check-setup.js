/**
 * Simple utility to check if the chat system is properly configured
 * Run this with: node scripts/check-setup.js
 */

const fs = require('fs');
const path = require('path');

function checkSetup() {
  console.log('🔍 Checking BizChatPlug Setup...\n');

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);
  
  console.log(`📁 .env.local file: ${envExists ? '✅ Found' : '❌ Missing'}`);
  
  if (envExists) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasApiKey = envContent.includes('GOOGLE_GENERATIVE_AI_API_KEY') ||
                     envContent.includes('GEMINI_API_KEY') ||
                     envContent.includes('GOOGLE_API_KEY');
    
    console.log(`🔑 API Key configured: ${hasApiKey ? '✅ Yes' : '❌ No'}`);
    
    if (hasApiKey) {
      // Check if the key looks valid (basic format check)
      const apiKeyMatch = envContent.match(/(?:GOOGLE_GENERATIVE_AI_API_KEY|GEMINI_API_KEY|GOOGLE_API_KEY)=(.+)/);
      if (apiKeyMatch && apiKeyMatch[1]) {
        const apiKey = apiKeyMatch[1].trim();
        const isPlaceholder = apiKey.includes('your_') || apiKey.includes('here') || apiKey === 'AIzaSyYourActualAPIKeyHere';
        const isValidFormat = apiKey.startsWith('AIza') && apiKey.length > 30 && !isPlaceholder;
        
        if (isPlaceholder) {
          console.log(`🔍 API Key format: ❌ Using placeholder key`);
          console.log('   Replace with your actual API key from https://ai.google.dev/');
        } else {
          console.log(`🔍 API Key format: ${isValidFormat ? '✅ Valid format' : '⚠️  May be invalid format'}`);
          
          if (!isValidFormat && !apiKey.startsWith('AIza')) {
            console.log('   Expected format: AIzaSy... (should start with "AIza")');
          }
        }
      }
    }
  }
  
  // Check if node_modules exists
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const nodeModulesExists = fs.existsSync(nodeModulesPath);
  console.log(`📦 Dependencies installed: ${nodeModulesExists ? '✅ Yes' : '❌ No'}`);
  
  // Check package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJsonExists = fs.existsSync(packageJsonPath);
  console.log(`📋 Package.json: ${packageJsonExists ? '✅ Found' : '❌ Missing'}`);
  
  console.log('\n🚀 Next Steps:');
  
  if (!envExists) {
    console.log('1. Create .env.local file in the project root');
    console.log('2. Add: GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here');
    console.log('3. Get API key from: https://ai.google.dev/');
  }
  
  if (!nodeModulesExists) {
    console.log('1. Run: npm install');
  }
  
  if (envExists && nodeModulesExists) {
    console.log('1. Start dev server: npm run dev');
    console.log('2. Open: http://localhost:9002');
    console.log('3. Test the chat widget in bottom-right corner');
  }
  
  console.log('\n📖 For detailed setup instructions, see SETUP.md');
}

checkSetup();