import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Deposit from "./pages/Deposit";
import Leadership from "./pages/Leadership";
import Notification from "./pages/Notification";
import Support from "./pages/Support";
import Withdraw from "./pages/Withdraw";
import Settings from "./pages/Settings";
import Tournament from "./pages/Tournament";
import Game from "./pages/Game";
import Game2 from "./pages/Game2";
import RoomPage from "./pages/RoomPage";
import Game3 from "./pages/Game3";
import Game4 from "./pages/Game4";
import Game5 from "./pages/Game5";

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
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/leadership" element={<Leadership />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/support" element={<Support />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/tournament-chat" element={<Tournament />} />
      <Route path="/room/:id" element={<RoomPage />} />
    </Routes>
  );
};

export default App;
