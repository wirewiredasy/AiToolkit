import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileIcon, X } from 'lucide-react';
import { ErrorHandler, useProcessingState, validateFile, validateMultipleFiles, validatePageRange } from './error-handler';
import { cn } from '@/lib/utils';

interface ToolOption {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'range';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  validation?: (value: string) => { isValid: boolean; error: string | null };
}

interface EnhancedToolTemplateProps {
  title: string;
  description: string;
  acceptedFileTypes?: string[];
  allowMultipleFiles?: boolean;
  minFiles?: number;
  maxFiles?: number;
  toolOptions?: ToolOption[];
  onProcess: (files: File[], options: Record<string, string>) => Promise<any>;
  className?: string;
}

export function EnhancedToolTemplate({
  title,
  description,
  acceptedFileTypes = ['.pdf'],
  allowMultipleFiles = false,
  minFiles = 1,
  maxFiles = 10,
  toolOptions = [],
  onProcess,
  className
}: EnhancedToolTemplateProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { state, setLoading, setSuccess, setError, reset } = useProcessingState();

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    
    if (allowMultipleFiles) {
      const totalFiles = files.length + newFiles.length;
      if (totalFiles > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }
      setFiles(prev => [...prev, ...newFiles]);
    } else {
      setFiles([newFiles[0]]);
    }
    
    // Clear any previous errors
    setValidationErrors({});
    reset();
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleOptionChange = (optionId: string, value: string) => {
    setOptions(prev => ({ ...prev, [optionId]: value }));
    
    // Clear validation error for this field
    if (validationErrors[optionId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[optionId];
        return newErrors;
      });
    }
  };

  const validateInputs = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate files
    if (allowMultipleFiles) {
      const fileValidation = validateMultipleFiles(files, minFiles);
      if (!fileValidation.isValid) {
        setError(fileValidation.error || 'File validation failed');
        return false;
      }
    } else {
      const fileValidation = validateFile(files[0], acceptedFileTypes);
      if (!fileValidation.isValid) {
        setError(fileValidation.error || 'File validation failed');
        return false;
      }
    }

    // Validate tool options
    for (const option of toolOptions) {
      const value = options[option.id] || '';
      
      if (option.required && !value.trim()) {
        errors[option.id] = `${option.label} is required`;
        continue;
      }

      if (value.trim() && option.validation) {
        const validation = option.validation(value);
        if (!validation.isValid) {
          errors[option.id] = validation.error || 'Invalid input';
        }
      }

      // Special validation for page ranges
      if (option.type === 'range' && value.trim()) {
        const rangeValidation = validatePageRange(value);
        if (!rangeValidation.isValid) {
          errors[option.id] = rangeValidation.error || 'Invalid page range';
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }

    return true;
  };

  const handleProcess = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(`Processing ${files.length} file${files.length > 1 ? 's' : ''}...`);
      
      // Add debug logging
      console.log('Processing files:', files.map(f => ({ name: f.name, size: f.size })));
      console.log('Processing options:', options);
      
      const result = await onProcess(files, options);
      
      console.log('Processing result:', result);
      
      if (result.success) {
        setSuccess(
          result.message || 'Processing completed successfully',
          result.downloadUrl,
          result.filename,
          result.metadata
        );
      } else {
        setError(result.message || 'Processing failed');
      }
    } catch (error) {
      console.error('Processing error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      console.log('Starting download from:', url);
      const response = await fetch(url);
      console.log('Download response status:', response.status);
      console.log('Download response headers:');
      response.headers.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      console.log('Downloaded blob:', { size: blob.size, type: blob.type });
      
      // Debug: Check blob content
      if (blob.size < 200) {
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const hexString = Array.from(uint8Array.slice(0, 20))
          .map(b => b.toString(16).padStart(2, '0'))
          .join(' ');
        console.log('First 20 bytes (hex):', hexString);
        
        const textContent = new TextDecoder().decode(uint8Array.slice(0, 100));
        console.log('First 100 chars as text:', textContent);
      }
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      setError(error instanceof Error ? error.message : 'Download failed');
    }
  };

  return (
    <div className={cn("max-w-4xl mx-auto p-6", className)}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          <p className="text-muted-foreground text-center">{description}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">
              Upload {allowMultipleFiles ? 'Files' : 'File'}
              {allowMultipleFiles && ` (${minFiles}-${maxFiles} files)`}
            </Label>
            
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">
                {allowMultipleFiles ? 'Choose files' : 'Choose a file'} or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: {acceptedFileTypes.join(', ')} • Max size: 50MB
              </p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedFileTypes.join(',')}
              multiple={allowMultipleFiles}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
            
            {/* Selected Files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Selected Files:</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <FileIcon className="w-5 h-5 text-blue-500" />
                    <span className="flex-1 text-sm">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tool Options */}
          {toolOptions.length > 0 && (
            <div className="space-y-4">
              <Label className="text-base font-semibold">Options</Label>
              
              {toolOptions.map((option) => (
                <div key={option.id} className="space-y-2">
                  <Label htmlFor={option.id} className="text-sm font-medium">
                    {option.label}
                    {option.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  
                  {option.type === 'textarea' ? (
                    <Textarea
                      id={option.id}
                      placeholder={option.placeholder}
                      value={options[option.id] || ''}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      className={validationErrors[option.id] ? 'border-red-500' : ''}
                    />
                  ) : option.type === 'select' ? (
                    <select
                      id={option.id}
                      value={options[option.id] || ''}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      className={cn(
                        "w-full px-3 py-2 border rounded-md",
                        validationErrors[option.id] ? 'border-red-500' : 'border-gray-300'
                      )}
                    >
                      <option value="">Select an option</option>
                      {option.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={option.id}
                      type={option.type === 'range' ? 'text' : option.type}
                      placeholder={option.placeholder}
                      value={options[option.id] || ''}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      className={validationErrors[option.id] ? 'border-red-500' : ''}
                    />
                  )}
                  
                  {validationErrors[option.id] && (
                    <p className="text-sm text-red-500">{validationErrors[option.id]}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Process Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleProcess}
              disabled={state.isLoading || files.length === 0}
              className="px-8 py-2 text-lg"
              size="lg"
            >
              {state.isLoading ? 'Processing...' : `Process with ${title}`}
            </Button>
          </div>

          {/* Error Handler */}
          <ErrorHandler
            state={state}
            onReset={reset}
            onDownload={handleDownload}
          />
        </CardContent>
      </Card>
    </div>
  );
}