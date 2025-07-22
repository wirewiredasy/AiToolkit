import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Sparkles, CheckCircle } from "lucide-react";

export default function PhotoEnhancer() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [enhanceMode, setEnhanceMode] = useState("auto");
  const [processing, setProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const enhancePhoto = useMutation({
    mutationFn: async (data: { file: File; mode: string }) => {
      const formData = new FormData();
      formData.append('image', data.file);
      formData.append('enhanceMode', data.mode);
      return apiRequest('/api/tools/photo-enhancer', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: (data: any) => {
      if (data.success) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.filename || 'enhanced-photo.png';
        link.click();
        toast({
          title: "Photo Enhanced!",
          description: "Photo has been enhanced using AI",
        });
      }
      setProcessing(false);
    },
    onError: () => {
      toast({
        title: "Enhancement Failed",
        description: "Please try again with a valid image",
        variant: "destructive",
      });
      setProcessing(false);
    }
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEnhance = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to enhance photos",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a photo to enhance",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    enhancePhoto.mutate({ file: selectedFile, mode: enhanceMode });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-amber-900 dark:to-yellow-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              AI Photo Enhancer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Enhance photo quality using advanced AI algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Enhance Photo
                </CardTitle>
                <CardDescription>
                  Upload a photo to enhance its quality automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="photo-upload">Select Photo</Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
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

                <div className="space-y-2">
                  <Label>Enhancement Mode</Label>
                  <Select value={enhanceMode} onValueChange={setEnhanceMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Enhance</SelectItem>
                      <SelectItem value="upscale">Upscale & Enhance</SelectItem>
                      <SelectItem value="denoise">Noise Reduction</SelectItem>
                      <SelectItem value="sharpen">Sharpen & Clarify</SelectItem>
                      <SelectItem value="color">Color Enhancement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleEnhance}
                  disabled={!selectedFile || processing}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Enhancing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enhance Photo
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Enhancement Modes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Auto:</strong> Automatic optimization</li>
                  <li>• <strong>Upscale:</strong> Increase resolution</li>
                  <li>• <strong>Denoise:</strong> Remove grain/noise</li>
                  <li>• <strong>Sharpen:</strong> Improve clarity</li>
                  <li>• <strong>Color:</strong> Enhance colors</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}