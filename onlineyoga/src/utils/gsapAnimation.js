import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ✅ Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ✅ Navbar animation using ref
export const HomeNavbarAnimation = (ref) => {
  if (ref?.current) {
    gsap.fromTo(
      ref.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: 'power2.out' }
    );
  }
};


export const HomePageHeroSection = () => {
  useEffect(() => {
    // Kill any previous animations to avoid conflicts on refresh
    gsap.killTweensOf('.animate-hero-title');
    gsap.killTweensOf('.animate-hero-sub');

    // Re-run animation
    gsap.from('.animate-hero-title', {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });

    gsap.from('.animate-hero-sub', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out',
    });
  }, []);
};
// ✅ About and Sessions animation (Scroll-based)
export const HomePageContentSection = () => {
  gsap.from('.animate-about-title', {
    opacity: 0,
    x: -30,
    duration: 1,
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
    },
  });

  gsap.from('.animate-about-text', {
    opacity: 0,
    x: 30,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
    },
  });

  gsap.from('.animate-session-title', {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    scrollTrigger: {
      trigger: '.animate-session-title',
      start: 'top 90%',
    },
  });

  gsap.from('.animate-card', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.animate-card',
      start: 'top 90%',
    },
  });
};
