import React, { useEffect, useRef } from "react";
import { Container, Navbar, Nav, Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import gsap from "gsap";
import { HomeNavbarAnimation } from "../utils/gsapAnimation";
import ScrollTrigger from "gsap/ScrollTrigger";
import img1 from '../assets/image.png';
import img2 from '../assets/img1.jpeg';
import img3 from '../assets/img2.jpeg';
import './custom-navbar.css';

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const navbarRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(subtextRef.current, {
      y: 30,
      opacity: 0,
      delay: 0.3,
      duration: 1,
      ease: "power3.out",
    });
  }, [headingRef, subtextRef]);

  return () => ctx.revert(); // Cleanup on unmount
}, []);

  const popularSessions = [
    { img: img1, title: "Beginner Morning Routine" },
    { img: img2, title: "Power Yoga for Weight Loss" },
    { img: img3, title: "Kids Yoga Fun Session" },
  ];

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar ref={navbarRef} className="custom-navbar" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand style={styles.projectTitle}>YogaStream</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#about" style={styles.navLink}>About Us</Nav.Link>
              <Nav.Link href="/register" style={styles.navLink}>Register</Nav.Link>
              <Nav.Link href="/login" style={styles.navLink}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <main style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 ref={headingRef} style={styles.heroHeading}>
            Embrace Wellness with Online Yoga
          </h1>
          <p ref={subtextRef} style={styles.heroSubtext}>
            Learn from certified instructors with live and on-demand yoga classes.
          </p>
        </div>
      </main>

      {/* About Section */}
      <section id="about" style={styles.aboutSection}>
        <Container>
          <h2 className="mb-4 text-white">About Online Yoga</h2>
          <p style={styles.aboutText}>
            YogaStream connects individuals with expert instructors for guided yoga sessions—anytime, anywhere. We offer beginner to advanced programs, kids' sessions, and therapeutic yoga practices. Stay active, mindful, and balanced with us.
          </p>
        </Container>
      </section>

      {/* Popular Sessions Carousel */}
      <section style={styles.projectsSection}>
        <Container>
          <h2 className="mb-4 text-white">Popular Sessions</h2>
          <Carousel fade interval={2000} pause="hover" indicators controls>
            {popularSessions.map((session, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={session.img}
                  alt={session.title}
                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h3 style={styles.carouselCaption}>{session.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#102d3dff',
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#ffffff',
  },
  navLink: {
    color: '#ffffff',
    marginRight: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  heroSection: {
    marginTop: '70px',
    height: '90vh',
    backgroundImage: `url('https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1600')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  heroOverlay: {
    padding: '40px',
    borderRadius: '12px',
    maxWidth: '700px',
  },
  heroHeading: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#ffffff', // Make text white
    textShadow: '2px 2px 4px rgba(0,0,0,0.7)', // Optional: adds readability
  },
  heroSubtext: {
    fontSize: '20px',
    marginTop: '20px',
    color: '#ffffff', // Make subtext white
    textShadow: '1px 1px 3px rgba(0,0,0,0.6)', // Optional: improves contrast
  },
  aboutSection: {
    padding: '80px 0',
    color: '#dddddd',
  },
  aboutText: {
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#cccccc',
  },
  projectsSection: {
    padding: '60px 0',
    backgroundColor: '#102e3aff',
  },
   carouselImage: {
    maxHeight: '350px',
    width: 'auto',
    objectFit: 'contain',
    borderRadius: '12px',
    margin: '0 auto',
  },
  carouselCaption: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    color: '#ffffff',
    textShadow: '1px 1px 2px black',
  },
};

export default Homepage;
