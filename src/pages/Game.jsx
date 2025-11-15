import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Trophy, 
  X, 
  Home, 
  RotateCcw, 
  Users, 
  Clock, 
  Zap,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";

const QUESTIONS = [
  { q: "What is the capital city of France?", opts: ["Rome", "Madrid", "Paris", "Berlin"], a: 2 },
  { q: "Which planet is known as the Red Planet?", opts: ["Venus", "Mars", "Jupiter", "Mercury"], a: 1 },
  { q: "How many continents are there on Earth?", opts: ["5", "6", "7", "8"], a: 2 },
  { q: "What gas do plants absorb during photosynthesis?", opts: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], a: 1 },
  { q: "Who painted the Mona Lisa?", opts: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], a: 1 },
  { q: "Which ocean is the largest?", opts: ["Atlantic", "Indian", "Arctic", "Pacific"], a: 3 },
  { q: "What is the smallest prime number?", opts: ["0", "1", "2", "3"], a: 2 },
  { q: "Which country invented paper?", opts: ["Greece", "China", "Egypt", "India"], a: 1 },
  { q: "What is H2O commonly known as?", opts: ["Salt", "Oxygen", "Water", "Hydrogen"], a: 2 },
  { q: "How many colors are there in a rainbow?", opts: ["5", "6", "7", "8"], a: 2 },
  { q: "What is the largest mammal?", opts: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], a: 1 },
  { q: "Which metal is liquid at room temperature?", opts: ["Mercury", "Iron", "Silver", "Aluminum"], a: 0 },
  { q: "Who discovered gravity?", opts: ["Albert Einstein", "Isaac Newton", "Galileo", "Kepler"], a: 1 },
  { q: "Which continent is the Sahara Desert located in?", opts: ["Asia", "Africa", "Australia", "Europe"], a: 1 },
  { q: "Which is the hardest natural substance?", opts: ["Gold", "Iron", "Diamond", "Steel"], a: 2 },
];

