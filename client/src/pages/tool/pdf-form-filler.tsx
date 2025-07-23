import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileDown, FileText } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function PDFFormFillerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState<{[key: string]: string}>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const addFormField = () => {
    const fieldName = prompt("Enter field name:");
    const fieldValue = prompt("Enter field value:");
    if (fieldName && fieldValue) {
      setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
    }
  };

  const processFile = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('formData', JSON.stringify(formData));

      const response = await apiRequest('/api/tools/pdf-form-filler', {
        method: 'POST',
        body: form,
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
      title="PDF Form Filler"
      description="Fill PDF forms with data automatically"
      icon={<FileText className="w-8 h-8" />}
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
            Choose PDF form file
          </label>
          {file && (
            <p className="mt-2 text-sm text-gray-300">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Form Fields</h3>
            <Button onClick={addFormField} variant="outline">
              Add Field
            </Button>
          </div>
          
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <Input 
                value={key} 
                disabled 
                className="flex-1 bg-gray-700"
                placeholder="Field name"
              />
              <Input 
                value={value}
                onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                className="flex-1 bg-gray-700"
                placeholder="Field value"
              />
            </div>
          ))}
        </div>

        <Button
          onClick={processFile}
          disabled={!file || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Filling Form...' : 'Fill PDF Form'}
        </Button>

        {result && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Form Filled Successfully!</h3>
            <Button
              onClick={() => window.open(result, '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FileDown className="w-4 h-4" />
              Download Filled PDF
            </Button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}