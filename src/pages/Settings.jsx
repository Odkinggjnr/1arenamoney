import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 

Settings as SettingsIcon, 
User, 
DollarSign, 
Cpu, 
Mail,
Phone,
CreditCard,
Wallet,
Shield,
Bell,
Globe,
Palette,
Database,
Zap,
Crown,
X,
CheckCircle2,
AlertCircle,
Info,
AlertTriangle,
Menu,
Edit2,
Home,
Trophy,
MessageCircle,
LogOut,
HelpCircle
} from "lucide-react";

// Toast Component
const Toast = ({ message, type, onClose }) => {
const config = {
  success: { icon: CheckCircle2, color: "bg-emerald-500/20 border-emerald-500/50 text-emerald-100" },
  error: { icon: AlertCircle, color: "bg-red-500/20 border-red-500/50 text-red-100" },
  warning: { icon: AlertTriangle, color: "bg-amber-500/20 border-amber-500/50 text-amber-100" },
  info: { icon: Info, color: "bg-blue-500/20 border-blue-500/50 text-blue-100" },
};

const { icon: Icon, color } = config[type] || config.info;

useEffect(() => {
  const timer = setTimeout(onClose, 4000);
  return () => clearTimeout(timer);
}, [onClose]);

return (
  <motion.div
    initial={{ opacity: 0, y: -50, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, x: 300, scale: 0.9 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md border ${color} min-w-[280px] max-w-md`}
  >
    <Icon className="w-5 h-5" />
    <p className="flex-1 text-sm font-medium">{message}</p>
    <motion.button
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClose}
      className="text-white/80 hover:text-white"
    >
      <X size={18} />
    </motion.button>
  </motion.div>
);
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
const sizeClasses = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };

return (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/50 w-full ${sizeClasses[size]}`}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </motion.button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
};

// Enhanced Sidebar Component
const Sidebar = ({ open, onClose, user, onUsernameEdit }) => {
const navigate = useNavigate();

const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: "Home", path: "/" },
  { icon: <CreditCard className="w-5 h-5" />, label: "Deposit", path: "/deposit" },
  { icon: <DollarSign className="w-5 h-5" />, label: "Withdraw", path: "/withdraw" },
  { icon: <Trophy className="w-5 h-5" />, label: "Leaderboard", path: "/leadership" },
  { icon: <SettingsIcon className="w-5 h-5" />, label: "Settings", path: "/settings" },
  { icon: <MessageCircle className="w-5 h-5" />, label: "Tournament Chat", path: "/tournament-chat" },
  { icon: <MessageCircle className="w-5 h-5" />, label: "Support", path: "/support" },
];

const handleNavigation = (path) => {
  if (window.setLoading) {
    window.setLoading(true);
  }
  
  onClose();
  
  setTimeout(() => {
    navigate(path);
  }, 300);
};

const handleSupport = () => {
  onClose();
  setTimeout(() => {
    window.open('https://wa.me/1234567890', '_blank');
  }, 300);
};

return (
  <>
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
        />
      )}
    </AnimatePresence>

    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 h-screen w-4/5 sm:w-80 md:w-96 bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl z-40 flex flex-col border-r border-white/10 overflow-hidden"
        >
          <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Menu
            </h3>
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-2xl sm:text-3xl text-white leading-none w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              ×
            </motion.button>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 mx-3 sm:mx-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 mb-4"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg shadow-blue-500/30 flex-shrink-0">
                  {user.username[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <motion.strong
                    whileHover={{ scale: 1.05 }}
                    onClick={onUsernameEdit}
                    className="cursor-pointer hover:text-blue-400 text-base sm:text-lg block transition-colors truncate"
                    title={user.username}
                  >
                    {user.username}
                  </motion.strong>
                  <p className="text-xs text-gray-400 font-mono truncate">ID: {user.id}</p>
                  <p className="text-sm text-emerald-400 font-medium mt-1 truncate">
                    ${user.balance.toFixed(2)}
                  </p>
                </div>
              </motion.div>

              <div className="px-2 sm:px-3 space-y-1">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation(item.path)}
                    className="p-3 hover:bg-white/5 cursor-pointer flex items-center gap-3 rounded-xl transition-all group"
                  >
                    <div className="text-xl group-hover:scale-110 transition-transform flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-medium group-hover:text-blue-400 transition-colors text-sm truncate">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 p-3 sm:p-4 border-t border-white/10 bg-slate-900/50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-2xl border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="text-white w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm">24/7 Support</h4>
                    <p className="text-white/80 text-xs">Always here to help you</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSupport}
                  className="w-full p-2 bg-white/10 rounded-lg cursor-pointer text-center hover:bg-white/20 transition-colors"
                >
                  <span className="text-white text-xs font-medium">Get Help Now</span>
                </motion.button>
              </motion.div>
            </div>
          </div>

          <style jsx>{`
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
            }
            
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
              border-radius: 3px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5));
              border-radius: 3px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, rgba(59, 130, 246, 0.7), rgba(147, 51, 234, 0.7));
            }
          `}</style>
        </motion.aside>
      )}
    </AnimatePresence>
  </>
);
};

