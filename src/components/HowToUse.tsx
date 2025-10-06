import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Search, Database, Code } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const HowToUse = () => {
  const { t } = useI18n();
  const steps = [
    {
      icon: <MessageSquare className="h-10 w-10 text-purple-500" />,
      title: t('how.step1.title'),
      description: t('how.step1.desc')
    },
    {
      icon: <Database className="h-10 w-10 text-purple-500" />,
      title: t('how.step2.title'),
      description: t('how.step2.desc')
    },
    {
      icon: <Search className="h-10 w-10 text-purple-500" />,
      title: t('how.step3.title'),
      description: t('how.step3.desc')
    },
    {
      icon: <Code className="h-10 w-10 text-purple-500" />,
      title: t('how.step4.title'),
      description: t('how.step4.desc')
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">{t('how.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="glass-card hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse; 
