import OpenAI from 'openai';

// 初始化OpenAI客户端
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://query-gpt.com",
    "X-Title": "Query GPT",
  },
});

// 可用模型配置
const AVAILABLE_MODELS = {
  'deepseek-v3': 'deepseek/deepseek-chat-v3-0324:free',
  'gemini-2.0-flash': 'google/gemini-2.0-flash-thinking-exp-1219:free',
};

export default async function handler(req, res) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允许POST请求' });
  }

  // CORS头设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

    const startTime = Date.now();

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

    const endTime = Date.now();
    const latency = endTime - startTime;

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
}