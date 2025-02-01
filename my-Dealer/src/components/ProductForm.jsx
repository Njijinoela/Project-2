import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useProducts } from "./ProductContextDefinition";
import "../styles/ProductForm.css";

const ProductForm = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    productName: "",
    phone: "",
    image: null,
    description: "",
    location: "",
    price: "",
    farmName: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      product_name: formData.productName,
      price: parseFloat(formData.price),
      phone: formData.phone,
      image_url: imagePreview,
      description: formData.description,
      location: formData.location,
      farm_name: formData.farmName,
    };

    const response = await fetch("http://127.0.0.1:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Product added:", data);
    } else {
      console.error("Error:", data);
    }
  };

  return (
    <div className="product-form-container">
      <header className="header">
        <div className="logo">
          <img
            src="./public/rice-terraces-1822443_640.jpg"
            alt="Agro Field Logo"
            className="logo-image"
            onClick={handleLogoClick}
          />
          <h1 className="logo-text">AGRO-FIELD</h1>
        </div>
        <nav>
          <button
            onClick={() => navigate("/view-products")}
            className="view-products-btn"
          >
            VIEW PRODUCTS
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="logout-btn"
          >
            LOG-OUT
          </button>
        </nav>
      </header>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="image-preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="farmName">Farm Name</label>
          <input
            type="text"
            id="farmName"
            name="farmName"
            value={formData.farmName}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
