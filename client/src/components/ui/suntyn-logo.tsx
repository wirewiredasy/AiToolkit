
import { cn } from "@/lib/utils";

interface SuntynLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showText?: boolean;
}

export function SuntynLogo({ 
  className, 
  size = "md", 
  animated = true, 
  showText = true 
}: SuntynLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl", 
    xl: "text-4xl"
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* 3D Glass Logo with Advanced Effects */}
      <div className={cn("relative group", sizeClasses[size])}>
        {/* Outer Glass Ring with 3D Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-blue-100/20 to-purple-100/10 backdrop-blur-xl border border-white/20 shadow-2xl" 
             style={{
               background: `linear-gradient(145deg, 
                 rgba(255,255,255,0.4) 0%, 
                 rgba(147,197,253,0.3) 25%, 
                 rgba(196,181,253,0.2) 75%, 
                 rgba(255,255,255,0.1) 100%)`,
               boxShadow: `
                 0 8px 32px rgba(59, 130, 246, 0.3),
                 0 0 0 1px rgba(255, 255, 255, 0.2),
                 inset 0 1px 0 rgba(255, 255, 255, 0.4),
                 inset 0 -1px 0 rgba(0, 0, 0, 0.1)
               `
             }} />
        
        {/* Inner Glow Ring */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-sm" />
        
        {/* 8 Floating Orbs with 3D Glass Effect */}
        <div className="absolute inset-0">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
            const delay = index * 0.25;
            const x = Math.cos((angle * Math.PI) / 180) * 20;
            const y = Math.sin((angle * Math.PI) / 180) * 20;
            
            return (
              <div
                key={angle}
                className={cn(
                  "absolute w-3 h-3 rounded-full transform-gpu",
                  animated && "animate-pulse group-hover:animate-bounce"
                )}
                style={{
                  left: `calc(50% + ${x}px - 6px)`,
                  top: `calc(50% + ${y}px - 6px)`,
                  background: `linear-gradient(145deg, 
                    rgba(147, 51, 234, 0.9) 0%, 
                    rgba(59, 130, 246, 0.7) 50%, 
                    rgba(147, 51, 234, 0.9) 100%)`,
                  boxShadow: `
                    0 4px 12px rgba(147, 51, 234, 0.4),
                    0 0 0 1px rgba(255, 255, 255, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.6),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                  `,
                  animationDelay: `${delay}s`,
                  transform: `translateZ(0) scale(${1 + Math.sin(Date.now() * 0.002 + delay) * 0.1})`
                }}
              />
            );
          })}
        </div>

        {/* Central 3D Glass Core */}
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-6 h-6 rounded-full group-hover:scale-110 transition-all duration-500",
          animated && "animate-pulse"
        )} 
        style={{
          background: `radial-gradient(circle at 30% 30%, 
            rgba(59, 130, 246, 1) 0%, 
            rgba(37, 99, 235, 0.9) 40%, 
            rgba(29, 78, 216, 0.8) 100%)`,
          boxShadow: `
            0 8px 25px rgba(59, 130, 246, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.6),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            inset 2px 2px 4px rgba(255, 255, 255, 0.3)
          `,
          animationDuration: "3s"
        }} />

        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 rounded-full" 
             style={{
               background: `linear-gradient(135deg, 
                 rgba(255, 255, 255, 0.6) 0%, 
                 transparent 30%, 
                 transparent 70%, 
                 rgba(255, 255, 255, 0.2) 100%)`,
               pointerEvents: 'none'
             }} />
      </div>

      {/* Enhanced Brand Text with Glass Effect */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-bold relative",
            textSizeClasses[size]
          )}
          style={{
            background: `linear-gradient(145deg, 
              rgba(59, 130, 246, 1) 0%, 
              rgba(147, 51, 234, 0.9) 50%, 
              rgba(59, 130, 246, 1) 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'
          }}>
            Suntyn AI
          </h1>
          {size !== "sm" && (
            <p className="text-xs uppercase tracking-wider font-medium"
               style={{
                 background: `linear-gradient(90deg, 
                   rgba(107, 114, 128, 0.8) 0%, 
                   rgba(156, 163, 175, 0.6) 100%)`,
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text'
               }}>
              Neural Intelligence
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SuntynLogo;
