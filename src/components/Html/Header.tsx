
import { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import Girl from "../../assets/image/girl.png"
import AnimatedArrow from '../Navbar/AnimatedArrow .tsx';
import {
  ChevronDown,
  Menu,
  X,
  Search,
  ShoppingBag,
  ArrowUpRight,
  Facebook,
  Twitter,
  Instagram,
} from 'lucide-react';
import Logo from '../../assets/image/logo.png';
import LogoBlack from '../../assets/image/logo_black.png';

import '../../assets/css/bootstrap.min.css';
import '../../assets/css/fontawesome.css';
import '../../assets/css/flaticon.css';
import '../../assets/css/pbminfotech-base-icons.css';
import '../../assets/css/themify-icons.css';
import '../../assets/css/swiper.min.css';
import '../../assets/css/magnific-popup.css';
import '../../assets/css/aos.css';
import '../../assets/css/shortcode.css';
import '../../assets/css/base.css';
import '../../assets/css/style.css';
import '../../assets/css/responsive.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<any>(null);
  const [closeTimeout, setCloseTimeout] = useState<any>(null);
  const navRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const menuItems = [
    { 
      name: 'HOME', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Homepage 01', href: '#homepage-1' },
        { name: 'Homepage 02', href: '#homepage-2' },
        { name: 'Homepage 03', href: '#homepage-3' },
        { name: 'Homepage 04', href: '#homepage-4' },
        { name: 'Homepage 05', href: '#homepage-5' },
        { name: 'Homepage 06', href: '#homepage-6' },
        { name: 'Homepage 07', href: '#homepage-7' },
      ]
    },
    { 
      name: 'PAGES', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Team', href: '#team' },
        { name: 'Careers', href: '#careers' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Testimonials', href: '#testimonials' },
      ]
    },
    { 
      name: 'SERVICES', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Web Development', href: '#web-dev' },
        { name: 'Mobile Apps', href: '#mobile' },
        { name: 'UI/UX Design', href: '#design' },
        { name: 'Digital Marketing', href: '#marketing' },
        { name: 'Consulting', href: '#consulting' },
      ]
    },
    { 
      name: 'PROJECT', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Web Projects', href: '#web-projects' },
        { name: 'Mobile Projects', href: '#mobile-projects' },
        { name: 'E-commerce', href: '#ecommerce' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Case Studies', href: '#case-studies' },
      ]
    },
    { 
      name: 'BLOG', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Latest Posts', href: '#latest' },
        { name: 'Technology', href: '#tech' },
        { name: 'Design Trends', href: '#design-trends' },
        { name: 'Business', href: '#business' },
        { name: 'Tutorials', href: '#tutorials' },
      ]
    },
    { name: 'CONTACT US', hasDropdown: false },
  ];

  const handleMouseEnter = (itemName: string) => {
    // Clear any existing timeouts
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    
    if (menuItems.find(item => item.name === itemName)?.hasDropdown) {
      // Add a slight delay before showing the dropdown
      const timeout = setTimeout(() => {
        setOpenDropdown(itemName);
      }, 100); // 100ms delay for a smooth appearance
      setHoverTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    // Clear any existing timeouts
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    
    // Add delay before closing for better UX
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 300); // Increased delay to keep menu open longer
    setCloseTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    // Clear any closing timeout when mouse enters dropdown
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    // Close dropdown when mouse leaves the dropdown area
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
    setCloseTimeout(timeout);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full Width Navbar - Positioned over both sides */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Split Layout Container */}
      <div className="flex flex-col lg:flex-row h-screen ">
        {/* Left Side - Full width on mobile, 50% on desktop */}
        <div className="w-full lg:w-1/2 bg-[#1C3F3A] relative flex-shrink-0 max-[1000px]:text-sm">
          {/* Content for Left Side */}
          <div className="flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 pt-16 pb-8 lg:pb-0">
            <div className="text-white max-w-lg w-full text-left ">
              {/* Plan for Secure Future Tag */}
              <div className="border-1 border-white text-white px-3 py-1.5 rounded-full inline-block mb-4 lg:mb-6 text-xs font-medium tracking-wide max-[1000px]:mt-10 max-[1000px]:" data-aos="fade-down" data-aos-delay="200">
                PLAN FOR SECURE FUTURE
              </div>
              
              {/* Main Headline - Responsive text sizing */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold mb-3 lg:mb-4 leading-tight text-white" data-aos="fade-up" data-aos-delay="100">
                Your Financial Goals,<br />
                <span className="text-white">Our Expertise.</span>
              </h1>
              
              {/* Horizontal Line */}
              
              {/* Description */}
              <div className="w-12 h-px bg-white/60 mb-4 lg:mb-5" data-aos="fade-right" data-aos-delay="300"></div>
              <p className="text-sm sm:text-base text-white mb-5 lg:mb-6 leading-relaxed" data-aos="fade-up" data-aos-delay="400">
                Whether you're looking to save for retirement, invest in the stock market, or plan for your children's education, we've got you covered.
              </p>
              
              {/* CTA Button */}
              <div 
                className="bg-white text-black border-2 border-white px-3 py-2 rounded-full font-semibold hover:bg-transparent hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group mb-5 lg:mb-6 w-full sm:w-auto sm:inline-flex"
                data-aos="fade-up" 
                data-aos-delay="500"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <span className="text-xs whitespace-nowrap">SCHEDULE A FREE CONSULTATION</span>
                <AnimatedArrow hovering={hovering} />
              </div>
              
              {/* Features with Checkmarks - Responsive layout */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4" data-aos="fade-up" data-aos-delay="600">
                <div className="flex items-center space-x-1.5">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#1C3F3A]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-xs">Expert Help</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#1C3F3A]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-xs">Proven Results</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#1C3F3A]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-xs">Ongoing Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Full width on mobile, 50% on desktop */}
        <div className="w-full lg:w-1/2 relative flex-shrink-0 bg-white">
          {/* Background color overlay for desktop */}
          <div className="absolute left-0 top-0 w-1/4 h-full bg-[#1C3F3A] hidden lg:block"></div>
          
          {/* Girl Image Container - Proper structure */}
          <div className="relative w-full h-full flex items-center justify-center lg:justify-end lg:items-end">
            <img 
              src={Girl} 
              alt="Girl" 
              className="w-full h-full object-cover lg:object-contain lg:object-right-bottom pointer-events-none select-none"
              style={{ 
                zIndex: 2 
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/95 text-black shadow-xl z-50 transform transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0 delay-150' : 'translate-x-full delay-0'
        } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-black/20">
            <div className="flex items-center space-x-2">
              <a href="/" className="flex items-center">
                <img src={LogoBlack} alt="Logo" className="h-6 sm:h-9 w-[180px] object-contain" />
              </a>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-black hover:text-gray-700 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item, index) => (
              <div key={index} className="border-b border-black/10 last:border-b-0">
                <button className="w-full flex items-center justify-between px-6 py-4 text-black hover:bg-black/5 transition-colors duration-200">
                  <span className="text-left font-medium tracking-wide">{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-black/10 space-y-6">
            {/* Social Media Buttons */}
            <div className="flex items-center justify-center space-x-6">
              <button className="text-black hover:text-gray-600 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-black hover:text-gray-600 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </button>
              <button className="text-black hover:text-gray-600 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </button>
            </div>

            {/* Shopping Cart Icon */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <button className="text-black hover:text-gray-600 transition-colors duration-200">
                  <ShoppingBag className="w-6 h-6" />
                </button>
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </div>
            </div>

            {/* GET IN TOUCH Button */}
            <div className="flex items-center justify-center">
            <div className="pbmit-button-box">
                  <a
                    href="contact-us.html"
                    className="pbmit-btn pbmit-outline-btn"
                  >
                    <span className="pbmit-header-button-text">
                      Get In Touch
                      <svg
                        className="pbmit-svg-arrow"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width={10}
                        height={19}
                        viewBox="0 0 19 19"
                        xmlSpace="preserve"
                      >
                        <line x1={1} y1={18} x2="17.8" y2="1.2" />
                        <line x1="1.2" y1={1} x2={18} y2={1} />
                        <line x1={18} y1="17.8" x2={18} y2={1} />
                      </svg>
                    </span>
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-slide-overlay"
          onClick={toggleMobileMenu}
        />
      )}
    </div>
  )
}

export default Header