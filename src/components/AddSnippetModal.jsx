import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function AddSnippetModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "snippets"), {
      title,
      code,
      language,
      userId: user.uid,
      timestamp: serverTimestamp(),
    });

    onClose(); 
  };

  return (
    <div className="modal-backdrop">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h2>Add Snippet</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Your code..." rows={5} required />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>JavaScript</option>
          <option>Python</option>
          <option>TypeScript</option>
          <option>SQL</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>Ruby</option>
          <option>C++</option>
          <option>C#</option>
          <option>Java</option>
          <option>Go</option>
          <option>Swift</option>
          <option>PHP</option>
          <option>Kotlin</option>
          <option>Other</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
