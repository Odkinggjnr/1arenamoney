import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Game2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("playing"); // playing | eliminated | won
  const [players, setPlayers] = useState(100);
  const [transitioning, setTransitioning] = useState(false);

  const questions = [
    { q: "What is the largest planet in our solar system?", opts: ["Earth", "Jupiter", "Saturn", "Neptune"], a: 1 },
    { q: "Who wrote 'Romeo and Juliet'?", opts: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], a: 2 },
    { q: "What is the chemical symbol for gold?", opts: ["Au", "Ag", "Gd", "Go"], a: 0 },
    { q: "Which country is known as the Land of the Rising Sun?", opts: ["China", "South Korea", "Japan", "Thailand"], a: 2 },
    { q: "How many degrees are in a right angle?", opts: ["90", "180", "45", "60"], a: 0 },
  ];

  // 🎨 Background Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🕒 Timer Logic
  useEffect(() => {
    if (status !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [qIndex, status]);

  const handleTimeout = () => {
    setFeedback("Time's up!");
    setStatus("eliminated");
  };

  const handleAnswer = (idx) => {
    if (transitioning || status !== "playing") return;
    setTransitioning(true);
    const correct = questions[qIndex].a;

    if (idx === correct) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        setTransitioning(false);
        if (qIndex < questions.length - 1) {
          setQIndex(qIndex + 1);
          setTimeLeft(10);
          setPlayers((prev) => Math.max(2, Math.floor(prev * 0.9)));
        } else {
          setStatus("won");
        }
      }, 1000);
    } else {
      setFeedback("❌ Wrong Answer!");
      setTimeout(() => setStatus("eliminated"), 800);
    }
  };

  const restartGame = () => navigate("/home");

  return (
    <div className="relative w-full min-h-screen bg-[#031025] text-white overflow-hidden flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-blue-500/5 mix-blend-screen -z-10"></div>

      {status === "playing" && (
        <motion.div
          className="w-full max-w-2xl p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-blue-400 mb-3">Room {id}</h1>
          <p className="text-sm text-blue-200 mb-4">Players remaining: {players}</p>
          <h2 className="text-3xl font-extrabold mb-6">{questions[qIndex].q}</h2>

          <div className="w-full bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-1000"
              style={{ width: `${(timeLeft / 10) * 100}%` }}
            />
          </div>
          <p className="text-gray-300 mb-6">Time left: {timeLeft}s</p>

          <div className="grid grid-cols-2 gap-4">
            {questions[qIndex].opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="p-4 bg-white/10 hover:bg-blue-500/30 rounded-xl font-bold transition duration-200"
              >
                {opt}
              </button>
            ))}
          </div>

          <p className="mt-5 text-lg font-semibold">{feedback}</p>
        </motion.div>
      )}

      {status === "eliminated" && (
        <motion.div
          className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-red-400 text-3xl font-bold mb-3">You were eliminated 💔</h2>
          <button
            onClick={restartGame}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold"
          >
            Return Home
          </button>
        </motion.div>
      )}

      {status === "won" && (
        <motion.div
          className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src="https://i.supaimg.com/627b27e7-159b-45e4-8559-d325910ab65a.png"
            alt="Winner"
            className="mx-auto w-60 drop-shadow-xl mb-6"
          />
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            You Won $400!
          </h2>
          <button
            onClick={restartGame}
            className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold"
          >
            Back Home
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Game2;
