import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {useNavigate} from "react-router-dom"; 
import { Trophy, Globe, MapPin, ArrowLeft, Crown, Medal, Award } from "lucide-react";

const Leadership = () => {
  const [activeTab, setActiveTab] = useState("global");

  const navigate = useNavigate();

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

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return null;
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
    if (rank === 2) return "bg-gradient-to-r from-slate-500/20 to-slate-400/20 border-slate-400/30";
    if (rank === 3) return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30";
    return "";
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Leadership Board
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm sm:text-base"
          >
            Top performers and their winnings
          </motion.p>
        </motion.header>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-3 mb-8"
        >
          <motion.button
            onClick={() => setActiveTab("global")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "global"
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Global</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("country")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "country"
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Your Country</span>
          </motion.button>
        </motion.div>

        {/* Leaderboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/50 overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[60px_1fr_120px] sm:grid-cols-[80px_1fr_140px] gap-4 px-4 sm:px-6 py-4 bg-slate-800/30 border-b border-slate-700/50">
            <div className="text-slate-400 text-xs sm:text-sm font-semibold">Rank</div>
            <div className="text-slate-400 text-xs sm:text-sm font-semibold">Player</div>
            <div className="text-slate-400 text-xs sm:text-sm font-semibold text-right">Winnings</div>
          </div>

          {/* Table Body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {currentData.map((item, i) => (
                <motion.div
                  key={`${activeTab}-${item.rank}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`grid grid-cols-[60px_1fr_120px] sm:grid-cols-[80px_1fr_140px] gap-4 px-4 sm:px-6 py-4 border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors ${
                    item.rank <= 3 ? getRankStyle(item.rank) + " border" : ""
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center gap-2 font-bold text-slate-200">
                    {getRankIcon(item.rank)}
                    <span className={item.rank <= 3 ? "text-lg" : ""}>{item.rank}</span>
                  </div>

                  {/* Player Name */}
                  <div className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {item.player.charAt(0)}
                      </div>
                      <span className="font-semibold text-sm sm:text-base truncate">{item.player}</span>
                    </div>
                  </div>

                  {/* Winnings */}
                  <div className="flex items-center justify-end">
                    <span
                      className={`font-bold ${
                        item.rank <= 3
                          ? "text-lg bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                          : "text-green-400"
                      }`}
                    >
                      {item.winnings}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleBack}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Leadership;
