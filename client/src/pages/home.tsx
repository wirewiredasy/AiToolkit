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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-40 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-40 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-60 left-60 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-80 right-80 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in">
            {/* Logo animation */}
            <div className="flex justify-center mb-8">
              <SuntynLogo size="xl" animated={true} showText={false} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Suntyn AI
              </span>
              <span className="block text-3xl md:text-5xl text-blue-200 mt-2">
                🚀 Neural Intelligence Platform
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              🌟 80+ AI-powered tools for processing PDFs, editing images, converting media, and validating documents. 
              <br />
              🔒 Secure, fast, and intelligent - built for the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToTools}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                🔧 Browse AI Tools
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-effect text-white border-white hover:bg-white hover:bg-opacity-20 transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/signup">
                  🚀 Start Free
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-slide-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">80+</div>
              <div className="text-blue-200">🔧 AI Tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">1M+</div>
              <div className="text-blue-200">📁 Files Processed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">50+</div>
              <div className="text-blue-200">📄 File Formats</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">🤖</div>
              <div className="text-blue-200">AI Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section id="tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Choose Your Toolkit
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Professional-grade tools organized by category. Each toolkit contains 
              specialized tools for your specific needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {toolkits.map((toolkit) => (
              <ToolCard
                key={toolkit.id}
                id={toolkit.id}
                name={toolkit.name}
                description={toolkit.description}
                icon={toolkit.icon}
                route={toolkit.route}
                color={toolkit.color}
                toolCount={toolkit.toolCount}
                isToolkit={true}
                popularTools={['Merge', 'Compress', 'Convert']}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Most Popular Tools
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These are our most used tools by millions of users worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <Link href={tool.route}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className={`${tool.icon} text-blue-600`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800">{tool.name}</h3>
                      <p className="text-sm text-neutral-600">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">{tool.usageCount} uses</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Why Choose Suntyn AI?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Built for modern workflows with cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lock text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">100% Secure</h3>
              <p className="text-neutral-600">
                Your files are processed locally and automatically deleted after 1 hour. 
                Zero data retention policy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-robot text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">AI Powered</h3>
              <p className="text-neutral-600">
                Advanced AI models from HuggingFace and custom algorithms for superior 
                results and accuracy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Lightning Fast</h3>
              <p className="text-neutral-600">
                Optimized processing with local computation and smart caching for instant results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mobile-alt text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Mobile Ready</h3>
              <p className="text-neutral-600">
                Fully responsive design that works perfectly on desktop, tablet, and mobile devices.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-infinity text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">No Limits</h3>
              <p className="text-neutral-600">
                Use all tools unlimited times with no registration required. Completely free forever.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-code text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Open Source</h3>
              <p className="text-neutral-600">
                Built with open source technologies and transparent algorithms you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
