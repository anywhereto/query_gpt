# ⚡ 快速测试

## 🚀 现在你可以像以前一样一键部署了！

架构已改为**Vercel全栈模式**：
- ✅ 前端：继续使用Vite + React
- ✅ 后端：改为Vercel API Functions（无服务器）
- ✅ 部署：和以前一样简单，推送GitHub即可

## 📋 立即测试

### 方法1：本地Vercel测试
```bash
# 安装Vercel CLI
npm i -g vercel

# 配置环境变量（创建.env.local）
echo "OPENROUTER_API_KEY=你的api_key" > .env.local

# 启动本地Vercel开发服务器
vercel dev
```

### 方法2：直接用Vite测试
```bash
# 启动前端
vite --port 8080

# 在浏览器中测试 http://localhost:8080
# API会调用相对路径 /api/*
```

## 🚀 部署到Vercel

1. **推送代码：**
   ```bash
   git add .
   git commit -m "改为Vercel全栈架构"
   git push
   ```

2. **在Vercel部署：**
   - 访问vercel.com
   - 选择你的仓库
   - 一键部署

3. **配置环境变量：**
   - Settings → Environment Variables
   - 添加：`OPENROUTER_API_KEY = 你的key`

就这么简单！🎉

## 🎯 优势

- ✅ 和以前一样简单部署
- ✅ 无需管理后端服务器  
- ✅ 自动扩缩容，更省钱
- ✅ API Key安全不暴露
- ✅ 全球CDN加速

快去测试吧！