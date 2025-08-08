export const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10" style={{ pointerEvents: 'none' }}>
      {/* Simple CSS-based particles for better performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
    </div>
  );
};
