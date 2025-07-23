import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const outputFormats = [
  { value: "mp4", label: "MP4" },
  { value: "avi", label: "AVI" },
  { value: "mov", label: "MOV" },
  { value: "wmv", label: "WMV" },
];

export default function GifToVideoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("mp4");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === 'image/gif') {
      setFile(uploadedFile);
      setResult(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid GIF file.",
        variant: "destructive",
      });
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', outputFormat);

      const response = await fetch('/api/tools/gif-to-video', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: `GIF converted to ${outputFormat.toUpperCase()} successfully.`,
        });
      } else {
        throw new Error('Conversion failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert GIF to video. Please try again.",
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
      link.download = `${file?.name?.split('.')[0]}.${outputFormat}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              GIF to Video Converter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert your animated GIF files to video formats
            </p>
          </div>

          {/* Main Tool */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-6 w-6 text-teal-500" />
                Convert GIF to Video
              </CardTitle>
              <CardDescription>
                Upload a GIF file and select output video format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".gif"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="gif-upload"
                />
                <label htmlFor="gif-upload" className="cursor-pointer">
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Click to upload GIF file
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports animated GIF files
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

              {/* Output Format Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Output Video Format</label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    {outputFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Convert Button */}
              <Button
                onClick={handleConvert}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600"
                size="lg"
              >
                {isProcessing ? "Converting..." : `Convert to ${outputFormat.toUpperCase()}`}
              </Button>

              {/* Download Result */}
              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Video created successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Video
                    </Button>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-teal-500/10 to-green-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Formats
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Convert to MP4, AVI, MOV, or WMV formats
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-500/10 to-green-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Preserved
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintains original animation quality and speed
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-500/10 to-green-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Fast Processing
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Quick conversion with optimized algorithms
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