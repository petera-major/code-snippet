import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CodeSnip from "./pages/CodeSnip";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/codesnip" element={<CodeSnip />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

