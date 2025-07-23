import { cn } from "@/lib/utils";

interface SIconLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showText?: boolean;
}

export default function SIconLogo({ 
  className, 
  size = "md", 
  animated = true, 
  showText = true 
}: SIconLogoProps) {
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

  const iconTextSize = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl"
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* S Icon Logo */}
      <div className={cn(
        "relative rounded-lg bg-gradient-to-br from-teal-500 to-orange-400 flex items-center justify-center shadow-lg",
        sizeClasses[size],
        animated && "hover:scale-105 transition-transform duration-300"
      )}>
        {/* Animated border ring */}
        {animated && (
          <div className={cn(
            "absolute -inset-1 rounded-lg bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-30 animate-pulse"
          )} />
        )}
        
        {/* S Letter */}
        <span className={cn(
          "relative font-bold text-white z-10",
          iconTextSize[size]
        )}>
          S
        </span>
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