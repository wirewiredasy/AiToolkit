import { ToolTemplate } from "@/components/ui/tool-template";
import { Minimize } from "lucide-react";

export default function PDFCompressorPage() {
  return (
    <ToolTemplate
      toolId="pdf-compressor"
      toolName="PDF Compressor"
      description="Reduce PDF file size while maintaining quality. Optimize PDFs for web, email, or storage with intelligent compression algorithms."
      icon={<Minimize className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/pdf": [".pdf"] }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "compressionLevel",
          label: "Compression Level",
          type: "select",
          options: ["Low (Best Quality)", "Medium (Balanced)", "High (Smallest Size)", "Maximum (Web Optimized)"],
          defaultValue: "Medium (Balanced)",
          description: "Balance between file size and quality"
        },
        {
          key: "imageQuality",
          label: "Image Quality",
          type: "slider",
          min: 50,
          max: 100,
          step: 5,
          defaultValue: 85,
          description: "Quality of images in the PDF (50-100%)"
        },
        {
          key: "removeMetadata",
          label: "Remove Metadata",
          type: "switch",
          defaultValue: true,
          description: "Remove document properties and metadata"
        },
        {
          key: "optimizeImages",
          label: "Optimize Images",
          type: "switch",
          defaultValue: true,
          description: "Compress and optimize embedded images"
        },
        {
          key: "removeDuplicates",
          label: "Remove Duplicates",
          type: "switch",
          defaultValue: true,
          description: "Remove duplicate resources and objects"
        }
      ]}
      endpoint="/api/tools/pdf-compressor"
      gradientFrom="from-red-500"
      gradientTo="to-orange-600"
    />
  );
}