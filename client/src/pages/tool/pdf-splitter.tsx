import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Scissors, FileText, CheckCircle } from "lucide-react";

export default function PDFSplitter() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageRanges, setPageRanges] = useState("");
  const [processing, setProcessing] = useState(false);

  const splitPDF = useMutation({
    mutationFn: async (data: { file: File; ranges: string }) => {
      const formData = new FormData();
      formData.append('pdf', data.file);
      formData.append('pageRanges', data.ranges);
      return apiRequest('/api/tools/pdf-splitter', {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: (data: any) => {
      if (data.success) {
        // Download zip file with split PDFs
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.filename || 'split-pdfs.zip';
        link.click();
        toast({
          title: "PDF Split Successfully!",
          description: `Created ${data.fileCount} PDF files`,
        });
      }
      setProcessing(false);
    },
    onError: () => {
      toast({
        title: "Split Failed",
        description: "Please check your page ranges and try again",
        variant: "destructive",
      });
      setProcessing(false);
    }
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSplit = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to split PDF",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a PDF file to split",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    splitPDF.mutate({ file: selectedFile, ranges: pageRanges });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Scissors className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              PDF Splitter
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Split PDF files into separate pages or page ranges
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interface */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload & Split PDF
                </CardTitle>
                <CardDescription>
                  Upload PDF and specify page ranges to split
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pdf-upload">Select PDF File</Label>
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="page-ranges">Page Ranges (Optional)</Label>
                  <Textarea
                    id="page-ranges"
                    placeholder="Leave empty to split all pages individually. Or specify ranges like: 1-3, 5, 7-10"
                    value={pageRanges}
                    onChange={(e) => setPageRanges(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Examples: "1-5" (pages 1 to 5), "1,3,5" (pages 1, 3, and 5), "1-3,7-10" (multiple ranges)
                  </p>
                </div>

                <Button
                  onClick={handleSplit}
                  disabled={!selectedFile || processing}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Splitting...
                    </>
                  ) : (
                    <>
                      <Scissors className="w-4 h-4 mr-2" />
                      Split PDF
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
                <CardTitle className="text-lg">Split Options</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Split by individual pages</li>
                  <li>• Split by page ranges</li>
                  <li>• Multiple range selection</li>
                  <li>• Batch download as ZIP</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Usage Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>All pages:</strong> Leave ranges empty</div>
                  <div><strong>First 5 pages:</strong> 1-5</div>
                  <div><strong>Specific pages:</strong> 1,3,5,7</div>
                  <div><strong>Multiple ranges:</strong> 1-3,8-10</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}