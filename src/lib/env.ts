/**
 * Environment variable configuration for the application
 */

// API Base URL - Vercel部署时使用相对路径，本地开发时使用环境变量
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Application information
export const SITE_URL = window.location.origin;
export const SITE_NAME = 'Query GPT';

// Flag to check if we're in development mode
export const IS_DEVELOPMENT = import.meta.env.MODE === 'development';

// Helper function to check API connectivity
export async function validateApiConnection(): Promise<{ valid: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return {
      valid: data.status === 'OK' && data.apiKeyConfigured,
      error: !data.apiKeyConfigured ? 'API Key未配置' : undefined
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : '无法连接到服务器'
    };
  }
} 