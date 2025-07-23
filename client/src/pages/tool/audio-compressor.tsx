import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { FileUp, Download, CheckCircle, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AudioCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([80]);
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

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('quality', quality[0].toString());

      const response = await fetch('/api/tools/audio-compressor', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Audio compressed successfully.",
        });
      } else {
        throw new Error('Compression failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress audio. Please try again.",
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
      link.download = `${file?.name?.split('.')[0]}_compressed.mp3`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Audio Compressor
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Reduce audio file size while maintaining quality
            </p>
          </div>

          {/* Main Tool */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-6 w-6 text-green-500" />
                Compress Audio File
              </CardTitle>
              <CardDescription>
                Upload an audio file and adjust compression settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
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
                    Supports: MP3, WAV, FLAC, AAC, OGG
                  </p>
                </label>
              </div>

              {/* File Info */}
              {file && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">{file.name}</span>
                    <span className="text-sm text-gray-500">
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>
                </div>
              )}

              {/* Quality Setting */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Audio Quality</Label>
                  <span className="text-sm font-medium">{quality[0]}%</span>
                </div>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  min={10}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Smaller size</span>
                  <span>Better quality</span>
                </div>
              </div>

              {/* Compress Button */}
              <Button
                onClick={handleCompress}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                size="lg"
              >
                {isProcessing ? "Compressing..." : "Compress Audio"}
              </Button>

              {/* Download Result */}
              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Audio compressed successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Smart Compression
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Advanced algorithms preserve audio quality
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Formats
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Support for all popular audio formats
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Adjustable Quality
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Control the balance between size and quality
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