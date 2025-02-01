import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { ProductProvider } from "./components/ProductContext";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<ProductForm />} />
          <Route path="/view-products" element={<ProductList />} />
          <Route path="/products/add" element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
