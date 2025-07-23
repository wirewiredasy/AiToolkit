
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, FileText, Image, Music, Building, Code, Sparkles, Users, Zap, Shield, TrendingUp, Database, Globe, Lock } from 'lucide-react';

const realToolkits = [
  { id: 'pdf-merger', name: 'PDF Merger', category: 'PDF Tools', users: '25K+', icon: FileText },
  { id: 'image-resizer', name: 'Image Resizer', category: 'Image Tools', users: '18K+', icon: Image },
  { id: 'video-converter', name: 'Video Converter', category: 'Media Tools', users: '12K+', icon: Music },
  { id: 'gov-docs', name: 'Gov Documents', category: 'Government', users: '22K+', icon: Building },
];

const leftSideFeatures = [
  {
    icon: FileText,
    title: 'PDF Processing Hub',
    description: '25+ tools for merge, split, compress, convert PDFs instantly',
    count: '50K+ users',
    position: 'top'
  },
  {
    icon: Image,
    title: 'Image Enhancement',
    description: 'Resize, compress, filter, remove backgrounds with AI',
    count: '35K+ users',
    position: 'middle-top'
  },
  {
    icon: Music,
    title: 'Media Conversion',
    description: 'Convert videos, extract audio, trim files seamlessly',
    count: '28K+ users',
    position: 'middle-bottom'
  },
  {
    icon: Code,
    title: 'Developer Toolkit',
    description: 'Code formatters, validators, minifiers for developers',
    count: '15K+ users',
    position: 'bottom'
  },
];

const rightSideFeatures = [
  {
    icon: Building,
    title: 'Government Docs',
    description: 'PAN, Aadhaar, GST validators and certificate generators',
    count: '22K+ users',
    position: 'top'
  },
  {
    icon: TrendingUp,
    title: 'AI-Powered Tools',
    description: 'Intelligent automation for faster workflow processing',
    count: '40K+ users',
    position: 'middle-top'
  },
  {
    icon: Users,
    title: 'Collaboration Suite',
    description: 'Share, collaborate, and manage projects with teams',
    count: '18K+ users',
    position: 'middle-bottom'
  },
  {
    icon: Shield,
    title: 'Secure Processing',
    description: 'End-to-end encryption with automatic file deletion',
    count: '45K+ users',
    position: 'bottom'
  },
];

