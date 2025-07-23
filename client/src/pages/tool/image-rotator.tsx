import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const rotationOptions = [
  { value: "90", label: "90° Clockwise" },
  { value: "-90", label: "90° Counter-clockwise" },
  { value: "180", label: "180°" },
  { value: "270", label: "270° Clockwise" },
  { value: "flip-h", label: "Flip Horizontal" },
  { value: "flip-v", label: "Flip Vertical" },
];

export default function ImageRotatorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<string>("");
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

  const handleRotate = async () => {
    if (!file || !rotation) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('rotation', rotation);

      const response = await fetch('/api/tools/image-rotator', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Image rotated successfully.",
        });
      } else {
        throw new Error('Rotation failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rotate image. Please try again.",
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
      link.download = `${file?.name?.split('.')[0]}_rotated.${file?.name?.split('.').pop()}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Image Rotator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Rotate and flip your images with precise control
            </p>
          </div>

          {/* Main Tool */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCw className="h-6 w-6 text-orange-500" />
                Rotate & Flip Image
              </CardTitle>
              <CardDescription>
                Upload an image and select rotation or flip option
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

              {/* Rotation Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Rotation/Flip Option</label>
                <Select value={rotation} onValueChange={setRotation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rotation or flip option" />
                  </SelectTrigger>
                  <SelectContent>
                    {rotationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rotate Button */}
              <Button
                onClick={handleRotate}
                disabled={!file || !rotation || isProcessing}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                size="lg"
              >
                {isProcessing ? "Processing..." : "Apply Rotation"}
              </Button>

              {/* Download Result */}
              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Image processed successfully!</span>
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
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Options
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Rotate in any direction or flip horizontally/vertically
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Preserved
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    No quality loss during rotation or flipping
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Fast Processing
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Quick transformation with optimized algorithms
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