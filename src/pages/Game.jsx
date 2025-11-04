// src/pages/QuizBattle.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

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

export default function Game() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Room validation
  useEffect(() => {
    if (!id || isNaN(id) || id < 1 || id > 5) {
      toast.error("Invalid room. Redirecting to home...");
      setTimeout(() => navigate("/home"), 2000);
    }
  }, [id, navigate]);

  // Game states
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [transitioning, setTransitioning] = useState(false);
  const [selected, setSelected] = useState(null);
  const [playersRemaining, setPlayersRemaining] = useState(100);
  const [showWin, setShowWin] = useState(false);
  const [showLose, setShowLose] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const COUNT = Math.max(30, Math.floor((W * H) / 120000));
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.6 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.2) * 0.5,
        alpha: 0.06 + Math.random() * 0.18,
        hue: 195 + Math.random() * 45,
      });
    }
    particlesRef.current = particles;

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let raf = null;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -50) p.x = W + 50;
        if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50;
        if (p.y > H + 50) p.y = -50;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          toast.success(`🏆 Room ${id}: You won!`);
        } else {
          setQIndex(next);
        }
      }, 900);
    } else {
      setTimeout(() => {
        setTransitioning(false);
        setSelected(null);
        setDisabled(true);
        setShowLose(true); // lose screen
        toast.error(`❌ Room ${id}: You were eliminated`);
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
      toast.warning("⏰ Time's up!");
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

  const current = QUESTIONS[qIndex];
  const fillPercent = Math.max(0, Math.min(100, (timeLeft / 10) * 100));

  return (
    <div className="relative min-h-screen bg-black text-white antialiased overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none w-full h-full" />

      {showWin && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />}

      <main className="relative z-20 flex flex-col items-center justify-center p-6 sm:p-10">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00b0ff]">⚔️ Room {id} Battle Arena</h1>
          <p className="text-gray-400 text-sm mt-1">Answer fast. Stay alive. Win big.</p>
          <div className="mt-2 font-extrabold text-accent-2 text-lg text-white">
            Players remaining: {playersRemaining}
          </div>
        </div>

        {/* Quiz */}
        {!showWin && !showLose && (
          <div className="w-full max-w-3xl bg-linear-to-b from-white/5 to-white/3 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/6">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white text-center px-4">
              {current?.q ?? "Loading question..."}
            </h2>
            <p className="text-center mt-3 font-bold text-[#00b0ff]">$1 ⇒ $80</p>

            {/* Timer */}
            <div className="mt-6 w-full">
              <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                <div className="font-bold">Time remaining:</div>
                <div className="font-mono font-bold">{Math.max(0, timeLeft)}s</div>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5">
                <div
                  className="h-full bg-linear-to-r from-[#00b0ff] to-[#1e90ff] shadow-md transition-all"
                  style={{ width: `${fillPercent}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Answers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {current.opts.map((opt, i) => {
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
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={disabled || transitioning}
                    className={`${base} ${extra}`}
                  >
                    <div className="min-w-12 min-h-12 rounded-lg flex items-center justify-center font-black text-xl text-[#00b0ff] bg-[#0a2233]/40">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="flex-1">{opt}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Win */}
        {showWin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <img
              src="https://i.supaimg.com/34cac011-0641-4f3c-af1b-58912ee3f561.png"
              alt="winner"
              className="w-64 max-w-full drop-shadow-2xl mx-auto"
            />
            <div className="mt-4 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#00b0ff] via-[#1e90ff] to-[#16a34a]">
              You just won $80!
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={() => navigate("/home")} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
                Home
              </button>
              <button onClick={handleRestart} className="px-4 py-2 rounded-lg bg-[#00b0ff] hover:bg-[#00a6e6]">
                Play Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Lose */}
        {showLose && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.6 }}
            className="mt-8 text-center"
          >
            <img
              src="https://i.supaimg.com/2d2c0111-1234-4f3c-af1b-58912ee3f561.png"
              alt="lost"
              className="w-64 max-w-full drop-shadow-2xl mx-auto"
            />
            <div className="mt-4 text-3xl font-extrabold text-red-500">
              You were eliminated!
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={() => navigate("/home")} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
                Home
              </button>
              <button onClick={handleRestart} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600">
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <style>{`:root{--accent-2: #00b0ff;}`}</style>
    </div>
  );
}
