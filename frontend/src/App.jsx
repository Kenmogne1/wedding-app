import React, { useState, useEffect, useRef } from 'react';
import HomePage from './pages/HomePage';
import RSVPPage from './pages/RSVPPage';
import AdminPage from './pages/AdminPage';

// --- COMPOSANT PRINCIPAL ---
export default function WeddingApp() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      if (view) return view;
    }
    return 'home';
  });
  
  const observerRef = useRef(null);
  const [restoreScrollY, setRestoreScrollY] = useState(null);

  const navigate = (page) => {
    const url = new URL(window.location);
    url.searchParams.set('view', page);
    window.history.pushState({ page }, '', url);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    const handlePopState = (event) => {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view') || 'home';
      setCurrentPage(view);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const goBack = () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        navigate('home');
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      if (!el.classList.contains('is-visible')) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;
    const els = document.querySelectorAll('.reveal-on-scroll');
    els.forEach(el => {
      if (!el.classList.contains('is-visible')) {
        try { observerRef.current.observe(el); } catch (e) { /* ignore */ }
      }
      const rect = el.getBoundingClientRect();
      if (rect.top < (window.innerHeight || document.documentElement.clientHeight)) {
        el.classList.add('is-visible');
      }
    });
  }, [currentPage]);

  useEffect(() => {
    if (restoreScrollY === null) return;
    const id = setTimeout(() => {
      if (typeof window !== 'undefined') window.scrollTo({ top: restoreScrollY || 0, behavior: 'auto' });
      setRestoreScrollY(null);
    }, 80);
    return () => clearTimeout(id);
  }, [currentPage, restoreScrollY]);

  return (
    <div className="min-h-screen font-sans bg-stone-50 text-stone-800 selection:bg-red-200 selection:text-red-900">
      <style>{`
        .reveal-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 600ms ease, transform 600ms ease; }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        .reveal-scale { transform: scale(.98); transition: transform 600ms ease; }
        .reveal-scale.is-visible { transform: scale(1); }
        
        .card-animate { transform: translateY(6px) scale(0.995); transition: transform 350ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms ease, opacity 450ms ease; }
        .card-animate.is-visible { transform: translateY(0) scale(1); opacity: 1; }
        .card-animate:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 20px 40px -5px rgba(28, 25, 23, 0.1); }
        
        .btn-animate { transition: transform 180ms cubic-bezier(.2,.9,.2,1), box-shadow 180ms ease; }
        .btn-animate:active { transform: scale(.98); }
        .btn-animate:hover { box-shadow: 0 10px 24px rgba(220, 38, 38, 0.15); }
        
        @keyframes zoomInSlow { from { transform: scale(.98); opacity: .0 } to { transform: scale(1); opacity: 1 } }
        .hero-zoom { animation: zoomInSlow 900ms cubic-bezier(.2,.9,.2,1) forwards; }
        @keyframes floatTilt { 0% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-6px) rotate(-2deg) } 100% { transform: translateY(0) rotate(0deg) } }
        .float-tilt { animation: floatTilt 6s ease-in-out infinite; }
        .shimmer { position: relative; overflow: hidden; }
        .shimmer::after { content: ''; position: absolute; left: -120%; top: 0; width: 60%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.4), rgba(255,255,255,0)); transform: skewX(-12deg); animation: shimmer 2.2s linear infinite; }
        @keyframes shimmer { to { left: 120%; } }
        .animate-float { animation: float 18s linear infinite; }

        /* Animation pour le message de bienvenue */
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
      `}</style>
      
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      {currentPage === 'rsvp-oui' && <RSVPPage onNavigate={navigate} onGoBack={goBack} isAttending={true} />}
      {currentPage === 'rsvp-non' && <RSVPPage onNavigate={navigate} onGoBack={goBack} isAttending={false} />}
      {currentPage === 'admin' && <AdminPage onNavigate={navigate} onGoBack={goBack} />}
    </div>
  );
}