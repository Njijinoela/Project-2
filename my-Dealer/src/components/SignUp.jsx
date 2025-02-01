import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import "../styles/SignUp.css";

import axios from "axios";

import { ProductContext } from "./ProductContextDefinition";

const SignUp = () => {
  const { setToken } = useContext(ProductContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password_hash: "",
    confirmPassword: "",
    role: "farmer",
    // Additional fields for farmer/supplier
    farm_name: "",
    farm_location: "",
    company_name: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear related error if exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.password_hash.trim())
      newErrors.password_hash = "Password is required";
    if (formData.password_hash !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role-specific validation
    if (formData.role.toLowerCase() === "farmer") {
      if (!formData.farm_name.trim())
        newErrors.farm_name = "Farm name is required";
    } else if (formData.role.toLowerCase() === "supplier") {
      if (!formData.company_name.trim())
        newErrors.company_name = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Prepare request data based on role
    const requestData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password_hash: formData.password_hash,
      role: formData.role,
    };

    // Add role-specific fields
    if (formData.role.toLowerCase() === "farmer") {
      requestData.farm_name = formData.farm_name;
      requestData.farm_location = formData.farm_location;
    } else if (formData.role.toLowerCase() === "supplier") {
      requestData.company_name = formData.company_name;
      requestData.address = formData.address;
    }

    console.log("Sending request with data:", requestData);

    try {
      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/register",
        data: requestData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Response received:", response.data);
      setToken(response.data.access_token);
      navigate("/products");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Registration failed. Please check your information and try again.";
      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <div className="logo-section">
          <img
            src="./rice-terraces-1822443_640.jpg"
            alt="Agro Field Logo"
            className="logo-image"
            onClick={handleLogoClick}
          />
          <h1 className="logo-text">AGRO-FIELD</h1>
        </div>
        <div className="login-section">
          <p>already have an account?</p>
          <button className="login-link" onClick={handleLoginClick}>
            log-in
          </button>
        </div>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>SIGN-UP FORM</h2>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="farmer">Farmer</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>

        {/* Conditional rendering based on role */}
        {formData.role.toLowerCase() === "farmer" && (
          <>
            <div className="form-group">
              <label>Farm Name:</label>
              <input
                type="text"
                name="farm_name"
                value={formData.farm_name}
                onChange={handleChange}
              />
              {errors.farm_name && (
                <div className="error-message">{errors.farm_name}</div>
              )}
            </div>

            <div className="form-group">
              <label>Farm Location:</label>
              <input
                type="text"
                name="farm_location"
                value={formData.farm_location}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {formData.role.toLowerCase() === "supplier" && (
          <>
            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
              />
              {errors.company_name && (
                <div className="error-message">{errors.company_name}</div>
              )}
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
          />
          {errors.password_hash && (
            <div className="error-message">{errors.password_hash}</div>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
        </div>

        <button
          type="submit"
          className="register-btn"
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.5 : 1 }}
        >
          {isLoading ? "REGISTERING..." : "REGISTER"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
