import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard.jsx";
import styles from "./Product.module.css";
import { ProductContext } from "../Context/ProductContext.jsx";

// Helper to slugify strings (convert spaces → dashes, lowercase)
const slugify = (str) =>
  str?.toLowerCase().trim().replace(/\s+/g, "-");

// Helper to unslugify (convert dashes → spaces, proper case)
const unslugify = (str) =>
  str?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

const Products = () => {
  const { tagOrCategory } = useParams(); // URL param (could be tag or category)
  const location = useLocation();
  const navigate = useNavigate();
  const { products, category: categoriesFromContext, loading } = useContext(ProductContext);

  const [selectedFilter, setSelectedFilter] = useState("View All");
  const [categories, setCategories] = useState(["View All"]);
  const [filterType, setFilterType] = useState(null); // 'tag' | 'category' | null
  const [matchedProducts, setMatchedProducts] = useState([]);

  // Initialize filter based on URL param
  useEffect(() => {
    if (tagOrCategory && products.length > 0) {
      const decodedParam = decodeURIComponent(tagOrCategory);
      const unslugifiedParam = unslugify(decodedParam);
      
      console.log("URL Parameter:", decodedParam);
      console.log("Unslugified:", unslugifiedParam);
      
      // Check if this matches any product tags
      const tagMatches = products.filter(product => 
        product.tags && Array.isArray(product.tags) &&
        product.tags.some(tag => 
          slugify(tag) === slugify(decodedParam) ||
          tag.toLowerCase() === unslugifiedParam.toLowerCase()
        )
      );

      // Check if this matches any product categories
      const categoryMatches = products.filter(product => {
        const categoryName = typeof product.category === "string" 
          ? product.category 
          : product.category?.name;
        
        return slugify(categoryName) === slugify(decodedParam) ||
               categoryName?.toLowerCase() === unslugifiedParam.toLowerCase();
      });

      console.log("Tag matches:", tagMatches.length);
      console.log("Category matches:", categoryMatches.length);

      if (tagMatches.length > 0) {
        setSelectedFilter(unslugifiedParam);
        setFilterType('tag');
        setMatchedProducts(tagMatches);
        console.log('Filtering by TAG:', unslugifiedParam);
      } else if (categoryMatches.length > 0) {
        setSelectedFilter(unslugifiedParam);
        setFilterType('category');
        setMatchedProducts(categoryMatches);
        console.log('Filtering by CATEGORY:', unslugifiedParam);
      } else {
        // No matches found, show all products
        setSelectedFilter("View All");
        setFilterType(null);
        setMatchedProducts(products);
        console.log('No matches found, showing all products');
      }
    } else {
      setSelectedFilter("View All");
      setFilterType(null);
      setMatchedProducts(products);
    }
  }, [tagOrCategory, products]);

  // Build category tabs using context categories
  useEffect(() => {
    if (Array.isArray(categoriesFromContext) && categoriesFromContext.length > 0) {
      setCategories(["View All", ...categoriesFromContext]);
    }
  }, [categoriesFromContext]);

  // Filter products based on selected filter and type
  const filteredProducts = React.useMemo(() => {
    if (selectedFilter === "View All") {
      return products;
    }

    if (filterType === 'tag') {
      return products.filter(product => 
        product.tags && Array.isArray(product.tags) &&
        product.tags.some(tag => 
          slugify(tag) === slugify(selectedFilter) ||
          tag.toLowerCase() === selectedFilter.toLowerCase()
        )
      );
    }

    if (filterType === 'category') {
      return products.filter(product => {
        const categoryName = typeof product.category === "string"
          ? product.category
          : product.category?.name;

        return slugify(categoryName) === slugify(selectedFilter) ||
               categoryName?.toLowerCase() === selectedFilter.toLowerCase();
      });
    }

    // Fallback: check both tags and categories
    return products.filter((product) => {
      // Check tags first
      if (product.tags && Array.isArray(product.tags)) {
        const hasMatchingTag = product.tags.some(tag => 
          slugify(tag) === slugify(selectedFilter) ||
          tag.toLowerCase() === selectedFilter.toLowerCase()
        );
        if (hasMatchingTag) return true;
      }

      // Then check category
      const categoryName = typeof product.category === "string"
        ? product.category
        : product.category?.name;

      return slugify(categoryName) === slugify(selectedFilter) ||
             categoryName?.toLowerCase() === selectedFilter.toLowerCase();
    });
  }, [products, selectedFilter, filterType]);

  // Handle category button click
  const handleCategoryClick = (catName) => {
    setSelectedFilter(catName);
    setFilterType(catName === "View All" ? null : 'category');
    
    // Update URL
    if (catName === "View All") {
      navigate("/products", { replace: true });
    } else {
      navigate(`/products/${slugify(catName)}`, { replace: true });
    }
  };

  // Clear filter and show all products
  const clearFilter = () => {
    setSelectedFilter("View All");
    setFilterType(null);
    navigate("/products", { replace: true });
  };

  // Get display name for current filter
  const getDisplayName = () => {
    if (selectedFilter === "View All") {
      return "All Products";
    }
    
    const typeLabel = filterType === 'tag' ? ' (Tag)' : filterType === 'category' ? ' (Category)' : '';
    return `${selectedFilter}${typeLabel}`;
  };

  return (
    <div className={styles.productsPage}>
      {/* Page Title */}
      <h2 className={styles.pageTitle}>
        {getDisplayName()}
        {filteredProducts.length > 0 && (
          <span style={{ fontSize: '0.6em', color: '#666', marginLeft: 10 }}>
            ({filteredProducts.length} products)
          </span>
        )}
      </h2>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ padding: 10, backgroundColor: '#f5f5f5', margin: '10px 0', fontSize: '0.8em' }}>
          <strong>Debug:</strong> Filter: "{selectedFilter}", Type: {filterType || 'none'}, 
          Products: {filteredProducts.length}
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className={styles.categoryBar}>
        {categories.map((cat) => {
          const catName = typeof cat === "string" ? cat : cat.name;
          const catKey = typeof cat === "string" ? cat : cat._id || cat.slug;
          
          // Only highlight category buttons when filtering by category (not tag)
          const isActive = filterType === 'category' && selectedFilter === catName;
          const isViewAll = catName === "View All" && selectedFilter === "View All";

          return (
            <button
              key={catKey}
              className={`${styles.categoryBtn} ${(isActive || isViewAll) ? styles.active : ""}`}
              onClick={() => handleCategoryClick(catName)}
            >
              {catName}
            </button>
          );
        })}
        
        {/* Show clear filter button when filtering by tag or custom filter */}
        {(filterType === 'tag' || (filterType && selectedFilter !== "View All")) && (
          <button
            className={`${styles.categoryBtn} ${styles.clearFilter}`}
            onClick={clearFilter}
            style={{ backgroundColor: '#ff6b6b', color: 'white', marginLeft: '10px' }}
          >
            ✕ Clear Filter
          </button>
        )}
      </div>

      {/* Filter Info */}
      {filterType && selectedFilter !== "View All" && (
        <div style={{ 
          padding: '10px 15px', 
          backgroundColor: filterType === 'tag' ? '#e3f2fd' : '#f3e5f5',
          borderRadius: '5px',
          margin: '15px 0',
          fontSize: '0.9em'
        }}>
          <strong>
            {filterType === 'tag' ? '🏷️ Tag Filter:' : '📂 Category Filter:'}
          </strong> 
          Showing products {filterType === 'tag' ? 'tagged with' : 'in category'} "{selectedFilter}"
        </div>
      )}

      {/* Products Grid */}
      <div className={styles.productGrid}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 50 }}>Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))
        ) : (
          <div className={styles.noProducts}>
            <p>No products found for "{selectedFilter}"</p>
            {filterType && (
              <div style={{ marginTop: 15 }}>
                <p style={{ fontSize: '0.9em', color: '#666' }}>
                  {filterType === 'tag' 
                    ? 'This filter is based on product tags.'
                    : 'This filter is based on product categories.'
                  }
                </p>
                <button 
                  onClick={clearFilter}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;