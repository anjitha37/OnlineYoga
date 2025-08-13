import React, { useRef, useEffect } from "react";
import { Container, Navbar, Nav, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import {
  HomeNavbarAnimation,
  useHomePageHeroSection,
  useHomePageContentSection
} from "../utils/gsapAnimation";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

import "../index.css";

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    HomeNavbarAnimation(navbarRef);
  }, []);

  useHomePageHeroSection();
  useHomePageContentSection();

  // Footer columns animation
  useEffect(() => {
    gsap.set(['.footer-column.left-col', '.footer-column.right-col'], { opacity: 1, x: 0 });

    gsap.from(".footer-column.left-col", {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(".footer-column.right-col", {
      x: 200,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, []);

  const popularSessions = [
    { img: img1, title: "Morning Flow" },
    { img: img2, title: "Power Yoga" },
    { img: img3, title: "Kids Session" }
  ];

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <Navbar ref={navbarRef} className="custom-navbar" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home" className="project-title">YogaStream</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link href="#about" className="nav-link-custom">About Us</Nav.Link>
              <Nav.Link href="/register" className="nav-link-custom">Register</Nav.Link>
              <Nav.Link href="/login" className="nav-link-custom">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
{/* Hero Section */}
<main className="hero-carousel-section" id="home">
  <Carousel fade interval={4000} pause="hover" indicators controls>
    {popularSessions.map((session, index) => (
      <Carousel.Item key={index} className="hero-slide">
        <img
          className="d-block w-100 carousel-hero-image"
          src={session.img}
          alt={session.title}
        />
        <Carousel.Caption>
          {/* Full-screen overlay */}
          <div className="hero-overlay"></div>

          {/* Text above overlay */}
          <h1 className="hero-heading animate-hero-title">
            Embrace Wellness with Online Yoga
          </h1>
          <p className="hero-subtext animate-hero-sub">
            {session.title} – Live & On-Demand Yoga with Certified Instructors.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
</main>


      {/* About Section */}
      <section id="about" className="about-section">
        <Container>
          <div className="slice animate-about-title" tabIndex="0" style={{ display: "inline-block", marginBottom: "1em" }}>
            <span className="text">About Online Yoga</span>
          </div>
          <p className="about-text animate-about-text">
            YogaStream is a comprehensive online platform that connects individuals
            with certified yoga instructors to provide guided sessions that can be
            accessed anytime, anywhere. Whether you're a beginner or an advanced
            practitioner, YogaStream offers tailored programs to suit every level.
          </p>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <Container className="text-center">
          <div className="footer-row">
            <div className="footer-column left-col">
              <h5 className="footer-heading">Quick Links</h5>
              <a href="#home" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About Us</a>
              <a href="/login" className="footer-link">Sign In</a>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-column right-col">
              <h5 className="footer-heading">Contact Us</h5>
              <p className="footer-text">
                📧 <a href="mailto:anjithaanji103@gmail.com">anjithaanji103@gmail.com</a><br />
                📞 <a href="tel:+917306739589">7306739589</a><br />
                📍 Kochi, Kerala, India
              </p>
            </div>
          </div>

          <div className="footer-credit mt-3">
            © {new Date().getFullYear()} YogaStream. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Homepage;
