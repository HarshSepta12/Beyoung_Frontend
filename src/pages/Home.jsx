import React, { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import ProductCard from "../components/ProductCard/ProductCard";
import { getAllProducts, categories } from "../Services/productsService";
import { Link } from "react-router-dom";

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("View All");
  const progressRef = useRef();
  const products = getAllProducts();
  const comboScrollRef = useRef(null);
  const collegeScrollRef = useRef(null);
  const reviewScrollRef = useRef(null);

  const images = [
    { category: "festival", img: "/poster-1.jpg" },
    { category: "combos", img: "/poster-2.jpg" },
    { category: "festival", img: "/poster-3.jpg" },
    { category: "back to college", img: "/poster-4.jpg" },
    { category: "korean pant", img: "/poster-5.jpg" },
    { category: "payjama pant", img: "/poster-6.jpg" },
    { category: "T-shirt", img: "/poster-7.jpg" },
  ];

  const comboProducts = [
    { category: "polo", img: "/poster2.1.jpg" },
    { category: "plain T-shirt", img: "/poster2.2.jpg" },
    { category: "polo", img: "/poster2.3.jpg" },
    { category: "plain shirt", img: "/poster2.4.jpg" },
    { category: "payjama", img: "/poster2.5.jpg" },
    { category: "full sleeves", img: "/poster2.6.jpg" },
    { category: "cargo", img: "/poster2.7.jpg" },
    { category: "boxer", img: "/poster2.8.jpg" },
    { category: "shirt shirt", img: "/poster2.9.jpg" },
    { category: "payjama", img: "/poster2.10.jpg" },
  ];

  const collegePhoto = [
    { img: "/poster5.1.jpg" },
    { img: "/poster5.2.jpg" },
    { img: "/poster5.3.jpg" },
    { img: "/poster5.4.jpg" },
    { img: "/poster5.5.jpg" },
    { img: "/poster5.6.jpg" },
  ];

  const mostWantedCategory = [
    { category: "polo", img: "/poster4.1.jpg" },
    { category: "polo", img: "/poster4.2.jpg" },
    { category: "polo", img: "/poster4.3.jpg" },
    { category: "polo", img: "/poster4.4.jpg" },
    { category: "polo", img: "/poster4.5.jpg" },
    { category: "polo", img: "/poster4.6.jpg" },
    { category: "polo", img: "/poster4.7.jpg" },
    { category: "polo", img: "/poster4.8.jpg" },
    { category: "polo", img: "/poster4.9.jpg" },
    { category: "polo", img: "/poster4.10.jpg" },
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
    selectedCategory === "View All"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <>
      {/* 🔹 Carousel */}
      <div className={styles.carousel}>
        <Link
          to={`/products/${images[current].category}`}
          state={{ category: images[current].category }}
        >
          <img
            src={images[current].img}
            alt={`Poster ${current + 1}`}
            className={styles.img}
          />
        </Link>
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
            <Link
              key={idx}
              to={`/products/${item.category}`}
              state={{ category: item.category }}
              className={styles.comboCard}
            >
              <img src={item.img} alt={item.title} className={styles.cardImg} />
            </Link>
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
      <div className="d-flex justify-content-center gap-5 align-items-center flex-wrap margin-auto">
        {mostWantedCategory.map((item, index) => (
          <Link
            key={index}
            to={`/products/${item.category}`}
            state={{ category: item.category }}
            className={styles.comboCard}
          >
            <div>
              <img
                src={item.img}
                alt="category Image"
                style={{
                  width: "240px",
                  height: "320px",
                  margin: "10px",
                  borderRadius: "9px",
                  cursor: "pointer",
                }}
              />
            </div>
          </Link>
        ))}
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
              <Link
                to={`/products/Back%20To%20College`} // ✅ fixed category in URL
                state={{ category: "Back To College" }} // ✅ state bhi pass ho rahi
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className={styles.cardImg}
                />
              </Link>
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
          onClick={() => scroll(reviewScrollRef, "left")}
        >
          &#8592;
        </button>
        <div className={styles.comboScroll} ref={reviewScrollRef}>
          {ClientReview.map((item, idx) => (
            <div key={idx} className={styles.comboCard}>
              <img src={item.img} alt={item.title} className={styles.cardImg} />
            </div>
          ))}
        </div>
        <button
          className={styles.scrollBtnRight}
          onClick={() => scroll(reviewScrollRef, "right")}
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
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.headingCombo}>
          <h3>NEW ARRIVALS</h3>
          <h5>Get them before everyone else does</h5>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.filterBtn} ${
                selectedCategory === cat ? styles.active : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className={styles.cardGrid}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
