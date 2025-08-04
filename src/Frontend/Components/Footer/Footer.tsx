import React from 'react';
import '../../Style/CSS/Footer/Footer.css';
import logo from '../../assets/image/logo.png';
import bglogo from '../../assets/image/bglogo.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-row">
            <div className="footer-logo-col">
              <div className="footer-logo">
                <img src={logo} className="logo-img" alt="CLEANFIN Logo" />
              </div>
            </div>
            <div className="footer-newsletter-col">
              <h3 className="newsletter-title">Subscribe to our newsletter! Stay always in touch!</h3>
            </div>
            <div className="footer-form-col">
              <form className="newsletter-form">
                <div className="newsletter-input-group">
                  <input type="email" name="EMAIL" placeholder="Enter your email" className="newsletter-input" />
                  <button className="newsletter-btn">
                    <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10" height="19" viewBox="0 0 19 19" xmlSpace="preserve">
                      <line x1="1" y1="18" x2="17.8" y2="1.2"></line>
                      <line x1="1.2" y1="1" x2="18" y2="1"></line>
                      <line x1="18" y1="17.8" x2="18" y2="1"></line>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-main">
        <div className="container">
          <div className="footer-widgets">
            <div className="container">
              <div className="widgets-row">
                <div className="widget-col">
                  <div className="widget">
                    <h2 className="widget-title">Our address</h2>
                    <div className="widget-content">
                      <div className="address-content">
                        <div className="address-line">Valentin, Street Road 24, New</div>
                        <div className="address-line">York, USA - 67452</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget-col">
                  <div className="widget">
                    <h2 className="widget-title">Contact Us</h2>
                    <div className="widget-content">
                      <div className="contact-phone">
                        <i className="phone-icon">📞</i>
                        +(02) 574 - 328 - 301
                      </div>
                      <div className="contact-email">
                        <i className="email-icon">✉️</i>
                        noreply@pbminfotech.com
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget-col">
                  <div className="widget">
                    <h2 className="widget-title">Our Social</h2>
                    <div className="social-widget">
                      <ul className="social-links">
                        <li className="social-item">
                          <a href="#" target="_blank" rel="noopener" className="social-link">
                            <i className="social-icon">📘</i>
                          </a>
                        </li>
                        <li className="social-item">
                          <a href="#" target="_blank" rel="noopener" className="social-link">
                            <i className="social-icon">🐦</i>
                          </a>
                        </li>
                        <li className="social-item">
                          <a href="#" target="_blank" rel="noopener" className="social-link">
                            <i className="social-icon">📷</i>
                          </a>
                        </li>
                        <li className="social-item">
                          <a href="#" target="_blank" rel="noopener" className="social-link">
                            <i className="social-icon">💼</i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="footer-bottom-content">
                <div className="footer-bottom-row">
                  <div className="copyright-col">
                    <div className="copyright-text">
                      Copyright © 2023 Cleanfin, All Rights Reserved.
                    </div>
                  </div>
                  <div className="legal-col">
                    <div className="legal-links">
                      <ul className="legal-list">
                        <li className="legal-item"><a href="#" className="legal-link">Terms & Conditions</a></li>
                        <li className="legal-item"><a href="#" className="legal-link">Privacy Policy</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;