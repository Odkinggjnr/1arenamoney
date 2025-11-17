import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Send, CheckCircle, AlertCircle, 
  X, Headphones, Clock, MessageCircle
} from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
  };

  const colors = {
    success: "bg-emerald-500/20 border-emerald-500/50 text-emerald-100",
    warning: "bg-amber-500/20 border-amber-500/50 text-amber-100",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md border ${colors[type]} min-w-[280px] max-w-md`}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={onClose} className="flex-shrink-0 hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const Support = () => {
  function formatTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      sender: "support",
      text: "👋 Hello Homelander! How can we assist you today?",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const sendMessage = () => {
    if (!input.trim()) {
      showToast("Please type a message before sending!", "warning");
      return;
    }

    const newMessage = {
      sender: "user",
      text: input,
      time: formatTime(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    showToast("Message sent!", "success");

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
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

  const handleBack = () => {
    navigate(-1);
  }
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-slate-900/80 backdrop-blur-xl px-4 sm:px-6 py-4 flex justify-between items-center border-b border-slate-800/50"
      >
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBack}
          className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold">Support Chat</h1>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>Online</span>
            </div>
          </div>
        </div>

        <div className="w-10"></div>
      </motion.header>

      <div
        ref={chatRef}
        className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 scroll-smooth"
      >
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: index * 0.05 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                {msg.sender === "support" && (
                  <div className="flex items-center gap-2 mb-2 ml-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Headphones className="w-3 h-3" />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Support Team</span>
                  </div>
                )}
                
                <div
                  className={`px-4 py-3 rounded-2xl backdrop-blur-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-md shadow-lg shadow-blue-500/20"
                      : "bg-slate-800/50 text-slate-100 rounded-bl-md border border-slate-700/50"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center gap-1.5 text-[10px] mt-2 ${
                    msg.sender === "user" ? "text-blue-100 justify-end" : "text-slate-500"
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{msg.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 ml-2"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Headphones className="w-3 h-3" />
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-md border border-slate-700/50">
                <div className="flex gap-1">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-slate-400 rounded-full"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-slate-400 rounded-full"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-slate-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-slate-900/80 backdrop-blur-xl px-4 sm:px-6 py-4 border-t border-slate-800/50"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <MessageCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          </div>
          <motion.button
            onClick={sendMessage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-4 sm:px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </motion.button>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-slate-500 text-xs mt-3"
        >
          Average response time: ~2 minutes
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Support;
