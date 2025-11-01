import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Deposit from "./pages/Deposit";

const App = () => {
  // Check if user exists in localStorage (mock authentication)
  const user = JSON.parse(localStorage.getItem("arenaXUser"));

  return (
    <Routes>
      {/* Default route → redirect based on auth status */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />

      {/* Auth pages */}
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/home" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/home" />}
      />

      {/* Protected route */}
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/deposit" element={<Deposit/>}/>
    </Routes>
  );
};

export default App;
