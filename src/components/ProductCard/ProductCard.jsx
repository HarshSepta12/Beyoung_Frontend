import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onCategoryClick }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const mainImg =
    product?.variants?.[0]?.images?.[0]?.url || product?.image || "/placeholder.jpg";
  const hoverImg =
    product?.variants?.[0]?.images?.[1]?.url || mainImg;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist:`, product?.title);
  };

  const handleCardClick = (e) => {
    if (e.target.closest(`.${styles.wishlistBtn}`)) return;

    const productId = product?._id || product?.id;
    if (productId) {
      navigate(`/productDetails/${productId}`);
    } else {
      console.error("Product ID missing for navigation:", product);
    }
  };

  // Safe category name extraction
  const categoryName =
    typeof product?.category === "string"
      ? product.category
      : product?.category?.name || "Category";

  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <button
        className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ""}`}
        onClick={handleWishlistToggle}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      <div className={styles.imageContainer}>
        <img
          src={mainImg}
          alt={product?.title || "Product"}
          className={styles.productImage}
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
        />
        {hoverImg !== mainImg && (
          <img
            src={hoverImg}
            alt={`${product?.title || "Product"} hover`}
            className={styles.hoverImage}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.name}>{product?.title || "Product Name"}</h3>

        {/* Category name clickable */}
        <p
          className={styles.category}
          onClick={(e) => {
            e.stopPropagation();
            if (onCategoryClick) onCategoryClick();
          }}
          style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
          title="Click to view more from this category"
        >
          {categoryName}
        </p>

        {product?.tags && product.tags.length > 0 && (
          <div className={styles.tagsContainer}>
            {product.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
            {product.tags.length > 2 && (
              <span className={styles.moreTagsIndicator}>
                +{product.tags.length - 2}
              </span>
            )}
          </div>
        )}

        <div className={styles.priceSection}>
          {product?.discountPrice && (
            <span className={styles.discountPrice}>₹{product.discountPrice}</span>
          )}
          {product?.price && (
            <span className={styles.originalPrice}>₹{product.price}</span>
          )}
          {product?.price && product?.discountPrice && (
            <span className={styles.discount}>
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )}
              % OFF
            </span>
          )}
        </div>

        <div className={styles.actionButtons}>
          <button
            className={styles.quickViewBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick(e);
            }}
          >
            Quick View
          </button>
          <button
            className={styles.addToCartBtn}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to cart:", product?.title);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className={styles.debugInfo}>
          <small>ID: {product?._id || product?.id || "No ID"}</small>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
