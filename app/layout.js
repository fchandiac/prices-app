"use client";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import useLoadProducts from "../hooks/useLoadProducts";
import useLoadPrices from "../hooks/useLoadPrices"; // Importa el nuevo hook
import "./globals.css";
import react, {useEffect, useState} from "react";
import UploadPricesDialog from "../components/UploadPricesDialog";
import UploadProductsDialog from "../components/UploadProductsDialog";

export default function RootLayout({ children }) {
  const [openUplodPricesDialog, setOpenUploadPricesDialog] = useState(false);
  const [openUploadProductsDialog, setOpenUploadProductsDialog] = useState(false);

  const {
    loadProducts,
    isLoading: isLoadingProducts,
    error: loadProductsError,
  } = useLoadProducts();
  const {
    loadPrices,
    isLoading: isLoadingPrices,
    error: loadPricesError,
  } = useLoadPrices(); // Usa el hook para cargar precios

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
              <ListItem
                button
                disabled={isLoadingProducts}
                onClick={loadProducts}
              >
                <ListItemText
                  primary={
                    isLoadingProducts ? "Loading..." : "Actualizar Productos"
                  }
                />
              </ListItem>
              {loadProductsError && (
                <ListItem>
                  <Typography color="error">{loadProductsError}</Typography>
                </ListItem>
              )}
              <ListItem button disabled={isLoadingPrices} onClick={loadPrices}>
                <ListItemText
                  primary={
                    isLoadingPrices ? "Loading Prices..." : "Actualizar Precios"
                  }
                />
              </ListItem>
              {loadPricesError && (
                <ListItem>
                  <Typography color="error">{loadPricesError}</Typography>
                </ListItem>
              )}
              <ListItem button onClick={() => setOpenUploadPricesDialog(true)}>
                <ListItemText primary="Subir Precios" />
              </ListItem>
              <ListItem button onClick={() => setOpenUploadProductsDialog(true)}>
                <ListItemText primary="Subir Productos" />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ padding: 2, width: "100%", backgroundColor: "grey.70" }}>
            {children}
          </Box>
        </Box>

        <UploadPricesDialog open={openUplodPricesDialog} onClose={() => setOpenUploadPricesDialog(false)} />
        <UploadProductsDialog open={openUploadProductsDialog} onClose={() => setOpenUploadProductsDialog(false)} />

      </body>
    </html>
  );
}
