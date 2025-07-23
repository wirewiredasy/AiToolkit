
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, Combine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergeDirection, setMergeDirection] = useState("horizontal");
  const [spacing, setSpacing] = useState("0");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    const validFiles = uploadedFiles.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length > 0) {
      setFiles(validFiles);
      setResult(null);
    } else {
      toast({
        title: "Invalid Files",
        description: "Please select valid image files.",
        variant: "destructive",
      });
    }
  };

  const handleMergeImages = async () => {
    if (files.length < 2) {
      toast({
        title: "Not Enough Images",
        description: "Please select at least 2 images to merge.",
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
      formData.append('direction', mergeDirection);
      formData.append('spacing', spacing);
      formData.append('backgroundColor', backgroundColor);

      const response = await fetch('/api/tools/image-merge', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Images merged successfully!",
        });
      } else {
        throw new Error('Image merge failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to merge images. Please try again.",
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
      link.download = `merged_image_${Date.now()}.jpg`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Image Merger Tool
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Combine multiple images into one with customizable layout options
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Combine className="h-6 w-6 text-purple-500" />
                Merge Images
              </CardTitle>
              <CardDescription>
                Select multiple images and configure merge settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Click to upload images to merge
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Select 2 or more images (JPG, PNG, GIF, WEBP)
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">{files.length} images selected</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {files.map(file => file.name).join(", ")}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="direction">Merge Direction</Label>
                  <Select value={mergeDirection} onValueChange={setMergeDirection}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="horizontal">Horizontal (Side by Side)</SelectItem>
                      <SelectItem value="vertical">Vertical (Top to Bottom)</SelectItem>
                      <SelectItem value="grid">Grid Layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spacing">Spacing (px)</Label>
                  <Input
                    id="spacing"
                    type="number"
                    value={spacing}
                    onChange={(e) => setSpacing(e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="bg-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>

              <Button
                onClick={handleMergeImages}
                disabled={files.length < 2 || isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
              >
                {isProcessing ? "Merging Images..." : "Merge Images"}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Images merged successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Flexible Layout
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Horizontal, vertical, or grid arrangements
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Custom Spacing
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Control spacing between merged images
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Background Control
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Set custom background colors
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
