// import  { useEffect } from 'react';
// import 'aos/dist/aos.css';
// import AOS from 'aos';
// // Favicon (put fevicon.png in public folder)
// import '../assets/css/bootstrap.min.css';
// import '../assets/css/fontawesome.css';
// import '../assets/css/flaticon.css';
// import '../assets/css/pbminfotech-base-icons.css';
// import '../assets/css/themify-icons.css';
// import '../assets/css/swiper.min.css';
// import '../assets/css/magnific-popup.css';
// import '../assets/css/aos.css';
// import '../assets/css/shortcode.css';
// import '../assets/css/base.css';
// import '../assets/css/style.css';
// import '../assets/css/responsive.css';

// // import '../assets/js/aos.js';
// import '../assets/js/jquery.min.js';
// import '../assets/js/popper.min.js';
// import '../assets/js/bootstrap.min.js';
// import '../assets/js/jquery.waypoints.min.js';
// import '../assets/js/jquery.appear.js';
// import '../assets/js/numinate.min.js';
// import '../assets/js/jquery.magnific-popup.min.js';
// import '../assets/js/circle-progress.min.js';
// import '../assets/js/jquery.countdown.min.js';
// // import '../assets/js/gsap.js';
// // import '../assets/js/ScrollTrigger.js';
// // import '../assets/js/SplitText.js';
// import '../assets/js/jquery.magnific-popup.min.js';
// import '../assets/js/chart.js';
// // import '../assets/js/main.js';


// // import Navbar from './Navbar/Navbar';

// import logo from '../assets/image/Logo_Black.png';



// const Full = () => {
//   useEffect(() => {
//     AOS.init({ once: true }); // or your preferred options
//   }, []);

//   return (

// <div>
// {/* <div className="bg-black">
// <Navbar />
// </div> */}
 
