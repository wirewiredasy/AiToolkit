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

// PDF Tools Icons
export const SplitIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="12" width="20" height="28" rx="2" fill="#6366F1" />
      <rect x="36" y="12" width="20" height="28" rx="2" fill="#8B5CF6" />
      <text x="18" y="28" fontSize="10" fill="white" textAnchor="middle">A</text>
      <text x="46" y="28" fontSize="10" fill="white" textAnchor="middle">B</text>
      <motion.path
        d="M32 20L28 24L32 28"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.svg>
  </motion.div>
);

export const MergeIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="24" y="8" width="16" height="22" rx="2" fill="#6366F1" />
      <text x="32" y="22" fontSize="8" fill="white" textAnchor="middle">AB</text>
      <motion.rect
        x="8" y="36" width="14" height="20" rx="1" fill="#E2E8F0"
        animate={{ x: [8, 20, 24] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="42" y="36" width="14" height="20" rx="1" fill="#E2E8F0"
        animate={{ x: [42, 30, 24] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const CompressIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="20" y="12" width="24" height="32" rx="2" fill="#EF4444" />
      <rect x="22" y="16" width="20" height="2" fill="#FCA5A5" />
      <rect x="22" y="20" width="16" height="2" fill="#FCA5A5" />
      <rect x="22" y="24" width="18" height="2" fill="#FCA5A5" />
      <motion.path
        d="M16 32L20 28L16 24M48 24L44 28L48 32"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const PDFToWordIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="12" width="20" height="28" rx="2" fill="#EF4444" />
      <text x="18" y="28" fontSize="6" fill="white" textAnchor="middle">PDF</text>
      <rect x="36" y="12" width="20" height="28" rx="2" fill="#2563EB" />
      <rect x="38" y="18" width="16" height="2" fill="#DBEAFE" />
      <rect x="38" y="22" width="12" height="2" fill="#DBEAFE" />
      <rect x="38" y="26" width="14" height="2" fill="#DBEAFE" />
      <motion.path
        d="M28 26L32 22L36 26"
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

export const WordToPDFIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="12" width="20" height="28" rx="2" fill="#2563EB" />
      <rect x="10" y="18" width="16" height="2" fill="#DBEAFE" />
      <rect x="10" y="22" width="12" height="2" fill="#DBEAFE" />
      <rect x="10" y="26" width="14" height="2" fill="#DBEAFE" />
      <rect x="36" y="12" width="20" height="28" rx="2" fill="#EF4444" />
      <text x="46" y="28" fontSize="6" fill="white" textAnchor="middle">PDF</text>
      <motion.path
        d="M28 26L32 22L36 26"
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

export const PDFToExcelIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="12" width="20" height="28" rx="2" fill="#EF4444" />
      <text x="18" y="28" fontSize="6" fill="white" textAnchor="middle">PDF</text>
      <rect x="36" y="12" width="20" height="28" rx="2" fill="#10B981" />
      <rect x="38" y="16" width="4" height="4" fill="#D1FAE5" />
      <rect x="44" y="16" width="4" height="4" fill="#D1FAE5" />
      <rect x="50" y="16" width="4" height="4" fill="#D1FAE5" />
      <rect x="38" y="22" width="4" height="4" fill="#D1FAE5" />
      <rect x="44" y="22" width="4" height="4" fill="#D1FAE5" />
      <rect x="50" y="22" width="4" height="4" fill="#D1FAE5" />
      <motion.path
        d="M28 26L32 22L36 26"
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

export const ExcelToPDFIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="12" width="20" height="28" rx="2" fill="#10B981" />
      <rect x="10" y="16" width="4" height="4" fill="#D1FAE5" />
      <rect x="16" y="16" width="4" height="4" fill="#D1FAE5" />
      <rect x="22" y="16" width="4" height="4" fill="#D1FAE5" />
      <rect x="10" y="22" width="4" height="4" fill="#D1FAE5" />
      <rect x="16" y="22" width="4" height="4" fill="#D1FAE5" />
      <rect x="22" y="22" width="4" height="4" fill="#D1FAE5" />
      <rect x="36" y="12" width="20" height="28" rx="2" fill="#EF4444" />
      <text x="46" y="28" fontSize="6" fill="white" textAnchor="middle">PDF</text>
      <motion.path
        d="M28 26L32 22L36 26"
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

export const PDFToJPGIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="12" width="20" height="28" rx="2" fill="#EF4444" />
      <text x="18" y="28" fontSize="6" fill="white" textAnchor="middle">PDF</text>
      <rect x="36" y="12" width="20" height="28" rx="2" fill="#F59E0B" />
      <circle cx="42" cy="20" r="2" fill="#FDE68A" />
      <path d="M38 32L42 28L46 32L50 28L54 32V36H38V32Z" fill="#FDE68A" />
      <motion.path
        d="M28 26L32 22L36 26"
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

export const JPGToPDFIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="8" y="12" width="20" height="28" rx="2" fill="#F59E0B" />
      <circle cx="14" cy="20" r="2" fill="#FDE68A" />
      <path d="M10 32L14 28L18 32L22 28L26 32V36H10V32Z" fill="#FDE68A" />
      <rect x="36" y="12" width="20" height="28" rx="2" fill="#EF4444" />
      <text x="46" y="28" fontSize="6" fill="white" textAnchor="middle">PDF</text>
      <motion.path
        d="M28 26L32 22L36 26"
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

export const UnlockIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="20" y="28" width="24" height="20" rx="4" fill="#10B981" />
      <motion.path
        d="M28 28V20C28 16 30 14 34 14C38 14 40 16 40 20V24"
        stroke="#64748B"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="32" cy="38" r="3" fill="#D1FAE5"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const ProtectIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <motion.path
        d="M32 12L24 16V28C24 36 28 42 32 44C36 42 40 36 40 28V16L32 12Z"
        fill="#10B981"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M28 30L30 32L36 26"
        stroke="#D1FAE5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </motion.div>
);

export const RotateIcon: React.FC<AnimatedIconProps> = ({ className = "w-8 h-8", animate = true }) => (
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
      <rect x="20" y="16" width="24" height="32" rx="2" fill="#06B6D4" />
      <rect x="22" y="20" width="20" height="2" fill="#A5F3FC" />
      <rect x="22" y="24" width="16" height="2" fill="#A5F3FC" />
      <rect x="22" y="28" width="18" height="2" fill="#A5F3FC" />
      <motion.path
        d="M16 32C16 24 22 18 30 18M48 32C48 40 42 46 34 46"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <path d="M28 14L30 18L34 16Z" fill="#64748B" />
      <path d="M36 50L34 46L30 48Z" fill="#64748B" />
    </motion.svg>
  </motion.div>
);

// Export all icons in a map for easy access
export const AnimatedToolIcons = {
  Split: SplitIcon,
  Merge: MergeIcon,
  Compress: CompressIcon,
  PDFToWord: PDFToWordIcon,
  WordToPDF: WordToPDFIcon,
  PDFToExcel: PDFToExcelIcon,
  ExcelToPDF: ExcelToPDFIcon,
  PDFToJPG: PDFToJPGIcon,
  JPGToPDF: JPGToPDFIcon,
  Unlock: UnlockIcon,
  Protect: ProtectIcon,
  Rotate: RotateIcon,
};