import { useState, useEffect, useRef } from 'react';
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
import './Nav.css';
import AnimatedArrow from './AnimatedArrow ';
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

const Navbar = () => {
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
    <nav ref={navRef} className="bg-transparent text-white relative w-full border-b border-white/40">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex ">
            <img src={Logo} alt="Logo" className="h-9 sm:h-12 w-[180px] object-contain" />
          </a>

          {/* Desktop Navigation - Only show on screens >= 1200px */}
          <div className="hidden min-[1200px]:block">
            <div className="flex items-baseline space-x-2">
              {menuItems.map((item, index) => (
                <div 
                  key={index} 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 text-white hover:text-white/70 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200"
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && openDropdown === item.name && (
                    <div 
                      className={`absolute left-[-20px] top-full mt-4 mr-10 bg-white flex flex-col text-black shadow-xl px-8 py-6 rounded-b-lg rounded-t-none z-50 transition-all duration-300 ease-in-out min-w-[200px] space-y-4 border-t-0 ${openDropdown === item.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                      style={{
                        marginTop: '30px',
                        borderTop: 'none'
                      }}
                    >
                      {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                        <a
                          key={dropdownIndex}
                          href={dropdownItem.href}
                          className="relative text-sm font-medium group/dropdown hover:text-teal-600 py-2 transition-colors duration-300 hover:bg-teal-50 px-2 rounded"
                        >
                          {dropdownItem.name}
                          <span className="absolute left-2 -bottom-1 w-[calc(100%-16px)] h-[2px] bg-teal-600 scale-x-0 group-hover/dropdown:scale-x-100 origin-left transition-transform duration-400 ease-out" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Large screens (1500px+) */}
            <div className="hidden min-[1500px]:flex items-center   space-x-4">
              <div className="flex items-center  gap-3 ">
                <button className="text-white hover:text-white/60 transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="text-white hover:text-white/60 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                </button>
                <button className="text-white hover:text-white/60 transition-colors duration-200 mr-4">
                  <Instagram className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 gap-4">
                <button className="text-white  hover:text-white/60 gap-4 mr-4  transition-colors duration-200">
                  <Search className="w-6 h-6 font-bold " />
                </button>
                <div className="w-px h-6 bg-white/40"></div>
                <div className="relative">
                  <button className="text-white hover:text-white/60 transition-colors duration-200">
                    <ShoppingBag className="w-7 h-7" />
                  </button>
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center ">
                    0
                  </span>
                </div>
              </div>

              <div className=" flex items-center">
                  <a
                    href="contact-us.html"
                    className="pbmit-btn pbmit-outline-btn bg-transparent text-white border-2 border-white px-4 py-2  flex items-center space-x-1 hover:bg-white hover:text-black transition-all duration-300 text-sm group"
                  >
                     <button
      className="group bg-transparent  rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-wide flex items-center gap-2 overflow-hidden "
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      GET IN TOUCH
      <AnimatedArrow hovering={hovering} />
    </button>
                  </a>
                </div>
            </div>

            {/* Medium screens (1200px-1499px) */}
            <div className="hidden min-[1200px]:max-[1499px]:flex items-center space-x-4">
              <button className="text-white hover:text-white/60 transition-colors duration-200 mr-4">
                <Search className="w-6 h-6 font-bold gap-4 space-x-4 mr-4 " />
              </button>
              <div className="w-px h-6 bg-white/40"></div>
              <div className="relative">
                <button className="text-white hover:text-white/60 transition-colors duration-200">
                  <ShoppingBag className="w-7 h-7" />
                </button>
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-cyan-300 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-10 h-9" />}
              </button>
            </div>

            {/* Small-Medium screens (500px-1199px) */}
            <div className="hidden min-[500px]:max-[1199px]:flex items-center space-x-4">
              <button className="text-white hover:text-white/60 transition-colors duration-200 mr-4">
                <Search className="w-6 h-6 font-bold mr-4" />
              </button>
              <div className="w-px h-6 bg-white/40"></div>
              <div className="relative">
                <button className="text-white hover:text-white/60 transition-colors duration-200">
                  <ShoppingBag className="w-7 h-7" />
                </button>
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-cyan-300 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="w-10 h-10" /> : <Menu className="w-12 h-10" />}
              </button>
            </div>

            {/* Very small screens (<500px) */}
            <div className="flex max-[499px]:flex items-center space-x-4 min-[500px]:hidden">
              <button className="text-white hover:text-white/60 transition-colors duration-200">
                <Search className="w-6 h-6 font-bold" />
              </button>
              <div className="w-px h-6 bg-white/40"></div>
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-cyan-300 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="w-10 h-10" /> : <Menu className="w-12 h-10" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/95 text-black shadow-xl z-50 transform transition-transform duration-700 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } max-[1499px]:block min-[1500px]:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex justify-between items-center p-4 border-b border-black/20 transition-all duration-500 delay-300 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
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
              <div 
                key={index} 
                className={`border-b border-black/10 last:border-b-0 transition-all duration-500 ${
                  isMobileMenuOpen 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}
                style={{
                  transitionDelay: `${400 + (index * 100)}ms`
                }}
              >
                <button className="w-full flex items-center justify-between px-6 py-4 text-black hover:bg-black/5 transition-colors duration-200">
                  <span className="text-left font-medium tracking-wide">{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>

          <div className={`p-4 border-t border-black/10 space-y-6 transition-all duration-500 delay-700 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
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

      {/* Overlay with Blur Effect */}
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-1000 ease-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMobileMenu}
          style={{
            animation: isMobileMenuOpen ? 'slideInBlur 1.2s ease-out' : 'none'
          }}
        />
      )}
    </nav>
  );
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInBlur {
    0% {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    20% {
      opacity: 0.1;
      backdrop-filter: blur(1px);
    }
    40% {
      opacity: 0.2;
      backdrop-filter: blur(2px);
    }
    60% {
      opacity: 0.3;
      backdrop-filter: blur(3px);
    }
    80% {
      opacity: 0.4;
      backdrop-filter: blur(4px);
    }
    100% {
      opacity: 1;
      backdrop-filter: blur(6px);
    }
  }
`;
document.head.appendChild(style);

export default Navbar;