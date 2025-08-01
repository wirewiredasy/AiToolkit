import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, Loader2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProcessingState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  downloadUrl?: string;
  filename?: string;
  metadata?: {
    processingTime?: string;
    fileSize?: string;
  };
}

interface ErrorHandlerProps {
  state: ProcessingState;
  onReset: () => void;
  onDownload?: (url: string, filename: string) => void;
  className?: string;
}

export function ErrorHandler({ state, onReset, onDownload, className }: ErrorHandlerProps) {
  const [autoScrolled, setAutoScrolled] = useState(false);

  // Auto scroll to results when processing completes
  useEffect(() => {
    if ((state.isSuccess || state.isError) && !autoScrolled) {
      const element = document.getElementById('processing-results');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setAutoScrolled(true);
      }
    }
    
    // Reset auto scroll flag when new processing starts
    if (state.isLoading) {
      setAutoScrolled(false);
    }
  }, [state.isSuccess, state.isError, state.isLoading, autoScrolled]);

  if (!state.isLoading && !state.isSuccess && !state.isError) {
    return null;
  }

  return (
    <div id="processing-results" className={cn("mt-6 space-y-4", className)}>
      {/* Loading State */}
      {state.isLoading && (
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <div className="flex items-center gap-2">
              <span className="font-medium">Processing...</span>
              <span className="text-sm opacity-75">Please wait while we process your files</span>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Success State */}
      {state.isSuccess && !state.isLoading && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            <div className="space-y-3">
              <div>
                <div className="font-medium">Processing Completed Successfully!</div>
                <div className="text-sm opacity-75 mt-1">{state.message}</div>
              </div>
              
              {/* Metadata */}
              {state.metadata && (
                <div className="flex gap-4 text-xs text-green-700 dark:text-green-300">
                  {state.metadata.processingTime && (
                    <span>⏱️ {state.metadata.processingTime}</span>
                  )}
                  {state.metadata.fileSize && (
                    <span>📄 {state.metadata.fileSize}</span>
                  )}
                </div>
              )}
              
              {/* Download Button */}
              {state.downloadUrl && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => onDownload?.(state.downloadUrl!, state.filename || 'processed-file')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Result
                  </Button>
                  <Button
                    onClick={onReset}
                    variant="outline"
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300"
                  >
                    Process Another File
                  </Button>
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Error State */}
      {state.isError && !state.isLoading && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <div className="space-y-3">
              <div>
                <div className="font-medium">Processing Failed</div>
                <div className="text-sm opacity-75 mt-1">{state.message}</div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={onReset}
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// Custom hook for processing state management
export function useProcessingState() {
  const [state, setState] = useState<ProcessingState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
  });

  const reset = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: ''
    });
  };

  const setLoading = (message: string = 'Processing your request...') => {
    setState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      message
    });
  };

  const setSuccess = (message: string, downloadUrl?: string, filename?: string, metadata?: any) => {
    setState({
      isLoading: false,
      isSuccess: true,
      isError: false,
      message,
      downloadUrl,
      filename,
      metadata
    });
  };

  const setError = (message: string) => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: true,
      message
    });
  };

  return {
    state,
    setLoading,
    setSuccess,
    setError,
    reset
  };
}

// Input validation utilities
export const validateFile = (file: File | null, allowedTypes: string[] = ['.pdf']) => {
  if (!file) {
    return { isValid: false, error: 'Please upload a file first' };
  }

  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    return { 
      isValid: false, 
      error: `Invalid file type. Only ${allowedTypes.join(', ')} files are allowed` 
    };
  }

  // Check file size (50MB limit)
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'File size too large. Maximum size is 50MB' 
    };
  }

  return { isValid: true, error: null };
};

export const validatePageRange = (range: string): { isValid: boolean; error: string | null } => {
  if (!range || range.trim() === '') {
    return { isValid: false, error: 'Please enter a page range' };
  }

  if (range.toLowerCase() === 'all') {
    return { isValid: true, error: null };
  }

  // Regex for page ranges like "1-5, 7, 9-12"
  const rangeRegex = /^(\d+(-\d+)?)(,\s*\d+(-\d+)?)*$/;
  
  if (!rangeRegex.test(range.trim())) {
    return { 
      isValid: false, 
      error: 'Invalid page range format. Use format like "1-5, 7, 9-12" or "all"' 
    };
  }

  return { isValid: true, error: null };
};

export const validateMultipleFiles = (files: File[], minFiles: number = 2) => {
  if (files.length < minFiles) {
    return { 
      isValid: false, 
      error: `Please upload at least ${minFiles} files` 
    };
  }

  // Validate each file
  for (const file of files) {
    const validation = validateFile(file);
    if (!validation.isValid) {
      return validation;
    }
  }

  return { isValid: true, error: null };
};