import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Bell, Send, MessageCircle, Trophy, 
  Settings, CreditCard, DollarSign, Award,
  CheckCircle, AlertCircle, Info, Edit2
} from "lucide-react";

// ==========================
// Custom Alert Component
// ==========================
const CustomAlert = ({ 
  type = "info", 
  message, 
  onClose, 
  duration = 4000,
  position = "top-right"
}) => {
  const config = {
    success: {
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-100",
      border: "border-emerald-400/30",
    },
    error: {
      icon: AlertCircle,
      gradient: "from-red-500 to-rose-500",
      iconColor: "text-red-100",
      border: "border-red-400/30",
    },
    info: {
      icon: Info,
      gradient: "from-blue-500 to-indigo-500",
      iconColor: "text-blue-100",
      border: "border-blue-400/30",
    },
  };

  const { icon: Icon, gradient, iconColor, border } = config[type] || config.info;

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`fixed ${positionClasses[position]} z-50 bg-gradient-to-r ${gradient} backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl border ${border} max-w-sm`}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={iconColor} size={24} />
        </motion.div>
        <p className="flex-1 font-semibold text-sm">{message}</p>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X size={18} />
        </motion.button>
      </div>
      {duration > 0 && (
        <motion.div
          className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

// ==========================
// Alert Container Component
// ==========================
const AlertContainer = ({ alerts, removeAlert }) => (
  <div className="fixed z-50">
    <AnimatePresence>
      {alerts.map((alert) => (
        <CustomAlert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          duration={alert.duration}
          position={alert.position}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </AnimatePresence>
  </div>
);

// ==========================
// Sidebar Component
// ==========================
const Sidebar = ({
  open = false,
  onClose,
  user = {
    username: "Homelander",
    id: Math.floor(100000000 + Math.random() * 900000000),
    balance: 100,
  },
  onUsernameEdit,
  menuLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Deposit", path: "/deposit", icon: "💰" },
    { name: "Withdraw", path: "/withdraw", icon: "💸" },
    { name: "Leaderboard", path: "/leadership", icon: "🏆" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Tournament Chat", path: "/tournament-chat", icon: "💬" },
    { name: "Support", path: "/support", icon: "🆘" },
  ],
  showOverlay = true,
  position = "left",
  width = "w-4/5 max-w-sm",
  theme = {
    background: "bg-gradient-to-br from-slate-900 to-slate-950",
    text: "text-white",
    accent: "from-blue-400 to-purple-500",
    userCard: "from-blue-500/10 to-purple-500/10",
    border: "border-white/10"
  }
}) => {
  const navigate = useNavigate();

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

  const handleUsernameEdit = () => {
    if (onUsernameEdit) {
      onUsernameEdit();
    } else {
      const newName = prompt("Enter new username:", user.username);
      if (newName && newName.trim() !== "") {
        console.log("Username updated to:", newName.trim());
      }
    }
  };

  const sidebarVariants = {
    left: {
      closed: { x: "-100%" },
      open: { x: 0 }
    },
    right: {
      closed: { x: "100%" },
      open: { x: 0 }
    },
    top: {
      closed: { y: "-100%" },
      open: { y: 0 }
    },
    bottom: {
      closed: { y: "100%" },
      open: { y: 0 }
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "right":
        return "top-0 right-0 border-l";
      case "top":
        return "top-0 left-0 w-full h-4/5 max-h-96 border-b";
      case "bottom":
        return "bottom-0 left-0 w-full h-4/5 max-h-96 border-t";
      default: // left
        return "top-0 left-0 border-r";
    }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={sidebarVariants[position].closed}
            animate={sidebarVariants[position].open}
            exit={sidebarVariants[position].closed}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed ${getPositionClasses()} h-screen ${width} ${theme.background} ${theme.text} backdrop-blur-xl z-40 flex flex-col shadow-2xl ${theme.border} overflow-hidden`}
          >
            {/* Main Content Container - No scrolling needed */}
            <div className="flex flex-col h-full">
              {/* Header - Fixed height */}
              <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Menu
                </h3>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-3xl text-white leading-none w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  ×
                </motion.button>
              </div>

              {/* Scrollable Content Area - Fits perfectly */}
              <div className="flex-1 flex flex-col justify-between py-4 overflow-hidden">
                {/* Top Section - User Info & Menu Links */}
                <div className="flex-1 overflow-hidden">
                  {/* User Profile Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-4 p-4 mx-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 mb-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-500/30">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <motion.strong
                        whileHover={{ scale: 1.05 }}
                        onClick={handleUsernameEdit}
                        className="cursor-pointer hover:text-blue-400 text-lg block transition-colors truncate"
                        title={user.username}
                      >
                        {user.username}
                      </motion.strong>
                      <p className="text-xs text-gray-400 font-mono truncate">ID: {user.id}</p>
                      {user.balance && (
                        <p className="text-sm text-emerald-400 font-medium mt-1 truncate">
                          ${user.balance.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* Menu Links - Compact spacing */}
                  <div className="px-3 space-y-1">
                    {menuLinks.map((item, i) => (
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
                        <span className="text-xl group-hover:scale-110 transition-transform min-w-6 text-center">
                          {item.icon}
                        </span>
                        <span className="font-medium group-hover:text-blue-400 transition-colors text-sm truncate">
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Support Section - Simplified */}
                <div className="flex-shrink-0 px-3 mt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-2xl border border-white/20 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg">🆘</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-sm">24/7 Support</h4>
                        <p className="text-white/80 text-xs">Always here to help you</p>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleNavigation("/support")}
                      className="w-full p-2 bg-white/10 rounded-lg cursor-pointer text-center"
                    >
                      <span className="text-white text-xs font-medium">Get Help Now</span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const Tournament = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    username: "Homelander",
    id: Math.floor(100000000 + Math.random() * 900000000),
    balance: 100,
  });
  const [alerts, setAlerts] = useState([]);
  const [messages, setMessages] = useState([
    { user: "System", text: "Welcome to the tournament chat!", time: "10:30 AM" },
    { user: "Homelander", text: "Ready to compete!", time: "10:31 AM" },
    { user: "MaxPro", text: "Good luck everyone 🎮", time: "10:32 AM" }
  ]);
  const [input, setInput] = useState("");

  // Make setLoading available globally for sidebar
  useEffect(() => {
    window.setLoading = (loading) => {
      if (loading) {
        showAlert("info", "Loading...", 2000);
      }
    };
    return () => {
      window.setLoading = null;
    };
  }, []);

  // Alert system
  const showAlert = (type, message, duration = 4000, position = "top-right") => {
    const id = Date.now() + Math.random();
    setAlerts(prev => [...prev, { id, type, message, duration, position }]);
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleUsernameEdit = () => {
    const newName = prompt("Enter new username:", user.username);
    if (newName && newName.trim() !== "") {
      setUser({ ...user, username: newName.trim() });
      showAlert("success", `Username changed to ${newName.trim()}`);
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { user: user.username, text: input, time }]);
      setInput("");
      showAlert("info", "Message sent successfully 💬");
    } else {
      showAlert("error", "Cannot send empty message!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleBack = () => {
    navigate('/'); 
  }

  const menuLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Deposit", path: "/deposit", icon: "💰" },
    { name: "Withdraw", path: "/withdraw", icon: "💸" },
    { name: "Leaderboard", path: "/leadership", icon: "🏆" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Tournament Chat", path: "/tournament-chat", icon: "💬" },
    { name: "Support", path: "/support", icon: "🆘" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Custom Alerts */}
      <AlertContainer alerts={alerts} removeAlert={removeAlert} />

      {/* Sidebar Component */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onUsernameEdit={handleUsernameEdit}
        menuLinks={menuLinks}
      />

      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
          <motion.button
            onClick={() => setSidebarOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center cursor-pointer shadow-lg shadow-blue-500/30"
          >
            <Menu className="w-6 h-6 text-white" />
          </motion.button>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <motion.img
              whileHover={{ scale: 1.05, rotate: 5 }}
              src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
              alt="Logo"
              onClick={handleBack}
              className="h-8 sm:h-10 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl px-3 py-2 rounded-xl font-bold text-sm border border-emerald-500/30 shadow-lg shadow-emerald-500/20"
            >
              ${user.balance.toFixed(2)}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/deposit")}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-3 py-2 rounded-xl text-sm shadow-lg shadow-green-500/30 transition-all cursor-pointer"
            >
              Deposit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center cursor-pointer border border-white/10 shadow-lg"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full mb-4 shadow-lg"
            >
              <Trophy className="w-6 h-6 text-white" />
              <h2 className="text-2xl sm:text-3xl font-bold">Tournament Chat</h2>
            </motion.div>
            <p className="text-slate-400 text-sm">
              Connect with other players in real-time
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden mb-4"
          >
            <div className="h-96 sm:h-[28rem] overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex gap-3 ${msg.user === "System" ? "justify-center" : ""}`}
                >
                  {msg.user !== "System" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                      {msg.user.charAt(0)}
                    </div>
                  )}
                  <div className={`flex-1 ${msg.user === "System" ? "text-center" : ""}`}>
                    {msg.user !== "System" && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-blue-400">{msg.user}</span>
                        <span className="text-xs text-slate-500">{msg.time}</span>
                      </div>
                    )}
                    <div className={`${msg.user === "System" 
                      ? "inline-block bg-slate-800/50 text-slate-400 px-4 py-2 rounded-full text-xs" 
                      : "bg-slate-800/50 px-4 py-2 rounded-xl text-sm"}`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/10 p-4 bg-slate-900/80">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 bg-slate-800/50 text-white px-4 py-3 rounded-xl outline-none border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-500"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <motion.button
                  onClick={sendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-4 sm:px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline font-semibold">Send</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-slate-400 text-xs flex items-center justify-center gap-2"
          >
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Connected to tournament chat
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Tournament;