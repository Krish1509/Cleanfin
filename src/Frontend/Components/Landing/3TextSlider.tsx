import React from 'react';
import '../../Style/CSS/Landing/3TextSlider.css';  

const TextSlider = () => {
  // Create the text items array
  const textItems = [
    'STOCK CUSTODIAN',
    'MARKET RESEARCH',
    'BITCOIN FARMING',
    'FINANCE ADVISORY',
    'DIGITAL ANALYTICS',
    'TRADE COACHING',
    'CORPORATE AUDIT',
    'STARTUP FUNDING',
    'ACCOUNTING ADVISORY',
    'BUSINESS STRATEGY'
  ];

  // Create a much longer array for seamless looping - 12 complete cycles
  const longList = [];
  for (let i = 0; i < 12; i++) {
    longList.push(...textItems);
  }

  return (
    <div className="text-slider-container">
      <div className="text-slider">
        <div className="sliding-text">
          {longList.map((item, index) => (
            <React.Fragment key={index}>
              <span>{item}</span>
              <span className="separator">*</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextSlider; 