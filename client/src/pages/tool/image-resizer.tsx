import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Maximize2, Image as ImageIcon, CheckCircle } from "lucide-react";

export default function ImageResizer() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizeMode, setResizeMode] = useState("exact");
  const [processing, setProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const resizeImage = useMutation({
    mutationFn: async (data: { file: File; width: number; height: number; maintainRatio: boolean; mode: string }) => {
      const formData = new FormData();
      formData.append('image', data.file);
      formData.append('width', data.width.toString());
      formData.append('height', data.height.toString());
      formData.append('maintainAspectRatio', data.maintainRatio.toString());
      formData.append('resizeMode', data.mode);
      return apiRequest('/api/tools/image-resizer', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: (data: any) => {
      if (data.success) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.filename || 'resized-image.png';
        link.click();
        toast({
          title: "Image Resized Successfully!",
          description: `New dimensions: ${data.newWidth}x${data.newHeight}`,
        });
      }
      setProcessing(false);
    },
    onError: () => {
      toast({
        title: "Resize Failed",
        description: "Please try again with a valid image file",
        variant: "destructive",
      });
      setProcessing(false);
    }
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to resize images",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select an image file to resize",
        variant: "destructive",
      });
      return;
    }

    if (!width || !height) {
      toast({
        title: "Dimensions Required",
        description: "Please enter width and height",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    resizeImage.mutate({
      file: selectedFile,
      width: parseInt(width),
      height: parseInt(height),
      maintainRatio: maintainAspectRatio,
      mode: resizeMode
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Maximize2 className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Image Resizer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Resize images to any dimension while maintaining quality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interface */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Resize Image
                </CardTitle>
                <CardDescription>
                  Upload an image and set new dimensions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Select Image</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                {imagePreview && (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full max-h-64 object-contain mx-auto"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (pixels)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="1920"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (pixels)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="1080"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="aspect-ratio"
                      checked={maintainAspectRatio}
                      onCheckedChange={setMaintainAspectRatio}
                    />
                    <Label htmlFor="aspect-ratio">
                      Maintain aspect ratio
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Resize Mode</Label>
                    <Select value={resizeMode} onValueChange={setResizeMode}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exact">Exact dimensions</SelectItem>
                        <SelectItem value="fit">Fit within dimensions</SelectItem>
                        <SelectItem value="fill">Fill dimensions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleResize}
                  disabled={!selectedFile || !width || !height || processing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Resizing...
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4 mr-2" />
                      Resize Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Supported Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• JPEG (.jpg, .jpeg)</li>
                  <li>• PNG (.png)</li>
                  <li>• GIF (.gif)</li>
                  <li>• BMP (.bmp)</li>
                  <li>• WebP (.webp)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Quick Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setWidth("1920"); setHeight("1080"); }}
                  >
                    1920×1080
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setWidth("1280"); setHeight("720"); }}
                  >
                    1280×720
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setWidth("800"); setHeight("600"); }}
                  >
                    800×600
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setWidth("500"); setHeight("500"); }}
                  >
                    500×500
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}