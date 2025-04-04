/**
 * Environment variable configuration for the application
 */

// OpenAI API Key - used for query generation
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Flag to check if we're in development mode
export const IS_DEVELOPMENT = import.meta.env.MODE === 'development';

// Helper function to check if required environment variables are set
export function validateEnvironment(): { valid: boolean; missing: string[] } {
  const requiredVars = [
    { name: 'OPENAI_API_KEY', value: OPENAI_API_KEY },
  ];

  const missing = requiredVars
    .filter(v => !v.value)
    .map(v => v.name);

  return {
    valid: missing.length === 0,
    missing
  };
} 