import React, { Suspense, lazy, memo } from 'react';
import { FastLoading } from '@/components/ui/fast-loading';

// ⚡ FAST LAZY LOADING - Optimized lazy loading with preloading
export const createFastLazyComponent = (importFn: () => Promise<any>) => {
  const Component = lazy(importFn);
  
  // Preload the component for faster loading
  const preload = () => {
    importFn();
  };
  
  const FastComponent = memo((props: any) => (
    <Suspense fallback={<FastLoading text="Loading tool..." showProgress={true} />}>
      <Component {...props} />
    </Suspense>
  ));
  
  FastComponent.preload = preload;
  return FastComponent;
};

// ⚡ OPTIMIZED Tool Page Lazy Loading
export const FastPDFMerger = createFastLazyComponent(() => import('./tool/pdf-merger'));
export const FastBackgroundRemover = createFastLazyComponent(() => import('./tool/bg-remover'));
export const FastImageResizer = createFastLazyComponent(() => import('./tool/image-resizer'));
export const FastAudioConverter = createFastLazyComponent(() => import('./tool/audio-converter'));
export const FastVideoTrimmer = createFastLazyComponent(() => import('./tool/video-trimmer'));
export const FastQRGenerator = createFastLazyComponent(() => import('./tool/qr-generator'));
export const FastJSONFormatter = createFastLazyComponent(() => import('./tool/json-formatter'));

// ⚡ Preloader for popular tools - loads them in background
export const preloadPopularTools = () => {
  // Preload the most used tools in background
  setTimeout(() => {
    FastPDFMerger.preload();
    FastBackgroundRemover.preload();
    FastImageResizer.preload();
  }, 1000); // Load after 1 second
  
  setTimeout(() => {
    FastAudioConverter.preload();
    FastVideoTrimmer.preload();
    FastQRGenerator.preload();
    FastJSONFormatter.preload();
  }, 2000); // Load after 2 seconds
};

// ⚡ Fast Loading Wrapper Component
export const FastToolWrapper: React.FC<{
  children: React.ReactNode;
  toolName: string;
}> = ({ children, toolName }) => {
  return (
    <div className="fast-tool-wrapper">
      <Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <FastLoading 
                text={`Loading ${toolName}...`} 
                showProgress={true} 
              />
              <p className="mt-4 text-sm text-gray-500">
                ⚡ Optimized for fast loading
              </p>
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};