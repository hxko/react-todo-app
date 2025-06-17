import React, { useEffect, useRef } from "react";

// Simple Splash Cursor effect
const SplashCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    const splash = (e: MouseEvent) => {
      if (splashRef.current) {
        splashRef.current.style.left = `${e.clientX}px`;
        splashRef.current.style.top = `${e.clientY}px`;
        splashRef.current.classList.remove("active");
        void splashRef.current.offsetWidth; // force reflow
        splashRef.current.classList.add("active");
      }
    };
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mousedown", splash);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousedown", splash);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#00bcd4",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "background 0.2s"
        }}
      />
      <div
        ref={splashRef}
        className="splash-cursor"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 80, // Increased size
          height: 80, // Increased size
          borderRadius: "50%",
          background: "rgba(0,188,212,0.5)", // More visible
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%) scale(0)",
          transition: "transform 0.7s cubic-bezier(.22,1.01,.36,1), opacity 0.7s",
          opacity: 0
        }}
      />
      <style>{`
        .splash-cursor.active {
          transform: translate(-50%, -50%) scale(1.8); // Larger scale
          opacity: 0.8; // More visible
          transition: transform 0.7s cubic-bezier(.22,1.01,.36,1), opacity 0.7s;
        }
        .splash-cursor {
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default SplashCursor;
