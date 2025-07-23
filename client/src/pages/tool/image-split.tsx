
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState("grid");
  const [rows, setRows] = useState("2");
  const [columns, setColumns] = useState("2"); 
  const [overlap, setOverlap] = useState("0");
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile(uploadedFile);
      setResults([]);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleSplitImage = async () => {
    if (!file) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to split.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mode', splitMode);
      formData.append('rows', rows);
      formData.append('columns', columns);
      formData.append('overlap', overlap);

      const response = await fetch('/api/tools/image-split', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.images);
        toast({
          title: "Success!",
          description: `Image split into ${data.images.length} parts!`,
        });
      } else {
        throw new Error('Image split failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to split image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = () => {
    results.forEach((url, index) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `split_${index + 1}_${Date.now()}.jpg`;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Image Splitter Tool
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Split large images into smaller parts with grid or custom patterns
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-6 w-6 text-red-500" />
                Split Image
              </CardTitle>
              <CardDescription>
                Upload an image and configure splitting options
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
                    Click to upload image to split
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
                <div className="space-y-2">
                  <Label htmlFor="split-mode">Split Mode</Label>
                  <Select value={splitMode} onValueChange={setSplitMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid Split</SelectItem>
                      <SelectItem value="horizontal">Horizontal Strips</SelectItem>
                      <SelectItem value="vertical">Vertical Strips</SelectItem>
                      <SelectItem value="quadrants">Quadrants (2x2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {splitMode === "grid" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rows">Rows</Label>
                      <Input
                        id="rows"
                        type="number"
                        value={rows}
                        onChange={(e) => setRows(e.target.value)}
                        min="1"
                        max="10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="columns">Columns</Label>
                      <Input
                        id="columns"
                        type="number"
                        value={columns}
                        onChange={(e) => setColumns(e.target.value)}
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="overlap">Overlap (px)</Label>
                  <Input
                    id="overlap"
                    type="number"
                    value={overlap}
                    onChange={(e) => setOverlap(e.target.value)}
                    min="0"
                    max="50"
                    placeholder="0"
                  />
                </div>
              </div>

              <Button
                onClick={handleSplitImage}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                size="lg"
              >
                {isProcessing ? "Splitting Image..." : "Split Image"}
              </Button>

              {results.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">{results.length} parts created</span>
                    </div>
                    <Button onClick={downloadAll} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {results.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={url} 
                          alt={`Split ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `split_${index + 1}.jpg`;
                              link.click();
                            }}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Modes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Grid, horizontal, vertical splits
                  </p>
                </div>
                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Custom Overlap
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Add overlap between split parts
                  </p>
                </div>
                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Batch Download
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Download all parts at once
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
