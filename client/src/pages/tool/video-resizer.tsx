import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VideoResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [resolution, setResolution] = useState("720p");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const resolutionOptions = [
    { label: "480p (640x480)", value: "480p" },
    { label: "720p (1280x720)", value: "720p" },
    { label: "1080p (1920x1080)", value: "1080p" },
    { label: "1440p (2560x1440)", value: "1440p" },
    { label: "4K (3840x2160)", value: "4k" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith('video/')) {
      setFile(uploadedFile);
      setResult(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid video file.",
        variant: "destructive",
      });
    }
  };

  const handleResize = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('resolution', resolution);

      const response = await fetch('/api/tools/video-resizer', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: `Video resized to ${resolution} successfully.`,
        });
      } else {
        throw new Error('Resize failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resize video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = `${file?.name?.split('.')[0]}_${resolution}.${file?.name?.split('.').pop()}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Video Resizer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Resize your videos to different resolutions while maintaining quality
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-6 w-6 text-blue-500" />
                Resize Video
              </CardTitle>
              <CardDescription>
                Upload a video and select the desired output resolution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Click to upload video file
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports: MP4, AVI, MOV, WMV, MKV
                  </p>
                </label>
              </div>

              {file && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Resolution</label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleResize}
                  disabled={!file || isProcessing}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  {isProcessing ? "Processing..." : "Resize Video"}
                </Button>

                {result && (
                  <Button
                    onClick={downloadFile}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resized Video
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Popular Resolutions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    720p HD
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Standard HD quality
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    1080p Full HD
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    High quality video
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    4K Ultra HD
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maximum quality
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}