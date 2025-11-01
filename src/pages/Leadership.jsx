import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Leadership = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("global");

  const globalLeaders = [
    { rank: 1, player: "Homelander", winnings: "$8,900" },
    { rank: 2, player: "Chika", winnings: "$7,200" },
    { rank: 3, player: "MaxPro", winnings: "$6,850" },
    { rank: 4, player: "Lightning", winnings: "$5,340" },
    { rank: 5, player: "LuckyMan", winnings: "$4,980" },
    { rank: 6, player: "CashFlow", winnings: "$4,670" },
    { rank: 7, player: "SpeedBet", winnings: "$4,220" },
    { rank: 8, player: "GoldenAce", winnings: "$3,880" },
    { rank: 9, player: "SpinMaster", winnings: "$3,640" },
    { rank: 10, player: "DarkHorse", winnings: "$3,400" },
    { rank: 11, player: "FastCoin", winnings: "$3,120" },
    { rank: 12, player: "CryptoKing", winnings: "$2,890" },
    { rank: 13, player: "LuckyQueen", winnings: "$2,670" },
    { rank: 14, player: "JetMan", winnings: "$2,530" },
    { rank: 15, player: "MrX", winnings: "$2,400" },
  ];

  const countryLeaders = [
    { rank: 1, player: "Homelander", winnings: "$2,300" },
    { rank: 2, player: "GoldBoy", winnings: "$1,850" },
    { rank: 3, player: "YoungAce", winnings: "$1,200" },
    { rank: 4, player: "MoneyFlex", winnings: "$980" },
    { rank: 5, player: "QuickBet", winnings: "$870" },
    { rank: 6, player: "SpeedCash", winnings: "$820" },
    { rank: 7, player: "LuckyStar", winnings: "$770" },
    { rank: 8, player: "CoinDrip", winnings: "$730" },
    { rank: 9, player: "BetBoss", winnings: "$690" },
    { rank: 10, player: "BigMove", winnings: "$650" },
    { rank: 11, player: "RichVibe", winnings: "$600" },
    { rank: 12, player: "DiamondBet", winnings: "$580" },
    { rank: 13, player: "FlexKing", winnings: "$540" },
    { rank: 14, player: "CashLink", winnings: "$510" },
    { rank: 15, player: "FireJet", winnings: "$490" },
  ];

  const currentData = activeTab === "global" ? globalLeaders : countryLeaders;

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
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
          alt="Money Rooms Logo"
          style={{ height: "50px", marginBottom: "10px" }}
        />
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          🏆 Leadership Board
        </h1>
      </header>

      {/* ─── Tabs ───────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={() => setActiveTab("global")}
          style={{
            background: activeTab === "global" ? "#1e90ff" : "#2a2a2f",
            border: "none",
            color: "white",
            padding: "8px 14px",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Global
        </button>
        <button
          onClick={() => setActiveTab("country")}
          style={{
            background: activeTab === "country" ? "#1e90ff" : "#2a2a2f",
            border: "none",
            color: "white",
            padding: "8px 14px",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Your Country
        </button>
      </div>

      {/* ─── Table ───────────────────────────── */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#121216",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "10px",
                textAlign: "left",
                color: "#98a0a8",
                fontWeight: 600,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              #
            </th>
            <th
              style={{
                padding: "10px",
                textAlign: "left",
                color: "#98a0a8",
                fontWeight: 600,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Player
            </th>
            <th
              style={{
                padding: "10px",
                textAlign: "left",
                color: "#98a0a8",
                fontWeight: 600,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Winnings
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, i) => (
            <tr
              key={item.rank}
              style={{
                background:
                  i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
              }}
            >
              <td style={{ padding: "10px", fontWeight: 700 }}>{item.rank}</td>
              <td style={{ padding: "10px" }}>{item.player}</td>
              <td style={{ padding: "10px" }}>{item.winnings}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ─── Back Button ───────────────────────────── */}
      <button
        onClick={() => navigate("/home")}
        style={{
          display: "block",
          margin: "20px auto 0",
          background: "#1e90ff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default Leadership;
