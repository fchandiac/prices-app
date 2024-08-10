import React, {useRef} from "react";
import { Box, Grid, Typography } from "@mui/material";
import ProductPrices from "./ProductPrices"; // Asegúrate de importar el componente
import PriceChart from "./PriceChart";
import PrintButton from "./PrintButton";

const ProductCart = ({ product, commerce }) => {
  const printRef = useRef();
  return (
    <Box
      sx={{
        width: "100%",
      }}
      ref={printRef}
    >
      <Box>
        <Typography fontSize={18} gutterBottom>
          {product.descprod}
        </Typography>
        <Typography
          fontSize={16}
          sx={{
            lineHeight: 0.6,
            marginBottom: 2,
          }}
        >
          <strong>Códogo:</strong> {product.id_mcodbarra}
        </Typography>
        <PrintButton componentRef={printRef} />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography fontSize={10} color="textSecondary">
            <strong>ID:</strong> {product.id_mprod}
          </Typography>
          <Typography fontSize={10} color="textSecondary">
            <strong>Familia:</strong> {product.familia}
          </Typography>
          <Typography fontSize={10} color="textSecondary">
            <strong>Sufamilia:</strong> {product.sufamilia}
          </Typography>
          <Typography fontSize={10} color="textSecondary">
            <strong>Impuesto:</strong> {product.impuesto}
          </Typography>
          <Typography fontSize={10} color="textSecondary">
            <strong>Tasa:</strong> {product.tasa}
          </Typography>
          <Typography fontSize={10} color="textSecondary">
            <strong>Costo:</strong> ${product.costo.toLocaleString("es-Cl")}
          </Typography>
          <Typography fontSize={10} color="textSecondary">
            <strong>Fecha de Actualización:</strong>{" "}
            {new Date(product.fecha_actualizacion).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <ProductPrices
            productCode={product.id_mcodbarra}
            commerce={commerce}
          />
        </Grid>
        <Grid item xs={12}>
          <PriceChart productCode={product.id_mcodbarra} />
        </Grid>
      </Grid>

    </Box>
  );
};

export default ProductCart;