// Enhanced Confetti Component
const EnhancedConfetti = () => {
  const confettiPieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'][Math.floor(Math.random() * 6)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            backgroundColor: piece.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: 360 * 3,
            x: [0, (Math.random() - 0.5) * 200]
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Custom Toast Alert Component
const CustomToast = ({ type, message, onClose }) => {
  const config = {
    success: {
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-100"
    },
    error: {
      icon: XCircle,
      gradient: "from-red-500 to-rose-500",
      iconColor: "text-red-100"
    },
    warning: {
      icon: AlertCircle,
      gradient: "from-amber-500 to-orange-500",
      iconColor: "text-amber-100"
    },
    info: {
      icon: Zap,
      gradient: "from-blue-500 to-indigo-500",
      iconColor: "text-blue-100"
    }
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
        transition={{ duration: 3, ease: "linear" }}
      />
    </motion.div>
  );
};

export default function Game() {
  const navigate = useNavigate();
  const [roomId] = useState("1"); // Demo room
  const id = Number(roomId);

  // Game states
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [transitioning, setTransitioning] = useState(false);
  const [selected, setSelected] = useState(null);
  const [playersRemaining, setPlayersRemaining] = useState(100);
  const [showWin, setShowWin] = useState(false);
  const [showLose, setShowLose] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [toasts, setToasts] = useState([]);

  const timerRef = useRef(null);

  const showToast = (type, message) => {
    const newToast = { id: Date.now(), type, message };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3000);
  };

  // Timer
  useEffect(() => {
    if (showWin || showLose) return;
    setTimeLeft(10);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) clearInterval(timerRef.current);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIndex, showWin, showLose]);

  useEffect(() => {
    if (timeLeft <= 0 && !transitioning && !showWin && !showLose) handleTimeout();
  }, [timeLeft]);

  const updatePlayersRemaining = (nextIndex) => {
    if (nextIndex > 0 && nextIndex < QUESTIONS.length - 1) {
      const targetPlayers = Math.max(2, Math.floor(100 - ((nextIndex / (QUESTIONS.length - 1)) * 98)));
      const decreaseBy = Math.max(1, playersRemaining - targetPlayers);
      const randomDrop = Math.max(1, Math.floor(Math.random() * decreaseBy));
      setPlayersRemaining((p) => Math.max(1, p - randomDrop));
    } else if (nextIndex === QUESTIONS.length - 1) {
      setPlayersRemaining(1);
    }
  };

  const disableAnswers = (state) => setDisabled(state);

  const handleAnswer = (idx) => {
    if (transitioning || disabled) return;
    setTransitioning(true);
    setSelected(idx);
    clearInterval(timerRef.current);
    disableAnswers(true);

    const correct = QUESTIONS[qIndex].a;

    if (idx === correct) {
      setTimeout(() => {
        const next = qIndex + 1;
        updatePlayersRemaining(next);
        setSelected(null);
        setTransitioning(false);
        disableAnswers(false);
        if (next >= QUESTIONS.length) {
          setShowWin(true);
          showToast("success", `🏆 Room ${id}: You won!`);
        } else {
          setQIndex(next);
        }
      }, 900);
    } else {
      setTimeout(() => {
        setTransitioning(false);
        setSelected(null);
        setDisabled(true);
        setShowLose(true);
        showToast("error", `❌ Room ${id}: You were eliminated`);
      }, 900);
    }
  };

  const handleTimeout = () => {
    if (transitioning) return;
    setTransitioning(true);
    disableAnswers(true);
    setTimeout(() => {
      setTransitioning(false);
      setDisabled(true);
      setShowLose(true);
      showToast("warning", "⏰ Time's up!");
    }, 900);
  };

  const handleRestart = () => {
    setQIndex(0);
    setPlayersRemaining(100);
    setShowWin(false);
    setShowLose(false);
    setDisabled(false);
    setSelected(null);
    setTransitioning(false);
    setTimeLeft(10);
  };

  const handleGoHome = () => {
    showToast("info", "Returning to home...");
    navigate("/");
  };

  const current = QUESTIONS[qIndex];
  const fillPercent = Math.max(0, Math.min(100, (timeLeft / 10) * 100));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white antialiased overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.map(toast => (
          <CustomToast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {showWin && <EnhancedConfetti />}
      </AnimatePresence>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 sm:p-10">
        {/* Header Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-full shadow-lg border border-white/20">
              <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
                <Zap size={28} />
                Room {id} Battle Arena
              </h1>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm mb-4"
          >
            Answer fast. Stay alive. Win big.
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10"
          >
            <Users className="text-blue-400" size={20} />
            <span className="font-bold text-lg">
              Players remaining: <span className="text-blue-400">{playersRemaining}</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Game Question Card */}
        {!showWin && !showLose && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="w-full max-w-4xl"
          >
          <div className="bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 p-8 rounded-3xl shadow-2xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">{current.q}</h2>
              <div className="w-24 h-6 bg-white/10 rounded-full overflow-hidden border border-white/20">
                <motion.div
                  style={{ width: `${fillPercent}%` }}
                  className="h-6 bg-gradient-to-r from-cyan-400 to-blue-500"
                  transition={{ duration: 0.5, ease: "linear" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.opts.map((opt, idx) => {
                const isCorrect = idx === current.a;
                const isSelected = idx === selected;
                let bgColor = "bg-white/5 hover:bg-white/10";
                if (disabled) {
                  if (isCorrect) bgColor = "bg-emerald-600/40";
                  else if (isSelected) bgColor = "bg-rose-600/40";
                } else if (isSelected) {
                  bgColor = "bg-blue-500/40 hover:bg-blue-500/50";
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={disabled}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`p-4 rounded-2xl text-left font-semibold transition-colors duration-300 ${bgColor}`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
        )}

        {/* Win Screen */}
        {showWin && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex flex-col items-center gap-6 p-8 bg-gradient-to-tr from-emerald-700 to-emerald-500 rounded-3xl shadow-2xl border border-white/20 max-w-lg"
          >
            <Trophy size={48} className="text-yellow-400 animate-bounce" />
            <h2 className="text-2xl font-bold">Congratulations!</h2>
            <p className="text-white/90 text-center">You won Room {id} Battle Arena </p>
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold cursor-pointer"
              >
                Play Again
              </button>
              <button
                onClick={handleGoHome}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold cursor-pointer"
              >
                Home
              </button>
            </div>
          </motion.div>
        )}

        {/* Lose Screen */}
        {showLose && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex flex-col items-center gap-6 p-8 bg-gradient-to-tr from-rose-700 to-rose-500 rounded-3xl shadow-2xl border border-white/20 max-w-lg"
          >
            <XCircle size={48} className="text-red-400 animate-pulse" />
            <h2 className="text-2xl font-bold">You were eliminated!</h2>
            <p className="text-white/90 text-center">Better luck next time in Room {id}</p>
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={handleGoHome}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold cursor-pointer"
              >
                Home
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
