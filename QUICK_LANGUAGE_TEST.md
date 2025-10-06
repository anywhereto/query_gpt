# 快速语言测试指南

## 🧪 一键测试所有语言

### 启动开发服务器
```bash
npm run dev
```

### 测试 URL（复制到浏览器）

#### 英语 🇺🇸
```
http://localhost:5173/?lang=en
```

#### 简体中文 🇨🇳
```
http://localhost:5173/?lang=zh
```

#### 西班牙语 🇪🇸
```
http://localhost:5173/?lang=es
```

#### 葡萄牙语 🇵🇹
```
http://localhost:5173/?lang=pt
```

#### 法语 🇫🇷
```
http://localhost:5173/?lang=fr
```

---

## ✅ 检查清单

访问每个语言版本，验证：

- [ ] 页面标题显示对应语言
- [ ] Hero 区域文本正确翻译
- [ ] 功能特性描述正确翻译
- [ ] 使用步骤说明正确翻译
- [ ] FAQ 内容正确翻译
- [ ] 查询生成器界面正确翻译
- [ ] 页脚链接正确翻译
- [ ] 语言切换器显示正确

---

## 🔍 SEO 验证

在浏览器控制台运行以下代码：

```javascript
// 验证 HTML lang 属性
console.log('HTML lang:', document.documentElement.lang);

// 验证页面标题
console.log('Title:', document.title);

// 验证 Meta 描述
console.log('Description:', document.querySelector('meta[name="description"]')?.content);

// 验证 Hreflang 链接
console.log('Hreflang links:');
document.querySelectorAll('link[rel="alternate"]').forEach(link => {
  console.log(`  ${link.getAttribute('hreflang')}: ${link.href}`);
});

// 验证 OG Locale
console.log('OG Locale:', document.querySelector('meta[property="og:locale"]')?.content);
```

**预期输出示例（西班牙语）**:
```
HTML lang: es
Title: Query GPT - Generador de Consultas SQL con IA | Lenguaje Natural a SQL
Description: Query GPT transforma tus preguntas...
Hreflang links:
  en: http://localhost:5173/?lang=en
  zh-Hans: http://localhost:5173/?lang=zh
  es: http://localhost:5173/?lang=es
  pt: http://localhost:5173/?lang=pt
  fr: http://localhost:5173/?lang=fr
  x-default: http://localhost:5173/
OG Locale: es_ES
```

---

## 🎯 功能测试

### 1. 语言切换器测试
1. 访问任意语言版本
2. 点击右上角 "Language" 按钮
3. 选择不同语言
4. 验证：界面立即切换 + URL 参数更新

### 2. 语言持久化测试
1. 选择一种语言（如西班牙语）
2. 刷新页面
3. 验证：语言保持为西班牙语

### 3. URL 参数优先级测试
1. localStorage 设置为中文
2. 访问 `?lang=fr`
3. 验证：显示法语（URL 参数优先）

---

## 📊 预期结果

### 各语言欢迎文本

| 语言 | Hero 标题前缀 | CTA 按钮 |
|------|--------------|---------|
| English | Transform Natural Language into | Try now |
| 简体中文 | 将自然语言转换为 | 立即体验 |
| Español | Transforma Lenguaje Natural en | Probar ahora |
| Português | Transforme Linguagem Natural em | Experimentar agora |
| Français | Transformez le Langage Naturel en | Essayer maintenant |

---

## 🚀 部署前最终检查

- [ ] 所有5种语言都能正常切换
- [ ] URL 参数 `?lang=xx` 正常工作
- [ ] 语言选择会保存到 localStorage
- [ ] HTML lang 属性动态更新
- [ ] Meta 标签随语言变化
- [ ] Hreflang 链接完整
- [ ] 构建成功无错误
- [ ] Sitemap 包含所有语言

---

## 🎉 成功标准

所有检查项都通过 ✅ = 可以部署！🚀