// Main Settings Component
const Settings = () => {
const navigate = useNavigate();
const [sidebarOpen, setSidebarOpen] = useState(false);
const [toasts, setToasts] = useState([]);
const [modals, setModals] = useState({
  username: false,
  email: false,
  phone: false,
  aiUpgrade: false,
});

const [user, setUser] = useState({
  username: "Homelander",
  email: "homelander@example.com",
  phone: "+1 (555) 123-4567",
  id: Math.floor(100000000 + Math.random() * 900000000),
  balance: 100,
  preferences: {
    theme: "dark",
    notifications: true,
    sound: true,
    language: "en",
    autoDeposit: false,
    twoFactor: false
  },
  paymentMethods: [
    { type: "crypto", primary: true, details: "Bitcoin Wallet" },
    { type: "bank", primary: false, details: "Chase Bank ****1234" }
  ],
  aiSettings: {
    activated: false,
    remainingTries: 10,
    plan: "basic",
    autoPlay: false,
    riskLevel: "medium"
  },
  security: {
    lastLogin: new Date().toISOString(),
    loginAttempts: 0,
    trustedDevices: 2
  }
});

const [formData, setFormData] = useState({
  newUsername: "",
  newEmail: "",
  newPhone: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
});

useEffect(() => {
  window.setLoading = (loading) => {
    if (loading) {
      showToast("info", "Loading...", 2000);
    }
  };
  return () => {
    window.setLoading = null;
  };
}, []);

useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("moneyRoomsUser"));
  if (savedUser) {
    setUser(prev => ({ ...prev, ...savedUser }));
    applyTheme(savedUser.preferences?.theme || 'dark');
  }
}, []);

useEffect(() => {
  localStorage.setItem("moneyRoomsUser", JSON.stringify(user));
  applyTheme(user.preferences.theme);
}, [user]);

const applyTheme = (theme) => {
  const root = document.documentElement;
  
  if (theme === 'light') {
    root.classList.remove('dark');
    root.style.setProperty('--bg-primary', '#ffffff');
    root.style.setProperty('--bg-secondary', '#f8fafc');
    root.style.setProperty('--text-primary', '#1e293b');
    root.style.setProperty('--text-secondary', '#64748b');
  } else {
    root.classList.add('dark');
    root.style.setProperty('--bg-primary', '#0f172a');
    root.style.setProperty('--bg-secondary', '#1e293b');
    root.style.setProperty('--text-primary', '#f1f5f9');
    root.style.setProperty('--text-secondary', '#94a3b8');
  }
};

const showToast = (type, message, duration = 4000) => {
  const id = Date.now();
  setToasts(prev => [...prev, { id, type, message }]);
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }
};

const removeToast = (id) => {
  setToasts(prev => prev.filter(t => t.id !== id));
};

const openModal = (name) => setModals(prev => ({ ...prev, [name]: true }));
const closeModal = (name) => setModals(prev => ({ ...prev, [name]: false }));

const updateUsername = () => {
  if (!formData.newUsername.trim()) {
    showToast("error", "Please enter a valid username");
    return;
  }
  setUser(prev => ({ ...prev, username: formData.newUsername.trim() }));
  setFormData(prev => ({ ...prev, newUsername: "" }));
  closeModal('username');
  showToast("success", "Username updated successfully!");
};

const updateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.newEmail)) {
    showToast("error", "Please enter a valid email");
    return;
  }
  setUser(prev => ({ ...prev, email: formData.newEmail }));
  setFormData(prev => ({ ...prev, newEmail: "" }));
  closeModal('email');
  showToast("success", "Email updated successfully!");
};

const updatePhone = () => {
  if (!formData.newPhone.trim()) {
    showToast("error", "Please enter a valid phone number");
    return;
  }
  setUser(prev => ({ ...prev, phone: formData.newPhone.trim() }));
  setFormData(prev => ({ ...prev, newPhone: "" }));
  closeModal('phone');
  showToast("success", "Phone number updated!");
};

const updatePassword = () => {
  if (!formData.currentPassword) {
    showToast("error", "Please enter current password");
    return;
  }
  if (formData.newPassword.length < 6) {
    showToast("error", "Password must be at least 6 characters");
    return;
  }
  if (formData.newPassword !== formData.confirmPassword) {
    showToast("error", "Passwords do not match");
    return;
  }
  setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
  showToast("success", "Password updated successfully!");
};

