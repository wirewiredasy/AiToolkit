
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SuntynIconOnlyProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  animated?: boolean;
}

export function SuntynIconOnly({ 
  className, 
  size = "md", 
  animated = true 
}: SuntynIconOnlyProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    hero: "w-32 h-32"
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer glow ring */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 via-yellow-400/30 to-pink-400/30 blur-sm"
        animate={animated ? {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Geometric neural rays - 12 rays like in the reference */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180);
        const rayLength = size === 'hero' ? 24 : size === 'xl' ? 20 : size === 'lg' ? 16 : size === 'md' ? 12 : 10;
        const nodeDistance = rayLength * 0.7;
        
        return (
          <div key={`ray-${i}`}>
            {/* Main ray line */}
            <motion.div
              className="absolute bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400 opacity-80"
              style={{
                width: '1.5px',
                height: `${rayLength}px`,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                transformOrigin: `center ${rayLength/2}px`
              }}
              animate={animated ? {
                opacity: [0.6, 1, 0.6],
                scaleY: [0.8, 1, 0.8]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
            
            {/* Geometric node at ray tip */}
            <motion.div
              className="absolute w-2 h-2 border border-yellow-300 bg-gradient-to-br from-orange-300 to-yellow-400"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * nodeDistance}px, ${Math.sin(angle) * nodeDistance}px) rotate(45deg)`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
              animate={animated ? {
                scale: [0.8, 1.2, 0.8],
                rotate: [45, 90, 45],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          </div>
        );
      })}
      
      {/* Central sun core with gradient */}
      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-orange-400 via-yellow-400 via-yellow-300 to-pink-400 shadow-2xl overflow-hidden">
        {/* Inner radial gradient */}
        <div className="absolute inset-1 rounded-full bg-gradient-radial from-yellow-200 via-orange-300 to-pink-300 opacity-90" />
        
        {/* Neural network center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Central processing node */}
          <motion.div 
            className="absolute w-3 h-3 bg-white rounded-full shadow-lg z-20 border-2 border-yellow-200"
            animate={animated ? {
              boxShadow: [
                "0 0 0 0 rgba(255, 255, 255, 0.8)",
                "0 0 0 8px rgba(255, 255, 255, 0.1)",
                "0 0 0 0 rgba(255, 255, 255, 0)"
              ]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          
          {/* Inner neural ring - 6 nodes */}
          {[...Array(6)].map((_, i) => {
            const nodeAngle = (i * 60) * (Math.PI / 180);
            const radius = size === 'hero' ? 8 : size === 'xl' ? 7 : size === 'lg' ? 6 : 5;
            const x = Math.cos(nodeAngle) * radius;
            const y = Math.sin(nodeAngle) * radius;
            
            return (
              <motion.div
                key={`inner-node-${i}`}
                className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-90 border border-yellow-200"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={animated ? {
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1.3, 0.8]
                } : {}}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          {/* Neural connections */}
          {animated && [...Array(6)].map((_, i) => (
            <motion.div
              key={`connection-${i}`}
              className="absolute w-px bg-white/50 origin-center"
              style={{
                height: '10px',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg)`
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scaleY: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Floating energy particles */}
        {animated && [...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-yellow-100 rounded-full opacity-80"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${25 + ((i % 3) * 20)}%`
            }}
            animate={{
              x: [-2, 2, -2],
              y: [-1, 1, -1],
              opacity: [0.4, 1, 0.4],
              scale: [0.6, 1.2, 0.6]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Orbiting intelligence indicators */}
      {animated && [...Array(3)].map((_, i) => {
        const orbitRadius = size === 'hero' ? 50 : size === 'xl' ? 40 : size === 'lg' ? 32 : 26;
        
        return (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-sm opacity-70 shadow-lg"
            style={{
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              x: [
                Math.cos((i * 120) * (Math.PI / 180)) * orbitRadius,
                Math.cos((i * 120 + 120) * (Math.PI / 180)) * orbitRadius,
                Math.cos((i * 120 + 240) * (Math.PI / 180)) * orbitRadius,
                Math.cos((i * 120) * (Math.PI / 180)) * orbitRadius
              ],
              y: [
                Math.sin((i * 120) * (Math.PI / 180)) * orbitRadius,
                Math.sin((i * 120 + 120) * (Math.PI / 180)) * orbitRadius,
                Math.sin((i * 120 + 240) * (Math.PI / 180)) * orbitRadius,
                Math.sin((i * 120) * (Math.PI / 180)) * orbitRadius
              ],
              rotate: [0, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.2
            }}
          />
        );
      })}
    </div>
  );
}

export default SuntynIconOnly;
