import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Star, Users, Zap, Shield, Globe, Cpu } from 'lucide-react';

const featuredTools = [
  { id: 'canvalt-toolkit', name: 'Canvalt Toolkit', category: 'Design', icon: '🎨' },
  { id: 'dragoe-pointed', name: 'Dragoe Pointed', category: 'Analytics', icon: '📊' },
  { id: 'christioelle-coette', name: 'Christioelle Coette', category: 'Development', icon: '⚡' },
];

const sideFeatures = [
  {
    icon: ArrowRight,
    title: 'Bentnest Imeqred',
    description: 'Nestimit steps SSIQlery ou Gredit Types',
    position: 'left-top'
  },
  {
    icon: Star,
    title: 'Eolay Caoraf',
    description: 'RIBET CertHifteo ct seotst Footes',
    position: 'left-middle'
  },
  {
    icon: Users,
    title: 'Metet VnedVius',
    description: 'Buriellt TOspniGaoer The Vriirrt RNedichy',
    position: 'left-bottom'
  },
  {
    icon: Zap,
    title: 'Mit Teat',
    description: 'Acttimet Adst tot PHosesfttes',
    position: 'left-bottom-2'
  },
  {
    icon: Shield,
    title: 'Sohen Avrstutse',
    description: 'Pollerat Tops fe ter the detast Nurerous',
    position: 'right-top'
  },
  {
    icon: Globe,
    title: 'Tulstie Nine Tolog',
    description: 'Plausntef Pipespr Sticists',
    position: 'right-middle'
  },
  {
    icon: Cpu,
    title: 'Avrge tco Vectty',
    description: 'Ventislk Tal vis nets Adrucetu Tooses',
    position: 'right-bottom'
  },
  {
    icon: Star,
    title: 'Eropar JVnt itchy',
    description: 'Glo Mettejan Byett Ponhteppretitieen',
    position: 'right-bottom-2'
  },
];

export default function InteractivePreFooter() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Central interactive area */}
        <div className="relative flex items-center justify-center min-h-[600px]">
          
          {/* Left side features */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 space-y-8">
            {sideFeatures.slice(0, 4).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`flex items-center space-x-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer max-w-xs ${
                    index === 0 ? 'translate-y-[-120px]' : 
                    index === 1 ? 'translate-y-[-40px]' : 
                    index === 2 ? 'translate-y-[40px]' : 'translate-y-[120px]'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{feature.title}</h4>
                    <p className="text-gray-400 text-xs">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right side features */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-8">
            {sideFeatures.slice(4).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`flex items-center space-x-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer max-w-xs ${
                    index === 0 ? 'translate-y-[-120px]' : 
                    index === 1 ? 'translate-y-[-40px]' : 
                    index === 2 ? 'translate-y-[40px]' : 'translate-y-[120px]'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{feature.title}</h4>
                    <p className="text-gray-400 text-xs">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central orbital system */}
          <div className="relative w-96 h-96">
            {/* Orbital rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
              <div className="absolute w-96 h-96 border border-blue-500/10 rounded-full animate-spin-reverse"></div>
              <div className="absolute w-64 h-64 border border-purple-500/15 rounded-full" style={{animation: 'spin-slow 25s linear infinite reverse'}}></div>
            </div>

            {/* Central floating cards */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main central card */}
              <div className="relative z-10">
                <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-xs">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">AI-XZ Streamlining Keynays</h3>
                      <p className="text-gray-600 text-sm">Advanced Tools</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Floating tool bubbles */}
              <div className="absolute top-8 right-8 bg-slate-800 text-white px-4 py-2 rounded-full border border-slate-600 text-sm">
                <span className="text-blue-400">👤</span> Canvalt Toolkit →
              </div>
              
              <div className="absolute bottom-8 left-8 bg-slate-800 text-white px-4 py-2 rounded-full border border-slate-600 text-sm">
                <span className="text-yellow-400">💰</span> Dragoe Pointed →
              </div>
              
              <div className="absolute bottom-16 right-16 bg-slate-800 text-white px-4 py-2 rounded-full border border-slate-600 text-sm">
                <span className="text-cyan-400">⚡</span> Christioelle Coette →
              </div>

              {/* Floating interaction elements */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-500/20 rounded-full animate-ping"></div>
              <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-cyan-500/20 rounded-full animate-pulse"></div>
              <div className="absolute top-3/4 left-3/4 w-4 h-4 bg-purple-500/20 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Experience the Future of AI Tools
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust Suntyn AI for their daily workflow automation and creative tasks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              asChild
            >
              <Link href="/all-tools">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-slate-600 text-white hover:bg-slate-800 px-8 py-4 rounded-full text-lg transition-all duration-300"
              asChild
            >
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}