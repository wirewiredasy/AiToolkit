import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, Download, CheckCircle, Crop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageCropperPage() {
  const [file, setFile] = useState<File | null>(null);
  const [cropParams, setCropParams] = useState({ x: 0, y: 0, width: 200, height: 200 });
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

  const handleCrop = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('x', cropParams.x.toString());
      formData.append('y', cropParams.y.toString());
      formData.append('width', cropParams.width.toString());
      formData.append('height', cropParams.height.toString());

      const response = await fetch('/api/tools/image-cropper', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Image cropped successfully.",
        });
      } else {
        throw new Error('Cropping failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to crop image. Please try again.",
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
      link.download = `${file?.name?.split('.')[0]}_cropped.${file?.name?.split('.').pop()}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Image Cropper
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Crop your images to specific dimensions and positions
            </p>
          </div>

          {/* Main Tool */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crop className="h-6 w-6 text-purple-500" />
                Crop Image
              </CardTitle>
              <CardDescription>
                Upload an image and specify crop parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
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
                    Supports all common image formats
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

              {/* Crop Parameters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="x-position">X Position</Label>
                  <Input
                    id="x-position"
                    type="number"
                    value={cropParams.x}
                    onChange={(e) => setCropParams({...cropParams, x: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="y-position">Y Position</Label>
                  <Input
                    id="y-position"
                    type="number"
                    value={cropParams.y}
                    onChange={(e) => setCropParams({...cropParams, y: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={cropParams.width}
                    onChange={(e) => setCropParams({...cropParams, width: parseInt(e.target.value) || 200})}
                    placeholder="200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={cropParams.height}
                    onChange={(e) => setCropParams({...cropParams, height: parseInt(e.target.value) || 200})}
                    placeholder="200"
                  />
                </div>
              </div>

              {/* Crop Button */}
              <Button
                onClick={handleCrop}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
              >
                {isProcessing ? "Cropping..." : "Crop Image"}
              </Button>

              {/* Download Result */}
              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Image cropped successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Precise Control
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Specify exact coordinates and dimensions for cropping
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Preserved
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintains original image quality in cropped area
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