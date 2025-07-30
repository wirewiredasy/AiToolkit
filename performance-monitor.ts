
interface PerformanceMetrics {
  toolId: string;
  processingTime: number;
  fileSize: number;
  userId?: string;
  timestamp: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];

  startTracking(toolId: string): string {
    const trackingId = `${toolId}-${Date.now()}`;
    performance.mark(`${trackingId}-start`);
    return trackingId;
  }

  endTracking(trackingId: string, fileSize: number = 0, userId?: string) {
    performance.mark(`${trackingId}-end`);
    
    const measure = performance.measure(
      `${trackingId}-duration`,
      `${trackingId}-start`,
      `${trackingId}-end`
    );

    const metric: PerformanceMetrics = {
      toolId: trackingId.split('-')[0],
      processingTime: measure.duration,
      fileSize,
      userId,
      timestamp: new Date().toISOString()
    };

    this.metrics.push(metric);
    this.logPerformance(metric);
  }

  private logPerformance(metric: PerformanceMetrics) {
    const status = metric.processingTime < 1000 ? '🚀 FAST' : 
                  metric.processingTime < 3000 ? '⚡ GOOD' : '🐌 SLOW';
    
    console.log(`${status} ${metric.toolId}: ${metric.processingTime.toFixed(0)}ms`);
  }

  getAverageProcessingTime(toolId?: string): number {
    const filtered = toolId ? 
      this.metrics.filter(m => m.toolId === toolId) : 
      this.metrics;
    
    if (filtered.length === 0) return 0;
    
    const total = filtered.reduce((sum, m) => sum + m.processingTime, 0);
    return total / filtered.length;
  }

  getSlowTools(): string[] {
    const averages = new Map<string, number>();
    
    this.metrics.forEach(m => {
      if (!averages.has(m.toolId)) {
        averages.set(m.toolId, this.getAverageProcessingTime(m.toolId));
      }
    });

    return Array.from(averages.entries())
      .filter(([_, avg]) => avg > 2000)
      .map(([toolId, _]) => toolId);
  }
}

export const performanceMonitor = new PerformanceMonitor();
