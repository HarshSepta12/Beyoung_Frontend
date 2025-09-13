import React, { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("view all");
  const progressRef = useRef();

  const images = [
    "/poster-1.jpg",
    "/poster-2.jpg",
    "/poster-3.jpg",
    "/poster-4.jpg",
    "/poster-5.jpg",
    "/poster-6.jpg",
    "/poster-7.jpg",
  ];

  const comboProducts = [
    { img: "/poster2.1.jpg" },
    { img: "/poster2.2.jpg" },
    { img: "/poster2.3.jpg" },
    { img: "/poster2.4.jpg" },
    { img: "/poster2.5.jpg" },
    { img: "/poster2.6.jpg" },
    { img: "/poster2.7.jpg" },
    { img: "/poster2.8.jpg" },
    { img: "/poster2.9.jpg" },
    { img: "/poster2.10.jpg" },
  ];

  const collegePhoto = [
    { img: "/poster5.1.jpg" },
    { img: "/poster5.2.jpg" },
    { img: "/poster5.3.jpg" },
    { img: "/poster5.4.jpg" },
    { img: "/poster5.5.jpg" },
    { img: "/poster5.6.jpg" },
  ];
  const ClientReview = [
    { img: "/poster7.1.png" },
    { img: "/poster7.2.png" },
    { img: "/poster7.3.png" },
    { img: "/poster7.4.png" },
    { img: "/poster7.5.png" },
    { img: "/poster7.6.png" },
    { img: "/poster7.7.png" },
    { img: "/poster7.8.png" },
  ];

  const duration = 3000; // 3 seconds

  const coupons = [
    { img: "/poster6.1.png" },
    { img: "/poster6.2.png" },
    { img: "/poster6.3.jpg" },
    { img: "/poster6.4.png" },
    { img: "/poster6.5.png" },
    { img: "/poster6.6.png" },
    { img: "/poster6.7.png" },
    { img: "/poster6.8.png" },
    { img: "/poster6.9.png" },
  ];

  // ✅ CouponScroll Component
  const CouponScroll = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      let isHovered = false;

      const handleMouseEnter = () => (isHovered = true);
      const handleMouseLeave = () => (isHovered = false);

      scrollContainer.addEventListener("mouseenter", handleMouseEnter);
      scrollContainer.addEventListener("mouseleave", handleMouseLeave);

      const autoScroll = () => {
        if (!isHovered && scrollContainer) {
          if (
            scrollContainer.scrollLeft + scrollContainer.clientWidth >=
            scrollContainer.scrollWidth
          ) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 1;
          }
        }
      };

      const timer = setInterval(autoScroll, 20);

      return () => {
        clearInterval(timer);
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    return (
      <div className={styles.couponBarWrapper}>
        <div className={styles.couponLabel}>
          <span>🔥 COUPONS</span>
          <span>SAVE NOW</span>
        </div>
        <div className={styles.couponBar} ref={scrollRef}>
          {coupons.map((coupon, idx) => (
            <img
              key={idx}
              src={coupon.img}
              alt={`Coupon ${idx + 1}`}
              className={styles.couponImg}
            />
          ))}
        </div>
      </div>
    );
  };

  // Dummy product data
  // Dummy product data
  const products = [
    {
      id: 1,
      imgsrc: "/newArrival1.1.jpg",
      name: "Classic White Shirt",
      category: "shirt",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 2,
      imgsrc: "/newArrival1.2.jpg",
      name: "Casual Gurkha Pant",
      category: "gurkha pant",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 3,
      imgsrc: "/newArrival1.3.jpg",
      name: "Round Neck T-Shirt",
      category: "t-shirt",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 4,
      imgsrc: "/newArrival1.4.jpg",
      name: "Black Polo T-Shirt",
      category: "polo t-shirt",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 5,
      imgsrc: "/newArrival1.5.jpg",
      name: "Slim Fit Jeans",
      category: "jeans",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 6,
      imgsrc: "/newArrival1.6.jpg",
      name: "Cargo Trouser Olive",
      category: "cargo trouser",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 7,
      imgsrc: "/newArrival1.7.jpg",
      name: "Formal Blue Shirt",
      category: "shirt",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 8,
      imgsrc: "/newArrival1.8.jpg",
      name: "Gurkha Pant Black",
      category: "gurkha pant",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 9,
      imgsrc: "/newArrival1.9.jpg",
      name: "Graphic T-Shirt",
      category: "t-shirt",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 10,
      imgsrc: "/newArrival1.10.jpg",
      name: "Striped Polo T-Shirt",
      category: "polo t-shirt",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 11,
      imgsrc: "/newArrival1.11.jpg",
      name: "Distressed Jeans",
      category: "jeans",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
    {
      id: 12,
      imgsrc: "/newArrival1.12.jpg",
      name: "Cargo Trouser Khaki",
      category: "cargo trouser",
      currentPrice: 997,
      originalPrice: 2499,
      discount: 60,
    },
  ];

  const categories = [
    "View All",
    "Shirt",
    "Gurkha Pant",
    "T-Shirt",
    "Polo T-Shirt",
    "Jeans",
    "Cargo Trouser",
  ];

  // ✅ Refs inside component
  const comboScrollRef = useRef(null);
  const collegeScrollRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 100 / (duration / 50);
        clearInterval(progressRef.current);
        return 100;
      });
    }, 50);

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressRef.current);
    };
  }, [current]);

  const goToImage = (idx) => setCurrent(idx);

  // ✅ Single scroll function
  const scroll = (ref, direction) => {
    const cardWidth = window.innerWidth < 700 ? 170 : 250;
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const filteredProducts =
    selectedCategory === "view all"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  return (
    <>
      {/* 🔹 Carousel */}
      <div className={styles.carousel}>
        <img
          src={images[current]}
          alt={`Poster ${current + 1}`}
          className={styles.img}
        />
        <div className={styles.dots}>
          {images.map((_, idx) => (
            <div
              key={idx}
              className={styles.progressDot}
              onClick={() => goToImage(idx)}
            >
              <div
                className={styles.progressFill}
                style={{
                  width:
                    idx === current
                      ? `${progress}%`
                      : idx < current
                      ? `100%`
                      : `0%`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Super Saving Combos */}
      <div className={styles.headingCombo}>
        <h3>SUPER SAVING COMBOS</h3>
        <h5>Loved by 4+ millions</h5>
      </div>

      <div className={styles.comboScrollWrapper}>
        <button
          className={styles.scrollBtnLeft}
          onClick={() => scroll(comboScrollRef, "left")}
        >
          &#8592;
        </button>
        <div className={styles.comboScroll} ref={comboScrollRef}>
          {comboProducts.map((item, idx) => (
            <div key={idx} className={styles.comboCard}>
              <img src={item.img} alt={item.title} className={styles.cardImg} />
            </div>
          ))}
        </div>
        <button
          className={styles.scrollBtnRight}
          onClick={() => scroll(comboScrollRef, "right")}
        >
          &#8594;
        </button>
      </div>

      {/* 🔹 Info Posters */}
      <div className="d-flex justify-content-center">
        <p>NO COST | 3 EASY EMIs – Activate at Checkout</p>
      </div>

      <div className="d-flex justify-content-evenly gap-5 align-items-center flex-wrap w mt-5 mb-5 w-100">
        <img
          src="/poster3.1.jpg"
          alt="international"
          style={{ width: "260px", height: "200px" }}
        />
        <img
          src="/poster3.2.jpg"
          alt="global fashion"
          style={{ width: "260px", height: "200px" }}
        />
        <img
          src="/poster3.3.jpg"
          alt="easy return"
          style={{ width: "260px", height: "200px" }}
        />
      </div>

      {/* 🔹 Most Wanted */}
      <div className={styles.mostwantedCategory}>
        <h2>Most Wanted Categories</h2>
      </div>

      {/* 🔹 Back To College */}
      <div className={styles.headingCombo}>
        <h3>Back To College</h3>
        <h5>Styles to Slay This Semester!</h5>
      </div>

      <div className={styles.comboScrollWrapper}>
        <button
          className={styles.scrollBtnLeft}
          onClick={() => scroll(collegeScrollRef, "left")}
        >
          &#8592;
        </button>
        <div className={styles.comboScroll} ref={collegeScrollRef}>
          {collegePhoto.map((item, idx) => (
            <div key={idx} className={styles.comboCard}>
              <img src={item.img} alt={item.title} className={styles.cardImg} />
            </div>
          ))}
        </div>
        <button
          className={styles.scrollBtnRight}
          onClick={() => scroll(collegeScrollRef, "right")}
        >
          &#8594;
        </button>
      </div>

      {/* 🔹 Coupon Section */}
      <CouponScroll />

      {/* markQ section #ffd302 */}
      <div className={styles.scrollingtextcontainer}>
        <div className={styles.scrollingsection}>
          <div className={styles.scrollingtext}>
            Making <span>Global Fashion </span> Accessible
          </div>
          <div className={styles.scrollingtext}>
            Making <span>Global Fashion </span> Accessible
          </div>
          <div className={styles.scrollingtext}>
            Making <span>Global Fashion </span> Accessible
          </div>
          <div className={styles.scrollingtext}>
            Making <span>Global Fashion </span> Accessible
          </div>
          <div className={styles.scrollingtext}>
            Making <span>Global Fashion </span> Accessible
          </div>
          <div className={styles.scrollingtext}>
            Making <span>Global Fashion </span> Accessible
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className={styles.headingCombo}>
        <h3>KAIROZIAN APPROVED</h3>
        <h5>Real reviews from real people</h5>
      </div>

      <div className={styles.comboScrollWrapper}>
        <button
          className={styles.scrollBtnLeft}
          onClick={() => scroll(collegeScrollRef, "left")}
        >
          &#8592;
        </button>
        <div className={styles.comboScroll} ref={collegeScrollRef}>
          {ClientReview.map((item, idx) => (
            <div key={idx} className={styles.comboCard}>
              <img src={item.img} alt={item.title} className={styles.cardImg} />
            </div>
          ))}
        </div>
        <button
          className={styles.scrollBtnRight}
          onClick={() => scroll(collegeScrollRef, "right")}
        >
          &#8594;
        </button>
      </div>

      {/* featured section  */}
      <div className={`${styles.scrollingtextcontainer} ${styles.featured}`}>
        <h1>FEATURED</h1>
        <div className={styles.scrollingsection}>
          <div className={styles.scrollingtext}>
            <img src="/poster8.1.png" alt="post1" />
          </div>
          <div className={styles.scrollingtext}>
            <img src="/poster8.2.png" alt="post2" />
          </div>
          <div className={styles.scrollingtext}>
            <img src="/poster8.3.png" alt="post3" />
          </div>
          <div className={styles.scrollingtext}>
            <img src="/poster8.4.png" alt="post4" />
          </div>
          <div className={styles.scrollingtext}>
            <img src="/poster8.5.png" alt="post5" />
          </div>
          <div className={styles.scrollingtext}>
            <img src="/poster8.6.png" alt="post6" />
          </div>
          <div className={styles.scrollingtext}>
            <img src="/poster8.7.png" alt="post7" />
          </div>
          <div className={styles.scrollingtext}>
            <img src="/poster8.8.png" alt="post8" />
          </div>
        </div>
      </div>

      {/* new Arrivals section  */}
      <div className={styles.headingCombo}>
        <h3>NEW ARRIVALS</h3>
        <h5>Get them before everyone else does</h5>
      </div>

      <div className={styles.container}>
        {/* Filter Buttons */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${
                selectedCategory === cat ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        
     <div className={styles.cardGrid}>
  {filteredProducts.map((product) => (
    <div key={product.id} className={styles.card}>
      <img src={product.imgsrc} alt="productImg" />
      <div className={styles.cardContent}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.price}>
          <strong>₹{product.currentPrice}</strong>
          <span style={{ textDecoration: "line-through", color: "#888" }}>
            ₹{product.originalPrice}
          </span>
          <span style={{ color: "green" }}> ({product.discount}% off)</span>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </>
  );
};

export default Home;
