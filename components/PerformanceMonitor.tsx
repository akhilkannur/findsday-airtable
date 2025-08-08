'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const measurePerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintEntries = performance.getEntriesByType('paint');
        
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        const lcp = performance.getEntriesByType('largest-contentful-paint')[0];
        const cls = performance.getEntriesByType('layout-shift')[0];

        const pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const firstContentfulPaint = fcp ? fcp.startTime : 0;
        const largestContentfulPaint = lcp ? lcp.startTime : 0;
        const cumulativeLayoutShift = cls ? (cls as any).value : 0;

        setMetrics({
          pageLoadTime,
          firstContentfulPaint,
          largestContentfulPaint,
          cumulativeLayoutShift,
        });
      }
    };

    // Measure after a short delay to ensure all content is loaded
    const timer = setTimeout(measurePerformance, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show performance monitor in development
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible || !metrics) return null;

  const getPerformanceColor = (value: number, threshold: number) => {
    if (value <= threshold * 0.7) return 'text-green-500';
    if (value <= threshold) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-charcoal-dark border border-gray-700 rounded-lg p-4 text-xs text-white z-50 max-w-xs">
      <h3 className="font-bold mb-2 text-accent-green">Performance Monitor</h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Page Load:</span>
          <span className={getPerformanceColor(metrics.pageLoadTime, 3000)}>
            {metrics.pageLoadTime.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getPerformanceColor(metrics.firstContentfulPaint, 1800)}>
            {metrics.firstContentfulPaint.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getPerformanceColor(metrics.largestContentfulPaint, 2500)}>
            {metrics.largestContentfulPaint.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getPerformanceColor(metrics.cumulativeLayoutShift, 0.1)}>
            {metrics.cumulativeLayoutShift.toFixed(3)}
          </span>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 text-gray-400 hover:text-white"
      >
        ×
      </button>
    </div>
  );
} 