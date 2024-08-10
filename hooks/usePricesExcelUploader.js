import { useState } from 'react';
import config from '../config';

const usePricesExcelUploader = () => {
  const [isPricesUploading, setIsPricesUploading] = useState(false);
  const [pricesError, setPricesError] = useState(null);

  const uploadPricesExcel = async (file) => {
    setIsPricesUploading(true);
    setPricesError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${config.serverUrl}upload/prices`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message); // Mensaje de éxito desde el servidor
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setPricesError('Error uploading file. Please try again.');
    } finally {
      setIsPricesUploading(false);
    }
  };

  return {
    uploadPricesExcel,
    isPricesUploading,
    pricesError,
  };
};

export default usePricesExcelUploader;
