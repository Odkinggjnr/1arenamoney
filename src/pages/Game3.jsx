// src/pages/QuizBattleAnimated.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

/**
 * QuizBattleAnimated.jsx
 * - New room component (use route /room/:id)
 * - Tailwind CSS based layout
 * - Canvas particle background
 * - Room-specific question sets
 * - Timer, feedback, elimination, win
 * - Toast notifications
 */

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
  const { id } = useParams(); // route param
  const navigate = useNavigate();

  // validate id
  const roomId = parseInt(id, 10);
  useEffect(() => {
    if (!roomId || isNaN(roomId) || roomId < 1 || roomId > 5) {
      toast.error("Invalid room — redirecting to home...");
      const t = setTimeout(() => navigate("/home"), 1600);
      return () => clearTimeout(t);
    }
  }, [roomId, navigate]);

  // game state
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [transitioning, setTransitioning] = useState(false);
  const [selected, setSelected] = useState(null);
  const [playersRemaining, setPlayersRemaining] = useState(100);
  const [showWin, setShowWin] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // timer ref
  const timerRef = useRef(null);

  // canvas refs
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Questions for this room
  const QUESTIONS = QUESTIONS_BY_ROOM[roomId] ?? QUESTIONS_BY_ROOM[1];

  // Initialize animated canvas
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
  }, [roomId]);

  // Timer logic (reset each question)
  useEffect(() => {
    if (showWin) return;
    setTimeLeft(10);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [qIndex, showWin]);

  // When time hits zero
  useEffect(() => {
    if (timeLeft <= 0 && !transitioning && !showWin) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // Simulate players remaining decrease across rounds
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
      // correct
      setTimeout(() => {
        const next = qIndex + 1;
        updatePlayersRemaining(next);
        setSelected(null);
        setTransitioning(false);
        disableAnswers(false);
        if (next >= QUESTIONS.length) {
          // win flow
          setShowWin(true);
          setPlayersRemaining(1);
          toast.success(`🏆 Room ${roomId}: You won!`);
        } else {
          setQIndex(next);
        }
      }, 900);
    } else {
      // wrong => eliminated
      setTimeout(() => {
        setTransitioning(false);
        setSelected(null);
        setDisabled(true);
        toast.error(`❌ Room ${roomId}: You were eliminated`);
      }, 900);
    }
  };

  const handleTimeout = () => {
    if (transitioning) return;
    setTransitioning(true);
    disableAnswers(true);
    const correct = QUESTIONS[qIndex].a;
    // show correct briefly then eliminate
    setTimeout(() => {
      setTransitioning(false);
      setDisabled(true);
      toast.warning("⏰ Time's up!");
    }, 900);
  };

  const handleRestart = () => {
    setQIndex(0);
    setPlayersRemaining(100);
    setShowWin(false);
    setDisabled(false);
    setSelected(null);
    setTransitioning(false);
    setTimeLeft(10);
  };

  const current = QUESTIONS[qIndex] ?? {};
  const fillPercent = Math.max(0, Math.min(100, (timeLeft / 10) * 100));

  return (
    <div className="relative min-h-screen bg-black text-white antialiased">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      {/* Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none w-full h-full" />

      {/* subtle overlay */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(40% 60% at 10% 10%, rgba(0,176,255,0.06), transparent 12%), radial-gradient(30% 40% at 90% 85%, rgba(30,144,255,0.04), transparent 12%)",
          mixBlendMode: "screen",
        }}
      />

      <main className="relative z-20 flex min-h-screen items-start justify-center p-6 sm:p-10">
        <div className="w-full max-w-3xl">
          <div className="bg-linear-to-b from-white/5 to-white/3 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/6">
            {/* header */}
            <div className="flex flex-col items-center mb-4">
              <img
                src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
                alt="Logo"
                className="h-16 rounded-lg drop-shadow-lg"
              />
              <div className="mt-2 font-extrabold text-[#00b0ff]">
                ⚔️ Room {roomId} — Battle Arena
                <span className="ml-3 text-white font-normal">Players remaining: {playersRemaining}</span>
              </div>
            </div>

            {/* active game */}
            {!showWin && (
              <>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white text-center px-4">
                  {current?.q ?? "Loading question..."}
                </h2>

                <p className="text-center mt-3 font-bold text-[#00b0ff]">Entry: {roomId*1} ⇒ Prize tier</p>

                {/* timer */}
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

                {/* answers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6" role="list">
                  {(current?.opts || []).map((opt, i) => {
                    const isCorrect = i === current.a;
                    const isSelected = selected === i;
                    let classes =
                      "flex items-center gap-4 p-4 rounded-lg text-left font-extrabold text-lg transition-transform shadow";
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
                        className={`${classes} ${extra}`}
                        aria-pressed={isSelected}
                        role="listitem"
                      >
                        <div className="min-w-12 min-h-12 rounded-lg flex items-center justify-center font-black text-xl text-[#00b0ff] bg-[#0a2233]/40">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <div className="flex-1">{opt}</div>
                      </button>
                    );
                  })}
                </div>

                {/* feedback */}
                <div className={`mt-4 text-center font-bold text-lg transition-all ${disabled ? "opacity-100" : "opacity-0"}`}>
                  {disabled && !showWin && selected !== null && (
                    <>
                      {selected === current.a ? (
                        <span className="text-green-400">You got it right!</span>
                      ) : (
                        <span className="text-red-400">Wrong answer — eliminated.</span>
                      )}
                    </>
                  )}
                </div>

                <div className="mt-6 text-center text-sm text-gray-400">Answer quickly — wrong answers eliminate you.</div>
              </>
            )}

            {/* win view */}
            {showWin && (
              <div className="mt-8 text-center">
                <img
                  src="https://i.supaimg.com/34cac011-0641-4f3c-af1b-58912ee3f561.png"
                  alt="winner"
                  className="w-64 max-w-full drop-shadow-2xl mx-auto"
                />
                <div className="mt-4 text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#00b0ff] via-[#1e90ff] to-[#16a34a]">
                  You just won!
                </div>
                <div className="mt-6 flex gap-3 justify-center">
                  <button onClick={() => navigate("/home")} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
                    Home
                  </button>
                  <button onClick={handleRestart} className="px-4 py-2 rounded-lg bg-[#00b0ff] hover:bg-[#00a6e6]">
                    Play Again
                  </button>
                </div>
              </div>
            )}

            {/* eliminated view */}
            {!showWin && disabled && selected !== QUESTIONS[qIndex].a && (
              <div className="mt-8 text-center">
                <div className="text-2xl font-extrabold text-red-400">You were eliminated</div>
                <div className="mt-3 text-gray-300">Better luck next time.</div>
                <div className="mt-6">
                  <button onClick={() => navigate("/home")} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 mr-3">
                    Home
                  </button>
                  <button onClick={handleRestart} className="px-4 py-2 rounded-lg bg-[#00b0ff] hover:bg-[#00a6e6]">
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="h-10" />
      <style>{`:root{ --accent-2: #00b0ff; }`}</style>
    </div>
  );
}
