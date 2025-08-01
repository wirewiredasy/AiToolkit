import { EnhancedToolTemplate } from "@/components/ui/enhanced-tool-template";

export default function PDFSplitterPage() {
  const handleProcess = async (files: File[], options: Record<string, string>) => {
    const formData = new FormData();
    
    // Add the PDF file
    formData.append('file', files[0]);
    
    // Add options
    Object.entries(options).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch('/api/tools/pdf-splitter', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    return {
      success: result.success || response.ok,
      message: result.message || 'PDF split successfully',
      downloadUrl: result.downloadUrl,
      filename: result.filename || `split-pdf-${Date.now()}.zip`,
      metadata: result.metadata
    };
  };

  return (
    <EnhancedToolTemplate
      title="PDF Splitter"
      description="Split large PDF files into smaller documents. Extract specific pages or split by page ranges, bookmarks, or file size."
      acceptedFileTypes={['.pdf']}
      allowMultipleFiles={false}
      toolOptions={[
        {
          id: "splitMode",
          label: "Split Mode",
          type: "select",
          options: ["By Page Range", "Every N Pages", "Extract Pages"],
          required: true
        },
        {
          id: "pageRanges",
          label: "Page Ranges",
          type: "range",
          placeholder: "1-5, 6-10, 11-15",
          required: true
        },
        {
          id: "pagesPerFile",
          label: "Pages per File",
          type: "number",
          placeholder: "10",
          required: false
        }
      ]}
      onProcess={handleProcess}
    />
  );
}