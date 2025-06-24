import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import codeGif from './assets/code.gif';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="landing-wrapper"
      style={{
        backgroundImage: `url(${codeGif})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="overlay" />
      <div className="hero-content">
        <h1>CodeVaultSnip</h1>
        <p>
          A personal developer tool for saving code snippets and getting help
          from other developers.
        </p>
        <div className="button-group">
        <button onClick={() => navigate("/login")}>Sign In</button>
        <button onClick={() => navigate("/signup")}>Create Account</button>
        </div>
      </div>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div>
            <span>1</span>
            <p>
              Paste or type your most common reused code (e.g., regex,
              templates).
            </p>
          </div>
          <div>
            <span>2</span>
            <p>Organized by your selected programming language.</p>
          </div>
          <div>
            <span>3</span>
            <p>Easily reuse and update code across all your projects. </p>
          </div>
        </div>
      </section>

      <footer>
        <p>PeteraMajor @ 2025</p>
      </footer>
    </div>
  );
}
