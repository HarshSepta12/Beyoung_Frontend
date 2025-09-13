import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";

const menuItems = [
  {
    title: "Topwear",
    subMenu: {
      "T-shirts": [
        "Plain T-shirts",
        "Printed T-shirts",
        "Oversized T-shirts",
        "View all",
      ],
      Shirts: ["Plain shirts", "Printed shirts", "Striped shirts", "View all"],
      Polos: ["View all"],
      "Shop For Women": ["Topwear", "Bottomwear", "View all"],
    },
  },
  {
    title: "Bottomwear",
    subMenu: [
      "Cargo Joggers",
      "Cargo Pants",
      "Trousers",
      "Korean Pants",
      "Pyjamas",
      "Jeans",
      "Jorts",
      "Boxers",
      "View all",
    ],
  },
  { title: "Combos" },
  { title: "New Arrivals" },
  { title: "Festive Fashion Sale" },
];

const mobileOnlyItems = [
  { title: "Winterwear" },
  { title: "Sunglasses" },
  { title: "Shop For Women" },
  { title: "Offers & Deals" },
  { title: "More" },
];

const trendingSearches = [
  "Men Shirts",
  "Cargo Joggers",
  "Shackets",
  "Oversized T-Shirts",
  "T-Shirts For Men",
  "Combos",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = (index) => {
    setActiveMenu((prev) => (prev === index ? null : index));
  };

  const toggleMobileMenu = () => {
    setIsOpen((v) => !v);
    setActiveMenu(null);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          {/* Hamburger (mobile) */}
          <div
            className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Logo */}
          <div className={styles.navbarLogo}>
            <a href="/">
              <img src="/Logo.png" alt="Logo" />
            </a>
          </div>

          {/* Desktop Menu */}
          <ul className={styles.navbarMenu}>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`${styles.menuItemWrapper} ${
                  activeMenu === index ? styles.active : ""
                }`}
                onMouseEnter={() => !isMobile && setActiveMenu(index)}
                onMouseLeave={() => !isMobile && setActiveMenu(null)}
              >
                <div className={styles.menuItem}>
                  <span>{item.title}</span>
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

                {/* Desktop dropdown */}
                {item.subMenu && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownGrid}>
                      {Array.isArray(item.subMenu) ? (
                        <div className={styles.dropdownColumn}>
                          {item.subMenu.map((link, i) => (
                            <a key={i} href="/">
                              {link}
                            </a>
                          ))}
                        </div>
                      ) : (
                        Object.entries(item.subMenu).map(([heading, links]) => (
                          <div key={heading} className={styles.dropdownColumn}>
                            <h4>{heading}</h4>
                            {links.map((link, i) => (
                              <a key={i} href="/">
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
            ))}
          </ul>

          {/* Icons */}
          <div className={styles.navbarIcons}>
            <button
              className={styles.icon}
              onClick={() => setShowSearch((s) => !s)}
              aria-label="Toggle search"
            >
              <IoSearchOutline />
            </button>
            <a href="/" className={`${styles.icon} ${styles.cart}`} data-count="2">
              <IoCartOutline />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarContent}>
          {/* Mobile menu items */}
          {[...menuItems, ...mobileOnlyItems].map((item, index) => (
            <div key={index} className={styles.sidebarItemWrapper}>
              <div
                className={styles.sidebarItem}
                onClick={() => item.subMenu && toggleMenu(index)}
              >
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

              {/* Mobile submenu */}
              {item.subMenu && (
                <div
                  className={`${styles.sidebarSubmenu} ${
                    activeMenu === index ? styles.expanded : ""
                  }`}
                >
                  {Array.isArray(item.subMenu) ? (
                    item.subMenu.map((link, i) => (
                      <div key={i} className={styles.sidebarSubmenuItem}>
                        <a href="/" onClick={closeMobileMenu}>
                          {link}
                        </a>
                      </div>
                    ))
                  ) : (
                    Object.entries(item.subMenu).map(([heading, links]) => (
                      <div key={heading} className={styles.sidebarSubmenuGroup}>
                        <h4>{heading}</h4>
                        {links.map((link, i) => (
                          <a key={i} href="/" onClick={closeMobileMenu}>
                            {link}
                          </a>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchBox}>
            <IoSearchOutline style={{ marginRight: "10px", color: "#ff5722" }} />
            <input type="text" placeholder="Search for products..." />
            <button className={styles.closeBtn} onClick={() => setShowSearch(false)}>
              ✖
            </button>
          </div>

          <div className={styles.trending}>
            <h4>TRENDING SEARCHES ON BEYOUNG</h4>
            <ul>
              {trendingSearches.map((item, i) => (
                <li key={i} onClick={() => setShowSearch(false)}>
                  <IoSearchOutline /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;