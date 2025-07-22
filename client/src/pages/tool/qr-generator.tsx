import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { QrCode, Download, CheckCircle } from "lucide-react";

export default function QRGenerator() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [inputText, setInputText] = useState("");
  const [qrSize, setQrSize] = useState("300");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [processing, setProcessing] = useState(false);
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);

  const generateQR = useMutation({
    mutationFn: async (data: { text: string; size: number; color: string; bgColor: string }) => {
      return apiRequest('/api/tools/qr-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data: any) => {
      if (data.success) {
        setGeneratedQR(data.qrCodeUrl);
        toast({
          title: "QR Code Generated!",
          description: "Your QR code has been created successfully",
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
        description: "Please log in to generate QR codes",
        variant: "destructive",
      });
      return;
    }

    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter text or URL to generate QR code",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    generateQR.mutate({
      text: inputText,
      size: parseInt(qrSize),
      color: qrColor,
      bgColor: bgColor
    });
  };

  const downloadQR = () => {
    if (generatedQR) {
      const link = document.createElement('a');
      link.href = generatedQR;
      link.download = 'qr-code.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <QrCode className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              QR Code Generator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Generate custom QR codes for URLs, text, and more
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Generate QR Code</CardTitle>
                <CardDescription>
                  Enter your text, URL, or data to create a QR code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Text or URL</Label>
                  <Textarea
                    id="input-text"
                    placeholder="Enter text, URL, or data here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Size (px)</Label>
                    <Select value={qrSize} onValueChange={setQrSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="200">200x200</SelectItem>
                        <SelectItem value="300">300x300</SelectItem>
                        <SelectItem value="400">400x400</SelectItem>
                        <SelectItem value="500">500x500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>QR Color</Label>
                    <Input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!inputText || processing}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate QR Code
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
                  Your generated QR code will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedQR ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <img
                        src={generatedQR}
                        alt="Generated QR Code"
                        className="border rounded-lg"
                        style={{ width: parseInt(qrSize), height: parseInt(qrSize) }}
                      />
                    </div>
                    <Button onClick={downloadQR} className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download QR Code
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <QrCode className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">QR code will appear here</p>
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