import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Deposit = () => {
 const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    username: "Homelander",
    id: Math.floor(100000000 + Math.random() * 900000000),
    balance: 100,
  });

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
    }
  };

  const goToPage = (page) => {
    window.location.href = page;
  };

  const enterLobby = (roomId) => {
    window.location.href = `/lobby?room=${roomId}`;
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


  const navigate = useNavigate();
  const [method, setMethod] = useState("crypto"); 
  const [crypto, setCrypto] = useState("btc");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [currency, setCurrency] = useState("NGN");

  const walletMap = {
    btc: "bc1qtqxn50ehhg2cyrhfay9k4tkurnn5xlrk5whfrn",
    eth: "0xbD186916f21ce37375f049DE6F0cAb0124E7ddB6",
    usdt: "TFPkvU8eAUBPpskvA9V8xJJihGJ4efRWUQ",
    ltc: "ltc1qkkcdwqtjae6enuw25nvywfr83zjw62n48f2dp4",
  };

  const generateCryptoDeposit = () => {
    if (!amount) {
      toast.error("Please enter an amount before generating an address.");
      return;
    }
    const address = walletMap[crypto];
    setWalletAddress(address);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?data=${address}&size=150x150`);
    toast.success("Crypto deposit address generated successfully!");
  };

  const handleFiatDeposit = () => {
    if (!amount) {
      toast.error("Please enter an amount.");
      return;
    }
    toast.info(`Redirecting to payment gateway for ${currency} ${amount}...`);
    // Here you can redirect to your payment processor API (e.g. Paystack, Stripe)
  };

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#0f1115",
        color: "#fff",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
 {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30 transition-opacity"
        ></div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-[#0f1115] sticky top-0 z-40 border-b border-white/10">
        <div
          onClick={toggleSidebar}
          className="text-2xl font-bold cursor-pointer"
        >
          ☰
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            className="h-8 sm:h-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/10 px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm">
            ${user.balance.toFixed(2)}
          </div>
          <button
            onClick={() => goToPage("/deposit")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded-full text-xs sm:text-sm"
          >
            Deposit
          </button>
          <div
            onClick={() => goToPage("/notifications")}
            className="relative w-8 h-8 sm:w-9 sm:h-9 bg-[#2a2a2f] rounded-lg flex items-center justify-center text-lg cursor-pointer hover:scale-110 transition-transform"
          >
            🔔
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[#1a1a1f] text-white z-40 flex flex-col justify-between transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold">Menu</h3>
            <button
              onClick={toggleSidebar}
              className="text-3xl text-white leading-none"
            >
              &times;
            </button>
          </div>

          <div className="flex items-center gap-3 p-4">
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

          <div className="divide-y divide-white/10">
            <div
              onClick={() => goToPage("/deposit")}
              className="p-4 hover:bg-white/10 cursor-pointer flex justify-between items-center"
            >
              💰 Deposit
            </div>
            <div
              onClick={() => goToPage("/withdraw")}
              className="p-4 hover:bg-white/10 cursor-pointer flex justify-between items-center"
            >
              💸 Withdraw
            </div>
            <div
              onClick={() => goToPage("/leadership")}
              className="p-4 hover:bg-white/10 cursor-pointer flex justify-between items-center"
            >
              🏆 Leadership
            </div>
             <div
              onClick={() => goToPage("/settings")}
              className="p-4 hover:bg-white/10 cursor-pointer flex justify-between items-center"
            >
               Settings
            </div>
             <div
              onClick={() => goToPage("/tournament-chat")}
              className="p-4 hover:bg-white/10 cursor-pointer flex justify-between items-center"
            >
             Tournament Chat
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-4 space-y-3">
          <div className="flex gap-2 justify-center">
            {["📘", "📸", "📌", "🌐"].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-[#2d2d33] rounded-full flex items-center justify-center hover:bg-blue-500 transition"
              >
                {icon}
              </div>
            ))}
          </div>

          <div
            onClick={() => goToPage("/support")}
            className="flex justify-between items-center bg-[#2d2d33] hover:bg-blue-500 px-3 py-2 rounded-lg cursor-pointer"
          >
            <div>💬 Support</div>
            <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs">
              24/7
            </span>
          </div>
        </div>
      </aside>

      {/* ─── Header ───────────────────────────── */}
      <header style={{ textAlign: "center", marginBottom: "24px", marginTop: "40px"}}>
       
        <h1 style={{ fontSize: "24px" }}>💰 Deposit</h1>
      </header>

      {/* ─── Card ───────────────────────────── */}
      <div
        style={{
          background: "#121216",
          padding: "20px",
          borderRadius: "14px",
          boxShadow: "0 0 8px rgba(0,0,0,0.3)",
          maxWidth: "420px",
          margin: "0 auto",
        }}
      >
        {/* Toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <button
            onClick={() => setMethod("crypto")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px 0 0 8px",
              background: method === "crypto" ? "#1e90ff" : "#1a1b1f",
              border: "none",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Crypto
          </button>
          <button
            onClick={() => setMethod("fiat")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "0 8px 8px 0",
              background: method === "fiat" ? "#1e90ff" : "#1a1b1f",
              border: "none",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Fiat
          </button>
        </div>

        {/* ─── CRYPTO DEPOSIT ───────────────────────────── */}
        {method === "crypto" ? (
          <>
            <label
              htmlFor="crypto"
              style={{ display: "block", margin: "12px 0 6px", fontWeight: 600 }}
            >
              Select Cryptocurrency
            </label>
            <select
              id="crypto"
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#1a1b1f",
                color: "white",
              }}
            >
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Ethereum (ETH)</option>
              <option value="usdt">Tether (USDT-TRC20)</option>
              <option value="ltc">Litecoin (LTC)</option>
            </select>

            <label
              htmlFor="amount"
              style={{ display: "block", margin: "12px 0 6px", fontWeight: 600 }}
            >
              Enter Amount (USD)
            </label>
            <input
              type="number"
              id="amount"
              placeholder="e.g. 100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#1a1b1f",
                color: "white",
              }}
            />

            <button
              onClick={generateCryptoDeposit}
              style={{
                width: "100%",
                padding: "12px",
                background: "#1e90ff",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontWeight: 700,
                marginTop: "20px",
                cursor: "pointer",
              }}
            >
              Generate Address
            </button>

            {qrUrl && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: "25px",
                }}
              >
                <p>Send your crypto to this address:</p>
                <img
                  src={qrUrl}
                  alt="QR Code"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    margin: "15px 0",
                  }}
                />
                <p
                  style={{
                    wordBreak: "break-all",
                    color: "#fff",
                    fontSize: "14px",
                    maxWidth: "100%",
                  }}
                >
                  {walletAddress}
                </p>
              </div>
            )}

            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "14px",
                color: "#98a0a8",
              }}
            >
              Deposits are processed after network confirmation.
            </div>
          </>
        ) : (
          /* ─── FIAT DEPOSIT ───────────────────────────── */
          <>
            <label
              htmlFor="currency"
              style={{ display: "block", margin: "12px 0 6px", fontWeight: 600 }}
            >
              Select Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#1a1b1f",
                color: "white",
              }}
            >
              <option value="NGN">Naira (₦)</option>
              <option value="USD">Dollar ($)</option>
              <option value="GBP">Pound (£)</option>
            </select>

            <label
              htmlFor="fiatAmount"
              style={{ display: "block", margin: "12px 0 6px", fontWeight: 600 }}
            >
              Enter Amount
            </label>
            <input
              type="number"
              id="fiatAmount"
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#1a1b1f",
                color: "white",
              }}
            />

            <button
              onClick={handleFiatDeposit}
              style={{
                width: "100%",
                padding: "12px",
                background: "#1e90ff",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontWeight: 700,
                marginTop: "20px",
                cursor: "pointer",
              }}
            >
              Proceed to Payment
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "14px",
                color: "#98a0a8",
              }}
            >
              Fiat payments are processed instantly via secure gateway.
            </div>
          </>
        )}
      </div>

      {/* ─── Back Button ───────────────────────────── */}
      <button
        onClick={() => navigate("/home")}
        style={{
          display: "block",
          margin: "20px auto 0",
          background: "transparent",
          color: "#1e90ff",
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default Deposit;
