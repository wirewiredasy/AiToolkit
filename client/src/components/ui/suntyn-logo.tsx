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
      {/* Animated Sun Logo */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer rotating ring */}
        <div className={cn(
          "absolute inset-0 rounded-full border-2 border-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-30",
          animated && "animate-spin"
        )} style={{ animationDuration: "8s" }} />
        
        {/* Neural network dots */}
        <div className="absolute inset-0">
          <div className={cn(
            "absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full",
            "top-1 left-1/2 transform -translate-x-1/2",
            animated && "animate-pulse"
          )} />
          <div className={cn(
            "absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full",
            "right-1 top-1/2 transform -translate-y-1/2",
            animated && "animate-pulse"
          )} style={{ animationDelay: "0.5s" }} />
          <div className={cn(
            "absolute w-1.5 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full",
            "bottom-1 left-1/2 transform -translate-x-1/2",
            animated && "animate-pulse"
          )} style={{ animationDelay: "1s" }} />
          <div className={cn(
            "absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full",
            "left-1 top-1/2 transform -translate-y-1/2",
            animated && "animate-pulse"
          )} style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Central sun core */}
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500",
          "shadow-lg",
          animated && "animate-pulse"
        )} style={{ animationDuration: "2s" }}>
          {/* Inner glow */}
          <div className="absolute inset-1 rounded-full bg-white/20" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
        </div>

        {/* AI particles */}
        {animated && (
          <>
            <div 
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"
              style={{ 
                top: "20%", 
                right: "25%",
                animationDuration: "3s",
                animationDelay: "0s"
              }} 
            />
            <div 
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-ping"
              style={{ 
                bottom: "20%", 
                left: "25%",
                animationDuration: "3s",
                animationDelay: "1s"
              }} 
            />
            <div 
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-ping"
              style={{ 
                top: "25%", 
                left: "20%",
                animationDuration: "3s",
                animationDelay: "2s"
              }} 
            />
          </>
        )}
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent gradient-text",
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