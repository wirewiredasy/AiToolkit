import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Video, CheckCircle } from "lucide-react";

export default function VideoConverter() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [quality, setQuality] = useState("medium");
  const [processing, setProcessing] = useState(false);

  const convertVideo = useMutation({
    mutationFn: async (data: { file: File; format: string; quality: string }) => {
      const formData = new FormData();
      formData.append('video', data.file);
      formData.append('outputFormat', data.format);
      formData.append('quality', data.quality);
      return apiRequest('/api/tools/video-converter', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: (data: any) => {
      if (data.success) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.filename || `converted.${outputFormat}`;
        link.click();
        toast({
          title: "Video Converted!",
          description: "Your video has been converted successfully",
        });
      }
      setProcessing(false);
    },
    onError: () => {
      toast({
        title: "Conversion Failed",
        description: "Please try again with a valid video file",
        variant: "destructive",
      });
      setProcessing(false);
    }
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleConvert = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to convert videos",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a video file to convert",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    convertVideo.mutate({
      file: selectedFile,
      format: outputFormat,
      quality: quality
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Video Converter
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Convert videos between different formats with customizable quality settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interface */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Convert Video
                </CardTitle>
                <CardDescription>
                  Select video file and choose output format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="video-upload">Select Video File</Label>
                  <Input
                    id="video-upload"
                    type="file"
                    accept=".mp4,.avi,.mov,.wmv,.flv,.mkv,.webm,.m4v"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mp4">MP4</SelectItem>
                        <SelectItem value="avi">AVI</SelectItem>
                        <SelectItem value="mov">MOV</SelectItem>
                        <SelectItem value="wmv">WMV</SelectItem>
                        <SelectItem value="webm">WebM</SelectItem>
                        <SelectItem value="mkv">MKV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quality</Label>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Fast)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (Slow)</SelectItem>
                        <SelectItem value="lossless">Lossless</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleConvert}
                  disabled={!selectedFile || processing}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      Convert Video
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Supported Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Input:</strong> MP4, AVI, MOV, WMV, FLV, MKV, WebM</div>
                  <div><strong>Output:</strong> MP4, AVI, MOV, WMV, WebM, MKV</div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Quality Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Low:</strong> Faster conversion, smaller file</li>
                  <li>• <strong>Medium:</strong> Balanced quality and size</li>
                  <li>• <strong>High:</strong> Best quality, larger file</li>
                  <li>• <strong>Lossless:</strong> No quality loss</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}