const toggleAI = () => {
  if (!user.aiSettings.activated && user.aiSettings.remainingTries <= 0) {
    openModal('aiUpgrade');
    return;
  }
  setUser(prev => ({
    ...prev,
    aiSettings: {
      ...prev.aiSettings,
      activated: !prev.aiSettings.activated,
      remainingTries: prev.aiSettings.activated ? prev.aiSettings.remainingTries : prev.aiSettings.remainingTries - 1
    }
  }));
  showToast("success", user.aiSettings.activated ? "AI Deactivated" : "AI Activated");
};

const upgradeAIPlan = (plan) => {
  setUser(prev => ({
    ...prev,
    aiSettings: {
      ...prev.aiSettings,
      plan,
      remainingTries: plan === 'pro' ? 50 : 999
    }
  }));
  closeModal('aiUpgrade');
  showToast("success", `Upgraded to ${plan} plan!`);
};

const togglePreference = (pref) => {
  setUser(prev => ({
    ...prev,
    preferences: { ...prev.preferences, [pref]: !prev.preferences[pref] }
  }));
  showToast("info", `${pref} ${user.preferences[pref] ? 'disabled' : 'enabled'}`);
};

const setPrimaryPayment = (index) => {
  setUser(prev => ({
    ...prev,
    paymentMethods: prev.paymentMethods.map((m, i) => ({ ...m, primary: i === index }))
  }));
  showToast("success", "Primary payment updated");
};

const changeTheme = (theme) => {
  setUser(prev => ({
    ...prev,
    preferences: { ...prev.preferences, theme }
  }));
  showToast("success", `Theme changed to ${theme}`);
};

