import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import ToolCard from '@/components/ui/tool-card';
import SuntynLogo from '@/components/ui/suntyn-logo';
import { toolkits, getFeaturedTools } from '@/lib/tools';

export default function Home() {
  const featuredTools = getFeaturedTools();

  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toolkits = [
    {
      id: 'pdf',
      name: 'PDF Toolkit',
      description: 'Complete PDF solution with 20+ tools for merge, split, convert, compress, and advanced editing capabilities.',
      icon: 'fas fa-file-pdf',
      route: '/toolkit/pdf',
      color: 'blue',
      toolCount: 20,
    },
    {
      id: 'image',
      name: 'Image Toolkit',
      description: 'Advanced image processing with 20 tools for resize, compress, convert, enhance, and AI-powered features.',
      icon: 'fas fa-image',
      route: '/toolkit/image',
      color: 'purple',
      toolCount: 20,
    },
    {
      id: 'media',
      name: 'Media Toolkit',
      description: 'Professional audio and video tools with 20 converters, editors, and AI-enhanced processing capabilities.',
      icon: 'fas fa-play-circle',
      route: '/toolkit/media',
      color: 'green',
      toolCount: 20,
    },
    {
      id: 'government',
      name: 'Govt Documents',
      description: 'Indian government document tools with 15 utilities for PAN, Aadhaar, certificates, and official forms.',
      icon: 'fas fa-landmark',
      route: '/toolkit/government',
      color: 'orange',
      toolCount: 15,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <SuntynLogo size="xl" animated={true} showText={false} />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Suntyn AI
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional AI-powered tools for document processing, image editing, 
              audio/video conversion, and government documents. Fast, secure, and reliable.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                onClick={scrollToTools}
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                Browse Tools
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
                asChild
              >
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="text-4xl font-bold text-white mb-2">80+</div>
                <div className="text-slate-300 text-sm">AI Tools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="text-4xl font-bold text-white mb-2">1M+</div>
                <div className="text-slate-300 text-sm">Files Processed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-slate-300 text-sm">File Formats</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-slate-300 text-sm">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section id="tools" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Choose Your Tool Category
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional tools organized by category. Each toolkit contains 
              specialized tools for your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {toolkits.map((toolkit, index) => (
              <Link key={toolkit.id} href={toolkit.route}>
                <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200">
                  <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <i className={`${toolkit.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{toolkit.name}</h3>
                  <p className="text-slate-600 mb-4">{toolkit.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{toolkit.toolCount} tools</span>
                    <i className="fas fa-arrow-right text-slate-400 group-hover:text-slate-600 transition-colors"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Popular Tools
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Most used tools across all categories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.slice(0, 6).map((tool) => (
              <Link key={tool.id} href={tool.route}>
                <div className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <i className={`${tool.icon} text-blue-600 text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{tool.name}</h3>
                      <p className="text-slate-600 text-sm">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">{tool.usageCount} uses</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Suntyn AI?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Built for modern workflows with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <i className="fas fa-shield-alt text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">100% Secure</h3>
              <p className="text-slate-300 leading-relaxed">
                Your files are processed locally and automatically deleted after processing. 
                Zero data retention policy.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <i className="fas fa-robot text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Powered</h3>
              <p className="text-slate-300 leading-relaxed">
                Advanced AI models and custom algorithms for superior 
                results and accuracy in all operations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <i className="fas fa-bolt text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-300 leading-relaxed">
                Optimized processing with smart algorithms and efficient 
                caching for instant results.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <i className="fas fa-mobile-alt text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Mobile Ready</h3>
              <p className="text-slate-300 leading-relaxed">
                Fully responsive design that works perfectly on all devices 
                and screen sizes.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <i className="fas fa-infinity text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Limits</h3>
              <p className="text-slate-300 leading-relaxed">
                Use all tools unlimited times with no registration required. 
                Completely free forever.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <i className="fas fa-code text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Open Source</h3>
              <p className="text-slate-300 leading-relaxed">
                Built with open source technologies and transparent 
                algorithms you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}