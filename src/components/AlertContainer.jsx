// components/AlertContainer.jsx
import React from "react";
import { AnimatePresence } from "framer-motion";
import CustomAlert from "./CustomAlert";

const AlertContainer = ({ alerts, removeAlert }) => (
  <div className="fixed z-50">
    <AnimatePresence>
      {alerts.map((alert) => (
        <CustomAlert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          duration={alert.duration}
          position={alert.position}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </AnimatePresence>
  </div>
);

export default AlertContainer;