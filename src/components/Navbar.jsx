import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import "./FancyNavbar.css"; 

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-nav">
      <div className="glass-nav-logo">⚡ CodeVaultSnip</div>
      <ul className="glass-nav-list">
        <li>
          <button
            className={isActive("/dashboard") ? "active-link" : ""}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            className={isActive("/codesnip") ? "active-link" : ""}
            onClick={() => navigate("/codesnip")}
          >
            Code Vault
          </button>
        </li>
        <li>
          <button
            className={isActive("/forum") ? "active-link" : ""}
            onClick={() => navigate("/forum")}
          >
            Forum
          </button>
        </li>
        <li>
          <button
            className={isActive("/profile") ? "active-link" : ""}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </li>
      </ul>
      {user && <div className="glass-user">{user.email}</div>}
    </nav>
  );
}
