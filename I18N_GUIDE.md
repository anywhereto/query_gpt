# Query GPT 多语言功能说明

## 概述

Query GPT 现已支持多语言功能，目前支持**英文（English）**和**简体中文**两种语言。

## 功能特性

### 1. 自动语言检测
- 系统会自动检测用户浏览器的语言设置
- 如果浏览器语言为中文（zh），则默认显示中文界面
- 其他语言默认显示英文界面

### 2. 手动语言切换
- 用户可以通过页面右上角的语言切换按钮手动选择界面语言
- 语言选择会保存到浏览器的 localStorage，下次访问时会记住用户的选择

### 3. 已国际化的组件

所有主要组件都已实现国际化：

- ✅ **Header** - 页面头部（包含语言切换器）
- ✅ **Hero** - 首页主横幅
- ✅ **Features** - 功能特性展示
- ✅ **HowToUse** - 使用步骤说明
- ✅ **FAQ** - 常见问题
- ✅ **Footer** - 页面底部
- ✅ **QueryGenerator** - 查询生成器主组件
- ✅ **ModelSelector** - 模型选择器
- ✅ **SchemaInput** - 数据库架构输入
- ✅ **QueryInput** - 查询问题输入
- ✅ **NotFound** - 404 页面

## 技术实现

### 架构说明

```
src/
├── i18n/
│   ├── I18nProvider.tsx          # i18n 上下文提供者
│   └── dictionaries/
│       ├── en.ts                 # 英文翻译文件
│       └── zh.ts                 # 中文翻译文件
└── components/                   # 各个组件使用 useI18n() hook
```

### 使用方法

在任何组件中使用国际化：

```tsx
import { useI18n } from '@/i18n/I18nProvider';

const MyComponent = () => {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      <h1>{t('my.translation.key')}</h1>
      <p>Current language: {locale}</p>
      <button onClick={() => setLocale('zh')}>切换到中文</button>
    </div>
  );
};
```

### 添加新的翻译

1. 在 `src/i18n/dictionaries/en.ts` 中添加英文翻译：
```typescript
const en: Record<string, string> = {
  // ... 现有翻译
  'my.new.key': 'My English translation',
};
```

2. 在 `src/i18n/dictionaries/zh.ts` 中添加中文翻译：
```typescript
const zh: Record<string, string> = {
  // ... 现有翻译
  'my.new.key': '我的中文翻译',
};
```

3. 在组件中使用：
```tsx
<p>{t('my.new.key')}</p>
```

## 翻译键命名规范

翻译键采用点分隔的命名方式，按功能区域组织：

```
区域.子区域.具体内容

示例：
- hero.title.prefix          # Hero 区域 - 标题 - 前缀
- features.item.ai.title     # Features 区域 - 项目 - AI - 标题
- generator.button.generate  # Generator 区域 - 按钮 - 生成
- footer.links.github        # Footer 区域 - 链接 - GitHub
```

## 语言切换位置

用户可以在以下位置切换语言：
- 页面右上角的语言下拉菜单
- 选项包括：
  - English（英文）
  - 简体中文（中文）

## 注意事项

1. **服务条款和隐私政策页面**：这两个页面包含大量法律文本，目前仅提供英文版本。如需中文版本，需要专业的法律翻译。

2. **翻译键的回退机制**：如果某个翻译键在当前语言中不存在，系统会自动回退到英文翻译，如果英文翻译也不存在，则显示键名本身。

3. **语言持久化**：用户选择的语言会保存在 localStorage 中，键名为 `'lang'`。

## 扩展支持更多语言

如需添加新语言（如日语、西班牙语等），请按以下步骤操作：

1. 在 `src/i18n/dictionaries/` 目录下创建新的语言文件（如 `ja.ts`、`es.ts`）
2. 复制 `en.ts` 的内容并翻译所有字符串
3. 在 `src/i18n/I18nProvider.tsx` 中：
   - 导入新语言文件
   - 更新 `Locale` 类型定义
   - 添加到 `dictionaries` 对象
   - 更新语言检测逻辑（如需要）
4. 在 `Header.tsx` 中添加新语言的下拉选项

## 测试

启动开发服务器后，可以通过以下方式测试多语言功能：

```bash
npm run dev
```

然后：
1. 访问 http://localhost:5173
2. 点击右上角的语言切换按钮
3. 选择不同语言，验证界面文本是否正确切换
4. 刷新页面，验证语言选择是否被保存

## 总结

Query GPT 的多语言系统采用轻量级的自定义实现，无需额外的依赖库，易于维护和扩展。所有用户界面文本都已实现国际化，为全球用户提供了良好的本地化体验。

