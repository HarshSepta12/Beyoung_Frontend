import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { ProductProvider } from "./Context/ProductContext.jsx";
import { PosterProvider } from "./Context/PosterContext.jsx";
import { SectionProvider } from "./Context/SectionContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <StrictMode>

    <ProductProvider>
      <PosterProvider>
        <SectionProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </SectionProvider>
      </PosterProvider>
    </ProductProvider>
        
  </StrictMode>
  </>
);
