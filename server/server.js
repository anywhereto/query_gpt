import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors({
  origin: function (origin, callback) {
    // 允许的来源列表
    const allowedOrigins = process.env.FRONTEND_URL 
      ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
      : ['http://localhost:8080', 'http://localhost:5173', 'https://query-gpt.com'];
    
    // 允许无来源的请求（如移动应用、Postman等）
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('不允许的CORS来源'));
    }
  },
  credentials: true
}));
app.use(express.json());

// 初始化OpenAI客户端
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "https://query-gpt.com",
    "X-Title": process.env.SITE_NAME || "Query GPT",
  },
});

// 可用模型配置
const AVAILABLE_MODELS = {
  'deepseek-v3': 'deepseek/deepseek-chat-v3-0324:free',
  'gemini-2.0-flash': 'google/gemini-2.0-flash-thinking-exp-1219:free',
};

// 生成查询的API端点
app.post('/api/generate-query', async (req, res) => {
  try {
    const { question, databaseType, schema, aiModel } = req.body;

    // 输入验证
    if (!question || !databaseType || !aiModel) {
      return res.status(400).json({ 
        error: '缺少必需参数: question, databaseType, aiModel' 
      });
    }

    // 构建系统提示
    let systemPrompt = `You are a database expert. Convert the user's natural language question into a ${databaseType} query. 
Return ONLY the query code with no additional explanation or conversation.`;

    if (schema) {
      systemPrompt += `\n\nUse the following database schema for reference:\n${schema}`;
    }

    // 获取模型ID
    const modelId = AVAILABLE_MODELS[aiModel] || AVAILABLE_MODELS['deepseek-v3'];

    // 记录请求信息（仅在开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log('=== AI INPUT ===');
      console.log('System Prompt:', systemPrompt);
      console.log('User Question:', question);
      console.log('Model:', modelId);
    }

    const startTime = performance.now();

    // 调用OpenRouter API
    const completion = await openai.chat.completions.create({
      model: modelId,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.2,
      max_tokens: 1000,
    });

    const endTime = performance.now();
    const latency = endTime - startTime;

    // 记录响应信息（仅在开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log(`AI Response Latency: ${latency.toFixed(2)}ms`);
      console.log('=== AI OUTPUT ===');
      console.log('Generated Query:', completion.choices[0]?.message?.content);
    }

    const generatedQuery = completion.choices[0]?.message?.content?.trim() || '';

    res.json({ 
      query: generatedQuery,
      latency: Math.round(latency)
    });

  } catch (error) {
    console.error('Error generating query:', error);
    res.status(500).json({ 
      error: error.message || '生成查询时发生错误' 
    });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!process.env.OPENROUTER_API_KEY
  });
});

// 获取可用模型
app.get('/api/models', (req, res) => {
  res.json({ models: Object.keys(AVAILABLE_MODELS) });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn('⚠️  Warning: OPENROUTER_API_KEY not set');
  }
});