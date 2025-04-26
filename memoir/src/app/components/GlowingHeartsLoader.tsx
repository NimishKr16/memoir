// Glowing Heart Loader
const GlowingHeartLoader = () => (
    <div className="flex justify-center items-center">
      <div className="relative text-red-500 text-6xl animate-pulse">
        ❤️
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-30 animate-glow"></div>
      </div>
    </div>
  );
  
  export default GlowingHeartLoader;