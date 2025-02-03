import React from "react";
import { useNavigate } from "react-router";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="landing-container">
      <nav className="nav-bar">
        <div className="logo">AGRO FIELDS</div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={handleLoginClick}>
            log in
          </button>
          <button className="signup-btn" onClick={handleSignUpClick}>
            sign-up
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-wrapper">
          <h1 className="main-heading">
            we are a platform that allows you to advertise your products to the
            best selling suppliers in the field....... welcome to enjoy our
            services as fresh as your products..
          </h1>
          <button className="explore-btn" onClick={handleLoginClick}>
            explore more
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
