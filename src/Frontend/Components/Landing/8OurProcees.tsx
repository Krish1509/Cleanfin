import React from 'react';
import '../../Style/CSS/Landing/8OurProcees.css';
import discussion from '../../assets/image/Discussion.jpg';
import ideas from '../../assets/image/Ideas.jpg';
import testing from '../../assets/image/Testing.jpg';
import execute from '../../assets/image/Execute.jpg';

const OurProcess: React.FC = () => {
  return (
    <div className="our-process-container  ">
      <div className="our-process-content ">
        {/* Header Section */}
        <div className="header-section">
          <div className="left-content">
            <div className="process-badge">OUR PROCESS</div>
            <h1 className="main-title">
              Successful Financial<br />
              Control Process
            </h1>
          </div>
          <div className="right-content">
            <p className="description">
              We welcome and celebrate different perspectives to help our firm, our clients 
              and our people. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi 
              molestiae leo nec velit interdum.
            </p>
            <button className="touch-button">
              Get In Touch 
              <svg className="pbmit-svg-arrow" xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      width="10" height="19" viewBox="0 0 19 19">
                      <line x1="1" y1="18" x2="17.8" y2="1.2"></line>
                      <line x1="1.2" y1="1" x2="18" y2="1"></line>
                      <line x1="18" y1="17.8" x2="18" y2="1"></line>
                    </svg>
            </button>
          </div>
        </div>

        {/* Process Steps Grid */}
        <div className="process-grid">
          <div className="process-step">
            <div className="step-image">
              <img src={discussion} alt="Discussion" />
            </div>
            <div className="step-number">01</div>
            <h3 className="step-title">Discussion</h3>
            <p className="step-description">
              We meet customers in set place to discuss the details about needs and 
              demands before proposing a plan.
            </p>
          </div>

          <div className="process-step">
            <div className="step-image">
              <img src={ideas} alt="Ideas & concepts" />
            </div>
            <div className="step-number">02</div>
            <h3 className="step-title">Ideas & concepts</h3>
            <p className="step-description">
              We meet customers in set place to discuss the details about needs and 
              demands before proposing a plan.
            </p>
          </div>

          <div className="process-step">
            <div className="step-image">
              <img src={testing} alt="Testing & Trying" />
            </div>
            <div className="step-number">03</div>
            <h3 className="step-title">Testing & Trying</h3>
            <p className="step-description">
              We meet customers in set place to discuss the details about needs and 
              demands before proposing a plan.
            </p>
          </div>

          <div className="process-step">
            <div className="step-image">
              <img src={execute} alt="Execute & install" />
            </div>
            <div className="step-number">04</div>
            <h3 className="step-title">Execute & install</h3>
            <p className="step-description">
              We meet customers in set place to discuss the details about needs and 
              demands before proposing a plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;