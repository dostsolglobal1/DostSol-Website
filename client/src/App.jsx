import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';

// Route-level code splitting — the homepage ships eagerly, everything else on demand.
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const About = lazy(() => import('@/pages/About'));
const Team = lazy(() => import('@/pages/Team'));
const HowWeWork = lazy(() => import('@/pages/HowWeWork'));
const Insights = lazy(() => import('@/pages/Insights'));
const InsightPost = lazy(() => import('@/pages/InsightPost'));
const Careers = lazy(() => import('@/pages/Careers'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Privacy = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Terms })));

// The console is a separate application shell — no marketing chrome, its own auth.
const AdminApp = lazy(() => import('@/admin/AdminApp'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Let the lazy route paint before jumping to the anchor.
      const id = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    return undefined;
  }, [pathname, hash]);

  return null;
}

function RouteFallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="flex flex-col items-center gap-4">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-brand" />
        <p className="text-sm text-faint">Loading…</p>
      </div>
    </div>
  );
}

/** Public marketing site: header, footer and page transitions. */
function MarketingSite() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main" className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/how-we-work" element={<HowWeWork />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/:slug" element={<InsightPost />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<MarketingSite />} />
      </Routes>
    </>
  );
}
