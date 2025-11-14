import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { X, Trophy, Award, Medal, ArrowLeft, Sparkles } from "lucide-react";

const roomData = {
  "1": { name: "$1 Room", max: "$80", img: "https://i.supaimg.com/5924cd9b-79ac-4469-996a-41b04b03778c.jpg", gameId: "1", prizes: ["$80", "$6", "$4"], entryFee: "$1" },
  "2": { name: "$5 Room", max: "$400", img: "https://i.supaimg.com/335a2cb1-a511-40f1-90b4-418dd08f32dd.jpg", gameId: "2", prizes: ["$400", "$30", "$20"], entryFee: "$5" },
  "3": { name: "$10 Room", max: "$800", img: "https://i.supaimg.com/c2276bf6-1b7f-47c4-8dc1-576921839bf8.jpg", gameId: "3", prizes: ["$800", "$60", "$40"], entryFee: "$10" },
  "4": { name: "$15 Room", max: "$1200", img: "https://i.supaimg.com/2cc005e6-4985-4d8d-8015-55a33c0b6a8a.jpg", gameId: "4", prizes: ["$1,200", "$90", "$60"], entryFee: "$15" },
  "5": { name: "$20 Room", max: "$1600", img: "https://i.supaimg.com/34cac5bd-11c1-4ac5-a358-41c3390874f3.jpg", gameId: "5", prizes: ["$1,600", "$120", "$80"], entryFee: "$20" },
};

// Custom Alert Component
const Alert = ({ type = "info", title, message, onClose }) => {
  const variants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      x: 300,
      transition: { duration: 0.2 }
    }
  };

  const bgColors = {
    success: "bg-gradient-to-r from-emerald-500/90 to-teal-500/90",
    error: "bg-gradient-to-r from-red-500/90 to-rose-500/90",
    warning: "bg-gradient-to-r from-amber-500/90 to-orange-500/90",
    info: "bg-gradient-to-r from-blue-500/90 to-indigo-500/90"
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`fixed top-6 right-6 ${bgColors[type]} backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 max-w-md z-50`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-1">{title}</h4>
          <p className="text-sm text-white/90">{message}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-white/80 hover:text-white transition"
        >
          <X size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

const Lobby = () => {

  // FIXED — this is the correct version
  const { roomId } = useParams();

  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  // FIXED — now roomId works
  const data = roomData[String(roomId)];

  const showAlert = (type, title, message) => {
    setAlert({ type, title, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleStartGame = () => {
    showAlert("success", "Game Starting!", "Preparing your game room...");
    navigate(`/room/${data.gameId}`);
  };

  const handleGoBack = () => {
    showAlert("info", "Navigating Back", "Returning to room selection...");
    navigate("/home");
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Room Not Found</h2>
          <p className="text-gray-400 mb-6">This room doesn't exist</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-xl font-semibold shadow-lg"
          >
            Go Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const prizeIcons = [Trophy, Award, Medal];
  const prizeColors = ["text-yellow-400", "text-gray-300", "text-amber-600"];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden relative">

      {/* Alerts */}
      <AnimatePresence>
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full text-center font-bold text-2xl bg-black/40 backdrop-blur-xl py-6 border-b border-white/10 sticky top-0 z-40 shadow-lg"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block"
        >
          🎮
        </motion.div>
        <span className="ml-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Game Lobby
        </span>
      </motion.header>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
        className="relative mt-12 w-[90%] max-w-lg z-10"
      >

        {/* Card Container */}
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">

          {/* Image */}
          <div className="relative">
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              src={data.img}
              alt="Room"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full font-bold text-sm shadow-lg border border-white/20"
            >
              <Sparkles className="inline mr-1" size={16} />
              Live
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {data.name}
              </h2>
              <p className="text-gray-400 text-lg mb-2">
                Entry Fee: <span className="text-white font-semibold">{data.entryFee}</span>
              </p>
              <p className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text font-bold text-xl mb-6">
                Win up to {data.max}
              </p>
            </motion.div>

            {/* Rewards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/5"
            >
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-400" size={24} />
                Prize Pool
              </h3>
              
              {["1st Place", "2nd Place", "3rd Place"].map((label, idx) => {
                const Icon = prizeIcons[idx];
                return (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="flex items-center justify-between py-4 px-3 rounded-xl border-b border-white/5 last:border-none transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={prizeColors[idx]} size={20} />
                      <span className="font-medium">{label}</span>
                    </div>
                    <strong className="text-lg">{data.prizes[idx]}</strong>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Buttons */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartGame}
              className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-4 rounded-xl font-bold text-lg transition-all shadow-lg relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Start Game</span>
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoBack}
              className="w-full text-gray-400 hover:text-white mt-4 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 group"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
              Back to Rooms
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="h-20" />
    </div>
  );
};

export default Lobby;
