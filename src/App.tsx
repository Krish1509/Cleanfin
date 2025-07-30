import { useEffect } from 'react'
// import Full from './components/Full'
import './App.css'
import Header from './components/Html/Header'
import HeroSection from './components/Html/HeroSection'
import Footer from './components/Html/Footer'
import './assets/css/bootstrap.min.css';
import './assets/css/fontawesome.css';
import './assets/css/flaticon.css';
import './assets/css/pbminfotech-base-icons.css';
import './assets/css/themify-icons.css';
import './assets/css/swiper.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/aos.css';
import './assets/css/shortcode.css';
import './assets/css/base.css';
import './assets/css/style.css';
import './assets/css/responsive.css';

    // import Navbar from "./components/Navbar/Navbar"

    function App() {
  useEffect(() => {
    // Load all JS files in correct order
    const scripts = [
      '/src/assets/js/jquery.min.js',
      '/src/assets/js/popper.min.js',
      '/src/assets/js/bootstrap.min.js',
      '/src/assets/js/jquery.waypoints.min.js',
      '/src/assets/js/jquery.appear.js',
      '/src/assets/js/numinate.min.js',
      '/src/assets/js/jquery.magnific-popup.min.js',
      '/src/assets/js/circle-progress.min.js',
      '/src/assets/js/circle-progress.js',
      '/src/assets/js/jquery.countdown.min.js',
      '/src/assets/js/aos.js',
      '/src/assets/js/gsap.js',
      '/src/assets/js/ScrollTrigger.js',
      '/src/assets/js/SplitText.js',
      '/src/assets/js/gsap-animation.js',
      '/src/assets/js/swiper.min.js',
      '/src/assets/js/isotope.pkgd.min.js',
      '/src/assets/js/masonry.min.js',
      '/src/assets/js/magnetic.js',
      '/src/assets/js/hammer.min.js',
      '/src/assets/js/chart.js',
      '/src/assets/js/timeline.js',
      '/src/assets/js/scripts.js',
      '/src/assets/js/scripts.min.js',
    ];

    // Dynamically load scripts
    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    });

    // Cleanup function
    return () => {
      scripts.forEach(src => {
        const found = document.querySelector(`script[src="${src}"]`);
        if (found) found.remove();
      });
    };
  }, []);

  return (
    <>
    {/* <Navbar/> */}
      <Header/>
      <HeroSection/>
      <Footer/>
    </>
  )
}

export default App
