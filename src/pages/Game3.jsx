// src/pages/QuizBattleAnimated.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import "react-toastify/dist/ReactToastify.css";

const QUESTIONS_BY_ROOM = {
  1: [
    { q: "What is the largest planet in our solar system?", opts: ["Earth", "Jupiter", "Saturn", "Neptune"], a: 1 },
    { q: "Who wrote 'Romeo and Juliet'?", opts: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], a: 2 },
    { q: "Chemical symbol for gold?", opts: ["Au", "Ag", "Gd", "Go"], a: 0 },
    { q: "Capital of Canada?", opts: ["Toronto", "Vancouver", "Ottawa", "Montreal"], a: 2 },
    { q: "Which organ purifies blood?", opts: ["Heart", "Liver", "Kidneys", "Lungs"], a: 2 },
  ],
  2: [
    { q: "What year did the first iPhone launch?", opts: ["2005", "2007", "2009", "2010"], a: 1 },
    { q: "Largest ocean on Earth?", opts: ["Atlantic", "Pacific", "Indian", "Arctic"], a: 1 },
    { q: "Capital city of Australia?", opts: ["Sydney", "Melbourne", "Canberra", "Perth"], a: 2 },
    { q: "Who discovered penicillin?", opts: ["Alexander Fleming","Marie Curie","Louis Pasteur","Isaac Newton"], a: 0 },
    { q: "Boiling point of water (°C)?", opts: ["90","95","100","110"], a: 2 },
  ],
  3: [
    { q: "Which planet has rings?", opts: ["Mars", "Jupiter", "Saturn", "Uranus"], a: 2 },
    { q: "Smallest prime number?", opts: ["0","1","2","3"], a: 2 },
    { q: "Currency of Japan?", opts: ["Yen","Won","Ringgit","Dollar"], a: 0 },
    { q: "Which language has most native speakers?", opts: ["English","Mandarin","Spanish","Hindi"], a: 1 },
    { q: "What is H2O commonly known as?", opts: ["Salt","Oxygen","Water","Hydrogen"], a: 2 },
  ],
  4: [
    { q: "Which country invented paper?", opts: ["Greece","China","Egypt","India"], a: 1 },
    { q: "Hardest natural substance?", opts: ["Gold","Iron","Diamond","Steel"], a: 2 },
    { q: "Largest mammal?", opts: ["Elephant","Blue Whale","Giraffe","Hippo"], a: 1 },
    { q: "Who discovered gravity?", opts: ["Albert Einstein","Isaac Newton","Galileo","Kepler"], a: 1 },
    { q: "How many colors in a rainbow?", opts: ["5","6","7","8"], a: 2 },
  ],
  5: [
    { q: "Which metal is liquid at room temperature?", opts: ["Mercury","Iron","Silver","Aluminum"], a: 0 },
    { q: "Which continent has the Sahara Desert?", opts: ["Asia","Africa","Australia","Europe"], a: 1 },
    { q: "What is the freezing point of water (°C)?", opts: ["0","32","-10","100"], a: 0 },
    { q: "Which planet is known as the Red Planet?", opts: ["Venus","Mars","Jupiter","Mercury"], a: 1 },
    { q: "Smallest country by area?", opts: ["Monaco","Nauru","Vatican City","San Marino"], a: 2 },
  ],
};

