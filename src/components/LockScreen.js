import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/LockScreen.css";

const LockScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : "http://10.227.233.57:8080";

   const checkStatus = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/status`);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error checking status:", error);
      setMessage("💕 Enter the password to unlock 💕");
    }
  }, [BASE_URL]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/unlock`, {
        password: password,
      });

      const data = response.data;

      if (data.unlocked) {
        // Password is correct!
        setMessage(data.message);
        setShowConfetti(true);
        setWrongAttempts(0);

        setTimeout(() => {
          // canAttempt tells us if date has arrived
          // true = HomePage, false = CountdownPage
          onUnlock(data.canAttempt);
        }, 2500);
      } else {
        // Wrong password
        setMessage(data.message);
        setWrongAttempts(wrongAttempts + 1);
        setPassword("");
      }
    } catch (error) {
      console.error("Error unlocking:", error);
      setMessage("Something went wrong. Try again!");
    }
    setIsLoading(false);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div className="lock-screen">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      {/* Romantic Hearts Background */}
      <div className="romantic-hearts">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="heart-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            {i % 3 === 0 ? "❤️" : i % 3 === 1 ? "💕" : "💖"}
          </div>
        ))}
      </div>

      <div className="lock-box">
        {/* Lock Icon */}
        <motion.div
          className="lock-emoji"
          animate={{
            rotate: [0, -15, 15, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          🔒
        </motion.div>

        <motion.h1
          className="lock-title"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          💕 Our Love Story 💕
        </motion.h1>

        <p className="lock-subtitle">Something special is waiting for you...</p>

        <motion.div
          className="unlock-box"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <p className="unlock-text">🎁 Ready to Unlock? 🎁</p>
          <p className="unlock-subtext">Enter the secret password</p>
        </motion.div>

        {message && (
          <motion.p
            className={`lock-message ${wrongAttempts > 0 ? "error-msg" : "info-msg"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}

        <form onSubmit={handleUnlock} className="lock-form">
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="password-field"
              autoComplete="off"
            />
            <button
              type="button"
              className="key-button"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide" : "Show"}
            >
              {showPassword ? "🔓" : "🔑"}
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="unlock-btn"
            whileTap={{ scale: 0.97 }}
          >
            {isLoading ? (
              <>
                Unlocking...
                <span className="spinner"></span>
              </>
            ) : (
              "💝 Unlock"
            )}
          </motion.button>
        </form>

        <motion.button
          className="hint-btn"
          onClick={toggleHint}
          whileTap={{ scale: 0.97 }}
        >
          {showHint ? "🙈 Hide Hint" : "💡 Need a Hint?"}
        </motion.button>

        {/* Simple Hint Message */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              className="hint-box"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="hint-message">
                💖 What I call you + What you call me + Your birthday (DD) + My
                birthday (DD)
              </p>
              <p className="hint-example">
                Example: Pageli + dhana + 16 + 15 = Pagelidhana1615
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {wrongAttempts >= 3 && (
          <motion.div
            className="warning-message"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <p>🚫 This is private! Only she knows the password 💕</p>
          </motion.div>
        )}

        <div className="love-quote">"From our first chat to forever..." 💞</div>
      </div>
    </div>
  );
};

export default LockScreen;
