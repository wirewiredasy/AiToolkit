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

  const processMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Use the correct endpoint format
      const processEndpoint = endpoint.startsWith('/api/') ? endpoint : `/api/tools/${toolId}`;

      const response = await fetch(processEndpoint, {
        method: "POST",
        body: formData,
        // Don't set Content-Type - let browser handle FormData
      });

      clearInterval(interval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `API request failed: ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message || `${toolName} completed successfully`,
      });
      setUploadProgress(0);
    },
    onError: (error: Error) => {
      console.error('Tool processing error:', error);
      toast({
        title: "Error",
        description: error.message || `${toolName} failed. Please try again.`,
        variant: "destructive",
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
              <p className="text-xs text-gray-400">{setting.description}</p>
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
              <p className="text-xs text-gray-400">{setting.description}</p>
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
              <p className="text-xs text-gray-400">{setting.description}</p>
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
              <p className="text-xs text-gray-400">{setting.description}</p>
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
                <p className="text-xs text-gray-400">{setting.description}</p>
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
              <p className="text-xs text-gray-400">{setting.description}</p>
            )}
          </div>
        );

      default:
        return null;
    }
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
    <div className={cn("min-h-screen bg-gray-900", className)}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            {icon}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{toolName}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload Section */}
            {resultType === "file" && (
              <Card className="bg-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Upload Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedFileUpload
                    accept={acceptedFiles}
                    maxSize={maxFileSize}
                    multiple={allowMultiple}
                    onFilesChange={setFiles}
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
              <Card className="bg-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {settings.map(renderSetting)}
                </CardContent>
              </Card>
            )}

            {/* Validation Input for Government Tools */}
            {resultType === "validation" && (
              <Card className="bg-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Enter Details</CardTitle>
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
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl px-8 py-3 text-lg font-semibold"
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