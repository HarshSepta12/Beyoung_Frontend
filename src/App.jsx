import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Products from "./pages/Products.jsx";
import ManageProducts from "./pages/Admin/ManageProducts.jsx";
import { getProducts} from "./Services/productsService.js"; 

const App = () => {
  const [allProducts, setAllProducts] = useState([]); // ✅ state for products
  const [loading, setLoading] = useState(true); // ✅ loader state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        // console.log("API Response:", products.allProducts);
        setAllProducts(products.allProducts); // ✅ save in state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="appWrapper">
      <LoginRegister />
      <Navbar />

      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Category wise products */}
          <Route path="/products/:category" element={<Products />} />

          {/* Product details */}
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/productAdd" element={<ManageProducts />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
