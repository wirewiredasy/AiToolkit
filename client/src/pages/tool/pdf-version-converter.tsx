import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileDown, FileType } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function PDFVersionConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [targetVersion, setTargetVersion] = useState<string>("1.7");

  const pdfVersions = [
    { value: "1.3", label: "PDF 1.3 (Acrobat 4)" },
    { value: "1.4", label: "PDF 1.4 (Acrobat 5)" },
    { value: "1.5", label: "PDF 1.5 (Acrobat 6)" },
    { value: "1.6", label: "PDF 1.6 (Acrobat 7)" },
    { value: "1.7", label: "PDF 1.7 (Acrobat 8)" },
    { value: "2.0", label: "PDF 2.0 (ISO 32000-2)" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetVersion', targetVersion);

      const response = await apiRequest('/api/tools/pdf-version-converter', {
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
      title="PDF Version Converter"
      description="Convert PDF files between different PDF versions for compatibility"
      icon={<FileType className="w-8 h-8" />}
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
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Target PDF Version</h3>
          <Select value={targetVersion} onValueChange={setTargetVersion}>
            <SelectTrigger className="bg-gray-700 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pdfVersions.map((version) => (
                <SelectItem key={version.value} value={version.value}>
                  {version.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={processFile}
          disabled={!file || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Converting Version...' : 'Convert PDF Version'}
        </Button>

        {result && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Version Converted Successfully!</h3>
            <Button
              onClick={() => window.open(result, '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FileDown className="w-4 h-4" />
              Download Converted PDF
            </Button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}