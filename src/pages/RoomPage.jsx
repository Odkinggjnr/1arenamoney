import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

import Game from "./Game";
import Game2 from "./Game2";
import Game3 from "./Game3";
import Game4 from "./Game4";
import Game5 from "./Game5";

const RoomPage = () => {
  const { roomId } = useParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleGameComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  let CurrentGame;
  switch (roomId) {
    case "1":
      CurrentGame = Game;
      break;
    case "2":
      CurrentGame = Game2;
      break;
    case "3":
      CurrentGame = Game3;
      break;
    case "4":
      CurrentGame = Game4;
      break;
    case "5":
      CurrentGame = Game5;
      break;
    default:
      CurrentGame = null;
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}

      {/* Room Header */}
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Room {roomId} Battle
      </motion.h1>

      {/* Game Container */}
      {CurrentGame ? (
        <motion.div
          className="w-full max-w-4xl bg-gradient-to-tl from-gray-900/90 via-blue-950/80 to-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CurrentGame onComplete={handleGameComplete} />
        </motion.div>
      ) : (
        <motion.div
          className="flex items-center justify-center h-48 text-xl sm:text-2xl font-semibold text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Invalid Room
        </motion.div>
      )}

      {/* Completion Message */}
      {completed && (
        <motion.div
          className="mt-8 text-lg sm:text-xl font-bold text-emerald-400 bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500 px-6 py-3 rounded-2xl shadow-lg border border-white/20 text-center animate-pulse"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
         You’ve completed Room {roomId}!
        </motion.div>
      )}
    </motion.div>
  );
};

export default RoomPage;
