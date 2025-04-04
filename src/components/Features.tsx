
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Database, Code, Zap, Brain, Share2 } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-purple-500" />,
    title: 'AI-Powered',
    description: 'Harness the power of advanced language models to understand complex natural language questions.'
  },
  {
    icon: <Database className="h-10 w-10 text-purple-500" />,
    title: 'Multi-Database Support',
    description: 'Generate queries for multiple database types including SQL, PostgreSQL, MySQL, and NoSQL.'
  },
  {
    icon: <Code className="h-10 w-10 text-purple-500" />,
    title: 'Syntax Highlighting',
    description: 'View generated queries with beautiful syntax highlighting for better readability.'
  },
  {
    icon: <Zap className="h-10 w-10 text-purple-500" />,
    title: 'Instant Results',
    description: 'Get your queries generated in seconds, no matter how complex your question is.'
  },
  {
    icon: <Brain className="h-10 w-10 text-purple-500" />,
    title: 'Smart Schema Analysis',
    description: 'The tool analyzes your database schema to generate the most accurate queries.'
  },
  {
    icon: <Share2 className="h-10 w-10 text-purple-500" />,
    title: 'Easy Sharing',
    description: 'Copy generated queries with a single click to share with your team.'
  }
];

const Features = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-secondary/50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Powerful Features</h2>
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
