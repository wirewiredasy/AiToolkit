import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Copy, CheckCircle, Clock, FileText, Image, Video, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ResultDisplayProps {
  result: {
    success: boolean;
    message: string;
    downloadUrl?: string;
    filename?: string;
    processingTime?: number;
    fileSize?: number;
    compressionRatio?: string;
    newWidth?: number;
    newHeight?: number;
    accuracy?: string;
    enhancementLevel?: string;
    pageCount?: number;
    duration?: string;
    format?: string;
    bitrate?: string;
    [key: string]: any;
  };
  toolName: string;
  className?: string;
}

export function ResultDisplay({ result, toolName, className }: ResultDisplayProps) {
  const { toast } = useToast();

  if (!result.success) return null;

  const getFileIcon = (filename?: string) => {
    if (!filename) return <FileText className="h-5 w-5" />;
    
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return <Image className="h-5 w-5" />;
    if (['mp4', 'avi', 'mov', 'mkv'].includes(ext || '')) return <Video className="h-5 w-5" />;
    if (['mp3', 'wav', 'aac', 'flac'].includes(ext || '')) return <Volume2 className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatProcessingTime = (ms?: number) => {
    if (!ms) return 'Unknown';
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Download link copied to clipboard",
    });
  };

  const shareResult = () => {
    if (navigator.share && result.downloadUrl) {
      navigator.share({
        title: `${toolName} Result`,
        text: `I processed a file using ${toolName}`,
        url: result.downloadUrl,
      });
    } else {
      copyToClipboard(result.downloadUrl || '');
    }
  };

  return (
    <Card className={cn("border-green-200 bg-green-50 dark:bg-green-950/20", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Processing Complete!</span>
          </CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            Success
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Success Message */}
        <div className="text-center">
          <p className="text-green-700 dark:text-green-300 font-medium">
            {result.message}
          </p>
        </div>

        {/* File Information */}
        {result.filename && (
          <div className="flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-lg border">
            {getFileIcon(result.filename)}
            <div className="text-center">
              <p className="font-medium">{result.filename}</p>
              {result.fileSize && (
                <p className="text-sm text-gray-500">{formatFileSize(result.fileSize)}</p>
              )}
            </div>
          </div>
        )}

        {/* Processing Stats */}
        <div className="grid grid-cols-2 gap-4">
          {result.processingTime && (
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
              <Clock className="h-4 w-4 mx-auto mb-1 text-gray-500" />
              <p className="text-sm font-medium">{formatProcessingTime(result.processingTime)}</p>
              <p className="text-xs text-gray-500">Processing Time</p>
            </div>
          )}

          {result.compressionRatio && (
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-sm font-medium text-blue-600">{result.compressionRatio}</p>
              <p className="text-xs text-gray-500">Size Reduced</p>
            </div>
          )}

          {result.newWidth && result.newHeight && (
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg col-span-2">
              <p className="text-sm font-medium">{result.newWidth} × {result.newHeight}</p>
              <p className="text-xs text-gray-500">New Dimensions</p>
            </div>
          )}

          {result.accuracy && (
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-sm font-medium text-green-600">{result.accuracy}</p>
              <p className="text-xs text-gray-500">Accuracy</p>
            </div>
          )}

          {result.pageCount && (
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-sm font-medium">{result.pageCount}</p>
              <p className="text-xs text-gray-500">Pages</p>
            </div>
          )}

          {result.duration && (
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-sm font-medium">{result.duration}</p>
              <p className="text-xs text-gray-500">Duration</p>
            </div>
          )}

          {result.bitrate && (
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-sm font-medium">{result.bitrate}</p>
              <p className="text-xs text-gray-500">Bitrate</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {result.downloadUrl && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1" onClick={() => window.open(result.downloadUrl, '_blank')}>
              <Download className="h-4 w-4 mr-2" />
              Download File
            </Button>
            <Button variant="outline" onClick={() => copyToClipboard(result.downloadUrl!)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" onClick={shareResult}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}