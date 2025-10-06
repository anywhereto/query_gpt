import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import en from './dictionaries/en';
import zh from './dictionaries/zh';
import es from './dictionaries/es';
import pt from './dictionaries/pt';
import fr from './dictionaries/fr';

type Locale = 'en' | 'zh' | 'es' | 'pt' | 'fr';

type Dictionaries = Record<Locale, Record<string, string>>;

const dictionaries: Dictionaries = { en, zh, es, pt, fr };

type I18nContextValue = {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getDefaultLocale = (): Locale => {
    const validLocales: Locale[] = ['en', 'zh', 'es', 'pt', 'fr'];
    
    // 1. 优先检查 URL 参数 ?lang=xx
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang') as Locale;
    if (validLocales.includes(urlLang)) {
      // 保存到 localStorage 以便记住用户选择
      localStorage.setItem('lang', urlLang);
      return urlLang;
    }
    
    // 2. 检查 localStorage 中保存的语言偏好
    const saved = localStorage.getItem('lang') as Locale;
    if (validLocales.includes(saved)) return saved;
    
    // 3. 最后检查浏览器语言设置
    const nav = (navigator.language || (navigator as any).userLanguage || 'en').toLowerCase();
    
    // 根据浏览器语言返回对应语言
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('es')) return 'es';
    if (nav.startsWith('pt')) return 'pt';
    if (nav.startsWith('fr')) return 'fr';
    
    return 'en'; // 默认英文
  };

  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    setLocale(getDefaultLocale());
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', locale);
    // 更新 HTML lang 属性，对 SEO 重要
    document.documentElement.lang = locale;
    
    // 更新 URL 参数，便于分享和 SEO
    const url = new URL(window.location.href);
    url.searchParams.set('lang', locale);
    window.history.replaceState({}, '', url.toString());
  }, [locale]);

  const t = useMemo(() => {
    const dict = dictionaries[locale];
    return (key: string) => {
      return dict[key] ?? dictionaries.en[key] ?? key;
    };
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({ locale, t, setLocale }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};

