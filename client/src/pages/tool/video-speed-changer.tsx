import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { FileUp, Download, CheckCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VideoSpeedChangerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [speed, setSpeed] = useState([1]);
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
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
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
        description: "Failed to change speed. Please try again.",
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
      link.download = `speed_${speed[0]}x_${Date.now()}.mp4`;
      link.click();
    }
  };

  const getSpeedLabel = (value: number) => {
    if (value < 1) return `${value}x (Slow Motion)`;
    if (value > 1) return `${value}x (Fast Forward)`;
    return `${value}x (Normal)`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Video Speed Changer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Change video playback speed for slow motion or fast forward effects
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-500" />
                Speed Controller
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
                  <label className="text-sm font-medium">Speed: {getSpeedLabel(speed[0])}</label>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    max={4}
                    min={0.25}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0.25x</span>
                    <span>4x</span>
                  </div>
                </div>

                <Button
                  onClick={handleSpeedChange}
                  disabled={!file || isProcessing}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {isProcessing ? "Processing..." : "Change Speed"}
                </Button>

                {result && (
                  <Button
                    onClick={downloadFile}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Modified Video
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Speed Presets
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    0.25x - 0.5x
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Dramatic slow motion
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    0.75x
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Gentle slow motion
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    1.5x - 2x
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Quick time-lapse
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    2.5x - 4x
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Fast time-lapse
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