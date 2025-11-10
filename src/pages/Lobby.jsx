import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const roomData = {
  "1": { name: "$1 Room", max: "$80", img: "https://i.supaimg.com/5924cd9b-79ac-4469-996a-41b04b03778c.jpg", gameId: "1", prizes: ["$80", "$6", "$4"] },
  "2": { name: "$5 Room", max: "$400", img: "https://i.supaimg.com/335a2cb1-a511-40f1-90b4-418dd08f32dd.jpg", gameId: "2", prizes: ["$400", "$30", "$20"] },
  "3": { name: "$10 Room", max: "$800", img: "https://i.supaimg.com/c2276bf6-1b7f-47c4-8dc1-576921839bf8.jpg", gameId: "3", prizes: ["$800", "$60", "$40"] },
  "4": { name: "$15 Room", max: "$1200", img: "https://i.supaimg.com/2cc005e6-4985-4d8d-8015-55a33c0b6a8a.jpg", gameId: "4", prizes: ["$1,200", "$90", "$60"] },
  "5": { name: "$20 Room", max: "$1600", img: "https://i.supaimg.com/34cac5bd-11c1-4ac5-a358-41c3390874f3.jpg", gameId: "5", prizes: ["$1,600", "$120", "$80"] },
};

const Lobby = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const data = roomData[String(roomId)]; // ✅ Convert roomId to string

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-gray-900">
        <h2 className="text-2xl font-bold mb-4">Invalid Room</h2>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const handleStartGame = () => navigate(`/room/${data.gameId}`);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0f1115] text-white">
      <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full text-center font-bold text-xl bg-[#121216] py-4 border-b border-white/5 sticky top-0 z-50">
        🎮 Game Lobby
      </motion.header>

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.7 }} className="bg-[#16171b] rounded-2xl shadow-xl mt-10 w-[90%] max-w-md p-6 text-center">
        <motion.img src={data.img} alt="Room" className="rounded-xl w-full mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <p className="text-gray-400 mt-1 mb-4">Win up to {data.max}</p>

        <div className="bg-white/5 rounded-xl p-4 text-left mb-6">
          <h3 className="font-semibold text-lg mb-2">🏆 Rewards</h3>
          {["1st Place", "2nd Place", "3rd Place"].map((label, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b border-white/5 last:border-none">
              <span>{label}</span>
              <strong>{data.prizes[idx]}</strong>
            </div>
          ))}
        </div>

        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }} onClick={handleStartGame} className="bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-xl font-semibold text-lg transition">
          Start Game
        </motion.button>

        <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate("/home")} className="text-gray-400 text-sm mt-4 underline hover:text-gray-300 transition">
          ← Back to Rooms
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Lobby;
