# 🧪 本地测试指南

## 🚀 快速启动

### 1. 安装依赖
```bash
# 前端依赖
npm install

# 后端依赖
cd server
npm install
cd ..
```

### 2. 配置API Key
```bash
# 编辑服务器环境配置
vi server/.env

# 或者用任何编辑器打开 server/.env，修改：
OPENROUTER_API_KEY=你的新openrouter_api_key
```

### 3. 启动服务

#### 方法一：分别启动（推荐）
```bash
# 终端1 - 启动后端服务器
cd server
node server.js

# 终端2 - 启动前端开发服务器  
vite --port 8080 --host
```

#### 方法二：同时启动
```bash
npm run start:all
```

## 🔍 测试步骤

### 1. 检查后端服务器
```bash
# 健康检查
curl http://localhost:3001/api/health

# 应该返回：
# {"status":"OK","timestamp":"...","apiKeyConfigured":true}

# 检查可用模型
curl http://localhost:3001/api/models

# 应该返回：
# {"models":["deepseek-v3","gemini-2.0-flash"]}
```

### 2. 检查前端服务器
- 浏览器访问：http://localhost:8080
- 应该看到Query GPT主页面
- 页面应该正常加载，没有404错误

### 3. 测试完整功能

**在浏览器中测试：**

1. **基础界面测试**
   - 访问 http://localhost:8080
   - 检查页面是否正常显示
   - 检查所有UI组件是否加载

2. **API连接测试**
   - 页面加载后，检查是否有错误toast提示
   - 如果API key配置正确，不应该有"API连接失败"提示

3. **查询生成测试**
   - 选择数据库类型（如MySQL）
   - 选择AI模型（如DeepSeek V3）
   - 输入自然语言问题：`查找所有用户的姓名和邮箱`
   - 点击"生成查询"按钮
   - 应该生成相应的SQL查询

4. **错误处理测试**
   - 如果API key未配置，应该显示相应错误信息
   - 网络错误时应该有友好的错误提示

## 🐛 常见问题排查

### 问题1：前端无法访问
```bash
# 检查vite进程
ps aux | grep vite

# 检查端口占用
lsof -i :8080

# 重启前端
pkill -f vite
vite --port 8080 --host
```

### 问题2：后端连接失败
```bash
# 检查后端进程
ps aux | grep "node.*server.js"

# 检查端口占用
lsof -i :3001

# 重启后端
pkill -f "node.*server.js"
cd server && node server.js
```

### 问题3：API Key配置问题
```bash
# 检查环境文件
cat server/.env

# 确保包含：
# OPENROUTER_API_KEY=sk-or-v1-xxxxx

# 重启后端让配置生效
```

### 问题4：CORS错误
- 确保后端的FRONTEND_URL配置包含前端地址
- 检查server/.env中的FRONTEND_URL设置

## 📊 测试API端点

### 直接测试后端API
```bash
# 测试查询生成（需要有效的API key）
curl -X POST http://localhost:3001/api/generate-query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "查找所有用户",
    "databaseType": "MySQL", 
    "aiModel": "deepseek-v3"
  }'
```

## 🔧 开发工具

### 浏览器开发者工具
1. 打开 http://localhost:8080
2. 按F12打开开发者工具
3. 查看Console标签页，检查是否有JavaScript错误
4. 查看Network标签页，检查API请求是否正常

### 日志查看
```bash
# 后端日志（在server目录下运行node server.js时的输出）
# 前端日志（在浏览器控制台中查看）
```

## ✅ 成功标志

当以下条件都满足时，说明修复成功：

1. ✅ 后端健康检查返回OK
2. ✅ 前端页面正常加载（http://localhost:8080）
3. ✅ 页面没有API连接错误提示
4. ✅ 能够选择模型和数据库类型
5. ✅ 输入问题后能生成SQL查询
6. ✅ 浏览器开发者工具无JavaScript错误

## 📝 注意事项

- **端口配置**：前端8080，后端3001
- **API Key安全**：现在API key只在服务器端，前端不再暴露
- **环境文件**：.env文件已在.gitignore中，不会被提交
- **网络访问**：局域网内可通过IP访问（如192.168.x.x:8080）

测试愉快！🎉