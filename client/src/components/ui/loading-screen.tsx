import { useEffect, useState } from "react";
import GeometricLogo from "./geometric-logo";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  minLoadTime?: number;
}

export function LoadingScreen({ onLoadingComplete, minLoadTime = 300 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading Suntyn AI...");

  const loadingMessages = [
    "Loading Suntyn AI...",
    "Initializing neural networks...",
    "Connecting to AI services...", 
    "Preparing your workspace...",
    "Almost ready..."
  ];

  useEffect(() => {
    const startTime = Date.now();
    let currentMessageIndex = 0;

    // Progress animation - faster loading
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          const elapsed = Date.now() - startTime;
          if (elapsed >= minLoadTime) {
            clearInterval(progressInterval);
            setTimeout(() => onLoadingComplete?.(), 200);
          }
          return 100;
        }
        return prev + Math.random() * 15 + 8; // Much faster progress
      });
    }, 30); // More frequent updates

    // Loading text animation - faster
    const textInterval = setInterval(() => {
      currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[currentMessageIndex]);
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete, minLoadTime]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Simple particles for performance */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-teal-400/20 rounded-full"
          style={{
            left: `${20 + (i * 30)}%`,
            top: `${30 + (i * 20)}%`,
          }}
        />
      ))}

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {/* Animated Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 w-32 h-32 border-4 border-teal-500/20 rounded-full animate-spin" />
            <div className="absolute inset-2 w-28 h-28 border-2 border-orange-400/30 rounded-full animate-spin" 
                 style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
            
            {/* Logo container with pulsing effect */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="animate-pulse">
                <GeometricLogo size={80} />
              </div>
            </div>

            {/* AI neural network effect - reduced for performance */}
            <div className="absolute inset-0 w-32 h-32 rounded-full">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-60"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 90}deg) translateY(-60px)`,
                    animation: `neuralPulse 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.25}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {loadingText}
          </h2>
          <div className="flex justify-center items-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-teal-400 to-orange-400 h-full rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Progress bar glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-orange-400 opacity-50 blur-sm" />
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {Math.round(Math.min(progress, 100))}% Complete
          </div>
        </div>

        {/* AI branding */}
        <div className="mt-8 text-gray-500 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span>Neural Intelligence Platform</span>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
          
          @keyframes neuralPulse {
            0%, 100% { opacity: 0.6; transform: rotate(var(--rotation)) translateY(-60px) scale(1); }
            50% { opacity: 1; transform: rotate(var(--rotation)) translateY(-60px) scale(1.5); }
          }
        `
      }} />
    </div>
  );
}

// Hook for managing loading state
export function useAppLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      // Check if DOM is ready
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(void 0);
        } else {
          window.addEventListener('load', () => resolve(void 0));
        }
      });

      // Reduced initialization time for faster loading
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setIsReady(true);
    };

    initializeApp();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return { isLoading, isReady, handleLoadingComplete };
}