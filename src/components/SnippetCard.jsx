import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./snippetcard.css";

export default function SnippetCard({ snippet, refresh, onView }) {
  const [editing, setEditing] = useState(false);
  const [newCode, setNewCode] = useState(snippet.code);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "snippets", snippet.id));
    refresh && refresh();
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "snippets", snippet.id), {
      code: newCode,
    });
    setEditing(false);
    refresh && refresh();
  };

  return (
    <div
      className="snippet-card"
      onClick={!editing ? onView : undefined}
    >
      <h3>{snippet.title || "Untitled Snippet"}</h3>
      <p><b>Language:</b> {snippet.language}</p>

      {editing ? (
        <>
          <textarea
            className="code-input"
            rows={4}
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
          />
          <div className="snippet-actions">
            <button onClick={handleUpdate} className="snippet-btn">💾 Save</button>
            <button onClick={() => setEditing(false)} className="snippet-btn">✖️ Cancel</button>
          </div>
        </>
      ) : (
        <>
          <pre>{snippet.code.slice(0, 100)}...</pre>
          <div
            className="snippet-actions"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              title="Copy"
              className="snippet-btn"
              onClick={() => navigator.clipboard.writeText(snippet.code)}
            >📋</button>
            <button
              title="Edit"
              className="snippet-btn"
              onClick={() => setEditing(true)}
            >📝</button>
            <button
              title="Delete"
              className="snippet-btn delete"
              onClick={handleDelete}
            >🗑️</button>
          </div>
        </>
      )}
    </div>
  );
}
