import React, { useEffect, useState } from 'react';
import '../../Style/CSS/Landing/11OurPrice.css';

interface PricingCard {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  features: string[];
}

const pricingData: PricingCard[] = [
  {
    id: 'personal',
    title: 'Personal Offer',
    subtitle: 'Start free while you learn more about our services.',
    price: 150,
    features: [
      '5 Analytics Campaign',
      'Branded Reports',
      '500 Keywords',
      'Social Account',
      'Phone & Email Support'
    ]
  },
  {
    id: 'business',
    title: 'Business Offer',
    subtitle: 'Start free while you learn more about our services.',
    price: 245,
    features: [
      '5 Analytics Campaign',
      'Branded Reports',
      '500 Keywords',
      'Social Account',
      'Phone & Email Support'
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise Offer',
    subtitle: 'Start free while you learn more about our services.',
    price: 300,
    features: [
      '5 Analytics Campaign',
      'Branded Reports',
      '500 Keywords',
      'Social Account',
      'Phone & Email Support'
    ]
  }
];

const OurPrice: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handlePlanSelect = (planId: string) => {
    // Handle plan selection
    console.log(`Selected plan: ${planId}`);
  };

  return (
    <section className="pricing-section" aria-labelledby="pricing-title">
      <div className="pricing-container">
        {/* Header */}
        <div className="pricing-header">
          <div className="pricing-badge" role="text">OUR PRICE</div>
          <h2 
            id="pricing-title"
            className={`pricing-title ${isAnimated ? 'animate-slide-in' : ''}`}
          >
            Our flexible pricing plans
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards" role="list">
          {pricingData.map((card) => (
            <div 
              key={card.id} 
              className="pricing-card"
              role="listitem"
            >
              <div className="card-header">
                <h3 className="card-title">{card.title}</h3>
                <div className="card-separator" aria-hidden="true"></div>
                <p className="card-subtitle">{card.subtitle}</p>
              </div>

              <div className="card-price">
                <span className="price-symbol" aria-label="Dollar sign">$</span>
                <span className="price-amount">{card.price}</span>
                <span className="price-frequency">/Month</span>
              </div>

              <div className="card-features">
                {card.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <svg 
                      className="check-icon" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path 
                        d="M20 6L9 17L4 12" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="card-button">
                <button 
                  className="cta-button"
                  onClick={() => handlePlanSelect(card.id)}
                  aria-label={`Select ${card.title} plan`}
                >
                  GET IN TOUCH
                  <svg 
                    className="pbmit-svg-arrow" 
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink" 
                    x="0px" 
                    y="0px"
                    width="10" 
                    height="19" 
                    viewBox="0 0 19 19"
                    aria-hidden="true"
                  >
                    <line x1="1" y1="18" x2="17.8" y2="1.2"></line>
                    <line x1="1.2" y1="1" x2="18" y2="1"></line>
                    <line x1="18" y1="17.8" x2="18" y2="1"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPrice;
