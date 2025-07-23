import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const noiseTypes = [
  { value: "background", label: "Background Noise" },
  { value: "hiss", label: "Tape Hiss" },
  { value: "hum", label: "Electrical Hum" },
  { value: "wind", label: "Wind Noise" },
  { value: "click", label: "Clicks & Pops" },
  { value: "general", label: "General Noise" },
];

export default function NoiseReducerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [noiseType, setNoiseType] = useState("general");
  const [intensity, setIntensity] = useState([70]);
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

  const handleReduceNoise = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('noiseType', noiseType);
      formData.append('intensity', intensity[0].toString());

      const response = await fetch('/api/tools/noise-reducer', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Noise reduced successfully.",
        });
      } else {
        throw new Error('Noise reduction failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reduce noise. Please try again.",
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
      link.download = `${file?.name?.split('.')[0]}_cleaned.${file?.name?.split('.').pop()}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Noise Reducer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Remove unwanted noise from your audio files using AI
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-6 w-6 text-teal-500" />
                Reduce Audio Noise
              </CardTitle>
              <CardDescription>
                Upload an audio file and configure noise reduction settings
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
                    Supports: MP3, WAV, FLAC, AAC, OGG
                  </p>
                </label>
              </div>

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

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Noise Type</Label>
                  <Select value={noiseType} onValueChange={setNoiseType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select noise type" />
                    </SelectTrigger>
                    <SelectContent>
                      {noiseTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Reduction Intensity</Label>
                    <span className="text-sm font-medium">{intensity[0]}%</span>
                  </div>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Gentle</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleReduceNoise}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                size="lg"
              >
                {isProcessing ? "Reducing Noise..." : `Reduce ${noiseType} Noise`}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Noise reduced successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    AI-Powered
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Advanced neural networks identify and remove noise
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Voice Preserved
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintains speech quality while removing noise
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Types
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Targets specific noise types for better results
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