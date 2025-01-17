import React from "react";

// AnimationProps type for component props
interface AnimationProps {
  show: boolean; // Pass true to show the animation
}

// AnimationComponent
const AnimationComponent: React.FC<AnimationProps> = ({ show }) => {
  return (
    <>
      {show && (
        <div
          className="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center flex-column"
          style={{
            zIndex: 99999999,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency for the background
          }}
        >
          {/* Rocket Animation */}
          <div
            className="position-absolute"
            style={{
              animation: "rocketAnimation 3s linear infinite",
              fontSize: "40px",
            }}
          >
            🚀
          </div>

          {/* Congratulations Text */}
          <div
            className="fw-bold"
            style={{
              fontSize: "36px",
              animation: "fadeInText 3s ease-out 0.5s forwards", // Text fading in
            }}
          >
            Congratulations! 🎯✨
          </div>
        </div>
      )}
    </>
  );
};

export default AnimationComponent;

// CSS for Animations (use a CSS-in-JS approach or external CSS file)
const styles = `
@keyframes rocketAnimation {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100vw, -100vh); /* Move the rocket from left bottom to right top */
  }
}

@keyframes fadeInText {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

// Inject styles into the page (only for inline styles, can also be done via an external CSS file)
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
