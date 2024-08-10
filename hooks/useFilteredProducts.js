// import { useState, useEffect } from "react";
import config from "../config";
import { useState, useEffect } from "react";

const useFilteredProducts = (hasPrices, page = 1, limit = 10, nameFilter = "", codeFilter = "", familyFilter = "") => {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [totalPages, setTotalPages] = useState(0); // Estado para el total de páginas
  const [totalCount, setTotalCount] = useState(0); // Estado para el total de productos
  const [loading, setLoading] = useState(true); // Estado para el cargando
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true); // Activar estado de cargando
      setError(null); // Limpiar errores anteriores

      try {
        const response = await fetch(`${config.serverUrl}products/filter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hasPrices,
            page,
            limit,
            nameFilter,
            codeFilter,
            familyFilter,
          }),
        });

        // Verificar si la respuesta no es exitosa
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parsear datos de la respuesta
        const data = await response.json();

        // Actualizar estado con los productos, total de páginas y total de productos
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      } catch (err) {
        // Manejar errores
        setError(err.message || "Error fetching products");
      } finally {
        // Desactivar estado de cargando
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [hasPrices, page, limit, nameFilter, codeFilter, familyFilter]); // Dependencias

  return { products, totalPages, totalCount, loading, error };
};

export default useFilteredProducts;
