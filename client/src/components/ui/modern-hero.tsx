import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  FileText, 
  Image, 
  Music, 
  Shield, 
  Zap, 
  Settings, 
  Database, 
  Globe 
} from 'lucide-react';

// 3D Document Stack Component
const DocumentStack = () => {
  return (
    <div className="relative w-96 h-80 mx-auto perspective-1000">
      {/* Background circular dotted grid */}
      <div className="absolute inset-0 -z-10">
        <svg width="100%" height="100%" viewBox="0 0 400 300" className="opacity-30">
          <defs>
            <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-cyan-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      {/* Documents with 3D effect */}
      {/* Blue Document */}
      <motion.div
        className="absolute w-48 h-64 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-2xl border-t-4 border-blue-300"
        style={{
          transform: 'rotateX(15deg) rotateY(-10deg) translateZ(20px)',
          transformStyle: 'preserve-3d'
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="p-4">
          <div className="w-3 h-3 bg-red-400 rounded-full mb-3"></div>
          <div className="space-y-2">
            <div className="h-2 bg-blue-200 rounded w-3/4"></div>
            <div className="h-2 bg-blue-200 rounded w-1/2"></div>
            <div className="h-2 bg-blue-200 rounded w-2/3"></div>
          </div>
        </div>
      </motion.div>

      {/* White Document */}
      <motion.div
        className="absolute w-48 h-64 bg-white rounded-lg shadow-2xl border border-gray-200"
        style={{
          transform: 'rotateX(15deg) rotateY(5deg) translateZ(10px) translateX(60px)',
          transformStyle: 'preserve-3d'
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="p-4">
          <div className="w-3 h-3 bg-red-400 rounded-full mb-3"></div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            <div className="h-2 bg-gray-300 rounded w-2/3"></div>
            <div className="h-2 bg-gray-300 rounded w-3/5"></div>
          </div>
        </div>
      </motion.div>

      {/* Green Document */}
      <motion.div
        className="absolute w-48 h-64 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-2xl border-t-4 border-emerald-300"
        style={{
          transform: 'rotateX(15deg) rotateY(20deg) translateZ(0px) translateX(120px)',
          transformStyle: 'preserve-3d'
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="p-4">
          <div className="w-3 h-3 bg-blue-400 rounded-full mb-3"></div>
          <div className="space-y-2">
            <div className="h-2 bg-green-200 rounded w-3/4"></div>
            <div className="h-2 bg-green-200 rounded w-1/2"></div>
            <div className="h-2 bg-green-200 rounded w-2/3"></div>
          </div>
        </div>
      </motion.div>

      {/* Front Document with security icon */}
      <motion.div
        className="absolute w-48 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-2xl border border-gray-300"
        style={{
          transform: 'rotateX(15deg) rotateY(-5deg) translateZ(30px) translateX(180px)',
          transformStyle: 'preserve-3d'
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-400 rounded w-3/4"></div>
            <div className="h-2 bg-gray-400 rounded w-1/2"></div>
            <div className="h-2 bg-gray-400 rounded w-2/3"></div>
          </div>
        </div>
      </motion.div>

      {/* Animated rings around the stack */}
      <motion.div
        className="absolute inset-0 border-2 border-cyan-400 rounded-full opacity-30"
        style={{
          width: '120%',
          height: '120%',
          left: '-10%',
          top: '-10%'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-0 border border-cyan-300 rounded-full opacity-20"
        style={{
          width: '140%',
          height: '140%',
          left: '-20%',
          top: '-20%'
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// Tool Category Card Component
const ToolCategoryCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  delay = 0 
}: { 
  icon: React.ElementType, 
  title: string, 
  subtitle: string, 
  delay?: number 
}) => {
  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/70 group cursor-pointer"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <p className="text-gray-400 text-xs">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function ModernHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Header Text */}
        <div className="text-center mb-8">
          <motion.p
            className="text-cyan-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Easy. Subscriptions for your Business.
          </motion.p>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Developer Tool Suite
          </motion.h1>
        </div>

        {/* 3D Document Stack */}
        <div className="mb-16">
          <DocumentStack />
        </div>

        {/* Tool Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <ToolCategoryCard 
            icon={FileText} 
            title="PDF Tools" 
            subtitle="Merge, split, compress PDF files" 
            delay={0.1}
          />
          <ToolCategoryCard 
            icon={Image} 
            title="Image Editor" 
            subtitle="Resize, compress, convert images" 
            delay={0.2}
          />
          <ToolCategoryCard 
            icon={Music} 
            title="Media Tools" 
            subtitle="Audio/video processing tools" 
            delay={0.3}
          />
          <ToolCategoryCard 
            icon={Shield} 
            title="Security Tools" 
            subtitle="Document validation tools" 
            delay={0.4}
          />
          
          <ToolCategoryCard 
            icon={Zap} 
            title="AI Tools" 
            subtitle="Powered by artificial intelligence" 
            delay={0.5}
          />
          <ToolCategoryCard 
            icon={Settings} 
            title="Utilities" 
            subtitle="Developer productivity tools" 
            delay={0.6}
          />
          <ToolCategoryCard 
            icon={Database} 
            title="Data Tools" 
            subtitle="Process and analyze data" 
            delay={0.7}
          />
          <ToolCategoryCard 
            icon={Globe} 
            title="Web Tools" 
            subtitle="Web development utilities" 
            delay={0.8}
          />
        </div>

        {/* Support Section */}
        <div className="text-center">
          <motion.p
            className="text-cyan-400 text-sm font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Support Us
          </motion.p>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Help us build the future of development tools.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              asChild
            >
              <Link href="/all-tools">
                Explore Tools →
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-4 h-4 bg-cyan-400 rounded-full opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-pulse">
        <div className="w-6 h-6 bg-blue-400 rounded-full opacity-40" />
      </div>
      <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="w-3 h-3 bg-purple-400 rounded-full opacity-50" />
      </div>
    </section>
  );
}

export default ModernHero;