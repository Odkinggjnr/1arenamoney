import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

const Game5 = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get room ID from URL if needed
  const roomId = parseInt(id, 10) || 1;

  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [playersRemaining, setPlayersRemaining] = useState(100);
  const [showConfetti, setShowConfetti] = useState(false);
  const [eliminated, setEliminated] = useState(false);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef(null);
  const canvasRef = useRef(null);

  const questions = [
    { q: "What is the smallest planet in our solar system?", opts: ["Venus", "Mars", "Mercury", "Pluto"], a: 2 },
    { q: "Which ocean is the largest?", opts: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], a: 3 },
    { q: "Who painted the Mona Lisa?", opts: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], a: 2 },
    { q: "What is the hardest natural substance on Earth?", opts: ["Iron", "Diamond", "Granite", "Gold"], a: 1 },
    { q: "What is the capital of Japan?", opts: ["Seoul", "Beijing", "Tokyo", "Kyoto"], a: 2 },
  ];

  // Animated background
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
  }, []);

  // Timer
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
    if (eliminated || finished) return;
    const correct = questions[qIndex].a;
    clearInterval(timerRef.current);

    if (i === correct) {
      setFeedback("✅ Correct!");
      setFeedbackType("ok");
      setPlayersRemaining((p) => Math.max(2, p - Math.floor(Math.random() * 10)));

      setTimeout(() => {
        if (qIndex + 1 === questions.length) {
          setShowConfetti(true);
          setFinished(true);
        } else {
          setQIndex(qIndex + 1);
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

  const handleRestart = () => navigate("/home");

  const handleTryAgain = () => {
    setQIndex(0);
    setPlayersRemaining(100);
    setEliminated(false);
    setFinished(false);
    setFeedback("");
    setFeedbackType("");
    setTimeLeft(10);
  };

  const current = questions[qIndex];

  return (
    <div className="relative min-h-screen bg-[#031025] text-white flex flex-col justify-center items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {showConfetti && <Confetti />}

      <motion.div
        className="relative z-10 w-[90%] max-w-[720px] bg-white/5 border border-white/10 p-6 rounded-2xl text-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col items-center mb-4">
          <img src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png" alt="Logo" className="h-16 rounded-lg drop-shadow-lg" />
          <div className="mt-2 font-extrabold text-[#00b0ff] text-center">
            ⚔️ Room {roomId} — Battle Arena
            <span className="ml-3 text-white font-normal">Players remaining: {playersRemaining}</span>
          </div>
        </div>

        {!eliminated && !finished && (
          <>
            <div className="text-[#00b0ff] font-bold mb-2">
              Players remaining: {playersRemaining}
            </div>
            <div className="text-3xl font-extrabold mb-6">{current.q}</div>

            <div className="mb-4">
              <div className="text-gray-400 font-bold mb-1">
                Time remaining: {timeLeft}s
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-[#00b0ff] to-[#1e90ff] transition-all duration-200"
                  style={{ width: `${(timeLeft / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {current.opts.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-lg font-bold hover:scale-105 transition-transform"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#00b0ff]/10 rounded-md font-bold text-[#00b0ff]">
                    {String.fromCharCode(65 + i)}
                  </div>
                  {opt}
                </button>
              ))}
            </div>

            <div
              className={`mt-4 font-bold ${
                feedbackType === "ok" ? "text-green-400" : "text-red-400"
              }`}
            >
              {feedback}
            </div>
          </>
        )}

        {eliminated && !finished && (
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-red-500 mb-2">You were eliminated!</h2>
            <p className="text-gray-400 mb-4">Better luck next time!</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleTryAgain} className="px-4 py-2 bg-green-500 rounded-lg font-bold">
                Try Again
              </button>
              <button onClick={handleRestart} className="px-4 py-2 bg-linear-to-r from-[#1e90ff] to-[#00b0ff] rounded-lg font-bold">
                Home
              </button>
            </div>
          </motion.div>
        )}

        {finished && (
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src="https://i.supaimg.com/64ac9587-df05-43f8-b0e4-e662e2215e9b.png" alt="Winner Celebration" className="mx-auto w-56 mb-4" />
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00b0ff] to-[#16a34a]">
              You just won $1,600!
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={handleTryAgain} className="px-4 py-2 bg-green-500 rounded-lg font-bold">
                Play Again
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

export default Game5;
