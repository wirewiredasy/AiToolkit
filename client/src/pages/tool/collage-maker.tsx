import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Upload, FileDown, Grid3X3, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function CollageMakerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [layout, setLayout] = useState<string>("grid");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      setResult(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processFile = async () => {
    if (files.length === 0) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`image_${index}`, file);
      });
      formData.append('layout', layout);
      formData.append('imageCount', files.length.toString());

      const response = await apiRequest('/api/tools/collage-maker', {
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
      title="Collage Maker"
      description="Create beautiful photo collages from multiple images"
      icon={<Grid3X3 className="w-8 h-8" />}
      category="Image Tools"
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
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
            Add Images (.jpg, .png, .webp)
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Selected Images ({files.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Layout Style</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'grid', label: 'Grid Layout' },
              { id: 'mosaic', label: 'Mosaic Style' },
              { id: 'frame', label: 'Frame Style' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={layout === option.id ? "default" : "outline"}
                onClick={() => setLayout(option.id)}
                className="w-full"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={processFile}
          disabled={files.length < 2 || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Creating Collage...' : 'Create Collage'}
        </Button>

        {result && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Collage Created Successfully!</h3>
            <Button
              onClick={() => window.open(result, '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FileDown className="w-4 h-4" />
              Download Collage
            </Button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}