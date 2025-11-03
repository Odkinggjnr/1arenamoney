import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiSettings,
  FiUser,
  FiDollarSign,
  FiCpu,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    username: "Homelander",
    id: Math.floor(100000000 + Math.random() * 900000000),
    balance: 100,
  });
  const [aiActivated, setAiActivated] = useState(false);
  const [remainingTries, setRemainingTries] = useState(10);

  // Load saved user data
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("moneyRoomsUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Save user data
  useEffect(() => {
    localStorage.setItem("moneyRoomsUser", JSON.stringify(user));
  }, [user]);

  const handleUsernameEdit = () => {
    const newName = prompt("Enter new username:", user.username);
    if (newName && newName.trim() !== "") {
      setUser({ ...user, username: newName.trim() });
      toast.success("Username updated successfully!");
    } else {
      toast.info("Username unchanged.");
    }
  };

  const goToPage = (page) => {
    window.location.href = page;
  };

  const handleToggleAI = () => {
    if (!aiActivated && remainingTries <= 0) {
      toast.error("You’ve reached your AI usage limit. Please upgrade your plan.");
      return;
    }
    setAiActivated(!aiActivated);
    toast.success(aiActivated ? "AI Deactivated" : "AI Activated");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-[#1f2229]/90 backdrop-blur-md shadow-2xl z-40 border-r border-white/10 
          transform transition-transform duration-300 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col justify-between h-full ">
          <div>
            {/* Profile section */}
            <div className="flex items-center gap-3 p-6 border-b border-white/10">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="User"
                className="w-12 h-12 rounded-full bg-[#333]"
              />
              <div>
                <strong
                  onClick={handleUsernameEdit}
                  className="cursor-pointer hover:text-blue-400"
                >
                  {user.username}
                </strong>
                <p className="text-xs text-gray-400">ID {user.id}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-4">
              <ul className="space-y-1">
                {[
                  { label: "Dashboard", icon: "🏠", link: "/" },
                  { label: "Deposit", icon: "💰", link: "/deposit" },
                  { label: "Withdraw", icon: "💸", link: "/withdraw" },
                  { label: "Leadership", icon: "🏆", link: "/leadership" },
                  { label: "Tournament Chat", icon: "💬", link: "/tournament-chat" },
                  { label: "Support", icon: "🛟", link: "/support" },
                ].map((item, i) => (
                  <li
                    key={i}
                    onClick={() => goToPage(item.link)}
                    className="flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-white/10 transition rounded-lg"
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm md:text-base">{item.label}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Logout */}
          <div className="border-t border-white/10 p-4 flex justify-between items-center">
            <button
              onClick={() => goToPage("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-hidden md:ml-0">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 z-50"
        >
          <FiMenu /> {sidebarOpen ? "Close" : "Menu"}
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 mt-12 md:mt-0">
          <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
            <FiSettings className="text-blue-500" /> Settings
          </h2>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* User Settings */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#1f2229]/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FiUser className="text-blue-400" /> User Settings
            </h3>
            <p className="text-gray-400 mb-3 text-sm">
              Manage your personal account info.
            </p>
            <button
              onClick={handleUsernameEdit}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition w-full"
            >
              Edit Username
            </button>
          </motion.div>

          {/* Payout Settings */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#1f2229]/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FiDollarSign className="text-green-400" /> Payout Settings
            </h3>
            <p className="text-gray-400 mb-3 text-sm">
              Choose or update your preferred payment method.
            </p>
            <button
              onClick={() => toast.info("Payment method setup coming soon.")}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition w-full"
            >
              Set Payment Method
            </button>
          </motion.div>

          {/* AI Activation */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#1f2229]/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 col-span-1 md:col-span-2 xl:col-span-1"
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FiCpu className="text-purple-400" /> AI Activation
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Remaining AI Tries:{" "}
              <span className="text-white font-semibold">{remainingTries}</span>
            </p>
            <button
              onClick={handleToggleAI}
              className={`w-full px-6 py-2 rounded-lg transition ${
                aiActivated
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {aiActivated ? "Deactivate AI" : "Activate AI"}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
