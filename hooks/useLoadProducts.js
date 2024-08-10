import { useState } from 'react';
import config from '../config';

const useLoadProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.serverUrl}products/load`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message); // Mensaje de éxito desde el servidor

      // Recargar la página después de actualizar los productos
      window.location.reload();
    } catch (error) {
      console.error('Error loading products:', error.message);
      setError('Error loading products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loadProducts,
    isLoading,
    error,
  };
};

export default useLoadProducts;

