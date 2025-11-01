import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState("btc");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const walletMap = {
    btc: "bc1qtqxn50ehhg2cyrhfay9k4tkurnn5xlrk5whfrn",
    eth: "0xbD186916f21ce37375f049DE6F0cAb0124E7ddB6",
    usdt: "TFPkvU8eAUBPpskvA9V8xJJihGJ4efRWUQ",
    ltc: "ltc1qkkcdwqtjae6enuw25nvywfr83zjw62n48f2dp4",
  };

  const generateDeposit = () => {
    const address = walletMap[crypto];
    setWalletAddress(address);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?data=${address}&size=150x150`);
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
      {/* ─── Header ───────────────────────────── */}
      <header style={{ textAlign: "center", marginBottom: "24px" }}>
        <img
          src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
          alt="Logo"
          style={{ height: "60px", marginBottom: "8px" }}
        />
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
          onClick={generateDeposit}
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

        {/* ─── QR Section ───────────────────────────── */}
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
