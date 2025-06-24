import React, { useEffect, useState } from "react";
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

  return (
    <>
      <Navbar />
      <div className="dashboard-wrapper">
        {/* Top Stat Cards */}
        <div className="stats-section">
          <div className="glass-card stat-card">
            <h3>Snippets</h3>
            <p>{allSnippets.length}</p>
          </div>
          <div className="glass-card stat-card">
            <h3>Forum Posts</h3>
            <p>Coming Soon</p>
          </div>
          <div className="glass-card stat-card">
            <h3>Goal</h3>
            <p>Code daily 💪</p>
          </div>
        </div>

        {/* Recent Snippets */}
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

