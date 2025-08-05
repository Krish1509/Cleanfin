import  { useState, useEffect } from 'react';
import '../../Style/CSS/Landing/9WhoWeAre.css';
import happygirl from '../../assets/image/happygirl.jpg';
import "../../../App.css"

const WhoWeAre = () => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev < 80) {
            return prev + 5;
          } else {
            setHasAnimated(true);
            clearInterval(interval);
            return 80;
          }
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [hasAnimated]);

  return (
    <section className="who-we-are">
      <div className="">
        <div className="content-wrapper">
          {/* Left side - Image */}
          <div className="image-section">
            <img
              src={happygirl}
              alt="Business professionals collaborating"
              className="main-image"
            />
          </div>

          {/* Right side - Content */}
          <div className="content-section ">
            <div className="content-inner max-[1000px]:mt-[20px]">
                  <div className="badge  ">
                    WHO WE ARE
                  </div>
              <div className="content-flex ">
                <div className="content-left">
                  <h2 className="main-heading">
                    We See Solutions Growing for your Business
                  </h2>
                  <button className="touch-button1">
                    GET IN TOUCH
                    <svg className="pbmit-svg-arrow" xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      width="10" height="19" viewBox="0 0 19 19">
                      <line x1="1" y1="18" x2="17.8" y2="1.2"></line>
                      <line x1="1.2" y1="1" x2="18" y2="1"></line>
                      <line x1="18" y1="17.8" x2="18" y2="1"></line>
                    </svg>
                  </button>
                </div>

                <div className="content-right">
                  <div className="description-text">
                    <p>Our Consultants provide the highest quality advice and technical support and will assist your organization by thoroughly assessing your IT infrastructure and recommending.</p>
                    <p>We will discuss your global requirements to capture all your business objectives and our process will work backwards.</p>
                  </div>

                  <div className="stats-flex">
                    <div className="stats-left">
                      <div className="stats-number">
                        {count}k
                      </div>
                      <div className="stats-description">
                        <span className="stats-title">Successfully Complete</span>
                        <span className="stats-subtitle">the case study</span>
                      </div>
                      <div className="team-avatars">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="Team member" className="avatar" />
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Team member" className="avatar" />
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Team member" className="avatar" />
                        <div className="avatar avatar-plus">+</div>
                      </div>
                    </div>

                    <div className="stats-divider "></div>

                                         <div className="features-list1">
                       <div className="feature-item1">
                         <span className="checkmark">✓</span>
                         <span>Cancel anytime you want</span>
                       </div>
                       <div className="feature-item1">
                         <span className="checkmark">✓</span>
                         <span>Save costs for development</span>
                       </div>
                       <div className="feature-item1">
                         <span className="checkmark">✓</span>
                         <span>Say No to Laziness</span>
                       </div>
                       <div className="feature-item1">
                         <span className="checkmark">✓</span>
                         <span>Comprehensive package</span>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;