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

  const downloadFile = async () => {
    if (!result.downloadUrl) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch(result.downloadUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename || 'processed-file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: `${result.filename} is being downloaded`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Please try again or contact support",
        variant: "destructive",
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

  // Show processing state
  if (isProcessing) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 animate-spin text-teal-400" />
            Processing...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-gray-400 text-sm">
              {uploadProgress < 50 ? 'Uploading files...' : 
               uploadProgress < 95 ? 'Processing with AI...' : 
               'Finalizing output...'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show result
  if (result) {
    return (
      <Card className={`border-2 transition-all duration-300 ${
        result.success 
          ? 'bg-gray-800 border-green-500/30 shadow-green-500/10' 
          : 'bg-gray-800 border-red-500/30 shadow-red-500/10'
      }`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            {result.success ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-400" />
            )}
            {result.success ? 'Processing Complete!' : 'Processing Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={`text-sm ${result.success ? 'text-gray-300' : 'text-red-300'}`}>
            {result.message}
          </p>

          {result.success && result.downloadUrl && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                  {result.filename}
                </Badge>
                {result.processingTime && (
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    {(result.processingTime / 1000).toFixed(1)}s
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={downloadFile}
                  disabled={isDownloading}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isDownloading ? 'Downloading...' : 'Download'}
                </Button>
                <Button 
                  onClick={shareFile}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {result.error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-300 text-sm">{result.error}</p>
            </div>
          )}

          {onNewProcess && (
            <Button 
              onClick={onNewProcess}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Process Another File
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
}