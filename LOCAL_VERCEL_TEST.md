# 🧪 本地Vercel测试指南

现在应用改为Vercel架构，本地测试有两种方式：

## 方法1：使用Vercel CLI（推荐）

### 1. 安装Vercel CLI
```bash
npm i -g vercel
```

### 2. 配置环境变量
创建 `.env.local` 文件：
```bash
OPENROUTER_API_KEY=你的api_key
```

### 3. 启动本地开发服务器
```bash
vercel dev
```

访问：http://localhost:3000

## 方法2：继续使用Vite + 模拟API

### 1. 启动Vite
```bash
vite --port 8080
```

### 2. 手动测试API端点
```bash
# 测试健康检查
curl http://localhost:8080/api/health

# 测试查询生成（需要先配置环境变量）
curl -X POST http://localhost:8080/api/generate-query \
  -H "Content-Type: application/json" \
  -d '{"question":"查找所有用户","databaseType":"MySQL","aiModel":"deepseek-v3"}'
```

## ✅ 测试成功标志

1. 页面正常加载
2. API健康检查返回OK
3. 能够生成SQL查询
4. 无CORS错误

## 🚀 准备部署

测试成功后就可以推送到GitHub，然后在Vercel上部署了！

```bash
git add .
git commit -m "改为Vercel全栈架构"
git push
```

简单多了！🎉