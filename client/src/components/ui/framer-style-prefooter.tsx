import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Image as ImageIcon, 
  Music,
  Building,
  Code,
  Play,
  ChevronRight,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Bot,
  Brain,
  Cpu
} from 'lucide-react';

const demoTools = [
  {
    category: 'PDF Tools',
    icon: FileText,
    title: 'AI-Powered PDF Processing',
    description: 'Merge, split, compress, and enhance PDFs with neural intelligence',
    demoUrl: '/tool/pdf-merger',
    gradient: 'from-blue-500 to-cyan-500',
    stats: '250K+ PDFs processed',
    features: ['Neural OCR', 'Smart Compression', 'Auto Enhancement'],
    preview: 'PDF Intelligence Demo'
  },
  {
    category: 'Image Tools', 
    icon: ImageIcon,
    title: 'Advanced Image Enhancement',
    description: 'Remove backgrounds, upscale, and enhance images using deep learning',
    demoUrl: '/tool/bg-remover',
    gradient: 'from-purple-500 to-pink-500',
    stats: '180K+ images enhanced',
    features: ['4K Upscaling', 'AI Background Removal', 'Smart Enhancement'],
    preview: 'Image AI Demo'
  },
  {
    category: 'Media Tools',
    icon: Music,
    title: 'Smart Media Conversion', 
    description: 'Convert videos and audio with AI optimization and quality enhancement',
    demoUrl: '/tool/video-converter',
    gradient: 'from-green-500 to-emerald-500',
    stats: '95K+ media files converted',
    features: ['AI Codec Selection', 'Quality Enhancement', 'Batch Processing'],
    preview: 'Media Processing Demo'
  },
  {
    category: 'Government Tools',
    icon: Building,
    title: 'Document Validation',
    description: 'Validate official documents with real-time database verification',
    demoUrl: '/tool/pan-validator',
    gradient: 'from-indigo-500 to-purple-500', 
    stats: '120K+ documents validated',
    features: ['Real-time Verification', 'Official Database', 'Instant Results'],
    preview: 'Validation Demo'
  },
  {
    category: 'Developer Tools',
    icon: Code,
    title: 'Code Intelligence',
    description: 'Format, minify, and optimize code with AI-powered analysis',
    demoUrl: '/tool/json-formatter',
    gradient: 'from-orange-500 to-red-500',
    stats: '300K+ code optimizations',
    features: ['Smart Formatting', 'Auto Optimization', 'Error Detection'],
    preview: 'Code AI Demo'
  }
];

export default function FramerStylePreFooter() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveDemo((prev) => (prev + 1) % demoTools.length);
        setIsAnimating(false);
      }, 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentTool = demoTools[activeDemo];

  return (
    <section className="relative bg-white dark:bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
          `,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-6">
            Experience the power of
            <br />
            <span className={`bg-gradient-to-r ${currentTool.gradient} bg-clip-text text-transparent`}>
              AI-driven productivity
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transform your workflow with 80+ intelligent tools powered by advanced neural networks and machine learning algorithms
          </p>
        </div>

        {/* Interactive Demo Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Tool Navigation */}
          <div className="space-y-4">
            {demoTools.map((tool, index) => {
              const Icon = tool.icon;
              const isActive = index === activeDemo;
              
              return (
                <div
                  key={index}
                  onClick={() => setActiveDemo(index)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
                    isActive
                      ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-xl scale-105'
                      : 'bg-gray-50 dark:bg-gray-950 border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? `bg-gradient-to-r ${tool.gradient} shadow-lg`
                        : 'bg-gray-200 dark:bg-gray-800 group-hover:bg-gray-300 dark:group-hover:bg-gray-700'
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-bold text-lg transition-colors ${
                          isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {tool.title}
                        </h3>
                        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                          isActive ? 'text-gray-600 dark:text-gray-400 rotate-90' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                        }`} />
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          isActive 
                            ? `bg-gradient-to-r ${tool.gradient} text-white`
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          {tool.stats}
                        </span>
                        
                        {isActive && (
                          <Link to={tool.demoUrl}>
                            <Button size="sm" className={`bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white`}>
                              Try Now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Live Demo Preview */}
          <div className="relative">
            <div className={`relative bg-gradient-to-br ${currentTool.gradient} rounded-3xl p-8 shadow-2xl transition-all duration-500 ${
              isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
            }`}>
              
              {/* Demo Interface */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <currentTool.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{currentTool.preview}</h4>
                    <p className="text-white/70 text-sm">{currentTool.category}</p>
                  </div>
                </div>

                {/* Dynamic Demo Content */}
                <div className="space-y-4 mb-6">
                  {currentTool.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: `${index * 200}ms` }}></div>
                      <span className="text-white/90 text-sm">{feature}</span>
                      <CheckCircle className="w-4 h-4 text-green-300 ml-auto" />
                    </div>
                  ))}
                </div>

                {/* Processing Animation */}
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/90 text-sm font-semibold">AI Processing</span>
                    <span className="text-green-300 text-sm flex items-center gap-1">
                      <Brain className="w-4 h-4 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-white/80 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Action Button */}
                <Link to={currentTool.demoUrl}>
                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm">
                    <Play className="w-4 h-4 mr-2" />
                    Experience {currentTool.category}
                  </Button>
                </Link>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-4 h-4 text-white animate-bounce" />
              </div>
            </div>

            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentTool.gradient} rounded-3xl blur-3xl opacity-20 -z-10 scale-110`}></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, label: 'Active Users', value: '1.2M+' },
            { icon: FileText, label: 'Files Processed', value: '15.8M+' },
            { icon: Star, label: 'User Rating', value: '4.9/5' },
            { icon: TrendingUp, label: 'Success Rate', value: '99.7%' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}