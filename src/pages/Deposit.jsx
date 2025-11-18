import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  X,
  Home,
  Settings,
  Trophy,
  MessageCircle,
  LogOut,
  Bell,
  Menu,
  Copy,
  CheckCircle2,
  AlertCircle,
  Info,
  DollarSign,
  Bitcoin,
  ArrowLeft,
  CreditCard,
  Download,
  HelpCircle,
} from "lucide-react";

// ==========================
// Enhanced Reusable Sidebar Component
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
  width = "w-4/5 sm:w-80 md:w-96",
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
    navigate(path);
    onClose();
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

      {/* Enhanced Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={sidebarVariants[position].closed}
            animate={sidebarVariants[position].open}
            exit={sidebarVariants[position].closed}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed ${getPositionClasses()} h-screen ${width} ${theme.background} ${theme.text} backdrop-blur-xl z-40 flex flex-col shadow-2xl ${theme.border} overflow-hidden`}
          >
            {/* Main Content Container */}
            <div className="flex flex-col h-full">
              {/* Header - Fixed height */}
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

              {/* Scrollable Content Area with Custom Scrollbar */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
                  {/* User Profile Section */}
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
                        onClick={handleUsernameEdit}
                        className="cursor-pointer hover:text-blue-400 text-base sm:text-lg block transition-colors truncate"
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

                  {/* Menu Links */}
                  <div className="px-2 sm:px-3 space-y-1">
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
                        <span className="text-xl group-hover:scale-110 transition-transform min-w-6 text-center flex-shrink-0">
                          {item.icon}
                        </span>
                        <span className="font-medium group-hover:text-blue-400 transition-colors text-sm truncate">
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Support Section - Fixed at bottom */}
                <div className="flex-shrink-0 p-3 sm:p-4 border-t border-white/10 bg-slate-900/50">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-2xl border border-white/20 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="text-white" size={16} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-sm">24/7 Support</h4>
                        <p className="text-white/80 text-xs">Always here to help you</p>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation("/support")}
                      className="w-full p-2 bg-white/10 rounded-lg cursor-pointer text-center hover:bg-white/20 transition-colors"
                    >
                      <span className="text-white text-xs font-medium">Get Help Now</span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Custom Scrollbar Styles */}
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
              
              /* For Firefox */
              @supports (scrollbar-color: auto) {
                .custom-scrollbar {
                  scrollbar-width: thin;
                  scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
                }
              }
            `}</style>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

// ==========================
// Custom Toast Alert Component
// ==========================
const CustomToast = ({ type, message, onClose }) => {
  const config = {
    success: {
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-100",
    },
    error: {
      icon: AlertCircle,
      gradient: "from-red-500 to-rose-500",
      iconColor: "text-red-100",
    },
    info: {
      icon: Info,
      gradient: "from-blue-500 to-indigo-500",
      iconColor: "text-blue-100",
    },
  };

  const { icon: Icon, gradient, iconColor } = config[type] || config.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`fixed top-6 right-6 z-50 bg-gradient-to-r ${gradient} backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 max-w-md`}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={iconColor} size={24} />
        </motion.div>
        <p className="flex-1 font-semibold">{message}</p>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-white/80 hover:text-white"
        >
          <X size={18} />
        </motion.button>
      </div>
      <motion.div
        className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 2.5, ease: "linear" }}
      />
    </motion.div>
  );
};

// ==========================
// Deposit Component
// ==========================
const Deposit = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    username: "Homelander",
    id: Math.floor(100000000 + Math.random() * 900000000),
    balance: 100,
  });

  const [method, setMethod] = useState("crypto");
  const [crypto, setCrypto] = useState("btc");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [toasts, setToasts] = useState([]);
  const [copied, setCopied] = useState(false);

  const walletMap = {
    btc: "bc1qtqxn50ehhg2cyrhfay9k4tkurnn5xlrk5whfrn",
    eth: "0xbD186916f21ce37375f049DE6F0cAb0124E7ddB6",
    usdt: "TFPkvU8eAUBPpskvA9V8xJJihGJ4efRWUQ",
    ltc: "ltc1qkkcdwqtjae6enuw25nvywfr83zjw62n48f2dp4",
  };

  const showToast = (type, message) => {
    const newToast = { id: Date.now(), type, message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 2500);
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("moneyRoomsUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("moneyRoomsUser", JSON.stringify(user));
  }, [user]);

  const handleUsernameEdit = () => {
    const newName = prompt("Enter new username:", user.username);
    if (newName && newName.trim() !== "") {
      setUser({ ...user, username: newName.trim() });
      showToast("success", "Username updated successfully!");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    showToast("success", "Address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCryptoDeposit = () => {
    if (!amount || Number(amount) <= 0) {
      showToast("error", "Please enter a valid amount before generating an address.");
      return;
    }
    const address = walletMap[crypto];
    setWalletAddress(address);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?data=${address}&size=200x200`);
    showToast("success", "Crypto deposit address generated successfully!");
  };

  const handleFiatDeposit = () => {
    if (!amount || Number(amount) <= 0) {
      showToast("error", "Please enter a valid amount.");
      return;
    }
    showToast("info", `Redirecting to payment gateway for ${currency} ${amount}...`);
  };

  const cryptoOptions = [
    { value: "btc", label: "Bitcoin (BTC)", icon: "₿" },
    { value: "eth", label: "Ethereum (ETH)", icon: "Ξ" },
    { value: "usdt", label: "Tether (USDT-TRC20)", icon: "₮" },
    { value: "ltc", label: "Litecoin (LTC)", icon: "Ł" },
  ];

  // Custom menu links for the sidebar
  const menuLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Deposit", path: "/deposit", icon: "💰" },
    { name: "Withdraw", path: "/withdraw", icon: "💸" },
    { name: "Leaderboard", path: "/leadership", icon: "🏆" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Tournament Chat", path: "/tournament-chat", icon: "💬" },
    { name: "Support", path: "/support", icon: "🆘" },
  ];

  const handleNavigation = (path) => {
    showToast("info", `Navigating to ${path}...`);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <CustomToast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </AnimatePresence>

      {/* Enhanced Sidebar Component */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onUsernameEdit={handleUsernameEdit}
        menuLinks={menuLinks}
        position="left"
        width="w-4/5 sm:w-80 md:w-96"
        theme={{
          background: "bg-gradient-to-br from-slate-900 to-slate-950",
          text: "text-white",
          accent: "from-blue-400 to-purple-500",
          userCard: "from-blue-500/10 to-purple-500/10",
          border: "border-white/10"
        }}
      />

      {/* Header */}
      <motion.header className="relative z-40 flex justify-between items-center px-4 sm:px-6 py-4 bg-black/40 backdrop-blur-xl sticky top-0 border-b border-white/10 shadow-lg">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={28} className="cursor-pointer"/>
        </motion.button>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <img
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            className="h-10 sm:h-12 cursor-pointer drop-shadow-lg"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <div className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl font-bold text-sm sm:text-base border border-white/20">
            ${user.balance.toFixed(2)}
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center cursor-pointer border border-white/20"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full mb-4 shadow-lg"
            >
              <Wallet size={28} />
              <h1 className="text-2xl sm:text-3xl font-bold">Deposit Funds</h1>
            </motion.div>
            <p className="text-gray-400">Add funds to your account securely</p>
          </div>

          {/* Deposit Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Method Toggle */}
            <div className="p-6 border-b border-white/10">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMethod("crypto")}
                  className={`flex-1 py-4 rounded-xl cursor-pointer font-bold text-lg transition-all ${
                    method === "crypto"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Bitcoin className="inline mr-2" size={20} />
                  Crypto
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMethod("fiat")}
                  className={`flex-1 py-4 rounded-xl cursor-pointer font-bold text-lg transition-all ${
                    method === "fiat"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <CreditCard className="inline mr-2" size={20} />
                  Fiat
                </motion.button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {method === "crypto" ? (
                  <motion.div
                    key="crypto"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <label className="block mb-3 font-semibold text-lg">
                      Select Cryptocurrency
                    </label>
                    <select
                      value={crypto}
                      onChange={(e) => setCrypto(e.target.value)}
                      className="w-full p-4 rounded-xl bg-black border border-white/10 text-white font-medium mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {cryptoOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.icon} {opt.label}
                        </option>
                      ))}
                    </select>

                    <label className="block mb-3 font-semibold text-lg">
                      Enter Amount (USD)
                    </label>
                    <div className="relative mb-6">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        placeholder="e.g. 100"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-4 pl-12 rounded-xl bg-white/5 border border-white/10 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={generateCryptoDeposit}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-bold text-lg shadow-lg mb-4 cursor-pointer"
                    >
                      Generate Deposit Address
                    </motion.button>

                    {walletAddress && (
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <p className="font-semibold mb-2 break-all">{walletAddress}</p>
                        <div className="flex justify-center gap-4 mb-2">
                          <button
                            onClick={copyToClipboard}
                            className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-500 font-medium cursor-pointer mb-5"
                          >
                            {copied ? "Copied" : "Copy Address"}
                          </button>
                        </div>
                        {qrUrl && (
                          <img
                            src={qrUrl}
                            alt="QR Code"
                            className="mx-auto mt-2 w-48 h-48"
                          />
                        )}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="fiat"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <label className="block mb-3 font-semibold text-lg">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="NGN">Naira (NGN)</option>
                      <option value="USD">Dollar (USD)</option>
                    </select>

                    <label className="block mb-3 font-semibold text-lg">
                      Enter Amount
                    </label>
                    <div className="relative mb-6">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        placeholder="e.g. 100"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-4 pl-12 rounded-xl bg-white/5 border border-white/10 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFiatDeposit}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-bold text-lg shadow-lg cursor-pointer"
                    >
                      Proceed to Payment
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Deposit;