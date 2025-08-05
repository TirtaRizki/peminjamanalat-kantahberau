import Header from '@/components/landing/header';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

export default function KontakPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
