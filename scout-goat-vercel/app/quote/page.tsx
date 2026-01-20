import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteTool } from '@/components/QuoteTool';

export const metadata = {
  title: 'Get a Quote',
  description: 'Upload photos for a fast quote. Instant estimate + Name Your Price.'
};

export default function QuotePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <QuoteTool />
      </main>
      <Footer />
    </div>
  );
}