const handleDeposit = () => {
  navigate('/deposit');
};

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
    </div>

    <div className="fixed z-50">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>

    <Modal isOpen={modals.username} onClose={() => closeModal('username')} title="Edit Username" size="sm">
      <div className="space-y-4">
        <input
          type="text"
          value={formData.newUsername}
          onChange={(e) => setFormData(prev => ({ ...prev, newUsername: e.target.value }))}
          className="w-full p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Enter new username"
        />
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={updateUsername} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold">Update</motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => closeModal('username')} className="flex-1 py-3 bg-slate-700 rounded-xl font-bold">Cancel</motion.button>
        </div>
      </div>
    </Modal>

    <Modal isOpen={modals.email} onClose={() => closeModal('email')} title="Update Email" size="sm">
      <div className="space-y-4">
        <input
          type="email"
          value={formData.newEmail}
          onChange={(e) => setFormData(prev => ({ ...prev, newEmail: e.target.value }))}
          className="w-full p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Enter new email"
        />
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={updateEmail} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold">Update</motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => closeModal('email')} className="flex-1 py-3 bg-slate-700 rounded-xl font-bold">Cancel</motion.button>
        </div>
      </div>
    </Modal>

    <Modal isOpen={modals.phone} onClose={() => closeModal('phone')} title="Update Phone" size="sm">
      <div className="space-y-4">
        <input
          type="tel"
          value={formData.newPhone}
          onChange={(e) => setFormData(prev => ({ ...prev, newPhone: e.target.value }))}
          className="w-full p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Enter new phone"
        />
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={updatePhone} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold">Update</motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => closeModal('phone')} className="flex-1 py-3 bg-slate-700 rounded-xl font-bold">Cancel</motion.button>
        </div>
      </div>
    </Modal>

    <Modal isOpen={modals.aiUpgrade} onClose={() => closeModal('aiUpgrade')} title="Upgrade AI Plan" size="md">
      <div className="space-y-6">
        <p className="text-slate-300 text-center">Choose a plan to unlock more AI features</p>
        <div className="grid gap-4">
          {[
            { plan: 'pro', name: 'Pro Plan', tries: 50, price: '$9.99/mo' },
            { plan: 'enterprise', name: 'Enterprise', tries: 999, price: '$29.99/mo' }
          ].map(({ plan, name, tries, price }) => (
            <motion.div key={plan} whileHover={{ scale: 1.02 }} onClick={() => upgradeAIPlan(plan)} className="p-4 border border-slate-700/50 rounded-xl bg-slate-800/50 cursor-pointer">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-lg">{name}</h4>
                <Crown className="text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-emerald-400 mb-2">{price}</p>
              <p className="text-sm text-slate-300">{tries} AI tries/month</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Modal>

    <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} onUsernameEdit={() => openModal('username')} />

    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="relative z-40 flex justify-between items-center px-4 md:px-8 py-4 bg-slate-900/50 backdrop-blur-xl sticky top-0 border-b border-white/10">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSidebarOpen(true)}
        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center cursor-pointer shadow-lg shadow-blue-500/30"
      >
        <Menu className="text-white text-lg" />
      </motion.div>

      <motion.img
        whileHover={{ scale: 1.05, rotate: 5 }}
        onClick={() => navigate("/")}
        src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
        alt="Logo"
        className="h-10 sm:h-12 mx-auto cursor-pointer"
      />

      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl px-3 py-2 rounded-xl font-bold text-sm border border-emerald-500/30 shadow-lg shadow-emerald-500/20"
        >
          ${user.balance.toFixed(2)}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDeposit}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-3 py-2 rounded-xl text-sm shadow-lg shadow-green-500/30 transition-all cursor-pointer"
        >
          Deposit
        </motion.button>
      </div>
    </motion.header>

    <main className="relative z-10 px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full mb-4 shadow-lg"
          >
            <SettingsIcon className="w-6 h-6 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          </motion.div>
          <p className="text-gray-400">Manage your account preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="text-blue-400" /> Profile Settings
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Username", value: user.username, modal: "username" },
                  { label: "Email", value: user.email, modal: "email" },
                  { label: "Phone", value: user.phone, modal: "phone" }
                ].map(({ label, value, modal }) => (
                  <div key={label} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">{label}</p>
                      <p className="font-semibold text-sm truncate max-w-[120px]">{value}</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openModal(modal)} className="px-4 py-2 bg-blue-600 rounded-xl text-sm cursor-pointer">
                      Edit
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Settings */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Cpu className="text-purple-400" /> AI Assistant
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className={`font-semibold ${user.aiSettings.activated ? 'text-green-400' : 'text-red-400'}`}>
                      {user.aiSettings.activated ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleAI} className={`px-4 py-2 rounded-xl text-sm cursor-pointer ${user.aiSettings.activated ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
                    {user.aiSettings.activated ? 'Deactivate' : 'Activate'}
                  </motion.button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Remaining Tries</p>
                    <p className="font-semibold">{user.aiSettings.remainingTries}</p>
                  </div>
                  {user.aiSettings.plan !== 'enterprise' && (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openModal('aiUpgrade')} className="px-4 py-2 bg-yellow-600 rounded-xl text-sm cursor-pointer">
                      Upgrade
                    </motion.button>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Plan</p>
                  <p className="font-semibold capitalize">{user.aiSettings.plan}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="text-green-400" /> Payment Methods
              </h3>
              <div className="space-y-3">
                {user.paymentMethods.map((method, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <div>
                      <p className="font-semibold capitalize">{method.type}</p>
                      <p className="text-sm text-gray-400">{method.details}</p>
                    </div>
                    {method.primary ? (
                      <span className="px-2 py-1 bg-green-600 text-xs rounded-full">Primary</span>
                    ) : (
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setPrimaryPayment(i)} className="px-3 py-1 bg-blue-600 text-xs rounded-full cursor-pointer">
                        Set Primary
                      </motion.button>
                    )}
                  </div>
                ))}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => showToast('info', 'Add payment method coming soon')} className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 transition-colors cursor-pointer">
                  + Add Payment Method
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette className="text-amber-400" /> Preferences
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'notifications', label: 'Push Notifications', icon: Bell },
                  { key: 'sound', label: 'Sound Effects', icon: Zap },
                  { key: 'autoDeposit', label: 'Auto Deposit', icon: Wallet },
                  { key: 'twoFactor', label: 'Two-Factor Auth', icon: Shield }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-gray-400" />
                      <span className="text-sm">{label}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => togglePreference(key)}
                      className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${user.preferences[key] ? 'bg-green-500' : 'bg-gray-600'}`}
                    >
                      <motion.div
                        className={`w-4 h-4 bg-white rounded-full m-1 ${user.preferences[key] ? 'ml-7' : 'ml-1'}`}
                        layout
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="text-red-400" /> Security
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Change Password</p>
                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={updatePassword} className="w-full mt-3 py-2 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg text-sm font-semibold cursor-pointer">
                    Update Password
                  </motion.button>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-sm text-gray-400">Last Login</p>
                  <p className="text-sm">{new Date(user.security.lastLogin).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Theme & Language */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="text-cyan-400" /> Theme & Language
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Theme</p>
                  <div className="flex gap-2">
                    {['dark', 'light', 'auto'].map(theme => (
                      <motion.button
                        key={theme}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => changeTheme(theme)}
                        className={`px-3 py-2 rounded-lg text-sm capitalize cursor-pointer ${user.preferences.theme === theme ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300'}`}
                      >
                        {theme}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Language</p>
                  <select
                    value={user.preferences.language}
                    onChange={(e) => {
                      setUser(prev => ({ ...prev, preferences: { ...prev.preferences, language: e.target.value } }));
                      showToast('success', 'Language preference updated');
                    }}
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  </div>
);
};

export default Settings;