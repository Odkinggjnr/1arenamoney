import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Trophy, Wallet, ArrowRight, Bell, Menu, X, 
  MessageCircle, Facebook, Instagram, Globe, Pin,
  CheckCircle, AlertCircle, Edit2, CreditCard, DollarSign,
  Award, Settings
} from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  };

  const colors = {
    success: "bg-emerald-500/20 border-emerald-500/50 text-emerald-100",
    warning: "bg-amber-500/20 border-amber-500/50 text-amber-100",
    error: "bg-red-500/20 border-red-500/50 text-red-100",
    info: "bg-blue-500/20 border-blue-500/50 text-blue-100"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md border ${colors[type]} min-w-[280px] max-w-md`}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={onClose} className="flex-shrink-0 hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const Notification = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [user] = useState({
    username: "Homelander",
    id: "334887190",
    balance: 100,
  });

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const notifications = [
    {
      icon: "🎉",
      title: "Congrats! You Won",
      text: "You won $45 in the $5 Room Tournament. Keep playing to climb the leaderboard!",
      color: "from-emerald-500/20 to-green-500/20",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: "💰",
      title: "Deposit Successful",
      text: "Your $20 deposit was credited to your wallet. Enjoy your games!",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: "⚡",
      title: "New Tournament",
      text: "$10 Room opens in 10 minutes! Join early to get a bonus multiplier.",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
  ];

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", path: "/home" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Deposit", path: "/deposit" },
    { icon: <DollarSign className="w-5 h-5" />, label: "Withdraw", path: "/withdraw" },
    { icon: <Award className="w-5 h-5" />, label: "Leadership", path: "/leadership" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen pb-24 font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Topbar */}
      <header className="relative z-50 sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="flex justify-between items-center p-4 sm:p-6">
          <motion.button
            onClick={() => setSidebarOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </motion.button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <img
              src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
              alt="Logo"
              className="h-8 sm:h-10"
            />
          </div>

          <div className="flex gap-2 sm:gap-3 items-center">
            <div className="bg-slate-800/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm border border-slate-700/50">
              ${user.balance.toFixed(2)}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => showToast("Redirecting to deposit page...", "success")}
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-500/25"
            >
              Deposit
            </motion.button>
            <motion.button
              onClick={() => showToast("You have 3 new notifications!", "info")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-slate-900/95 backdrop-blur-xl z-50 flex flex-col justify-between border-r border-slate-800/50"
          >
            <div>
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-800/50">
                <h3 className="text-lg font-semibold">Menu</h3>
                <motion.button
                  onClick={() => setSidebarOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center gap-3 p-4 sm:p-6 bg-slate-800/30">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {user.username.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-base">{user.username}</strong>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 hover:bg-slate-700/50 rounded"
                    >
                      <Edit2 className="w-3 h-3" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-slate-400">ID {user.id}</p>
                </div>
              </div>

              <div className="py-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => showToast(`Navigating to ${item.label}...`, "info")}
                    className="w-full px-4 py-3 hover:bg-slate-800/50 cursor-pointer flex items-center gap-3 text-sm transition-colors text-left"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800/50 p-4 space-y-3">
              <div className="flex gap-3 justify-center">
                {[
                  { icon: <Facebook size={16} />, color: "hover:bg-blue-500" },
                  { icon: <Instagram size={16} />, color: "hover:bg-pink-500" },
                  { icon: <Pin size={16} />, color: "hover:bg-red-500" },
                  { icon: <Globe size={16} />, color: "hover:bg-blue-400" }
                ].map((social, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center ${social.color} transition cursor-pointer`}
                  >
                    {social.icon}
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-between items-center bg-slate-800/50 hover:bg-blue-500/20 px-4 py-3 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Support</span>
                </div>
                <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                  24/7
                </span>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 p-4 sm:p-6 lg:p-8 mt-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <Bell className="w-7 h-7 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Notifications
            </h1>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {notifications.map((n, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => showToast(`Opening: ${n.title}`, "info")}
                className={`bg-gradient-to-r ${n.color} backdrop-blur-sm p-4 sm:p-5 rounded-2xl border ${n.borderColor} cursor-pointer transition-all shadow-lg hover:shadow-xl`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{n.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg mb-1 text-white">
                      {n.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {n.text}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Bottom Nav */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800/50 shadow-2xl z-50"
      >
        <div className="flex justify-between p-2">
          {[
            { icon: Home, label: "Home", path: "/home" },
            { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
            { icon: Wallet, label: "Deposit", path: "/deposit" },
            { icon: DollarSign, label: "Withdraw", path: "/withdraw" }
          ].map((item) => (
            <motion.div
              key={item.label}
              onClick={() => showToast(`Going to ${item.label}...`, "info")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center text-slate-400 text-xs cursor-pointer hover:text-blue-400 transition-colors p-2 rounded-xl hover:bg-slate-800/50"
            >
              <item.icon size={22} />
              <span className="mt-1">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export default Notification;
