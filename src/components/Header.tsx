import React from 'react';
import { Database } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useI18n } from '@/i18n/I18nProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t, locale, setLocale } = useI18n();
  
  // 语言映射，用于显示当前语言
  const getLanguageName = () => {
    const langMap: Record<string, string> = {
      'en': 'lang.en',
      'zh': 'lang.zh',
      'es': 'lang.es',
      'pt': 'lang.pt',
      'fr': 'lang.fr',
    };
    return t(langMap[locale] || 'lang.en');
  };
  
  return (
    <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between animate-fade-in">
      <Link to="/" className="flex items-center space-x-2 hover:text-primary transition-colors">
        <Database className="h-6 w-6 text-primary" />
        <span className="font-semibold text-xl">{t('header.title')}</span>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {t('lang.switch')}: {getLanguageName()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLocale('en')}>{t('lang.en')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocale('zh')}>{t('lang.zh')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocale('es')}>{t('lang.es')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocale('pt')}>{t('lang.pt')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocale('fr')}>{t('lang.fr')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
