import { use3DBackground } from '@/hooks/use-3d-animations';

export const ParticleBackground = () => {
  const containerRef = use3DBackground();

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 particle-bg"
      style={{ pointerEvents: 'none' }}
    />
  );
};
