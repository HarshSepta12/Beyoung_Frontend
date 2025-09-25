import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./Home.module.css";
import ProductCard from "../components/ProductCard/ProductCard.jsx";
import { ProductContext } from "../Context/ProductContext.jsx";
import { PosterContext } from "../Context/PosterContext.jsx";
import { SectionContext } from "../Context/SectionContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const {
    products,
    category: categories,
    loading: productsLoading,
  } = useContext(ProductContext);

  const { poster: posters, loading: postersLoading } =
    useContext(PosterContext);
  const {
    sections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useContext(SectionContext);

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("View All");

  const progressRef = useRef();
  const sectionRefs = useRef({});
  const reviewScrollRef = useRef(null);

  // Create refs for scrollable sections
  useEffect(() => {
    sections.forEach((s) => {
      if (
        s.componentType === "scrollable" &&
        !sectionRefs.current[s.identifier]
      ) {
        sectionRefs.current[s.identifier] = React.createRef();
      }
    });

  }, [sections]);

  // Helper function to parse tags from section tags array - FIXED VERSION
  const parseTagsFromSection = (tags) => {
    if (!Array.isArray(tags)) return [];
      
    let parsedTags = [];
    tags.forEach(tag => {
      if (typeof tag === 'string') {
        // Check if it's a comma-separated string with quotes
        if (tag.includes(',') || tag.includes('"')) {
          // Clean and split the string
          const cleanTag = tag.replace(/"/g, '').trim();
          const splitTags = cleanTag.split(',').map(t => t.trim()).filter(t => t.length > 0);
          parsedTags.push(...splitTags);
        } else {
          parsedTags.push(tag.trim());
        }
      }
    });
    
    // Remove duplicates and clean
    parsedTags = [...new Set(parsedTags.filter(tag => tag && tag.length > 0))];
//console.log('🏷️ Parsed tags from section:', parsedTags);
    return parsedTags;
  };

  // Updated function to get filtered posters
  const getFilteredPosters = (tag) => {
  //  console.log(`Looking for posters with tag: "${tag}"`);
    const filtered = posters.filter((p) => {
      const isActive = p.isActive;
      // Clean tag comparison - remove quotes and extra spaces
      const cleanPosterTag = p.tag?.replace(/"/g, '').trim().toLowerCase();
      const cleanSearchTag = tag?.replace(/"/g, '').trim().toLowerCase();
      const tagMatch = cleanPosterTag === cleanSearchTag;
//console.log(`Poster "${p.title}": tag="${p.tag}" (cleaned: "${cleanPosterTag}"), isActive=${isActive}, matches "${tag}" (cleaned: "${cleanSearchTag}"): ${tagMatch}`);
      return tagMatch && isActive;
    });
   // console.log(`Found ${filtered.length} posters for tag "${tag}"`);
    return filtered;
  };

  const getPostersForTags = (tags, sectionIdentifier) => {
  //  console.log(`Getting posters for section: ${sectionIdentifier}`);
    const parsedTags = parseTagsFromSection(tags);
  //  console.log('Getting posters for parsed tags:', parsedTags);
    
    // Get all posters that match any of the parsed tags
    const allMatchingPosters = [];
    parsedTags.forEach(tag => {
      const matchingPosters = getFilteredPosters(tag);
      allMatchingPosters.push(...matchingPosters);
    });
    
    // Remove duplicates
    const uniquePosters = allMatchingPosters.filter((poster, index, array) => 
      array.findIndex(p => p._id === poster._id) === index
    );
    
   // console.log(`Total unique posters found: ${uniquePosters.length}`);
    return uniquePosters;
  };

  // Updated sections processing with better logging
  const activeSectionsWithPosters = sections
    .filter((s) => {
//console.log(`Processing section: "${s.name}" (${s.identifier}), isActive: ${s.isActive}`);
      return s.isActive;
    })
    .map((s) => {
      const sectionPosters = getPostersForTags(s.tags, s.identifier);
    //  console.log(`Section "${s.name}" (${s.identifier}) has ${sectionPosters.length} posters`);
      
      return { 
        ...s, 
        posters: sectionPosters,
        // For category section, use the parsed tags as category buttons
        parsedTags: parseTagsFromSection(s.tags)
      };
    })
    .filter((s) => {
      const hasPosters = s.posters.length > 0;
    //  console.log(`Section "${s.name}" ${hasPosters ? 'WILL BE SHOWN' : 'WILL BE HIDDEN'} (${s.posters.length} posters)`);
      return hasPosters;
    });

 // console.log('🎉 Final active sections with posters:', activeSectionsWithPosters);

  const carouselImages =
    activeSectionsWithPosters.find((s) => s.componentType === "carousel")
      ?.posters || [];

  // Function to handle poster click navigation
  const handlePosterClick = (poster, isGridType = false, selectedTag = null) => {
   // console.log('🖱️ Poster click:', poster.title, 'Grid type:', isGridType, 'Selected tag:', selectedTag);
    
    if (isGridType && selectedTag) {
      // Use the selected tag from grid
      const tagParam = selectedTag.replace(/\s+/g, "-");
      navigate(`/products/${tagParam}`);
    } else if (poster.tag) {
      // For other types, convert tag to URL-friendly format
      const tagParam = poster.tag.replace(/\s+/g, "-");
      navigate(`/products/${tagParam}`);
    } else if (poster.redirectUrl) {
      // Fallback to redirectUrl if available
      if (poster.redirectUrl.startsWith('/')) {
        navigate(poster.redirectUrl);
      } else {
        window.open(poster.redirectUrl, '_blank');
      }
    } else {
      // If no tag or redirectUrl, navigate to all products
      navigate(`/products`);
    }
  };

  // Auto carousel progress
  useEffect(() => {
    if (!carouselImages.length) return;

    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 100 / (3000 / 50) : 100));
    }, 50);

    const timer = setTimeout(
      () => setCurrent((prev) => (prev + 1) % carouselImages.length),
      3000
    );

    return () => {
      clearInterval(progressRef.current);
      clearTimeout(timer);
    };
  }, [current, carouselImages.length]);

  const CouponScroll = () => {
    const scrollRef = useRef(null);
    const coupons = [...Array(9)].map((_, i) => ({
      img: `/poster6.${i + 1}${i === 2 ? ".jpg" : ".png"}`,
    }));

    useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;
      let isHovered = false;

      const enter = () => (isHovered = true);
      const leave = () => (isHovered = false);
      container.addEventListener("mouseenter", enter);
      container.addEventListener("mouseleave", leave);

      const timer = setInterval(() => {
        if (!isHovered) {
          container.scrollLeft =
            container.scrollLeft + 1 >=
            container.scrollWidth - container.clientWidth
              ? 0
              : container.scrollLeft + 1;
        }
      }, 20);

      return () => {
        clearInterval(timer);
        container.removeEventListener("mouseenter", enter);
        container.removeEventListener("mouseleave", leave);
      };
    }, []);

    return (
      <div className={styles.couponBarWrapper}>
        <div className={styles.couponLabel}>
          <span>🔥 COUPONS</span>
          <span>SAVE NOW</span>
        </div>
        <div className={styles.couponBar} ref={scrollRef}>
          {coupons.map((c, i) => (
            <img
              key={i}
              src={c.img}
              alt={`Coupon ${i}`}
              className={styles.couponImg}
            />
          ))}
        </div>
      </div>
    );
  };

  const scroll = (ref, dir) => {
    const width = window.innerWidth < 700 ? 170 : 250;
    ref?.current?.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  const filteredProducts = Array.isArray(products)
    ? selectedCategory === "View All"
      ? products
      : products.filter((p) => {
          const name =
            typeof p.category === "string" ? p.category : p.category?.name;
          return name?.toLowerCase() === selectedCategory.toLowerCase();
        })
    : [];

  const renderSection = (section) => {
    const { componentType, posters, title, subtitle, identifier, parsedTags } = section;

    switch (componentType) {
      case "carousel":
        return (
          <div className={styles.carousel}>
            <img
              src={posters[current]?.image}
              alt={posters[current]?.title || title}
              className={styles.img}
              onClick={() => handlePosterClick(posters[current])}
              style={{ cursor: 'pointer' }}
            />
            <div className={styles.dots}>
              {posters.map((_, idx) => (
                <div
                  key={idx}
                  className={styles.progressDot}
                  onClick={() => setCurrent(idx)}
                >
                  <div
                    className={styles.progressFill}
                    style={{
                      width:
                        idx === current
                          ? `${progress}%`
                          : idx < current
                          ? "100%"
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "scrollable":
        return (
          <>
            <div className={styles.headingCombo}>
              <h3>{title}</h3>
              {subtitle && <h5>{subtitle}</h5>}
            </div>
            <div className={styles.comboScrollWrapper}>
              <button
                className={styles.scrollBtnLeft}
                onClick={() => scroll(sectionRefs.current[identifier], "left")}
              >
                &#8592;
              </button>
              <div
                className={styles.comboScroll}
                ref={sectionRefs.current[identifier]}
              >
                {posters.map((p, i) => (
                  <div
                    key={`${identifier}-${i}`}
                    className={styles.comboCard}
                    onClick={() => handlePosterClick(p)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={p.image}
                      alt={p.title || title}
                      className={styles.cardImg}
                    />
                  </div>
                ))}
              </div>
              <button
                className={styles.scrollBtnRight}
                onClick={() => scroll(sectionRefs.current[identifier], "right")}
              >
                &#8594;
              </button>
            </div>
          </>
        );

      case "grid":
        return (
          <>
            <div className={styles.mostwantedCategory}>
              <h2>{title}</h2>
              {subtitle && <h5>{subtitle}</h5>}
            </div>
            <div className="d-flex justify-content-center gap-5 align-items-center flex-wrap margin-auto">
              {posters.map((p, i) => (
                <div key={i} className={styles.gridContainer}>
                  <div
                    className={styles.comboCard}
                    onClick={() => handlePosterClick(p, true, parsedTags?.[0])}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={p.image}
                      alt={p.title || title}
                      style={{
                        width: "240px",
                        height: "320px",
                        borderRadius: "9px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "banner":
        return (
          <div className={styles.bannerSection}>
            {title && (
              <div className={styles.headingCombo}>
                <h3>{title}</h3>
                {subtitle && <h5>{subtitle}</h5>}
              </div>
            )}
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {posters.map((p, i) => (
                <div
                  key={i}
                  onClick={() => handlePosterClick(p)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={p.image}
                    alt={p.title || title}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (productsLoading || postersLoading || sectionsLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <>

    

      {activeSectionsWithPosters.map((s) => (
        <div key={s._id || s.identifier}>{renderSection(s)}</div>
      ))}

      <div className="d-flex justify-content-center">
        <p>NO COST | 3 EASY EMIs – Activate at Checkout</p>
      </div>

      <div className="d-flex justify-content-evenly gap-5 align-items-center flex-wrap w mt-5 mb-5 w-100">
        {[1, 2, 3].map((i) => (
          <img
            key={i}
            src={`/poster3.${i}.jpg`}
            alt=""
            style={{ width: 260, height: 200 }}
          />
        ))}
      </div>

      <CouponScroll />

      {/* Scrolling Text */}
      <div className={styles.scrollingtextcontainer}>
        <div className={styles.scrollingsection}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.scrollingtext}>
              Making <span>Global Fashion </span> Accessible
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
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
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.comboCard}>
              <img
                src={`/poster7.${i + 1}.png`}
                alt=""
                className={styles.cardImg}
              />
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

      {/* Featured */}
      <div className={`${styles.scrollingtextcontainer} ${styles.featured}`}>
        <h1>FEATURED</h1>
        <div className={styles.scrollingsection}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.scrollingtext}>
              <img src={`/poster8.${i + 1}.png`} alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className={styles.container}>
        <div className={styles.headingCombo}>
          <h3>NEW ARRIVALS</h3>
          <h5>Get them before everyone else does</h5>
        </div>
        <div className={styles.filterBar}>
          <button
            onClick={() => setSelectedCategory("View All")}
            className={`${styles.filterBtn} ${
              selectedCategory === "View All" ? styles.active : ""
            }`}
          >
            View All
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => setSelectedCategory(c.name)}
              className={`${styles.filterBtn} ${
                selectedCategory === c.name ? styles.active : ""
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className={styles.cardGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <div
              style={{
                textAlign: "center",
                width: "100%",
                padding: 20,
                color: "#666",
              }}
            >
              No products found for "{selectedCategory}"
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;