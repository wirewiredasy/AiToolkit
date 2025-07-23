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

// Image Tools Icons
export const BackgroundRemoverIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="12" y="12" width="40" height="32" rx="4" fill="#8B5CF6" />
      <motion.path
        d="M16 32L20 28L28 36L36 28L44 36L48 32V40H16V32Z"
        fill="#E0E7FF"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="22" cy="22" r="3" fill="#E0E7FF" />
      <motion.path
        d="M52 16L56 20M56 16L52 20"
        stroke="#F87171"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const ImageResizerIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="12" width="28" height="20" rx="2" fill="#3B82F6" />
      <rect x="10" y="16" width="24" height="2" fill="#DBEAFE" />
      <rect x="10" y="20" width="18" height="2" fill="#DBEAFE" />
      <rect x="10" y="24" width="20" height="2" fill="#DBEAFE" />
      
      <motion.rect
        x="28" y="28" width="28" height="20" rx="2" fill="#10B981"
        animate={{ scale: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x="30" y="32" width="24" height="2" fill="#D1FAE5" />
      <rect x="30" y="36" width="18" height="2" fill="#D1FAE5" />
      <rect x="30" y="40" width="20" height="2" fill="#D1FAE5" />
      
      <motion.path
        d="M24 20L28 16L24 12M40 36L44 40L48 36"
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

export const ImageCompressorIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="16" y="12" width="32" height="24" rx="4" fill="#F59E0B" />
      <circle cx="24" cy="20" r="2" fill="#FDE68A" />
      <path d="M18 30L22 26L26 30L30 26L34 30L38 26L42 30L46 26V32H18V30Z" fill="#FDE68A" />
      
      <motion.path
        d="M12 32L16 28L12 24M52 24L48 28L52 32"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.text
        x="32" y="44" fontSize="8" fill="#64748B" textAnchor="middle"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        -50%
      </motion.text>
    </motion.svg>
  </motion.div>
);

export const ImageCropperIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="8" width="40" height="32" rx="4" fill="#06B6D4" />
      <circle cx="18" cy="18" r="3" fill="#A5F3FC" />
      <path d="M10 32L14 28L18 32L22 28L26 32L30 28L34 32L38 28L42 32L46 28V36H10V32Z" fill="#A5F3FC" />
      
      <motion.rect
        x="20" y="20" width="24" height="20" 
        fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4,4"
        animate={{ strokeDashoffset: [0, 8] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.g
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <rect x="18" y="18" width="4" height="4" fill="#FFFFFF" />
        <rect x="40" y="18" width="4" height="4" fill="#FFFFFF" />
        <rect x="18" y="36" width="4" height="4" fill="#FFFFFF" />
        <rect x="40" y="36" width="4" height="4" fill="#FFFFFF" />
      </motion.g>
    </motion.svg>
  </motion.div>
);

export const WatermarkRemoverIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="12" width="40" height="32" rx="4" fill="#EC4899" />
      <circle cx="18" cy="22" r="3" fill="#FBCFE8" />
      <path d="M10 36L14 32L18 36L22 32L26 36L30 32L34 36L38 32L42 36L46 32V40H10V36Z" fill="#FBCFE8" />
      
      <motion.text
        x="32" y="28" fontSize="8" fill="#FBCFE8" textAnchor="middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        WATERMARK
      </motion.text>
      
      <motion.path
        d="M52 16L56 20M56 16L52 20"
        stroke="#F87171"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const ImageConverterIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="6" y="12" width="20" height="16" rx="2" fill="#3B82F6" />
      <circle cx="12" cy="16" r="1.5" fill="#DBEAFE" />
      <path d="M8 22L10 20L12 22L14 20L16 22L18 20L20 22L22 20L24 22V24H8V22Z" fill="#DBEAFE" />
      <text x="16" y="36" fontSize="6" fill="#3B82F6" textAnchor="middle">JPG</text>
      
      <rect x="38" y="12" width="20" height="16" rx="2" fill="#10B981" />
      <circle cx="44" cy="16" r="1.5" fill="#D1FAE5" />
      <path d="M40 22L42 20L44 22L46 20L48 22L50 20L52 22L54 20L56 22V24H40V22Z" fill="#D1FAE5" />
      <text x="48" y="36" fontSize="6" fill="#10B981" textAnchor="middle">PNG</text>
      
      <motion.path
        d="M26 20L32 16L38 20"
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

// Export all image icons in a map for easy access
export const AnimatedImageIcons = {
  BackgroundRemover: BackgroundRemoverIcon,
  ImageResizer: ImageResizerIcon,
  ImageCompressor: ImageCompressorIcon,
  ImageCropper: ImageCropperIcon,
  WatermarkRemover: WatermarkRemoverIcon,
  ImageConverter: ImageConverterIcon,
};