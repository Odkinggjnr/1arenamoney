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
import RoomPage from "./pages/RoomPage";
import Lobby from "./pages/Lobby";

const App = () => {
  const user = JSON.parse(localStorage.getItem("moneyRoomsUser"));

  return (
    <Routes>
      {/* Default route → redirect based on auth status */}
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />

      {/* Auth pages */}
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />

      {/* Protected routes */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/leadership" element={<Leadership />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/support" element={<Support />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/tournament-chat" element={<Tournament />} />

      <Route path="/lobby/:roomId" element={<Lobby />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
    </Routes>
  );
};

export default App;
