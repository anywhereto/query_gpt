import OpenAI from 'openai';
import { OPENAI_API_KEY } from '@/lib/env';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // This allows usage in browser environment (for development)
});

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
 * Generates a database query from natural language using OpenAI
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

    // Determine which model to use
    const modelName = aiModel === 'gpt-4' ? 'gpt-4-turbo' : 'gpt-3.5-turbo';

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.2, // Lower temperature for more deterministic responses
      max_tokens: 1000,
    });

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