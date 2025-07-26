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
  CheckCircle
} from 'lucide-react';

const realFeatures = [
  {
    icon: FileText,
    title: 'PDF Processing Hub',
    description: '25+ tools for merge, split, compress, convert PDFs instantly',
    count: '50K+ users',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: ImageIcon,
    title: 'Image Enhancement',
    description: 'Resize, compress, filter, remove backgrounds with AI',
    count: '35K+ users',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Music,
    title: 'Media Conversion',
    description: 'Convert videos, extract audio, trim files seamlessly',
    count: '28K+ users',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Code,
    title: 'Developer Toolkit',
    description: 'Code formatters, validators, minifiers for developers',
    count: '15K+ users',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Building,
    title: 'Government Docs',
    description: 'PAN, Aadhaar, GST validators and certificate generators',
    count: '22K+ users',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Shield,
    title: 'Secure Processing',
    description: 'End-to-end encryption with automatic file deletion',
    count: '45K+ users',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Collaboration Suite',
    description: 'Share, collaborate, and manage projects with teams',
    count: '18K+ users',
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'AI-Powered Analytics',
    description: 'Intelligent insights and automation for workflows',
    count: '40K+ users',
    gradient: 'from-violet-500 to-purple-500'
  },
];

export default function ProfessionalPreFooter() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % realFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-gray-950 dark:to-black py-24 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Background glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature showcase grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {realFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeFeature;
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${
                  isActive
                    ? 'bg-slate-800/80 dark:bg-gray-900/80 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 scale-105'
                    : 'bg-slate-800/40 dark:bg-gray-900/40 border-slate-700/50 dark:border-gray-800/50 hover:bg-slate-800/60 dark:hover:bg-gray-900/60 hover:border-slate-600 dark:hover:border-gray-700'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white dark:text-gray-100 mb-3 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-cyan-400 font-semibold text-sm">{feature.count}</span>
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* Central showcase area */}
        <div className="relative mb-20">
          <div className="flex items-center justify-center">
            {/* Main showcase card */}
            <div className="relative max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                {/* Browser controls */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Suntyn AI Hub</h3>
                    <p className="text-gray-600 dark:text-gray-300">108+ Professional Tools</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-xs font-semibold">Live & Active</span>
                    </div>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  <div className="w-full h-2 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full"></div>
                  <div className="w-4/5 h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full"></div>
                  <div className="w-3/5 h-2 bg-gradient-to-r from-green-200 to-blue-200 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Floating tool indicators */}
            <div className="absolute top-8 left-8 bg-slate-800/90 backdrop-blur-xl text-white px-4 py-2 rounded-xl border border-cyan-400/30 text-sm">
              <FileText className="inline h-4 w-4 mr-2 text-cyan-400" />
              PDF Merger - 25K users
            </div>
            
            <div className="absolute bottom-8 right-8 bg-slate-800/90 backdrop-blur-xl text-white px-4 py-2 rounded-xl border border-purple-400/30 text-sm">
              <ImageIcon className="inline h-4 w-4 mr-2 text-purple-400" />
              Image Resizer - 18K users
            </div>
            
            <div className="absolute top-1/2 right-0 bg-slate-800/90 backdrop-blur-xl text-white px-4 py-2 rounded-xl border border-green-400/30 text-sm">
              <Music className="inline h-4 w-4 mr-2 text-green-400" />
              Video Converter - 12K users
            </div>

            <div className="absolute top-1/2 left-0 bg-slate-800/90 backdrop-blur-xl text-white px-4 py-2 rounded-xl border border-orange-400/30 text-sm">
              <Building className="inline h-4 w-4 mr-2 text-orange-400" />
              Gov Docs - 22K users
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative bg-slate-800/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-600/50 dark:border-gray-700/50 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-100 mb-6">
              Transform Your Workflow Today
            </h2>
            
            <p className="text-gray-300 dark:text-gray-200 text-xl mb-8 max-w-3xl mx-auto">
              Join 50,000+ professionals who've already revolutionized their productivity with Suntyn AI's intelligent toolkit.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-10 max-w-xl mx-auto">
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
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/all-tools">
                  <Zap className="mr-3 h-5 w-5" />
                  Start Free Now
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 px-10 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                asChild
              >
                <Link href="/pricing">
                  <Shield className="mr-3 h-5 w-5" />
                  View Pricing
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">Trusted by professionals at:</p>
              <div className="flex justify-center items-center space-x-8 text-gray-500 font-medium">
                <span>Google</span>
                <span>Microsoft</span>
                <span>Amazon</span>
                <span>Meta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}