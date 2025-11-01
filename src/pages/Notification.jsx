import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Trophy,
  Wallet,
  LogOut,
  Bell,
  Menu,
  X,
  MessageCircle,
  Facebook,
  Instagram,
  Globe,
  Pin,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const showToast = (message, type = "info") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
  };

  const notifications = [
    {
      icon: "🎉",
      title: "Congrats! You Won",
      text: "You won $45 in the $5 Room Tournament. Keep playing to climb the leaderboard!",
    },
    {
      icon: "💰",
      title: "Deposit Successful",
      text: "Your $20 deposit was credited to your wallet. Enjoy your games!",
    },
    {
      icon: "⚡",
      title: "New Tournament",
      text: "$10 Room opens in 10 minutes! Join early to get a bonus multiplier.",
    },
  ];

  return (
    <div className="bg-[#0f1115] text-white min-h-screen pb-24 font-[Inter] relative">
      {/* ─── Toastify Container ─── */}
      <ToastContainer />

      {/* ─── Overlay ─── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ─── Topbar ─── */}
      <header className="flex justify-between items-center p-4 bg-[#0f1115] sticky top-0 z-50">
        <button onClick={() => setSidebarOpen(true)} className="text-2xl">
          <Menu />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2">
          <img
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            className="h-10"
          />
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              showToast("Redirecting to deposit page...", "success");
              setTimeout(() => goToPage("/deposit"), 1500);
            }}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full font-semibold"
          >
            Deposit
          </button>
          <div
            onClick={() => showToast("You have 3 new notifications!", "info")}
            className="bg-[#2a2a2f] w-9 h-9 flex items-center justify-center rounded-lg relative cursor-pointer hover:scale-110 transition"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* ─── Sidebar ─── */}
      <aside
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[#1a1a1f] flex flex-col justify-between z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center border-b border-white/10 p-4">
            <h3 className="text-lg font-semibold">Menu</h3>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <div className="flex items-center gap-3 p-4 border-b border-white/5">
            <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
            <div>
              <strong>Homelander</strong>
              <p className="text-sm text-gray-400">ID 334887190</p>
            </div>
          </div>

          <div className="flex flex-col text-base font-medium">
            <button
              className="p-4 text-left hover:bg-white/5"
              onClick={() => {
                showToast("Navigating to Home...", "info");
                goToPage("/home");
              }}
            >
              🏠 Home
            </button>
            <button
              className="p-4 text-left hover:bg-white/5"
              onClick={() => {
                showToast("Navigating to Deposit...", "success");
                goToPage("/deposit");
              }}
            >
              💰 Deposit
            </button>
            <button
              className="p-4 text-left hover:bg-white/5"
              onClick={() => {
                showToast("Navigating to Withdraw...", "warning");
                goToPage("/withdraw");
              }}
            >
              💸 Withdraw
            </button>
            <button
              className="p-4 text-left hover:bg-white/5"
              onClick={() => {
                showToast("Navigating to Leaderboard...", "info");
                goToPage("/leaderboard");
              }}
            >
              🏆 Leaderboard
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 p-4 space-y-3">
          <div className="flex gap-3">
            <div className="bg-[#2d2d33] p-2 rounded-full hover:bg-blue-500 cursor-pointer">
              <Facebook size={16} />
            </div>
            <div className="bg-[#2d2d33] p-2 rounded-full hover:bg-pink-500 cursor-pointer">
              <Instagram size={16} />
            </div>
            <div className="bg-[#2d2d33] p-2 rounded-full hover:bg-blue-600 cursor-pointer">
              <Pin size={16} />
            </div>
            <div className="bg-[#2d2d33] p-2 rounded-full hover:bg-blue-400 cursor-pointer">
              <Globe size={16} />
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#2d2d33] px-3 py-2 rounded-lg text-sm">
            <span className="flex items-center gap-2">
              <MessageCircle size={14} /> Support
            </span>
            <span className="bg-blue-600 px-2 py-0.5 rounded text-xs">24/7</span>
          </div>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="p-4 mt-4">
        <h1 className="text-2xl font-bold text-center mb-5">Notifications</h1>

        {notifications.map((n, index) => (
          <div
            key={index}
            onClick={() =>
              showToast(`Opening: ${n.title}`, "info")
            }
            className="bg-[#17181c] p-4 rounded-xl mb-3 flex items-start gap-3 hover:-translate-y-1 transition cursor-pointer"
          >
            <div className="text-2xl">{n.icon}</div>
            <div>
              <h3 className="font-semibold text-base mb-1">{n.title}</h3>
              <p className="text-gray-400 text-sm">{n.text}</p>
            </div>
          </div>
        ))}
      </main>

      {/* ─── Bottom Nav ─── */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/5 backdrop-blur-md rounded-2xl flex justify-between p-2 z-50">
        <div
          onClick={() => {
            showToast("Going to Home...", "info");
            goToPage("/home");
          }}
          className="flex flex-col items-center text-gray-400 text-sm cursor-pointer hover:text-blue-500"
        >
          <Home size={22} />
          <span>Home</span>
        </div>
        <div
          onClick={() => {
            showToast("Opening Leaderboard...", "info");
            goToPage("/leaderboard");
          }}
          className="flex flex-col items-center text-gray-400 text-sm cursor-pointer hover:text-blue-500"
        >
          <Trophy size={22} />
          <span>Leaderboard</span>
        </div>
        <div
          onClick={() => {
            showToast("Redirecting to Deposit...", "success");
            goToPage("/deposit");
          }}
          className="flex flex-col items-center text-gray-400 text-sm cursor-pointer hover:text-blue-500"
        >
          <Wallet size={22} />
          <span>Deposit</span>
        </div>
        <div
          onClick={() => {
            showToast("Opening Withdraw Page...", "warning");
            goToPage("/withdraw");
          }}
          className="flex flex-col items-center text-gray-400 text-sm cursor-pointer hover:text-blue-500"
        >
          <LogOut size={22} />
          <span>Withdraw</span>
        </div>
      </nav>
    </div>
  );
};

export default Notification;
