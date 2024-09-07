import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <header className="app-header">
      <img
        src="https://samcorporate.com/wp-content/uploads/2023/05/SAM-Logo-1175-%C3%97-809-px-2.png"
        alt="Logo"
        className="logo"
      />

      <div className="header-content">
        <h4 onClick={navigateToHome}>Home</h4>
        <h4>About Us</h4>
        <h4>Features</h4>
        <h4>Contact</h4>
        <button>Login</button>
      </div>
    </header>
  );
};

export default Header;
