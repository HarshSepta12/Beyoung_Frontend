import React, { useState } from "react";
import { getAllProducts, categories } from "../Services/productsService.js";
import ProductCard from "../components/ProductCard/ProductCard.jsx";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("View All");

  const allProducts = getAllProducts();
//   console.log("All Product",allProducts);
  

  const filteredProducts =
    selectedCategory === "View All"
      ? allProducts
      : allProducts.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div>
      {/* Category Filters */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              margin: "5px",
              padding: "10px 15px",
              cursor: "pointer",
              border:
                selectedCategory === cat ? "2px solid black" : "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: selectedCategory === cat ? "#f0f0f0" : "white",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
