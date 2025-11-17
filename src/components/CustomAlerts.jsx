// components/CustomAlert.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from "lucide-react";

const CustomAlert = ({ 
  type = "info", 
  message, 
  onClose, 
  duration = 4000,
  position = "top-right"
}) => {
  const config = {
    success: {
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-100",
      border: "border-emerald-400/30",
    },
    error: {
      icon: AlertCircle,
      gradient: "from-red-500 to-rose-500",
      iconColor: "text-red-100",
      border: "border-red-400/30",
    },
    warning: {
      icon: AlertTriangle,
      gradient: "from-amber-500 to-orange-500",
      iconColor: "text-amber-100",
      border: "border-amber-400/30",
    },
    info: {
      icon: Info,
      gradient: "from-blue-500 to-indigo-500",
      iconColor: "text-blue-100",
      border: "border-blue-400/30",
    },
  };

  const { icon: Icon, gradient, iconColor, border } = config[type] || config.info;

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`fixed ${positionClasses[position]} z-50 bg-gradient-to-r ${gradient} backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl border ${border} max-w-sm`}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={iconColor} size={24} />
        </motion.div>
        <p className="flex-1 font-semibold text-sm">{message}</p>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X size={18} />
        </motion.button>
      </div>
      {duration > 0 && (
        <motion.div
          className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

export default CustomAlert;