import React from "react";
import styles from "../../pages/Home.module.css";


const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <img src={product.imgsrc} alt={product.name} />
      <div className={styles.cardContent}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.price}>
          <strong>₹{product.currentPrice}</strong>
          <del>₹{product.originalPrice}</del>
          <span> ({product.discount}% OFF)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