//     {/* footer */}
//     <footer className="footer site-footer pbmit-bg-color-blackish">
//       <div className="pbmit-footer-big-area-wrapper">
//         <div className="container">
//           <div className="row">
//             <div className="col-xl-4 col-lg-3 col-md-6">
//               <div className="pbmit-footer-logo">
//                 <img src="images/logo-white.svg" className="img-fluid" alt="" />
//               </div>
//             </div>
//             <div className="col-xl-4 col-lg-5 col-md-6">
//               <h3>Subscribe to our newsletter! Stay always in touch!</h3>
//             </div>
//             <div className="col-xl-4 col-lg-4 col-md-6">
//               <form>
//                 <div className="pbmit-footer-newsletter">
//                   <input
//                     type="email"
//                     name="EMAIL"
//                     placeholder="Enter your email"
//                   />
//                   <button className="pbmit-svg-btn">
//                     <svg
//                       className="pbmit-svg-arrow"
//                       xmlns="http://www.w3.org/2000/svg"
//                       xmlnsXlink="http://www.w3.org/1999/xlink"
//                       x="0px"
//                       y="0px"
//                       width={10}
//                       height={19}
//                       viewBox="0 0 19 19"
//                       xmlSpace="preserve"
//                     >
//                       <line x1={1} y1={18} x2="17.8" y2="1.2" />
//                       <line x1="1.2" y1={1} x2={18} y2={1} />
//                       <line x1={18} y1="17.8" x2={18} y2={1} />
//                     </svg>
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="pbmit-footer-main-area">
//         <div className="container">
//           <div className="pbmit-footer-widget-area">
//             <div className="container">
//               <div className="row g-2">
//                 <div className="pbmit-footer-widget-col-1 col-md-4">
//                   <div className="widget">
//                     <h2 className="widget-title">Our address</h2>
//                     <div className="pbmit-contact-widget-lines">
//                       Valentin, Street Road 24, New <br /> York, USA - 67452
//                     </div>
//                   </div>
//                 </div>
//                 <div className="pbmit-footer-widget-col-2 col-md-4">
//                   <div className="widget">
//                     <h2 className="widget-title">Contact Us</h2>
//                     <div className="pbmit-contact-widget-lines">
//                       <div className="pbmit-contact-widget-phone">
//                         +(02) 574 - 328 - 301
//                       </div>
//                       <div className="pbmit-contact-widget-email">
//                         noreply@pbminfotech.com
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="pbmit-footer-widget-col-3 col-md-4">
//                   <div className="widget">
//                     <h2 className="widget-title">Our Social</h2>
//                     <div className="textwidget">
//                       <ul className="pbmit-social-links">
//                         <li className="pbmit-social-li pbmit-social-facebook">
//                           <a href="#" target="_blank" rel="noopener">
//                             <span>
//                               <i className="pbmit-base-icon-facebook-squared" />
//                             </span>
//                           </a>
//                         </li>
//                         <li className="pbmit-social-li pbmit-social-twitter">
//                           <a href="#" target="_blank" rel="noopener">
//                             <span>
//                               <i className="pbmit-base-icon-twitter" />
//                             </span>
//                           </a>
//                         </li>
//                         <li className="pbmit-social-li pbmit-social-instagram">
//                           <a href="#" target="_blank" rel="noopener">
//                             <span>
//                               <i className="pbmit-base-icon-instagram" />
//                             </span>
//                           </a>
//                         </li>
//                         <li className="pbmit-social-li pbmit-social-youtube">
//                           <a href="#" target="_blank" rel="noopener">
//                             <span>
//                               <i className="pbmit-base-icon-youtube-play" />
//                             </span>
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="pbmit-footer-text-area">
//             <div className="container">
//               <div className="pbmit-footer-text-inner">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="pbmit-footer-copyright-text-area">
//                       Copyright © 2023 <a href="#">Cleanfin</a>, All Rights
//                       Reserved.
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className=" pbmit-footer-menu-area">
//                       <ul>
//                         <li>
//                           <a href="#">Terms &amp; Conditions</a>
//                         </li>
//                         <li>
//                           <a href="#">Privacy Policy</a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//     {/* footer End */}
//   </>
//   {/* page wrapper End */}
//   {/* Search Box Start Here */}
//   <div className="pbmit-search-overlay">
//     <div className="pbmit-icon-close">
//       <svg
//         className="qodef-svg--close qodef-m"
//         xmlns="http://www.w3.org/2000/svg"
//         width="28.163"
//         height="28.163"
//         viewBox="0 0 26.163 26.163"
//       >
//         <rect width={36} height={1} transform="translate(0.707) rotate(45)" />
//         <rect
//           width={36}
//           height={1}
//           transform="translate(0 25.456) rotate(-45)"
//         />
//       </svg>
//     </div>
//     <div className="pbmit-search-outer">
//       <form className="pbmit-site-searchform">
//         <input
//           type="search"
//           className="form-control field searchform-s"
//           name="s"
//           placeholder="Search …"
//         />
//         <button type="submit" />
//       </form>
//     </div>
//   </div>
//   {/* Search Box End Here */}
//   {/* Scroll To Top */}
//   <div className="pbmit-progress-wrap">
//     <svg
//       className="pbmit-progress-circle svg-content"
//       width="100%"
//       height="100%"
//       viewBox="-1 -1 102 102"
//     >
//       <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
//     </svg>
//   </div>
//   {/* Scroll To Top End */}
//   JS
//   {/* ============================================ */}
//   {/* jQuery JS */}
//   {/*  */}
//   {/* Popper JS */}
//   {/*  */}
//   {/* Bootstrap JS */}
//   {/*  */}
//   {/* jquery Waypoints JS */}
//   {/*  */}
//   {/* jquery Appear JS */}
//   {/*  */}
//   {/* Numinate JS */}
//   {/*  */}
//   {/* Slick JS */}
//   {/*  */}
//   {/* Magnific JS */}
//   {/*  */}
//   {/* Circle Progress JS */}
//   {/*  */}
//   {/* countdown JS */}
//   {/*  */}
//   {/* AOS */}
//   {/*  */}
//   {/* GSAP */}
//   {/*  */}
//   {/* Scroll Trigger */}
//   {/*  */}
//   {/* Split Text */}
//   {/*  */}
//   {/* Magnetic */}
//   {/*  */}
//   {/* GSAP Animation */}
//   {/*  */}
//   {/* Chart Js */}
//   {/* 	 */}
//   {/* Scripts JS */}
//   {/*  */}
// </>

// )}
// export default Full