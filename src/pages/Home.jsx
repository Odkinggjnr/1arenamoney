import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    username: "Homelander",
    id: Math.floor(100000000 + Math.random() * 900000000),
    balance: 100,
  });

  // Load user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("moneyRoomsUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Save user to localStorage
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

  const enterRoom = (roomId) => {
    toast.info(`Entering Room ${roomId}...`);
    navigate(`/room/${roomId}`);
  };

  return (
    <motion.div
      className="bg-[#0f1115] text-white min-h-screen font-[Inter] relative flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30 transition-opacity"
        ></div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-[#0f1115] sticky top-0 z-40 border-b border-white/10">
        <div onClick={toggleSidebar} className="text-2xl font-bold cursor-pointer">
          ☰
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            className="h-8 sm:h-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/10 px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm">
            ${user.balance.toFixed(2)}
          </div>
          <button
            onClick={() => toast.info("Deposit feature coming soon!")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded-full text-xs sm:text-sm"
          >
            Deposit
          </button>
          <div
            onClick={() => toast.info("No new notifications")}
            className="relative w-8 h-8 sm:w-9 sm:h-9 bg-[#2a2a2f] rounded-lg flex items-center justify-center text-lg cursor-pointer hover:scale-110 transition-transform"
          >
            🔔
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-4/5 max-w-xs bg-[#1a1a1f] text-white z-40 flex flex-col justify-between transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="grow overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold">Menu</h3>
            <button onClick={toggleSidebar} className="text-3xl text-white leading-none">
              &times;
            </button>
          </div>

          <div className="flex items-center gap-3 p-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User"
              className="w-12 h-12 rounded-full bg-[#333]"
            />
            <div>
              <strong onClick={handleUsernameEdit} className="cursor-pointer hover:text-blue-400">
                {user.username}
              </strong>
              <p className="text-xs text-gray-400">ID {user.id}</p>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {["Deposit", "Withdraw", "Leadership", "Settings", "Tournament Chat"].map((name, i) => (
              <div
                key={i}
                onClick={() => toast.info(`${name} page coming soon!`)}
                className="p-4 hover:bg-white/10 cursor-pointer flex justify-between items-center"
              >
                <span>⭐</span> {name}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 p-4 space-y-3">
          <div className="flex gap-2 justify-center">
            {["📘", "📸", "📌", "🌐"].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-[#2d2d33] rounded-full flex items-center justify-center hover:bg-blue-500 transition"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center grow transition-all">
        {rooms.map((room, index) => (
          <motion.div
            key={index}
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-white/5 flex justify-between px-2 py-2 rounded-2xl backdrop-blur-md text-xs sm:text-sm text-gray-400">
        {[
          { name: "Home", icon: "https://cdn-icons-png.flaticon.com/512/25/25694.png", action: () => navigate("/") },
          { name: "Leaderboard", icon: "https://cdn-icons-png.flaticon.com/512/5269/5269896.png" },
          { name: "Deposit", icon: "https://cdn-icons-png.flaticon.com/512/906/906175.png" },
          { name: "Withdraw", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828859.png" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex-1 text-center cursor-pointer hover:text-blue-400"
            onClick={() => item.action ? item.action() : toast.info(`${item.name} page coming soon!`)}
          >
            <img src={item.icon} alt={item.name} className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
            {item.name}
          </div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Home;
