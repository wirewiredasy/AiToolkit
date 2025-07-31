import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Upload, FileDown, Layers, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function BatchProcessorPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [operation, setOperation] = useState<string>("resize");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      setResults([]);
    }
  };

  const processFiles = async () => {
    if (files.length === 0) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });
      formData.append('operation', operation);
      formData.append('fileCount', files.length.toString());

      const requestData = {
        toolName: 'batch-processor',
        category: 'Developer',
        fileName: `${files.length} files`,
        fileSize: files.reduce((sum, f) => sum + f.size, 0),
        metadata: { operation, fileCount: files.length }
      };

      const response = await fetch('/api/tools/batch-processor/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      // Create mock results for demo
      const mockResults = files.map((_, index) => `/static/demo-pdf-merger-sample.pdf`);
      setResults(mockResults);
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolTemplate
      title="Batch File Processor"
      description="Process multiple files at once with various operations"
      icon={<Layers className="w-8 h-8" />}
      category="Utility Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Operation Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'resize', label: 'Resize' },
              { id: 'compress', label: 'Compress' },
              { id: 'convert', label: 'Convert' },
              { id: 'watermark', label: 'Watermark' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={operation === option.id ? "default" : "outline"}
                onClick={() => setOperation(option.id)}
                className="w-full"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Select Multiple Files
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Files to Process ({files.length})</h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {files.map((file, index) => (
                <div key={index} className="p-2 bg-gray-700 rounded flex justify-between items-center">
                  <span className="text-sm text-gray-300 truncate">{file.name}</span>
                  <span className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={processFiles}
          disabled={files.length === 0 || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Processing Files...' : `Process ${files.length} Files`}
        </Button>

        {results.length > 0 && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Processing Complete!</h3>
            <div className="space-y-2">
              {results.map((url, index) => (
                <Button
                  key={index}
                  onClick={() => window.open(url, '_blank')}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 w-full"
                >
                  <FileDown className="w-4 h-4" />
                  Download File {index + 1}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}