import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import "../styles/LoginForm.css";

import axios from "axios";

import { ProductContext } from "./ProductContextDefinition";

const LoginForm = () => {
  const { token, setToken } = useContext(ProductContext);

  console.log(token);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "farmer",
  });
  const isFormValid = () => {
    return formData.username.trim() !== "" && formData.password.trim() !== "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Form submitted:", {
      email: formData.username,
      password: formData.password,
    });

    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/login",
      data: {
        email: formData.username,
        password: formData.password,
      },
    })
      .then((res) => {
        console.log(res.data);
        setToken(res.data.access_token);
      })
      .catch((e) => {});

    // Navigate based on role
    if (formData.role === "farmer") {
      navigate("/products");
    } else if (formData.role === "admin") {
      navigate("/view-products");
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo-section">
          <img
            src="./rice-terraces-1822443_640.jpg"
            alt="Agro Field Logo"
            className="logo-image"
            onClick={handleLogoClick}
          />
          <h1 className="logo-text">AGRO-FIELD</h1>
        </div>
        <div className="signup-section">
          <p>create an account?</p>
          <button className="signup-link" onClick={handleSignUpClick}>
            sign-up
          </button>
        </div>
      </div>

      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>LOG-IN </h2>

          <div className="form-group">
            <label> Enter your Email:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid()}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
