# SEO 功能测试指南

## 🧪 快速测试步骤

### 1. 启动开发服务器

```bash
npm run dev
```

访问: http://localhost:5173

### 2. 测试 HTML Lang 属性

**步骤**:
1. 打开浏览器开发者工具（F12）
2. 切换到 Elements 标签
3. 查看 `<html>` 标签
4. 点击页面右上角的语言切换器
5. 观察 lang 属性的变化

**预期结果**:
```html
<!-- 英文模式 -->
<html lang="en">

<!-- 中文模式 -->
<html lang="zh">
```

### 3. 测试 Meta 标签

**在控制台运行**:
```javascript
// 查看当前 meta 标签
console.log('Title:', document.title);
console.log('Description:', document.querySelector('meta[name="description"]')?.content);
console.log('Keywords:', document.querySelector('meta[name="keywords"]')?.content);
console.log('OG Title:', document.querySelector('meta[property="og:title"]')?.content);
console.log('OG Locale:', document.querySelector('meta[property="og:locale"]')?.content);
```

**切换语言后再次运行，验证内容已更新**

### 4. 测试 Hreflang 链接

**在控制台运行**:
```javascript
// 查看所有 hreflang 链接
const hreflangs = Array.from(document.querySelectorAll('link[rel="alternate"]'));
hreflangs.forEach(link => {
  console.log(`${link.getAttribute('hreflang')}: ${link.href}`);
});
```

**预期输出**:
```
en: http://localhost:5173/?lang=en
zh-Hans: http://localhost:5173/?lang=zh
x-default: http://localhost:5173/
```

### 5. 测试 Sitemap

访问: http://localhost:5173/sitemap.xml

**预期**: 显示包含多语言链接的 XML sitemap

## 📊 SEO 工具测试

### Google Lighthouse 审计

1. 打开 Chrome DevTools
2. 切换到 Lighthouse 标签
3. 选择 "SEO" 类别
4. 点击 "Generate report"

**目标分数**: ≥ 90/100

### 检查项目清单

#### ✅ 基础 SEO
- [ ] HTML lang 属性正确
- [ ] Title 标签存在且有意义
- [ ] Meta description 存在且描述准确
- [ ] 所有图片有 alt 属性
- [ ] 页面有唯一的 H1 标签

#### ✅ 多语言 SEO
- [ ] Hreflang 标签正确配置
- [ ] 每种语言有独立的 meta 描述
- [ ] OG locale 标签正确
- [ ] Sitemap 包含所有语言版本

#### ✅ 技术 SEO
- [ ] 响应式设计（移动友好）
- [ ] 页面加载速度 < 3s
- [ ] 没有 404 错误
- [ ] HTTPS 启用

## 🔍 实战测试场景

### 场景 1: 中文用户首次访问

1. 清除浏览器缓存
2. 设置浏览器语言为中文
3. 访问网站
4. 验证:
   - [ ] 页面自动显示中文
   - [ ] HTML lang="zh"
   - [ ] Meta 标签为中文

### 场景 2: 英文用户切换到中文

1. 访问英文版本
2. 点击语言切换器选择中文
3. 验证:
   - [ ] 界面立即切换到中文
   - [ ] HTML lang 更新为 "zh"
   - [ ] Meta 标签更新为中文
   - [ ] 刷新页面后仍为中文

### 场景 3: 搜索引擎爬虫模拟

使用 cURL 模拟搜索引擎:

```bash
# 获取英文版本
curl -A "Googlebot" "http://localhost:5173/?lang=en" | grep -E '<html|<title|<meta'

# 获取中文版本
curl -A "Googlebot" "http://localhost:5173/?lang=zh" | grep -E '<html|<title|<meta'
```

**注意**: 由于是客户端渲染，初始 HTML 不包含动态内容。这是 CSR 的局限性。

## 🚀 生产环境测试

### 部署到 Vercel 后

1. 提交 Sitemap 到 Google Search Console
```
https://www.query-gpt.com/sitemap.xml
```

2. 使用 Google Rich Results Test
```
https://search.google.com/test/rich-results
```

3. 验证 hreflang 标签
- 使用 [hreflang Tags Testing Tool](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/)

4. 检查移动友好性
```
https://search.google.com/test/mobile-friendly
```

## 📈 监控 SEO 表现

### 每周检查

1. **Google Search Console**
   - 索引页面数量
   - 搜索查询量
   - 平均排名

2. **Google Analytics**
   - 自然搜索流量
   - 各语言版本的访问量
   - 用户停留时间

3. **关键词排名**
   - "Query GPT" 排名
   - "AI SQL Generator" 排名
   - "自然语言转SQL" 排名（中文）

## ✅ 测试检查表

### 开发环境测试
- [ ] HTML lang 属性动态更新
- [ ] Meta 标签随语言切换
- [ ] Hreflang 链接正确生成
- [ ] 页面标题正确显示
- [ ] Sitemap 可访问
- [ ] 所有页面都包含 SEOHead 组件
- [ ] 语言选择持久化
- [ ] 刷新页面后语言保持

### 生产环境验证
- [ ] Google Search Console 提交 sitemap
- [ ] Google Lighthouse SEO 分数 ≥ 90
- [ ] 移动友好性测试通过
- [ ] Hreflang 标签验证通过
- [ ] 所有页面可被搜索引擎索引
- [ ] 没有重复内容警告
- [ ] Core Web Vitals 达标

## 🎯 预期 SEO 效果

### 短期（1-2 周）
- Google 开始索引多语言版本
- Search Console 显示 hreflang 数据
- 多语言搜索结果出现

### 中期（1-2 月）
- 关键词排名提升
- 不同地区展示正确语言
- 自然搜索流量增加 20-30%

### 长期（3-6 月）
- 目标关键词进入前 10
- 多语言流量均衡增长
- 品牌搜索量显著提升

## 🔧 故障排查

### 问题: HTML lang 没有更新
**解决**: 检查浏览器控制台是否有 JavaScript 错误

### 问题: Meta 标签不变
**解决**: 清除浏览器缓存，确保 SEOHead 组件已加载

### 问题: Hreflang 链接 404
**解决**: 使用 ?lang=xx 参数，不要使用 /en/ 路径

### 问题: Sitemap 无法访问
**解决**: 确保 sitemap.xml 在 public 目录下

