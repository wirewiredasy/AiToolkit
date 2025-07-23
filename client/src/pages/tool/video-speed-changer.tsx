
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { FileUp, Download, CheckCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VideoSpeedChangerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [speed, setSpeed] = useState([1.0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

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

  const handleSpeedChange = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a video file first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('speed', speed[0].toString());

      const response = await fetch('/api/tools/video-speed-changer', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.downloadUrl);
        toast({
          title: "Success!",
          description: "Video speed changed successfully!",
        });
      } else {
        throw new Error('Speed change failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change video speed. Please try again.",
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
      link.download = `speed-${speed[0]}x-${file?.name || 'video.mp4'}`;
      link.click();
    }
  };

  const getSpeedDescription = (speedValue: number) => {
    if (speedValue < 1) return "Slow Motion";
    if (speedValue > 1) return "Fast Forward";
    return "Normal Speed";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Video Speed Changer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Adjust video playback speed for slow motion or fast forward effects
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-500" />
                Change Video Speed
              </CardTitle>
              <CardDescription>
                Upload a video and adjust its playback speed
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
                    Supports: MP4, AVI, MOV, MKV, WebM
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
                  <Label htmlFor="speed-slider">
                    Speed: {speed[0]}x ({getSpeedDescription(speed[0])})
                  </Label>
                  <Slider
                    id="speed-slider"
                    min={0.25}
                    max={4.0}
                    step={0.25}
                    value={speed}
                    onValueChange={setSpeed}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0.25x (Very Slow)</span>
                    <span>1x (Normal)</span>
                    <span>4x (Very Fast)</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[0.5, 1.0, 1.5, 2.0].map((presetSpeed) => (
                    <Button
                      key={presetSpeed}
                      variant={speed[0] === presetSpeed ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSpeed([presetSpeed])}
                    >
                      {presetSpeed}x
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSpeedChange}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                size="lg"
              >
                {isProcessing ? "Changing Speed..." : "Change Speed"}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Speed changed successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-4 gap-4 mt-8">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Slow Motion
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    0.25x - 0.75x for dramatic effects
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Normal Speed
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    1x original playback speed
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Fast Forward
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    1.25x - 2x for quick viewing
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Time Lapse
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    2.5x - 4x for time-lapse effects
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
