import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Download, CheckCircle, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const positions = [
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-center", label: "Top Center" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
];

export default function PDFPageNumbererPage() {
  const [file, setFile] = useState<File | null>(null);
  const [startNumber, setStartNumber] = useState("1");
  const [position, setPosition] = useState("bottom-center");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setResult(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleAddNumbers = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('startNumber', startNumber);
      formData.append('position', position);

      const response = await fetch('/api/tools/pdf-page-numberer', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Page numbers added successfully.",
        });
      } else {
        throw new Error('Page numbering failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add page numbers. Please try again.",
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
      link.download = `${file?.name?.replace('.pdf', '')}_numbered.pdf`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF Page Numberer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Add page numbers to your PDF documents automatically
            </p>
          </div>

          {/* Main Tool */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-6 w-6 text-emerald-500" />
                Add Page Numbers
              </CardTitle>
              <CardDescription>
                Upload a PDF file and customize page numbering options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Click to upload PDF file
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Maximum file size: 10MB
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

              {/* Numbering Options */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-number">Starting Number</Label>
                  <Input
                    id="start-number"
                    type="number"
                    value={startNumber}
                    onChange={(e) => setStartNumber(e.target.value)}
                    placeholder="1"
                    min="1"
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
              </div>

              {/* Add Numbers Button */}
              <Button
                onClick={handleAddNumbers}
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                size="lg"
              >
                {isProcessing ? "Adding Page Numbers..." : "Add Page Numbers"}
              </Button>

              {/* Download Result */}
              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Page numbers added successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Custom Position
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Choose where to place page numbers on each page
                  </p>
                </div>
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Starting Number
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Set any starting number for your page sequence
                  </p>
                </div>
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Professional Output
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Clean, readable page numbers that don't interfere with content
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