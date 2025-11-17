import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ==========================
// Reusable Sidebar Component
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
    { name: "Deposit", path: "/deposit", icon: "💰" },
    { name: "Withdraw", path: "/withdraw", icon: "💸" },
    { name: "Leaderboard", path: "/leadership", icon: "🏆" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Tournament Chat", path: "/tournament-chat", icon: "💬" },
  ],
  onNavigate,
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

  // Default navigation handler
  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
    onClose();
  };

  // Default username edit handler
  const handleUsernameEdit = () => {
    if (onUsernameEdit) {
      onUsernameEdit();
    } else {
      const newName = prompt("Enter new username:", user.username);
      if (newName && newName.trim() !== "") {
        // In a real app, you'd update the user state here
        console.log("Username updated to:", newName.trim());
      }
    }
  };

  // Animation variants based on position
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

  const getFlexDirection = () => {
    return position === "top" || position === "bottom" ? "flex-row" : "flex-col";
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
            className={`fixed ${getPositionClasses()} h-screen ${width} ${theme.background} ${theme.text} backdrop-blur-xl z-40 flex ${getFlexDirection()} shadow-2xl ${theme.border}`}
          >
            <div className="grow overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
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

              {/* User Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`flex ${position === "top" || position === "bottom" ? "flex-col text-center" : "items-center gap-4"} p-6 bg-gradient-to-r ${theme.userCard} m-4 rounded-2xl border ${theme.border}`}
              >
                <div className={`${position === "top" || position === "bottom" ? "w-20 h-20 mx-auto mb-3" : "w-16 h-16"} rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30`}>
                  {user.username[0].toUpperCase()}
                </div>
                <div className={position === "top" || position === "bottom" ? "text-center" : "flex-1"}>
                  <motion.strong
                    whileHover={{ scale: 1.05 }}
                    onClick={handleUsernameEdit}
                    className="cursor-pointer hover:text-blue-400 text-lg block transition-colors"
                  >
                    {user.username}
                  </motion.strong>
                  <p className="text-xs text-gray-400 font-mono">ID: {user.id}</p>
                  {user.balance && (
                    <p className="text-sm text-emerald-400 font-medium mt-1">
                      Balance: ${user.balance.toFixed(2)}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Menu Links */}
              <div className={`px-4 ${position === "top" || position === "bottom" ? "flex flex-wrap justify-center gap-2" : "space-y-2"}`}>
                {menuLinks.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: position === "right" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.02, x: position === "right" ? -5 : 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation(item.path)}
                    className={`p-4 hover:bg-white/5 cursor-pointer flex items-center gap-4 rounded-xl transition-all group ${
                      position === "top" || position === "bottom" ? "flex-col text-center w-24" : ""
                    }`}
                  >
                    <span className={`${position === "top" || position === "bottom" ? "text-3xl" : "text-2xl"} group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </span>
                    <span className="font-medium group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;