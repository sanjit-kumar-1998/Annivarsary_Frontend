import React, { useEffect, useRef, useState } from "react";

const BackgroundMusic = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Try autoplay — most mobile browsers will block this
    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowBtn(false);
        })
        .catch(() => {
          // Autoplay blocked — show tap-to-play button
          setShowBtn(true);
        });
    };

    tryPlay();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  // When user interacts anywhere on the page, try playing
  useEffect(() => {
    if (isPlaying) return;

    const unlock = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setShowBtn(false);
          })
          .catch(() => {});
      }
    };

    document.addEventListener("touchstart", unlock, { once: true });
    document.addEventListener("click", unlock, { once: true });

    return () => {
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };
  }, [isPlaying]);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setShowBtn(false);
      }).catch(() => {});
    }
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        background: isPlaying
          ? "linear-gradient(135deg, #ff1744, #ff69b4)"
          : "rgba(255,255,255,0.85)",
        color: isPlaying ? "#fff" : "#ff1493",
        border: "2px solid #ff69b4",
        borderRadius: "50%",
        width: "52px",
        height: "52px",
        fontSize: "1.4em",
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(255,20,147,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        WebkitTapHighlightColor: "transparent",
        transition: "all 0.25s",
        // Pulse animation hint when music is blocked
        animation: showBtn && !isPlaying ? "pulse-music 1.5s ease-in-out infinite" : "none",
      }}
      title={isPlaying ? "Pause music" : "Play music"}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
    >
      {isPlaying ? "🎵" : "🔇"}
      <style>{`
        @keyframes pulse-music {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 16px rgba(255,20,147,0.4); }
          50% { transform: scale(1.15); box-shadow: 0 4px 28px rgba(255,20,147,0.7); }
        }
      `}</style>
    </button>
  );
};

export default BackgroundMusic;
