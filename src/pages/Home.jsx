import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "Homelander",
    id: Math.floor(100000000 + Math.random() * 900000000),
    balance: 100,
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("moneyRoomsUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("moneyRoomsUser", JSON.stringify(user));
  }, [user]);

  const handleUsernameEdit = () => {
    const newName = prompt("Enter new username:", user.username);
    if (newName && newName.trim() !== "") {
      setUser({ ...user, username: newName.trim() });
      toast.success("Username updated successfully!");
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const rooms = [
    { id: 1, price: 1, win: 80, img: "https://i.supaimg.com/f19f4f97-1562-4714-8be3-1b1e4b1a3478.jpg" },
    { id: 2, price: 5, win: 400, img: "https://i.supaimg.com/335a2cb1-a511-40f1-90b4-418dd08f32dd.jpg" },
    { id: 3, price: 10, win: 800, img: "https://i.supaimg.com/c2276bf6-1b7f-47c4-8dc1-576921839bf8.jpg" },
    { id: 4, price: 15, win: 1200, img: "https://i.supaimg.com/2cc005e6-4985-4d8d-8015-55a33c0b6a8a.jpg" },
    { id: 5, price: 20, win: 1600, img: "https://i.supaimg.com/34cac5bd-11c1-4ac5-a358-41c3390874f3.jpg" },
  ];

  const navigateWithLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 500);
  };

  const enterRoom = (roomId) => {
    toast.info(`Entering Room ${roomId}...`);
    navigateWithLoading(`/lobby/${roomId}`);
  };

  return (
    <motion.div
      className="bg-[#0f1115] text-white min-h-screen font-[Inter] relative flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ToastContainer position="top-right" autoClose={2500} />
      {loading && !sidebarOpen && <Loading />}

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 z-30 transition-opacity"></div>
      )}

      <header className="flex justify-between items-center px-4 py-3 bg-[#0f1115] sticky top-0 z-40 border-b border-white/10">
        <div onClick={toggleSidebar} className="text-2xl font-bold cursor-pointer">☰</div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            onClick={() => navigateWithLoading("/home")}
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            className="h-8 sm:h-10 cursor-pointer mr-4 md:mr-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white/10 px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm">
            ${user.balance.toFixed(2)}
          </div>
          <button
            onClick={() => navigateWithLoading("/deposit")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded-full text-xs cursor-pointer sm:text-sm"
          >
            Deposit
          </button>
          <div
            onClick={() => navigateWithLoading("/notifications")}
            className="relative w-8 h-8 sm:w-9 sm:h-9 bg-[#2a2a2f] rounded-lg flex items-center justify-center text-lg cursor-pointer hover:scale-110 transition-transform"
          >
            🔔
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center grow transition-all mb-20 md:mb-4">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.03 }}
            className="bg-[#17181c] rounded-2xl p-4 shadow-lg hover:-translate-y-1 transition-transform w-full max-w-sm"
          >
            <img src={room.img} alt={`$${room.price} Room`} className="w-full rounded-xl mb-3" />
            <h2 className="text-lg sm:text-xl font-bold">${room.price} Room</h2>
            <p className="text-gray-400 text-sm mb-3">Win up to ${room.win.toLocaleString()}</p>
            <button
              onClick={() => enterRoom(room.id)}
              className="bg-blue-500 hover:bg-blue-600 py-3 w-full text-sm sm:text-base rounded-full font-semibold"
            >
              Join
            </button>
          </motion.div>
        ))}
      </main>
    </motion.div>
  );
};

export default Home;
