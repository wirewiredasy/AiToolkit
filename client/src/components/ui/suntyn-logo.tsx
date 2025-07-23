
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
      {/* Sun Logo - Exact match to attached image */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer circle border */}
        <div className="absolute inset-0 rounded-full border-2 border-purple-300 opacity-60" />
        
        {/* 8 Purple dots positioned around the circle */}
        <div className="absolute inset-0">
          {/* Top */}
          <div className={cn(
            "absolute w-2 h-2 bg-purple-500 rounded-full",
            "top-0 left-1/2 transform -translate-x-1/2",
            animated && "animate-pulse"
          )} style={{ animationDelay: "0s" }} />
          
          {/* Top Right */}
          <div className={cn(
            "absolute w-2 h-2 bg-purple-500 rounded-full",
            "top-1 right-1",
            animated && "animate-pulse"
          )} style={{ animationDelay: "0.25s" }} />
          
          {/* Right */}
          <div className={cn(
            "absolute w-2 h-2 bg-purple-500 rounded-full",
            "right-0 top-1/2 transform -translate-y-1/2",
            animated && "animate-pulse"
          )} style={{ animationDelay: "0.5s" }} />
          
          {/* Bottom Right */}
          <div className={cn(
            "absolute w-2 h-2 bg-purple-500 rounded-full",
            "bottom-1 right-1",
            animated && "animate-pulse"
          )} style={{ animationDelay: "0.75s" }} />
          
          {/* Bottom */}
          <div className={cn(
            "absolute w-2 h-2 bg-purple-500 rounded-full",
            "bottom-0 left-1/2 transform -translate-x-1/2",
            animated && "animate-pulse"
          )} style={{ animationDelay: "1s" }} />
          
          {/* Bottom Left */}
          <div className={cn(
            "absolute w-2 h-2 bg-purple-500 rounded-full",
            "bottom-1 left-1",
            animated && "animate-pulse"
          )} style={{ animationDelay: "1.25s" }} />
          
          {/* Left */}
          <div className={cn(
            "absolute w-2 h-2 bg-purple-500 rounded-full",
            "left-0 top-1/2 transform -translate-y-1/2",
            animated && "animate-pulse"
          )} style={{ animationDelay: "1.5s" }} />
          
          {/* Top Left */}
          <div className={cn(
            "absolute w-2 h-2 bg-purple-500 rounded-full",
            "top-1 left-1",
            animated && "animate-pulse"
          )} style={{ animationDelay: "1.75s" }} />
        </div>

        {/* Central blue circle - exact match */}
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-6 h-6 rounded-full bg-blue-500",
          "shadow-lg",
          animated && "animate-pulse"
        )} style={{ animationDuration: "2s" }} />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 bg-clip-text text-transparent",
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
