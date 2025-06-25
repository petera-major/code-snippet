import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="overlay" />
      <div className="hero-content">
        <h1>CodeVaultSnip</h1>
        <p>
          <Typewriter
            words={[
              'A sleek tool for developers to save code snippets, stay organized, and get help from the community.'
            ]}
            loop={false}
            cursor
            cursorStyle='_'
            typeSpeed={50}
            deleteSpeed={0}
          />
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
              Save your most-used code snippets in one sleek, distraction-free space.
            </p>
          </div>
          <div>
            <span>2</span>
            <p>Platform organizes your code snippets by your selected programming language.</p>
          </div>
          <div>
            <span>3</span>
            <p>Easily reuse and update code across all your projects.</p>
          </div>
          <div>
            <span>4</span>
            <p>
              <b>Key Features:</b><br />
              🔒 Private & Secure<br />
              🧠 Organize by language<br />
              💾 Save & edit instantly<br />
              🛠️ Built for devs, not distractions
            </p>
          </div>
        </div>
      </section>

      <footer>
        <p>PeteraMajor @ 2025</p>
      </footer>
    </div>
  );
}