import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Support = () => {
  const [messages, setMessages] = useState([
    {
      sender: "support",
      text: "👋 Hello Homelander! How can we assist you today?",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  function formatTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  const sendMessage = () => {
    if (!input.trim()) {
      toast.warn("Please type a message before sending!");
      return;
    }

    const newMessage = {
      sender: "user",
      text: input,
      time: formatTime(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    toast.success("Message sent!");

    // Auto-reply simulation
    setTimeout(() => {
      let replyText = "👩‍💼 Our support agent will respond shortly.";
      if (input.toLowerCase().includes("withdraw")) {
        replyText = "💸 Please ensure your account is verified before withdrawing.";
      } else if (input.toLowerCase().includes("deposit")) {
        replyText = "💰 You can deposit via Momo or bank transfer under the 'Deposit' section.";
      }

      const reply = {
        sender: "support",
        text: replyText,
        time: formatTime(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-[#0f1115] text-white font-[Inter,sans-serif]">
      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />

      {/* Header */}
      <header className="bg-[#17181c] px-4 py-3 flex justify-between items-center border-b border-white/10">
        <Link
          to="/home"
          className="text-white text-2xl hover:text-blue-400 transition"
        >
          ←
        </Link>
        <h1 className="text-lg font-semibold">Support Chat</h1>
        <div></div>
      </header>

      {/* Chat Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-[14px] text-sm leading-snug ${
              msg.sender === "user"
                ? "bg-[#1e90ff] self-end rounded-br-md"
                : "bg-[#2a2a2f] self-start rounded-bl-md"
            }`}
          >
            <p>{msg.text}</p>
            <div className="text-[11px] text-gray-400 text-right mt-1">
              {msg.time}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center px-3 py-2 bg-[#17181c] border-t border-white/10">
        <input
          type="text"
          className="flex-1 bg-[#1d1f25] border-none rounded-lg px-3 py-2 text-white text-sm outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-[#1e90ff] hover:bg-[#0072e0] text-white font-semibold ml-2 px-4 py-2 rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Support;
