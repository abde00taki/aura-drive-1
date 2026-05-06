import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

// Layout & Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Contact from './pages/Contact';
import DestinationDetails from './pages/DestinationDetails';
import BookingPage from './pages/BookingPage';
import TravelGuides from './pages/TravelGuides';
import ArticleDetails from './pages/ArticleDetails';
import AboutUs from './pages/AboutUs';

function App() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsFading(false);
    window.scrollTo(0, 0);

    let isMounted = true;
    let fallbackTimer;
    let removeLoaderTimer;

    const finishLoading = () => {
      if (!isMounted) return;
      setIsFading(true);
      removeLoaderTimer = setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 500);
    };

    // Give React a tiny tick to render new DOM elements
    setTimeout(() => {
      if (!isMounted) return;

      const images = Array.from(document.querySelectorAll('img'));
      
      if (images.length === 0) {
        finishLoading();
        return;
      }

      const promises = images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Resolve on error so we don't block
        });
      });

      Promise.all(promises).then(() => {
        clearTimeout(fallbackTimer);
        finishLoading();
      });

      // 3-second safety fallback timeout
      fallbackTimer = setTimeout(() => {
        finishLoading();
      }, 3000);

    }, 50);

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
      clearTimeout(removeLoaderTimer);
    };
  }, [location.pathname]);

  // Handle RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      {isLoading && <Preloader isFading={isFading} />}
      <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.desc')} />
      </Helmet>
      
      <NavBar />
      
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/book/:carId" element={<BookingPage />} />
          <Route path="/guides" element={<TravelGuides />} />
          <Route path="/guide/:id" element={<ArticleDetails />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
    </>
  );
}

export default App;
