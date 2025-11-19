import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Trophy, Wallet, ArrowRight, Bell, Menu, X, 
  MessageCircle, Facebook, Instagram, Globe, Pin,
  CheckCircle, AlertCircle, Edit2, CreditCard, DollarSign,
  Award, Settings, HelpCircle
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

const Sidebar = ({ open, onClose, user, onUsernameEdit }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", path: "/" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Deposit", path: "/deposit" },
    { icon: <DollarSign className="w-5 h-5" />, label: "Withdraw", path: "/withdraw" },
    { icon: <Trophy className="w-5 h-5" />, label: "Leaderboard", path: "/leadership" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/settings" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Tournament Chat", path: "/tournament-chat" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Support", path: "/support" },
  ];

  const showToast = (message) => {
    console.log(message);
  };

  const handleNavigation = (path) => {
    // Trigger loading state in parent component
    if (window.setLoading) {
      window.setLoading(true);
    }
    
    // Close sidebar first
    onClose();
    
    // Navigate after a short delay for smooth transition
    setTimeout(() => {
      navigate(path);
      // Loading will be turned off in the destination component
    }, 300);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-screen w-4/5 sm:w-80 md:w-96 bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl z-40 flex flex-col border-r border-white/10 overflow-hidden"
          >
            <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Menu
              </h3>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-2xl sm:text-3xl text-white leading-none w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                ×
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 mx-3 sm:mx-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 mb-4"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg shadow-blue-500/30 flex-shrink-0">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <motion.strong
                      whileHover={{ scale: 1.05 }}
                      onClick={onUsernameEdit}
                      className="cursor-pointer hover:text-blue-400 text-base sm:text-lg block transition-colors truncate"
                      title={user.username}
                    >
                      {user.username}
                    </motion.strong>
                    <p className="text-xs text-gray-400 font-mono truncate">ID: {user.id}</p>
                    <p className="text-sm text-emerald-400 font-medium mt-1 truncate">
                      ${user.balance.toFixed(2)}
                    </p>
                  </div>
                </motion.div>

                <div className="px-2 sm:px-3 space-y-1">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation(item.path)}
                      className="p-3 hover:bg-white/5 cursor-pointer flex items-center gap-3 rounded-xl transition-all group"
                    >
                      <div className="text-xl group-hover:scale-110 transition-transform flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="font-medium group-hover:text-blue-400 transition-colors text-sm truncate">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Removed Support Section to prevent bottom nav overlap */}
            </div>

            <style jsx>{`
              .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
              }
              
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
                border-radius: 3px;
              }
              
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: linear-gradient(to bottom, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5));
                border-radius: 3px;
              }
              
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(to bottom, rgba(59, 130, 246, 0.7), rgba(147, 51, 234, 0.7));
              }
            `}</style>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const BottomNav = ({ navigateWithLoading }) => {
  const navigate = useNavigate();
  
  const bottomNavLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Board", path: "/leadership", icon: "🏆" },
    { name: "Deposit", path: "/deposit", icon: "💰" },
    { name: "Withdraw", path: "/withdraw", icon: "💸" },
    { name: "WhatsApp", path: "https://wa.me/1234567890", icon: "🟢", external: true },
    { name: "Telegram", path: "https://t.me/yourusername", icon: "✈", external: true },
  ];

  const handleNavigation = (path, external = false) => {
    if (external) {
      window.open(path, "_blank");
    } else {
      navigateWithLoading(path);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-slate-900/80 backdrop-blur-xl flex justify-between px-2 py-3 rounded-3xl border border-white/10 shadow-2xl z-50 mb-5 md:mb-0"
    >
      {bottomNavLinks.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 text-center cursor-pointer text-gray-400 hover:text-white transition-colors group"
          onClick={() => handleNavigation(item.path, item.external)}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
            <span className="text-xs font-medium">{item.name}</span>
          </div>
        </motion.div>
      ))}
    </motion.nav>
  );
};

const Notification = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [user] = useState({
    username: "Homelander",
    id: "334887190",
    balance: 100,
  });

  // Make setLoading available globally for sidebar
  React.useEffect(() => {
    window.setLoading = (loading) => {
      if (loading) {
        showToast("Loading...", "info", 2000);
      }
    };
    return () => {
      window.setLoading = null;
    };
  }, []);

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  const handleUsernameEdit = () => {
    const newName = prompt("Enter new username:", user.username);
    if (newName && newName.trim() !== "") {
      showToast("Username updated successfully!", "success");
    }
  };

  const navigateWithLoading = (path) => {
    showToast(`Navigating to ${path}...`, "info");
    
    // Set loading state
    if (window.setLoading) {
      window.setLoading(true);
    }
    
    // Navigate after a short delay for smooth transition
    setTimeout(() => {
      navigate(path);
    }, 500);
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

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onUsernameEdit={handleUsernameEdit}
      />

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-40 flex justify-between items-center px-4 md:px-8 py-4 bg-slate-900/50 backdrop-blur-xl sticky top-0 border-b border-white/10"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center cursor-pointer shadow-lg shadow-blue-500/30"
        >
          <Menu className="text-white text-lg" />
        </motion.div>

        <motion.img
          whileHover={{ scale: 1.05, rotate: 5 }}
          onClick={() => navigateWithLoading("/")}
          src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
          alt="Logo"
          className="h-10 sm:h-12 mx-auto cursor-pointer mr-5 md:ml-0"
        />

        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl px-1 py-2 rounded-xl font-bold text-sm border border-emerald-500/30 shadow-lg shadow-emerald-500/20"
          >
            ${user.balance.toFixed(2)}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateWithLoading("/deposit")}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-1 py-2 rounded-xl text-sm shadow-lg shadow-green-500/30 transition-all cursor-pointer"
          >
            Deposit
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => showToast("You have 3 new notifications!", "info")}
            className="relative w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-xl cursor-pointer border border-white/10 shadow-lg"
          >
            <Bell className="w-5 h-5" />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
            />
          </motion.div>
        </div>
      </motion.header>

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

      <BottomNav navigateWithLoading={navigateWithLoading} />
    </div>
  );
};

export default Notification;