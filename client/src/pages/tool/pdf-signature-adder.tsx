import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileDown, PenTool } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function PDFSignatureAdderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSignatureFile(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!file || !signatureFile) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signatureFile);
      formData.append('position', JSON.stringify(position));

      const response = await apiRequest('/api/tools/pdf-signature-adder', {
        method: 'POST',
        body: formData,
      });

      setResult(response.downloadUrl);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolTemplate
      title="PDF Signature Adder"
      description="Add digital signatures to PDF documents"
      icon={<PenTool className="w-8 h-8" />}
      category="PDF Tools"
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer text-blue-400 hover:text-blue-300"
          >
            Choose PDF file
          </label>
          {file && (
            <p className="mt-2 text-sm text-gray-300">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <PenTool className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleSignatureChange}
            className="hidden"
            id="signature-upload"
          />
          <label
            htmlFor="signature-upload"
            className="cursor-pointer text-blue-400 hover:text-blue-300"
          >
            Choose signature image (.png, .jpg)
          </label>
          {signatureFile && (
            <p className="mt-2 text-sm text-gray-300">
              Selected: {signatureFile.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              X Position
            </label>
            <Input
              type="number"
              value={position.x}
              onChange={(e) => setPosition(prev => ({ ...prev, x: parseInt(e.target.value) }))}
              className="bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Y Position
            </label>
            <Input
              type="number"
              value={position.y}
              onChange={(e) => setPosition(prev => ({ ...prev, y: parseInt(e.target.value) }))}
              className="bg-gray-700"
            />
          </div>
        </div>

        <Button
          onClick={processFile}
          disabled={!file || !signatureFile || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Adding Signature...' : 'Add Signature to PDF'}
        </Button>

        {result && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Signature Added Successfully!</h3>
            <Button
              onClick={() => window.open(result, '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FileDown className="w-4 h-4" />
              Download Signed PDF
            </Button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}