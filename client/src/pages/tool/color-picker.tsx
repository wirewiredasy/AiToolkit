
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, Download, CheckCircle, Pipette, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ColorPickerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [colors, setColors] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile(uploadedFile);
      const url = URL.createObjectURL(uploadedFile);
      setImageUrl(url);
      setColors([]);
      setSelectedColor(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const extractColors = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/tools/color-picker', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setColors(data.colors);
        toast({
          title: "Success!",
          description: `Extracted ${data.colors.length} dominant colors!`,
        });
      } else {
        throw new Error('Color extraction failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract colors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `Color ${color} copied to clipboard`,
    });
  };

  const downloadPalette = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    if (ctx && colors.length > 0) {
      const colorWidth = canvas.width / colors.length;
      colors.forEach((color, index) => {
        ctx.fillStyle = color.hex;
        ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height);
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `color_palette_${Date.now()}.png`;
          link.click();
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Color Picker Tool
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Extract dominant colors from images and get color codes
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pipette className="h-6 w-6 text-orange-500" />
                Extract Colors
              </CardTitle>
              <CardDescription>
                Upload an image to extract its dominant colors
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
                    Click to upload image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports: JPG, PNG, GIF, WEBP
                  </p>
                </label>
              </div>

              {imageUrl && (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Image uploaded successfully</span>
                    </div>
                    <img 
                      src={imageUrl} 
                      alt="Uploaded" 
                      className="max-w-full h-40 object-contain mx-auto rounded"
                    />
                  </div>

                  <Button
                    onClick={extractColors}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                    size="lg"
                  >
                    {isProcessing ? "Extracting Colors..." : "Extract Colors"}
                  </Button>
                </div>
              )}

              {colors.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Extracted Colors ({colors.length})</h3>
                    <Button onClick={downloadPalette} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Palette
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {colors.map((color, index) => (
                      <div 
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedColor(color.hex)}
                      >
                        <div 
                          className="w-full h-16 rounded mb-2"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{color.hex}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyColor(color.hex);
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            HSL({color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedColor && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Selected Color: {selectedColor}</h4>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => copyColor(selectedColor)} 
                          variant="outline" 
                          size="sm"
                        >
                          Copy HEX
                        </Button>
                        <Button 
                          onClick={() => {
                            const color = colors.find(c => c.hex === selectedColor);
                            if (color) {
                              copyColor(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`);
                            }
                          }}
                          variant="outline" 
                          size="sm"
                        >
                          Copy RGB
                        </Button>
                        <Button 
                          onClick={() => {
                            const color = colors.find(c => c.hex === selectedColor);
                            if (color) {
                              copyColor(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`);
                            }
                          }}
                          variant="outline" 
                          size="sm"
                        >
                          Copy HSL
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Dominant Colors
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Extract the most prominent colors from any image
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Formats
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get HEX, RGB, and HSL color codes
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Export Palette
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Download color palette as image
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
