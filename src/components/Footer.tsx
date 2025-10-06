import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="w-full py-6 px-4 md:px-8 text-center text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} Query GPT - {t('footer.copyright')}</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com/zhangchenchen/query_gpt" className="hover:text-primary transition-colors">{t('footer.links.github')}</a>
          <Link to="/terms" className="hover:text-primary transition-colors">{t('footer.links.terms')}</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.links.privacy')}</Link>
          <a href="mailto:support@query-gpt.com" className="hover:text-primary transition-colors">{t('footer.links.contact')}</a>
          <a href="https://picturetodrawing.org" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Picture to Drawing</a>
          <a href="https://bananananoai.net/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer" title="Banana Nano AI - Your Ultimate AI Image Tools">Banana Nano AI</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
