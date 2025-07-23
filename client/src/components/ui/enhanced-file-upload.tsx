import React, { useCallback, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedFileUploadProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
  className?: string;
  uploadProgress?: number;
  isUploading?: boolean;
  error?: string;
  success?: boolean;
  title?: string;
  description?: string;
}

export function EnhancedFileUpload({
  accept = { "*/*": [] },
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = false,
  onFilesChange,
  className,
  uploadProgress = 0,
  isUploading = false,
  error,
  success = false,
  title = "Upload Files",
  description = "Drag and drop files here or click to browse",
  ...props
}: EnhancedFileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(file => file.size <= maxSize);
    const newFiles = multiple ? [...files, ...validFiles] : validFiles;
    
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (!isUploading) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "border-2 border-dashed cursor-pointer transition-all duration-200",
          isDragActive && "border-blue-500 bg-blue-50 dark:bg-blue-950/20",
          isUploading && "cursor-not-allowed opacity-50",
          success && "border-green-500 bg-green-50 dark:bg-green-950/20",
          error && "border-red-500 bg-red-50 dark:bg-red-950/20",
          !isDragActive && !success && !error && "hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-950/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
            disabled={isUploading}
          />
          
          <div className="mb-4">
            {success ? (
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            ) : error ? (
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            ) : (
              <Upload className={cn(
                "h-12 w-12 mx-auto transition-colors",
                isDragActive ? "text-blue-500" : "text-gray-400"
              )} />
            )}
          </div>

          <h3 className="text-lg font-semibold mb-2">
            {success ? "Upload Complete!" : error ? "Upload Failed" : title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {success ? "Your files have been processed successfully" : 
             error ? error : 
             description}
          </p>

          {!success && !error && (
            <Button variant="outline" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Browse Files"}
            </Button>
          )}

          {isUploading && (
            <div className="w-full mt-4">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-gray-500 mt-1">{uploadProgress}% complete</p>
            </div>
          )}
        </CardContent>
      </Card>



      {/* Uploaded files */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded Files</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <File className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium truncate max-w-48">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              {!isUploading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}