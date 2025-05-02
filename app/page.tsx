// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import BeerLoader from "@/src/ui/components/BeerLoader";
import BeerHome from "@/src/ui/components/BeerHome";

// Importa el nuevo archivo CSS desde la carpeta styles
import "@/src/ui/styles/HomePage.css"; // <--- CAMBIA ESTA LÍNEA


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [renderLoader, setRenderLoader] = useState(true);

  const loaderDuration = 3000;
  const transitionDuration = 500;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loaderDuration);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const transitionTimer = setTimeout(() => {
        setRenderLoader(false);
      }, transitionDuration);

      return () => clearTimeout(transitionTimer);
    }
  }, [isLoading, transitionDuration]);

  return (
    <main className="page-container"> {/* Usa la clase del nuevo CSS */}
      {renderLoader && (
        <div className={`loader-overlay ${isLoading ? 'loader-visible' : 'loader-hidden'}`}> {/* Usa las clases del nuevo CSS */}
          <BeerLoader />
        </div>
      )}
      <div className={`home-content ${isLoading ? 'home-hidden' : 'home-visible'}`}> {/* Usa las clases del nuevo CSS */}
         <BeerHome />
      </div>
    </main>
  );
}
