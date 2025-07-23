
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Download, CheckCircle, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VocalRemoverPage() {
  const [file, setFile] = useState<File | null>(null);
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

  const handleVocalRemoval = async () => {
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

      const response = await fetch('/api/tools/vocal-remover', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.downloadUrl);
        toast({
          title: "Success!",
          description: "Vocals removed successfully!",
        });
      } else {
        throw new Error('Vocal removal failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove vocals. Please try again.",
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
      link.download = `vocals-removed-${file?.name || 'karaoke.mp3'}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Vocal Remover
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Create karaoke tracks by removing vocals from any song
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MicOff className="h-6 w-6 text-purple-500" />
                Remove Vocals
              </CardTitle>
              <CardDescription>
                Upload a song and our AI will remove the vocals, leaving the instrumental track
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
                    Supports: MP3, WAV, FLAC, AAC (works best with stereo files)
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

              <Button
                onClick={handleVocalRemoval}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
              >
                {isProcessing ? "Removing Vocals..." : "Remove Vocals"}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Vocals removed successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Karaoke
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                  💡 Pro Tips for Best Results:
                </h3>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Use stereo audio files for better vocal isolation</li>
                  <li>• Works best with center-panned vocals</li>
                  <li>• Some background vocals may remain</li>
                  <li>• Higher quality audio files give better results</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    AI-Powered
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Advanced algorithms for precise vocal isolation
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Karaoke Ready
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Perfect for creating karaoke tracks
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Output
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintains audio fidelity and instrumental clarity
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
