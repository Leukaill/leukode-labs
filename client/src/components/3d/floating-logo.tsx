import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const FloatingLogo = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    gsap.to(logoRef.current, {
      y: -20,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    gsap.to(logoRef.current, {
      rotateY: 360,
      duration: 20,
      ease: 'none',
      repeat: -1
    });
  }, []);

  return (
    <div ref={logoRef} className="w-24 h-24 mx-auto mb-8">
      <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--google-blue))] to-[hsl(var(--google-green))] rounded-3xl flex items-center justify-center google-shadow-lg floating">
        <span className="material-icons text-white text-4xl">code</span>
      </div>
    </div>
  );
};
