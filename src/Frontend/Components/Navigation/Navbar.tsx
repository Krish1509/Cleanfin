import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  Search,
  ShoppingBag,
  Facebook,
  Instagram,
} from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";

// Import assets
import Logo from '../../assets/image/logo.png';
import LogoBlack from '../../assets/image/LogoBlack.png';

// Import styles
import '../../Style/CSS/Navigation/Nav.css';

const Nav = () => {
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Desktop dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  
  // Mobile dropdown state
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  
  // Hover timeout states for smooth transitions
  const [hoverTimeout, setHoverTimeout] = useState<any>(null);
  const [closeTimeout, setCloseTimeout] = useState<any>(null);
  
  // Ref for detecting clicks outside
  const navRef = useRef(null);

  // ========================================
  // EFFECTS & LIFECYCLE
  // ========================================

  // Handle window resize and initial setup
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
        setMobileOpenDropdown(null);
      }
    };

    // Close menu on mount
    setIsMobileMenuOpen(false);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle clicks outside and escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !(navRef.current as any).contains(event.target)) {
        setIsMobileMenuOpen(false);
        setMobileOpenDropdown(null);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setMobileOpenDropdown(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // ========================================
  // EVENT HANDLERS
  // ========================================

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    // Close any open dropdowns when toggling menu
    setMobileOpenDropdown(null);
    setOpenDropdown(null);
  };

  // Mobile dropdown toggle
  const toggleMobileDropdown = (itemName: string) => {
    if (mobileOpenDropdown === itemName) {
      setMobileOpenDropdown(null);
    } else {
      setMobileOpenDropdown(itemName);
    }
  };

  // Desktop hover handlers
  const handleMouseEnter = (itemName: string, event: React.MouseEvent) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }

    if (menuItems.find(item => item.name === itemName)?.hasDropdown) {
      setOpenDropdown(itemName);
      
      // Position the dropdown correctly
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const dropdown = target.querySelector('.navbar-dropdown') as HTMLElement;
      
      if (dropdown) {
        dropdown.style.left = rect.left + 'px';
        dropdown.style.top = (rect.bottom + 8) + 'px';
      }
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
    setCloseTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    }, 150);
    setCloseTimeout(timeout);
  };

  const handleSubDropdownMouseEnter = (itemName: string) => {
    console.log('Opening sub-dropdown for:', itemName);
    setOpenSubDropdown(itemName);
  };

  const handleSubDropdownMouseLeave = () => {
    console.log('Closing sub-dropdown');
    const timeout = setTimeout(() => {
      setOpenSubDropdown(null);
    }, 150);
    setCloseTimeout(timeout);
  };

  // ========================================
  // MENU DATA
  // ========================================

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
        { name: 'Our History', href: '#history' },
        { name: 'Our Plans', href: '#plans' },
        { name: 'Our Team Member', href: '#team-member' },
        { name: 'Team Member Detail', href: '#team-detail' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Shop', href: '#shop' },
        { name: 'Element', href: '#element' },
      ]
    },
    {
      name: 'SERVICES',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Consulting Service', href: '#consulting-service' },
        { name: 'Inventory Management', href: '#inventory-management' },
        { name: 'Business Planning', href: '#business-planning' },
        { name: 'Wealth Management', href: '#wealth-management' },
        { name: 'Treasury Instruments', href: '#treasury-instruments' },
        { name: 'Professional Advisory', href: '#professional-advisory' },
        { name: 'Capital Restructuring', href: '#capital-restructuring' },
        { name: 'Tax/Audit Consulting', href: '#tax-audit-consulting' },
        { name: 'Portfolio Management', href: '#portfolio-management' },
      ]
    },
    {
      name: 'PROJECT',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Masonry View', 
          href: '#masonry-view',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Project Alpha', href: '#project-alpha' },
            { name: 'Project Beta', href: '#project-beta' },
            { name: 'Project Gamma', href: '#project-gamma' },
            { name: 'Project Delta', href: '#project-delta' },
          ]
        },
        { 
          name: 'Grid View', 
          href: '#grid-view',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Grid Project 1', href: '#grid-project-1' },
            { name: 'Grid Project 2', href: '#grid-project-2' },
            { name: 'Grid Project 3', href: '#grid-project-3' },
            { name: 'Grid Project 4', href: '#grid-project-4' },
          ]
        },
        { 
          name: 'Infinite Scroll View', 
          href: '#infinite-scroll-view',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Project India', href: '#project-india' },
            { name: 'Project Juliet', href: '#project-juliet' },
            { name: 'Project Kilo', href: '#project-kilo' },
            { name: 'Project Lima', href: '#project-lima' },
          ]
        },
        { 
          name: 'Sortable View', 
          href: '#sortable-view',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Project Mike', href: '#project-mike' },
            { name: 'Project November', href: '#project-november' },
            { name: 'Project Oscar', href: '#project-oscar' },
            { name: 'Project Papa', href: '#project-papa' },
          ]
        },
        { 
          name: 'Single Detail Style', 
          href: '#single-detail-style',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Project Quebec', href: '#project-quebec' },
            { name: 'Project Romeo', href: '#project-romeo' },
            { name: 'Project Sierra', href: '#project-sierra' },
            { name: 'Project Tango', href: '#project-tango' },
          ]
        },
      ]
    },
    {
      name: 'BLOG',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Masonry Grid', 
          href: '#masonry-grid',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Masonry Col-2', href: '#masonry-col-2' },
            { name: 'Masonry Col-3', href: '#masonry-col-3' },
            { name: 'Masonry Col-4', href: '#masonry-col-4' },
            { name: 'Masonry Wide', href: '#masonry-wide' },
            { name: 'Infinite Load Button', href: '#infinite-load-button' },
          ]
        },
        { 
          name: 'Grid View', 
          href: '#blog-grid-view',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Grid Col-2', href: '#grid-col-2' },
            { name: 'Grid Col-3', href: '#grid-col-3' },
            { name: 'Grid Col-4', href: '#grid-col-4' },
            { name: 'Grid Wide', href: '#grid-wide' },
          ]
        },
        { 
          name: 'Blog Classic', 
          href: '#blog-classic',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Classic Style 1', href: '#classic-style-1' },
            { name: 'Classic Style 2', href: '#classic-style-2' },
            { name: 'Classic Style 3', href: '#classic-style-3' },
            { name: 'Classic Wide', href: '#classic-wide' },
          ]
        },
        { 
          name: 'Blog Single Detail', 
          href: '#blog-single-detail',
          hasSubDropdown: true,
          subDropdownItems: [
            { name: 'Single Style 1', href: '#single-style-1' },
            { name: 'Single Style 2', href: '#single-style-2' },
            { name: 'Single Style 3', href: '#single-style-3' },
            { name: 'Single Wide', href: '#single-wide' },
          ]
        },
      ]
    },
    { name: 'CONTACT US', hasDropdown: false },
  ];

  // ========================================
  // RENDER
  // ========================================

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar-container">
        
        {/* ========================================
            LOGO SECTION
        ======================================== */}
        <div className="navbar-logo">
          <a href="/">
            <img src={Logo} alt="Logo" className="navbar-logo-img" />
          </a>
        </div>

        {/* ========================================
            DESKTOP NAVIGATION MENU
        ======================================== */}
        <div className="navbar-menu-desktop">
          <ul className="navbar-menu-list">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="navbar-menu-item-wrapper"
                onMouseEnter={(e) => handleMouseEnter(item.name, e)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Main Menu Item Button */}
                <button className="navbar-menu-item">
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="navbar-menu-chevron" />}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <div
                    className={`navbar-dropdown ${openDropdown === item.name ? 'show' : ''}`}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                      <div
                        key={dropdownIndex}
                        className={`navbar-dropdown-item-wrapper ${('hasSubDropdown' in dropdownItem && dropdownItem.hasSubDropdown) ? 'has-sub-dropdown' : ''}`}
                        onMouseEnter={() => {
                          if ('hasSubDropdown' in dropdownItem && dropdownItem.hasSubDropdown) {
                            handleSubDropdownMouseEnter(dropdownItem.name);
                          }
                        }}
                        onMouseLeave={() => {
                          if ('hasSubDropdown' in dropdownItem && dropdownItem.hasSubDropdown) {
                            handleSubDropdownMouseLeave();
                          }
                        }}
                      >
                        {/* Dropdown Item Link */}
                        <a
                          href={dropdownItem.href}
                          className="navbar-dropdown-item"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {dropdownItem.name}
                          {('hasSubDropdown' in dropdownItem && dropdownItem.hasSubDropdown) && <ChevronDown className="navbar-sub-dropdown-chevron" />}
                          <span className="navbar-dropdown-underline" />
                        </a>
                        
                        {/* Sub Dropdown Menu */}
                        {('hasSubDropdown' in dropdownItem && dropdownItem.hasSubDropdown) && (
                          <div
                            className={`navbar-sub-dropdown ${openSubDropdown === dropdownItem.name ? 'show' : ''}`}
                            onMouseEnter={() => handleSubDropdownMouseEnter(dropdownItem.name)}
                            onMouseLeave={handleSubDropdownMouseLeave}
                          >
                            {('subDropdownItems' in dropdownItem && dropdownItem.subDropdownItems) && dropdownItem.subDropdownItems.map((subItem: any, subIndex: number) => (
                              <div
                                key={subIndex}
                                className="navbar-sub-dropdown-item-wrapper"
                              >
                                <a
                                  href={subItem.href}
                                  className="navbar-sub-dropdown-item"
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setOpenSubDropdown(null);
                                  }}
                                >
                                  {subItem.name}
                                  <span className="navbar-sub-dropdown-underline" />
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ========================================
            RIGHT SIDE ACTIONS
        ======================================== */}
        <div className="navbar-actions">
          
          {/* Social Media Icons - Show on 1400px+ */}
          <button className="navbar-icon-btn navbar-social-btn">
            <Facebook className="navbar-icon" />
          </button>
          <button className="navbar-icon-btn navbar-social-btn">
            <FaXTwitter className="navbar-icon" />
          </button>
          <button className="navbar-icon-btn navbar-social-btn">
            <Instagram className="navbar-icon" />
          </button>

          {/* Search Button */}
          <button className="navbar-icon-btn ">
            <Search className="navbar-icon max-[300px]:hidden" />
          </button>

          {/* Vertical Separator */}
          <div className="navbar-vertical-line"></div>

          {/* Shopping Cart */}
          <div className="navbar-cart-wrapper">
            <button className="navbar-icon-btn">
              <ShoppingBag className="navbar-icon-lg" />
            </button>
            <span className="navbar-cart-badge">0</span>
          </div>

          {/* Contact Button */}
          <div className="">
            <button
              className="navbar-contact-btn"
            >
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

          {/* Mobile Menu Toggle Button */}
          <button
            className="navbar-mobile-btn"
            onClick={toggleMobileMenu}
            type="button"
          >
            {isMobileMenuOpen ? <X className="navbar-mobile-icon" /> : <Menu className="navbar-mobile-icon" />}
          </button>
        </div>
      </div>

      {/* ========================================
          MOBILE SIDE MENU
      ======================================== */}
      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'navbar-mobile-menu-open' : ''}`}>
        
        {/* Mobile Header */}
        <div className="navbar-mobile-header">
          <div className="navbar-mobile-logo">
            <img src={LogoBlack} alt="Logo" className="navbar-mobile-logo-img" />
          </div>
          <button
            className="navbar-mobile-close"
            onClick={toggleMobileMenu}
            type="button"
          >
            <X className="navbar-mobile-close-icon" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="navbar-mobile-content">
          <ul className="navbar-mobile-list">
            {menuItems.map((item, index) => (
              <li key={index} className="navbar-mobile-item">
                <button
                  className="navbar-mobile-link"
                  onClick={() => item.hasDropdown ? toggleMobileDropdown(item.name) : null}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className={`navbar-mobile-chevron ${mobileOpenDropdown === item.name ? 'rotated' : ''}`} />}
                </button>

                {/* Mobile Dropdown */}
                {item.hasDropdown && mobileOpenDropdown === item.name && (
                  <div className="navbar-mobile-dropdown">
                    {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                      <a
                        key={dropdownIndex}
                        href={dropdownItem.href}
                        className="navbar-mobile-dropdown-item"
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Actions */}
          <div className="navbar-mobile-actions">
            
            {/* Mobile Social Icons */}
            <div className="navbar-mobile-socials">
              <button className="navbar-mobile-social-btn">
                <Facebook className="navbar-mobile-social-icon" />
              </button>
              <button className="navbar-mobile-social-btn">
                <FaXTwitter className="navbar-mobile-social-icon" />
              </button>
              <button className="navbar-mobile-social-btn">
                <Instagram className="navbar-mobile-social-icon" />
              </button>
            </div>

            {/* Mobile Cart */}
            <div className="navbar-mobile-cart">
            <button className=" ">
            <Search className="text-black min-[300px]:hidden" />
          </button>
              <button className="navbar-mobile-cart-btn">
                <ShoppingBag className="navbar-mobile-cart-icon" />
                <span className="navbar-mobile-cart-badge">0</span>
              </button>
            </div>

            {/* Mobile Contact Button */}
            <button className="cta-button justify-center ">
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
        </div>
      </div>

      {/* ========================================
          MOBILE MENU OVERLAY
      ======================================== */}
      {isMobileMenuOpen && (
        <div
          className="navbar-mobile-overlay"
          onClick={toggleMobileMenu}
        />
      )}
    </nav>
  );
};

export default Nav;