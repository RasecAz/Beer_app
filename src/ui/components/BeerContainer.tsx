import React, { useState, useEffect } from 'react';
import BeerLoader from '@/src/ui/components/BeerLoader'; // Verifica que esta ruta sea correcta
import BeerHome from '@/src/ui/components/BeerHome';   // Verifica que esta ruta sea correcta

const BeerContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loaderDuration = 3000; // Puedes ajustar este valor (en milisegundos)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loaderDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <BeerLoader />
      ) : (
        <BeerHome />
      )}
    </div>
  );
};

export default BeerContainer;
