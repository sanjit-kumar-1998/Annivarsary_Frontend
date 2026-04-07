import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackgroundMusic from "./BackgroundMusic";
import "../styles/Celebration.css";

const Celebration = () => {
  const navigate = useNavigate();
  const [candlesLit, setCandlesLit] = useState(true);
  const [blownOut, setBlownOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const blowCandles = () => {
    if (!blownOut) {
      setCandlesLit(false);
      setBlownOut(true);
    }
  };

  return (
    <div className="celebration-page">
      <BackgroundMusic src="/sounds/celebration.mp3" />
      {/* Confetti */}
      <div className="confetti-container" aria-hidden="true">
        {[...Array(36)].map((_, i) => (
          <motion.div
            key={i}
            className={`confetti-piece confetti-${i % 6}`}
            style={{ left: `${(i * 11 + 5) % 100}%` }}
            initial={{ y: -30, opacity: 0, rotate: 0 }}
            animate={{ y: "115vh", opacity: [0, 1, 1, 0], rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
            transition={{
              duration: 3.5 + (i % 4) * 0.6,
              delay: (i % 7) * 0.4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="floating-hearts-cele" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="heart-cele"
            style={{ left: `${(i * 19 + 7) % 100}%`, fontSize: `${14 + (i % 3) * 6}px` }}
            animate={{ y: [0, -28, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.7 }}
          >
            {i % 4 === 0 ? "💕" : i % 4 === 1 ? "💖" : i % 4 === 2 ? "💗" : "❤️"}
          </motion.div>
        ))}
      </div>

      <div className="celebration-content">

        {/* Title */}
        <motion.div
          className="anniversary-title-wrap"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.p
            className="cele-label"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉 Happy 1st Anniversary 🎉
          </motion.p>
          <motion.h1
            className="cele-title"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,20,147,0.5)",
                "0 0 40px rgba(255,20,147,0.9)",
                "0 0 20px rgba(255,20,147,0.5)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Sanwika 💖
          </motion.h1>
          <p className="cele-subtitle">April 7, 2025 — April 7, 2026</p>
        </motion.div>

        {/* CSS CAKE */}
        <motion.div
          className="cake-wrapper"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, type: "spring", stiffness: 80 }}
        >
          <div className="cake" aria-label="Anniversary cake">

            {/* Candles */}
            <div className="candles-row">
              {[0, 1, 2].map((i) => (
                <div key={i} className="candle-wrap">
                  {candlesLit && (
                    <div className="flame-container">
                      <motion.div
                        className="flame-outer"
                        animate={{ scaleX: [1, 1.25, 0.85, 1.15, 1], scaleY: [1, 0.85, 1.15, 0.9, 1] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.12 }}
                      />
                      <motion.div
                        className="flame-inner"
                        animate={{ scaleX: [1, 1.3, 0.8, 1.2, 1], scaleY: [1, 0.8, 1.2, 0.9, 1] }}
                        transition={{ duration: 0.45, repeat: Infinity, delay: i * 0.1 + 0.08 }}
                      />
                    </div>
                  )}
                  {blownOut && (
                    <motion.div
                      className="smoke"
                      initial={{ opacity: 0.9, scaleX: 1 }}
                      animate={{ opacity: 0, scaleX: 3, y: -20 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <div className={`candle candle-${i}`} />
                </div>
              ))}
            </div>

            {/* Top tier */}
            <div className="cake-top-tier">
              <div className="cake-top-frosting-top" />
              <div className="cake-top-content">
                <span className="cake-heart-deco">♥</span>
                <span className="cake-text-deco">1</span>
              </div>
            </div>

            {/* Mid tier */}
            <div className="cake-mid-tier">
              <div className="cake-frosting-drips">
                <div className="drip drip-a" />
                <div className="drip drip-b" />
                <div className="drip drip-c" />
              </div>
              <div className="cake-mid-content">
                <span className="cake-star-deco">★</span>
                <span className="cake-star-deco">★</span>
                <span className="cake-star-deco">★</span>
              </div>
            </div>

            {/* Base tier */}
            <div className="cake-base-tier">
              <div className="cake-frosting-drips cake-base-drips">
                <div className="drip drip-d" />
                <div className="drip drip-e" />
                <div className="drip drip-f" />
                <div className="drip drip-g" />
              </div>
              <div className="cake-base-dots">
                <span className="c-dot" />
                <span className="c-dot" />
                <span className="c-dot" />
                <span className="c-dot" />
                <span className="c-dot" />
              </div>
            </div>

            {/* Plate */}
            <div className="cake-plate" />
          </div>

          {!blownOut ? (
            <motion.button
              className="blow-btn"
              onClick={blowCandles}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              🌬️ Blow the Candles!
            </motion.button>
          ) : (
            <motion.p
              className="blown-msg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              🌟 Make a wish, my love! 🌟
            </motion.p>
          )}
        </motion.div>

        {/* Love Letter */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="love-message-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="lmc-heart-top">💝</div>
              <h2 className="lmc-heading">My Dearest Pagali,</h2>

              <p className="lmc-text">
                One whole year. 365 days of good mornings, late night calls,
                silly little fights we forgot the next day, and a love that
                kept growing stronger with every single moment.
              </p>

              <p className="lmc-text">
                You are the best thing that has ever happened to me. You walked
                into my life through a simple "Hi" and turned everything into
                something magical I never want to let go of.
              </p>

              <div className="lmc-divider">💕 · · · 💕</div>

              <p className="lmc-text">
                I love the way you laugh. The way you argue with me and then
                pretend you're not smiling. I love your voice, your heart, and
                every tiny imperfect perfect thing about you.
              </p>

              <p className="lmc-text">
                And that day in August — when you said those three words first —
                I felt my whole world shift. Thank you for being brave enough
                to say it. I've loved you every day since. 💌
              </p>

              <div className="lmc-quote">
                "Same screen, same moment, same heart — even Saiyaara was
                better because I watched it with you."
              </div>

              <p className="lmc-text">
                This is just year one. I want every year after this to be ours
                too — filled with memories, adventures, and a love that never
                stops growing. One day I'll hold your hand for real. Until
                then, I'm yours completely. 🫶
              </p>

              <p className="lmc-signature">Happy 1st Anniversary, Pagali 💖</p>
              <p className="lmc-from">— Your Dhana, always 🥺</p>
              <div className="lmc-tag">Sanwika Forever 💕</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back button */}
        <motion.button
          className="back-home-btn"
          onClick={() => navigate("/home")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Our Story
        </motion.button>

      </div>
    </div>
  );
};

export default Celebration;
