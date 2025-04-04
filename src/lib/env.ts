/**
 * Environment variable configuration for the application
 */

// OpenRouter API Key - used for query generation
export const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

// Application information for OpenRouter
export const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin;
export const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Query GPT';

// Flag to check if we're in development mode
export const IS_DEVELOPMENT = import.meta.env.MODE === 'development';

// Helper function to check if required environment variables are set
export function validateEnvironment(): { valid: boolean; missing: string[] } {
  const requiredVars = [
    { name: 'OPENROUTER_API_KEY', value: OPENROUTER_API_KEY },
  ];

  const missing = requiredVars
    .filter(v => !v.value)
    .map(v => v.name);

  return {
    valid: missing.length === 0,
    missing
  };
} 