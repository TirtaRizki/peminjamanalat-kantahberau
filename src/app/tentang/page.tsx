import Header from '@/components/landing/header';
import About from '@/components/landing/about';
import Footer from '@/components/landing/footer';

export default function TentangPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <About />
      </main>
      <Footer />
    </div>
  );
}
