import Header from '@/components/landing/header';
import Sop from '@/components/landing/sop';
import Footer from '@/components/landing/footer';

export default function SopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Sop />
      </main>
      <Footer />
    </div>
  );
}
