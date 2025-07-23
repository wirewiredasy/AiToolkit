import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { FileUp, Download, CheckCircle, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VolumeChangerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [volume, setVolume] = useState([100]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith('audio/')) {
      setFile(uploadedFile);
      setResult(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid audio file.",
        variant: "destructive",
      });
    }
  };

  const handleVolumeChange = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select an audio file first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('volume', volume[0].toString());

      const response = await fetch('/api/tools/volume-changer', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.downloadUrl);
        toast({
          title: "Success!",
          description: "Audio volume changed successfully!",
        });
      } else {
        throw new Error('Volume change failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change volume. Please try again.",
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
      link.download = `volume-${volume[0]}-${file?.name || 'audio.mp3'}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Audio Volume Changer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Adjust the volume of your audio files with precision control
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-6 w-6 text-amber-500" />
                Change Audio Volume
              </CardTitle>
              <CardDescription>
                Upload an audio file and adjust its volume level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Click to upload audio file
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports: MP3, WAV, AAC, FLAC, OGG
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
                  <label className="text-sm font-medium">Volume Level: {volume[0]}%</label>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={200}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1%</span>
                    <span>200%</span>
                  </div>
                </div>

                <Button 
                  onClick={handleVolumeChange}
                  disabled={!file || isProcessing}
                  className="w-full bg-amber-500 hover:bg-amber-600"
                >
                  {isProcessing ? "Processing..." : "Change Volume"}
                </Button>

                {result && (
                  <Button 
                    onClick={downloadFile}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Modified Audio
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Precise Control
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Adjust volume from 1% to 200% with precise control
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Preserved
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintains audio quality while adjusting volume
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Formats
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Works with all popular audio formats
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