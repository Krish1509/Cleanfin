import { Mail, Facebook, Instagram } from 'lucide-react';
import Logo from '../../assets/image/logo.png';
import bglogo from '../../assets/image/bglogo.png';
import '../../Style/CSS/Footer/Footer.css';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer 
      className="footer" 
      style={{ 
        '--bg-logo': `url(${bglogo})`
      } as React.CSSProperties}
    >
      <div className="footer-top">
        <img src={Logo} alt="Cleanfin Logo" className="footer-logo" />
        
        <div className="footer-content-right">
          <div className="footer-newsletter">
            <h2>Subscribe to our newsletter! Stay always in touch!</h2>
            <div className="footer-input-wrapper">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">
                <Mail size={16} />
              </button>
            </div>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <h4>Our Address</h4>
              <p>Valentin, Street Road 24,<br />New York, USA – 67452</p>
            </div>
            <div className="footer-column">
              <h4>Contact Us</h4>
              <p><a href="mailto:noreply@pbminfotech.com">noreply@pbminfotech.com</a></p>
              <p className="footer-phone">+(02) 574 – 328 – 301</p>
            </div>
            <div className="footer-column">
              <h4>Our Social</h4>
              <div className="footer-social-icons">
                <a href="#"><Facebook /></a>
                <a href="#"><FaXTwitter /></a>
                <a href="#"><Instagram /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>Copyright © 2023 Cleanfin. All Rights Reserved.</p>
            <div className="footer-links">
              <a href="#">Teams & Conditions</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );  
};

export default Footer;
