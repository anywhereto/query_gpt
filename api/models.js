const AVAILABLE_MODELS = {
  'deepseek-v3': 'DeepSeek V3',
  'gemini-2.0-flash': 'Gemini 2.0 Flash',
};

export default async function handler(req, res) {
  // CORS头设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只允许GET请求' });
  }

  res.json({ models: Object.keys(AVAILABLE_MODELS) });
}