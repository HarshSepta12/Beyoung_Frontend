import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts, categories } from "../Services/productsService.js";
import ProductCard from "../components/ProductCard/ProductCard.jsx";
import styles from "./Product.module.css";

const Products = () => {
  const { category } = useParams(); // ✅ URL se category param
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category : "View All"
  );

  const allProducts = getAllProducts();

  const filteredProducts =
    selectedCategory === "View All"
      ? allProducts
      : allProducts.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className={styles.productsPage}>
      {/* 🔹 Heading */}
      <h2 className={styles.pageTitle}>
        {selectedCategory === "View All" ? "All Products" : selectedCategory}
      </h2>

      {/* 🔹 Category Filter */}
      <div className={styles.categoryBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${
              selectedCategory === cat ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔹 Product Grid */}
      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className={styles.noProducts}>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
