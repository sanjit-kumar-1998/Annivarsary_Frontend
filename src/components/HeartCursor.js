import React, { useEffect, useState } from 'react';
import '../styles/HeartCursor.css';

const HeartCursor = () => {
  const [hearts, setHearts] = useState([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    let touchTimeout;
    let lastTouch = { x: 0, y: 0, time: 0 };

    const createHeart = (x, y) => {
      const heart = {
        id: nextId,
        x: x,
        y: y,
        emoji: ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)]
      };

      setHearts(prev => [...prev, heart]);
      setNextId(prev => prev + 1);

      // Remove heart after animation completes
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id));
      }, 1500);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      // Create heart every 100ms when moving
      const now = Date.now();
      if (now - lastTouch.time > 100) {
        createHeart(e.clientX, e.clientY);
        lastTouch = { x: e.clientX, y: e.clientY, time: now };
      }
    };

    // Touch move handler for mobile
    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const now = Date.now();
      
      // Create heart every 100ms when touching and moving
      if (now - lastTouch.time > 100) {
        createHeart(touch.clientX, touch.clientY);
        lastTouch = { x: touch.clientX, y: touch.clientY, time: now };
      }
    };

    // Touch start handler
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      createHeart(touch.clientX, touch.clientY);
      lastTouch = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
      clearTimeout(touchTimeout);
    };
  }, [nextId]);

  return (
    <div className="heart-cursor-container">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-cursor"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default HeartCursor;