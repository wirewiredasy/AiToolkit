import { EnhancedToolTemplate } from "@/components/ui/enhanced-tool-template";

export default function PDFMergerPage() {
  const handleProcess = async (files: File[], options: Record<string, string>) => {
    const formData = new FormData();
    
    // Add all files
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });
    
    // Add options
    Object.entries(options).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch('/api/tools/pdf-merger', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    // Return standardized response
    return {
      success: result.success || response.ok,
      message: result.message || 'PDF files merged successfully',
      downloadUrl: result.downloadUrl,
      filename: result.filename || `merged-pdf-${Date.now()}.pdf`,
      metadata: result.metadata
    };
  };

  return (
    <EnhancedToolTemplate
      title="PDF Merger"
      description="Combine multiple PDF files into a single document. Merge PDFs in any order while maintaining quality and formatting."
      acceptedFileTypes={['.pdf']}
      allowMultipleFiles={true}
      minFiles={2}
      maxFiles={10}
      toolOptions={[
        {
          id: "mergeOrder",
          label: "Merge Order",
          type: "select",
          options: ["Upload Order", "Alphabetical", "Date Modified", "File Size"],
          required: false
        },
        {
          id: "pageRange",
          label: "Page Range (per file)",
          type: "range",
          placeholder: "all, 1-5, 10-20",
          required: false
        }
      ]}
      onProcess={handleProcess}
    />
  );
}