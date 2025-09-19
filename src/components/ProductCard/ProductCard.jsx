import React, { useState } from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  // ✅ Images safe access
  const mainImg = product?.variants?.[0]?.images?.[0]?.url;
  const hoverImg = product?.variants?.[0]?.images?.[1]?.url || mainImg;

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrapper}>
        {/* 2 images stack kar diye */}
        <img
          src={mainImg}
          alt={product?.title}
          className={styles.productImage}
        />
        <img
          src={hoverImg}
          alt={product?.title}
          className={styles.productImage}
        />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.name}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>

        <div className={styles.priceSection}>
          <span className={styles.discountPrice}>₹{product.discountPrice}</span>
          <span className={styles.originalPrice}>₹{product.price}</span>
          <span className={styles.discount}>
            {Math.round(
              ((product.price - product.discountPrice) / product.price) * 100
            )}
            % OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
