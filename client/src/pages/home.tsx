
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
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Yellow Branding */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.2)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-amber-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-400 opacity-10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in">
            {/* Enhanced Logo */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>
                <SuntynLogo size="xl" animated={true} showText={false} className="relative z-10" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
                Suntyn AI
              </span>
            </h1>
            <p className="text-xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Revolutionary neural intelligence platform with 108+ AI-powered tools for document processing, 
              image editing, audio/video conversion, and government documents. Fast, secure, and intelligent.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                onClick={scrollToTools}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                <i className="fas fa-search mr-3"></i>
                Browse Tools
              </Button>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/signup">
                  <i className="fas fa-rocket mr-3"></i>
                  Get Started Free
                </Link>
              </Button>
            </div>
            
            {/* Enhanced Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-300/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                    <i className="fas fa-tools text-2xl text-white"></i>
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">108+</div>
                <div className="text-slate-200 text-sm">AI Tools</div>
              </div>
              <div className="bg-gradient-to-br from-amber-400/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-6 border border-amber-300/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <i className="fas fa-file-alt text-2xl text-white"></i>
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">2M+</div>
                <div className="text-slate-200 text-sm">Files Processed</div>
              </div>
              <div className="bg-gradient-to-br from-orange-400/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-6 border border-orange-300/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <i className="fas fa-exchange-alt text-2xl text-white"></i>
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">75+</div>
                <div className="text-slate-200 text-sm">File Formats</div>
              </div>
              <div className="bg-gradient-to-br from-red-400/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-red-300/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <i className="fas fa-shield-alt text-2xl text-white"></i>
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-slate-200 text-sm">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories with Yellow Theme */}
      <section id="tools" className="py-24 bg-gradient-to-br from-slate-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <SuntynLogo size="md" animated={true} showText={false} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
              Choose Your Tool Category
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional AI-powered tools organized by category. Each toolkit contains 
              specialized neural intelligence tools for your specific needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {toolkits.map((toolkit) => (
              <div key={toolkit.id} className="group perspective-1000">
                <Link href={toolkit.route}>
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200 overflow-hidden group-hover:animate-pulse">
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                        toolkit.color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-600 group-hover:from-red-400 group-hover:to-red-700' :
                        toolkit.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600 group-hover:from-purple-400 group-hover:to-purple-700' :
                        toolkit.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600 group-hover:from-green-400 group-hover:to-green-700' :
                        toolkit.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600 group-hover:from-orange-400 group-hover:to-orange-700' :
                        'bg-gradient-to-br from-yellow-500 to-amber-600 group-hover:from-yellow-400 group-hover:to-amber-700'
                      } shadow-lg group-hover:shadow-2xl`}>
                        <i className={`${toolkit.icon} text-2xl text-white transition-all duration-300 group-hover:scale-125`}></i>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 transition-all duration-300 group-hover:text-amber-700">{toolkit.name}</h3>
                      <p className="text-slate-600 mb-4 transition-all duration-300 group-hover:text-slate-500">{toolkit.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 transition-all duration-300 group-hover:text-amber-600">{toolkit.toolCount} tools</span>
                        <i className="fas fa-arrow-right text-slate-400 group-hover:text-amber-600 transition-all duration-300 group-hover:translate-x-2"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools with Yellow Theme */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
              Popular AI Tools
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Most used neural intelligence tools across all categories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.slice(0, 6).map((tool) => (
              <Link key={tool.id} href={tool.route}>
                <div className="bg-gradient-to-br from-slate-50 to-yellow-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 group">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <i className={`${tool.icon} text-white text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-amber-700 transition-colors">{tool.name}</h3>
                      <p className="text-slate-600 text-sm">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">{tool.usageCount} uses</span>
                    <span className="text-yellow-600 font-semibold bg-yellow-100 px-3 py-1 rounded-full text-xs">Free AI</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* All Tools Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/all-tools">
                <i className="fas fa-th-large mr-3"></i>
                View All 108 AI Tools
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <SuntynLogo size="lg" animated={true} showText={false} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent mb-6">
              Why Choose Suntyn AI?
            </h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              Built for modern workflows with revolutionary neural intelligence technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110">
                <i className="fas fa-shield-alt text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">100% Secure</h3>
              <p className="text-slate-200 leading-relaxed">
                Advanced encryption and zero data retention policy. 
                Your files are processed securely and deleted instantly.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110">
                <i className="fas fa-brain text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Neural Intelligence</h3>
              <p className="text-slate-200 leading-relaxed">
                Cutting-edge AI models and neural networks for superior 
                results and unprecedented accuracy.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110">
                <i className="fas fa-bolt text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-200 leading-relaxed">
                Optimized neural processing with smart algorithms and efficient 
                caching for instant results.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110">
                <i className="fas fa-mobile-alt text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Mobile Optimized</h3>
              <p className="text-slate-200 leading-relaxed">
                Fully responsive neural interface that works perfectly on all devices 
                and screen sizes.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110">
                <i className="fas fa-infinity text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Unlimited AI</h3>
              <p className="text-slate-200 leading-relaxed">
                Use all 108 AI tools unlimited times with no registration required. 
                Completely free forever.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110">
                <i className="fas fa-code text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Open Neural</h3>
              <p className="text-slate-200 leading-relaxed">
                Built with transparent neural architectures and open source 
                technologies you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
