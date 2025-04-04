import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToGenerator = () => {
    const generatorElement = document.getElementById('query-generator');
    if (generatorElement) {
      generatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    const featuresElement = document.getElementById('features-section');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Query GPT: Transform Natural Language into
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"> Perfect SQL</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Convert your questions into database queries instantly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button size="lg" onClick={scrollToGenerator} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            Try now
          </Button>
          <Button variant="outline" size="lg" onClick={scrollToFeatures}>
            Learn more
          </Button>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
