import OpenAI from 'openai';
import { OPENROUTER_API_KEY, SITE_URL, SITE_NAME } from '@/lib/env';

// Initialize the OpenAI client with OpenRouter configuration
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": SITE_URL, // Site URL for rankings on openrouter.ai
    "X-Title": SITE_NAME, // Site title for rankings on openrouter.ai
  },
  dangerouslyAllowBrowser: true, // This allows usage in browser environment
});

// Available models from OpenRouter
export const AVAILABLE_MODELS = {
  'deepseek-v3': 'deepseek/deepseek-chat-v3-0324:free',
  'gemini-2.0-flash': 'google/gemini-2.0-flash-thinking-exp-1219:free',
};

interface GenerateQueryParams {
  question: string;
  databaseType: string;
  schema?: string;
  aiModel: string;
}

interface GenerateQueryResult {
  query: string;
  error?: string;
}

/**
 * Generates a database query from natural language using OpenRouter AI
 */
export async function generateQuery({
  question,
  databaseType,
  schema,
  aiModel
}: GenerateQueryParams): Promise<GenerateQueryResult> {
  try {
    // Build the system prompt based on the database type and schema
    let systemPrompt = `You are a database expert. Convert the user's natural language question into a ${databaseType} query. 
Return ONLY the query code with no additional explanation or conversation.`;

    if (schema) {
      systemPrompt += `\n\nUse the following database schema for reference:\n${schema}`;
    }

    // Get the model ID from the selected AI model
    const modelId = AVAILABLE_MODELS[aiModel] || AVAILABLE_MODELS['deepseek-v3'];

    // Log the prompts being sent to the AI
    console.log('=== AI INPUT ===');
    console.log('System Prompt:', systemPrompt);
    console.log('User Question:', question);
    console.log('Model:', modelId);

    // Measure response time
    const startTime = performance.now();

    // Call the OpenRouter API through the OpenAI client
    const completion = await openai.chat.completions.create({
      model: modelId,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.2, // Lower temperature for more deterministic responses
      max_tokens: 1000,
    });

    // Calculate and print response latency
    const endTime = performance.now();
    const latency = endTime - startTime;
    console.log(`AI Response Latency: ${latency.toFixed(2)}ms`);

    // Log the complete AI response
    console.log('=== AI OUTPUT ===');
    console.log('Response:', completion);
    console.log('Generated Query:', completion.choices[0]?.message?.content);

    // Extract the generated query from the response
    const generatedQuery = completion.choices[0]?.message?.content?.trim() || '';

    return { query: generatedQuery };
  } catch (error) {
    console.error('Error generating query:', error);
    return { 
      query: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Validates if the API key is properly configured
 */
export function isApiKeyConfigured(): boolean {
  return !!openai.apiKey && openai.apiKey.length > 0;
} 