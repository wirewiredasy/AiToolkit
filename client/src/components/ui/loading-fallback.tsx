import { Loader2 } from "lucide-react";

interface LoadingFallbackProps {
  title?: string;
  message?: string;
}

export function LoadingFallback({ 
  title = "Loading...", 
  message = "Please wait while we prepare your content" 
}: LoadingFallbackProps) {
  return (
    <div 
      className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-gray-900/50 rounded-lg border border-gray-800"
      role="status"
      aria-live="polite"
      aria-label={title}
    >
      <Loader2 className="w-8 h-8 text-teal-400 animate-spin mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-center text-sm max-w-md">{message}</p>
    </div>
  );
}

export function PageLoadingFallback() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-900"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-teal-400 animate-spin mb-4 mx-auto" />
        <h2 className="text-xl font-semibold text-white mb-2">Loading Suntyn AI</h2>
        <p className="text-gray-400">Preparing your AI-powered tools...</p>
      </div>
    </div>
  );
}