import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";
import SnippetCard from "../components/SnippetCard";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";
import SnippetModal from "../components/SnippetModal"; 
import "./codesnip.css";

export default function CodeSnip() {
  const [snippets, setSnippets] = useState([]);
  const [filterLang, setFilterLang] = useState("All");
  const [selectedSnippet, setSelectedSnippet] = useState(null); 

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
    setSnippets(data);
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const filteredSnippets =
    filterLang === "All"
      ? snippets
      : snippets.filter((snippet) => snippet.language === filterLang);

  return (
    <>
      <Navbar />
      <div className="codesnip-wrapper">
        <div className="codesnip-header">
          <h1>Your Code Vault</h1>
          <FilterBar setFilterLang={setFilterLang} activeLang={filterLang} />
        </div>

        <div className="codesnip-grid">
          {filteredSnippets.length > 0 ? (
            filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                refresh={fetchSnippets}               
                onView={() => setSelectedSnippet(snippet)} 
              />
            ))
          ) : (
            <p className="empty-text">No snippets found for "{filterLang}"</p>
          )}
        </div>
      </div>

      {selectedSnippet && (
        <SnippetModal
          snippet={selectedSnippet}
          onClose={() => setSelectedSnippet(null)}
          refresh={fetchSnippets} 
        />
      )}
    </>
  );
}
