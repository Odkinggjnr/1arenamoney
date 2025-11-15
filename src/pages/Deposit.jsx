import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

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

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

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

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gradient-to-b from-slate-900 to-slate-800 backdrop-blur-xl text-white z-40 flex flex-col justify-between shadow-2xl border-r border-white/10"
          >
            <div>
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h3 className="text-xl font-bold">Menu</h3>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidebarOpen(false)}
                  className="text-3xl"
                >
                  <X size={28} />
                </motion.button>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/5">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User"
                  className="w-14 h-14 rounded-full border-2 border-white/20"
                />
                <div>
                  <strong
                    onClick={handleUsernameEdit}
                    className="cursor-pointer hover:text-blue-400 transition block text-lg"
                  >
                    {user.username}
                  </strong>
                  <p className="text-xs text-gray-400">ID {user.id}</p>
                </div>
              </div>

              <nav className="mt-4">
                {[
                  { name: "Deposit", icon: Wallet },
                  { name: "Withdraw", icon: Download },
                  { name: "Leaderboard", icon: Trophy },
                  { name: "Settings", icon: Settings },
                  { name: "Tournament Chat", icon: MessageCircle },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="p-4 cursor-pointer flex items-center gap-3 border-b border-white/5"
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="border-t border-white/10 p-6 space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center bg-blue-600 hover:bg-blue-500 px-4 py-3 rounded-xl cursor-pointer shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle size={20} />
                  <span className="font-semibold">Support</span>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                  24/7
                </span>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

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
