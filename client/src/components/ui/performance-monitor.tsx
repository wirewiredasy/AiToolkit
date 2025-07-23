import { useEffect, useState } from 'react';
import { Activity, Wifi, WifiOff } from 'lucide-react';

interface PerformanceStats {
  loadTime: number;
  connectionSpeed: 'fast' | 'slow' | 'offline';
  renderTime: number;
}

export default function PerformanceMonitor() {
  const [stats, setStats] = useState<PerformanceStats>({
    loadTime: 0,
    connectionSpeed: 'fast',
    renderTime: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    
    // Monitor page load performance
    window.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      setStats(prev => ({ ...prev, loadTime }));
    });

    // Monitor connection speed
    const connection = (navigator as any).connection;
    if (connection) {
      const updateConnectionSpeed = () => {
        const effectiveType = connection.effectiveType;
        let speed: 'fast' | 'slow' | 'offline' = 'fast';
        
        if (!navigator.onLine) {
          speed = 'offline';
        } else if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          speed = 'slow';
        }
        
        setStats(prev => ({ ...prev, connectionSpeed: speed }));
      };

      connection.addEventListener('change', updateConnectionSpeed);
      updateConnectionSpeed();
    }

    // Monitor render performance
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const renderTime = entries.reduce((total, entry) => total + entry.duration, 0);
      setStats(prev => ({ ...prev, renderTime }));
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });

    // Show performance monitor in development
    if (import.meta.env.DEV) {
      setIsVisible(true);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-3 h-3" />
        <span>Performance</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span>Load:</span>
          <span className={stats.loadTime > 3000 ? 'text-red-400' : 'text-green-400'}>
            {stats.loadTime.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between gap-4">
          <span>Connection:</span>
          <div className="flex items-center gap-1">
            {stats.connectionSpeed === 'offline' ? (
              <WifiOff className="w-3 h-3 text-red-400" />
            ) : (
              <Wifi className={`w-3 h-3 ${stats.connectionSpeed === 'slow' ? 'text-yellow-400' : 'text-green-400'}`} />
            )}
            <span className={
              stats.connectionSpeed === 'offline' ? 'text-red-400' :
              stats.connectionSpeed === 'slow' ? 'text-yellow-400' : 'text-green-400'
            }>
              {stats.connectionSpeed}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between gap-4">
          <span>Render:</span>
          <span className={stats.renderTime > 16 ? 'text-yellow-400' : 'text-green-400'}>
            {stats.renderTime.toFixed(1)}ms
          </span>
        </div>
      </div>
    </div>
  );
}