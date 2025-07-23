import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Upload, FileDown, Bookmark } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function PDFBookmarkManagerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [action, setAction] = useState<'add' | 'remove' | 'extract'>('add');

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
      formData.append('action', action);

      const response = await apiRequest('/api/tools/pdf-bookmark-manager', {
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
      title="PDF Bookmark Manager"
      description="Add, remove, or extract bookmarks from PDF documents"
      icon={<Bookmark className="w-8 h-8" />}
      category="PDF Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Action</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'add', label: 'Add Bookmarks' },
              { id: 'remove', label: 'Remove Bookmarks' },
              { id: 'extract', label: 'Extract Bookmarks' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={action === option.id ? "default" : "outline"}
                onClick={() => setAction(option.id as 'add' | 'remove' | 'extract')}
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

        <Button
          onClick={processFile}
          disabled={!file || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Processing...' : `${action.charAt(0).toUpperCase() + action.slice(1)} Bookmarks`}
        </Button>

        {result && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Processing Complete!</h3>
            <Button
              onClick={() => window.open(result, '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FileDown className="w-4 h-4" />
              Download Result
            </Button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}