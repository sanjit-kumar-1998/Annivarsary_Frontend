import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackgroundMusic from "./BackgroundMusic";
import "../styles/HomePage.css";

const TOTAL_PAGES = 6;

// Page transition variants — simple fade only, no translate/scale that causes layout shifts
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};
const pageTransition = { duration: 0.35 };

// ── PAGE 0: INTRO ─────────────────────────────────────────────────────────────
const FirstScreen = ({ onNext }) => (
  <motion.div
    className="first-screen"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
  >
    <div className="floating-hearts-first">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="heart-float-first"
          style={{ left: `${(i * 37 + 11) % 100}%`, fontSize: `${20 + (i % 3) * 8}px` }}
          animate={{ y: [0, -22, 0], rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.6 }}
        >
          {i % 3 === 0 ? "💕" : i % 3 === 1 ? "💖" : "💗"}
        </motion.div>
      ))}
    </div>

    <div className="main-heart-container">
      <motion.div
        className="big-heart-shape"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 32 29" className="heart-svg-main">
            <defs>
              <linearGradient id="hmg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#ff1744" />
                <stop offset="50%"  stopColor="#ff6b9d" />
                <stop offset="100%" stopColor="#ffa5bd" />
              </linearGradient>
            </defs>
            <path
              d="M16,28.261c0,0-14-7.926-14-17.046c0-9.356,13.159-10.399,14-0.454c1.011-9.938,14-8.903,14,0.454C30,20.335,16,28.261,16,28.261z"
              fill="url(#hmg)"
              stroke="#ff1744"
              strokeWidth="0.3"
            />
          </svg>
          <div className="names-in-main-heart">
            <motion.div className="main-name" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}>
              Sanjit
            </motion.div>
            <motion.div className="main-heart-symbol" initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ delay: 1.5, duration: 1 }}>
              <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>💕</motion.div>
            </motion.div>
            <motion.div className="main-name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }}>
              Swatika
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hashtag-name"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.h1
          animate={{
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 20px rgba(139,0,139,0.5)",
              "0 0 30px rgba(139,0,139,0.8)",
              "0 0 20px rgba(139,0,139,0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Sanwika
        </motion.h1>
      </motion.div>

      <motion.p
        className="first-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        Our Love Story Begins...
      </motion.p>

      <motion.button
        className="continue-button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        onClick={onNext}
        whileTap={{ scale: 0.95 }}
      >
        Start Our Journey 💕
      </motion.button>
    </div>
  </motion.div>
);

// ── PAGE 1: FIRST CHAT ────────────────────────────────────────────────────────
const Page1 = ({ onNext, onPrev, onTouchStart, onTouchEnd }) => (
  <motion.div
    className="story-page"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <div className="story-card-page">
      <div className="page-num-badge">1 / 6</div>
      <div className="story-icon-page">📱</div>
      <h2 className="story-title-page">First Chat</h2>
      <p className="story-date-page">April 7th, 2025</p>
      <div className="story-divider" />
      <p className="story-text-page">
        It all started with a simple "Hi" on a dating app. Who knew that one
        message would change everything?
      </p>
      <p className="story-text-page">
        Our conversation flowed so naturally — hours felt like minutes. From
        the very first chat, I knew you were someone truly special. 💬✨
      </p>
      <div className="story-emoji-page">💕 💌 💕</div>
    </div>
    <div className="navigation-buttons">
      <button className="nav-button" onClick={onPrev}>← Prev</button>
      <button className="nav-button nav-button-next" onClick={onNext}>Next →</button>
    </div>
    <div className="swipe-hint">← Swipe or use buttons →</div>
  </motion.div>
);

// ── PAGE 2: SNAPCHAT ──────────────────────────────────────────────────────────
const Page2 = ({ onNext, onPrev, onTouchStart, onTouchEnd }) => (
  <motion.div
    className="story-page"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <div className="story-card-page">
      <div className="page-num-badge">2 / 6</div>
      <div className="story-icon-page">👻</div>
      <h2 className="story-title-page">Snapchat Days</h2>
      <p className="story-date-page">May 11th, 2025</p>
      <div className="story-divider" />
      <p className="story-text-page">
        From texts to snaps, our bond grew stronger every single day.
      </p>
      <p className="story-text-page">
        Late night conversations, silly selfies, voice notes that made my
        heart skip a beat — every notification from you was a reason to smile.
      </p>
      <p className="story-text-page">
        Those Snapchat streaks became the absolute highlight of my days. 📸💛
      </p>
      <div className="story-emoji-page">💗 👻 💗</div>
    </div>
    <div className="navigation-buttons">
      <button className="nav-button" onClick={onPrev}>← Prev</button>
      <button className="nav-button nav-button-next" onClick={onNext}>Next →</button>
    </div>
    <div className="swipe-hint">← Swipe or use buttons →</div>
  </motion.div>
);

// ── PAGE 3: I LOVE YOU ────────────────────────────────────────────────────────
const Page3 = ({ onNext, onPrev, onTouchStart, onTouchEnd }) => (
  <motion.div
    className="story-page story-page-scroll"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <div className="story-card-page">
      <div className="page-num-badge">3 / 6</div>
      <div className="story-icon-page">💌</div>
      <h2 className="story-title-page">You Said I Love You</h2>
      <p className="story-date-page">August 7th, 2025</p>
      <div className="story-divider" />
      <p className="story-text-page">
        August 7th, 2025 — a date I will never, ever forget for as long as I live.
      </p>
      <div className="story-quote-box">
        <p>"I love you."</p>
      </div>
      <p className="story-text-page">
        Three little words. But when they came from you, my whole world stopped
        for a moment — and then felt more complete than it ever had.
      </p>
      <p className="story-text-page">
        You were the first to say it, and I felt everything at once — warmth,
        joy, and a happiness I didn't know was possible through a screen.
      </p>
      <p className="story-text-page">
        That day I knew for certain — this is real. You are real. And what we
        have is something I will protect with everything I've got. 💖🥺
      </p>
      <div className="story-emoji-page">💖 💌 💖</div>
    </div>
    <div className="navigation-buttons">
      <button className="nav-button" onClick={onPrev}>← Prev</button>
      <button className="nav-button nav-button-next" onClick={onNext}>Next →</button>
    </div>
    <div className="swipe-hint">← Swipe or use buttons →</div>
  </motion.div>
);

// ── PAGE 4: EVERY DAY ─────────────────────────────────────────────────────────
const Page4 = ({ onNext, onPrev, onTouchStart, onTouchEnd }) => (
  <motion.div
    className="story-page story-page-scroll"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <div className="story-card-page">
      <div className="page-num-badge">4 / 6</div>
      <div className="story-icon-page">🌟</div>
      <h2 className="story-title-page">Every Day Together</h2>
      <p className="story-date-page">Our Beautiful Journey</p>
      <div className="story-divider" />
      <p className="story-text-page">
        From good mornings to good nights, you became my favourite part of
        every single day.
      </p>
      <div className="story-quote-box">
        <p>"Distance means nothing when someone means everything."</p>
      </div>
      <p className="story-text-page">
        We share our dreams, our fears, our laughs, and our tears. Every late
        night call, every voice note, every little thing you do makes me fall
        deeper for you.
      </p>
      <p className="story-text-page">
        You walked into my life and made it brighter in ways I never knew were
        possible. Every moment spent talking to you feels like home. 💖🌙
      </p>
      <div className="story-emoji-page">✨ 💝 ✨</div>
    </div>
    <div className="navigation-buttons">
      <button className="nav-button" onClick={onPrev}>← Prev</button>
      <button className="nav-button nav-button-next" onClick={onNext}>Next →</button>
    </div>
    <div className="swipe-hint">← Swipe or use buttons →</div>
  </motion.div>
);

// ── PAGE 5: SAIYAARA MOVIE ────────────────────────────────────────────────────
const Page5 = ({ onNext, onPrev, onTouchStart, onTouchEnd }) => (
  <motion.div
    className="story-page story-page-scroll"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <div className="story-card-page">
      <div className="page-num-badge">5 / 6</div>
      <div className="story-icon-page">🎬</div>
      <h2 className="story-title-page">Saiyaara — Our First Movie</h2>
      <p className="story-date-page">Our First Online Movie Date 🎥</p>
      <div className="story-divider" />
      <p className="story-text-page">
        We watched <em>Saiyaara</em> together online — our very first movie
        date, miles apart but feeling closer than ever before.
      </p>
      <div className="story-quote-box">
        <p>"Same screen, same moment, same heart."</p>
      </div>
      <p className="story-text-page">
        I loved every second of it — not just because of the film, but because
        I was experiencing it with you. Your reactions, your little comments,
        the way you got lost in the story — that made it perfect.
      </p>
      <p className="story-text-page">
        Saiyaara will always hold a special place for us. Our first film. Our
        first movie night. The beginning of many, many more to come. 🎬🍿
      </p>
      <div className="story-emoji-page">🎬 🍿 💕</div>
    </div>
    <div className="navigation-buttons">
      <button className="nav-button" onClick={onPrev}>← Prev</button>
      <button className="nav-button nav-button-next" onClick={onNext}>Next →</button>
    </div>
    <div className="swipe-hint">← Swipe or use buttons →</div>
  </motion.div>
);

// ── PAGE 6: CAN'T WAIT TO MEET ───────────────────────────────────────────────
const Page6 = ({ onPrev, onNavigate, onTouchStart, onTouchEnd }) => (
  <motion.div
    className="story-page story-page-scroll"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <div className="story-card-page">
      <div className="page-num-badge">6 / 6</div>
      <div className="story-icon-page">🤝</div>
      <h2 className="story-title-page">Can't Wait to Meet You</h2>
      <p className="story-date-page">Soon... 💕</p>
      <div className="story-divider" />
      <p className="story-text-page">
        I've seen your smile through screens, heard your laugh through calls,
        but I dream of the day I can hold your hand for real.
      </p>
      <div className="story-quote-box">
        <p>
          "Our first hug, our first look into each other's eyes in person —
          I'm counting down every single day."
        </p>
      </div>
      <p className="story-text-page">
        Until then, know that you're always in my heart. Distance is
        temporary, but our love is forever. 💝🫶
      </p>
      <div className="story-emoji-page">💕 🫶 💕</div>
    </div>

    <div className="final-card">
      <p className="final-message-text">
        "From strangers to soulmates, you're my forever person. Every moment
        with you is a memory I treasure. I love you more than words can say."
      </p>
      <p className="signature-text">— Your Sanjit 💖</p>
      <div className="hashtag-end">Sanwika Forever</div>

      <div className="final-nav-row">
        <button className="nav-button" onClick={onPrev}>← Back</button>
        <motion.button
          className="celebration-button"
          onClick={onNavigate}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 18px rgba(255,20,147,0.4)",
              "0 0 36px rgba(255,20,147,0.85)",
              "0 0 18px rgba(255,20,147,0.4)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🎉 Celebrate Our Anniversary 🎂
        </motion.button>
      </div>
    </div>
  </motion.div>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const scrollRef = useRef(null);

  // Scroll to top on page change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      if (currentPage > 0) {
        setCurrentPage((p) => p - 1);
      } else {
        sessionStorage.removeItem("anniversary_unlocked");
        sessionStorage.removeItem("date_reached");
        navigate("/");
        window.location.reload();
      }
    };
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [navigate, currentPage]);

  const nextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES));
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 0));
  }, []);

  // Native touch swipe — horizontal only, does not block vertical scroll
  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    // Only trigger swipe if clearly horizontal (not a scroll attempt)
    if (Math.abs(dx) > 80 && Math.abs(dx) > dy * 2) {
      if (dx < 0) setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES));
      else        setCurrentPage((p) => Math.max(p - 1, 0));
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, []);

  const sharedSwipe = { onTouchStart, onTouchEnd };

  return (
    <div className="home-page" ref={scrollRef}>
      <BackgroundMusic src="/sounds/sanwika.mp3" />
      <AnimatePresence mode="wait">
        {currentPage === 0 && <FirstScreen key="p0" onNext={nextPage} />}
        {currentPage === 1 && <Page1 key="p1" onNext={nextPage} onPrev={prevPage} {...sharedSwipe} />}
        {currentPage === 2 && <Page2 key="p2" onNext={nextPage} onPrev={prevPage} {...sharedSwipe} />}
        {currentPage === 3 && <Page3 key="p3" onNext={nextPage} onPrev={prevPage} {...sharedSwipe} />}
        {currentPage === 4 && <Page4 key="p4" onNext={nextPage} onPrev={prevPage} {...sharedSwipe} />}
        {currentPage === 5 && <Page5 key="p5" onNext={nextPage} onPrev={prevPage} {...sharedSwipe} />}
        {currentPage === 6 && <Page6 key="p6" onPrev={prevPage} onNavigate={() => navigate("/celebration")} {...sharedSwipe} />}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;