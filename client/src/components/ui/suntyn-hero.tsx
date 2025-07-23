import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Sparkles, Cube } from 'lucide-react';

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
        {/* Suntyn AI Logo */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-3">
            {/* 3D Cube Logo */}
            <div className="relative">
              <div 
                className="w-12 h-12 relative"
                style={{ 
                  transform: `perspective(100px) rotateX(${cubeRotation * 0.5}deg) rotateY(${cubeRotation}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Front face */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg border border-purple-300/30" style={{ transform: 'translateZ(6px)' }}></div>
                {/* Back face */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-700 rounded-lg border border-purple-400/30" style={{ transform: 'translateZ(-6px) rotateY(180deg)' }}></div>
                {/* Right face */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg border border-purple-300/30" style={{ transform: 'rotateY(90deg) translateZ(6px)' }}></div>
                {/* Left face */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-800 rounded-lg border border-purple-400/30" style={{ transform: 'rotateY(-90deg) translateZ(6px)' }}></div>
                {/* Top face */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-blue-400 rounded-lg border border-purple-200/30" style={{ transform: 'rotateX(90deg) translateZ(6px)' }}></div>
                {/* Bottom face */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-blue-900 rounded-lg border border-purple-500/30" style={{ transform: 'rotateX(-90deg) translateZ(6px)' }}></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-wide">Suntyn AI</h1>
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

        {/* 3D Cube Visualization */}
        <div className="relative mb-16 flex justify-center">
          <div className="relative">
            {/* Main 3D Cube */}
            <div 
              className="w-64 h-64 relative mx-auto"
              style={{ 
                transform: `perspective(800px) rotateX(${Math.sin(cubeRotation * 0.01) * 10 + 15}deg) rotateY(${cubeRotation * 0.8}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Cube faces with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl shadow-2xl border border-purple-400/30" style={{ transform: 'translateZ(132px)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-800 rounded-3xl shadow-2xl border border-purple-500/30" style={{ transform: 'translateZ(-132px) rotateY(180deg)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-700 rounded-3xl shadow-2xl border border-purple-400/30" style={{ transform: 'rotateY(90deg) translateZ(132px)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-blue-900 rounded-3xl shadow-2xl border border-purple-500/30" style={{ transform: 'rotateY(-90deg) translateZ(132px)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl shadow-2xl border border-purple-300/30" style={{ transform: 'rotateX(90deg) translateZ(132px)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-950 rounded-3xl shadow-2xl border border-purple-600/30" style={{ transform: 'rotateX(-90deg) translateZ(132px)' }}></div>
            </div>

            {/* Circular Platform */}
            <div 
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-sm"
              style={{ 
                transform: `translateX(-50%) perspective(400px) rotateX(75deg) scale(${1 + Math.sin(cubeRotation * 0.02) * 0.1})`
              }}
            ></div>

            {/* Floating particles around cube */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse"
                style={{
                  top: `${50 + Math.sin(cubeRotation * 0.02 + i) * 40}%`,
                  left: `${50 + Math.cos(cubeRotation * 0.02 + i) * 40}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.6 + Math.sin(cubeRotation * 0.01 + i) * 0.4
                }}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            size="lg"
            className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link href="/all-tools">
              Explore Solutions
            </Link>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link href="/demo">
              Request Demo
            </Link>
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link href="/docs">
              View Documentation
            </Link>
          </Button>
        </div>
      </div>

      {/* Subtle glow effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
    </section>
  );
}