import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/CountdownPage.css';

const CountdownPage = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate();

  // ✅ Stable function using useCallback
  const checkStatus = useCallback(async () => {
    try {
      // ⚠️ CHANGE THIS URL IN PRODUCTION
      const response = await axios.get('http://localhost:8080/api/status');
      const data = response.data;

      if (data.millisecondsUntilUnlock > 0) {
        calculateTimeLeft(data.millisecondsUntilUnlock);
      }
    } catch (error) {
      console.error('Error checking status:', error);
    }
  }, []);

  const calculateTimeLeft = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  // ✅ Fixed useEffect dependency issue
  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  // Handle browser back button
  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      sessionStorage.removeItem('anniversary_unlocked');
      sessionStorage.removeItem('date_reached');
      navigate('/');
      window.location.reload();
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  // Animated number component
  const AnimatedNumber = ({ value }) => (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 15, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {String(value).padStart(2, '0')}
      </motion.span>
    </AnimatePresence>
  );

  return (
    <div className="countdown-page">
      {/* Background Hearts */}
      <div className="background-hearts">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-heart"
            style={{
              left: `${10 + i * 16}%`,
              top: `${15 + (i % 2) * 55}%`,
              animationDelay: `${i * 1}s`
            }}
          >
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '💖' : '💗'}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="countdown-box"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="countdown-lock">🔒</div>

        <h1 className="countdown-title">You Found It! 💕</h1>
        <p className="countdown-subtitle">But our story isn't ready yet...</p>

        <div className="heart-container">
          <div className="heart-shape">
            <svg viewBox="0 0 32 29" className="heart-svg">
              <defs>
                <linearGradient id="heartGradient">
                  <stop offset="0%" stopColor="#ff69b4" />
                  <stop offset="50%" stopColor="#ffb6c1" />
                  <stop offset="100%" stopColor="#ffc0cb" />
                </linearGradient>
              </defs>
              <path
                d="M16,28.261c0,0-14-7.926-14-17.046c0-9.356,13.159-10.399,14-0.454c1.011-9.938,14-8.903,14,0.454C30,20.335,16,28.261,16,28.261z"
                fill="url(#heartGradient)"
                stroke="#ff69b4"
                strokeWidth="0.4"
              />
            </svg>

            {/* Names */}
            <motion.div className="names-top">
              <div className="name-text">Pageli</div>
              <div>💕</div>
              <div className="name-text">Dhana</div>
            </motion.div>

            {/* Countdown */}
            <div className="countdown-numbers">
              <div className="time-row">
                <div className="time-unit">
                  <AnimatedNumber value={timeLeft.days || 0} />
                  <div className="label">Days</div>
                </div>
                <div className="time-unit">
                  <AnimatedNumber value={timeLeft.hours || 0} />
                  <div className="label">Hours</div>
                </div>
              </div>

              <div className="time-row">
                <div className="time-unit">
                  <AnimatedNumber value={timeLeft.minutes || 0} />
                  <div className="label">Min</div>
                </div>
                <div className="time-unit">
                  <AnimatedNumber value={timeLeft.seconds || 0} />
                  <div className="label">Sec</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Info */}
        <div className="date-info">
          <p>✨ Our story unlocks on ✨</p>
          <p>April 7th, 2026</p>
          <p>at 12:00 AM</p>
        </div>

        <div className="message-box">
          <p>💕 Worth the wait 💕</p>
        </div>
      </motion.div>
    </div>
  );
};

export default CountdownPage;