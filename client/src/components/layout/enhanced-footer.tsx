import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Image as ImageIcon, 
  Music,
  Building,
  Code,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Star,
  Users,
  Shield,
  Zap,
  Globe,
  Heart,
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const toolCategories = [
  {
    title: 'PDF Tools',
    icon: FileText,
    tools: [
      { name: 'PDF Merger', link: '/tool/pdf-merger' },
      { name: 'PDF Splitter', link: '/tool/pdf-splitter' },
      { name: 'PDF Compressor', link: '/tool/pdf-compressor' },
      { name: 'PDF to Word', link: '/tool/pdf-to-word' },
      { name: 'PDF Watermark', link: '/tool/pdf-watermark' },
      { name: 'PDF Password Protector', link: '/tool/pdf-password-protector' }
    ]
  },
  {
    title: 'Image Tools',
    icon: ImageIcon,
    tools: [
      { name: 'Background Remover', link: '/tool/bg-remover' },
      { name: 'Image Compressor', link: '/tool/image-compressor' },
      { name: 'Image Resizer', link: '/tool/image-resizer' },
      { name: 'Image Converter', link: '/tool/image-converter' },
      { name: 'Image Enhancer', link: '/tool/image-enhancer' },
      { name: 'Watermark Remover', link: '/tool/watermark-remover' }
    ]
  },
  {
    title: 'Media Tools',
    icon: Music,
    tools: [
      { name: 'Video Converter', link: '/tool/video-converter' },
      { name: 'Audio Converter', link: '/tool/audio-converter' },
      { name: 'Video Trimmer', link: '/tool/video-trimmer' },
      { name: 'Audio Trimmer', link: '/tool/audio-trimmer' },
      { name: 'Video to Audio', link: '/tool/video-to-audio' },
      { name: 'Audio Normalizer', link: '/tool/audio-normalizer' }
    ]
  },
  {
    title: 'Government Tools',
    icon: Building,
    tools: [
      { name: 'PAN Validator', link: '/tool/pan-validator' },
      { name: 'Aadhaar Validator', link: '/tool/aadhaar-validator' },
      { name: 'GST Validator', link: '/tool/gst-validator' },
      { name: 'Passport Validator', link: '/tool/passport-validator' },
      { name: 'Driving License Validator', link: '/tool/driving-license-validator' },
      { name: 'Voter ID Validator', link: '/tool/voter-id-validator' }
    ]
  },
  {
    title: 'Developer Tools',
    icon: Code,
    tools: [
      { name: 'JSON Formatter', link: '/tool/json-formatter' },
      { name: 'Code Minifier', link: '/tool/code-minifier' },
      { name: 'Hash Generator', link: '/tool/hash-generator' },
      { name: 'Base64 Encoder', link: '/tool/base64-encoder' },
      { name: 'URL Encoder', link: '/tool/url-encoder' },
      { name: 'Color Picker', link: '/tool/color-picker' }
    ]
  }
];

const companyInfo = {
  name: 'Suntyn AI',
  tagline: 'Empowering productivity with neural intelligence',
  description: 'Professional-grade AI tools for document processing, media conversion, and workflow automation',
  email: 'support@suntyn.ai',
  phone: '+1 (555) 123-4567',
  address: 'San Francisco, CA 94105, USA',
  founded: '2024',
  employees: '50+',
  customers: '1.2M+'
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/suntynai', followers: '25K' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/suntynai', stars: '12K' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/suntynai', followers: '18K' },
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@suntynai', subscribers: '45K' }
];

const achievements = [
  { icon: Users, label: 'Active Users', value: '1.2M+' },
  { icon: FileText, label: 'Files Processed', value: '15.8M+' },
  { icon: Globe, label: 'Countries', value: '150+' },
  { icon: Star, label: 'User Rating', value: '4.9/5' }
];

