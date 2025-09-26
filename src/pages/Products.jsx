import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext.jsx";
import ProductCard from "../components/ProductCard/ProductCard.jsx";
import styles from "./Product.module.css";
 ///harsh
const Products = () => {
  const { categoryType, categoryName, tagName } = useParams();
  const {
    products,
    category: categoriesFromContext,
    loading,
  } = useContext(ProductContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("View All");
  const [filterType, setFilterType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("View All");
  const [isFilterBarUsed, setIsFilterBarUsed] = useState(false);

  const slugify = (str) => str?.toLowerCase().trim().replace(/\s+/g, "-");

  const handleProductClickCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedFilter(categoryName);
    setFilterType("categoryFilterBar");
    setIsFilterBarUsed(true);
  };

  useEffect(() => {
    if (!products.length) return;

    let filtered = products;

    if (isFilterBarUsed) {
      if (selectedCategory && selectedCategory !== "View All") {
        filtered = products.filter((product) => {
          const name =
            typeof product.category === "string"
              ? product.category
              : product.category?.name;
          return name?.toLowerCase() === selectedCategory.toLowerCase();
        });
        setSelectedFilter(selectedCategory);
        setFilterType("categoryFilterBar");
      } else {
        filtered = products;
        setSelectedFilter("View All");
        setFilterType(null);
      }
    } else if (
      categoryType?.toLowerCase() === "general" &&
      (categoryName?.toLowerCase() === "topwear" ||
        categoryName?.toLowerCase() === "bottomwear")
    ) {
      filtered = products.filter((product) => {
        // category string hai ya object, dono case handle karo
        const cat =
          typeof product.category === "string"
            ? product.category
            : product.category?.name;

        return cat?.toLowerCase() === categoryName.toLowerCase();
      });

      setSelectedFilter(categoryName);
      setFilterType("subcategory");
    } else if (tagName) {
      filtered = products.filter((product) =>
        product.tags?.some((t) => slugify(t) === slugify(tagName))
      );
      setSelectedFilter(tagName);
      setFilterType("tag");
    } else if (
      categoryType &&
      categoryType.toLowerCase() !== "all" &&
      categoryName &&
      categoryName.toLowerCase() !== "all"
    ) {
      filtered = products.filter((product) => {
        const cat = product.category || {};
        return (
          cat.categoryType?.toLowerCase() === categoryType.toLowerCase() &&
          slugify(cat.slug) === slugify(categoryName)
        );
      });
      setSelectedFilter(categoryName);
      setFilterType("category");
    } else if (categoryType && categoryType.toLowerCase() !== "all") {
      filtered = products.filter(
        (product) =>
          product.category?.categoryType?.toLowerCase() ===
          categoryType.toLowerCase()
      );
      setSelectedFilter(categoryType);
      setFilterType("categoryType");
    } else {
      filtered = products;
      setSelectedFilter("View All");
      setFilterType(null);
    }

    setFilteredProducts(filtered);
  }, [
    categoryType,
    categoryName,
    tagName,
    selectedCategory,
    isFilterBarUsed,
    products,
  ]);

  return (
    <div className={styles.productsPage}>
      <div className={styles.filterBar}>
        <button
          className={`${styles.filterBtn} ${
            selectedCategory === "View All" ? styles.active : ""
          }`}
          onClick={() => {
            setSelectedCategory("View All");
            setIsFilterBarUsed(true);
          }}
        >
          View All
        </button>

        {categoriesFromContext.map((c) => (
          <button
            key={c._id}
            className={`${styles.filterBtn} ${
              selectedCategory === c.name ? styles.active : ""
            }`}
            onClick={() => {
              setSelectedCategory(c.name);
              setIsFilterBarUsed(true);
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <h2 className={styles.pageTitle}>
        {selectedFilter} {filterType ? `(${filterType})` : ""}
        {filteredProducts.length > 0 && (
          <span style={{ fontSize: "0.6em", color: "#666", marginLeft: 10 }}>
            ({filteredProducts.length} products)
          </span>
        )}
      </h2>

      {loading ? (
        <div style={{ textAlign: "center", padding: 50 }}>
          Loading products...
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              onCategoryClick={() =>
                handleProductClickCategory(product.category?.name || "View All")
              }
            />
          ))}
        </div>
      ) : (
        <div className={styles.noProducts}>
          <p>No products found for "{selectedFilter}"</p>
        </div>
      )}
    </div>
  );
};

export default Products;
