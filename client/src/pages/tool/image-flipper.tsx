import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, FlipHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const flipDirections = [
  { value: "horizontal", label: "Horizontal" },
  { value: "vertical", label: "Vertical" },
  { value: "both", label: "Both" },
];

export default function ImageFlipperPage() {
  const [file, setFile] = useState<File | null>(null);
  const [direction, setDirection] = useState<string>("horizontal");
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

  const handleFlip = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('direction', direction);

      const response = await fetch('/api/tools/image-flipper', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Image flipped successfully.",
        });
      } else {
        throw new Error('Flip failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to flip image. Please try again.",
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
      link.download = `${file?.name?.split('.')[0]}_flipped.${file?.name?.split('.').pop()}`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Image Flipper
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Flip your images horizontally, vertically, or both
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlipHorizontal className="h-6 w-6 text-orange-500" />
                Flip Image
              </CardTitle>
              <CardDescription>
                Upload an image and choose flip direction
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
                <label className="text-sm font-medium">Flip Direction</label>
                <Select value={direction} onValueChange={setDirection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select flip direction" />
                  </SelectTrigger>
                  <SelectContent>
                    {flipDirections.map((dir) => (
                      <SelectItem key={dir.value} value={dir.value}>
                        {dir.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleFlip}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                size="lg"
              >
                {isProcessing ? "Flipping..." : "Flip Image"}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Image flipped successfully!</span>
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