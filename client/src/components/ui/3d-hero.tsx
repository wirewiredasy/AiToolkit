import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  Brain, 
  Zap, 
  FileText, 
  Image, 
  Video, 
  Shield,
  ArrowRight,
  Sparkles,
  Layers,
  Code
} from 'lucide-react';

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 15
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            bottom: `${particle.y}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

const FloatingToolCard = ({ 
  icon: Icon, 
  title, 
  className = "" 
}: { 
  icon: any, 
  title: string, 
  className?: string 
}) => (
  <div className={`absolute glass-card rounded-2xl p-4 floating-3d ${className}`}>
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <span className="text-white font-medium">{title}</span>
    </div>
  </div>
);

const OrbitingTools = () => {
  const tools = [
    { icon: FileText, name: "PDF Tools", color: "from-red-500 to-orange-500" },
    { icon: Image, name: "Image AI", color: "from-green-500 to-teal-500" },
    { icon: Video, name: "Media Tools", color: "from-purple-500 to-pink-500" },
    { icon: Shield, name: "Gov Tools", color: "from-blue-500 to-indigo-500" },
    { icon: Code, name: "Dev Tools", color: "from-yellow-500 to-red-500" },
    { icon: Brain, name: "AI Tools", color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <div className="relative w-96 h-96 mx-auto">
      <div className="tool-orbit w-full h-full">
        {tools.map((tool, index) => {
          const angle = (index * 60) * (Math.PI / 180);
          const radius = 150;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={tool.name}
              className="orbit-item"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="glass-card rounded-2xl p-4 tool-card-3d hover:scale-110 transition-all duration-300">
                <div className={`p-3 bg-gradient-to-br ${tool.color} rounded-xl shadow-lg`}>
                  <tool.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-white text-sm font-medium mt-2 text-center">{tool.name}</p>
              </div>
            </div>
          );
        })}
        
        {/* Central hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="glass-card rounded-full p-8 animate-glow">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-6">
              <Sparkles className="h-12 w-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Hero3D() {
  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen hero-bg flex items-center justify-center overflow-hidden">
      <FloatingParticles />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in space-y-8">
          {/* Logo and title */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-4 glass-effect rounded-full px-6 py-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-white font-medium">Powered by Neural Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Your ultimate
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI tool suite
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              One platform. All smart tools. Transform your workflow with 108+ AI-powered tools 
              for document processing, creative design, and professional automation.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
            >
              Try Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="glass-effect text-white border-white/30 hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-xl"
              asChild
            >
              <Link href="/all-tools">
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* 3D Orbiting Tools Visualization */}
          <div className="hidden lg:block">
            <OrbitingTools />
          </div>

          {/* Floating tool cards for mobile */}
          <div className="lg:hidden relative h-64">
            <FloatingToolCard 
              icon={FileText} 
              title="PDF Processing" 
              className="top-4 left-4" 
            />
            <FloatingToolCard 
              icon={Image} 
              title="Image Editor" 
              className="top-12 right-8" 
            />
            <FloatingToolCard 
              icon={Video} 
              title="Media Convert" 
              className="bottom-16 left-12" 
            />
            <FloatingToolCard 
              icon={Shield} 
              title="Gov Tools" 
              className="bottom-8 right-4" 
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            {[
              { number: "108+", label: "AI Tools" },
              { number: "50K+", label: "Users" },
              { number: "99.9%", label: "Uptime" },
              { number: "4.8★", label: "Rating" }
            ].map((stat, index) => (
              <div key={index} className="glass-card rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-8 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-8 w-48 h-48 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-xl"></div>
    </section>
  );
}