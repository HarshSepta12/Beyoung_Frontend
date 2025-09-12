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
    subMenu: {
      Jeans: ["Slim Fit Jeans", "Regular Jeans", "View all"],
      Cargo: ["Cargo Joggers", "Cargo Pants", "View all"],
    },
  },
  { title: "Combos" },
  { title: "New Arrivals" },
  { title: "Festive Fashion Sale" },
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

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(`.${styles.navbarContainer}`)) {
        setIsOpen(false);
        setActiveMenu(null);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = (index) => {
    if (isMobile) {
      setActiveMenu(activeMenu === index ? null : index);
    }
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    setActiveMenu(null); // Reset active submenu when toggling main menu
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Hamburger (mobile left) */}
        <div
          className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Logo (center) */}
        <div className={styles.navbarLogo}>
          <a href="/">
            <img src="/Logo.jpg" alt="Logo" />
          </a>
        </div>

        {/* Menu */}
        <ul className={`${styles.navbarMenu} ${isOpen ? styles.open : ""}`}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItemWrapper}>
              <div
                className={styles.menuItem}
                onClick={() => toggleMenu(index)}
              >
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

              {/* Desktop dropdown - only show on desktop */}
              {item.subMenu && !isMobile && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownGrid}>
                    {Object.entries(item.subMenu).map(([heading, links]) => (
                      <div key={heading} className={styles.dropdownColumn}>
                        <h4>{heading}</h4>
                        {links.map((link, i) => (
                          <a key={i} href="/">
                            {link}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile dropdown - only show on mobile */}
              {item.subMenu && isMobile && (
                <div
                  className={`${styles.mobileDropdown} ${
                    activeMenu === index ? styles.show : ""
                  }`}
                >
                  {Object.entries(item.subMenu).map(([heading, links]) => (
                    <div key={heading} className={styles.mobileColumn}>
                      <h4>{heading}</h4>
                      {links.map((link, i) => (
                        <a key={i} href="/" onClick={() => setIsOpen(false)}>
                          {link}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Icons (right) */}
        <div className={styles.navbarIcons}>
          <button
            className={styles.icon}
            onClick={() => setShowSearch(!showSearch)}
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

      {/* Search Overlay */}
      {showSearch && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchBox}>
            <IoSearchOutline
              style={{ marginRight: "10px", color: "#ff5722" }}
            />
            <input type="text" placeholder="Search for products..." />
            <button
              className={styles.closeBtn}
              onClick={() => setShowSearch(false)}
            >
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
    </nav>
  );
};

export default Navbar;
