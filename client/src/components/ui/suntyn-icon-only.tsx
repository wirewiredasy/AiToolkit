
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
      {/* Outer energy ring */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 opacity-20"
        animate={animated ? {
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Neural network rays */}
      {animated && [...Array(8)].map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const length = size === 'hero' ? 20 : size === 'xl' ? 16 : size === 'lg' ? 12 : 8;
        
        return (
          <motion.div
            key={`ray-${i}`}
            className="absolute bg-gradient-to-r from-orange-400 to-yellow-400 opacity-60"
            style={{
              width: '2px',
              height: `${length}px`,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              transformOrigin: `center ${length/2}px`
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        );
      })}
      
      {/* Central sun core with neural pattern */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 shadow-xl overflow-hidden">
        {/* Inner glow */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-orange-300 to-yellow-300 opacity-80" />
        
        {/* Neural network nodes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Center node */}
          <motion.div 
            className="absolute w-2 h-2 bg-white rounded-full shadow-lg z-10"
            animate={animated ? {
              boxShadow: [
                "0 0 0 0 rgba(255, 255, 255, 0.8)",
                "0 0 0 6px rgba(255, 255, 255, 0.2)",
                "0 0 0 0 rgba(255, 255, 255, 0)"
              ]
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          
          {/* Surrounding neural nodes */}
          {[...Array(6)].map((_, i) => {
            const nodeAngle = (i * 60) * (Math.PI / 180);
            const radius = size === 'hero' ? 12 : size === 'xl' ? 10 : size === 'lg' ? 8 : 6;
            const x = Math.cos(nodeAngle) * radius;
            const y = Math.sin(nodeAngle) * radius;
            
            return (
              <motion.div
                key={`node-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-90"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={animated ? {
                  opacity: [0.5, 1, 0.5],
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
          
          {/* Neural connections */}
          {animated && [...Array(6)].map((_, i) => (
            <motion.div
              key={`connection-${i}`}
              className="absolute w-px bg-white/40 origin-center"
              style={{
                height: '12px',
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
        
        {/* Energy particles */}
        {animated && [...Array(4)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-0.5 h-0.5 bg-yellow-200 rounded-full"
            style={{
              left: `${25 + (i * 15)}%`,
              top: `${35 + ((i % 2) * 30)}%`
            }}
            animate={{
              y: [-1, 1, -1],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8]
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

      {/* Floating intelligence orbs */}
      {animated && [...Array(3)].map((_, i) => {
        const orbitRadius = size === 'hero' ? 45 : size === 'xl' ? 35 : size === 'lg' ? 28 : 22;
        
        return (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full opacity-70"
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
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.7
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
  );
}

export default SuntynIconOnly;
