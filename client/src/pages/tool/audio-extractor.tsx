import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const audioFormats = [
  { value: "mp3", label: "MP3" },
  { value: "wav", label: "WAV" },
  { value: "flac", label: "FLAC" },
  { value: "aac", label: "AAC" },
  { value: "ogg", label: "OGG" },
];

export default function AudioExtractorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("mp3");
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

  const handleExtract = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', outputFormat);

      const response = await fetch('/api/tools/audio-extractor', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Audio extracted successfully from video.",
        });
      } else {
        throw new Error('Extraction failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract audio. Please try again.",
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
      link.download = `${file?.name?.split('.')[0]}_audio.${outputFormat}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Audio Extractor
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Extract audio tracks from video files
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-6 w-6 text-green-500" />
                Extract Audio from Video
              </CardTitle>
              <CardDescription>
                Upload a video file and extract the audio track
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
                    Supports: MP4, AVI, MOV, WMV, FLV
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Output Audio Format</label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    {audioFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleExtract}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                size="lg"
              >
                {isProcessing ? "Extracting Audio..." : `Extract to ${outputFormat.toUpperCase()}`}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Audio extracted successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Audio
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    High Quality
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Extracts audio without quality loss
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Formats
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Support for MP3, WAV, FLAC, AAC, and OGG
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Fast Processing
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Quick extraction with optimized algorithms
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
import { ToolTemplate } from "@/components/ui/tool-template";
import { Music } from "lucide-react";

export default function AudioExtractorPage() {
  return (
    <ToolTemplate
      toolId="audio-extractor"
      toolName="Audio Extractor"
      description="Extract high-quality audio tracks from video files. Support for multiple video formats with various audio quality options."
      icon={<Music className="h-8 w-8 text-white" />}
      acceptedFiles={{ "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv", ".webm"] }}
      maxFileSize={500 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "audioFormat",
          label: "Audio Format",
          type: "select",
          options: ["MP3", "WAV", "AAC", "FLAC", "OGG", "M4A"],
          defaultValue: "MP3",
          required: true,
          description: "Output audio format"
        },
        {
          key: "audioQuality",
          label: "Audio Quality",
          type: "select",
          options: ["128 kbps", "192 kbps", "256 kbps", "320 kbps", "Lossless"],
          defaultValue: "192 kbps",
          description: "Audio bitrate and quality"
        },
        {
          key: "sampleRate",
          label: "Sample Rate",
          type: "select",
          options: ["22050 Hz", "44100 Hz", "48000 Hz", "96000 Hz"],
          defaultValue: "44100 Hz",
          description: "Audio sample rate"
        },
        {
          key: "channels",
          label: "Audio Channels",
          type: "select",
          options: ["Mono", "Stereo", "Original"],
          defaultValue: "Stereo",
          description: "Number of audio channels"
        },
        {
          key: "startTime",
          label: "Start Time (seconds)",
          type: "text",
          placeholder: "0",
          description: "Extract from specific time (optional)"
        },
        {
          key: "duration",
          label: "Duration (seconds)",
          type: "text",
          placeholder: "Full video",
          description: "Length of audio to extract (optional)"
        },
        {
          key: "normalizeAudio",
          label: "Normalize Volume",
          type: "switch",
          defaultValue: false,
          description: "Normalize audio levels"
        }
      ]}
      endpoint="/api/tools/audio-extractor"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}
