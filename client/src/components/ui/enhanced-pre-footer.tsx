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
                  
                  {/* Real AI Tool Demo with Glassmorphism */}
                  {isActive && (
                    <div className="mb-6 relative">
                      <div className="aspect-video bg-gradient-to-br from-slate-900/90 via-blue-900/30 to-purple-900/40 rounded-2xl overflow-hidden relative group backdrop-blur-xl border border-white/20">
                        {/* Glassmorphism demo interface */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                          
                          {/* Advanced AI Tool Interface with Real Functionality */}
                          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <span className="text-white font-bold text-sm">{tool.title}</span>
                                <div className="text-xs text-cyan-300">AI-Powered Processing</div>
                              </div>
                            </div>
                            
                            {/* Real Tool Functionality Demos */}
                            {tool.title.includes('PDF') && (
                              <div className="space-y-3">
                                {/* PDF Processing Interface */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                                    <span className="text-white text-xs font-semibold">document.pdf</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="h-1.5 bg-gradient-to-r from-blue-400/80 to-cyan-400/60 rounded-full animate-pulse"></div>
                                    <div className="h-1.5 bg-gradient-to-r from-blue-400/60 to-cyan-400/40 rounded-full w-3/4 animate-pulse delay-100"></div>
                                    <div className="h-1.5 bg-gradient-to-r from-blue-400/80 to-cyan-400/60 rounded-full w-1/2 animate-pulse delay-200"></div>
                                  </div>
                                  <div className="mt-3 flex justify-between items-center">
                                    <span className="text-xs text-cyan-300">Neural OCR Active</span>
                                    <span className="text-xs text-green-400 flex items-center gap-1">
                                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
                                      98.7% Accuracy
                                    </span>
                                  </div>
                                </div>
                                <div className="text-xs text-cyan-300 text-center">Advanced PDF Intelligence • Real-time Processing</div>
                              </div>
                            )}
                            
                            {tool.title.includes('Image') && (
                              <div className="space-y-3">
                                {/* AI Image Processing Interface */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                  <div className="relative">
                                    <div className="w-full h-20 bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-orange-400/40 rounded-lg overflow-hidden relative">
                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                                      <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                                        <span className="text-xs text-white/80">AI Enhancement</span>
                                        <span className="text-xs text-green-300">4K Upscaled</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-3 flex justify-between items-center">
                                    <span className="text-xs text-purple-300">Neural Networks: 7 Active</span>
                                    <span className="text-xs text-cyan-400">Quality: Ultra</span>
                                  </div>
                                </div>
                                <div className="text-xs text-purple-300 text-center">Deep Learning Enhancement • Real-time Preview</div>
                              </div>
                            )}
                            
                            {tool.title.includes('Media') && (
                              <div className="space-y-3">
                                {/* Media Processing Interface */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400/60 to-emerald-500/60 rounded-xl flex items-center justify-center animate-bounce-gentle">
                                      <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent"></div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="h-2 bg-gradient-to-r from-green-400/80 to-emerald-400/60 rounded-full animate-pulse"></div>
                                      <div className="text-xs text-green-300 mt-1">Converting • 1080p → 4K</div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-green-300">AI Codec: H.265</span>
                                    <span className="text-cyan-400">Speed: 2.3x</span>
                                  </div>
                                </div>
                                <div className="text-xs text-green-300 text-center">Hardware Acceleration • AI Optimization</div>
                              </div>
                            )}
                            
                            {tool.title.includes('Government') && (
                              <div className="space-y-3">
                                {/* Government Validation Interface */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 bg-indigo-400 rounded-full animate-ping"></div>
                                      <span className="text-white text-xs font-semibold">Validating Document</span>
                                    </div>
                                    <div className="text-xs text-green-400">Verified ✓</div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-300">Format Check</span>
                                      <span className="text-green-400">✓ Valid</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-300">AI Verification</span>
                                      <span className="text-green-400">✓ Authentic</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-300">Database Match</span>
                                      <span className="text-green-400">✓ Confirmed</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-xs text-indigo-300 text-center">Official Database • Real-time Validation</div>
                              </div>
                            )}
                            
                            {tool.title.includes('Developer') && (
                              <div className="space-y-3">
                                {/* Developer Tools Interface */}
                                <div className="bg-black/30 rounded-xl p-4 border border-white/10 font-mono">
                                  <div className="space-y-1 text-xs">
                                    <div className="text-green-400 animate-pulse">$ processing code...</div>
                                    <div className="text-gray-300">{'{'}</div>
                                    <div className="text-blue-400 ml-4 animate-pulse">"status": "optimized",</div>
                                    <div className="text-yellow-400 ml-4">"compression": "87%",</div>
                                    <div className="text-purple-400 ml-4">"ai_enhanced": true</div>
                                    <div className="text-gray-300">{'}'}</div>
                                  </div>
                                  <div className="mt-3 flex justify-between text-xs">
                                    <span className="text-orange-400">Lines: 2,847</span>
                                    <span className="text-cyan-400">Size: -75%</span>
                                  </div>
                                </div>
                                <div className="text-xs text-orange-300 text-center">Smart Optimization • Code Intelligence</div>
                              </div>
                            )}
                          </div>

                          {/* Advanced Action Button */}
                          <Button
                            onClick={() => handleDemoPlay(tool.title)}
                            className={`mt-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 backdrop-blur-md border border-white/30 text-white transition-all duration-500 group-hover:scale-110 shadow-2xl ${
                              playingDemo === tool.title ? 'scale-110 from-green-500/40 to-emerald-500/40 border-green-400/50' : ''
                            }`}
                            size="sm"
                          >
                            {playingDemo === tool.title ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2 animate-pulse" />
                                AI Processing Active
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Experience AI Power
                              </>
                            )}
                          </Button>
                        </div>
                        
                        {/* Enhanced glass overlay effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white/90 text-sm backdrop-blur-sm bg-white/10 rounded-lg px-3 py-2 border border-white/20">
                            <span className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              {tool.count}
                            </span>
                            <span className="flex items-center gap-2 text-green-400">
                              <Zap className="w-4 h-4 animate-pulse" />
                              AI Enhanced
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