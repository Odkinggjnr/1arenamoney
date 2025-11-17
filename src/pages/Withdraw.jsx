import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, X, ArrowLeft } from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md border ${
        type === "success"
          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-100"
          : "bg-amber-500/20 border-amber-500/50 text-amber-100"
      } min-w-[320px] max-w-md`}
    >
      <div className="flex-shrink-0">
        {type === "success" ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
      </div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const Withdraw = () => {
  const [crypto, setCrypto] = useState("btc");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleWithdraw = () => {
    if (!address || !amount) {
      showToast("Please fill in all fields.", "warning");
      return;
    }

    showToast(`Withdrawal of $${amount} submitted successfully.`, "success");
    setAddress("");
    setAmount("");
  };

  const handleBack = () => {
    navigate('/');
  }
  const cryptoOptions = [
    { value: "btc", label: "Bitcoin", symbol: "BTC" },
    { value: "eth", label: "Ethereum", symbol: "ETH" },
    { value: "usdt", label: "Tether", symbol: "USDT-TRC20" },
    { value: "ltc", label: "Litecoin", symbol: "LTC" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center relative overflow-hidden">
      {/* Animated Background Elements */}
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

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.img
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            onClick={handleBack}
            className="h-12 sm:h-14 mx-auto mb-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Withdraw Funds
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 mt-2 text-sm sm:text-base"
          >
            Fast and secure cryptocurrency withdrawals
          </motion.p>
        </motion.header>

        {/* Withdraw Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-800/50"
        >
          {/* Cryptocurrency Select */}
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-slate-200 text-sm">
              Select Cryptocurrency
            </label>
            <select
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
              className="w-full bg-slate-800/50 text-white p-4 rounded-xl outline-none border border-slate-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              {cryptoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Wallet Address Input */}
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-slate-200 text-sm">
              Your Wallet Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Paste your wallet address"
              className="w-full bg-slate-800/50 text-white p-4 rounded-xl outline-none border border-slate-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-500"
            />
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-slate-200 text-sm">
              Enter Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-800/50 text-white p-4 pl-8 rounded-xl outline-none border border-slate-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleWithdraw}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 cursor-pointer"
          >
            Submit Withdrawal
          </motion.button>

          {/* Info Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-slate-400 text-xs sm:text-sm mt-4 flex items-center justify-center gap-2"
          >
            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Withdrawals process in 5–15 minutes
          </motion.p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Withdraw;
