import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { EnhancedFileUpload } from "./enhanced-file-upload";
import { ProcessingIndicator } from "./processing-indicator";
import { ResultDisplay } from "./result-display";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from './separator';
import { RecommendedTools } from './recommended-tools';

// Helper function to determine tool category
function getCategoryFromToolId(toolId: string): string {
  if (toolId.includes('pdf')) return 'PDF';
  if (toolId.includes('image') || toolId.includes('bg-') || toolId.includes('photo')) return 'Image';
  if (toolId.includes('audio') || toolId.includes('video') || toolId.includes('media')) return 'Media';
  if (toolId.includes('pan') || toolId.includes('gst') || toolId.includes('aadhaar') || toolId.includes('government')) return 'Government';
  return 'Developer';
}

interface ToolSetting {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "slider" | "switch" | "textarea";
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
  placeholder?: string;
  description?: string;
  required?: boolean;
}

interface ToolTemplateProps {
  toolId: string;
  toolName: string;
  description: string;
  icon: React.ReactNode;
  acceptedFiles?: Record<string, string[]>;
  maxFileSize?: number;
  allowMultiple?: boolean;
  settings?: ToolSetting[];
  endpoint: string;
  resultType?: "file" | "validation" | "generation";
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}

export function ToolTemplate({
  toolId,
  toolName,
  description,
  icon,
  acceptedFiles = { "*/*": [] },
  maxFileSize = 50 * 1024 * 1024, // 50MB
  allowMultiple = false,
  settings = [],
  endpoint,
  resultType = "file",
  gradientFrom = "from-blue-500",
  gradientTo = "to-purple-600",
  className
}: ToolTemplateProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [settingsValues, setSettingsValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    settings.forEach(setting => {
      initial[setting.key] = setting.defaultValue;
    });
    return initial;
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [persistentFiles, setPersistentFiles] = useState<File[]>([]);
  const [isFileProcessed, setIsFileProcessed] = useState(false);

  const processMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // Enhanced upload progress simulation with realistic stages
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          // Slower initial progress, faster in middle
          const increment = prev < 20 ? Math.random() * 5 : 
                           prev < 80 ? Math.random() * 10 : 
                           Math.random() * 3;
          return Math.min(prev + increment, 95);
        });
      }, 300);

      // Use the demo endpoint for processing (no auth required)
      const processEndpoint = `/api/tools/${toolId}/demo`;

      try {
        // Enhanced timeout handling with progress feedback
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          toast({
            title: "Processing Timeout",
            description: "Processing is taking longer than expected. Large files may need more time.",
            variant: "destructive",
          });
        }, 90000); // Increased to 90 second timeout

        // Validate form data before sending
        const fileCount = formData.getAll('files').length;
        if (resultType === "file" && fileCount === 0) {
          throw new Error('Please select at least one file to process');
        }

        // Check file sizes (client-side validation)
        const files = formData.getAll('files') as File[];
        const totalSize = files.reduce((sum, file) => sum + file.size, 0);
        if (totalSize > maxFileSize) {
          throw new Error(`Total file size (${(totalSize/1024/1024).toFixed(1)}MB) exceeds limit (${(maxFileSize/1024/1024).toFixed(1)}MB)`);
        }

        // Convert FormData to JSON for Express.js backend
        const requestData = {
          toolName: toolId,
          category: getCategoryFromToolId(toolId),
          fileName: files[0]?.name || 'input-file',
          fileSize: files[0]?.size || 1024,
          metadata: settingsValues,
        };

        const response = await fetch(processEndpoint, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          body: JSON.stringify(requestData),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          // Enhanced error response handling
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = { message: `Request failed with status ${response.status}` };
          }

          // Specific error handling based on status codes
          if (response.status === 413) {
            throw new Error('File size too large. Please use smaller files.');
          } else if (response.status === 415) {
            throw new Error('Unsupported file type. Please check accepted file formats.');
          } else if (response.status === 422) {
            throw new Error(errorData.message || 'Invalid input parameters. Please check your settings.');
          } else if (response.status === 429) {
            throw new Error('Server is busy. Please wait a moment and try again.');
          } else if (response.status >= 500) {
            throw new Error('Server error. Please try again later.');
          }

          throw new Error(errorData.message || `Processing failed: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        // Validate response structure
        if (!result || typeof result !== 'object') {
          throw new Error('Invalid response from server');
        }

        return result;
      } catch (error: any) {
        // Enhanced error handling with specific error types
        if (error.name === 'AbortError') {
          throw new Error('Processing timed out. This can happen with large files or complex operations. Please try with smaller files or simpler settings.');
        }

        if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
          throw new Error('Network connection error. Please check your internet connection and try again.');
        }

        if (error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to processing server. Please try again in a moment.');
        }

        // Log detailed error for debugging
        console.error('Processing error details:', {
          error: error.message,
          endpoint: processEndpoint,
          toolId,
          fileCount: files.length
        });

        throw new Error(error.message || 'An unexpected error occurred during processing.');
      } finally {
        clearInterval(interval);
        setUploadProgress(100);
      }
    },
    onSuccess: (data) => {
      // Enhanced success handling with validation
      setResult(data);
      setIsFileProcessed(true);

      if (data.download_url) {
        setDownloadUrl(data.download_url);
      }

      toast({
        title: "Processing Complete!",
        description: data.message || `${toolName} completed successfully`,
      });
       setUploadProgress(0);
    },
    onError: (error: Error) => {
      console.error('Tool processing error:', error);

      // Enhanced error categorization for better user experience
      let errorTitle = "Processing Failed";
      let errorDescription = error.message;

      if (error.message.includes('timeout') || error.message.includes('timed out')) {
        errorTitle = "Processing Timeout";
        errorDescription = "Processing took too long. Try using smaller files or simpler settings.";
      } else if (error.message.includes('file size') || error.message.includes('too large')) {
        errorTitle = "File Too Large";
        errorDescription = "Please use smaller files. Maximum allowed size is " + (maxFileSize / 1024 / 1024).toFixed(0) + "MB.";
      } else if (error.message.includes('network') || error.message.includes('connection')) {
        errorTitle = "Connection Error";
        errorDescription = "Please check your internet connection and try again.";
      } else if (error.message.includes('file type') || error.message.includes('format')) {
        errorTitle = "Invalid File Format";
        errorDescription = "Please check that your files are in the correct format for this tool.";
      } else if (error.message.includes('server') || error.message.includes('500')) {
        errorTitle = "Server Error";
        errorDescription = "The server is experiencing issues. Please try again in a few moments.";
      }

      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              // Reset and allow retry
              setUploadProgress(0);
              setFiles([]);
            }}
          >
            Reset
          </Button>
        )
      });
      setUploadProgress(0);
    },
  });

  const handleProcess = () => {
    const formData = new FormData();

    // Add files - use consistent field names for server
    if (files.length > 0) {
      files.forEach(file => {
        formData.append('files', file);
      });
    }

    // Add toolId
    formData.append('toolId', toolId);

    // Add settings as metadata
    formData.append('metadata', JSON.stringify({
      ...settingsValues,
      fileCount: files.length
    }));

    processMutation.mutate(formData);
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettingsValues(prev => ({ ...prev, [key]: value }));
  };

  const renderSetting = (setting: ToolSetting) => {
    const value = settingsValues[setting.key];

    switch (setting.type) {
      case "text":
        return (
          <div key={setting.key} className="space-y-2">
            <Label htmlFor={setting.key}>
              {setting.label}
              {setting.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={setting.key}
              placeholder={setting.placeholder}
              value={value || ""}
              onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            />
            {setting.description && (
              <p className="text-xs text-white opacity-90">{setting.description}</p>
            )}
          </div>
        );

      case "number":
        return (
          <div key={setting.key} className="space-y-2">
            <Label htmlFor={setting.key}>
              {setting.label}
              {setting.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={setting.key}
              type="number"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              placeholder={setting.placeholder}
              value={value || ""}
              onChange={(e) => handleSettingChange(setting.key, parseInt(e.target.value) || "")}
            />
            {setting.description && (
              <p className="text-xs text-white opacity-90">{setting.description}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={setting.key} className="space-y-2">
            <Label htmlFor={setting.key}>
              {setting.label}
              {setting.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select value={value} onValueChange={(val) => handleSettingChange(setting.key, val)}>
              <SelectTrigger>
                <SelectValue placeholder={setting.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {setting.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {setting.description && (
              <p className="text-xs text-white opacity-90">{setting.description}</p>
            )}
          </div>
        );

      case "slider":
        return (
          <div key={setting.key} className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={setting.key}>
                {setting.label}
                {setting.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <span className="text-sm text-gray-300">{value}</span>
            </div>
            <Slider
              id={setting.key}
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={[value || setting.defaultValue || 50]}
              onValueChange={(vals) => handleSettingChange(setting.key, vals[0])}
              className="w-full"
            />
            {setting.description && (
              <p className="text-xs text-white opacity-90">{setting.description}</p>
            )}
          </div>
        );

      case "switch":
        return (
          <div key={setting.key} className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor={setting.key}>
                {setting.label}
                {setting.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {setting.description && (
                <p className="text-xs text-white opacity-90">{setting.description}</p>
              )}
            </div>
            <Switch
              id={setting.key}
              checked={value || false}
              onCheckedChange={(checked) => handleSettingChange(setting.key, checked)}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={setting.key} className="space-y-2">
            <Label htmlFor={setting.key}>
              {setting.label}
              {setting.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={setting.key}
              placeholder={setting.placeholder}
              value={value || ""}
              onChange={(e) => handleSettingChange(setting.key, e.target.value)}
              rows={4}
            />
            {setting.description && (
              <p className="text-xs text-white opacity-90">{setting.description}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

    const handleFileSelect = (newFiles: File[]) => {
    setFiles(newFiles);
    setPersistentFiles(newFiles);
    setError(null);
    setResult(null);
    setDownloadUrl(null);
    setIsFileProcessed(false);
  };

  const canProcess = () => {
    if (resultType === "file" && files.length === 0) return false;

    // Check required settings
    const hasRequiredSettings = settings
      .filter(s => s.required)
      .every(s => settingsValues[s.key] !== undefined && settingsValues[s.key] !== "");

    return hasRequiredSettings;
  };

  const getStatus = () => {
    if (processMutation.isPending) return "processing";
    if (processMutation.isSuccess) return "success";
    if (processMutation.isError) return "error";
    return "idle";
  };

  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-card border border-border rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            {icon}
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{toolName}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload Section */}
            {resultType === "file" && (
              <Card className="bg-card border-border shadow-xl">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Upload Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedFileUpload
                    accept={acceptedFiles}
                    maxSize={maxFileSize}
                    multiple={allowMultiple}
                    onFilesChange={handleFileSelect}
                    uploadProgress={uploadProgress}
                    isUploading={processMutation.isPending}
                    success={processMutation.isSuccess}
                    error={processMutation.isError ? "Upload failed" : undefined}
                  />
                </CardContent>
              </Card>
            )}

            {/* Settings Section */}
            {settings.length > 0 && (
              <Card className="bg-card border-border shadow-xl">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {settings.map(renderSetting)}
                </CardContent>
              </Card>
            )}

            {/* Validation Input for Government Tools */}
            {resultType === "validation" && (
              <Card className="bg-card border-border shadow-xl">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Enter Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="inputValue" className="text-gray-300">
                      Enter {toolName.replace(" Validator", "")} Number *
                    </Label>
                    <Input
                      id="inputValue"
                      placeholder={`Enter your ${toolName.replace(" Validator", "").toLowerCase()} number`}
                      value={settingsValues.inputValue || ""}
                      onChange={(e) => handleSettingChange("inputValue", e.target.value)}
                      className="text-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Process Button */}
          <div className="text-center">
            <Button
              onClick={handleProcess}
              disabled={!canProcess() || processMutation.isPending}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl px-8 py-3 text-lg font-semibold"
            >
              {processMutation.isPending ? "Processing..." : `Process with ${toolName}`}
            </Button>
          </div>

          {/* Processing Status */}
          <ProcessingIndicator
            status={getStatus()}
            progress={uploadProgress}
            message={
              processMutation.isPending
                ? `Processing your ${resultType === "file" ? "files" : "data"}...`
                : undefined
            }
          />

          {/* Results */}
          {processMutation.isSuccess && processMutation.data && (
            <ResultDisplay
              result={processMutation.data as any}
              toolName={toolName}
              isProcessing={processMutation.isPending}
              uploadProgress={uploadProgress}
            />
          )}
        </div>

        {/* Recommended Tools Section */}
        <RecommendedTools 
          currentToolId={toolName?.toLowerCase().replace(/\s+/g, '-')} 
          category={toolName?.split(' ')[0]} 
          limit={6} 
        />
      </div>
    </div>
  );
}