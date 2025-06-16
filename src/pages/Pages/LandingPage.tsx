/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, MouseEvent } from "react";
import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";
import { ArrowLeft, ArrowRight, ChevronUp } from "react-feather";
import { useNavigate } from "react-router-dom";
import "../../assets/css/landing-page.css";
// Import images
import mewaLogo from "../../assets/images/MEWA_F_White.png";
import marketImage from "../../assets/images/landing-page/market-image.png";
// Import AOS library and its styles
import AOS from "aos";
import "aos/dist/aos.css";
import { getRequest } from "../../service/fetch-services";

type StaticPageListData = {
  _id: string;
  pageName: string;
  content?: any;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("hero");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    // Force immediate styling for all sections
    const initPageStyles = () => {
      // Navbar styling
      const navbar = document.querySelector(".navbar") as HTMLElement;
      if (navbar) {
        navbar.classList.add("navbar-dark");
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        navbar.style.width = "100%";
        navbar.style.padding = "0";
        navbar.style.position = "absolute";
        navbar.style.top = "0";
        navbar.style.left = "0";
        navbar.style.right = "0";
        navbar.style.marginBottom = "0";
        navbar.style.borderBottom = "none";

        // Container styling
        const container = navbar.querySelector(".container") as HTMLElement;
        if (container) {
          container.style.display = "flex";
          container.style.alignItems = "center";
          container.style.justifyContent = "space-between";
          container.style.padding = "1rem 15px";
        }

        // Button container styling
        const buttonContainer = navbar.querySelector(".d-flex") as HTMLElement;
        if (buttonContainer) {
          buttonContainer.style.display = "flex";
          buttonContainer.style.gap = "10px";
          buttonContainer.style.alignItems = "center";
        }

        // Button styling
        const buttons = buttonContainer?.querySelectorAll(".btn");
        if (buttons?.length) {
          buttons.forEach((btn, index) => {
            if (index < buttons.length - 1) {
              (btn as HTMLElement).style.marginRight = "10px";
            }
          });
        }
      }

      // Hero section styling
      const heroSection = document.querySelector(".hero-section") as HTMLElement;
      if (heroSection) {
        heroSection.style.background = "linear-gradient(135deg, #111827 0%, #1f2937 100%)";
        heroSection.style.padding = "9rem 0 5rem";
        heroSection.style.marginTop = "0";
        heroSection.style.borderTop = "none";

        // Hero content styling
        const heroContainer = heroSection.querySelector(".container") as HTMLElement;
        if (heroContainer) {
          heroContainer.style.position = "relative";
          heroContainer.style.zIndex = "1";
        }

        // Hero h4 styling
        const heroH4 = heroSection.querySelector("h4") as HTMLElement;
        if (heroH4) {
          heroH4.style.color = "#ffffff";
          heroH4.style.marginBottom = "1rem";
          heroH4.style.fontSize = "1.2rem";
        }

        // Hero title styling
        const heroTitle = heroSection.querySelector(".hero-title") as HTMLElement;
        if (heroTitle) {
          heroTitle.style.fontSize = "2.8rem";
          heroTitle.style.fontWeight = "700";
          heroTitle.style.marginBottom = "1rem";
          heroTitle.style.color = "#f0c14b";
          heroTitle.style.lineHeight = "1.2";
        }

        // Hero buttons styling
        const heroButtons = heroSection.querySelectorAll(".btn");
        if (heroButtons.length) {
          heroButtons.forEach((btn) => {
            (btn as HTMLElement).style.margin = "0 10px 0 0";
          });
        }
      }

      // Features section styling
      const featuresSection = document.querySelector("#features") as HTMLElement;
      if (featuresSection) {
        featuresSection.style.textAlign = "center";

        // Center the section title and text
        const titleContainer = featuresSection.querySelector(".text-center") as HTMLElement;
        if (titleContainer) {
          titleContainer.style.textAlign = "center";

          const heading = titleContainer.querySelector("h2") as HTMLElement;
          if (heading) {
            heading.style.textAlign = "center";
            heading.style.marginBottom = "1rem";
          }

          const lead = titleContainer.querySelector(".lead") as HTMLElement;
          if (lead) {
            lead.style.textAlign = "center";
            lead.style.marginBottom = "1.5rem";
          }
        }

        // Fix the row and columns for proper layout
        const row = featuresSection.querySelector(".row") as HTMLElement;
        if (row) {
          row.style.display = "flex";
          row.style.flexWrap = "wrap";
          row.style.justifyContent = "center";
          row.style.margin = "0 -15px";

          // Apply styling to each column
          const columns = row.querySelectorAll(".col-md-4");
          columns.forEach((col) => {
            (col as HTMLElement).style.padding = "0 15px";
            (col as HTMLElement).style.marginBottom = "30px";
            (col as HTMLElement).style.display = "flex";
            (col as HTMLElement).style.flexDirection = "column";
          });

          // Apply styling to each card
          const cards = row.querySelectorAll(".feature-card");
          cards.forEach((card) => {
            (card as HTMLElement).style.height = "100%";
            (card as HTMLElement).style.textAlign = "center";
            (card as HTMLElement).style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";

            // Style the card body
            const cardBody = card.querySelector(".card-body") as HTMLElement;
            if (cardBody) {
              cardBody.style.display = "flex";
              cardBody.style.flexDirection = "column";
              cardBody.style.alignItems = "center";
              cardBody.style.justifyContent = "center";
              cardBody.style.padding = "2rem";
            }

            // Style the icon container
            const iconContainer = cardBody?.querySelector(".feature-icon") as HTMLElement;
            if (iconContainer) {
              iconContainer.style.display = "flex";
              iconContainer.style.alignItems = "center";
              iconContainer.style.justifyContent = "center";
              iconContainer.style.width = "70px";
              iconContainer.style.height = "70px";
              iconContainer.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
              iconContainer.style.borderRadius = "50%";
              iconContainer.style.margin = "0 auto 1.5rem";
            }
          });
        }
      }

      // Testimonial cards styling
      const testimonialCards = document.querySelectorAll(".testimonial-card");
      if (testimonialCards.length) {
        testimonialCards.forEach((card) => {
          (card as HTMLElement).style.height = "100%";
          (card as HTMLElement).style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
        });
      }

      // CTA section styling
      const ctaSection = document.querySelector(".cta-section") as HTMLElement;
      if (ctaSection) {
        ctaSection.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        ctaSection.style.padding = "5rem 0";
      }

      // Footer styling
      const footer = document.querySelector("footer") as HTMLElement;
      if (footer) {
        footer.style.backgroundColor = "#111827";
        footer.style.padding = "4rem 0 2rem";
        footer.style.color = "#ffffff";

        // Style footer headings
        const headings = footer.querySelectorAll("h5");
        headings.forEach((heading) => {
          (heading as HTMLElement).style.color = "#ffffff";
          (heading as HTMLElement).style.fontWeight = "600";
          (heading as HTMLElement).style.marginBottom = "1.5rem";
          (heading as HTMLElement).style.fontSize = "1.125rem";
        });

        // Style footer paragraphs
        const paragraphs = footer.querySelectorAll("p");
        paragraphs.forEach((paragraph) => {
          (paragraph as HTMLElement).style.color = "rgba(255, 255, 255, 0.8)";
          (paragraph as HTMLElement).style.marginBottom = "1.5rem";
          (paragraph as HTMLElement).style.lineHeight = "1.6";
        });

        // Style footer links
        const links = footer.querySelectorAll(".footer-link");
        links.forEach((link) => {
          (link as HTMLElement).style.color = "rgba(255, 255, 255, 0.7)";
          (link as HTMLElement).style.transition = "color 0.3s ease";
          (link as HTMLElement).style.marginBottom = "0.75rem";
          (link as HTMLElement).style.fontSize = "0.9375rem";
        });

        // Style list items
        const listItems = footer.querySelectorAll(".list-unstyled li");
        listItems.forEach((item) => {
          (item as HTMLElement).style.marginBottom = "0.75rem";
          (item as HTMLElement).style.color = "rgba(255, 255, 255, 0.7)";
        });

        // Style social icons
        const socialIcons = footer.querySelector(".social-icons") as HTMLElement;
        if (socialIcons) {
          socialIcons.style.display = "flex";
          socialIcons.style.alignItems = "center";
          socialIcons.style.marginBottom = "1.5rem";

          const iconLinks = socialIcons.querySelectorAll("a");
          iconLinks.forEach((link) => {
            (link as HTMLElement).style.color = "rgba(255, 255, 255, 0.7)";
            (link as HTMLElement).style.marginRight = "1.25rem";
            (link as HTMLElement).style.display = "flex";
            (link as HTMLElement).style.alignItems = "center";
            (link as HTMLElement).style.justifyContent = "center";
          });
        }

        // Style the horizontal rule
        const hr = footer.querySelector("hr") as HTMLElement;
        if (hr) {
          hr.style.margin = "2rem 0";
          hr.style.opacity = "0.1";
          hr.style.borderColor = "rgba(255, 255, 255, 0.2)";
        }

        // Style copyright text
        const copyright = footer.querySelector(".text-center") as HTMLElement;
        if (copyright) {
          copyright.style.color = "rgba(255, 255, 255, 0.6)";
          copyright.style.fontSize = "0.875rem";
        }

        // Style back to top button if it exists
        const backToTopButton = document.querySelector(".back-to-top") as HTMLElement;
        if (backToTopButton) {
          backToTopButton.style.position = "fixed";
          backToTopButton.style.bottom = "30px";
          backToTopButton.style.right = "30px";
          backToTopButton.style.width = "50px";
          backToTopButton.style.height = "50px";
          backToTopButton.style.backgroundColor = "#10b981";
          backToTopButton.style.color = "white";
          backToTopButton.style.borderRadius = "50%";
          backToTopButton.style.display = "flex";
          backToTopButton.style.alignItems = "center";
          backToTopButton.style.justifyContent = "center";
          backToTopButton.style.cursor = "pointer";
          backToTopButton.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
          backToTopButton.style.transition = "all 0.3s ease";
          backToTopButton.style.zIndex = "999";

          // Style the icon
          const icon = backToTopButton.querySelector("svg") as SVGElement;
          if (icon) {
            icon.style.strokeWidth = "2.5";
          }
        }
      }

      // Pricing section styling
      const pricingSection = document.querySelector("#pricing") as HTMLElement;
      if (pricingSection) {
        pricingSection.style.backgroundColor = "#021817";
        pricingSection.style.backgroundImage = "radial-gradient(circle, rgba(16, 185, 129, 0.03) 0%, rgba(0, 0, 0, 0.3) 100%)";
        pricingSection.style.position = "relative";
        pricingSection.style.overflow = "hidden";
        pricingSection.style.padding = "5rem 0";

        // Style pricing title and subtitle
        const title = pricingSection.querySelector(".pricing-title") as HTMLElement;
        if (title) {
          title.style.fontSize = "2.5rem";
          title.style.fontWeight = "700";
          title.style.marginBottom = "1.5rem";
          title.style.textAlign = "center";
          title.style.color = "white";

          // Style the "Pricings" text in green
          const successText = title.querySelector(".text-success") as HTMLElement;
          if (successText) {
            successText.style.color = "#10b981";
          }
        }

        // Style all pricing cards
        const cards = pricingSection.querySelectorAll(".pricing-card");
        cards.forEach((card) => {
          (card as HTMLElement).style.backgroundColor = "#0f1a1a";
          (card as HTMLElement).style.borderRadius = "12px";
          (card as HTMLElement).style.overflow = "hidden";
          (card as HTMLElement).style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
          (card as HTMLElement).style.height = "100%";
          (card as HTMLElement).style.display = "flex";
          (card as HTMLElement).style.flexDirection = "column";
          (card as HTMLElement).style.border = "1px solid rgba(255, 255, 255, 0.05)";

          // Handle highlighted card
          if (card.classList.contains("highlighted")) {
            (card as HTMLElement).style.backgroundColor = "#0d251e";
            (card as HTMLElement).style.border = "1px solid #10b981";
            (card as HTMLElement).style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.2)";
            (card as HTMLElement).style.position = "relative";
            (card as HTMLElement).style.zIndex = "1";
          }
        });

        // Style pricing dividers
        const dividers = pricingSection.querySelectorAll(".pricing-divider");
        dividers.forEach((divider) => {
          (divider as HTMLElement).style.height = "1px";
          (divider as HTMLElement).style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          (divider as HTMLElement).style.width = "100%";
        });

        // Style plan names
        const planNames = pricingSection.querySelectorAll(".plan-name");
        planNames.forEach((name) => {
          (name as HTMLElement).style.fontSize = "1.25rem";
          (name as HTMLElement).style.color = "white";
          (name as HTMLElement).style.fontWeight = "600";
          (name as HTMLElement).style.marginBottom = "1.5rem";
          (name as HTMLElement).style.letterSpacing = "0.05em";
        });

        // Style price amounts
        const priceAmounts = pricingSection.querySelectorAll(".price-amount");
        priceAmounts.forEach((price) => {
          (price as HTMLElement).style.fontSize = "2.5rem";
          (price as HTMLElement).style.fontWeight = "700";
          (price as HTMLElement).style.color = "#10b981";
        });

        // Style feature list items
        const featureItems = pricingSection.querySelectorAll(".feature-list li");
        featureItems.forEach((item) => {
          (item as HTMLElement).style.display = "flex";
          (item as HTMLElement).style.alignItems = "center";
          (item as HTMLElement).style.marginBottom = "1.5rem";
          (item as HTMLElement).style.color = "rgba(255, 255, 255, 0.8)";

          // Fix vertical alignment of text with icon
          const textSpan = item.querySelector("span") as HTMLElement;
          if (textSpan) {
            textSpan.style.lineHeight = "1.2";
            textSpan.style.marginTop = "1px";
          }
        });

        // Style check circles
        const checkCircles = pricingSection.querySelectorAll(".check-circle");
        checkCircles.forEach((circle) => {
          (circle as HTMLElement).style.width = "32px";
          (circle as HTMLElement).style.height = "32px";
          (circle as HTMLElement).style.borderRadius = "50%";
          (circle as HTMLElement).style.display = "flex";
          (circle as HTMLElement).style.alignItems = "center";
          (circle as HTMLElement).style.justifyContent = "center";
          (circle as HTMLElement).style.marginRight = "1rem";
          (circle as HTMLElement).style.flexShrink = "0";
          (circle as HTMLElement).style.marginTop = "-2px";

          // Style the icon inside
          const icon = circle.querySelector(".feature-icon") as HTMLElement;
          if (icon) {
            icon.style.color = "#10b981";
            icon.style.strokeWidth = "3";
            icon.style.width = "16px";
            icon.style.height = "16px";
          }
        });

        // Fix alignment of text with icons
        const featureTexts = pricingSection.querySelectorAll(".feature-list li span");
        featureTexts.forEach((text) => {
          (text as HTMLElement).style.lineHeight = "1.2";
          (text as HTMLElement).style.marginTop = "1px";
        });

        // Style buttons
        const buttons = pricingSection.querySelectorAll(".choose-plan-btn");
        buttons.forEach((btn) => {
          (btn as HTMLElement).style.width = "100%";
          (btn as HTMLElement).style.padding = "0.75rem 0";
          (btn as HTMLElement).style.fontWeight = "500";
          (btn as HTMLElement).style.borderRadius = "6px";

          if (btn.classList.contains("highlighted")) {
            (btn as HTMLElement).style.backgroundColor = "#10b981";
            (btn as HTMLElement).style.borderColor = "#10b981";
            (btn as HTMLElement).style.color = "white";
          }
        });
      }

      // How We Do section styling
      const howWeDoSection = document.querySelector(".how-we-do-section") as HTMLElement;
      if (howWeDoSection) {
        howWeDoSection.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        howWeDoSection.style.padding = "5rem 0";
        howWeDoSection.style.position = "relative";
        howWeDoSection.style.overflow = "hidden";

        // Style the title
        const title = howWeDoSection.querySelector(".how-we-do-title") as HTMLElement;
        if (title) {
          title.style.fontSize = "2.5rem";
          title.style.fontWeight = "700";
          title.style.marginBottom = "3rem";
          title.style.textAlign = "center";
          title.style.color = "white";
        }

        // Style process cards
        const processCards = howWeDoSection.querySelectorAll(".process-card");
        processCards.forEach((card) => {
          (card as HTMLElement).style.width = "280px";
          (card as HTMLElement).style.height = "160px";
          (card as HTMLElement).style.position = "relative";
          (card as HTMLElement).style.padding = "2px";
          (card as HTMLElement).style.borderRadius = "8px";
          (card as HTMLElement).style.background = "linear-gradient(90deg, #08AEEA 0%, #2AF598 100%)";

          // Style card inner
          const cardInner = card.querySelector(".process-card-inner") as HTMLElement;
          if (cardInner) {
            cardInner.style.width = "100%";
            cardInner.style.height = "100%";
            cardInner.style.display = "flex";
            cardInner.style.alignItems = "center";
            cardInner.style.justifyContent = "center";
            cardInner.style.backgroundColor = "#121212";
            cardInner.style.borderRadius = "6px";
            cardInner.style.padding = "1.5rem";
            cardInner.style.textAlign = "center";
          }

          // Style process title
          const processTitle = card.querySelector(".process-title") as HTMLElement;
          if (processTitle) {
            processTitle.style.fontSize = "1.25rem";
            processTitle.style.fontWeight = "600";
            processTitle.style.color = "white";
            processTitle.style.margin = "0";
            processTitle.style.lineHeight = "1.4";
          }
        });

        // Style connectors
        const connectors = howWeDoSection.querySelectorAll(".process-connector");
        connectors.forEach((connector) => {
          (connector as HTMLElement).style.display = "flex";
          (connector as HTMLElement).style.flexDirection = "row";
          (connector as HTMLElement).style.alignItems = "center";
          (connector as HTMLElement).style.width = "auto";
          (connector as HTMLElement).style.position = "relative";
          (connector as HTMLElement).style.padding = "0 10px";

          // Style connector line
          const connectorLine = connector.querySelector(".connector-line") as HTMLElement;
          if (connectorLine) {
            connectorLine.style.width = "60px";
            connectorLine.style.height = "2px";
            connectorLine.style.background = "linear-gradient(90deg, #08AEEA 0%, #2AF598 100%)";
            connectorLine.style.marginRight = "8px";
            connectorLine.style.marginBottom = "0";
          }

          // Style connector text
          const connectorText = connector.querySelector(".connector-text") as HTMLElement;
          if (connectorText) {
            connectorText.style.fontSize = "1rem";
            connectorText.style.color = "#2AF598";
            connectorText.style.fontWeight = "500";
          }
        });

        // Style container
        const container = howWeDoSection.querySelector(".process-flow-container") as HTMLElement;
        if (container) {
          container.style.display = "flex";
          container.style.flexDirection = "row";
          container.style.alignItems = "center";
          container.style.justifyContent = "center";
          container.style.flexWrap = "nowrap";
          container.style.gap = "0";
          container.style.padding = "2rem 0";
          container.style.maxWidth = "1200px";
          container.style.margin = "0 auto";
        }
      }

      // What You Get section styling
      const whatYouGetSection = document.querySelector(".what-you-get-section") as HTMLElement;
      if (whatYouGetSection) {
        whatYouGetSection.style.padding = "5rem 0";
        whatYouGetSection.style.backgroundColor = "#ffffff";
        whatYouGetSection.style.position = "relative";
        whatYouGetSection.style.overflow = "hidden";

        // Add decorative background elements
        const beforeElement = document.createElement("div");
        beforeElement.className = "decoration-circle decoration-before";
        beforeElement.style.position = "absolute";
        beforeElement.style.width = "200px";
        beforeElement.style.height = "200px";
        beforeElement.style.borderRadius = "50%";
        beforeElement.style.background = "linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))";
        beforeElement.style.top = "-100px";
        beforeElement.style.left = "-100px";
        beforeElement.style.zIndex = "0";

        const afterElement = document.createElement("div");
        afterElement.className = "decoration-circle decoration-after";
        afterElement.style.position = "absolute";
        afterElement.style.width = "200px";
        afterElement.style.height = "200px";
        afterElement.style.borderRadius = "50%";
        afterElement.style.background = "linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))";
        afterElement.style.bottom = "-100px";
        afterElement.style.right = "-100px";
        afterElement.style.zIndex = "0";

        // Append decorative elements
        whatYouGetSection.appendChild(beforeElement);
        whatYouGetSection.appendChild(afterElement);

        // Add floating animation to decorative elements
        const addFloatAnimation = (element: HTMLElement, delay: number) => {
          element.style.animation = `floatAnimation 8s ease-in-out infinite`;
          element.style.animationDelay = `${delay}s`;
        };

        addFloatAnimation(beforeElement, 0);
        addFloatAnimation(afterElement, 4);

        // Style the title
        const title = whatYouGetSection.querySelector(".what-you-get-title") as HTMLElement;
        if (title) {
          title.style.fontSize = "2.5rem";
          title.style.fontWeight = "700";
          title.style.marginBottom = "3rem";
          title.style.textAlign = "center";
          title.style.color = "#333";
          title.style.animation = "fadeInUp 0.8s ease forwards";
        }

        // Style feature boxes
        const featureBoxes = whatYouGetSection.querySelectorAll(".feature-box");
        featureBoxes.forEach((box, index) => {
          // Apply styling to feature boxes
          (box as HTMLElement).style.padding = "2rem 1.5rem";
          (box as HTMLElement).style.borderRadius = "12px";
          (box as HTMLElement).style.height = "100%";
          (box as HTMLElement).style.minHeight = "300px";
          (box as HTMLElement).style.display = "flex";
          (box as HTMLElement).style.flexDirection = "column";
          (box as HTMLElement).style.alignItems = "center";
          (box as HTMLElement).style.textAlign = "center";
          (box as HTMLElement).style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
          (box as HTMLElement).style.position = "relative";
          (box as HTMLElement).style.overflow = "hidden";
          (box as HTMLElement).style.opacity = "0";
          (box as HTMLElement).style.animation = "popIn 0.6s ease forwards";
          (box as HTMLElement).style.animationDelay = `${0.1 + index * 0.2}s`;

          // Create pseudo-element for border animation
          const createBorderEffect = () => {
            const borderEffect = document.createElement("div");
            borderEffect.className = "border-effect";
            borderEffect.style.position = "absolute";
            borderEffect.style.top = "0";
            borderEffect.style.right = "0";
            borderEffect.style.bottom = "0";
            borderEffect.style.left = "0";
            borderEffect.style.zIndex = "-1";
            borderEffect.style.margin = "-2px";
            borderEffect.style.borderRadius = "14px";
            borderEffect.style.background = "linear-gradient(45deg, #10b981, #3b82f6, #9333ea, #f59e0b)";
            borderEffect.style.backgroundSize = "300% 300%";
            borderEffect.style.animation = "borderAnimation 6s ease infinite";
            borderEffect.style.opacity = "0";
            borderEffect.style.transition = "opacity 0.3s ease";

            box.appendChild(borderEffect);
          };

          createBorderEffect();

          // Apply specific background colors based on class
          if (box.classList.contains("purple")) {
            (box as HTMLElement).style.backgroundColor = "#f8f0ff";
          } else if (box.classList.contains("teal")) {
            (box as HTMLElement).style.backgroundColor = "#e6faf8";
          } else if (box.classList.contains("blue")) {
            (box as HTMLElement).style.backgroundColor = "#e6f3ff";
          } else if (box.classList.contains("beige")) {
            (box as HTMLElement).style.backgroundColor = "#fff8e6";
          }

          // Style icon wrapper with float animation
          const iconWrapper = box.querySelector(".feature-icon-wrapper") as HTMLElement;
          if (iconWrapper) {
            iconWrapper.style.marginBottom = "1rem";
            iconWrapper.style.marginTop = "1rem";
            iconWrapper.style.animation = "floatAnimation 4s ease-in-out infinite";
          }

          // Style icon background
          const iconBg = box.querySelector(".feature-icon-bg") as HTMLElement;
          if (iconBg) {
            iconBg.style.width = "80px";
            iconBg.style.height = "80px";
            iconBg.style.display = "flex";
            iconBg.style.alignItems = "center";
            iconBg.style.justifyContent = "center";
            iconBg.style.borderRadius = "12px";
            iconBg.style.backgroundColor = "#ffffff";
            iconBg.style.margin = "0 auto";
            iconBg.style.transition = "all 0.3s ease";
            iconBg.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.05)";
          }

          // Style icons based on parent box class
          const icon = box.querySelector(".feature-icon") as HTMLElement;
          if (icon) {
            if (box.classList.contains("purple")) {
              icon.style.color = "#9333ea";
            } else if (box.classList.contains("teal")) {
              icon.style.color = "#0d9488";
            } else if (box.classList.contains("blue")) {
              icon.style.color = "#3b82f6";
            } else if (box.classList.contains("beige")) {
              icon.style.color = "#d97706";
            }
          }

          // Style feature content
          const featureContent = box.querySelector(".feature-content") as HTMLElement;
          if (featureContent) {
            featureContent.style.marginTop = "auto";
            featureContent.style.width = "100%";
            featureContent.style.display = "flex";
            featureContent.style.flexDirection = "column";
            featureContent.style.alignItems = "center";
          }

          // Style feature title with fade-in animation
          const featureTitle = box.querySelector(".feature-title") as HTMLElement;
          if (featureTitle) {
            featureTitle.style.fontSize = "1.25rem";
            featureTitle.style.fontWeight = "600";
            featureTitle.style.marginBottom = "0.75rem";
            featureTitle.style.color = "#333";
            featureTitle.style.opacity = "1";
            featureTitle.style.animation = "fadeIn 0.4s ease forwards";
            featureTitle.style.animationDelay = "0.4s";
            featureTitle.style.textAlign = "center";
            featureTitle.style.width = "100%";
            featureTitle.style.display = "block";
          }

          // Style feature text with fade-in animation
          const featureText = box.querySelector(".feature-text") as HTMLElement;
          if (featureText) {
            featureText.style.color = "#666";
            featureText.style.fontSize = "0.95rem";
            featureText.style.lineHeight = "1.6";
            featureText.style.marginBottom = "0";
            featureText.style.opacity = "1";
            featureText.style.animation = "fadeIn 0.4s ease forwards";
            featureText.style.animationDelay = "0.6s";
            featureText.style.textAlign = "center";
            featureText.style.width = "100%";
            featureText.style.display = "block";
            featureText.style.padding = "0 0.5rem";
          }
        });
      }
    };

    // Run initialization immediately and also after a short delay
    initPageStyles();

    // Also run on window load to ensure all resources are loaded
    window.addEventListener("load", initPageStyles);

    // Force re-initialization after delays to ensure styles are applied
    const timeoutId1 = setTimeout(initPageStyles, 50);
    const timeoutId2 = setTimeout(initPageStyles, 100);
    const timeoutId3 = setTimeout(initPageStyles, 300);

    // Add scroll event listener for back-to-top button and active section tracking
    const handleScroll = () => {
      // Show back-to-top button when scrolled down
      const backToTopButton = document.querySelector(".back-to-top");
      if (window.scrollY > 300) {
        backToTopButton?.classList.add("show");
      } else {
        backToTopButton?.classList.remove("show");
      }

      // Update active section based on scroll position
      const howWeDoSection = document.getElementById("how-we-do");
      const whatYouGetSection = document.getElementById("what-you-get");
      const servicesSection = document.getElementById("services");
      const benefitsSection = document.getElementById("benefits");
      const testimonialsSection = document.getElementById("testimonials");
      const paymentSection = document.getElementById("payment");

      // Default to 'hero' section
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
      // Check each section's position and set the active section
      else if (howWeDoSection && howWeDoSection.getBoundingClientRect().top <= 200 && howWeDoSection.getBoundingClientRect().bottom >= 200) {
        setActiveSection("how-we-do");
      } else if (whatYouGetSection && whatYouGetSection.getBoundingClientRect().top <= 200 && whatYouGetSection.getBoundingClientRect().bottom >= 200) {
        setActiveSection("what-you-get");
      } else if (servicesSection && servicesSection.getBoundingClientRect().top <= 200 && servicesSection.getBoundingClientRect().bottom >= 200) {
        setActiveSection("services");
      } else if (benefitsSection && benefitsSection.getBoundingClientRect().top <= 200 && benefitsSection.getBoundingClientRect().bottom >= 200) {
        setActiveSection("benefits");
      } else if (testimonialsSection && testimonialsSection.getBoundingClientRect().top <= 200 && testimonialsSection.getBoundingClientRect().bottom >= 200) {
        setActiveSection("testimonials");
      } else if (paymentSection && paymentSection.getBoundingClientRect().top <= 200 && paymentSection.getBoundingClientRect().bottom >= 200) {
        setActiveSection("payment");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("load", initPageStyles);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  // Handle scroll to top with smooth scrolling
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Update the scrollToSection function
  const scrollToSection = (sectionId: string): void => {
    // Close the mobile menu
    setExpanded(false);

    // Find the section element
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Scroll to the section with smooth behavior
    window.scrollTo({
      top: section.offsetTop - 80, // Account for navbar height
      behavior: "smooth",
    });

    // Update active section
    setActiveSection(sectionId);
  };

  // Toggle menu function
  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  const [data, setData] = useState<StaticPageListData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getRequest("static-pages/list", false);
      const { pages } = result;
      setData(pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatPageName = (slug: string) => {
    return slug
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const scrollTestimonials = (direction: "left" | "right", distance = 350) => {
    const container = document.querySelector(".testimonial-cards-container") as HTMLElement;
    if (container) {
      const scrollAmount = direction === "left" ? -distance : distance;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page position-relative">
      {/* Navbar - Update with expanded state and toggle handler */}
      <Navbar variant="dark" expand="lg" expanded={expanded} className="py-2 px-0">
        <Container fluid className="px-3">
          <Navbar.Brand href="#hero" className="d-flex align-items-center">
            <img src={mewaLogo} alt="Mewa Logo" className="me-2" height="80" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleMenu}>
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <span className="navbar-toggler-icon"></span>
            )}
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav" className="p-0">
            <Nav className="ms-auto w-100">
              <Nav.Link
                href="#hero"
                className="px-0"
                active={activeSection === "hero"}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection("hero");
                  setExpanded(false);
                }}
              >
                Home
              </Nav.Link>

              <Nav.Link
                href="#how-we-do"
                className="px-0"
                active={activeSection === "how-we-do"}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection("how-we-do");
                  setExpanded(false);
                }}
              >
                How We Do
              </Nav.Link>

              <Nav.Link
                href="#what-you-get"
                className="px-0"
                active={activeSection === "what-you-get"}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection("what-you-get");
                  setExpanded(false);
                }}
              >
                What You Get
              </Nav.Link>

              <Nav.Link
                href="#services"
                className="px-0"
                active={activeSection === "services"}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection("services");
                  setExpanded(false);
                }}
              >
                Services
              </Nav.Link>

              <Nav.Link
                href="#benefits"
                className="px-0"
                active={activeSection === "benefits"}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection("benefits");
                  setExpanded(false);
                }}
              >
                Benefits
              </Nav.Link>

              <Nav.Link
                href="#testimonials"
                className="px-0"
                active={activeSection === "testimonials"}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection("testimonials");
                  setExpanded(false);
                }}
              >
                Testimonials
              </Nav.Link>

              <Nav.Link
                href="#payment"
                className="px-0"
                active={activeSection === "payment"}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection("payment");
                  setExpanded(false);
                }}
              >
                Payment
              </Nav.Link>

              {/* Divider */}
              <div className="nav-divider"></div>
            </Nav>
            {/* Desktop navigation links that will be hidden on mobile */}
            <Nav className="desktop-only ms-auto">
              <Nav.Link
                className="nav-button-link"
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  handleLogin();
                  setExpanded(false);
                }}
              >
                Login
              </Nav.Link>
            </Nav>

            {/* Mobile only buttons that will be hidden on desktop */}
            <div className="mobile-only-buttons">
              <button
                className="mobile-button mobile-login-button"
                onClick={() => {
                  handleLogin();
                  setExpanded(false);
                }}
              >
                Login
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col xs={12} lg={6} className="mb-5 mb-lg-0">
              <div data-aos="fade-right" data-aos-delay="100">
                <h4>We'll Provide You</h4>
                <h2 className="hero-title">
                  Buy & Sell Alerts
                  <br />
                  With Target & Stop Loss
                </h2>
                <p>
                  <i>Trade. Chill. Repeat.</i>
                </p>
                <div className="d-flex mt-4">
                  <Button variant="outline-light" size="lg" onClick={handleLogin}>
                    JOIN NOW
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6} className="text-center">
              <img src={marketImage} alt="Trading Alerts" className="hero-image img-fluid" data-aos="fade-left" data-aos-delay="300" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* How We Do Section */}
      <section className="how-we-do-section" id="how-we-do">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12}>
              <h2 className="how-we-do-title" data-aos="fade-up">
                How We Do
              </h2>
              <div className="process-flow-container">
                <div className="process-card" data-aos="fade-up" data-aos-delay="100">
                  <div className="process-card-inner">
                    <h4 className="process-title">After years of research, We have developed our own technical system which generates trades with accuracy</h4>
                  </div>
                </div>
                <div className="process-connector" data-aos="fade-up" data-aos-delay="150">
                  <div className="connector-line"></div>
                  <span className="connector-text">Next</span>
                </div>
                <div className="process-card" data-aos="fade-up" data-aos-delay="200">
                  <div className="process-card-inner">
                    <h4 className="process-title">AI + Human teamwork sharpens our recommendations</h4>
                  </div>
                </div>
                <div className="process-connector" data-aos="fade-up" data-aos-delay="250">
                  <div className="connector-line"></div>
                  <span className="connector-text">Followed by</span>
                </div>
                <div className="process-card" data-aos="fade-up" data-aos-delay="300">
                  <div className="process-card-inner">
                    <h4 className="process-title">All recommendations are backed by logic and experience</h4>
                  </div>
                </div>
                <div className="process-connector" data-aos="fade-up" data-aos-delay="350">
                  <div className="connector-line"></div>
                  <span className="connector-text">Finally</span>
                </div>
                <div className="process-card" data-aos="fade-up" data-aos-delay="400">
                  <div className="process-card-inner">
                    <h4 className="process-title">Complex data transformed into simple, actionable recommendations</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* What You Get Section */}
      <section className="what-you-get-section" id="what-you-get">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12}>
              <h2 className="what-you-get-title" data-aos="fade-up">
                What You Get
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={6} lg={3} className="mb-4 mb-lg-0 feature-box-container">
              <div className="feature-box purple" data-aos="zoom-in" data-aos-delay="100">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg">
                    <i className="feature-icon fas fa-chart-line fa-2x"></i>
                  </div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Strategic Recommendations</h3>
                  <p className="feature-text">Expert-backed Buy and Sell Recommendations with Target and Stop Loss</p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} className="mb-4 mb-lg-0 feature-box-container">
              <div className="feature-box teal" data-aos="zoom-in" data-aos-delay="200">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg">
                    <i className="feature-icon fas fa-chart-bar fa-2x"></i>
                  </div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Performance Analytics</h3>
                  <p className="feature-text">
                    Track performance that provides complete transparency, allowing you to see real results and make data-driven decisions with confidence.
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} className="mb-4 mb-lg-0 feature-box-container">
              <div className="feature-box blue" data-aos="zoom-in" data-aos-delay="300">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg">
                    <i className="feature-icon fas fa-globe fa-2x"></i>
                  </div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Market Intelligence</h3>
                  <p className="feature-text">Stay ahead with our comprehensive calendar covering global market events</p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} className="mb-4 mb-lg-0 feature-box-container">
              <div className="feature-box beige" data-aos="zoom-in" data-aos-delay="400">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg">
                    <i className="feature-icon fas fa-graduation-cap fa-2x"></i>
                  </div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Knowledge Hub</h3>
                  <p className="feature-text">
                    Access a wealth of educational resources, institutional investment data (FII & DII), and significant market transactions (Block & Bulk Deals) directly on your
                    device
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Slider Section */}
      <section className="services-section" id="services">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center mb-5">
              <h2 className="section-title" data-aos="fade-up">
                You Will Get <span className="text-gradient">Services For</span>
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12}>
              <div className="trading-cards-container" data-aos="fade-up">
                <div className="trading-card-item" data-aos="zoom-in" data-aos-delay="100" onClick={handleLogin}>
                  <div className="trading-card">
                    <div className="card-icon">
                      <i className="fas fa-chart-line fa-3x"></i>
                    </div>
                  </div>
                  <div className="card-label">
                    Nifty <br /> Future
                  </div>
                </div>
                <div className="trading-card-item" data-aos="zoom-in" data-aos-delay="200" onClick={handleLogin}>
                  <div className="trading-card">
                    <div className="card-icon">
                      <i className="fas fa-university fa-3x"></i>
                    </div>
                  </div>
                  <div className="card-label">
                    Bank Nifty <br />
                    Future
                  </div>
                </div>
                <div className="trading-card-item" data-aos="zoom-in" data-aos-delay="300" onClick={handleLogin}>
                  <div className="trading-card">
                    <div className="card-icon">
                      <i className="fas fa-poll fa-3x"></i>
                    </div>
                  </div>
                  <div className="card-label">
                    Sensex <br /> Future
                  </div>
                </div>
                <div className="trading-card-item" data-aos="zoom-in" data-aos-delay="400" onClick={handleLogin}>
                  <div className="trading-card">
                    <div className="card-icon">
                      <i className="fas fa-coins fa-3x"></i>
                    </div>
                  </div>
                  <div className="card-label">
                    Future <br /> Stocks
                  </div>
                </div>
                <div className="trading-card-item" data-aos="zoom-in" data-aos-delay="500" onClick={handleLogin}>
                  <div className="trading-card">
                    <div className="card-icon">
                      <i className="fas fa-chart-area fa-3x"></i>
                    </div>
                  </div>
                  <div className="card-label">
                    Equity <br /> Future
                  </div>
                </div>
                <div className="trading-card-item" data-aos="zoom-in" data-aos-delay="600" onClick={handleLogin}>
                  <div className="trading-card">
                    <div className="card-icon">
                      <i className="fas fa-gem fa-3x"></i>
                    </div>
                  </div>
                  <div className="card-label">
                    Commodity <br /> Future
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-5" id="benefits">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">
            Benefits
          </h2>
          <Row className="justify-content-center">
            <Col sm={12} md={6} lg={3} className="mb-4 benefit-card-container">
              <div className="benefit-card" data-aos="fade-up" data-aos-delay="100">
                <div className="benefit-icon">
                  <i className="fas fa-bell fa-2x"></i>
                </div>
                <h3>Real-Time Alerts</h3>
                <p>Get timely Buy/Sell/Hold recommendations directly to your phone, so you never miss a market opportunity.</p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={3} className="mb-4 benefit-card-container">
              <div className="benefit-card" data-aos="fade-up" data-aos-delay="200">
                <div className="benefit-icon">
                  <i className="fas fa-mobile-alt fa-2x"></i>
                </div>
                <h3>Easy-to-Use Mobile App</h3>
                <p>Access all recommendations, market events conveniently on the go with our user-friendly app.</p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={3} className="mb-4 benefit-card-container">
              <div className="benefit-card" data-aos="fade-up" data-aos-delay="300">
                <div className="benefit-icon">
                  <i className="fas fa-wallet fa-2x"></i>
                </div>
                <h3>Cost Effective</h3>
                <p>Maximize your profits with our affordable plans that deliver high-quality trading insights without breaking the bank.</p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={3} className="mb-4 benefit-card-container">
              <div className="benefit-card" data-aos="fade-up" data-aos-delay="300">
                <div className="benefit-icon">
                  <i className="fas fa-headset fa-2x"></i>
                </div>
                <h3>Dedicated Client Support</h3>
                <p>Need help? Our Customer support team is available via email and to answer all your queries quickly.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">
            What Our Users Say
          </h2>
          <div className="testimonial-slider-wrapper position-relative">
            <button className="testimonial-arrow testimonial-arrow-left d-none d-md-flex" aria-label="Scroll testimonials left" onClick={() => scrollTestimonials("left")}>
              <span aria-hidden="true" className="d-flex align-items-center justify-content-center">
                <ArrowLeft />
              </span>
            </button>
            <div className="testimonial-cards-container" data-aos="fade-up">
              <div className="testimonial-card-item">
                <Card className="testimonial-card" data-aos="fade-up" data-aos-delay="100">
                  <Card.Body>
                    <div className="d-flex mb-3">
                      <div className="testimonial-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="ms-3">
                        <h5 className="mb-0">Priya Sharma</h5>
                        <small className="text-muted">Retail Trader</small>
                      </div>
                    </div>
                    <div className="text-warning mb-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <Card.Text>
                      "The accuracy of these trade recommendations is incredible. I've been able to significantly improve my success rate in Nifty options trading thanks to their
                      precise entries and exits."
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="testimonial-card-item">
                <Card className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
                  <Card.Body>
                    <div className="d-flex mb-3">
                      <div className="testimonial-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="ms-3">
                        <h5 className="mb-0">Rajesh Patel</h5>
                        <small className="text-muted">Commodity Trader</small>
                      </div>
                    </div>
                    <div className="text-warning mb-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <Card.Text>
                      "Their commodity market recommendations have consistently delivered results. The clear targets and stop-loss levels take the guesswork out of trading. Worth
                      every rupee!"
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="testimonial-card-item">
                <Card className="testimonial-card" data-aos="fade-up" data-aos-delay="300">
                  <Card.Body>
                    <div className="d-flex mb-3">
                      <div className="testimonial-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="ms-3">
                        <h5 className="mb-0">Amit Desai</h5>
                        <small className="text-muted">Part-time Investor</small>
                      </div>
                    </div>
                    <div className="text-warning mb-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                    <Card.Text>
                      "As someone who can't monitor markets all day, the mobile alerts are a game-changer. The notifications are timely, and the analysis behind each recommendation
                      is thorough and educational."
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <button className="testimonial-arrow testimonial-arrow-right d-none d-md-flex" aria-label="Scroll testimonials right" onClick={() => scrollTestimonials("right")}>
              <span aria-hidden="true">
                <ArrowRight className="d-flex align-items-center justify-content-center" />
              </span>
            </button>
          </div>
        </Container>
      </section>

      {/* Payment Section */}
      <section className="pricing-section" id="payment">
        <Container>
          <h2 className="pricing-title" data-aos="fade-up">
            Future & Options <span className="text-success">Payment</span>
          </h2>
          <p className="pricing-subtitle" data-aos="fade-up" data-aos-delay="100">
            Choose the perfect plan for your needs. All plans include access to our core features.
          </p>
          <Row className="justify-content-center">
            <Col sm={12} md={6} lg={4} className="mb-4">
              <div className="pricing-card" data-aos="fade-up" data-aos-delay="150">
                <div className="pricing-header">
                  <h3 className="plan-name">10 Days Trial</h3>
                  <div className="plan-price">
                    <span className="price-amount">₹ 1500</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4} className="mb-4">
              <div className="pricing-card" data-aos="fade-up" data-aos-delay="150">
                <div className="pricing-header">
                  <h3 className="plan-name">Monthly</h3>
                  <div className="plan-price">
                    <span className="price-amount">₹ 4500</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4} className="mb-4">
              <div className="pricing-card" data-aos="fade-up" data-aos-delay="150">
                <div className="pricing-header">
                  <h3 className="plan-name">Quarterly</h3>
                  <div className="plan-price">
                    <span className="price-amount">₹ 10000</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pricing-section" id="payment">
        <Container>
          <h2 className="pricing-title" data-aos="fade-up">
            Commodity <span className="text-success">Payment</span>
          </h2>
          <p className="pricing-subtitle" data-aos="fade-up" data-aos-delay="100">
            Choose the perfect plan for your needs. All plans include access to our core features.
          </p>
          <Row className="justify-content-center">
            <Col sm={12} md={6} lg={4} className="mb-4">
              <div className="pricing-card" data-aos="fade-up" data-aos-delay="150">
                <div className="pricing-header">
                  <h3 className="plan-name">10 Days Trial</h3>
                  <div className="plan-price">
                    <span className="price-amount">₹ 3500</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4} className="mb-4">
              <div className="pricing-card" data-aos="fade-up" data-aos-delay="150">
                <div className="pricing-header">
                  <h3 className="plan-name">Monthly</h3>
                  <div className="plan-price">
                    <span className="price-amount">₹ 11000</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4} className="mb-4">
              <div className="pricing-card" data-aos="fade-up" data-aos-delay="150">
                <div className="pricing-header">
                  <h3 className="plan-name">Quarterly</h3>
                  <div className="plan-price">
                    <span className="price-amount">₹ 25000</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Remove the Contact/Get In Touch Section and replace with only the back to top button and footer */}
      <div className="back-to-top" onClick={scrollToTop} data-aos="fade-up" data-aos-duration="300" data-aos-anchor=".footer">
        <ChevronUp size={24} />
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-light py-4">
        <Container>
          <Row className="gy-4">
            <Col xs={12} md={5} className="mb-4 mb-md-0">
              <h5>About Mewa</h5>
              <p>
                Your trusted partner for financial market insights. We provide expert trading recommendations with precise target and stop-loss levels for Nifty, Bank Nifty,
                Sensex, Stocks, and Commodities.
              </p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-4 mb-md-0">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#hero" className="footer-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#how-we-do" className="footer-link">
                    How We Do
                  </a>
                </li>
                <li>
                  <a href="#what-you-get" className="footer-link">
                    What You Get
                  </a>
                </li>
                <li>
                  <a href="#services" className="footer-link">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="footer-link">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#payment" className="footer-link">
                    Payment
                  </a>
                </li>
              </ul>
            </Col>
            <Col xs={6} md={4} className="mb-4 mb-md-0">
              <h5>Resources</h5>
              <ul className="list-unstyled">
                {!loading
                  ? data?.length &&
                    data?.map((staticLink) => (
                      <li key={staticLink?._id}>
                        <a href={`/pages/${staticLink?.pageName}`} className="footer-link" target="_blank">
                          {formatPageName(staticLink?.pageName)}
                        </a>
                      </li>
                    ))
                  : ""}
              </ul>
            </Col>
          </Row>
          <hr className="my-4" />
          <div className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Mewa. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
