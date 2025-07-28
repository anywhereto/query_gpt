# Query GPT Server

安全的后端API代理服务，用于处理OpenRouter API调用。

## 安装和运行

1. 安装依赖：
```bash
cd server
npm install
```

2. 配置环境变量：
```bash
cp .env.example .env
# 编辑 .env 文件，添加你的OpenRouter API key
```

3. 启动服务器：
```bash
# 开发环境
npm run dev

# 生产环境
npm start
```

## API端点

- `GET /api/health` - 健康检查
- `GET /api/models` - 获取可用模型列表
- `POST /api/generate-query` - 生成SQL查询

## 环境变量

- `OPENROUTER_API_KEY` - OpenRouter API密钥（必需）
- `PORT` - 服务器端口（默认3001）
- `FRONTEND_URL` - 允许的前端域名
- `SITE_URL` - 应用网站地址
- `SITE_NAME` - 应用名称
- `NODE_ENV` - 环境模式

## 安全特性

- API key仅在服务器端存储
- CORS配置限制访问来源
- 请求验证和错误处理
- 生产环境下隐藏调试信息