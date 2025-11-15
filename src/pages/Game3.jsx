import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const QUESTIONS_BY_ROOM = {
  1: [
    { q: "What is the largest planet in our solar system?", opts: ["Earth", "Jupiter", "Saturn", "Neptune"], a: 1 },
    { q: "Who wrote 'Romeo and Juliet'?", opts: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], a: 2 },
    { q: "Chemical symbol for gold?", opts: ["Au", "Ag", "Gd", "Go"], a: 0 },
    { q: "Capital of Canada?", opts: ["Toronto", "Vancouver", "Ottawa", "Montreal"], a: 2 },
    { q: "Which organ purifies blood?", opts: ["Heart", "Liver", "Kidneys", "Lungs"], a: 2 }
  ],
  2: [
    { q: "What year did the first iPhone launch?", opts: ["2005", "2007", "2009", "2010"], a: 1 },
    { q: "Largest ocean on Earth?", opts: ["Atlantic", "Pacific", "Indian", "Arctic"], a: 1 },
    { q: "Capital city of Australia?", opts: ["Sydney", "Melbourne", "Canberra", "Perth"], a: 2 },
    { q: "Who discovered penicillin?", opts: ["Alexander Fleming","Marie Curie","Louis Pasteur","Isaac Newton"], a: 0 },
    { q: "Boiling point of water (°C)?", opts: ["90","95","100","110"], a: 2 }
  ],
  3: [
    { q: "Which planet has rings?", opts: ["Mars", "Jupiter", "Saturn", "Uranus"], a: 2 },
    { q: "Smallest prime number?", opts: ["0","1","2","3"], a: 2 },
    { q: "Currency of Japan?", opts: ["Yen","Won","Ringgit","Dollar"], a: 0 },
    { q: "Which language has most native speakers?", opts: ["English","Mandarin","Spanish","Hindi"], a: 1 },
    { q: "What is H2O commonly known as?", opts: ["Salt","Oxygen","Water","Hydrogen"], a: 2 }
  ],
  4: [
    { q: "Which country invented paper?", opts: ["Greece","China","Egypt","India"], a: 1 },
    { q: "Hardest natural substance?", opts: ["Gold","Iron","Diamond","Steel"], a: 2 },
    { q: "Largest mammal?", opts: ["Elephant","Blue Whale","Giraffe","Hippo"], a: 1 },
    { q: "Who discovered gravity?", opts: ["Albert Einstein","Isaac Newton","Galileo","Kepler"], a: 1 },
    { q: "How many colors in a rainbow?", opts: ["5","6","7","8"], a: 2 }
  ],
  5: [
    { q: "Which metal is liquid at room temperature?", opts: ["Mercury","Iron","Silver","Aluminum"], a: 0 },
    { q: "Which continent has the Sahara Desert?", opts: ["Asia","Africa","Australia","Europe"], a: 1 },
    { q: "What is the freezing point of water (°C)?", opts: ["0","32","-10","100"], a: 0 },
    { q: "Which planet is known as the Red Planet?", opts: ["Venus","Mars","Jupiter","Mercury"], a: 1 },
    { q: "Smallest country by area?", opts: ["Monaco","Nauru","Vatican City","San Marino"], a: 2 }
  ]
};

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
      {confettiPieces.map(piece => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            backgroundColor: piece.color
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: 360 * 3,
            x: [0, (Math.random() - 0.5) * 200]
          }}
          transition={{ duration: piece.duration, delay: piece.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};

// Custom Toast Alert Component
const CustomToast = ({ type, message, onClose }) => {
  const config = {
    success: { icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500", iconColor: "text-emerald-100" },
    error: { icon: XCircle, gradient: "from-red-500 to-rose-500", iconColor: "text-red-100" },
    warning: { icon: AlertCircle, gradient: "from-amber-500 to-orange-500", iconColor: "text-amber-100" },
    info: { icon: Trophy, gradient: "from-blue-500 to-cyan-500", iconColor: "text-blue-100" }
  };
  const { icon: Icon, gradient, iconColor } = config[type] || config.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`fixed top-6 right-6 z-50 bg-gradient-to-r ${gradient} backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 max-w-md`}
    >
      <div className="flex items-center gap-3">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
          <Icon className={iconColor} size={24} />
        </motion.div>
        <p className="flex-1 font-semibold">{message}</p>
        <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="text-white/80 hover:text-white">
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

export default function Game3() {
 const { roomId } = useParams(); 
  const id = Number(roomId);
  const navigate = useNavigate();
  const QUESTIONS = QUESTIONS_BY_ROOM[id] ?? QUESTIONS_BY_ROOM[1];
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState(null);
  const [playersRemaining, setPlayersRemaining] = useState(100);
  const [showWin, setShowWin] = useState(false);
  const [eliminated, setEliminated] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [toasts, setToasts] = useState([]);
  const timerRef = useRef(null);

  const showToast = (type, message) => {
    const newToast = { id: Date.now(), type, message };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== newToast.id)), 3000);
  };

  useEffect(() => {
    if (showWin || eliminated) return;
    setTimeLeft(10);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIndex, showWin, eliminated]);

  useEffect(() => {
    if (timeLeft <= 0 && !showWin && !eliminated && !disabled) {
      setDisabled(true);
      setEliminated(true);
      showToast('warning', "⏰ Time's up!");
    }
  }, [timeLeft, showWin, eliminated]);

  const updatePlayersRemaining = (nextIndex) => {
    if (nextIndex > 0 && nextIndex < QUESTIONS.length - 1) {
      const targetPlayers = Math.max(2, Math.floor(100 - ((nextIndex / (QUESTIONS.length - 1)) * 98)));
      const decreaseBy = Math.max(1, playersRemaining - targetPlayers);
      const randomDrop = Math.max(1, Math.floor(Math.random() * decreaseBy));
      setPlayersRemaining(p => Math.max(1, p - randomDrop));
    } else if (nextIndex === QUESTIONS.length - 1) {
      setPlayersRemaining(1);
    }
  };

  const handleAnswer = (idx) => {
    if (disabled) return;
    setSelected(idx);
    clearInterval(timerRef.current);
    setDisabled(true);

    const correct = QUESTIONS[qIndex].a;
    if (idx === correct) {
      setTimeout(() => {
        const next = qIndex + 1;
        updatePlayersRemaining(next);
        setSelected(null);
        setDisabled(false);

        if (next >= QUESTIONS.length) {
          setShowWin(true);
          setPlayersRemaining(1);
          showToast('success', `🏆 Room ${id}: You won!`);
        } else {
          setQIndex(next);
        }
      }, 900);
    } else {
      setTimeout(() => {
        setEliminated(true);
        showToast('error', `❌ Room ${id}: You were eliminated`);
      }, 900);
    }
  };

  const handleRestart = () => {
    setQIndex(0);
    setPlayersRemaining(100);
    setShowWin(false);
    setEliminated(false);
    setSelected(null);
    setDisabled(false);
    setTimeLeft(10);
  };

  const handleGoHome = () => {
    showToast('info', "Returning to home...");
    navigate("/");
  };

  const fillPercent = Math.max(0, Math.min(100, (timeLeft / 10) * 100));
  const current = QUESTIONS[qIndex] ?? {};

  const roomThemes = {
    1: { gradient: "from-blue-600 to-cyan-600", name: "$1 Room" },
    2: { gradient: "from-purple-600 to-pink-600", name: "$5 Room" },
    3: { gradient: "from-orange-600 to-red-600", name: "$10 Room" },
    4: { gradient: "from-green-600 to-emerald-600", name: "$15 Room" },
    5: { gradient: "from-indigo-600 to-purple-600", name: "$20 Room" }
  };
  const theme = roomThemes[id] || roomThemes[3];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 text-white antialiased overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.map(toast => (
          <CustomToast key={toast.id} type={toast.type} message={toast.message} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
        ))}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {showWin && <EnhancedConfetti />}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header Section */}
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 100 }} className="text-center mb-8">
          {/* Logo */}
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.2 }} className="mb-4">
            <img src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png" alt="Logo" className="h-16 sm:h-20 mx-auto rounded-lg drop-shadow-2xl" />
          </motion.div>

          {/* Room Badge */}
          <motion.div animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="inline-block mb-4">
            <div className={`bg-gradient-to-r ${theme.gradient} px-6 py-3 rounded-full shadow-lg border border-white/20`}>
              <h1 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
                <Zap size={24} /> Room {id} Battle Arena
              </h1>
            </div>
          </motion.div>

          {/* Players Remaining */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }} className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
            <Users className="text-orange-400" size={20} />
            <span className="font-bold text-lg">Players remaining: <span className="text-orange-400">{playersRemaining}</span></span>
          </motion.div>
        </motion.div>

        {/* Game Card */}
        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, delay: 0.2 }} className="w-full max-w-4xl">
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            {!showWin && !eliminated && (
              <>
                {/* Question Header */}
                <div className={`bg-gradient-to-r ${theme.gradient} p-6 sm:p-8 border-b border-white/10`}>
                  <AnimatePresence mode="wait">
                    <motion.div key={qIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">{current?.q}</h2>
                      <div className="flex items-center justify-center gap-2 text-white/90 font-bold">
                        <Trophy size={20} /> {theme.name}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Timer and Answers Section */}
                <div className="p-6 sm:p-8">
                  {/* Timer */}
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-gray-300 font-semibold">
                        <Clock size={20} className="text-orange-400" /> Time Left
                      </div>
                      <motion.div animate={{ scale: timeLeft <= 3 ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.5, repeat: timeLeft <= 3 ? Infinity : 0 }} className={`font-mono font-bold text-2xl ${timeLeft <= 3 ? 'text-red-400' : 'text-orange-400'}`}>
                        {Math.max(0, timeLeft)}s
                      </motion.div>
                    </div>

                    <div className="relative w-full bg-white/5 rounded-full h-4 overflow-hidden border border-white/10 shadow-inner">
                      <motion.div className={`h-full rounded-full shadow-lg ${timeLeft <= 3 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`} initial={{ width: "100%" }} animate={{ width: `${fillPercent}%` }} transition={{ duration: 0.3 }} />
                      {timeLeft <= 3 && <motion.div className="absolute inset-0 bg-white/20" animate={{ opacity: [0.3, 0, 0.3] }} transition={{ duration: 0.5, repeat: Infinity }} />}
                    </div>
                  </motion.div>

                  {/* Answer Options */}
                  <AnimatePresence mode="wait">
                    <motion.div key={qIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(current?.opts || []).map((opt, i) => {
                        const isCorrect = i === current.a;
                        const isSelected = selected === i;

                        let bgClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
                        let textClass = "text-white";

                        if (disabled) {
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
                          bgClass = "bg-orange-500/20 border-orange-400 ring-2 ring-orange-400/50";
                        }

                        return (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            whileHover={!disabled ? { scale: 1.02, y: -4 } : {}}
                            whileTap={!disabled ? { scale: 0.98 } : {}}
                            onClick={() => handleAnswer(i)}
                            disabled={disabled}
                            className={`flex items-center gap-4 p-5 rounded-2xl text-left font-bold text-lg transition-all shadow-lg border-2 ${bgClass} ${textClass} disabled:cursor-not-allowed`}
                          >
                            <div className="min-w-12 min-h-12 rounded-xl flex items-center justify-center font-black text-xl bg-white/10 backdrop-blur-sm">{String.fromCharCode(65 + i)}</div>
                            <div className="flex-1">{opt}</div>
                            {disabled && isCorrect && <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }}><CheckCircle2 size={24} /></motion.div>}
                            {disabled && isSelected && !isCorrect && <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }}><XCircle size={24} /></motion.div>}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* End Screens */}
            {(eliminated || showWin) && (
              <div className="p-8 sm:p-12">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", duration: 0.8 }} className="text-center">
                  {showWin ? (
                    <>
                      <motion.div animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}>
                        <img src="https://i.supaimg.com/34cac011-0641-4f3c-af1b-58912ee3f561.png" alt="Winner" className="w-64 sm:w-80 max-w-full drop-shadow-2xl mx-auto" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Sparkles className="text-yellow-400" size={32} />
                          <h3 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">You Won!</h3>
                          <Sparkles className="text-yellow-400" size={32} />
                        </div>
                        <p className="text-gray-400 text-lg">Congratulations, champion!</p>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}>
                        <XCircle size={100} className="mx-auto mb-6 text-red-500" />
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-red-500 mb-4">You Were Eliminated!</h3>
                      <p className="text-gray-400 text-lg">Better luck next time!</p>
                    </>
                  )}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 flex gap-4 justify-center flex-wrap">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleGoHome} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold border border-white/20 transition cursor-pointer shadow-lg">
                      <Home size={20} /> Home
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRestart} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition bg-gradient-to-r cursor-pointer ${theme.gradient} hover:opacity-90`}>
                      <RotateCcw size={20} /> {showWin ? 'Play Again' : 'Try Again'}
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
}
