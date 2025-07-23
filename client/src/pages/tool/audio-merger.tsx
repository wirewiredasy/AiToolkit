import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Download, CheckCircle, Music, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AudioMergerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    const validFiles = uploadedFiles.filter(file => file.type.startsWith('audio/'));
    
    if (validFiles.length !== uploadedFiles.length) {
      toast({
        title: "Invalid Files",
        description: "Some files were skipped. Please select only audio files.",
        variant: "destructive",
      });
    }
    
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    setResult(null);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast({
        title: "Insufficient Files",
        description: "Please select at least 2 audio files to merge.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
      formData.append('fileCount', files.length.toString());

      const response = await fetch('/api/tools/audio-merger', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Audio files merged successfully.",
        });
      } else {
        throw new Error('Merge failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to merge audio files. Please try again.",
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
      link.download = 'merged_audio.mp3';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Audio Merger
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Combine multiple audio files into one seamless track
            </p>
          </div>

          {/* Main Tool */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-6 w-6 text-purple-500" />
                Merge Audio Files
              </CardTitle>
              <CardDescription>
                Upload multiple audio files to merge them into one
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="audio/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Click to upload audio files
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Select multiple files • Supports: MP3, WAV, FLAC, AAC, OGG
                  </p>
                </label>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Selected Files ({files.length})
                  </h3>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{file.name}</span>
                          <span className="text-sm text-gray-500">
                            ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button
                          onClick={() => removeFile(index)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Merge Button */}
              <Button
                onClick={handleMerge}
                disabled={files.length < 2 || isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                size="lg"
              >
                {isProcessing ? "Merging..." : `Merge ${files.length} Audio Files`}
              </Button>

              {/* Download Result */}
              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Audio files merged successfully!</span>
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
                <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Seamless Merging
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Combines files without gaps or interruptions
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Files
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Merge as many audio files as needed
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Preserved
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintains original audio quality
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