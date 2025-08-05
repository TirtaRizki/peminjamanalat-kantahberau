'use client';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import About from '@/components/landing/about';
import Stats from '@/components/landing/stats';
import Sop from '@/components/landing/sop';
import Catalog from '@/components/landing/catalog';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import Chatbot from '@/components/landing/chatbot';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Stats />
        <Sop />
        <Catalog />
        <Contact />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
