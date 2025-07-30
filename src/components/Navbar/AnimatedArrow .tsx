interface AnimatedArrowProps {
  hovering?: boolean;
}

const AnimatedArrow = ({ hovering }: AnimatedArrowProps) => {
  return (
<svg
  className="arrow-stroke w-4 h-4 transition-all duration-500"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7 17L17 7M17 7H7M17 7V17"
    stroke={hovering ? "black" : "white"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  );
};

export default AnimatedArrow;