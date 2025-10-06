import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title="Terms of Service | Query GPT" description="Read Query GPT's terms of service and usage conditions." />
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p>Welcome to Query GPT ("we," "our," or "us"). By accessing or using our website at www.query-gpt.com (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Use of the Service</h2>
          <p>Our Service allows you to generate and optimize database queries using AI technology. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Query GPT and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. User Content</h2>
          <p>You retain any and all of your rights to any content you submit, post or display on or through the Service. By uploading or sharing content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute that content for the purpose of providing the Service.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Termination</h2>
          <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Limitation of Liability</h2>
          <p>In no event shall Query GPT, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is registered, without regard to its conflict of law provisions.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at support@query-gpt.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService; 