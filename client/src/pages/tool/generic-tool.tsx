import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getToolById } from "@/lib/tools";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Download, FileText, Image, Video, Music, FileCode, AlertCircle, CheckCircle } from "lucide-react";

interface ProcessingResult {
  success: boolean;
  message: string;
  downloadUrl?: string;
  outputData?: any;
  processingTime?: number;
}

export default function GenericTool() {
  const [location] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<FileList | null>(null);
  const [textInput, setTextInput] = useState("");
  const [processingProgress, setProcessingProgress] = useState(0);
  
  // Extract tool ID from URL
  const toolId = location.split('/tool/')[1];
  const tool = getToolById(toolId);
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  // Process tool mutation
  const processTool = useMutation({
    mutationFn: async (data: FormData | { input: string }) => {
      const endpoint = `/api/tools/${toolId}/process`;
      return apiRequest<ProcessingResult>(endpoint, {
        method: 'POST',
        body: data instanceof FormData ? data : JSON.stringify(data),
        headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: (result) => {
      if (result.success) {
        toast({
          title: "Processing Complete!",
          description: result.message || "Your file has been processed successfully",
        });
        setProcessingProgress(100);
        
        // Auto download if URL provided
        if (result.downloadUrl) {
          const link = document.createElement('a');
          link.href = result.downloadUrl;
          link.download = `processed-${tool.name.toLowerCase().replace(/\s+/g, '-')}.${getFileExtension(tool.category)}`;
          link.click();
        }
      } else {
        toast({
          title: "Processing Failed",
          description: result.message || "An error occurred during processing",
          variant: "destructive",
        });
      }
      setProcessingProgress(0);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to process. Please try again.",
        variant: "destructive",
      });
      setProcessingProgress(0);
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleProcess = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use this tool",
        variant: "destructive",
      });
      return;
    }

    if (requiresFileUpload(tool.category) && (!files || files.length === 0)) {
      toast({
        title: "No File Selected",
        description: "Please select a file to process",
        variant: "destructive",
      });
      return;
    }

    if (requiresTextInput(tool.category) && !textInput.trim()) {
      toast({
        title: "No Input Provided",
        description: "Please enter text to process",
        variant: "destructive",
      });
      return;
    }

    setProcessingProgress(10);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    if (requiresFileUpload(tool.category) && files) {
      const formData = new FormData();
      Array.from(files).forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
      formData.append('toolId', toolId);
      processTool.mutate(formData);
    } else {
      processTool.mutate({ input: textInput });
    }
  };

  const getToolIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'pdf': return <FileText className="w-6 h-6" />;
      case 'image': return <Image className="w-6 h-6" />;
      case 'audio/video': return <Video className="w-6 h-6" />;
      case 'government': return <FileCode className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  const requiresFileUpload = (category: string) => {
    return ['PDF', 'Image', 'Audio/Video'].includes(category);
  };

  const requiresTextInput = (category: string) => {
    return category === 'Government';
  };

  const getFileExtension = (category: string) => {
    switch (category) {
      case 'PDF': return 'pdf';
      case 'Image': return 'png';
      case 'Audio/Video': return 'mp4';
      case 'Government': return 'txt';
      default: return 'txt';
    }
  };

  const getAcceptedFileTypes = (category: string) => {
    switch (category) {
      case 'PDF': return '.pdf';
      case 'Image': return '.jpg,.jpeg,.png,.gif,.bmp,.webp';
      case 'Audio/Video': return '.mp4,.avi,.mov,.wmv,.flv,.mp3,.wav,.flac,.aac';
      default: return '*';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              {getToolIcon(tool.category)}
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {tool.name}
              </h1>
              <Badge variant="secondary" className="mt-1">
                {tool.category}
              </Badge>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {tool.description}
          </p>
          {tool.usageCount && (
            <p className="text-sm text-muted-foreground mt-2">
              Used by {tool.usageCount} users
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tool Interface */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Process
                </CardTitle>
                <CardDescription>
                  {requiresFileUpload(tool.category) 
                    ? "Upload your files and click process to get started"
                    : "Enter your data and click process to get started"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {requiresFileUpload(tool.category) && (
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Select Files</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept={getAcceptedFileTypes(tool.category)}
                      onChange={handleFileUpload}
                      className="cursor-pointer"
                    />
                    {files && files.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {files.length} file(s) selected
                      </div>
                    )}
                  </div>
                )}

                {requiresTextInput(tool.category) && (
                  <div className="space-y-2">
                    <Label htmlFor="text-input">Enter Text</Label>
                    <Textarea
                      id="text-input"
                      placeholder={`Enter ${tool.category.toLowerCase()} information here...`}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      rows={4}
                    />
                  </div>
                )}

                {processingProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing...</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <Progress value={processingProgress} />
                  </div>
                )}

                <Button
                  onClick={handleProcess}
                  disabled={processTool.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  {processTool.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Process {tool.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Feature List */}
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Fast processing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    High quality output
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Secure & private
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    No watermarks
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Usage Info */}
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">How to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {requiresFileUpload(tool.category) && (
                    <>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <span>Select your {tool.category.toLowerCase()} files</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <span>Click "Process {tool.name}"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <span>Download your processed file</span>
                      </div>
                    </>
                  )}
                  {requiresTextInput(tool.category) && (
                    <>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <span>Enter the data to validate</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                        <span>Click "Process {tool.name}"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                        <span>View validation results</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                All files are processed securely and deleted after 1 hour. We don't store your personal data.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}