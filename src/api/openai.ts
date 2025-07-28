import { API_BASE_URL } from '@/lib/env';

// Available models from backend
export const AVAILABLE_MODELS = {
  'deepseek-v3': 'DeepSeek V3',
  'gemini-2.0-flash': 'Gemini 2.0 Flash',
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
 * Generates a database query from natural language using backend API
 */
export async function generateQuery({
  question,
  databaseType,
  schema,
  aiModel
}: GenerateQueryParams): Promise<GenerateQueryResult> {
  try {
    const startTime = performance.now();

    const response = await fetch(`${API_BASE_URL}/api/generate-query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        databaseType,
        schema,
        aiModel
      }),
    });

    const endTime = performance.now();
    const totalLatency = endTime - startTime;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data = await response.json();

    // Log performance info
    console.log(`Total Request Latency: ${totalLatency.toFixed(2)}ms`);
    if (data.latency) {
      console.log(`AI Processing Latency: ${data.latency}ms`);
    }

    return { query: data.query || '' };
  } catch (error) {
    console.error('Error generating query:', error);
    return { 
      query: '',
      error: error instanceof Error ? error.message : '无法连接到服务器' 
    };
  }
}

/**
 * Validates if the backend API is properly configured
 */
export async function isApiKeyConfigured(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) return false;
    const data = await response.json();
    return data.status === 'OK' && data.apiKeyConfigured;
  } catch {
    return false;
  }
} 