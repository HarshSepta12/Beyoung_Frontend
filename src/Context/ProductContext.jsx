import React, { createContext, useState, useEffect } from "react";
import { getProducts, getCategories } from "../Services/productsService.js";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategory(categoriesData);
      } catch (err) {
        console.error("Error fetching products or categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
// console.log("DATA FROM CONTEXT",products );

  return (
    <ProductContext.Provider value={{ products, category, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
