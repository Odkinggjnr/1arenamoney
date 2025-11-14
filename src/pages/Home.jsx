import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ==========================
// Custom Toast System
// ==========================
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  const colors = {
    success: "from-emerald-500 to-emerald-600",
    error: "from-red-500 to-red-600",
    info: "from-blue-500 to-blue-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] backdrop-blur-xl`}
    >
      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
        {icons[type]}
      </div>
      <p className="flex-1 font-medium">{message}</p>
      <button onClick={onClose} className="text-white/80 hover:text-white text-xl leading-none">
        ×
      </button>
    </motion.div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3">
    <AnimatePresence>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </AnimatePresence>
  </div>
);

// ==========================
// Loading Component
// ==========================
const Loading = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
    />
  </motion.div>
);

// ==========================
// Main Component
// ==========================
const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState({
    username: "Homelander",
    id: Math.floor(100000000 + Math.random() * 900000000),
    balance: 100,
  });

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const savedData = { username: "Homelander", id: user.id, balance: 100 };
    setUser(savedData);
  }, []);

  const handleUsernameEdit = () => {
    const newName = prompt("Enter new username:", user.username);
    if (newName && newName.trim() !== "") {
      setUser({ ...user, username: newName.trim() });
      addToast("Username updated successfully!", "success");
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigateWithLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      addToast(`Navigating to ${path}...`, "info");
      navigate(path);
      setLoading(false);
    }, 800);
  };

  const enterRoom = (roomId, price) => {
    if (user.balance >= price) {
      addToast(`Entering Room ${roomId}...`, "info");
      navigateWithLoading(`/lobby/${roomId}`);
    } else {
      addToast("Insufficient balance. Please deposit more funds.", "error");
    }
  };

  const rooms = [
    { id: 1, price: 1, win: 80, img: "https://i.supaimg.com/f19f4f97-1562-4714-8be3-1b1e4b1a3478.jpg", gradient: "from-purple-600 to-blue-600" },
    { id: 2, price: 5, win: 400, img: "https://i.supaimg.com/335a2cb1-a511-40f1-90b4-418dd08f32dd.jpg", gradient: "from-blue-600 to-cyan-600" },
    { id: 3, price: 10, win: 800, img: "https://i.supaimg.com/c2276bf6-1b7f-47c4-8dc1-576921839bf8.jpg", gradient: "from-cyan-600 to-teal-600" },
    { id: 4, price: 15, win: 1200, img: "https://i.supaimg.com/2cc005e6-4985-4d8d-8015-55a33c0b6a8a.jpg", gradient: "from-teal-600 to-emerald-600" },
    { id: 5, price: 20, win: 1600, img: "https://i.supaimg.com/34cac5bd-11c1-4ac5-a358-41c3390874f3.jpg", gradient: "from-emerald-600 to-green-600" },
  ];

  const menuLinks = [
    { name: "Deposit", path: "/deposit", icon: "💰" },
    { name: "Withdraw", path: "/withdraw", icon: "💸" },
    { name: "Leaderboard", path: "/leadership", icon: "🏆" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Tournament Chat", path: "/tournament-chat", icon: "💬" },
  ];

  const bottomNavLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Board", path: "/leadership", icon: "🏆" },
    { name: "Deposit", path: "/deposit", icon: "💰" },
    { name: "Withdraw", path: "/withdraw", icon: "💸" },
    { name: "WhatsApp", path: "https://wa.me/1234567890", icon: "🟢", external: true },
    { name: "Telegram", path: "https://t.me/yourusername", icon: "✈️", external: true },
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen font-sans relative flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <AnimatePresence>{loading && <Loading />}</AnimatePresence>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      <Header
        toggleSidebar={toggleSidebar}
        user={user}
        navigateWithLoading={navigateWithLoading}
      />

      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        user={user}
        handleUsernameEdit={handleUsernameEdit}
        menuLinks={menuLinks}
        navigateWithLoading={navigateWithLoading}
      />

      <main className="relative z-10 p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center grow mb-28 md:mb-8">
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-white/10 w-full max-w-sm group overflow-hidden relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${room.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            <div className="relative overflow-hidden rounded-2xl mb-4">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                src={room.img}
                alt={`$${room.price} Room`}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${room.gradient} opacity-20`} />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  ${room.price}
                </h2>
                <span className="text-xs font-semibold px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                  Room {room.id}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                <span className="text-yellow-500">🏆</span>
                Win up to <span className="font-bold text-white">${room.win.toLocaleString()}</span>
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => enterRoom(room.id, room.price)}
                className={`bg-gradient-to-r ${room.gradient} hover:shadow-lg hover:shadow-blue-500/50 py-3.5 w-full text-base rounded-2xl font-bold transition-all duration-300 relative overflow-hidden group cursor-pointer`}
              >
                <span className="relative z-10">Join Room</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </main>

      <BottomNav links={bottomNavLinks} navigateWithLoading={navigateWithLoading} />
    </motion.div>
  );
};

// ==========================
// Header Component
// ==========================
const Header = ({ toggleSidebar, user, navigateWithLoading }) => (
  <motion.header
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="relative z-40 flex justify-between items-center px-4 md:px-8 py-4 bg-slate-900/50 backdrop-blur-xl sticky top-0 border-b border-white/10"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleSidebar}
      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center cursor-pointer shadow-lg shadow-blue-500/30"
    >
      <span className="text-xl font-bold">☰</span>
    </motion.div>

    <motion.img
      whileHover={{ scale: 1.05, rotate: 5 }}
      onClick={() => navigateWithLoading("/")}
      src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
      alt="Logo"
      className="h-10 sm:h-12 mx-auto"
    />

    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl px-2 py-2 md:px-4 md:py-2.5 rounded-xl font-bold text-sm border border-emerald-500/30 shadow-lg shadow-emerald-500/20"
      >
        ${user.balance.toFixed(2)}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigateWithLoading("/deposit")}
        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold md:px-4 md:py-2.5 px-2 py-2 rounded-xl text-sm shadow-lg shadow-green-500/30 transition-all cursor-pointer"
      >
        Deposit
      </motion.button>

      <motion.div
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigateWithLoading("/notifications")}
        className="relative w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-xl cursor-pointer border border-white/10 shadow-lg"
      >
        🔔
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
        />
      </motion.div>
    </div>
  </motion.header>
);

// ==========================
// Sidebar Component
// ==========================
const Sidebar = ({ open, toggleSidebar, user, handleUsernameEdit, menuLinks, navigateWithLoading }) => (
  <AnimatePresence>
    {open && (
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 left-0 h-screen w-4/5 max-w-sm bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl text-white z-40 flex flex-col shadow-2xl border-r border-white/10"
      >
        <div className="grow overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Menu
            </h3>
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="text-3xl text-white leading-none w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              ×
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 m-4 rounded-2xl border border-white/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30">
              {user.username[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <motion.strong
                whileHover={{ scale: 1.05 }}
                onClick={handleUsernameEdit}
                className="cursor-pointer hover:text-blue-400 text-lg block transition-colors"
              >
                {user.username}
              </motion.strong>
              <p className="text-xs text-gray-400 font-mono">ID: {user.id}</p>
            </div>
          </motion.div>

          <div className="px-4 space-y-2">
            {menuLinks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  toggleSidebar();
                  setTimeout(() => navigateWithLoading(item.path), 300);
                }}
                className="p-4 hover:bg-white/5 cursor-pointer flex items-center gap-4 rounded-xl transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.aside>
    )}
  </AnimatePresence>
);

// ==========================
// Bottom Navigation Component
// ==========================
const BottomNav = ({ links, navigateWithLoading }) => (
  <motion.nav
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", damping: 20 }}
    className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-slate-900/80 backdrop-blur-xl flex justify-between px-2 py-3 rounded-3xl border border-white/10 shadow-2xl z-50 mb-5 md:mb-0"
  >
    {links.map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex-1 text-center cursor-pointer text-gray-400 hover:text-white transition-colors group"
        onClick={() => {
          if (item.external) {
            window.open(item.path, "_blank");
          } else {
            navigateWithLoading(item.path);
          }
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
          <span className="text-xs font-medium">{item.name}</span>
        </div>
      </motion.div>
    ))}
  </motion.nav>
);

export default Home;
