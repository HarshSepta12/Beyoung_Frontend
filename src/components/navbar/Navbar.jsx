import React, { useState, useEffect, useContext } from "react";
import styles from "./Navbar.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { ProductContext } from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const { products, category } = useContext(ProductContext);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = (idx) =>
    setActiveMenu((prev) => (prev === idx ? null : idx));
  const toggleMobileMenu = () => {
    setIsOpen((v) => !v);
    setActiveMenu(null);
  };
  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const sidebarMenuItems = [
    { title: "Festive Fashion Sale" },
    { title: "Combos" },
    { title: "New Arrivals" },
    {
      title: "Topwear",
      subMenu: {
        "T-shirts": [
          "Plain T-shirts",
          "Printed T-shirts",
          "Oversized T-shirts",
          "View All",
        ],
        Shirts: ["Plain shirts", "Printed shirts", "Striped shirts", "View All"],
        Polos: ["View All"],
        "Shop For Women": ["Topwear", "Bottomwear", "View All"],
      },
    },
    {
      title: "Bottomwear",
      subMenu: [
        "Cargo Joggers",
        "Cargo Pants",
        "Trouser",
        "Korean Pants",
        "Pyjamas",
        "Jeans",
        "Jorts",
        "Boxers",
        "View All",
      ],
    },
    { title: "Winterwear" },
    { title: "Sunglasses" },
    { title: "Shop For Women", subMenu: ["Topwear", "Bottomwear", "View All"] },
    { title: "Offers & Deals" },
    { title: "More" },
  ];

  const navbarImg = [
    "./navbar1.1.png",
    "./navbar1.2.png",
    "./navbar1.3.png",
    "./navbar1.4.png",
    "./navbar1.5.png",
    "./navbar1.7.jpg",
    "./navbar1.6.png",
    "./navbar1.8.png",
    "./navbar1.9.png",
  ];

  const trendingSearches = [
    "Men Shirts",
    "Cargo Joggers",
    "Shackets",
    "Oversized T-Shirts",
    "T-Shirts For Men",
    "Combos",
  ];

  const desktopOrder = [
    "Topwear",
    "Bottomwear",
    "Combos",
    "New Arrivals",
    "Festive Fashion Sale",
  ];

  const slugify = (str) => str?.toLowerCase().trim().replace(/\s+/g, "-");

  // 🔥 Updated: handleCategoryClick with View All case
  const handleCategoryClick = (link, parentCategory = null) => {
    let targetCategory = link;

    // Agar View All hai to parentCategory ka use karo
    if (link.toLowerCase() === "view all" && parentCategory) {
      targetCategory = parentCategory;
    }

    const catObj = category.find(
      (c) =>
        c.name.toLowerCase() === targetCategory.toLowerCase() ||
        c.slug.toLowerCase() === targetCategory.toLowerCase()
    );

    if (catObj) {
      navigate(`/products/${catObj.categoryType}/${slugify(catObj.name)}`);
    } else {
      navigate(`/products/general/${slugify(targetCategory)}`); // fallback
    }
    closeMobileMenu();
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div
            className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={styles.navbarLogo}>
            <a href="/">
              <img src="/Logo.svg" alt="Logo" />
            </a>
          </div>

          <ul className={styles.navbarMenu}>
            {desktopOrder.map((title) => {
              const index = sidebarMenuItems.findIndex(
                (item) => item.title === title
              );
              if (index === -1) return null;
              const item = sidebarMenuItems[index];
              return (
                <li
                  key={title}
                  className={`${styles.menuItemWrapper} ${
                    activeMenu === index ? styles.active : ""
                  }`}
                  onMouseEnter={() => !isMobile && setActiveMenu(index)}
                  onMouseLeave={() => !isMobile && setActiveMenu(null)}
                >
                  <div className={styles.menuItem}>
                    <strong>{item.title}</strong>
                    {item.subMenu && (
                      <span
                        className={`${styles.arrow} ${
                          activeMenu === index ? styles.rotated : ""
                        }`}
                      >
                        <MdKeyboardArrowDown />
                      </span>
                    )}
                  </div>
                  {item.subMenu && (
                    <div className={styles.dropdown}>
                      <div className={styles.dropdownGrid}>
                        {Array.isArray(item.subMenu) ? (
                          <div className={styles.dropdownColumn}>
                            {item.subMenu.map((link, i) => (
                              <a
                                key={i}
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCategoryClick(link, item.title); // ✅ parentCategory pass
                                }}
                              >
                                {link}
                              </a>
                            ))}
                          </div>
                        ) : (
                          Object.entries(item.subMenu).map(([heading, links]) => (
                            <div key={heading} className={styles.dropdownColumn}>
                              <h4>{heading}</h4>
                              {links.map((link, i) => (
                                <a
                                  key={i}
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryClick(link, item.title); // ✅ parentCategory pass
                                  }}
                                >
                                  {link}
                                </a>
                              ))}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className={styles.navbarIcons}>
            <button
              className={styles.icon}
              onClick={() => setShowSearch((s) => !s)}
              aria-label="Toggle search"
            >
              <IoSearchOutline />
            </button>
            <a
              href="/"
              className={`${styles.icon} ${styles.cart}`}
              data-count="2"
            >
              <IoCartOutline />
            </a>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu}></div>
      )}

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarContent}>
          {sidebarMenuItems.map((item, index) => (
            <div key={index} className={styles.sidebarItemWrapper}>
              <div
                className={styles.sidebarItem}
                onClick={() => item.subMenu && toggleMenu(index)}
              >
                {navbarImg[index] && (
                  <img
                    src={navbarImg[index]}
                    alt={item.title}
                    className={styles.sidebarImg}
                  />
                )}
                <span>{item.title}</span>
                {item.subMenu && (
                  <span
                    className={`${styles.sidebarArrow} ${
                      activeMenu === index ? styles.rotated : ""
                    }`}
                  >
                    <MdKeyboardArrowDown />
                  </span>
                )}
              </div>
              {item.subMenu && (
                <div
                  className={`${styles.sidebarSubmenu} ${
                    activeMenu === index ? styles.expanded : ""
                  }`}
                >
                  {Array.isArray(item.subMenu)
                    ? item.subMenu.map((link, i) => (
                        <div key={i} className={styles.sidebarSubmenuItem}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCategoryClick(link, item.title); // ✅ parentCategory pass
                              closeMobileMenu();
                            }}
                          >
                            {link}
                          </a>
                        </div>
                      ))
                    : Object.entries(item.subMenu).map(([heading, links]) => (
                        <div
                          key={heading}
                          className={styles.sidebarSubmenuGroup}
                        >
                          <h4>{heading}</h4>
                          {links.map((link, i) => (
                            <a
                              key={i}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick(link, item.title); // ✅ parentCategory pass
                                closeMobileMenu();
                              }}
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
