# 🧪 SQL测试用例

## 简单测试查询

### 1. 基础查询
**自然语言：** `查找所有用户`
**数据库类型：** MySQL
**期望SQL：**
```sql
SELECT * FROM users;
```

### 2. 条件查询
**自然语言：** `查找年龄大于25的用户`
**数据库类型：** MySQL
**期望SQL：**
```sql
SELECT * FROM users WHERE age > 25;
```

### 3. 计数查询
**自然语言：** `统计用户总数`
**数据库类型：** MySQL
**期望SQL：**
```sql
SELECT COUNT(*) FROM users;
```

### 4. 排序查询
**自然语言：** `按创建时间倒序显示最新的10个用户`
**数据库类型：** MySQL
**期望SQL：**
```sql
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;
```

### 5. 分组查询
**自然语言：** `按城市统计用户数量`
**数据库类型：** MySQL
**期望SQL：**
```sql
SELECT city, COUNT(*) as user_count FROM users GROUP BY city;
```

## 🧪 快速测试步骤

### 方法1：浏览器测试
1. 打开 http://localhost:8080
2. 选择数据库类型：**MySQL**
3. 选择AI模型：**DeepSeek V3**
4. 输入问题：**查找所有用户**
5. 点击"生成查询"
6. 查看生成的SQL是否合理

### 方法2：API直接测试
```bash
curl -X POST http://localhost:3001/api/generate-query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "查找所有用户",
    "databaseType": "MySQL",
    "aiModel": "deepseek-v3"
  }'
```

### 方法3：带Schema的测试
```bash
curl -X POST http://localhost:3001/api/generate-query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "查找所有活跃用户的姓名和邮箱",
    "databaseType": "MySQL",
    "schema": "CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), is_active BOOLEAN, created_at TIMESTAMP);",
    "aiModel": "deepseek-v3"
  }'
```

## ✅ 测试成功标志

- 返回有效的SQL语句
- SQL语法正确
- 符合问题描述的逻辑
- 没有报错信息

## 🐛 如果失败了

检查以下项目：
1. 后端服务器是否运行（http://localhost:3001/api/health）
2. API Key是否配置正确
3. CORS错误是否已修复
4. 网络连接是否正常

开始测试吧！🚀