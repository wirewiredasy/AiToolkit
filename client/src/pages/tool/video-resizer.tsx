import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const presetSizes = [
  { value: "720p", label: "720p (1280x720)", width: 1280, height: 720 },
  { value: "1080p", label: "1080p (1920x1080)", width: 1920, height: 1080 },
  { value: "4K", label: "4K (3840x2160)", width: 3840, height: 2160 },
  { value: "instagram", label: "Instagram Square (1080x1080)", width: 1080, height: 1080 },
  { value: "youtube", label: "YouTube (1920x1080)", width: 1920, height: 1080 },
  { value: "tiktok", label: "TikTok (1080x1920)", width: 1080, height: 1920 },
  { value: "custom", label: "Custom Size", width: 0, height: 0 },
];

export default function VideoResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState("1080p");
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith('video/')) {
      setFile(uploadedFile);
      setResult(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid video file.",
        variant: "destructive",
      });
    }
  };

  const handleResize = async () => {
    if (!file) return;

    const selectedPreset = presetSizes.find(p => p.value === preset);
    let width = selectedPreset?.width || parseInt(customWidth);
    let height = selectedPreset?.height || parseInt(customHeight);

    if (preset === "custom" && (!customWidth || !customHeight || width <= 0 || height <= 0)) {
      toast({
        title: "Invalid Dimensions",
        description: "Please enter valid width and height values.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('width', width.toString());
      formData.append('height', height.toString());

      const response = await fetch('/api/tools/video-resizer', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: `Video resized to ${width}x${height} successfully.`,
        });
      } else {
        throw new Error('Resize failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resize video. Please try again.",
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
      const selectedPreset = presetSizes.find(p => p.value === preset);
      const width = selectedPreset?.width || parseInt(customWidth);
      const height = selectedPreset?.height || parseInt(customHeight);
      link.download = `${file?.name?.split('.')[0]}_${width}x${height}.mp4`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Video Resizer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Resize your videos to different dimensions and aspect ratios
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-6 w-6 text-purple-500" />
                Resize Video
              </CardTitle>
              <CardDescription>
                Upload a video file and choose the output dimensions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Click to upload video file
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports: MP4, AVI, MOV, WMV, FLV
                  </p>
                </label>
              </div>

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

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Output Size</Label>
                  <Select value={preset} onValueChange={setPreset}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select output size" />
                    </SelectTrigger>
                    <SelectContent>
                      {presetSizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {preset === "custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                        placeholder="1920"
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                        placeholder="1080"
                        min="1"
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleResize}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
              >
                {isProcessing ? "Resizing Video..." : "Resize Video"}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Video resized successfully!</span>
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
                    Smart Scaling
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintains aspect ratio or scales to exact dimensions
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Platform Presets
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Optimized sizes for YouTube, Instagram, TikTok
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Preserved
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Advanced algorithms maintain video quality
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
import { Monitor } from "lucide-react";

export default function VideoResizerPage() {
  return (
    <ToolTemplate
      toolId="video-resizer"
      toolName="Video Resizer"
      description="Resize videos to different dimensions and aspect ratios. Perfect for social media, web, or device-specific requirements."
      icon={<Monitor className="h-8 w-8 text-white" />}
      acceptedFiles={{ "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv", ".webm"] }}
      maxFileSize={1000 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "resizeMode",
          label: "Resize Mode",
          type: "select",
          options: ["Preset Dimensions", "Custom Size", "Aspect Ratio", "Scale Percentage"],
          defaultValue: "Preset Dimensions",
          required: true,
          description: "Method for resizing video"
        },
        {
          key: "presetSize",
          label: "Preset Size",
          type: "select",
          options: ["1920x1080 (Full HD)", "1280x720 (HD)", "854x480 (SD)", "640x360", "1080x1920 (Vertical)", "720x1280 (Vertical)", "Custom"],
          defaultValue: "1280x720 (HD)",
          description: "Standard video dimensions"
        },
        {
          key: "aspectRatio",
          label: "Aspect Ratio",
          type: "select",
          options: ["16:9", "4:3", "1:1", "9:16", "21:9", "Original"],
          defaultValue: "16:9",
          description: "Video aspect ratio"
        },
        {
          key: "scalePercentage",
          label: "Scale Percentage",
          type: "select",
          options: ["25%", "50%", "75%", "125%", "150%", "200%"],
          defaultValue: "100%",
          description: "Scale video by percentage"
        },
        {
          key: "maintainQuality",
          label: "Maintain Quality",
          type: "switch",
          defaultValue: true,
          description: "Preserve video quality during resize"
        },
        {
          key: "cropMode",
          label: "Crop Mode",
          type: "select",
          options: ["Letterbox", "Crop", "Stretch", "Smart Crop"],
          defaultValue: "Letterbox",
          description: "How to handle aspect ratio changes"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["MP4", "AVI", "MOV", "WEBM"],
          defaultValue: "MP4",
          description: "Output video format"
        }
      ]}
      endpoint="/api/tools/video-resizer"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}
