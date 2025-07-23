import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { FileUp, Download, CheckCircle, Focus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageSharpenPage() {
  const [file, setFile] = useState<File | null>(null);
  const [sharpenIntensity, setSharpenIntensity] = useState([50]);
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
      formData.append('intensity', sharpenIntensity[0].toString());

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
        throw new Error('Sharpen failed');
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
              Enhance image clarity and detail with precision sharpening
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
                    Supports: JPG, PNG, GIF, WEBP
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
                <div className="flex justify-between items-center">
                  <Label>Sharpening Intensity</Label>
                  <span className="text-sm font-medium">{sharpenIntensity[0]}%</span>
                </div>
                <Slider
                  value={sharpenIntensity}
                  onValueChange={setSharpenIntensity}
                  max={200}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>No Sharpening</span>
                  <span>Maximum Sharpening</span>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Recommended: 50-100% for photos, 25-75% for graphics. Higher values may create artifacts.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSharpen}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-slate-500 to-zinc-500 hover:from-slate-600 hover:to-zinc-600"
                size="lg"
              >
                {isProcessing ? "Sharpening..." : `Apply ${sharpenIntensity[0]}% Sharpening`}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Image sharpened successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4 mt-8">
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
import { ToolTemplate } from "@/components/ui/tool-template";
import { Focus } from "lucide-react";

export default function ImageSharpenPage() {
  return (
    <ToolTemplate
      toolId="image-sharpen"
      toolName="Image Sharpener"
      description="Enhance image sharpness and clarity. Apply advanced sharpening algorithms to make your images crisp and detailed."
      icon={<Focus className="h-8 w-8 text-white" />}
      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "sharpenMethod",
          label: "Sharpening Method",
          type: "select",
          options: ["Unsharp Mask", "Smart Sharpen", "High Pass", "Clarity", "Structure"],
          defaultValue: "Unsharp Mask",
          required: true,
          description: "Algorithm for sharpening"
        },
        {
          key: "intensity",
          label: "Sharpening Intensity",
          type: "select",
          options: ["Very Light", "Light", "Medium", "Strong", "Very Strong"],
          defaultValue: "Medium",
          description: "Strength of sharpening effect"
        },
        {
          key: "radius",
          label: "Sharpen Radius",
          type: "select",
          options: ["0.5", "1.0", "1.5", "2.0", "2.5", "3.0"],
          defaultValue: "1.0",
          description: "Radius of sharpening effect"
        },
        {
          key: "threshold",
          label: "Edge Threshold",
          type: "select",
          options: ["0", "5", "10", "15", "20", "25"],
          defaultValue: "10",
          description: "Threshold for edge detection"
        },
        {
          key: "preserveDetails",
          label: "Preserve Fine Details",
          type: "switch",
          defaultValue: true,
          description: "Protect fine textures from over-sharpening"
        },
        {
          key: "noiseReduction",
          label: "Noise Reduction",
          type: "switch",
          defaultValue: false,
          description: "Reduce noise while sharpening"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["JPEG", "PNG", "WEBP"],
          defaultValue: "JPEG",
          description: "Output image format"
        }
      ]}
      endpoint="/api/tools/image-sharpen"
      gradientFrom="from-emerald-500"
      gradientTo="to-teal-600"
    />
  );
}
