# 🚀 Vercel一键部署指南

现在你的应用已经改为Vercel全栈架构，可以像以前一样一键部署！

## 📋 部署步骤

### 1. 推送代码到GitHub
```bash
git add .
git commit -m "改为Vercel全栈部署架构"
git push
```

### 2. 在Vercel上部署
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击"New Project"
3. 选择你的GitHub仓库
4. 点击"Deploy"

### 3. 配置环境变量
部署完成后，在Vercel项目设置中添加环境变量：

**Settings → Environment Variables → Add**
- **Name:** `OPENROUTER_API_KEY`
- **Value:** `你的OpenRouter API Key`
- **Environment:** Production + Preview + Development

### 4. 重新部署
添加环境变量后，触发重新部署：
- 在Vercel Dashboard中点击"Redeploy"
- 或者推送新的commit到GitHub

## ✅ 验证部署

部署成功后，访问你的Vercel域名：
- 主页应该正常显示
- 可以正常生成SQL查询
- 不会有API连接错误

## 🔧 本地开发

如果需要本地开发和测试：

```bash
# 安装Vercel CLI
npm i -g vercel

# 本地运行（会启动Vercel Functions）
vercel dev

# 或者继续使用原来的方式
vite --port 8080
```

## 📁 新的项目结构

```
query_gpt/
├── api/                    # Vercel API Functions
│   ├── generate-query.js   # 生成查询API
│   ├── health.js          # 健康检查API
│   └── models.js          # 模型列表API
├── src/                   # 前端代码
├── vercel.json           # Vercel配置
└── ... 其他文件
```

## 🎯 优势

✅ **一键部署** - 像以前一样简单  
✅ **无服务器** - 自动扩缩容，按需付费  
✅ **全球CDN** - 更快的访问速度  
✅ **安全** - API Key不暴露在前端  
✅ **零运维** - 无需管理服务器  

## 🐛 故障排查

### 问题1：API调用失败
- 检查环境变量是否正确设置
- 查看Vercel Functions日志

### 问题2：CORS错误
- API Functions已自动处理CORS
- 如有问题，检查域名配置

### 问题3：超时错误
- Vercel Functions有30秒超时限制
- OpenRouter API通常很快响应

现在你可以享受像以前一样的简单部署体验了！🎉