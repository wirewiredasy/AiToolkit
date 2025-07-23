import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import ToolCard from '@/components/ui/tool-card';
import SuntynLogo from '@/components/ui/suntyn-logo';
import { toolkits, getFeaturedTools } from '@/lib/tools';
import { 
  Wrench, 
  FileText, 
  ArrowLeftRight, 
  Shield, 
  FileIcon, 
  ImageIcon, 
  Music, 
  BookOpen,
  Bot,
  Zap,
  Smartphone,
  Infinity,
  Code,
  ArrowRight,
  Layers
} from 'lucide-react';

export default function Home() {
  const featuredTools = getFeaturedTools();

  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

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
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
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
                <div className="flex items-center justify-center mb-4">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">108+</div>
                <div className="text-slate-300 text-sm">AI Tools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">1M+</div>
                <div className="text-slate-300 text-sm">Files Processed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <ArrowLeftRight className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-slate-300 text-sm">File Formats</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
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
            {toolkits.map((toolkit) => (
              <div key={toolkit.id} className="group perspective-1000">
                <Link href={toolkit.route}>
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200 overflow-hidden group-hover:animate-pulse">
                    {/* Splitting Effect Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-slate-300/50 to-transparent transform translate-x-[-50%] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100"></div>
                      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent transform translate-y-[-50%] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
                    </div>

                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                        toolkit.color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-600 group-hover:from-red-400 group-hover:to-red-700' :
                        toolkit.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600 group-hover:from-purple-400 group-hover:to-purple-700' :
                        toolkit.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600 group-hover:from-green-400 group-hover:to-green-700' :
                        toolkit.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600 group-hover:from-orange-400 group-hover:to-orange-700' :
                        'bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-blue-400 group-hover:to-blue-700'
                      } shadow-lg group-hover:shadow-2xl`}>
                        {toolkit.id === 'pdf' && <FileIcon className="w-7 h-7 text-white transition-all duration-300 group-hover:scale-125" />}
                        {toolkit.id === 'image' && <ImageIcon className="w-7 h-7 text-white transition-all duration-300 group-hover:scale-125" />}
                        {toolkit.id === 'media' && <Music className="w-7 h-7 text-white transition-all duration-300 group-hover:scale-125" />}
                        {toolkit.id === 'government' && <BookOpen className="w-7 h-7 text-white transition-all duration-300 group-hover:scale-125" />}
                        {toolkit.id === 'developer' && <Code className="w-7 h-7 text-white transition-all duration-300 group-hover:scale-125" />}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 transition-all duration-300 group-hover:text-slate-700">{toolkit.name}</h3>
                      <p className="text-slate-600 mb-4 transition-all duration-300 group-hover:text-slate-500">{toolkit.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 transition-all duration-300 group-hover:text-slate-400">{toolkit.toolCount} tools</span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-all duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>

                    {/* Corner Effects */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-slate-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 right-0 w-0 h-0 border-r-[20px] border-r-transparent border-t-[20px] border-t-slate-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-slate-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[20px] border-r-transparent border-b-[20px] border-b-slate-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"></div>
                  </div>
                </Link>
              </div>
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
                      <Layers className="w-6 h-6 text-blue-600" />
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

          {/* All Tools Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/all-tools">
                <Layers className="w-5 h-5 mr-3" />
                View All 108 Tools
              </Link>
            </Button>
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">100% Secure</h3>
              <p className="text-slate-300 leading-relaxed">
                Your files are processed locally and automatically deleted after processing. 
                Zero data retention policy.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Powered</h3>
              <p className="text-slate-300 leading-relaxed">
                Advanced AI models and custom algorithms for superior 
                results and accuracy in all operations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-300 leading-relaxed">
                Optimized processing with smart algorithms and efficient 
                caching for instant results.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Mobile Ready</h3>
              <p className="text-slate-300 leading-relaxed">
                Fully responsive design that works perfectly on all devices 
                and screen sizes.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Infinity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Limits</h3>
              <p className="text-slate-300 leading-relaxed">
                Use all tools unlimited times with no registration required. 
                Completely free forever.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Code className="w-8 h-8 text-white" />
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