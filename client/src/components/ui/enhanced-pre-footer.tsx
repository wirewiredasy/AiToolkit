import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Building, 
  Code, 
  Users, 
  Zap, 
  Shield,
  Star,
  TrendingUp,
  CheckCircle,
  Play,
  Download,
  Clock,
  Globe,
  Sparkles,
  Eye,
  MousePointer
} from 'lucide-react';

const professionalTools = [
  {
    icon: FileText,
    title: 'PDF Processing Hub',
    description: 'Merge, split, compress, convert, password protect, OCR, and watermark PDFs with professional-grade accuracy',
    count: '250K+ processed',
    gradient: 'from-blue-500 to-cyan-500',
    tools: ['PDF Merger', 'PDF Splitter', 'PDF Compressor', 'PDF to Word', 'PDF OCR', 'PDF Watermark'],
    demo: '/demo/pdf-processing.mp4',
    category: 'PDF Tools'
  },
  {
    icon: ImageIcon,
    title: 'AI Image Enhancement',
    description: 'Resize, compress, filter, remove backgrounds, upscale, and enhance images using advanced AI algorithms',
    count: '180K+ enhanced',
    gradient: 'from-purple-500 to-pink-500',
    tools: ['Background Remover', 'Image Upscaler', 'Smart Crop', 'Color Enhancement', 'Noise Reduction'],
    demo: '/demo/image-processing.mp4',
    category: 'Image Tools'
  },
  {
    icon: Music,
    title: 'Media Conversion Studio',
    description: 'Convert videos, extract audio, trim files, merge media, and optimize for web with professional quality',
    count: '95K+ converted',
    gradient: 'from-green-500 to-emerald-500',
    tools: ['Video Converter', 'Audio Extractor', 'Video Trimmer', 'Format Optimizer', 'Batch Processor'],
    demo: '/demo/media-conversion.mp4',
    category: 'Media Tools'
  },
  {
    icon: Building,
    title: 'Government Document Validator',
    description: 'Validate PAN, Aadhaar, GST, passport, driving license, and generate official certificates instantly',
    count: '320K+ validated',
    gradient: 'from-indigo-500 to-purple-500',
    tools: ['PAN Validator', 'Aadhaar Validator', 'GST Validator', 'Passport Checker', 'License Verifier'],
    demo: '/demo/gov-validation.mp4',
    category: 'Government'
  },
  {
    icon: Code,
    title: 'Developer Utilities',
    description: 'Code formatters, minifiers, validators, generators, and optimization tools for modern development',
    count: '150K+ optimized',
    gradient: 'from-orange-500 to-red-500',
    tools: ['JSON Formatter', 'CSS Minifier', 'Code Validator', 'Hash Generator', 'Base64 Encoder'],
    demo: '/demo/dev-tools.mp4',
    category: 'Developer'
  }
];

const realStatistics = {
  totalUsers: '1.2M+',
  filesProcessed: '15.8M+',
  timesSaved: '2.3M hours',
  countriesServed: '150+',
  apiCalls: '45M+',
  uptime: '99.9%'
};

