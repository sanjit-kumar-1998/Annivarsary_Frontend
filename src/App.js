import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CountdownPage from './components/CountdownPage';
import LockScreen from './components/LockScreen';
import HomePage from './components/HomePage';
import Celebration from './components/Celebration';
import HeartCursor from './components/HeartCursor';
import './styles/App.css';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [dateReached, setDateReached] = useState(false);

  useEffect(() => {
    const unlocked = sessionStorage.getItem('anniversary_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
      const dateStatus = sessionStorage.getItem('date_reached');
      setDateReached(dateStatus === 'true');
    }
  }, []);

  const handleUnlock = (canAttempt) => {
    setIsUnlocked(true);
    setDateReached(canAttempt);
    sessionStorage.setItem('anniversary_unlocked', 'true');
    sessionStorage.setItem('date_reached', canAttempt.toString());
  };

  return (
    <Router>
      <div className="App">
        <HeartCursor />
        <Routes>
          <Route
            path="/"
            element={
              !isUnlocked ? (
                <LockScreen onUnlock={handleUnlock} />
              ) : (
                <Navigate to="/menu" replace />
              )
            }
          />

          <Route
            path="/menu"
            element={
              isUnlocked ? (
                <MenuPage dateReached={dateReached} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/countdown"
            element={
              isUnlocked ? (
                <CountdownPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/home"
            element={
              isUnlocked ? (
                <HomePage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* ✅ Celebration page — accessible once unlocked */}
          <Route
            path="/celebration"
            element={
              isUnlocked ? (
                <Celebration />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Menu Page Component
const MenuPage = ({ dateReached }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!dateReached) {
      navigate('/countdown');
    } else {
      setShowMenu(true);
    }
  }, [dateReached, navigate]);

  const handleBack = () => {
    sessionStorage.removeItem('anniversary_unlocked');
    sessionStorage.removeItem('date_reached');
    navigate('/');
    window.location.reload();
  };

  if (!showMenu) return null;

  return (
    <div className="menu-page">
      <div className="menu-hearts">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="menu-heart"
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              animationDelay: `${(i % 5) * 0.8}s`,
              fontSize: `${25 + (i % 3) * 10}px`,
            }}
          >
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '💖' : '💗'}
          </div>
        ))}
      </div>

      <motion.div
        className="menu-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="menu-title">What Would You Like to See? 💕</h1>
        <p className="menu-subtitle">Choose your journey...</p>

        <div className="menu-options">
          <motion.button
            className="menu-option"
            onClick={() => navigate('/countdown')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="option-icon">⏰</div>
            <div className="option-title">Countdown</div>
            <div className="option-desc">See the countdown to our special day</div>
          </motion.button>

          <motion.button
            className="menu-option menu-option-primary"
            onClick={() => navigate('/home')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="option-icon">💕</div>
            <div className="option-title">Our Story</div>
            <div className="option-desc">Explore our beautiful love story</div>
          </motion.button>
        </div>

        <motion.button
          className="menu-back-button"
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Lock Screen
        </motion.button>
      </motion.div>
    </div>
  );
};

export default App;