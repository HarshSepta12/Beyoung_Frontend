import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";

const App = () => {
  return (
    <>
      <LoginRegister />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
