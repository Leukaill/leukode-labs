import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Logo transition from hero to navbar
  ScrollTrigger.create({
    trigger: '.hero-logo',
    start: 'bottom center',
    end: 'bottom top',
    scrub: 1,
    onUpdate: self => {
      const heroLogo = document.querySelector('.hero-logo');
      const navbarLogo = document.querySelector('.navbar-logo');
      
      if (heroLogo && navbarLogo) {
        const progress = self.progress;
        
        // Animate hero logo out
        gsap.set(heroLogo, {
          opacity: 1 - progress,
          scale: 1 - progress * 0.2
        });
        
        // Animate navbar logo in
        gsap.set(navbarLogo, {
          opacity: progress,
          scale: 0.8 + progress * 0.2
        });
      }
    }
  });

  // Hero section animations
  gsap.fromTo('.hero-title', 
    { opacity: 0, y: 100 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1.2, 
      ease: 'power3.out',
      stagger: 0.2 
    }
  );

  gsap.fromTo('.hero-subtitle', 
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      delay: 0.5, 
      ease: 'power3.out' 
    }
  );

  gsap.fromTo('.hero-buttons', 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      delay: 0.8, 
      ease: 'power3.out' 
    }
  );

  // Service cards animation
  gsap.fromTo('.service-card',
    { opacity: 0, y: 80, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Benefits animation
  gsap.fromTo('.benefit-card',
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.benefits-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Portfolio items
  gsap.fromTo('.portfolio-item',
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.7)',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.portfolio-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );
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
