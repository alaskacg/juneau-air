import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';

const Weather = lazy(() => import('./pages/Weather'));
const RoutesPage = lazy(() => import('./pages/Routes'));
const Fleet = lazy(() => import('./pages/Fleet'));
const Safety = lazy(() => import('./pages/Safety'));
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms'));
const PilotRegister = lazy(() => import('./pages/pilot/Register'));
const PilotDashboard = lazy(() => import('./pages/pilot/Dashboard'));
const CustomerDashboard = lazy(() => import('./pages/customer/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-sky-400 text-lg font-semibold animate-pulse">Loading...</div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/book" element={<Home />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/pilot/register" element={<PilotRegister />} />
            <Route path="/pilot/dashboard/*" element={<PilotDashboard />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
