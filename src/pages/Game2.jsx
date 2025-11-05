import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const questions = [
  { q: "What is the largest planet in our solar system?", opts: ["Earth", "Jupiter", "Saturn", "Neptune"], a: 1 },
  { q: "Who wrote 'Romeo and Juliet'?", opts: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], a: 2 },
  { q: "What is the chemical symbol for gold?", opts: ["Au", "Ag", "Gd", "Go"], a: 0 },
  { q: "Which country is known as the Land of the Rising Sun?", opts: ["China", "South Korea", "Japan", "Thailand"], a: 2 },
  { q: "How many degrees are in a right angle?", opts: ["90", "180", "45", "60"], a: 0 },
];

const Game2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

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

  // 🎨 Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: Math.max(30, Math.floor((W * H) / 120000)) }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.6 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.2) * 0.5,
      alpha: 0.06 + Math.random() * 0.18,
      hue: 195 + Math.random() * 45,
    }));

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
        className="relative z-10 w-[90%] max-w-[720px] bg-white/5 border border-white/10 p-6 rounded-2xl text-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Logo & Room Banner */}
        <div className="flex flex-col items-center mb-4">
          <img
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            className="h-16 rounded-lg drop-shadow-lg"
          />
          <div className="mt-2 font-extrabold text-[#00b0ff] text-center">
            ⚔️ Room {id} — Battle Arena
            <span className="ml-3 text-white font-normal">Players remaining: {players}</span>
          </div>
        </div>

        {/* Game Questions */}
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
                <div className="text-3xl font-extrabold mb-6">{current.q}</div>

                {/* Timer Bar */}
                <div className="mb-4">
                  <div className="text-gray-400 font-bold mb-1">Time remaining: {timeLeft}s</div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#00b0ff] to-[#1e90ff] transition-all duration-200"
                      style={{ width: `${(timeLeft / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Answer Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {current.opts.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 text-lg font-bold hover:scale-105 transition-transform ${
                        selected === null
                          ? "bg-white/5"
                          : i === current.a
                          ? "bg-green-500 text-white"
                          : selected === i
                          ? "bg-red-500 text-white"
                          : "bg-white/5 opacity-60"
                      }`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-[#00b0ff]/10 rounded-md font-bold text-[#00b0ff]">
                        {String.fromCharCode(65 + i)}
                      </div>
                      {opt}
                    </button>
                  ))}
                </div>

                <div className={`mt-4 font-bold ${feedbackType === "ok" ? "text-green-400" : "text-red-400"}`}>
                  {feedback}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* End Screens */}
        {(eliminated || finished) && (
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {finished ? (
              <>
                <img
                  src="https://i.supaimg.com/627b27e7-159b-45e4-8559-d325910ab65a.png"
                  alt="Winner"
                  className="w-48 max-w-full drop-shadow-2xl mx-auto"
                />
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00b0ff] via-[#1e90ff] to-[#16a34a]">
                  You just won $400!
                </div>
              </>
            ) : (
              <div className="text-red-400 font-bold text-lg">❌ Game Over</div>
            )}

            <div className="flex justify-center gap-4 mt-4">
              <button onClick={handleTryAgain} className="px-4 py-2 bg-green-500 rounded-lg font-bold">
                {finished ? "Play Again" : "Try Again"}
              </button>
              <button onClick={handleRestart} className="px-4 py-2 bg-linear-to-r from-[#1e90ff] to-[#00b0ff] rounded-lg font-bold">
                Home
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Game2;
