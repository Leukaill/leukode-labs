import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Reduced, performance-optimized animations
  
  // Simple hero fade-in only
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    gsap.fromTo(heroTitle, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out'
      }
    );
  }

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    gsap.fromTo(heroSubtitle, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        delay: 0.2, 
        ease: 'power2.out' 
      }
    );
  }

  const heroButtons = document.querySelector('.hero-buttons');
  if (heroButtons) {
    gsap.fromTo(heroButtons, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        delay: 0.4, 
        ease: 'power2.out' 
      }
    );
  }

  // Reduced portfolio animation
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (portfolioItems.length > 0) {
    gsap.fromTo(portfolioItems,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.portfolio-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
};

export const createMagneticEffect = (element: HTMLElement, strength: number = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export const animateOnScroll = (selector: string, animation: gsap.TweenVars) => {
  gsap.fromTo(selector, 
    { opacity: 0, y: 50 },
    {
      ...animation,
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

export const createFloatingAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    y: -20,
    duration: 3,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
};
