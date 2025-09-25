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
import CategoryManage from "./pages/Admin/CategoryManage.jsx";

const App = () => {
  return (
    <div className="appWrapper">
      <LoginRegister />
      <Navbar />

      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:tagOrCategory" element={<Products />} />
          {/* Product details */}
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/productAdd" element={<ManageProducts />} />
          <Route path="/categoryAdd" element={<CategoryManage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
