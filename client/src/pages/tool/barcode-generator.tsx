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
import { BarChart3, Download, CheckCircle } from "lucide-react";

export default function BarcodeGenerator() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [inputText, setInputText] = useState("");
  const [barcodeType, setBarcodeType] = useState("CODE128");
  const [width, setWidth] = useState("300");
  const [height, setHeight] = useState("100");
  const [processing, setProcessing] = useState(false);
  const [generatedBarcode, setGeneratedBarcode] = useState<string | null>(null);

  const generateBarcode = useMutation({
    mutationFn: async (data: { text: string; type: string; width: number; height: number }) => {
      return apiRequest('/api/tools/barcode-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data: any) => {
      if (data.success) {
        setGeneratedBarcode(data.barcodeUrl);
        toast({
          title: "Barcode Generated!",
          description: "Your barcode has been created successfully",
        });
      }
      setProcessing(false);
    },
    onError: () => {
      toast({
        title: "Generation Failed",
        description: "Please try again with valid input",
        variant: "destructive",
      });
      setProcessing(false);
    }
  });

  const handleGenerate = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to generate barcodes",
        variant: "destructive",
      });
      return;
    }

    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter text or numbers to generate barcode",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    generateBarcode.mutate({
      text: inputText,
      type: barcodeType,
      width: parseInt(width),
      height: parseInt(height)
    });
  };

  const downloadBarcode = () => {
    if (generatedBarcode) {
      const link = document.createElement('a');
      link.href = generatedBarcode;
      link.download = 'barcode.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <BarChart3 className="w-6 h-6 text-slate-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
              Barcode Generator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Generate various types of barcodes for products and inventory
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Generate Barcode</CardTitle>
                <CardDescription>
                  Enter text or numbers to create a barcode
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Text or Numbers</Label>
                  <Input
                    id="input-text"
                    placeholder="Enter text or numbers..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Barcode Type</Label>
                  <Select value={barcodeType} onValueChange={setBarcodeType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CODE128">CODE128</SelectItem>
                      <SelectItem value="CODE39">CODE39</SelectItem>
                      <SelectItem value="EAN13">EAN-13</SelectItem>
                      <SelectItem value="EAN8">EAN-8</SelectItem>
                      <SelectItem value="UPC">UPC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Width (px)</Label>
                    <Select value={width} onValueChange={setWidth}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="200">200</SelectItem>
                        <SelectItem value="300">300</SelectItem>
                        <SelectItem value="400">400</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Height (px)</Label>
                    <Select value={height} onValueChange={setHeight}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">60</SelectItem>
                        <SelectItem value="80">80</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="120">120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!inputText || processing}
                  className="w-full bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Generate Barcode
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  Your generated barcode will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedBarcode ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <img
                        src={generatedBarcode}
                        alt="Generated Barcode"
                        className="border rounded-lg bg-white"
                      />
                    </div>
                    <Button onClick={downloadBarcode} className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Barcode
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">Barcode will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}