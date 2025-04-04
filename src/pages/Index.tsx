import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QueryGenerator from '@/components/QueryGenerator';
import Features from '@/components/Features';
import HowToUse from '@/components/HowToUse';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <QueryGenerator />
        <HowToUse />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
