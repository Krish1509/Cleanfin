
import Girl from "../../assets/image/girl.png"
import bglogo from "../../assets/image/bglogo.png"
// import Mgirl  
import SplitText from "./Utils/SplitText"
import "../../Style/CSS/Landing/1PlanForSecureFuture.css"

const First = () => {

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div className="first-container">
      {/* Full Width Navbar - Positioned over both sides */}
      <div className="first-navbar">
      </div>

      {/* Split Layout Container */}
      <div className="first-split-layout">
        {/* Left Side - Full width on mobile, 50% on desktop */}
        <div className="first-left-side">
          {/* Background Logo */}
          <div className="first-bg-logo">
            <img src={bglogo} alt="Background Logo" />
          </div>

          {/* Content for Left Side */}
          <div className="first-content-container">
            <div className="first-content-wrapper">
              {/* Plan for Secure Future Tag */}
              <div className="first-tag " data-aos="fade-down" data-aos-delay="200">
                PLAN FOR SECURE FUTURE
              </div>

              {/* Main Headline - Responsive text sizing */}
              <h1 className="mb-2">
              <SplitText
  text="Your Financial Goals,"
  className="first-headline-line1 font-bold text-[4.5vw] max-[1000px]:text-[5.5vw] max-[900px]:text-[6.5vw] max-[800px]:text-[7.5vw] max-[700px]:text-[7.5vw] max-[500px]:text-[8.5vw] max-[330px]:text-[7.5vw]"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, x: 40 }}
  to={{ opacity: 1, x: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>
<br/>
<SplitText
  text="Our Expertise."
  className="first-headline-line2 font-bold text-[4.5vw] max-[1000px]:text-[5.5vw]  max-[900px]:text-[7vw] max-[800px]:text-[7.5vw] max-[700px]:text-[7.5vw] max-[500px]:text-[8.5vw] max-[330px]:text-[7.5vw]"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
    from={{ opacity: 0, x: 40 }}
  to={{ opacity: 1, x: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>
              </h1>


              <div className="fle">
                <div className="flex">
                  <div className="first-line mt-[12px] mx-1 mr-4" data-aos="fade-right" data-aos-delay="300"></div>
                  <div className="first-description-line-container  " data-aos="fade-up" data-aos-delay="400">
                    {/* Description */}
                    <p className="first-description ">

                      Whether you're looking to save for retirement, invest in the stock market we've got you covered.
                  
                    </p>
                    {/* Horizontal Line */}
                  </div>
                  </div>
                  <div
                    className="first-cta-button min-[1000px]:mt-[-5px]  max-[320px]:text-[3.5vw] "
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    SCHEDULE A FREE CONSULTATION
                    <svg className="pbmit-svg-arrow" xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      width="10" height="19" viewBox="0 0 19 19">
                      <line x1="1" y1="18" x2="17.8" y2="1.2"></line>
                      <line x1="1.2" y1="1" x2="18" y2="1"></line>
                      <line x1="18" y1="17.8" x2="18" y2="1"></line>
                    </svg>
                </div>
              </div> {/* Description and Line Container */}

              {/* CTA Button */}

              {/* Features with Checkmarks - Responsive layout */}
              <div className="first-features" data-aos="fade-up" data-aos-delay="600">
                <div className="first-feature-item">
                  <div className="first-feature-icon">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="first-feature-text">Expert Help</span>
                </div>
                <div className="first-feature-item">
                  <div className="first-feature-icon">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="first-feature-text">Proven Results</span>
                </div>
                <div className="first-feature-item">
                  <div className="first-feature-icon">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="first-feature-text">Ongoing Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Full width on mobile, 50% on desktop */}
        <div className="first-right-side">
          {/* Background color overlay for desktop */}
          {/* <div className="first-bg-overlay"></div> */}

          {/* Girl Image Container - Proper structure */}
          <div className="first-image-container ">
            <img
              src={Girl}
              alt="Girl"
              className="first-image"
              style={{
                zIndex: 2
              }}
            />
          </div>
        </div>
      </div>



    </div>
  )
}

export default First;