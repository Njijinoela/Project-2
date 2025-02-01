import React, { useState } from "react";
import { ProductContext } from "./ProductContextDefinition";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, token, setToken }}>
      {children}
    </ProductContext.Provider>
  );
};
