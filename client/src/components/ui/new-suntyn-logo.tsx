import { cn } from "@/lib/utils";

interface NewSuntynLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showText?: boolean;
}

export default function NewSuntynLogo({ 
  className, 
  size = "md", 
  animated = true, 
  showText = true 
}: NewSuntynLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl", 
    xl: "text-3xl"
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* New Suntyn Logo - Teal & Orange geometric design */}
      <div className={cn(
        "relative rounded-xl flex items-center justify-center",
        sizeClasses[size],
        animated && "hover:scale-105 transition-transform duration-300"
      )}>
        {/* Animated border ring */}
        {animated && (
          <div className={cn(
            "absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-30 animate-pulse"
          )} />
        )}
        
        {/* Main Logo Container */}
        <div className={cn(
          "relative rounded-xl overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg",
          sizeClasses[size]
        )}>
          {/* Left teal section */}
          <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-teal-400 to-teal-500"></div>
          
          {/* Right orange section */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-orange-400 to-amber-500"></div>
          
          {/* Central dividing element with curves */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* Curved separator */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 40 40" 
                fill="none"
              >
                <path 
                  d="M20 5 C25 5, 30 10, 30 20 C30 30, 25 35, 20 35 C15 35, 10 30, 10 20 C10 10, 15 5, 20 5 Z" 
                  fill="url(#curveGradient)"
                />
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            'font-bold text-white',
            textSizeClasses[size]
          )}>
            SUNTYN AI
          </h1>
          {size !== 'sm' && (
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
              Neural Intelligence
            </p>
          )}
        </div>
      )}
    </div>
  );
}