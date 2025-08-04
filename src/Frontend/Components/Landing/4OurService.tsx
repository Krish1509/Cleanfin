import React, { useState, useEffect, useCallback } from 'react';
import '../../Style/CSS/Landing/4OurService.css';
import card1 from '../../assets/image/imgi_4_service-img-01-840x1000.jpg';
import card2 from '../../assets/image/imgi_5_service-img-02-840x1000.jpg';
import card3 from '../../assets/image/imgi_6_service-img-03-840x1000 .jpg';
import card4 from '../../assets/image/imgi_7_service-img-04-840x1000.jpg';

const serviceData = [
  {
    title: "Consulting Service",
    category: "CONSULTING",
    img: card1,
    description: "Future Management Consulting What are the top consulting firms in India for Finance...",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 9H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 13H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Inventory Management",
    category: "INVENTORY",
    img: card2,
    description: "Future Management Consulting What are the top consulting firms in India for Finance...",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7L10 17L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Business Planning",
    category: "PLANNING",
    img: card3,
    description: "Future Management Consulting What are the top consulting firms in India for Finance...",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Wealth Management",
    category: "WEALTH",
    img: card4,
    description: "Future Management Consulting What are the top consulting firms in India for Finance...",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 15L20 17L22 18L20 19L19 21L18 19L16 18L18 17L19 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 15L6 17L8 18L6 19L5 21L4 19L2 18L4 17L5 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },

];

const OurService = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Get number of cards to show based on screen width
  const getCardsToShow = () => {
    if (screenWidth >= 1000) return 4;
    if (screenWidth >= 800) return 3;
    if (screenWidth >= 500) return 2;
    return 1;
  };

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === serviceData.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? serviceData.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      handleNext();
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(autoScrollInterval);
  }, [currentIndex, isAnimating, handleNext]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get visible cards based on screen size
  const getVisibleCards = () => {
    const cardsToShow = getCardsToShow();
    const cards = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % serviceData.length;
      cards.push(serviceData[index]);
    }
    return cards;
  };

  return (
    <section className="our-services-section">
      <div className="services-container">
        {/* Header Section */}
        <div className="services-header">
          <div className="header-content">
            <div className="service-badge">OUR SERVICE</div>
            <h2 className="service-title">We offer great number of finance services</h2>
          </div>
          <div className="service-arrows">
            <button className="arrow-btn" onClick={handlePrev} disabled={isAnimating}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="arrow-btn" onClick={handleNext} disabled={isAnimating}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className={`services-grid ${isAnimating ? 'animating' : ''}`}>
          {getVisibleCards().map((service, index) => (
            <div key={`${currentIndex}-${index}-${service.title}`} className="service-card">
              {/* Triangle Image Overlay */}
              <div className="card-image-overlay">
                <img src={service.img} alt={service.title} className="card-image" />
              </div>
              
              {/* Card Content */}
              <div className="card-content">
                <div className="card-category">
                  <span className="category-dot">•</span>
                  {service.category}
                </div>
                <div className="card-bottom-content">
                  <div className="card-icon">{service.icon}</div>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-description">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurService;
