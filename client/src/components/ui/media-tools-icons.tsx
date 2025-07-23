import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for consistent icon animations
const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } }
};

const floatVariants = {
  initial: { y: 0 },
  float: { 
    y: [-2, 2, -2],
    transition: { 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

interface AnimatedIconProps {
  className?: string;
  animate?: boolean;
}

// Media Tools Icons
export const VideoConverterIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
  <motion.div
    variants={animate ? iconVariants : {}}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
  >
    <motion.svg
      variants={animate ? floatVariants : {}}
      initial="initial"
      animate={animate ? "float" : "initial"}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="16" width="20" height="14" rx="2" fill="#EF4444" />
      <motion.polygon
        points="12,20 12,26 18,23"
        fill="#FCA5A5"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="16" y="38" fontSize="6" fill="#EF4444" textAnchor="middle">MP4</text>
      
      <rect x="38" y="16" width="20" height="14" rx="2" fill="#8B5CF6" />
      <motion.polygon
        points="44,20 44,26 50,23"
        fill="#C4B5FD"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <text x="48" y="38" fontSize="6" fill="#8B5CF6" textAnchor="middle">AVI</text>
      
      <motion.path
        d="M26 23L32 19L38 23"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const AudioConverterIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
  <motion.div
    variants={animate ? iconVariants : {}}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
  >
    <motion.svg
      variants={animate ? floatVariants : {}}
      initial="initial"
      animate={animate ? "float" : "initial"}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="18" width="20" height="12" rx="2" fill="#10B981" />
      <motion.rect
        x="10" y="20" width="2" height="8" fill="#D1FAE5"
        animate={{ height: [8, 4, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="14" y="20" width="2" height="8" fill="#D1FAE5"
        animate={{ height: [8, 2, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.rect
        x="18" y="20" width="2" height="8" fill="#D1FAE5"
        animate={{ height: [8, 6, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.rect
        x="22" y="20" width="2" height="8" fill="#D1FAE5"
        animate={{ height: [8, 3, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <text x="16" y="38" fontSize="6" fill="#10B981" textAnchor="middle">MP3</text>
      
      <rect x="38" y="18" width="20" height="12" rx="2" fill="#F59E0B" />
      <motion.rect
        x="42" y="20" width="2" height="8" fill="#FDE68A"
        animate={{ height: [8, 5, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
      />
      <motion.rect
        x="46" y="20" width="2" height="8" fill="#FDE68A"
        animate={{ height: [8, 7, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.rect
        x="50" y="20" width="2" height="8" fill="#FDE68A"
        animate={{ height: [8, 2, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.rect
        x="54" y="20" width="2" height="8" fill="#FDE68A"
        animate={{ height: [8, 4, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      />
      <text x="48" y="38" fontSize="6" fill="#F59E0B" textAnchor="middle">WAV</text>
      
      <motion.path
        d="M26 24L32 20L38 24"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const VideoCompressorIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
  <motion.div
    variants={animate ? iconVariants : {}}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
  >
    <motion.svg
      variants={animate ? floatVariants : {}}
      initial="initial"
      animate={animate ? "float" : "initial"}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="16" y="12" width="32" height="24" rx="4" fill="#3B82F6" />
      <motion.polygon
        points="24,20 24,28 32,24"
        fill="#DBEAFE"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.path
        d="M12 24L16 20L12 16M52 16L48 20L52 24"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.text
        x="32" y="48" fontSize="8" fill="#64748B" textAnchor="middle"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        -70%
      </motion.text>
    </motion.svg>
  </motion.div>
);

export const AudioExtractorIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
  <motion.div
    variants={animate ? iconVariants : {}}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
  >
    <motion.svg
      variants={animate ? floatVariants : {}}
      initial="initial"
      animate={animate ? "float" : "initial"}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="12" width="24" height="18" rx="2" fill="#EF4444" />
      <polygon points="16,18 16,24 22,21" fill="#FCA5A5" />
      <text x="20" y="38" fontSize="6" fill="#EF4444" textAnchor="middle">VIDEO</text>
      
      <rect x="40" y="20" width="18" height="12" rx="2" fill="#10B981" />
      <motion.rect
        x="42" y="22" width="2" height="8" fill="#D1FAE5"
        animate={{ height: [8, 4, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="46" y="22" width="2" height="8" fill="#D1FAE5"
        animate={{ height: [8, 2, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.rect
        x="50" y="22" width="2" height="8" fill="#D1FAE5"
        animate={{ height: [8, 6, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.rect
        x="54" y="22" width="2" height="8" fill="#D1FAE5"
        animate={{ height: [8, 3, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <text x="49" y="42" fontSize="6" fill="#10B981" textAnchor="middle">AUDIO</text>
      
      <motion.path
        d="M32 21L36 17L40 21"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const GIFMakerIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
  <motion.div
    variants={animate ? iconVariants : {}}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
  >
    <motion.svg
      variants={animate ? floatVariants : {}}
      initial="initial"
      animate={animate ? "float" : "initial"}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="12" y="12" width="40" height="28" rx="4" fill="#8B5CF6" />
      
      <motion.rect
        x="16" y="16" width="8" height="6" rx="1" fill="#E0E7FF"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="28" y="16" width="8" height="6" rx="1" fill="#E0E7FF"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.rect
        x="40" y="16" width="8" height="6" rx="1" fill="#E0E7FF"
        animate={{ opacity: [0.3, 0.3, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      
      <text x="32" y="32" fontSize="8" fill="#E0E7FF" textAnchor="middle">GIF</text>
      
      <motion.circle
        cx="48" cy="20" r="3" fill="#10B981"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const VideoTrimmerIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
  <motion.div
    variants={animate ? iconVariants : {}}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
  >
    <motion.svg
      variants={animate ? floatVariants : {}}
      initial="initial"
      animate={animate ? "float" : "initial"}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="12" y="16" width="40" height="24" rx="4" fill="#F59E0B" />
      <polygon points="24,24 24,32 32,28" fill="#FDE68A" />
      
      <motion.rect
        x="8" y="12" width="4" height="32" rx="2" fill="#64748B"
        animate={{ x: [8, 16, 8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="52" y="12" width="4" height="32" rx="2" fill="#64748B"
        animate={{ x: [52, 44, 52] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.path
        d="M16 48L20 44L16 40M48 40L44 44L48 48"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.svg>
  </motion.div>
);

// Export all media icons in a map for easy access
export const AnimatedMediaIcons = {
  VideoConverter: VideoConverterIcon,
  AudioConverter: AudioConverterIcon,
  VideoCompressor: VideoCompressorIcon,
  AudioExtractor: AudioExtractorIcon,
  GIFMaker: GIFMakerIcon,
  VideoTrimmer: VideoTrimmerIcon,
};