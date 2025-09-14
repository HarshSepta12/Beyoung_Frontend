import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Products from "./pages/Products.jsx";

const App = () => {
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
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
