import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { FileUp, Download, CheckCircle, Focus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageSharpenPage() {
  const [file, setFile] = useState<File | null>(null);
  const [intensity, setIntensity] = useState([50]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile(uploadedFile);
      setResult(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleSharpen = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('intensity', intensity[0].toString());

      const response = await fetch('/api/tools/image-sharpen', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Image sharpened successfully.",
        });
      } else {
        throw new Error('Sharpening failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sharpen image. Please try again.",
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
      link.download = `${file?.name?.split('.')[0]}_sharpened.${file?.name?.split('.').pop()}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Image Sharpener
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enhance image sharpness and clarity with advanced algorithms
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Focus className="h-6 w-6 text-slate-500" />
                Sharpen Image
              </CardTitle>
              <CardDescription>
                Upload an image and adjust the sharpening intensity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Click to upload image file
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports: JPG, PNG, GIF, WEBP, BMP
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
                  <label className="text-sm font-medium">Sharpening Intensity: {intensity[0]}%</label>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Subtle</span>
                    <span>Intense</span>
                  </div>
                </div>

                <Button
                  onClick={handleSharpen}
                  disabled={!file || isProcessing}
                  className="w-full bg-slate-500 hover:bg-slate-600"
                >
                  {isProcessing ? "Processing..." : "Sharpen Image"}
                </Button>

                {result && (
                  <Button
                    onClick={downloadFile}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Sharpened Image
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
                <div className="bg-gradient-to-r from-slate-500/10 to-zinc-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Edge Enhancement
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Selectively enhances edges while preserving smooth areas
                  </p>
                </div>
                <div className="bg-gradient-to-r from-slate-500/10 to-zinc-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Detail Recovery
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Brings out fine details in photos and graphics
                  </p>
                </div>
                <div className="bg-gradient-to-r from-slate-500/10 to-zinc-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Smart Processing
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Advanced algorithms prevent over-sharpening artifacts
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