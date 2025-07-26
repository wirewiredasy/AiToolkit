import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Download, FileCheck } from 'lucide-react';

export default function TestDownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadResult, setDownloadResult] = useState<string>('');
  const { toast } = useToast();

  const testDirectDownload = async () => {
    setIsDownloading(true);
    setDownloadResult('');
    
    try {
      // First create a test file by calling the PDF merger API
      const formData = new FormData();
      formData.append('metadata', JSON.stringify({ text: 'Test PDF Generation' }));
      
      const response = await fetch('/api/tools/pdf-merger', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      console.log('API Response:', result);
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      // Now test the download
      const downloadResponse = await fetch(result.downloadUrl);
      console.log('Download Response Status:', downloadResponse.status);
      console.log('Download Response Headers:');
      downloadResponse.headers.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      
      if (!downloadResponse.ok) {
        throw new Error(`Download failed with status: ${downloadResponse.status}`);
      }
      
      const blob = await downloadResponse.blob();
      console.log('Blob type:', blob.type, 'Blob size:', blob.size);
      
      // Read the first few bytes to check content
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const first20Bytes = Array.from(uint8Array.slice(0, 20))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ');
      
      console.log('First 20 bytes (hex):', first20Bytes);
      
      const textDecoder = new TextDecoder();
      const firstText = textDecoder.decode(uint8Array.slice(0, 50));
      console.log('First 50 chars as text:', firstText);
      
      setDownloadResult(`
        ✅ Download successful!
        - File size: ${blob.size} bytes
        - MIME type: ${blob.type}
        - First bytes (hex): ${first20Bytes}
        - First text: ${firstText}
        - Is PDF: ${firstText.startsWith('%PDF')}
      `);
      
      // Trigger actual download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename || 'test-file.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Test Download Complete",
        description: "Check the browser downloads folder",
      });
      
    } catch (error) {
      console.error('Test download error:', error);
      setDownloadResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      toast({
        title: "Test Failed",
        description: "Check console for details",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const testMultipleFormats = async () => {
    setIsDownloading(true);
    setDownloadResult('Testing multiple formats...\n\n');
    
    const testCases = [
      { endpoint: 'pdf-merger', expectedType: 'application/pdf', category: 'PDF' },
      { endpoint: 'bg-remover', expectedType: 'image/png', category: 'Image' },
      { endpoint: 'json-formatter', expectedType: 'application/json', category: 'Developer' },
      { endpoint: 'audio-converter', expectedType: 'audio/mpeg', category: 'Audio/Video' }
    ];
    
    for (const testCase of testCases) {
      try {
        const formData = new FormData();
        formData.append('metadata', JSON.stringify({ text: `Test ${testCase.category}` }));
        
        const response = await fetch(`/api/tools/${testCase.endpoint}`, {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          const downloadResponse = await fetch(result.downloadUrl);
          const blob = await downloadResponse.blob();
          const arrayBuffer = await blob.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const first10Bytes = Array.from(uint8Array.slice(0, 10))
            .map(b => b.toString(16).padStart(2, '0'))
            .join(' ');
          
          setDownloadResult(prev => prev + `
${testCase.category} (${testCase.endpoint}):
  ✅ Size: ${blob.size} bytes
  ✅ Type: ${blob.type} (expected: ${testCase.expectedType})
  ✅ First bytes: ${first10Bytes}
          `);
        } else {
          setDownloadResult(prev => prev + `
${testCase.category}: ❌ Failed - ${result.message}
          `);
        }
      } catch (error) {
        setDownloadResult(prev => prev + `
${testCase.category}: ❌ Error - ${error instanceof Error ? error.message : 'Unknown'}
        `);
      }
    }
    
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-6 h-6" />
              Download System Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={testDirectDownload}
                disabled={isDownloading}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {isDownloading ? 'Testing...' : 'Test PDF Download'}
              </Button>
              
              <Button
                onClick={testMultipleFormats}
                disabled={isDownloading}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                {isDownloading ? 'Testing...' : 'Test All Formats'}
              </Button>
            </div>
            
            {downloadResult && (
              <Card className="bg-muted">
                <CardContent className="p-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {downloadResult}
                  </pre>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}