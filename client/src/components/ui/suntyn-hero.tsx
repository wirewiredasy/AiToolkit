
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Sparkles, Cube } from 'lucide-react';
import SuntynIconOnly from '@/components/ui/suntyn-icon-only';

export default function SuntynHero() {
  const [cubeRotation, setCubeRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCubeRotation(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Radial Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Professional Suntyn AI Logo */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {/* Professional Suntyn Icon */}
            <SuntynIconOnly size="hero" animated={true} className="drop-shadow-2xl" />
            <div className="flex flex-col">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-300 via-yellow-300 to-pink-300 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
                Suntyn AI
              </h1>
              <p className="text-sm text-orange-200/80 uppercase tracking-[0.3em] font-medium mt-1">
                Neural Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
          Unlocking potential
          <br />
          <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            through AI
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
          PDF, audio/video, image, image; government data,
          <br />
          Dev toolkit, powered by intelligent design.
        </p>

        {/* Enhanced 3D Visualization with Professional Elements */}
        <div className="relative mb-16 flex justify-center">
          <div className="relative">
            {/* Central Professional Sun Icon - Larger Version */}
            <div className="relative z-10">
              <SuntynIconOnly size="hero" animated={true} className="transform scale-150 drop-shadow-2xl" />
            </div>

            {/* Orbiting Technology Icons */}
            {[
              { icon: '📄', label: 'PDF', angle: 0, radius: 180, color: 'from-red-400 to-orange-400' },
              { icon: '🎵', label: 'Audio', angle: 60, radius: 180, color: 'from-green-400 to-teal-400' },
              { icon: '🎬', label: 'Video', angle: 120, radius: 180, color: 'from-purple-400 to-pink-400' },
              { icon: '🖼️', label: 'Image', angle: 180, radius: 180, color: 'from-blue-400 to-cyan-400' },
              { icon: '🏛️', label: 'Gov', angle: 240, radius: 180, color: 'from-yellow-400 to-orange-400' },
              { icon: '💻', label: 'Dev', angle: 300, radius: 180, color: 'from-indigo-400 to-purple-400' }
            ].map((item, index) => {
              const x = Math.cos((item.angle + cubeRotation * 0.5) * Math.PI / 180) * item.radius;
              const y = Math.sin((item.angle + cubeRotation * 0.5) * Math.PI / 180) * item.radius;
              
              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl hover:scale-110 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  <p className="text-white text-sm font-medium mt-2 text-center opacity-80">
                    {item.label}
                  </p>
                </div>
              );
            })}

            {/* Enhanced Circular Platform */}
            <div 
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-[500px] h-20 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-pink-500/20 rounded-full blur-xl"
              style={{ 
                transform: `translateX(-50%) perspective(400px) rotateX(75deg) scale(${1 + Math.sin(cubeRotation * 0.02) * 0.1})`
              }}
            ></div>

            {/* AI Processing Particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse shadow-lg"
                style={{
                  top: `${50 + Math.sin(cubeRotation * 0.03 + i * 0.5) * 60}%`,
                  left: `${50 + Math.cos(cubeRotation * 0.03 + i * 0.5) * 60}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0.7 + Math.sin(cubeRotation * 0.02 + i) * 0.3
                }}
              />
            ))}

            {/* Neural Network Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'scale(1.2)' }}>
              {[...Array(6)].map((_, i) => {
                const angle1 = (i * 60) * Math.PI / 180;
                const angle2 = ((i + 1) * 60) * Math.PI / 180;
                const radius = 140;
                const x1 = 250 + Math.cos(angle1) * radius;
                const y1 = 250 + Math.sin(angle1) * radius;
                const x2 = 250 + Math.cos(angle2) * radius;
                const y2 = 250 + Math.sin(angle2) * radius;
                
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#neural-gradient)"
                    strokeWidth="2"
                    opacity="0.6"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                );
              })}
              <defs>
                <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
            asChild
          >
            <Link href="/all-tools">
              Explore Solutions
            </Link>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-orange-400/50 text-white hover:bg-orange-500/20 backdrop-blur-sm px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link href="/demo">
              Request Demo
            </Link>
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-yellow-400/50 text-white hover:bg-yellow-500/20 backdrop-blur-sm px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link href="/docs">
              View Documentation
            </Link>
          </Button>
        </div>
      </div>

      {/* Enhanced glow effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
      
      {/* Additional ambient lighting */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-orange-500/10 via-yellow-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
}
