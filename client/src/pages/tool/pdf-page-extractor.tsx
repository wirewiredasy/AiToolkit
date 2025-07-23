import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, Download, CheckCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PDFPageExtractorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageNumbers, setPageNumbers] = useState("");
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

  const handleExtract = async () => {
    if (!file || !pageNumbers.trim()) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pages', pageNumbers);

      const response = await fetch('/api/tools/pdf-page-extractor', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResult(url);
        toast({
          title: "Success!",
          description: "Pages extracted successfully.",
        });
      } else {
        throw new Error('Extraction failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract pages. Please try again.",
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
      link.download = `${file?.name?.replace('.pdf', '')}_extracted_pages.pdf`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PDF Page Extractor
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Extract specific pages from your PDF documents
            </p>
          </div>

          {/* Main Tool */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-500" />
                Extract PDF Pages
              </CardTitle>
              <CardDescription>
                Select a PDF file and specify which pages to extract
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

              {/* Page Selection */}
              <div className="space-y-2">
                <Label htmlFor="page-numbers">Page Numbers</Label>
                <Input
                  id="page-numbers"
                  placeholder="e.g., 1,3-5,7,10-12"
                  value={pageNumbers}
                  onChange={(e) => setPageNumbers(e.target.value)}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter page numbers separated by commas. Use hyphens for ranges (e.g., 1-5).
                </p>
              </div>

              {/* Extract Button */}
              <Button
                onClick={handleExtract}
                disabled={!file || !pageNumbers.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                size="lg"
              >
                {isProcessing ? "Extracting..." : "Extract Pages"}
              </Button>

              {/* Download Result */}
              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Pages extracted successfully!</span>
                    </div>
                    <Button onClick={downloadFile} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Flexible Selection
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Extract individual pages or page ranges easily
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Preserved
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Maintains original page quality and formatting
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