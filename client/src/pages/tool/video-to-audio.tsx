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
import { Upload, Music, Video, CheckCircle } from "lucide-react";

export default function VideoToAudio() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioFormat, setAudioFormat] = useState("mp3");
  const [quality, setQuality] = useState("high");
  const [processing, setProcessing] = useState(false);

  const extractAudio = useMutation({
    mutationFn: async (data: { file: File; format: string; quality: string }) => {
      const formData = new FormData();
      formData.append('video', data.file);
      formData.append('audioFormat', data.format);
      formData.append('quality', data.quality);
      return apiRequest('/api/tools/video-to-audio', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: (data: any) => {
      if (data.success) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.filename || `extracted-audio.${audioFormat}`;
        link.click();
        toast({
          title: "Audio Extracted!",
          description: "Audio has been extracted from video successfully",
        });
      }
      setProcessing(false);
    },
    onError: () => {
      toast({
        title: "Extraction Failed",
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

  const handleExtract = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to extract audio",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a video file to extract audio",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    extractAudio.mutate({
      file: selectedFile,
      format: audioFormat,
      quality: quality
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Music className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Video to Audio Extractor
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Extract high-quality audio tracks from video files
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Extract Audio
                </CardTitle>
                <CardDescription>
                  Upload video file to extract its audio track
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="video-upload">Select Video File</Label>
                  <Input
                    id="video-upload"
                    type="file"
                    accept=".mp4,.avi,.mov,.wmv,.flv,.mkv,.webm"
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
                    <Label>Audio Format</Label>
                    <Select value={audioFormat} onValueChange={setAudioFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mp3">MP3</SelectItem>
                        <SelectItem value="wav">WAV</SelectItem>
                        <SelectItem value="flac">FLAC</SelectItem>
                        <SelectItem value="aac">AAC</SelectItem>
                        <SelectItem value="ogg">OGG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Audio Quality</Label>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (64 kbps)</SelectItem>
                        <SelectItem value="medium">Medium (128 kbps)</SelectItem>
                        <SelectItem value="high">High (320 kbps)</SelectItem>
                        <SelectItem value="lossless">Lossless</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleExtract}
                  disabled={!selectedFile || processing}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <Music className="w-4 h-4 mr-2" />
                      Extract Audio
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Supported Video Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• MP4 (.mp4)</li>
                  <li>• AVI (.avi)</li>
                  <li>• MOV (.mov)</li>
                  <li>• WMV (.wmv)</li>
                  <li>• MKV (.mkv)</li>
                  <li>• WebM (.webm)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Audio Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>MP3:</strong> Universal compatibility</li>
                  <li>• <strong>WAV:</strong> Uncompressed quality</li>
                  <li>• <strong>FLAC:</strong> Lossless compression</li>
                  <li>• <strong>AAC:</strong> Modern standard</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}