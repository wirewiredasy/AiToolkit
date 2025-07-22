import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Scissors, Music, CheckCircle } from "lucide-react";

export default function AudioTrimmer() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [processing, setProcessing] = useState(false);

  const trimAudio = useMutation({
    mutationFn: async (data: { file: File; start: string; end: string }) => {
      const formData = new FormData();
      formData.append('audio', data.file);
      formData.append('startTime', data.start);
      formData.append('endTime', data.end);
      return apiRequest('/api/tools/audio-trimmer', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: (data: any) => {
      if (data.success) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.filename || 'trimmed-audio.mp3';
        link.click();
        toast({
          title: "Audio Trimmed!",
          description: "Audio has been trimmed successfully",
        });
      }
      setProcessing(false);
    },
    onError: () => {
      toast({
        title: "Trimming Failed",
        description: "Please try again with a valid audio file",
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

  const handleTrim = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to trim audio",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select an audio file to trim",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    trimAudio.mutate({ file: selectedFile, start: startTime, end: endTime });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-violet-900 dark:to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Scissors className="w-6 h-6 text-violet-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Audio Trimmer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Trim audio files by specifying start and end times
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Trim Audio
                </CardTitle>
                <CardDescription>
                  Upload audio file and set trim points
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="audio-upload">Select Audio File</Label>
                  <Input
                    id="audio-upload"
                    type="file"
                    accept=".mp3,.wav,.flac,.aac,.m4a,.ogg"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time (mm:ss)</Label>
                    <Input
                      id="start-time"
                      placeholder="0:00"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time (mm:ss)</Label>
                    <Input
                      id="end-time"
                      placeholder="1:30"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleTrim}
                  disabled={!selectedFile || processing}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Trimming...
                    </>
                  ) : (
                    <>
                      <Scissors className="w-4 h-4 mr-2" />
                      Trim Audio
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Supported Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• MP3 (.mp3)</li>
                  <li>• WAV (.wav)</li>
                  <li>• FLAC (.flac)</li>
                  <li>• AAC (.aac)</li>
                  <li>• M4A (.m4a)</li>
                  <li>• OGG (.ogg)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Time Format</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Examples:</strong></div>
                  <div>• 0:30 (30 seconds)</div>
                  <div>• 1:15 (1 minute 15 seconds)</div>
                  <div>• 2:45 (2 minutes 45 seconds)</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}