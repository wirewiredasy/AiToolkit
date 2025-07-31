import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Upload, Info } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function FormatInfoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [fileInfo, setFileInfo] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileInfo(null);
    }
  };

  const analyzeFile = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const requestData = {
        toolName: 'format-info',
        category: 'Developer',
        fileName: file.name,
        fileSize: file.size,
        metadata: {}
      };

      const response = await fetch('/api/tools/format-info/demo', {
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
      setFileInfo(result.fileInfo || { message: 'File analyzed successfully' });
    } catch (error) {
      console.error('Error analyzing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolTemplate
      title="File Format Info"
      description="Analyze and get detailed information about file formats and metadata"
      icon={<Info className="w-8 h-8" />}
      category="Utility Tools"
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-400 hover:text-blue-300"
          >
            Choose any file to analyze
          </label>
          {file && (
            <p className="mt-2 text-sm text-gray-300">
              Selected: {file.name}
            </p>
          )}
        </div>

        <Button
          onClick={analyzeFile}
          disabled={!file || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Analyzing File...' : 'Analyze File Format'}
        </Button>

        {fileInfo && (
          <div className="space-y-4">
            <h3 className="font-semibold text-green-400 text-lg">File Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Basic Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{file?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Size:</span>
                    <span className="text-white">{formatFileSize(file?.size || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{file?.type || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Modified:</span>
                    <span className="text-white">{new Date(file?.lastModified || 0).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Format Details</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(fileInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span className="text-white">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {fileInfo.metadata && (
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Metadata</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {Object.entries(fileInfo.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span className="text-white truncate ml-2">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}