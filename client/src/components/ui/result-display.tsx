import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Progress } from "./progress";
import { Download, CheckCircle, AlertTriangle, Clock, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProcessingResult {
  success: boolean;
  message: string;
  downloadUrl?: string;
  filename?: string;
  processingTime?: number;
  toolId?: string;
  metadata?: any;
  error?: string;
}

interface ResultDisplayProps {
  result: ProcessingResult;
  isProcessing: boolean;
  uploadProgress: number;
  onNewProcess?: () => void;
  toolName: string;
}

export function ResultDisplay({ 
  result, 
  isProcessing, 
  uploadProgress, 
  onNewProcess, 
  toolName 
}: ResultDisplayProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  // Determine if processing was actually successful
  const isActuallySuccessful = result?.success !== false && (result?.downloadUrl || result?.message?.includes('success'));

  const downloadFile = async (retryCount: number = 0) => {
    if (!result.downloadUrl) return;

    setIsDownloading(true);
    try {
      console.log('Starting download from:', result.downloadUrl);

      // Enhanced timeout and abort controller with user-friendly messaging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        toast({
          title: "Download Timeout",
          description: "Download is taking longer than expected. Please try again.",
          variant: "destructive",
        });
      }, 30000); // 30 second timeout

      // Enhanced headers for better compatibility
      const response = await fetch(result.downloadUrl, {
        signal: controller.signal,
        headers: {
          'Accept': '*/*',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      clearTimeout(timeoutId);

      console.log('Download response status:', response.status);
      console.log('Download response headers:');
      response.headers.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      if (!response.ok) {
        // Enhanced retry logic with exponential backoff
        if (response.status === 404 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
          setTimeout(() => downloadFile(retryCount + 1), delay);
          toast({
            title: "File Not Ready",
            description: `Retrying download in ${delay/1000} seconds... (Attempt ${retryCount + 1}/3)`,
          });
          return;
        }
        
        // Handle specific error codes
        if (response.status === 413) {
          throw new Error('File too large for download');
        } else if (response.status >= 500) {
          throw new Error('Server error - please try again later');
        } else if (response.status === 429) {
          throw new Error('Too many requests - please wait a moment');
        }
        
        throw new Error(`Download failed with status: ${response.status} - ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log('Downloaded blob:', {
        size: blob.size,
        type: blob.type
      });

      // Verify the blob contains binary data
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const first20Bytes = Array.from(uint8Array.slice(0, 20))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ');

      console.log('First 20 bytes (hex):', first20Bytes);

      // Check if it's actual binary data or text
      const textDecoder = new TextDecoder();
      const firstText = textDecoder.decode(uint8Array.slice(0, 100));
      console.log('First 100 chars as text:', firstText);

      // Verify file type
      let isValidFile = false;
      if (result.filename?.endsWith('.pdf')) {
        isValidFile = firstText.startsWith('%PDF');
      } else if (result.filename?.endsWith('.png')) {
        isValidFile = uint8Array[0] === 0x89 && uint8Array[1] === 0x50 && uint8Array[2] === 0x4E && uint8Array[3] === 0x47;
      } else if (result.filename?.endsWith('.jpg') || result.filename?.endsWith('.jpeg')) {
        isValidFile = uint8Array[0] === 0xFF && uint8Array[1] === 0xD8 && uint8Array[2] === 0xFF;
      } else if (result.filename?.endsWith('.mp3')) {
        isValidFile = firstText.includes('ID3') || uint8Array[0] === 0xFF || uint8Array[0] === 0x49;
      } else if (result.filename?.endsWith('.mp4')) {
        isValidFile = firstText.includes('ftyp') || uint8Array[4] === 0x66;
      } else if (result.filename?.endsWith('.json')) {
        try {
          JSON.parse(firstText);
          isValidFile = true;
        } catch {
          isValidFile = false;
        }
      } else if (result.filename?.endsWith('.svg')) {
        isValidFile = firstText.includes('<svg') || firstText.includes('<?xml');
      } else if (result.filename?.endsWith('.txt') || result.filename?.endsWith('.csv')) {
        isValidFile = true; // Text files are always valid
      } else {
        isValidFile = true; // Assume other formats are OK
      }

      if (!isValidFile) {
        console.warn('Warning: Downloaded file may not be valid binary data');
        toast({
          title: "Warning",
          description: "Downloaded file may contain text instead of binary data",
          variant: "destructive",
        });
      }

      // Create download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename || 'processed-file';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: `${result.filename} (${blob.size} bytes) is being downloaded`,
      });

    } catch (error) {
      console.error('Download error:', error);
      
      // Enhanced error handling with specific error types
      let errorMessage = "An unexpected error occurred";
      let errorTitle = "Download Failed";
      let canRetry = retryCount < 3;
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorTitle = "Download Timeout";
          errorMessage = "Download took too long. This might happen with large files or slow connections.";
          canRetry = true;
        } else if (error.message.includes('NetworkError') || error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
          errorTitle = "Network Error";
          errorMessage = "Unable to connect to server. Please check your internet connection.";
          canRetry = true;
        } else if (error.message.includes('404') || error.message.includes('File Not Found')) {
          errorTitle = "File Not Found";
          errorMessage = "The processed file is not available yet or was removed. Please process again.";
          canRetry = retryCount < 2; // Fewer retries for 404s
        } else if (error.message.includes('500') || error.message.includes('Server error')) {
          errorTitle = "Server Error";
          errorMessage = "Server is experiencing issues. Please try again in a moment.";
          canRetry = true;
        } else if (error.message.includes('413') || error.message.includes('too large')) {
          errorTitle = "File Too Large";
          errorMessage = "The processed file is too large to download. Try processing smaller files.";
          canRetry = false;
        } else if (error.message.includes('429') || error.message.includes('Too many requests')) {
          errorTitle = "Rate Limited";
          errorMessage = "Too many download requests. Please wait a moment before trying again.";
          canRetry = true;
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
        action: canRetry ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.preventDefault();
              const delay = Math.pow(2, retryCount) * 1000;
              setTimeout(() => downloadFile(retryCount + 1), delay);
            }}
          >
            Retry {retryCount < 3 ? `(${3 - retryCount} left)` : ''}
          </Button>
        ) : undefined
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const shareFile = async () => {
    if (!result.downloadUrl || !navigator.share) {
      // Fallback to copy link
      try {
        await navigator.clipboard.writeText(window.location.origin + result.downloadUrl);
        toast({
          title: "Link Copied",
          description: "Download link copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Share Failed",
          description: "Unable to share or copy link",
          variant: "destructive",
        });
      }
      return;
    }

    try {
      await navigator.share({
        title: `${toolName} Result`,
        text: `Processed with ${toolName}`,
        url: window.location.origin + result.downloadUrl
      });
    } catch (error) {
      // User cancelled or error occurred
      console.log('Share cancelled or failed:', error);
    }
  };

  // Don't show anything if still processing
  if (isProcessing) {
    return null;
  }

  // Show error state clearly
  if (result?.success === false || result?.error) {
    return (
      <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Processing Failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 dark:text-red-400 mb-4">
            {result?.error || result?.message || "An error occurred during processing"}
          </p>
          {onNewProcess && (
            <Button onClick={onNewProcess} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  // Show success state
  return (
    <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <CheckCircle className="h-5 w-5" />
          Processing Complete!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-green-600 dark:text-green-400">
          {result?.message || `${toolName} processing completed successfully!`}
        </p>

        {result?.downloadUrl && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                {result.filename || 'processed-file'}
              </Badge>
              {result.processingTime && (
                <Badge variant="outline" className="border-green-300 text-green-700 dark:text-green-300">
                  {(result.processingTime / 1000).toFixed(1)}s
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => downloadFile()}
                disabled={isDownloading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? 'Downloading...' : 'Download Result'}
              </Button>
              <Button 
                onClick={shareFile}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 dark:hover:bg-green-900"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {onNewProcess && (
          <Button 
            onClick={onNewProcess}
            variant="outline"
            className="w-full border-green-300 text-green-700 hover:bg-green-50 dark:hover:bg-green-900"
          >
            Process Another File
          </Button>
        )}
      </CardContent>
    </Card>
  );

}