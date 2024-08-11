import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import usePricesExcelUploader from '../hooks/usePricesExcelUploader';

const UploadPricesDialog = ({ open, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadPricesExcel, isPricesUploading, pricesError, validHeaders } =
    usePricesExcelUploader();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      await uploadPricesExcel(selectedFile);
      if (validHeaders) {
        setSelectedFile(null);
        onClose(); // Cierra el diálogo si los encabezados son válidos
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '300px',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Subir Archivo de Precios
        </Typography>
        <form onSubmit={handleUploadSubmit}>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            style={{ marginBottom: '10px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPricesUploading}
          >
            {isPricesUploading ? (
              <CircularProgress size={24} />
            ) : (
              'Subir'
            )}
          </Button>
        </form>
        {pricesError && (
          <Alert severity="error" sx={{ marginTop: '10px' }}>
            {pricesError}
          </Alert>
        )}
      </Box>
    </Dialog>
  );
};

export default UploadPricesDialog;
