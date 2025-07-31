import { useState, useCallback, useRef } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  className?: string;
}

export default function FileUpload({
  onFileSelect,
  accept = "*",
  multiple = false,
  maxSize = 25,
  className = ""
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const [persistentFiles, setPersistentFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  }, []);

  const handleFiles = (fileList: File[]) => {
    const validFiles = fileList.filter(file => {
      const sizeMB = file.size / (1024 * 1024);
      return sizeMB <= maxSize;
    });

    if (validFiles.length !== fileList.length) {
      // Show error for files that are too large
      console.warn(`Some files exceed the ${maxSize}MB limit`);
      setUploadError(`Some files exceed the ${maxSize}MB limit`);
    } else {
      setUploadError(null);
    }

    // Maintain persistent state
    setFiles(validFiles);
    setPersistentFiles(validFiles);
    setIsProcessed(false);
    onFileSelect(validFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPersistentFiles(newFiles);
    setIsProcessed(false);
    onFileSelect(newFiles);
  };

  // Keep files available even after processing
  const displayFiles = files.length > 0 ? files : persistentFiles;

  return (
    <div className={className}>
      <Card 
        className={`upload-zone border-2 border-dashed transition-all duration-300 ${
          isDragOver ? 'border-primary bg-primary/10 scale-105' : 'border-neutral-300'
        } hover:border-primary hover:bg-primary/5`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-12 text-center">
          <i className="fas fa-cloud-upload-alt text-4xl text-neutral-400 mb-4"></i>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
            Drop your files here
          </h3>
          <p className="text-neutral-600 mb-4">
            or click to browse from your device
          </p>

          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />

          <Button asChild>
            <label htmlFor="file-input" className="cursor-pointer">
              Select Files
            </label>
          </Button>

          <p className="text-sm text-neutral-500 mt-4">
            Maximum file size: {maxSize}MB per file
          </p>
        </CardContent>
      </Card>

        {uploadError && (
            <div className="text-red-500 mt-2">{uploadError}</div>
        )}

      {displayFiles.length > 0 && (
        <Card className="mt-4">
          <CardContent className="p-6">
            <h3 className="font-semibold text-neutral-800 mb-4">
              Selected Files ({displayFiles.length}) {isProcessed && <span className="text-green-600">✓ Processed</span>}
            </h3>
            <div className="space-y-3">
              {displayFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-file text-neutral-500 text-lg"></i>
                    <div>
                      <div className="font-medium text-neutral-800">{file.name}</div>
                      <div className="text-sm text-neutral-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}