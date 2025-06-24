import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, orderBy, serverTimestamp, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import ForumPost from "../components/ForumPosts";
import Navbar from "../components/Navbar";
import "./forum.css";

export default function Forum() {
  const [question, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [posts, setPosts] = useState([]);

  const handlePost = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !question || !code) return;

    await addDoc(collection(db, "forumPosts"), {
      userId: user.uid,
      userEmail: user.email,
      question,
      code,
      language,
      createdAt: serverTimestamp(),
    });

    setQuestion("");
    setCode("");
    setLanguage("JavaScript");
    fetchPosts();
  };

  const fetchPosts = async () => {
    try {
      const q = query(
        collection(db, "forumPosts"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="forum-wrapper">
        <h2>💬 Ask a Code Question</h2>
        <form className="forum-form" onSubmit={handlePost}>
          <input
            type="text"
            placeholder="What's your question?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <textarea
            placeholder="Paste the code you need help with..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={5}
            required
          />
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>JavaScript</option>
            <option>Python</option>
            <option>HTML</option>
            <option>TypeScript</option>
            <option>Java</option>
            <option>C++</option>
            <option>Other</option>
          </select>
          <button type="submit">📤 Post</button>
        </form>

        <h2>🧑‍💻 Community Posts</h2>
        <div className="forum-feed">
          {posts.map((post) => (
            <ForumPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
