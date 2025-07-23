
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
      {/* 3D Animated Sun Logo */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer rotating ring with 3D effect */}
        <div className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500",
          "opacity-20 blur-sm",
          animated && "animate-spin"
        )} style={{ animationDuration: "12s" }} />
        
        {/* 9 Main Rays */}
        <div className="absolute inset-0">
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((rotation, index) => (
            <div
              key={index}
              className={cn(
                "absolute w-1 h-4 bg-gradient-to-t from-yellow-400 to-yellow-200",
                "top-0 left-1/2 origin-bottom transform -translate-x-1/2",
                "shadow-lg",
                animated && "animate-pulse"
              )}
              style={{ 
                transform: `translateX(-50%) rotate(${rotation}deg)`,
                animationDelay: `${index * 0.2}s`,
                animationDuration: "3s"
              }}
            />
          ))}
        </div>

        {/* Neural Network Connections */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 48 48">
            <defs>
              <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Connection Lines */}
            <path d="M24 12 Q32 18 36 24" stroke="url(#neuralGrad)" strokeWidth="0.8" fill="none" opacity="0.7"/>
            <path d="M36 24 Q32 30 24 36" stroke="url(#neuralGrad)" strokeWidth="0.8" fill="none" opacity="0.7"/>
            <path d="M24 36 Q16 30 12 24" stroke="url(#neuralGrad)" strokeWidth="0.8" fill="none" opacity="0.7"/>
            <path d="M12 24 Q16 18 24 12" stroke="url(#neuralGrad)" strokeWidth="0.8" fill="none" opacity="0.7"/>
          </svg>
        </div>

        {/* Neural network nodes */}
        <div className="absolute inset-0">
          <div className={cn(
            "absolute w-2 h-2 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full",
            "top-1 left-1/2 transform -translate-x-1/2 shadow-md",
            animated && "animate-pulse"
          )} style={{ animationDelay: "0s" }} />
          <div className={cn(
            "absolute w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full",
            "right-1 top-1/2 transform -translate-y-1/2 shadow-md",
            animated && "animate-pulse"
          )} style={{ animationDelay: "0.7s" }} />
          <div className={cn(
            "absolute w-2 h-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full",
            "bottom-1 left-1/2 transform -translate-x-1/2 shadow-md",
            animated && "animate-pulse"
          )} style={{ animationDelay: "1.4s" }} />
          <div className={cn(
            "absolute w-2 h-2 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full",
            "left-1 top-1/2 transform -translate-y-1/2 shadow-md",
            animated && "animate-pulse"
          )} style={{ animationDelay: "2.1s" }} />
        </div>

        {/* Central 3D sun core */}
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-8 h-8 rounded-full",
          "bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600",
          "shadow-2xl border-2 border-yellow-200",
          animated && "animate-pulse"
        )} style={{ animationDuration: "2s" }}>
          {/* 3D Inner layers */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-80" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 opacity-90" />
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-yellow-200 to-amber-400" />
        </div>

        {/* AI particles with complex animation */}
        {animated && (
          <>
            <div 
              className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-80 animate-ping shadow-lg"
              style={{ 
                top: "15%", 
                right: "20%",
                animationDuration: "4s",
                animationDelay: "0s"
              }} 
            />
            <div 
              className="absolute w-1 h-1 bg-amber-500 rounded-full opacity-70 animate-ping shadow-md"
              style={{ 
                bottom: "15%", 
                left: "20%",
                animationDuration: "3.5s",
                animationDelay: "1s"
              }} 
            />
            <div 
              className="absolute w-1.2 h-1.2 bg-yellow-300 rounded-full opacity-75 animate-ping shadow-lg"
              style={{ 
                top: "20%", 
                left: "15%",
                animationDuration: "4.5s",
                animationDelay: "2s"
              }} 
            />
            <div 
              className="absolute w-0.8 h-0.8 bg-orange-400 rounded-full opacity-60 animate-ping shadow-sm"
              style={{ 
                bottom: "20%", 
                right: "15%",
                animationDuration: "3s",
                animationDelay: "2.5s"
              }} 
            />
          </>
        )}
      </div>

      {/* Enhanced Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent",
            "drop-shadow-sm",
            textSizeClasses[size]
          )}>
            Suntyn AI
          </h1>
          {size !== "sm" && (
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              Neural Intelligence
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SuntynLogo;
