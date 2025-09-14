import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";


const App = () => {
  return (
    <>
      <LoginRegister />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productCard" element={<ProductCard />} />
        <Route path="/productDetails" element={<ProductDetails />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
