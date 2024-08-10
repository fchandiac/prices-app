"use client";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import usePricesExcelUploader from "../hooks/usePricesExcelUploader";
import useProductsExcelUploader from "../hooks/useProductsExcelUploader";
import useLoadProducts from "../hooks/useLoadProducts";
import useLoadPrices from "../hooks/useLoadPrices"; // Importa el nuevo hook
import "./globals.css";

export default function RootLayout({ children }) {
  const [openUploadProductsDialog, setOpenUploadProductsDialog] = useState(false);
  const [openUploadPricesDialog, setOpenUploadPricesDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { uploadPricesExcel, isPricesUploading, pricesError } = usePricesExcelUploader();
  const { uploadProductsExcel, isProductsUploading, productsError } = useProductsExcelUploader();
  const { loadProducts, isLoading: isLoadingProducts, error: loadProductsError } = useLoadProducts();
  const { loadPrices, isLoading: isLoadingPrices, error: loadPricesError } = useLoadPrices(); // Usa el hook para cargar precios

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateProductsSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      await uploadProductsExcel(selectedFile);
      setSelectedFile(null); // Clear the selected file after upload
      setOpenUploadProductsDialog(false); // Close the dialog after upload
    }
  };

  const handleAddPricesSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      await uploadPricesExcel(selectedFile);
      setSelectedFile(null); // Clear the selected file after upload
      setOpenUploadPricesDialog(false); // Close the dialog after upload
    }
  };

  return (
    <html lang="en">
      <body>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100vw",
            backgroundColor: "grey.100",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "5px",
              height: "100vh",
              width: "10vw",
              minWidth: "200px",
              flexDirection: "column",
              backgroundColor: "grey.300",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              PricesApp
            </Typography>
            <List>
              <ListItem button onClick={() => setOpenUploadProductsDialog(true)}>
                <ListItemText primary="Subir archivo de productos" />
              </ListItem>
              <ListItem button onClick={() => setOpenUploadPricesDialog(true)}>
                <ListItemText primary="Subir archivo de precios" />
              </ListItem>
              <ListItem button disabled={isLoadingProducts} onClick={loadProducts}>
                <ListItemText
                  primary={isLoadingProducts ? "Loading..." : "Actualizar Productos"}
                />
              </ListItem>
              {loadProductsError && (
                <ListItem>
                  <Typography color="error">{loadProductsError}</Typography>
                </ListItem>
              )}
              <ListItem button disabled={isLoadingPrices} onClick={loadPrices}>
                <ListItemText
                  primary={isLoadingPrices ? "Loading Prices..." : "Actualizar Precios"}
                />
              </ListItem>
              {loadPricesError && (
                <ListItem>
                  <Typography color="error">{loadPricesError}</Typography>
                </ListItem>
              )}
            </List>
          </Box>

          <Box sx={{ padding: 2, width: "100%", backgroundColor: "grey.70" }}>
            {children}
          </Box>
        </Box>
      </body>

      <Dialog
        open={openUploadProductsDialog}
        onClose={() => setOpenUploadProductsDialog(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">Subir archivo de productos</Typography>
          <div>
            <form onSubmit={handleUpdateProductsSubmit}>
              <input type="file" accept=".xlsx" onChange={handleFileChange} />
              <button type="submit" disabled={isProductsUploading}>
                {isProductsUploading ? "Uploading..." : "Upload"}
              </button>
            </form>
            {productsError && (
              <Typography color="error">{productsError}</Typography>
            )}
          </div>
        </Box>
      </Dialog>

      <Dialog
        open={openUploadPricesDialog}
        onClose={() => setOpenUploadPricesDialog(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">Subir Archivo de precios</Typography>
          <div>
            <form onSubmit={handleAddPricesSubmit}>
              <input type="file" accept=".xlsx" onChange={handleFileChange} />
              <button type="submit" disabled={isPricesUploading}>
                {isPricesUploading ? "Uploading..." : "Upload"}
              </button>
            </form>
            {pricesError && (
              <Typography color="error">{pricesError}</Typography>
            )}
          </div>
        </Box>
      </Dialog>
    </html>
  );
}