export default function EnhancedPreFooter() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [playingDemo, setPlayingDemo] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % professionalTools.length);
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDemoPlay = (toolTitle: string) => {
    setPlayingDemo(toolTitle);
    // In a real implementation, this would trigger actual video playback
    setTimeout(() => setPlayingDemo(null), 3000);
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-gray-950 dark:to-black py-32 overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0">
        <div className={`absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-4000 ${
          animationPhase === 0 ? 'top-1/4 left-1/4 opacity-100' : 
          animationPhase === 1 ? 'top-1/3 right-1/4 opacity-80' :
          animationPhase === 2 ? 'bottom-1/4 right-1/3 opacity-60' :
          'bottom-1/3 left-1/4 opacity-100'
        }`}></div>
        <div className={`absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-4000 delay-1000 ${
          animationPhase === 0 ? 'bottom-1/4 right-1/4 opacity-80' : 
          animationPhase === 1 ? 'bottom-1/3 left-1/4 opacity-100' :
          animationPhase === 2 ? 'top-1/4 left-1/3 opacity-60' :
          'top-1/3 right-1/4 opacity-80'
        }`}></div>
      </div>

      {/* Neural network pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.2) 1px, transparent 1px),
            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)
          `,
          backgroundSize: '80px 80px, 60px 60px, 120px 120px'
        }}></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-float ${
              i % 3 === 0 ? 'bg-blue-400/40' : 
              i % 3 === 1 ? 'bg-purple-400/40' : 'bg-cyan-400/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-8">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-blue-300 font-semibold">AI-Powered Professional Tools</span>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Transform Your Workflow
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Experience the power of neural intelligence with our comprehensive suite of 80+ professional-grade tools. 
            Process documents, enhance images, convert media, and validate government documents with enterprise-level security.
          </p>
        </div>

        {/* Main Tools Showcase */}
        <div className="grid lg:grid-cols-5 gap-8 mb-20">
          {professionalTools.map((tool, index) => {
            const Icon = tool.icon;
            const isActive = index === activeFeature;
            const isHovered = hoveredTool === tool.title;
            
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 cursor-pointer ${
                  isActive ? 'lg:col-span-2 scale-105' : 'lg:col-span-1'
                }`}
                onMouseEnter={() => setHoveredTool(tool.title)}
                onMouseLeave={() => setHoveredTool(null)}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`relative h-full p-8 rounded-3xl border backdrop-blur-sm transition-all duration-700 ${
                  isActive || isHovered
                    ? 'bg-slate-800/90 dark:bg-gray-900/90 border-cyan-400/60 shadow-2xl shadow-cyan-500/30'
                    : 'bg-slate-800/50 dark:bg-gray-900/50 border-slate-700/40 dark:border-gray-800/40 hover:bg-slate-800/70 dark:hover:bg-gray-900/70'
                }`}>
                  
                  {/* Demo Video Placeholder */}
                  {isActive && (
                    <div className="mb-6 relative">
                      <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            onClick={() => handleDemoPlay(tool.title)}
                            className={`bg-white/20 hover:bg-white/30 border border-white/30 text-white transition-all duration-300 ${
                              playingDemo === tool.title ? 'scale-110 bg-green-500/80' : ''
                            }`}
                            size="lg"
                          >
                            {playingDemo === tool.title ? (
                              <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Demo Playing
                              </>
                            ) : (
                              <>
                                <Play className="w-5 h-5 mr-2" />
                                Watch Demo
                              </>
                            )}
                          </Button>
                        </div>
                        
                        {/* Demo overlay effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white/80 text-sm">
                            <span className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              {tool.count}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              2:30
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r ${tool.gradient} shadow-lg transition-all duration-500 ${
                    isActive || isHovered ? 'scale-110 shadow-2xl' : 'group-hover:scale-105'
                  }`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {tool.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                        {tool.category}
                      </span>
                    </div>

                    <p className={`text-gray-400 transition-all duration-500 ${
                      isActive ? 'text-base' : 'text-sm'
                    }`}>
                      {tool.description}
                    </p>

                    {/* Tools List for Active Item */}
                    {isActive && (
                      <div className="space-y-2 pt-4 border-t border-slate-700">
                        <h4 className="text-sm font-semibold text-cyan-300 mb-2">Available Tools:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {tool.tools.map((toolName, toolIndex) => (
                            <div key={toolIndex} className="flex items-center gap-2 text-xs text-gray-300">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              {toolName}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <span className="text-sm text-cyan-300 font-semibold">{tool.count}</span>
                      <ArrowRight className={`w-4 h-4 text-gray-400 transition-all duration-300 ${
                        isActive || isHovered ? 'text-cyan-300 translate-x-1' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
          {Object.entries(realStatistics).map(([key, value], index) => (
            <div key={key} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30 group-hover:border-cyan-400/60 transition-all duration-300">
                {key === 'totalUsers' && <Users className="w-8 h-8 text-blue-400" />}
                {key === 'filesProcessed' && <FileText className="w-8 h-8 text-purple-400" />}
                {key === 'timesSaved' && <Clock className="w-8 h-8 text-green-400" />}
                {key === 'countriesServed' && <Globe className="w-8 h-8 text-orange-400" />}
                {key === 'apiCalls' && <Zap className="w-8 h-8 text-yellow-400" />}
                {key === 'uptime' && <Shield className="w-8 h-8 text-cyan-400" />}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-sm text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col md:flex-row gap-4">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group"
              >
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/toolkit/pdf">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 group"
              >
                <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                Try Tools Free
              </Button>
            </Link>
          </div>
          
          <p className="text-gray-400 mt-6 text-lg">
            Join <span className="text-cyan-300 font-semibold">1.2M+ professionals</span> who trust Suntyn AI for their daily workflows
          </p>
        </div>
      </div>
    </section>
  );
}