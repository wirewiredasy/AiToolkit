
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SuntynAnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  animated?: boolean;
  showText?: boolean;
}

export function SuntynAnimatedLogo({ 
  className, 
  size = "md", 
  animated = true, 
  showText = true 
}: SuntynAnimatedLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    hero: "w-32 h-32"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl", 
    xl: "text-4xl",
    hero: "text-5xl"
  };

  return (
    <div className={cn("flex items-center space-x-4", className)}>
      {/* Animated AI Brain Logo */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer pulsing ring */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-20"
          animate={animated ? {
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Middle rotating ring */}
        <motion.div 
          className="absolute inset-1 rounded-full border-2 border-gradient-to-r from-purple-400 to-blue-400 opacity-60"
          animate={animated ? { rotate: 360 } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner brain structure */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 shadow-lg overflow-hidden">
          {/* Neural network pattern */}
          <div className="absolute inset-0">
            {/* Central core */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
              animate={animated ? {
                boxShadow: [
                  "0 0 0 0 rgba(255, 255, 255, 0.7)",
                  "0 0 0 10px rgba(255, 255, 255, 0)",
                  "0 0 0 0 rgba(255, 255, 255, 0)"
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            {/* Neural connections */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const x = Math.cos(angle) * 8;
              const y = Math.sin(angle) * 8;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white/80 rounded-full"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={animated ? {
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
            
            {/* Connection lines */}
            {animated && [...Array(6)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute w-px bg-gradient-to-r from-transparent via-white/40 to-transparent origin-center"
                style={{
                  height: '16px',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg)`
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scaleY: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* AI processing particles */}
          {animated && [...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + ((i % 3) * 20)}%`
              }}
              animate={{
                y: [-2, 2, -2],
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Floating orbs around logo */}
        {animated && [...Array(4)].map((_, i) => {
          const orbitRadius = size === 'hero' ? 50 : size === 'xl' ? 40 : 30;
          
          return (
            <motion.div
              key={`orb-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
              animate={{
                x: [
                  Math.cos((i * 90) * (Math.PI / 180)) * orbitRadius,
                  Math.cos((i * 90 + 90) * (Math.PI / 180)) * orbitRadius,
                  Math.cos((i * 90 + 180) * (Math.PI / 180)) * orbitRadius,
                  Math.cos((i * 90 + 270) * (Math.PI / 180)) * orbitRadius,
                  Math.cos((i * 90) * (Math.PI / 180)) * orbitRadius
                ],
                y: [
                  Math.sin((i * 90) * (Math.PI / 180)) * orbitRadius,
                  Math.sin((i * 90 + 90) * (Math.PI / 180)) * orbitRadius,
                  Math.sin((i * 90 + 180) * (Math.PI / 180)) * orbitRadius,
                  Math.sin((i * 90 + 270) * (Math.PI / 180)) * orbitRadius,
                  Math.sin((i * 90) * (Math.PI / 180)) * orbitRadius
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </div>

      {/* Brand Text */}
      {showText && (
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className={cn(
              "font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent",
              textSizeClasses[size]
            )}
            animate={animated ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            Suntyn AI
          </motion.h1>
          {size !== "sm" && (
            <motion.p 
              className="text-xs text-gray-500 uppercase tracking-wider font-medium"
              animate={animated ? {
                color: ["#6B7280", "#8B5CF6", "#06B6D4", "#6B7280"]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Neural Intelligence
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default SuntynAnimatedLogo;
