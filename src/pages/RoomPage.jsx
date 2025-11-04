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
  const { id } = useParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleGameComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  let CurrentGame;
  switch (id) {
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
      className="min-h-[70vh] flex flex-col items-center justify-center bg-linear-to-br from-blue-900 to-blue-900 text-white p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showConfetti && <Confetti />}

      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-4 md:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Room {id}
      </motion.h1>

      {CurrentGame ? (
        <motion.div
          className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-5 md:p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CurrentGame onComplete={handleGameComplete} />
        </motion.div>
      ) : (
        <motion.div
          className="flex items-center justify-center h-48 text-xl font-semibold text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Invalid Room 😅
        </motion.div>
      )}

      {completed && (
        <motion.div
          className="mt-6 text-lg md:text-xl text-green-400 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🎉 You’ve completed Room {id}!
        </motion.div>
      )}
    </motion.div>
  );
};

export default RoomPage;
