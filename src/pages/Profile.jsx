import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import "./profile.css";

export default function Profile() {
  const [snippetCount, setSnippetCount] = useState(0);
  const [email, setEmail] = useState("");
  const [mostUsedLang, setMostUsedLang] = useState("—");
  const [recentTitles, setRecentTitles] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setEmail(currentUser.email);

    const fetchSnippets = async () => {
      const q = query(
        collection(db, "snippets"),
        where("userId", "==", currentUser.uid)
      );

      const snapshot = await getDocs(q);
      const snippets = snapshot.docs.map((doc) => doc.data());

      setSnippetCount(snippets.length);

      const langMap = {};
      snippets.forEach((s) => {
        const lang = s.language || "Unknown";
        langMap[lang] = (langMap[lang] || 0) + 1;
      });

      const sortedLangs = Object.entries(langMap).sort((a, b) => b[1] - a[1]);
      setMostUsedLang(sortedLangs[0]?.[0] || "—");

      const lastFive = snippets
        .slice(-5)
        .reverse()
        .map((s) => s.title || s.code?.substring(0, 30) + "...");
      setRecentTitles(lastFive);
    };

    fetchSnippets();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        <div className="glass-card profile-card">
          <h2>👩🏽‍💻 Welcome, Dev!</h2>
          <p className="user-email">{email}</p>
          <p className="quote">"Keep building. The world runs on code."</p>

          <div className="stats-row">
            <div className="stat-bubble">
              <h4>Total Snippets</h4>
              <p>{snippetCount}</p>
            </div>
            <div className="stat-bubble">
              <h4>Top Language</h4>
              <p>{mostUsedLang}</p>
            </div>
            <div className="stat-bubble">
              <h4>Goal</h4>
              <p>Code Daily </p>
            </div>
          </div>

          {recentTitles.length > 0 && (
            <div className="recent-snips">
              <h4>🧾 Recent Snippets</h4>
              <ul>
                {recentTitles.map((t, i) => (
                  <li key={i}>• {t}</li>
                ))}
              </ul>
            </div>
          )}

          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