export default function Game3() {
  const { roomId } = useParams(); // ✅ updated param name
  const navigate = useNavigate();
  const id = Number(roomId); // convert to number

  // Room validation
  useEffect(() => {
    if (!roomId || isNaN(id) || id < 1 || id > 5) {
      toast.error("Invalid room. Redirecting to home...");
      setTimeout(() => navigate("/home"), 2000);
    }
  }, [id, roomId, navigate]);

  const QUESTIONS = QUESTIONS_BY_ROOM[id] ?? QUESTIONS_BY_ROOM[1];

  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState(null);
  const [playersRemaining, setPlayersRemaining] = useState(100);
  const [showWin, setShowWin] = useState(false);
  const [eliminated, setEliminated] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const timerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (showWin || eliminated) return;
    setTimeLeft(10);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [qIndex, showWin, eliminated]);

  // Handle time out
  useEffect(() => {
    if (timeLeft <= 0 && !showWin && !eliminated) {
      setDisabled(true);
      setEliminated(true);
      toast.warning("⏰ Time's up!");
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
          toast.success(`🏆 Room ${id}: You won!`);
        } else {
          setQIndex(next);
        }
      }, 900);
    } else {
      setTimeout(() => {
        setEliminated(true);
        toast.error(`❌ Room ${id}: You were eliminated`);
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

  const fillPercent = Math.max(0, Math.min(100, (timeLeft / 10) * 100));
  const current = QUESTIONS[qIndex] ?? {};

  return (
    <div className="relative min-h-screen bg-[#031025] text-white flex flex-col justify-center items-center overflow-hidden p-6">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      {showWin && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <motion.div
        className="relative z-10 w-full max-w-md bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col items-center mb-4">
          <img src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png" alt="Logo" className="h-16 rounded-lg drop-shadow-lg" />
          <div className="mt-2 font-extrabold text-[#00b0ff] text-center">
            ⚔️ Room {id} — Battle Arena
            <span className="ml-3 text-white font-normal">Players remaining: {playersRemaining}</span>
          </div>
        </div>

        {/* Questions */}
        {!showWin && !eliminated && (
          <AnimatePresence mode="wait">
            <motion.div
              key={qIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{current?.q}</h2>
              <div className="mb-4 w-full">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span className="font-bold">Time left:</span>
                  <span className="font-mono font-bold">{timeLeft}s</span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-linear-to-r from-[#00b0ff] to-[#1e90ff] transition-all" style={{ width: `${fillPercent}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {(current?.opts || []).map((opt, i) => {
                  const isCorrect = i === current.a;
                  const isSelected = selected === i;
                  let base = "flex items-center gap-4 p-4 rounded-lg text-left font-extrabold text-lg transition-transform shadow";
                  let extra = "bg-white/5 border border-white/6 hover:-translate-y-1";
                  if (disabled) {
                    if (isCorrect) extra = "bg-green-500/80 text-[#04260b]";
                    else if (isSelected && !isCorrect) extra = "bg-red-500/80 text-[#3b0707]";
                    else extra = "bg-white/3 text-gray-200";
                  } else if (isSelected) extra = "ring-2 ring-[#1e90ff]/60";

                  return (
                    <button key={i} className={`${base} ${extra}`} onClick={() => handleAnswer(i)} disabled={disabled}>
                      <div className="min-w-12 min-h-12 rounded-lg flex items-center justify-center font-black text-xl text-[#00b0ff] bg-[#0a2233]/40">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <div className="flex-1">{opt}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Win */}
        {showWin && (
          <div className="mt-8 text-center">
            <img src="https://i.supaimg.com/34cac011-0641-4f3c-af1b-58912ee3f561.png" alt="winner" className="w-64 max-w-full drop-shadow-2xl mx-auto" />
            <div className="mt-4 text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00b0ff] via-[#1e90ff] to-[#16a34a]">
              You just won!
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={() => navigate("/home")} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Home</button>
              <button onClick={handleRestart} className="px-4 py-2 rounded-lg bg-[#00b0ff] hover:bg-[#00a6e6]">Play Again</button>
            </div>
          </div>
        )}

        {/* Eliminated */}
        {eliminated && !showWin && (
          <div className="mt-8 text-center">
            <div className="text-2xl font-extrabold text-red-400">You were eliminated</div>
            <div className="mt-3 text-gray-300">Better luck next time.</div>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={() => navigate("/home")} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Home</button>
              <button onClick={handleRestart} className="px-4 py-2 rounded-lg bg-[#00b0ff] hover:bg-[#00a6e6]">Try Again</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
