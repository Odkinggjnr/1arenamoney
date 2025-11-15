import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  XCircle,
  Sparkles
} from "lucide-react";

const questions = [
  { q: "What is the largest planet in our solar system?", opts: ["Earth", "Jupiter", "Saturn", "Neptune"], a: 1 },
  { q: "Who wrote 'Romeo and Juliet'?", opts: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], a: 2 },
  { q: "What is the chemical symbol for gold?", opts: ["Au", "Ag", "Gd", "Go"], a: 0 },
  { q: "Which country is known as the Land of the Rising Sun?", opts: ["China", "South Korea", "Japan", "Thailand"], a: 2 },
  { q: "How many degrees are in a right angle?", opts: ["90", "180", "45", "60"], a: 0 },
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

// Custom Feedback Toast
const FeedbackToast = ({ type, message, onClose }) => {
  const config = {
    correct: {
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-100"
    },
    wrong: {
      icon: XCircle,
      gradient: "from-red-500 to-rose-500",
      iconColor: "text-red-100"
    },
    timeout: {
      icon: AlertCircle,
      gradient: "from-amber-500 to-orange-500",
      iconColor: "text-amber-100"
    }
  };

  const { icon: Icon, gradient, iconColor } = config[type] || config.wrong;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r ${gradient} backdrop-blur-xl text-white px-8 py-5 rounded-2xl shadow-2xl border border-white/20 max-w-md`}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: type === 'correct' ? [0, 360] : [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.6 }}
        >
          <Icon className={iconColor} size={32} />
        </motion.div>
        <p className="flex-1 font-bold text-xl">{message}</p>
      </div>
    </motion.div>
  );
};

const Game2 = () => {
   const { roomId } = useParams(); 
  const id = Number(roomId);
  const navigate = useNavigate();

  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [players, setPlayers] = useState(100);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [eliminated, setEliminated] = useState(false);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);
  const [toasts, setToasts] = useState([]);

  // ⏱ Timer Logic
  useEffect(() => {
    if (finished || eliminated) return;
    setTimeLeft(10);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIndex, finished, eliminated]);

  const handleAnswer = (i) => {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    setSelected(i);
    const correct = questions[qIndex].a;

    if (i === correct) {
      setFeedback({ type: 'correct', message: '✅ Correct!' });
      setPlayers((prev) => Math.max(1, prev - Math.floor(Math.random() * 10 + 1)));
      setTimeout(() => {
        setFeedback(null);
        if (qIndex + 1 === questions.length) {
          setShowConfetti(true);
          setFinished(true);
        } else {
          setQIndex(qIndex + 1);
          setSelected(null);
        }
      }, 1000);
    } else {
      setFeedback({ type: 'wrong', message: '❌ Wrong Answer!' });
      setTimeout(() => {
        setFeedback(null);
        setEliminated(true);
      }, 1200);
    }
  };

          const showToast = (type, message) => {
    const newToast = { id: Date.now(), type, message };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3000);
  };


  const handleTimeout = () => {
    setFeedback({ type: 'timeout', message: '⏰ Time\'s Up!' });
    setTimeout(() => {
      setFeedback(null);
      setEliminated(true);
    }, 1000);
  };

  const handleTryAgain = () => {
    setQIndex(0);
    setPlayers(100);
    setTimeLeft(10);
    setSelected(null);
    setFeedback(null);
    setShowConfetti(false);
    setEliminated(false);
    setFinished(false);
  };

  const handleGoHome = () => {
    showToast("info", "Returning to home...");
    navigate("/");
  };

  const current = questions[qIndex];
  const fillPercent = Math.max(0, Math.min(100, (timeLeft / 10) * 100));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white antialiased overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedback && (
          <FeedbackToast
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback(null)}
          />
        )}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && <EnhancedConfetti />}
      </AnimatePresence>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center mb-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-4"
          >
            <img
              src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
              alt="Logo"
              className="h-16 sm:h-20 mx-auto rounded-lg drop-shadow-2xl"
            />
          </motion.div>

          {/* Room Badge */}
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full shadow-lg border border-white/20">
              <h1 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
                <Zap size={24} />
                Room {id} Battle Arena
              </h1>
            </div>
          </motion.div>

          {/* Players Remaining */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10"
          >
            <Users className="text-purple-400" size={20} />
            <span className="font-bold text-lg">
              Players remaining: <span className="text-purple-400">{players}</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Game Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            {!eliminated && !finished && (
              <>
                {/* Question Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 sm:p-8 border-b border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={qIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                        {current.q}
                      </h2>
                      <div className="flex items-center justify-center gap-2 text-white/90 font-bold">
                        <Trophy size={20} />
                        <span>$5 ⇒ $400</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Timer and Answers Section */}
                <div className="p-6 sm:p-8">
                  {/* Timer */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-gray-300 font-semibold">
                        <Clock size={20} className="text-purple-400" />
                        Time Remaining
                      </div>
                      <motion.div
                        animate={{ scale: timeLeft <= 3 ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: timeLeft <= 3 ? Infinity : 0 }}
                        className={`font-mono font-bold text-2xl ${timeLeft <= 3 ? 'text-red-400' : 'text-purple-400'}`}
                      >
                        {Math.max(0, timeLeft)}s
                      </motion.div>
                    </div>

                    <div className="relative w-full bg-white/5 rounded-full h-4 overflow-hidden border border-white/10 shadow-inner">
                      <motion.div
                        className={`h-full rounded-full shadow-lg ${
                          timeLeft <= 3
                            ? 'bg-gradient-to-r from-red-500 to-orange-500'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                        initial={{ width: "100%" }}
                        animate={{ width: `${fillPercent}%` }}
                        transition={{ duration: 0.3 }}
                      />
                      {timeLeft <= 3 && (
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{ opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Answer Options */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={qIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {current.opts.map((opt, i) => {
                        const isCorrect = i === current.a;
                        const isSelected = selected === i;

                        let bgClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
                        let textClass = "text-white";

                        if (selected !== null) {
                          if (isCorrect) {
                            bgClass = "bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-400";
                            textClass = "text-white";
                          } else if (isSelected && !isCorrect) {
                            bgClass = "bg-gradient-to-r from-red-500 to-rose-500 border-red-400";
                            textClass = "text-white";
                          } else {
                            bgClass = "bg-white/5 border-white/5";
                            textClass = "text-gray-500";
                          }
                        } else if (isSelected) {
                          bgClass = "bg-purple-500/20 border-purple-400 ring-2 ring-purple-400/50";
                        }

                        return (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            whileHover={selected === null ? { scale: 1.02, y: -4 } : {}}
                            whileTap={selected === null ? { scale: 0.98 } : {}}
                            onClick={() => handleAnswer(i)}
                            disabled={selected !== null}
                            className={`flex items-center gap-4 p-5 rounded-2xl text-left font-bold text-lg transition-all shadow-lg border-2 ${bgClass} ${textClass} disabled:cursor-not-allowed`}
                          >
                            <div className="min-w-12 min-h-12 rounded-xl flex items-center justify-center font-black text-xl bg-white/10 backdrop-blur-sm">
                              {String.fromCharCode(65 + i)}
                            </div>
                            <div className="flex-1">{opt}</div>
                            {selected !== null && isCorrect && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring" }}
                              >
                                <CheckCircle2 size={24} />
                              </motion.div>
                            )}
                            {selected !== null && isSelected && !isCorrect && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring" }}
                              >
                                <XCircle size={24} />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* End Screens */}
            {(eliminated || finished) && (
              <div className="p-8 sm:p-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="text-center"
                >
                  {finished ? (
                    <>
                      <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <img
                          src="https://i.supaimg.com/627b27e7-159b-45e4-8559-d325910ab65a.png"
                          alt="Winner"
                          className="w-64 sm:w-80 max-w-full drop-shadow-2xl mx-auto"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6"
                      >
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Sparkles className="text-yellow-400" size={32} />
                          <h3 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
                            You Won!
                          </h3>
                          <Sparkles className="text-yellow-400" size={32} />
                        </div>
                        <p className="text-2xl font-bold text-white mb-2">Prize: $400</p>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <XCircle size={100} className="mx-auto mb-6 text-red-500" />
                      </motion.div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-red-500 mb-4">
                        Game Over!
                      </h3>
                      <p className="text-gray-400 text-lg">You were eliminated. Try again!</p>
                    </>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex gap-4 justify-center flex-wrap"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGoHome}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold border border-white/20 transition cursor-pointer"
                    >
                      <Home size={20} />
                      Home
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTryAgain}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition ${
                        finished
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
                          : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 cursor-pointer'
                      }`}
                    >
                      <RotateCcw size={20} />
                      {finished ? 'Play Again' : 'Try Again'}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Game2;
