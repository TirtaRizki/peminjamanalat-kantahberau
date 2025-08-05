import Header from '@/components/landing/header';
import Catalog from '@/components/landing/catalog';
import Footer from '@/components/landing/footer';

export default function KatalogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Catalog />
      </main>
      <Footer />
    </div>
  );
}
