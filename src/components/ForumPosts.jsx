/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { formatDistanceToNow } from "date-fns"; 
import "./forumpost.css";

export default function ForumPost({ post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    const q = query(
      collection(db, "forumPosts", post.id, "comments"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setComments(data);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !newComment.trim()) return;

    await addDoc(collection(db, "forumPosts", post.id, "comments"), {
      text: newComment,
      userEmail: user.email,
      createdAt: serverTimestamp(),
    });

    setNewComment("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="forum-post">
      <p><b>{post.userEmail}</b> asked:</p>
      <p>{post.question}</p>
      <pre>{post.code}</pre>
      <span>🧠 Language: {post.language}</span>

      <div className="comment-section">
        <h4>💬 Comments</h4>
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="comment-bubble">
              <p><b>{c.userEmail}</b>: {c.text}</p>
              <small>
                ⏱ {c.createdAt?.seconds
                  ? formatDistanceToNow(new Date(c.createdAt.seconds * 1000), { addSuffix: true })
                  : "just now"}
              </small>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet.</p>
        )}

        <form onSubmit={handleComment} className="comment-form">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit">Reply</button>
        </form>
      </div>
    </div>
  );
}
