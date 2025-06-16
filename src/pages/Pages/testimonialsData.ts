interface Testimonial {
  id: number;
  name: string;
  role: string;
  testimonial: string;
  rating: number; // Full stars as integer, use decimals like 4.5 for half-stars
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Retail Trader",
    testimonial:
      "The accuracy of these trade recommendations is incredible. I've been able to significantly improve my success rate in Nifty options trading thanks to their precise entries and exits.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rajesh Patel",
    role: "Commodity Trader",
    testimonial:
      "Their commodity market recommendations have consistently delivered results. The clear targets and stop-loss levels take the guesswork out of trading. Worth every rupee!",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Desai",
    role: "Part-time Investor",
    testimonial:
      "As someone who can't monitor markets all day, the mobile alerts are a game-changer. The notifications are timely, and the analysis behind each recommendation is thorough and educational.",
    rating: 4.5,
  },
];
