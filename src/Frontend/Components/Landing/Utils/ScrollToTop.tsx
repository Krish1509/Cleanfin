import React, { useState, useEffect } from 'react';
import '../../../Style/CSS/Utils/ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [circleRadius, setCircleRadius] = useState(40);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setCircleRadius(25);
      } else if (window.innerWidth <= 768) {
        setCircleRadius(30);
      } else {
        setCircleRadius(40);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button 
      className="scroll-to-top-btn" 
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <div className="progress-circle">
        <svg className="progress-svg" viewBox="0 0 100 100">
          <circle
            className="progress-bg"
            cx="50"
            cy="50"
            r={circleRadius}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="2"
          />
          <circle
            className="progress-fill"
            cx="50"
            cy="50"
            r={circleRadius}
            fill="none"
            stroke="#1C3F3A"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * circleRadius}`}
            strokeDashoffset={`${2 * Math.PI * circleRadius * (1 - scrollProgress / 100)}`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <svg className="arrow-svg" viewBox="0 0 24 24" width="25" height="25">
          <path
            d="M7 14l5-5 5 5"
            stroke="#1C3F3A"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

export default ScrollToTop; 