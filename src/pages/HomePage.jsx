import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

      * { box-sizing: border-box; margin: 0; padding: 0; }

      .bg-grid {
        background-size: 50px 50px;
        background-image:
          linear-gradient(to right, rgba(6, 182, 212, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(6, 182, 212, 0.04) 1px, transparent 1px);
      }

      @keyframes shutterTop {
        0%, 85%, 100% { transform: scaleY(0); }
        90%, 94% { transform: scaleY(1); }
      }
      @keyframes shutterBottom {
        0%, 85%, 100% { transform: scaleY(0); }
        90%, 94% { transform: scaleY(1); }
      }
      .shutter-top {
        animation: shutterTop 6s infinite cubic-bezier(0.8, 0, 0.2, 1);
        transform-origin: top;
      }
      .shutter-bottom {
        animation: shutterBottom 6s infinite cubic-bezier(0.8, 0, 0.2, 1);
        transform-origin: bottom;
      }

      @keyframes irisScan {
        0%, 100% { transform: translate(0, 0); }
        20% { transform: translate(-6px, 2px); }
        40% { transform: translate(6px, -3px); }
        60% { transform: translate(-3px, 5px); }
        80% { transform: translate(4px, 1px); }
      }
      .iris-anim { animation: irisScan 15s infinite ease-in-out; }

      @keyframes spin { 100% { transform: rotate(360deg); } }
      .spin-slow { animation: spin 20s linear infinite; transform-origin: center; }
      .spin-slow-reverse { animation: spin 25s linear infinite reverse; transform-origin: center; }

      @keyframes scanLine {
        0% { transform: translateY(-70px); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(70px); opacity: 0; }
      }
      .scan-line { animation: scanLine 4s linear infinite; }

      @keyframes sweep {
        0% { transform: translateX(-100%) skewX(-15deg); }
        100% { transform: translateX(200%) skewX(-15deg); }
      }
      .group:hover .sweep-layer {
        animation: sweep 1s ease-in-out;
      }

      .selection-cyan::selection {
        background-color: rgba(6, 182, 212, 0.3);
      }
    `;
    document.head.appendChild(style);
    
    // Set body background
    const originalBg = document.body.style.backgroundColor;
    const originalOverflow = document.body.style.overflow;
    document.body.style.backgroundColor = '#030712';
    document.body.style.overflow = 'hidden';

    return () => {
      document.head.removeChild(style);
      document.body.style.backgroundColor = originalBg;
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    setStarted(true);
    // Simulate loading/transition before navigating
    setTimeout(() => {
        navigate('/new-analysis');
    }, 1000);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center relative selection-cyan"
      style={{ backgroundColor: '#030712', color: 'white', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60"></div>

      {/* Glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '900px',
          background: 'rgba(8, 51, 68, 0.1)',
          filter: 'blur(100px)',
        }}
      ></div>

      {/* Corner brackets */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: 'rgba(8, 145, 178, 0.4)' }}></div>
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: 'rgba(8, 145, 178, 0.4)' }}></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: 'rgba(8, 145, 178, 0.4)' }}></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: 'rgba(8, 145, 178, 0.4)' }}></div>


      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full">

        {/* Eye logo */}
        <div
          className="relative flex items-center justify-center mb-14"
          style={{ width: '320px', height: '160px' }}
        >
          <svg
            width="320"
            height="160"
            viewBox="0 0 320 160"
            className="absolute inset-0"
            style={{ filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.2))' }}
          >
            <defs>
              <clipPath id="eye-shape">
                <path d="M 15 80 Q 160 -25 305 80 Q 160 185 15 80 Z" />
              </clipPath>
              <radialGradient id="iris-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.05" />
                <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="85%" stopColor="#0891b2" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#164e63" stopOpacity="1" />
              </radialGradient>
            </defs>

            {/* Outer glow path */}
            <path
              d="M 15 80 Q 160 -25 305 80 Q 160 185 15 80 Z"
              fill="none"
              stroke="#0891b2"
              strokeWidth="4"
              opacity="0.3"
              style={{ filter: 'blur(3px)' }}
            />

            {/* Eye interior */}
            <g clipPath="url(#eye-shape)">
              <rect width="320" height="160" fill="#040811" />
              <path d="M 0 40 L 320 40 M 0 80 L 320 80 M 0 120 L 320 120" stroke="#0f172a" strokeWidth="1" />
              <path d="M 80 0 L 80 160 M 160 0 L 160 160 M 240 0 L 240 160" stroke="#0f172a" strokeWidth="1" />

              {/* Iris group with animation */}
              <g className="iris-anim" filter="none">
                <circle cx="160" cy="80" r="50" fill="url(#iris-gradient)" stroke="#06b6d4" strokeWidth="1.5" />
                <circle cx="160" cy="80" r="42" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="8 6" className="spin-slow" opacity="0.8" />
                <circle cx="160" cy="80" r="35" fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="3 9" className="spin-slow-reverse" opacity="0.6" />
                <circle cx="160" cy="80" r="18" fill="#020617" stroke="#0891b2" strokeWidth="2" />
                <path d="M 160 30 L 160 38 M 160 122 L 160 130 M 110 80 L 118 80 M 202 80 L 210 80" stroke="#a5f3fc" strokeWidth="2" opacity="0.7" />
                <circle cx="170" cy="70" r="5" fill="#ffffff" opacity="0.9" style={{ filter: 'blur(0.5px)' }} />
                <circle cx="152" cy="62" r="2.5" fill="#ffffff" opacity="0.6" />
              </g>
            </g>

            {/* Eye outline */}
            <path d="M 15 80 Q 160 -25 305 80 Q 160 185 15 80 Z" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.9" />
          </svg>

          {/* Scan line */}
          <div
            className="absolute z-10 pointer-events-none rounded-full scan-line"
            style={{
              width: '290px',
              height: '2px',
              backgroundColor: '#22d3ee',
              boxShadow: '0 0 20px 3px rgba(34, 211, 238, 0.5)',
            }}
          ></div>

          {/* Shutter top */}
          <div
            className="absolute shutter-top z-20 flex items-end justify-center"
            style={{
              top: '-15px',
              left: '-15px',
              right: '-15px',
              height: '95px',
              backgroundColor: '#030712',
              borderBottom: '2px solid rgba(6, 182, 212, 0.5)',
              paddingBottom: '6px',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div
              style={{
                width: '25%',
                height: '2px',
                backgroundColor: 'rgba(34, 211, 238, 0.6)',
                borderRadius: '9999px',
              }}
            ></div>
          </div>

          {/* Shutter bottom */}
          <div
            className="absolute shutter-bottom z-20 flex items-start justify-center"
            style={{
              bottom: '-15px',
              left: '-15px',
              right: '-15px',
              height: '95px',
              backgroundColor: '#030712',
              borderTop: '2px solid rgba(6, 182, 212, 0.5)',
              paddingTop: '6px',
              boxShadow: '0 -15px 30px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div
              style={{
                width: '25%',
                height: '2px',
                backgroundColor: 'rgba(34, 211, 238, 0.6)',
                borderRadius: '9999px',
              }}
            ></div>
          </div>
        </div>

        {/* Text section */}
        <div className="text-center mb-14 relative w-full flex flex-col items-center" style={{ gap: '28px' }}>
          {/* Background glow */}
          <div
            className="absolute z-0 pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              maxWidth: '576px',
              height: '100%',
              background: 'rgba(8, 145, 178, 0.1)',
              filter: 'blur(50px)',
            }}
          ></div>

          <h1
            className="relative z-10 font-light"
            style={{
              fontSize: 'clamp(2.5rem, 3.8rem, 3.8rem)',
              letterSpacing: '0.3em',
              background: 'linear-gradient(to right, #ffffff, #cffafe, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginLeft: '0.3em',
            }}
          >
            RetinAL
          </h1>

          <div className="relative z-10 flex flex-col items-center" style={{ gap: '10px' }}>
            <p
              style={{
                color: 'rgba(34, 211, 238, 0.9)',
                letterSpacing: '0.3em',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                fontWeight: '500',
              }}
            >
              Yapay Zeka Destekli
            </p>
            <p
              style={{
                color: '#94a3b8',
                letterSpacing: '0.15em',
                fontSize: '1rem',
                fontWeight: '300',
              }}
            >
              Gelişmiş Göz Sağlığı ve Teşhis Analizi
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center overflow-hidden"
          style={{
            gap: '20px',
            padding: '18px 64px',
            fontWeight: '600',
            color: '#06b6d4',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            backgroundColor: 'transparent',
            borderRadius: '999px',
            border: '2px solid #06b6d4',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 10,
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Sweep layer */}
          <div
            className="sweep-layer absolute inset-0 z-0"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(6, 182, 212, 0.2), transparent)',
              transform: 'translateX(-150%) skewX(-15deg)',
            }}
          ></div>

          <span className="relative z-10 flex items-center" style={{ gap: '14px' }}>
            {started ? 'BAŞLANGIÇ...' : 'BAŞLA'}
            <svg
              className="transition-transform duration-300 group-hover:translate-x-2"
              style={{ width: '20px', height: '20px' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Bottom status bar */}
      <div
        className="absolute w-full flex justify-center pointer-events-none"
        style={{
          bottom: '48px',
          fontSize: '10px',
          color: '#475569',
          letterSpacing: '0.25em',
          fontFamily: 'monospace',
          opacity: 0.7,
        }}
      >
        SECURE MEDICAL PROTOCOL // 256-BIT ENCRYPTION // AI DIAGNOSTICS READY
      </div>
    </div>
  );
};

export default HomePage;
