import React, { useEffect, useState, useMemo } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import SnippetCard from "../components/SnippetCard";
import AddSnippetModal from "../components/AddSnippetModal";
import "./dashboard.css";

export default function Dashboard() {
  const [recentSnippets, setRecentSnippets] = useState([]);
  const [allSnippets, setAllSnippets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = useMemo(()=> [
    "Code is like humor. When you have to explain it, it’s bad.",
    "Programs must be written for people to read.",
    "The best code is no code at all.",
    "✨ Tip: Save your favorite code snippets here.",
    "🧠 Did you know? Comments are for your future self.",
    "🔥 Stay consistent, not perfect.",
    "💡 StackOverflow is a tool, not a crutch.",
    "🚀 Deploy early, iterate often.",
    "First, solve the problem. Then, write the code.",
    "Good programmers write code humans can understand.",
  ], []);

  useEffect(() => {
    const fetchSnippets = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const q = query(
        collection(db, "snippets"),
        where("userId", "==", currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllSnippets(data);
      setRecentSnippets(data.slice(0, 3));
    };

    fetchSnippets();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); 
  
    return () => clearInterval(interval); 
  }, [quotes.length]);

  return (
    <>
      <Navbar />
      <div className="dashboard-wrapper">
        {/* Stat Cards */}
        <div className="stats-section">
          <div className="glass-card stat-card">
            <h3>Snippets</h3>
            <p>{allSnippets.length}</p>
          </div>
          <div className="glass-card stat-card">
            <h3>Forum Posts</h3>
            <p style={{ fontSize: "0.95rem", opacity: 0.8 }}>{quotes[quoteIndex]}</p>
          </div>
          <div className="glass-card stat-card">
            <h3>Goal</h3>
            <p>Code daily 💪</p>
          </div>
        </div>

        <div className="recent-section">
          <div className="section-header">
            <h2>📌 Recently Added</h2>
            <button className="add-btn" onClick={() => setShowModal(true)}>+ Add Snippet</button>
          </div>
          <div className="snippet-grid">
            {recentSnippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>

        {showModal && <AddSnippetModal onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
}

