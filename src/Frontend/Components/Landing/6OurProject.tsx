import React, { useEffect, useState } from 'react';
import '../../Style/CSS/Landing/6OurProject.css';
import project1 from '../../assets/image/imgi_20_project-img-01-950x740.png';
import project2 from '../../assets/image/imgi_21_project-img-02-950x740.png';
import project3 from '../../assets/image/imgi_22_project-img-03-950x740.png';
import project4 from '../../assets/image/imgi_23_project-img-04-950x740.png';
import project5 from '../../assets/image/imgi_24_project-img-05-950x740.png';
import project6 from '../../assets/image/imgi_25_project-img-06-950x740.png';

const OurProjects = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      image: project1,
      category: "FUNDING",
      title: "Startup Funding"
    },
    {
      id: 2,
      image: project2,
      category: "CONSULTING",
      title: "Accounting Advisory"
    },
    {
      id: 3,
      image: project3,
      category: "INVESTMENT",
      title: "Stock Custodian"
    },
    {
      id: 4,
      image: project4,
      category: "MARKETING",
      title: "Business Strategy"
    },
    {
      id: 5,
      image: project5,
      category: "RESEARCH",
      title: "Market Research"
    },
    {
      id: 6,
      image: project6,
      category: "AUDITING",
      title: "Corporate Audit"
    }
  ];

  // Calculate scroll classes based on scroll position
  const getScrollClass = () => {
    if (scrollY > 200) return 'scrolled-more';
    if (scrollY > 100) return 'scrolled';
    return '';
  };

  return (
    <div className="our-projects-container">
      {/* Left Section - Sticky */}
      <div className={`projects-left-section ${getScrollClass()}`}>
        <div className="projects-header">
          <div className="our-projects-badge">Our Projects</div>
          <h1 className="projects-title">
            <span className="title-line">Selected case</span>
            <span className="title-line">studies</span>
          </h1>
          <p className="projects-description">
            We welcome and celebrate different perspectives to help our firm, our clients and our people.
          </p>
          <button className="cta-button">
            View Projects
            <svg className="pbmit-svg-arrow" xmlns="http://www.w3.org/2000/svg" width="10" height="19" viewBox="0 0 19 19">
              <line x1="1" y1="18" x2="17.8" y2="1.2" />
              <line x1="1.2" y1="1" x2="18" y2="1" />
              <line x1="18" y1="17.8" x2="18" y2="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Section - Scrollable Grid */}
      <div className="projects-right-section">
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                />
              </div>
              <div className="project-content">
                <div className="project-category">
                  <span className="category-dot">●</span>
                  {project.category}
                </div>
                <h3 className="project-title">
                  {project.title}
                  <svg className="project-arrowb" xmlns="http://www.w3.org/2000/svg" width="10" height="19" viewBox="0 0 19 19">
                    <line x1="1" y1="18" x2="17.8" y2="1.2" />
                    <line x1="1.2" y1="1" x2="18" y2="1" />
                    <line x1="18" y1="17.8" x2="18" y2="1" />
                  </svg>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProjects;
