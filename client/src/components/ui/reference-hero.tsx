import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Music, ImageIcon, Play, User, Settings } from 'lucide-react';
import { toolkits } from '@/lib/tools';

const ReferenceHero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-16">
          
          {/* Logo and Title */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            {/* Custom Logo - Geometric Shapes */}
            <motion.div 
              className="inline-flex items-center space-x-3 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-16 h-16">
                {/* Teal curved shape */}
                <div className="absolute top-0 left-0 w-8 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-tl-3xl rounded-bl-lg" />
                {/* Beige curved shape */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-tr-3xl rounded-br-lg" />
                {/* Bottom beige shape */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-orange-300 to-yellow-400 rounded-br-3xl rounded-bl-lg" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Professional AI-powered
              <br />
              <span className="text-teal-400">intelligence</span> platform, <span className="text-purple-400">analysis</span>, and
              <br />
              <span className="text-blue-400">developer toolkits</span>
            </motion.h1>

            {/* Statistics Badge */}
            <motion.div
              className="inline-flex items-center space-x-6 bg-gray-800/30 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700/50 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{toolkits.reduce((acc, toolkit) => acc + toolkit.toolCount, 0)}+</div>
                <div className="text-xs text-gray-400">AI Tools</div>
              </div>
              <div className="w-px h-8 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{toolkits.length}</div>
                <div className="text-xs text-gray-400">Categories</div>
              </div>
              <div className="w-px h-8 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-xs text-gray-400">Users Served</div>
              </div>
            </motion.div>

            {/* Get Now Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={() => window.location.href = '/auth/login'}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-bounce"
              >
                Get Now
              </button>
            </motion.div>
          </div>

        </div>

        {/* 3D Torus Visualization */}
        <div className="flex justify-center mb-16">
          <motion.div 
            className="relative w-96 h-96"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Main 3D Torus */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-64 h-16 rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 50%, #ec4899 100%)',
                  transform: 'perspective(1000px) rotateX(75deg)',
                  boxShadow: '0 20px 60px rgba(20, 184, 166, 0.3), 0 40px 100px rgba(139, 92, 246, 0.2)'
                }}
                animate={{ 
                  rotateY: [0, 360]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {/* Inner segments for 3D effect */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-white/10"
                    style={{
                      transform: `translateZ(${i * 4}px)`,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Floating platforms */}
            <motion.div 
              className="absolute -bottom-4 -left-8 w-24 h-8 bg-gray-800 rounded-lg"
              style={{
                transform: 'perspective(1000px) rotateX(60deg)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-4 -right-8 w-24 h-8 bg-gray-800 rounded-lg"
              style={{
                transform: 'perspective(1000px) rotateX(60deg)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />

            {/* Grid lines extending from torus */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-20 bg-gradient-to-t from-teal-400/50 to-transparent"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: '60%',
                    transform: 'perspective(1000px) rotateX(30deg)'
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Feature Cards - Connected to Real Data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* PDF Card - Real Data from toolkits */}
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(20, 184, 166, 0.1)' }}
            onClick={() => window.location.href = '/toolkit/pdf'}
          >
            <div className="bg-teal-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">PDF</h3>
            <div className="text-sm text-teal-400 mb-2">{toolkits.find(t => t.id === 'pdf')?.toolCount || 25} tools available</div>
            <p className="text-gray-400 leading-relaxed">
              {toolkits.find(t => t.id === 'pdf')?.description || 'Comprehensive document analysis and processing. Convert, edit, and manage PDF files with intelligent automation for streamlined workflows and enhanced productivity.'}
            </p>
          </motion.div>

          {/* Audio/Video Card - Real Data from toolkits */}
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.1)' }}
            onClick={() => window.location.href = '/toolkit/audio-video'}
          >
            <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Play className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Audio/Video</h3>
            <div className="text-sm text-purple-400 mb-2">{toolkits.find(t => t.id === 'audio-video')?.toolCount || 20} tools available</div>
            <p className="text-gray-400 leading-relaxed">
              {toolkits.find(t => t.id === 'audio-video')?.description || 'Advanced media processing and optimization. Transform audio and video content with AI-powered tools for editing, enhancement, and format conversion.'}
            </p>
          </motion.div>

          {/* Image Card - Real Data from toolkits */}
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.1)' }}
            onClick={() => window.location.href = '/toolkit/image'}
          >
            <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <ImageIcon className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Image</h3>
            <div className="text-sm text-pink-400 mb-2">{toolkits.find(t => t.id === 'image')?.toolCount || 20} tools available</div>
            <p className="text-gray-400 leading-relaxed">
              {toolkits.find(t => t.id === 'image')?.description || 'Professional image editing and enhancement. Resize, optimize, and transform images with precision tools designed for creative professionals and developers.'}
            </p>
          </motion.div>

        </div>

        {/* Bottom spacing */}
        <div className="pb-20" />

      </div>
    </section>
  );
};

export default ReferenceHero;