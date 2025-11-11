import React, { useState, useEffect } from "react";
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

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("moneyRoomsUser")));

 
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("moneyRoomsUser")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />

     
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/home" />}
      />
      <Route
        path="/login"
        element={!user ? <Login setUser={setUser} /> : <Navigate to="/home" />}
      />

      {/* Protected routes */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/deposit" element={user ? <Deposit /> : <Navigate to="/login" />} />
      <Route path="/leadership" element={user ? <Leadership /> : <Navigate to="/login" />} />
      <Route path="/notifications" element={user ? <Notification /> : <Navigate to="/login" />} />
      <Route path="/support" element={user ? <Support /> : <Navigate to="/login" />} />
      <Route path="/withdraw" element={user ? <Withdraw /> : <Navigate to="/login" />} />
      <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
      <Route path="/tournament-chat" element={user ? <Tournament /> : <Navigate to="/login" />} />

      <Route path="/lobby/:roomId" element={user ? <Lobby /> : <Navigate to="/login" />} />
      <Route path="/room/:roomId" element={user ? <RoomPage /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
