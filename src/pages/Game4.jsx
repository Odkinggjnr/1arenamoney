import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

const questions = [
  { q: "What is the largest desert in the world?", opts: ["Sahara", "Antarctica", "Arabian", "Gobi"], a: 1 },
  { q: "Who wrote 'Romeo and Juliet'?", opts: ["William Wordsworth", "Charles Dickens", "William Shakespeare", "Jane Austen"], a: 2 },
  { q: "What is the main gas found in the air we breathe?", opts: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], a: 2 },
  { q: "Which planet is known as the Red Planet?", opts: ["Venus", "Mars", "Jupiter", "Mercury"], a: 1 },
  { q: "How many bones are there in the adult human body?", opts: ["206", "201", "208", "210"], a: 0 },
  { q: "Who is known as the father of computers?", opts: ["Charles Babbage", "Alan Turing", "Thomas Edison", "Bill Gates"], a: 0 },
  { q: "What is the largest mammal on Earth?", opts: ["African Elephant", "Blue Whale", "Giraffe", "Orca"], a: 1 },
  { q: "Which element has the chemical symbol 'O'?", opts: ["Osmium", "Oxygen", "Oxide", "Orion"], a: 1 },
  { q: "In which year did World War II end?", opts: ["1940", "1943", "1945", "1950"], a: 2 },
  { q: "What is the capital city of Canada?", opts: ["Toronto", "Ottawa", "Vancouver", "Montreal"], a: 1 },
];

const Game4 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const roomId = parseInt(id, 10) || 1;

  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [players, setPlayers] = useState(100);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [eliminated, setEliminated] = useState(false);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);

  // 🎨 Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles = [];
    const COUNT = Math.max(30, Math.floor((W * H) / 120000));

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

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -50) p.x = W + 50;
        if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50;
        if (p.y > H + 50) p.y = -50;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue},80%,60%,${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🕒 Timer
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
      setFeedback("✅ Correct!");
      setFeedbackType("ok");
      setPlayers((prev) => Math.max(1, prev - Math.floor(Math.random() * 10 + 1)));
      setTimeout(() => {
        if (qIndex + 1 === questions.length) {
          setShowConfetti(true);
          setFinished(true);
        } else {
          setQIndex(qIndex + 1);
          setSelected(null);
          setFeedback("");
        }
      }, 1000);
    } else {
      setFeedback("❌ Wrong Answer!");
      setFeedbackType("bad");
      setTimeout(() => setEliminated(true), 1200);
    }
  };

  const handleTimeout = () => {
    setFeedback("⏰ Time's Up!");
    setFeedbackType("bad");
    setTimeout(() => setEliminated(true), 1000);
  };

  const handleTryAgain = () => {
    setQIndex(0);
    setPlayers(100);
    setTimeLeft(10);
    setSelected(null);
    setFeedback("");
    setFeedbackType("");
    setShowConfetti(false);
    setEliminated(false);
    setFinished(false);
  };

  const handleRestart = () => navigate("/home");
  const current = questions[qIndex];

  return (
    <div className="relative min-h-screen bg-[#031025] text-white flex flex-col justify-center items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <motion.div
        className="relative z-10 w-[92%] sm:w-[85%] md:w-[700px] lg:w-[750px] bg-white/5 border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl text-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col items-center mb-4">
          <img
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            className="h-12 sm:h-14 md:h-16 rounded-lg drop-shadow-lg"
          />
          <div className="mt-2 text-sm sm:text-base font-extrabold text-[#00b0ff] text-center">
            ⚔️ Room {roomId} — Battle Arena
            <span className="ml-2 sm:ml-3 text-white font-normal block sm:inline">
              Players remaining: {players}
            </span>
          </div>
        </div>

        {/* Main Game Section */}
        {!eliminated && !finished && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
                  {current.q}
                </div>

                <div className="mb-4">
                  <div className="text-gray-400 font-bold mb-1 text-sm sm:text-base">
                    Time remaining: {timeLeft}s
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#00b0ff] to-[#1e90ff] transition-all duration-200"
                      style={{ width: `${(timeLeft / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {current.opts.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className={`flex items-center gap-3 px-3 py-3 sm:px-4 sm:py-4 rounded-xl border border-white/10 text-sm sm:text-base md:text-lg font-bold hover:scale-105 transition-transform ${
                        selected === null
                          ? "bg-white/5"
                          : i === current.a
                          ? "bg-green-500 text-white"
                          : selected === i
                          ? "bg-red-500 text-white"
                          : "bg-white/5 opacity-60"
                      }`}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#00b0ff]/10 rounded-md font-bold text-[#00b0ff]">
                        {String.fromCharCode(65 + i)}
                      </div>
                      {opt}
                    </button>
                  ))}
                </div>

                <div
                  className={`mt-4 font-bold text-sm sm:text-lg ${
                    feedbackType === "ok" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {feedback}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* Result Section */}
        {(eliminated || finished) && (
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {finished ? (
              <>
                <img
                  src="https://i.supaimg.com/34cac011-0641-4f3c-af1b-58912ee3f561.png"
                  alt="Winner"
                  className="w-36 sm:w-44 md:w-48 max-w-full drop-shadow-2xl mx-auto"
                />
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00b0ff] via-[#1e90ff] to-[#16a34a]">
                  You just won $1,200!
                </div>
              </>
            ) : (
              <div className="text-red-400 font-bold text-lg sm:text-xl">❌ Game Over</div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
              <button
                onClick={handleTryAgain}
                className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-lg font-bold"
              >
                {finished ? "Play Again" : "Try Again"}
              </button>
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-linear-to-r from-[#1e90ff] to-[#00b0ff] hover:opacity-90 rounded-lg font-bold"
              >
                Home
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Game4;
