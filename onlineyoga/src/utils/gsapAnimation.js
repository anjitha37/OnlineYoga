import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Navbar animation
export const HomeNavbarAnimation = (ref) => {
  if (ref?.current) {
    gsap.set(ref.current, { y: -20, opacity: 0 });
    gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });
  }
};


export const useHomePageHeroSection = () => {
  useEffect(() => {
    // Reset to hidden before animation
    gsap.set([".animate-hero-title", ".animate-hero-sub"], { opacity: 0, y: 0 });

    // Animate heading
    gsap.fromTo(
      ".animate-hero-title",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        onComplete: () => gsap.set(".animate-hero-title", { opacity: 1 })
      }
    );

    // Animate subtext
    gsap.fromTo(
      ".animate-hero-sub",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
        onComplete: () => gsap.set(".animate-hero-sub", { opacity: 1 })
      }
    );
  }, []);
};

// Footer columns animation
export const useHomePageContentSection = () => {
useEffect(() => {
  // optional: ensure visible in case animation doesn't fire
  gsap.set(['.footer-column.left-col', '.footer-column.right-col'], { opacity: 1, x: 0 });

  gsap.from(".footer-column.left-col", {
    x: -200,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".footer-section",
      start: "top 85%",  // adjust for when you want it to fire
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

}