import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Database, Code, Zap, Brain, Share2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const Features = () => {
  const { t } = useI18n();
  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-purple-500" />,
      title: t('features.item.ai.title'),
      description: t('features.item.ai.desc')
    },
    {
      icon: <Database className="h-10 w-10 text-purple-500" />,
      title: t('features.item.multi.title'),
      description: t('features.item.multi.desc')
    },
    {
      icon: <Code className="h-10 w-10 text-purple-500" />,
      title: t('features.item.syntax.title'),
      description: t('features.item.syntax.desc')
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: t('features.item.instant.title'),
      description: t('features.item.instant.desc')
    },
    {
      icon: <Brain className="h-10 w-10 text-purple-500" />,
      title: t('features.item.schema.title'),
      description: t('features.item.schema.desc')
    },
    {
      icon: <Share2 className="h-10 w-10 text-purple-500" />,
      title: t('features.item.share.title'),
      description: t('features.item.share.desc')
    }
  ];

  return (
    <section id="features-section" className="py-16 px-4 md:px-8 bg-secondary/50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">{t('features.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
