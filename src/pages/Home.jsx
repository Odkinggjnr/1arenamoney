import React, { useState, useEffect } from "react";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    username: "Homelander",
    id: Math.floor(100000000 + Math.random() * 900000000),
    balance: 100,
  });

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("moneyRoomsUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    localStorage.setItem("moneyRoomsUser", JSON.stringify(user));
  }, [user]);

  const handleUsernameEdit = () => {
    const newName = prompt("Enter new username:", user.username);
    if (newName && newName.trim() !== "") {
      setUser({ ...user, username: newName.trim() });
    }
  };

  const goToPage = (page) => {
    window.location.href = page;
  };

  const enterLobby = (roomId) => {
    window.location.href = `/lobby?room=${roomId}`;
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const rooms = [
    {
      price: 1,
      win: 80,
      img: "https://i.supaimg.com/f19f4f97-1562-4714-8be3-1b1e4b1a3478.jpg",
    },
    {
      price: 5,
      win: 400,
      img: "https://i.supaimg.com/335a2cb1-a511-40f1-90b4-418dd08f32dd.jpg",
    },
    {
      price: 10,
      win: 800,
      img: "https://i.supaimg.com/c2276bf6-1b7f-47c4-8dc1-576921839bf8.jpg",
    },
    {
      price: 15,
      win: 1200,
      img: "https://i.supaimg.com/2cc005e6-4985-4d8d-8015-55a33c0b6a8a.jpg",
    },
    {
      price: 20,
      win: 1600,
      img: "https://i.supaimg.com/34cac5bd-11c1-4ac5-a358-41c3390874f3.jpg",
    },
  ];

  return (
    <div className="bg-[#0f1115] text-white min-h-screen font-[Inter] relative">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30 transition-opacity"
        ></div>
      )}

      {/* ─── Header ───────────────────────────── */}
      <header className="flex justify-between items-center px-4 py-3 bg-[#0f1115] relative z-40">
        <div
          onClick={toggleSidebar}
          className="text-2xl font-bold cursor-pointer"
        >
          ☰
        </div>

        <div className="absolute left-1/4 transform -translate-x-1/2">
          <img
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            className="h-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/10 px-3 py-2 rounded-lg font-semibold text-sm">
            ${user.balance.toFixed(2)}
          </div>
          <button
            onClick={() => goToPage("/deposit")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full text-sm"
          >
            Deposit
          </button>
          <div
            onClick={() => goToPage("/notifications")}
            className="relative w-9 h-9 bg-[#2a2a2f] rounded-lg flex items-center justify-center text-lg cursor-pointer hover:scale-110 transition-transform"
          >
            🔔
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* ─── Sidebar ───────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[#1a1a1f] text-white z-40 flex flex-col justify-between transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold">Menu</h3>
            <button
              onClick={toggleSidebar}
              className="text-3xl text-white leading-none"
            >
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
              <strong
                onClick={handleUsernameEdit}
                className="cursor-pointer hover:text-blue-400"
              >
                {user.username}
              </strong>
              <p className="text-xs text-gray-400">ID {user.id}</p>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            <div
              onClick={() => goToPage("/deposit")}
              className="p-4 hover:bg-white/10 cursor-pointer flex justify-between items-center"
            >
              💰 Deposit
            </div>
            <div
              onClick={() => goToPage("/withdraw")}
              className="p-4 hover:bg-white/10 cursor-pointer flex justify-between items-center"
            >
              💸 Withdraw
            </div>
            <div
              onClick={() => goToPage("/leadership")}
              className="p-4 hover:bg-white/10 cursor-pointer flex justify-between items-center"
            >
              🏆 Leadership
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-4 space-y-3">
          <div className="flex gap-2">
            {["📘", "📸", "📌", "🌐"].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-[#2d2d33] rounded-full flex items-center justify-center hover:bg-blue-500 transition"
              >
                {icon}
              </div>
            ))}
          </div>

          <div
            onClick={() => goToPage("/support")}
            className="flex justify-between items-center bg-[#2d2d33] hover:bg-blue-500 px-3 py-2 rounded-lg cursor-pointer"
          >
            <div>💬 Support</div>
            <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs">
              24/7
            </span>
          </div>
        </div>
      </aside>

      {/* ─── Main ───────────────────────────── */}
      <main className="p-4 pb-28 grid md:grid-cols-3 flex-wrap">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="bg-[#17181c] rounded-2xl p-4 mb-6 shadow-lg hover:-translate-y-1 transition-transform w-96 flex-wrap"
          >
            <img
              src={room.img}
              alt={`$${room.price} Room`}
              className="w-full rounded-xl px-6 mb-3 justify-center items-center"
            />
            <h2 className="text-xl font-bold">${room.price} Room</h2>
            <p className="text-gray-400 text-sm mb-3">
              Win up to ${room.win.toLocaleString()}
            </p>
            <button
              onClick={() => enterLobby(room.price)}
              className="bg-blue-500 hover:bg-blue-600 py-3 px-10 items-center w-full justify-center text-sm cursor-pointer rounded-full gap-2 font-semibold"
            >
              Join
            </button>
          </div>
        ))}
      </main>

      {/* ─── Bottom Navigation ───────────── */}
      <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-white/5 flex justify-between px-2 py-2 rounded-2xl backdrop-blur-md text-sm text-gray-400">
        <div
          className="text-blue-400 font-semibold flex-1 text-center cursor-pointer"
          onClick={() => goToPage("/home")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            alt="Home"
            className="w-6 h-6 mx-auto mb-1"
          />
          Home
        </div>
        <div
          className="flex-1 text-center cursor-pointer hover:text-blue-400"
          onClick={() => goToPage("/leadership")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/5269/5269896.png"
            alt="Leaderboard"
            className="w-6 h-6 mx-auto mb-1"
          />
          Leaderboard
        </div>
        <div
          className="flex-1 text-center cursor-pointer hover:text-blue-400"
          onClick={() => goToPage("/deposit")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
            alt="Deposit"
            className="w-6 h-6 mx-auto mb-1"
          />
          Deposit
        </div>
        <div
          className="flex-1 text-center cursor-pointer hover:text-blue-400"
          onClick={() => goToPage("/withdraw")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
            alt="Withdraw"
            className="w-6 h-6 mx-auto mb-1"
          />
          Withdraw
        </div>
      </nav>
    </div>
  );
};

export default Home;
