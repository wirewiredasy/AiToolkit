
import { ToolTemplate } from "@/components/ui/tool-template";
import { Info } from "lucide-react";

export default function ImageMetadataExtractorPage() {
  return (
    <ToolTemplate
      toolId="image-metadata-extractor"
      toolName="Image Metadata Extractor"
      description="Extract and view detailed metadata from your images including EXIF data, camera settings, GPS location, and technical information."
      icon={<Info className="h-8 w-8 text-white" />}
      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff", ".raw"] }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={true}
      settings={[
        {
          key: "extractionType",
          label: "Extraction Type",
          type: "select",
          options: ["All Metadata", "EXIF Only", "Camera Info", "GPS Data", "Technical Info", "Custom"],
          defaultValue: "All Metadata",
          required: true,
          description: "Type of metadata to extract"
        },
        {
          key: "includeExif",
          label: "Include EXIF Data",
          type: "switch",
          defaultValue: true,
          description: "Extract camera and shooting information"
        },
        {
          key: "includeGps",
          label: "Include GPS Data",
          type: "switch",
          defaultValue: true,
          description: "Extract location information"
        },
        {
          key: "includeTechnical",
          label: "Include Technical Info",
          type: "switch",
          defaultValue: true,
          description: "Extract file size, format, dimensions"
        },
        {
          key: "exportFormat",
          label: "Export Format",
          type: "select",
          options: ["JSON", "CSV", "XML", "Text"],
          defaultValue: "JSON",
          description: "Format for exported metadata"
        }
      ]}
      endpoint="/api/tools/image-metadata-extractor"
      gradientFrom="from-teal-500"
      gradientTo="to-cyan-600"
      resultType="generation"
    />
  );
}
