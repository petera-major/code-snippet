import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./snippetmodal.css";

export default function SnippetModal({ snippet, onClose, refresh }) {
  if (!snippet) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      await deleteDoc(doc(db, "snippets", snippet.id));
      refresh();         
      onClose();         
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{snippet.title || "Untitled Snippet"}</h2>
        <p className="modal-meta">
          <b>Language:</b> {snippet.language}
        </p>

        <pre className="modal-code">
          <code>{snippet.code}</code>
        </pre>

        <div className="modal-actions">
          <button className="copy-btn" onClick={handleCopy}>📋 Copy</button>
          <button className="delete-btn" onClick={handleDelete}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
}
