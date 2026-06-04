'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
    window.dispatchEvent(new Event('cookie_consent_accepted'));
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 md:p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-700 flex-1">
        <p>
          Utilizamos cookies para melhorar a sua experiência, analisar o tráfego do site e oferecer
          anúncios personalizados. Ao clicar em &quot;Aceitar Todos&quot;, você concorda com o uso
          de cookies.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleDecline}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Rejeitar
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Aceitar Todos
        </button>
      </div>
    </div>
  );
}
