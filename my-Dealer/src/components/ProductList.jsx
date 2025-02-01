import React from "react";
import { useNavigate } from "react-router";
import { useProducts } from "./ProductContextDefinition";
import "../styles/ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="product-list-container">
      <header className="product-header">
        <div className="header-left">
          <img
            src="./public/rice-terraces-1822443_640.jpg"
            alt="Agro Field Logo"
            className="logo-image"
            onClick={handleLogoClick}
          />
          <h1 className="header-title">AGRO-FIELD</h1>
        </div>
        <div className="header-center">
          <h2>VIEW-PAGE</h2>
        </div>
        <div className="header-right">
          <button
            onClick={() => navigate("/products")}
            className="add-product-btn"
          >
            ADD PRODUCT
          </button>
          <button onClick={handleLogout} className="logout-btn">
            LOG-OUT
          </button>
        </div>
      </header>

      <div className="products-grid">
        {products.length === 0 ? (
          <div className="no-products">
            No products available. Add some products!
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>price =={product.price}</p>
                <p>locations: {product.location}</p>
                <p>contacts: {product.contact}</p>
                <p>farm-name: {product.farmName}</p>
                {product.description && (
                  <p className="description">{product.description}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