export default function EnhancedFooter() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [animatedElements, setAnimatedElements] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedElements(prev => {
        const newIndex = Math.floor(Math.random() * achievements.length);
        return prev.includes(newIndex) ? prev : [...prev.slice(-2), newIndex];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-gray-950 dark:to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Neural network pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 80px 80px, 100px 100px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Company Info - Left Side */}
            <div className="lg:col-span-4">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{companyInfo.name}</h3>
                    <p className="text-cyan-300 text-sm">{companyInfo.tagline}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {companyInfo.description}
                </p>

                {/* Achievements Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    const isAnimated = animatedElements.includes(index);
                    return (
                      <div 
                        key={index} 
                        className={`p-4 bg-slate-800/50 dark:bg-gray-900/50 rounded-xl border border-slate-700/50 dark:border-gray-800/50 transition-all duration-500 ${
                          isAnimated ? 'scale-105 border-cyan-400/60 shadow-lg shadow-cyan-500/20' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 transition-colors ${isAnimated ? 'text-cyan-400' : 'text-gray-400'}`} />
                          <div>
                            <div className={`font-bold transition-colors ${isAnimated ? 'text-cyan-300' : 'text-white'}`}>
                              {achievement.value}
                            </div>
                            <div className="text-xs text-gray-500">{achievement.label}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-400 hover:text-cyan-300 transition-colors">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{companyInfo.address}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-slate-800/50 dark:bg-gray-900/50 rounded-xl border border-slate-700/50 dark:border-gray-800/50 flex items-center justify-center hover:bg-slate-700/50 dark:hover:bg-gray-800/50 hover:border-cyan-400/60 hover:scale-110 transition-all duration-300 group"
                        title={`${social.name} - ${social.followers || social.stars || social.subscribers}`}
                      >
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tools Categories - Right Side */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  AI-Powered Tool Categories
                </h3>
                <p className="text-gray-400 text-lg">
                  Explore our comprehensive suite of professional tools
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {toolCategories.map((category, categoryIndex) => {
                  const Icon = category.icon;
                  const isHovered = hoveredCategory === category.title;
                  
                  return (
                    <div
                      key={categoryIndex}
                      className="group"
                      onMouseEnter={() => setHoveredCategory(category.title)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <div className={`p-6 bg-slate-800/40 dark:bg-gray-900/40 rounded-2xl border border-slate-700/50 dark:border-gray-800/50 transition-all duration-500 ${
                        isHovered ? 'bg-slate-800/80 dark:bg-gray-900/80 border-cyan-400/60 shadow-xl shadow-cyan-500/20 transform scale-105' : 'hover:bg-slate-800/60 dark:hover:bg-gray-900/60'
                      }`}>
                        
                        {/* Category Header */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isHovered 
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg' 
                              : 'bg-slate-700/50 dark:bg-gray-800/50 group-hover:bg-slate-600/50 dark:group-hover:bg-gray-700/50'
                          }`}>
                            <Icon className={`w-6 h-6 transition-colors ${
                              isHovered ? 'text-white' : 'text-gray-400 group-hover:text-cyan-300'
                            }`} />
                          </div>
                          <div>
                            <h4 className={`text-lg font-bold transition-colors ${
                              isHovered ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                            }`}>
                              {category.title}
                            </h4>
                            <p className="text-xs text-gray-500">{category.tools.length} tools available</p>
                          </div>
                        </div>

                        {/* Tools List */}
                        <div className="space-y-2">
                          {category.tools.map((tool, toolIndex) => (
                            <Link
                              key={toolIndex}
                              to={tool.link}
                              className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all duration-200 ${
                                isHovered 
                                  ? 'hover:bg-cyan-500/10 hover:border-cyan-400/30 border border-transparent' 
                                  : 'hover:bg-slate-700/30 dark:hover:bg-gray-800/30'
                              } group/tool`}
                            >
                              <span className={`text-sm transition-colors ${
                                isHovered 
                                  ? 'text-gray-300 group-hover/tool:text-cyan-300' 
                                  : 'text-gray-400 group-hover/tool:text-white'
                              }`}>
                                {tool.name}
                              </span>
                              <ArrowRight className={`w-3 h-3 opacity-0 group-hover/tool:opacity-100 transition-all duration-200 ${
                                isHovered ? 'text-cyan-400' : 'text-gray-400'
                              } group-hover/tool:translate-x-1`} />
                            </Link>
                          ))}
                        </div>

                        {/* View All Link */}
                        <Link
                          to={`/toolkit/${category.title.toLowerCase().replace(' tools', '')}`}
                          className={`mt-4 flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                            isHovered 
                              ? 'text-cyan-300 hover:text-cyan-200' 
                              : 'text-gray-500 hover:text-cyan-300'
                          } group/view`}
                        >
                          View All {category.title}
                          <ExternalLink className="w-3 h-3 group-hover/view:scale-110 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 dark:border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="flex items-center gap-6">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
              </div>
              <div className="hidden md:flex items-center gap-1 text-gray-500 text-sm">
                Made with <Heart className="w-4 h-4 text-red-400 mx-1" /> for productivity
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-cyan-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-cyan-300 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-cyan-300 transition-colors">
                Contact
              </Link>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-semibold">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}