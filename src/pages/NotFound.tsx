import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Plane } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <Plane className="w-16 h-16 text-sky-400 mx-auto mb-4 rotate-45" />
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <p className="text-xl text-slate-400 mb-6">This flight path doesn't exist.</p>
          <Link
            to="/"
            className="inline-block bg-sky-600 hover:bg-sky-500 px-8 py-3 rounded-xl font-semibold transition"
          >
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
