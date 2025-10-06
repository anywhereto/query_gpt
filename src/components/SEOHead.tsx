import { useEffect } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, keywords }) => {
  const { t, locale } = useI18n();

  // 默认 SEO 内容
  const defaultTitle = t('seo.title');
  const defaultDescription = t('seo.description');
  const defaultKeywords = t('seo.keywords');

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;

  useEffect(() => {
    // 更新页面标题
    document.title = finalTitle;

    // 更新或创建 meta 标签
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // 更新标准 meta 标签
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);

    // 更新 Open Graph 标签
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    
    // 根据语言设置 og:locale
    const localeMap: Record<string, string> = {
      'en': 'en_US',
      'zh': 'zh_CN',
      'es': 'es_ES',
      'pt': 'pt_BR',
      'fr': 'fr_FR',
    };
    updateMetaTag('og:locale', localeMap[locale] || 'en_US', true);

    // 添加 hreflang 链接
    const addHrefLangLinks = () => {
      // 移除现有的 hreflang 链接
      document.querySelectorAll('link[rel="alternate"]').forEach(link => link.remove());

      const currentPath = window.location.pathname;
      const baseUrl = window.location.origin;

      // 定义所有支持的语言和对应的 hreflang 代码
      const languages = [
        { code: 'en', hreflang: 'en' },
        { code: 'zh', hreflang: 'zh-Hans' },
        { code: 'es', hreflang: 'es' },
        { code: 'pt', hreflang: 'pt' },
        { code: 'fr', hreflang: 'fr' },
      ];

      // 为每种语言添加 hreflang 链接
      languages.forEach(({ code, hreflang }) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = `${baseUrl}${currentPath}?lang=${code}`;
        document.head.appendChild(link);
      });

      // 添加 x-default（推荐做法）
      const defaultLink = document.createElement('link');
      defaultLink.rel = 'alternate';
      defaultLink.hreflang = 'x-default';
      defaultLink.href = `${baseUrl}${currentPath}`;
      document.head.appendChild(defaultLink);
    };

    addHrefLangLinks();
  }, [finalTitle, finalDescription, finalKeywords, locale]);

  return null; // 这是一个无渲染组件
};

export default SEOHead;

