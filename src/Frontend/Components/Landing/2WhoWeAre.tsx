import React, { useState, useEffect } from 'react';
import ServiceGirl from '../../assets/image/meet.jpg';
import '../../Style/CSS/Landing/2WhoWeAre.css';

const tabData = [
  {
    label: "ANALYSIS",
    description:
      "Platea convallis magnis sed proin quam praesent et nisl. Odio massa aliquet blandit congue ipsum auctor. Natoque viverra laoreet proin aptent facilisi. Faucibus tristique integer nibh nostra massa proin iaculis eu dui.",
    features: [
      "Better Resource Management",
      "Increased Efficiency",
      "Improved Communication",
      "Higher Quality Outcomes"
    ]
  },
  {
    label: "STRATEGY",
    description:
      "Natoque viverra laoreet proin aptent facilisi. Faucibus tristique integer nibh nostra massa proin iaculis eu dui. Odio massa aliquet blandit congue ipsum auctor. Platea convallis magnis sed proin quam praesent et nisl.",
    features: [
      "Improved Communication",
      "Higher Quality Outcomes",
      "Increased Efficiency",
      "Better Resource Management"
    ]
  },
  {
    label: "EXECUTION",
    description:
      "Faucibus tristique integer nibh nostra massa proin iaculis eu dui. Platea convallis magnis sed proin quam praesent et nisl. Odio massa aliquet blandit congue ipsum auctor. Natoque viverra laoreet proin aptent facilisi.",
    features: [
      "Higher Quality Outcomes",
      "Increased Efficiency",
      "Better Resource Management",
      "Improved Communication"
    ]
  }
];

const Second: React.FC = () => {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      // Start with 0
      setTimeout(() => setCount(0), 200);
      
      // Then 5
      setTimeout(() => setCount(5), 600);
      
      // Then 10
      setTimeout(() => setCount(10), 1000);
      
      // Then 15
      setTimeout(() => setCount(15), 1400);
      
      // Then 20
      setTimeout(() => setCount(20), 1800);
      
      // Then 25
      setTimeout(() => setCount(25), 2200);
      
      // Finally 30
      setTimeout(() => {
        setCount(30);
        setHasAnimated(true);
      }, 2600);

      return () => {};
    }
  }, [hasAnimated]);

  return (
    <div className="combined-content-wrapper min-[1000px]:mt-14 ">
      <div className="combined-content-container">
        {/* 1. LEFT - Counter Circle */}
        <div className="counter-section">
          <div className="counter-circle">
            <div className="counter-display ">
              <span>{count}</span>
              <div className="counter-plus min-[1000px]:ml-[2.3rem] min-[1000px]:mt-[1px] min-[800px]:ml-[2.16rem] min-[800px]:mt-[0.5px] max-[700px]:ml-[2rem] max-[800px]:mt-[1px]
               max-[600px]:ml-[1.2rem] max-[600px]:mt-[1px]

              ">+</div>
            </div>
            <div className="experience-text">
              EXPERIENCE
            </div>
          </div>
        </div>

        {/* 2. Image and Who We Are - Same Row for 800px-1000px */}
        <div className="image-and-content-row">
          {/* Image Section */}
          <div className="image-section min-[1000px]:mt-8 ">
            <img
              src={ServiceGirl}
              alt="Professional team collaboration"
              className="team-image"
            />
          </div>

          {/* Who We Are Section */}
          <div className="who-we-are-section">
            {/* Tag */}
            <div className="who-we-are-tag">
              WHO WE ARE
            </div>

            {/* Heading */}
            <h1 className="who-we-are-heading">
              <span>Better strategy with</span><br />
              <span>quality business</span>
            </h1>

            {/* Tabs */}
            <div className="tabs-container">
              {tabData.map((tab, idx) => (
                <button
                  key={tab.label}
                  className={`tab-button ${activeTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Description */}
              <p className="tab-description">
                {tabData[activeTab].description}
              </p>

              {/* Features */}
              <div className="features-gri">
                {tabData[activeTab].features.map((feature, index) => (
                  <div key={`${feature}-${index}`} className="feature-item">
                    <span className="feature-checkmark">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Second; 