export default function InteractivePreFooter() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [activeOrbit, setActiveOrbit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 3);
      setActiveOrbit(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-24 overflow-hidden">
      {/* Enhanced 3D Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Professional grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Central interactive area */}
        <div className="relative flex items-center justify-center min-h-[600px]">
          
          {/* Left side features - Enhanced 3D */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 space-y-8">
            {leftSideFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`group flex items-center space-x-4 p-6 bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-600/50 hover:bg-slate-700/80 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer max-w-sm shadow-2xl hover:shadow-cyan-500/20 ${
                    index === 0 ? 'translate-y-[-140px] hover:scale-105' : 
                    index === 1 ? 'translate-y-[-50px] hover:scale-105' : 
                    index === 2 ? 'translate-y-[50px] hover:scale-105' : 'translate-y-[140px] hover:scale-105'
                  }`}
                  style={{
                    transform: `perspective(1000px) rotateY(5deg) ${
                      index === 0 ? 'translateY(-140px)' : 
                      index === 1 ? 'translateY(-50px)' : 
                      index === 2 ? 'translateY(50px)' : 'translateY(140px)'
                    }`,
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-cyan-300 transition-colors">{feature.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-1">{feature.description}</p>
                    <span className="text-cyan-400 text-xs font-semibold">{feature.count}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right side features - Enhanced 3D */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-8">
            {rightSideFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`group flex items-center space-x-4 p-6 bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-600/50 hover:bg-slate-700/80 hover:border-purple-400/50 transition-all duration-500 cursor-pointer max-w-sm shadow-2xl hover:shadow-purple-500/20 ${
                    index === 0 ? 'translate-y-[-140px] hover:scale-105' : 
                    index === 1 ? 'translate-y-[-50px] hover:scale-105' : 
                    index === 2 ? 'translate-y-[50px] hover:scale-105' : 'translate-y-[140px] hover:scale-105'
                  }`}
                  style={{
                    transform: `perspective(1000px) rotateY(-5deg) ${
                      index === 0 ? 'translateY(-140px)' : 
                      index === 1 ? 'translateY(-50px)' : 
                      index === 2 ? 'translateY(50px)' : 'translateY(140px)'
                    }`,
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-purple-300 transition-colors">{feature.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-1">{feature.description}</p>
                    <span className="text-purple-400 text-xs font-semibold">{feature.count}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Central orbital system with 3D effects */}
          <div className="relative w-[500px] h-[500px]" style={{ perspective: '1000px' }}>
            {/* Multi-layered Orbital rings with 3D depth */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className={`w-96 h-96 border-2 rounded-full animate-spin-slow shadow-2xl transition-colors duration-1000 ${
                  activeOrbit === 0 ? 'border-cyan-400/40 shadow-cyan-500/30' : 'border-cyan-400/20 shadow-cyan-500/10'
                }`} 
                style={{ transform: 'rotateX(60deg)', animationDuration: '20s' }}
              ></div>
              <div 
                className={`absolute w-[450px] h-[450px] border rounded-full transition-colors duration-1000 ${
                  activeOrbit === 1 ? 'border-blue-400/30 shadow-blue-500/20' : 'border-blue-400/15 shadow-blue-500/5'
                }`} 
                style={{animation: 'spin-slow 25s linear infinite reverse', transform: 'rotateX(75deg)'}}
              ></div>
              <div 
                className={`absolute w-80 h-80 border rounded-full transition-colors duration-1000 ${
                  activeOrbit === 2 ? 'border-purple-400/35 shadow-purple-500/25' : 'border-purple-400/20 shadow-purple-500/10'
                }`} 
                style={{animation: 'spin-slow 30s linear infinite reverse', transform: 'rotateX(45deg)'}}
              ></div>
              <div 
                className={`absolute w-64 h-64 border rounded-full animate-pulse transition-colors duration-1000 ${
                  activeOrbit === 3 ? 'border-pink-400/30 shadow-pink-500/20' : 'border-pink-400/15 shadow-pink-500/5'
                }`} 
                style={{ transform: 'rotateX(30deg)' }}
              ></div>
            </div>

            {/* Central floating showcase with glassmorphism */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative z-10 group">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-sm border border-white/20 hover:scale-105 transition-all duration-500" style={{ transform: 'rotateY(0deg) rotateX(0deg)' }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300">
                      <Sparkles className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Suntyn AI Hub</h3>
                      <p className="text-gray-600 text-sm">108+ Professional Tools</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 text-xs font-semibold">Live & Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-3 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full animate-pulse"></div>
                    <div className="w-4/5 h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full animate-pulse delay-300"></div>
                    <div className="w-3/5 h-3 bg-gradient-to-r from-green-200 to-blue-200 rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>

              {/* Professional floating tool bubbles with icons */}
              <div className="absolute top-12 right-12 bg-slate-800/90 backdrop-blur-xl text-white px-6 py-3 rounded-2xl border border-cyan-400/50 text-sm shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer flex items-center space-x-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                <span>PDF Merger → <span className="text-cyan-300 font-semibold">25K users</span></span>
              </div>
              
              <div className="absolute bottom-12 left-12 bg-slate-800/90 backdrop-blur-xl text-white px-6 py-3 rounded-2xl border border-purple-400/50 text-sm shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer flex items-center space-x-2">
                <Image className="h-4 w-4 text-purple-400" />
                <span>Image Resizer → <span className="text-purple-300 font-semibold">18K users</span></span>
              </div>
              
              <div className="absolute bottom-20 right-20 bg-slate-800/90 backdrop-blur-xl text-white px-6 py-3 rounded-2xl border border-green-400/50 text-sm shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer flex items-center space-x-2">
                <Music className="h-4 w-4 text-green-400" />
                <span>Video Converter → <span className="text-green-300 font-semibold">12K users</span></span>
              </div>

              <div className="absolute top-20 left-20 bg-slate-800/90 backdrop-blur-xl text-white px-6 py-3 rounded-2xl border border-orange-400/50 text-sm shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer flex items-center space-x-2">
                <Building className="h-4 w-4 text-orange-400" />
                <span>Gov Docs → <span className="text-orange-300 font-semibold">22K users</span></span>
              </div>

              {/* Enhanced floating interaction elements */}
              <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/30 rounded-full animate-ping shadow-xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-cyan-500/30 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute top-3/4 left-3/4 w-6 h-6 bg-purple-500/30 rounded-full animate-bounce shadow-md"></div>
              <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-pink-500/40 rounded-full animate-spin shadow-sm"></div>
              <div className="absolute bottom-1/2 right-1/4 w-10 h-10 bg-green-500/20 rounded-full animate-pulse delay-1000 shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom CTA section with 3D effects */}
        <div className="text-center mt-20">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-600/50 shadow-2xl">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Sparkles className="h-8 w-8 text-cyan-400 animate-pulse" />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Transform Your Workflow Today
                </h2>
                <Sparkles className="h-8 w-8 text-purple-400 animate-pulse delay-300" />
              </div>
              
              <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Join <span className="text-cyan-400 font-bold">50,000+</span> professionals who've already revolutionized their productivity with Suntyn AI's intelligent toolkit.
              </p>

              {/* Stats bar */}
              <div className="grid grid-cols-3 gap-8 mb-10 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">108+</div>
                  <div className="text-gray-400 text-sm">AI Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">50K+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">99.9%</div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg"
                  className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-10 py-5 rounded-2xl text-xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 transform"
                  asChild
                >
                  <Link href="/all-tools">
                    <Zap className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                    Start Free Now
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="group border-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 px-10 py-5 rounded-2xl text-xl transition-all duration-300 hover:scale-105 transform backdrop-blur-sm"
                  asChild
                >
                  <Link href="/pricing">
                    <Shield className="mr-3 h-6 w-6" />
                    View Pricing
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm mb-4">Trusted by professionals at:</p>
                <div className="flex justify-center items-center space-x-8 opacity-50">
                  <div className="text-gray-500 font-bold">Google</div>
                  <div className="text-gray-500 font-bold">Microsoft</div>
                  <div className="text-gray-500 font-bold">Amazon</div>
                  <div className="text-gray-500 font-bold">Meta</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
