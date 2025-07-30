import { useState } from 'react';
import { Facebook, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import Logo from '../../assets/image/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#1C3F3A] text-white relative overflow-hidden">
      {/* Background Pattern - Removed for solid color */}
      
      {/* Top Section - Logo and Newsletter */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#1C3F3A] relative">
                    <div className="absolute inset-0 bg-[#1C3F3A] transform rotate-45 scale-75"></div>
                    <div className="absolute inset-0 bg-[#1C3F3A] transform -rotate-45 scale-75"></div>
                  </div>
                </div>
                <span className="text-xl font-bold tracking-wide text-white">CLEANFIN</span>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="text-center lg:text-left">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                  Subscribe to our newsletter! Stay always in touch!
                </h3>
              </div>
              
              {/* Email Input */}
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-transparent border-b-2 border-white/60 text-white placeholder-white/60 px-2 py-1 focus:outline-none focus:border-white transition-colors duration-300 min-w-[200px] sm:min-w-[250px]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-[#1C3F3A] p-2 rounded-full hover:bg-white/90 transition-colors duration-300"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Contact Information */}
      <div className="relative z-10 border-t border-white/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Our Address */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-3 text-white">Our Address</h4>
              <p className="text-white/80 leading-relaxed">
                Valentin, Street Road 24, New York, USA - 67452
              </p>
            </div>

            {/* Contact Us */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-3 text-white">Contact Us</h4>
              <div className="space-y-2">
                <p className="text-white/80">
                  <a href="mailto:noreply@pbminfotech.com" className="underline hover:text-white transition-colors duration-300">
                    noreply@pbminfotech.com
                  </a>
                </p>
                <p className="text-white/80">
                  +(02) 574 - 328 - 301
                </p>
              </div>
            </div>

            {/* Our Social */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-3 text-white">Our Social</h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-white hover:text-white/80 transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-white hover:text-white/80 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white/80 transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Policy */}
      <div className="relative z-10 border-t border-white/20 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-white/80 text-sm">
                Copyright © 2023 <a href="#" className="text-white hover:text-white/80 transition-colors duration-300">Cleanfin</a>, All Rights Reserved.
              </p>
            </div>

            {/* Policy Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 text-sm">
                Terms & Conditions
              </a>
              <div className="w-px h-4 bg-white/40"></div>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;