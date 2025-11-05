import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate} from "react-router-dom";

const Withdraw = () => {
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState("btc");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    if (!address || !amount) {
      toast.warn("⚠️ Please fill in all fields.");
      return;
    }

    toast.success(`✅ Withdrawal of $${amount} submitted successfully.`);
    setAddress("");
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-[Inter,sans-serif] p-4 flex flex-col items-center">
      {/* Toastify container */}
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />

      {/* Header */}
      <header className="text-center mb-6">
        <img onClick={() => navigate("/")}
          src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
          alt="Logo"
          className="h-14 mx-auto mb-2 cursor-pointer"
        />
        <h1 className="text-2xl font-bold mt-10">💸 Withdraw</h1>
      </header>

      {/* Withdraw Card */}
      <div className="bg-[#121216] p-6 rounded-[14px] shadow-lg w-full max-w-md">
        <label className="block mb-2 font-semibold">Select Cryptocurrency</label>
        <select
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          className="w-full bg-[#1a1b1f] text-white p-3 rounded-md mb-4 outline-none"
        >
          <option value="btc">Bitcoin (BTC)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="usdt">Tether (USDT-TRC20)</option>
          <option value="ltc">Litecoin (LTC)</option>
        </select>

        <label className="block mb-2 font-semibold">Your Wallet Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Paste your wallet address"
          className="w-full bg-[#1a1b1f] text-white p-3 rounded-md mb-4 outline-none"
        />

        <label className="block mb-2 font-semibold">Enter Amount (USD)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 50"
          className="w-full bg-[#1a1b1f] text-white p-3 rounded-md mb-4 outline-none"
        />

        <button
          onClick={handleWithdraw}
          className="w-full bg-[#1e90ff] hover:bg-[#0072e0] transition-colors text-white font-bold py-3 rounded-md mt-2"
        >
          Submit Withdrawal
        </button>

        <p className="text-center text-gray-400 text-sm mt-3">
          Withdrawals take 5–15 minutes to process.
        </p>
      </div>

      {/* Back Button */}
      <Link
        to="/home"
        className="mt-6 text-[#1e90ff] hover:underline font-semibold"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default Withdraw;
