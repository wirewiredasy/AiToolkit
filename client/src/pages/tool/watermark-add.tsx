import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FileUp, Download, CheckCircle, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const positions = [
  { value: "top-left", label: "Top Left" },
  { value: "top-center", label: "Top Center" },
  { value: "top-right", label: "Top Right" },
  { value: "center-left", label: "Center Left" },
  { value: "center", label: "Center" },
  { value: "center-right", label: "Center Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" },
];

export default function WatermarkAddPage() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("Watermark");
  const [position, setPosition] = useState("bottom-right");
  const [opacity, setOpacity] = useState([50]);
  const [fontSize, setFontSize] = useState([24]);
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

  const handleAddWatermark = async () => {
    if (!file || !watermarkText.trim()) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('text', watermarkText);
      formData.append('position', position);
      formData.append('opacity', opacity[0].toString());
      formData.append('fontSize', fontSize[0].toString());

      const response = await fetch('/api/tools/watermark-add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Watermark added successfully.",
        });
      } else {
        throw new Error('Watermark failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add watermark. Please try again.",
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
      link.download = `${file?.name?.split('.')[0]}_watermarked.${file?.name?.split('.').pop()}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Watermark Adder
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Add custom text watermarks to your images
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-6 w-6 text-slate-500" />
                Add Watermark
              </CardTitle>
              <CardDescription>
                Upload an image and customize your watermark settings
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

              <div className="space-y-2">
                <Label htmlFor="watermark-text">Watermark Text</Label>
                <Input
                  id="watermark-text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                />
              </div>

              <div className="space-y-2">
                <Label>Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Opacity</Label>
                    <span className="text-sm font-medium">{opacity[0]}%</span>
                  </div>
                  <Slider
                    value={opacity}
                    onValueChange={setOpacity}
                    max={100}
                    min={10}
                    step={5}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Font Size</Label>
                    <span className="text-sm font-medium">{fontSize[0]}px</span>
                  </div>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    max={100}
                    min={12}
                    step={2}
                  />
                </div>
              </div>

              <Button
                onClick={handleAddWatermark}
                disabled={!file || !watermarkText.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600"
                size="lg"
              >
                {isProcessing ? "Adding Watermark..." : "Add Watermark"}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Watermark added successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}