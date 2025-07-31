import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Building, 
  Code,
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Mail,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Heart,
  Star
} from 'lucide-react';
import GeometricLogo from '@/components/ui/geometric-logo';

const toolkits = [
  {
    icon: FileText,
    name: 'PDF Toolkit',
    description: '25+ PDF processing tools',
    gradient: 'from-blue-500 to-cyan-500',
    demoVideo: 'PDF processing in action'
  },
  {
    icon: ImageIcon,
    name: 'Image Media',
    description: 'AI-powered image editing',
    gradient: 'from-purple-500 to-pink-500',
    demoVideo: 'Background removal demo'
  },
  {
    icon: Building,
    name: 'Government',
    description: 'Official document validation',
    gradient: 'from-emerald-500 to-green-500',
    demoVideo: 'Certificate generation'
  },
  {
    icon: Code,
    name: 'Developer',
    description: 'Code tools & utilities',
    gradient: 'from-orange-500 to-red-500',
    demoVideo: 'Code formatting demo'
  }
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/suntynai', name: 'Twitter' },
  { icon: Github, href: 'https://github.com/suntynai', name: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/company/suntynai', name: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@suntynai', name: 'YouTube' }
];

const quickLinks = [
  { name: 'All Tools', href: '/tools' },
  { name: 'API Access', href: '/api' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Help Center', href: '/help' }
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' }
];

export default function AdvancedFooter() {
  const [hoveredToolkit, setHoveredToolkit] = useState<string | null>(null);
  const [playingDemo, setPlayingDemo] = useState<string | null>(null);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDemoPlay = (toolkitName: string) => {
    setPlayingDemo(toolkitName);
    setTimeout(() => setPlayingDemo(null), 3000);
  };

  return (
    <footer className="relative bg-gray-950 border-t border-gray-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-orange-500/20 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Left Side - Toolkits Showcase */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                AI-Powered Toolkits
              </h2>
              <p className="text-gray-400 text-lg">
                Professional-grade tools with neural intelligence processing
              </p>
            </div>

            {/* Toolkit Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {toolkits.map((toolkit, index) => (
                <div
                  key={toolkit.name}
                  className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-800 
                    hover:border-gray-600 transition-all duration-500 hover:scale-105 cursor-pointer
                    ${animationStep === index ? 'ring-2 ring-blue-500/50' : ''}`}
                  onMouseEnter={() => setHoveredToolkit(toolkit.name)}
                  onMouseLeave={() => setHoveredToolkit(null)}
                  onClick={() => handleDemoPlay(toolkit.name)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${toolkit.gradient} opacity-0 
                    group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${toolkit.gradient} shadow-lg`}>
                        <toolkit.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Demo Video Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-gray-400 hover:text-white transition-all duration-300 
                          ${playingDemo === toolkit.name ? 'text-green-500 animate-pulse' : ''}`}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        {playingDemo === toolkit.name ? 'Playing...' : 'Demo'}
                      </Button>
                    </div>

                    <h3 className="text-white font-semibold text-lg mb-2">{toolkit.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{toolkit.description}</p>

                    {/* Interactive Demo Preview */}
                    {hoveredToolkit === toolkit.name && (
                      <div className="bg-black/30 rounded-lg p-3 border border-gray-700 animate-fadeIn">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Zap className="w-3 h-3 text-yellow-500" />
                          <span>{toolkit.demoVideo}</span>
                        </div>
                        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}

                    {/* Learn More Button */}
                    <Link href={`/toolkit/${toolkit.name.toLowerCase().replace(' ', '-')}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white group-hover:translate-x-1 transition-all duration-300"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Navigation & Info */}
          <div className="lg:col-span-4">
            <div className="space-y-8">
              {/* Brand Section */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <GeometricLogo className="w-10 h-10" />
                  <span className="text-2xl font-bold text-white">Suntyn AI</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Neural intelligence platform offering 108+ AI-powered tools for professionals and creators worldwide.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  Quick Access
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickLinks.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                      >
                        {link.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Platform Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active Users</span>
                    <span className="text-white font-semibold">150K+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Files Processed</span>
                    <span className="text-white font-semibold">2.5M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-green-500 font-semibold">99.9%</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Connect With Us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-200 
                        hover:scale-110 group"
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400">
                © 2025 <span className="text-white font-semibold">Suntyn AI</span>. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Built with <Heart className="w-4 h-4 inline text-red-500" /> using advanced neural intelligence
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg border border-gray-700">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-gray-300 text-sm">Enterprise Security</span>
              </div>
              
              {/* Legal Links */}
              <div className="flex gap-4">
                {legalLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-300">
                      {link.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-8 right-8 opacity-20">
        <div className="animate-spin-slow">
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
      </div>
      <div className="absolute bottom-8 left-8 opacity-20">
        <div className="animate-bounce">
          <Zap className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </footer>
  );
}