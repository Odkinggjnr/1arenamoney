import React, { useEffect, useState } from "react";

const Loading = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        const nextPage = localStorage.getItem("nextPage") || "/home";
        window.location.href = nextPage;
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen bg-[radial-gradient(circle_at_center,_#000_40%,_#020617_100%)] overflow-hidden relative transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <img
        src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
        alt="Arena X Logo"
        className="w-32 h-auto rounded-2xl mb-6 animate-pulseLogo"
      />

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-glow">
        Loading...
      </h1>

      {/* Loader */}
      <div className="flex justify-center items-end gap-1.5 mt-6 h-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 bg-cyan-400 rounded-sm animate-wave`}
            style={{ animationDelay: `${i * 0.15}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
