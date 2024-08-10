'use client';
//Path: components/ProductPrices.js
import React, { useEffect } from "react";
import useFetchPricesByProduct from "../hooks/useFetchPricesByProduct"; // Asegúrate de importar el hook
import { Box, Typography, List, ListItem, Chip } from "@mui/material";

export default function ProductPrices({ productCode, commerce }) {
  const { prices, loading, error, fetchPricesByProduct } = useFetchPricesByProduct();

  useEffect(() => {
    if (productCode) {
      fetchPricesByProduct(productCode);
    }
  }, [productCode]);

  // Función para obtener el precio más reciente por comercio
  const getLatestPricesByCommerce = () => {
    const latestPrices = {};

    prices.forEach(price => {
      const { commerce, date } = price;

      if (!latestPrices[commerce] || new Date(date) > new Date(latestPrices[commerce].date)) {
        latestPrices[commerce] = price;
      }
    });

    return Object.values(latestPrices);
  };

  const latestPrices = getLatestPricesByCommerce();

  // Encontrar el precio más reciente para el comercio objetivo
  const targetPrice = latestPrices
    .filter(price => price.commerce === commerce)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  // Comparar con los precios más recientes de otros comercios
  const priceComparison = latestPrices
    .filter(price => price.commerce !== commerce)
    .map(otherPrice => {
      const difference = targetPrice ? (otherPrice.price - targetPrice.price) : 0;
      const percentage = targetPrice ? ((targetPrice.price - otherPrice.price) / otherPrice.price) * 100 : 0;
      return {
        commerce: otherPrice.commerce,
        price: otherPrice.price,
        difference: difference,
        percentage: percentage,
        date: otherPrice.date
      };
    });

  return (
    <Box>
      {/* <Typography variant="body2" color="textSecondary">
        Comercio: {commerce}
      </Typography> */}

      {loading && <Typography fontSize={8}>Cargando precios...</Typography>}
      {/* {error && <Typography color="error">Error: {error}</Typography>} */}
      {prices.length === 0 && !loading && (
        <Typography>No se encontraron precios para este producto.</Typography>
      )}
      {prices.length > 0 && (
        <Box>
          <Typography variant="h6">Comparación de Precios</Typography>
          <List>
            {targetPrice && (
              <ListItem>
                <Chip
                  label={`Comercio: ${targetPrice.commerce} - Precio: ${targetPrice.price}`}
                  color="primary"
                />
              </ListItem>
            )}
            {priceComparison.map((comparison, index) => {
              const difference = comparison.difference.toFixed(2);
              const sign = comparison.difference > 0 ? "+" : "";
              const color = comparison.difference > 0 ? "success" : (comparison.difference < 0 ? "error" : "default");
              return (
                <ListItem key={index}>
                  <Chip
                    
                    label={`Comercio: ${comparison.commerce} - Precio: ${comparison.price} - Diferencia: ${sign}${Math.abs(difference)} (${comparison.percentage.toFixed(2)}%) - Fecha: ${new Date(comparison.date).toLocaleDateString()}`}
                    color={color}
                    sx={{ fontSize: 10,  padding: '2px 4px',}}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </Box>
  );
}
