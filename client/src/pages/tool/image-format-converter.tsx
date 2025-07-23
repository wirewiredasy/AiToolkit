import { ToolTemplate } from "@/components/ui/tool-template";
import { RefreshCw } from "lucide-react";

export default function ImageFormatConverterPage() {
  return (
    <ToolTemplate
      toolId="image-format-converter"
      toolName="Image Format Converter"
      description="Convert images between different formats. Support for JPG, PNG, WebP, BMP, TIFF, and more with quality control options."
      icon={<RefreshCw className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp", ".gif", ".svg"] 
      }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={true}
      settings={[
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["JPG", "PNG", "WebP", "BMP", "TIFF", "GIF"],
          defaultValue: "PNG",
          required: true,
          description: "Target image format"
        },
        {
          key: "quality",
          label: "Image Quality",
          type: "slider",
          min: 10,
          max: 100,
          step: 5,
          defaultValue: 90,
          description: "Output quality (for lossy formats like JPG/WebP)"
        },
        {
          key: "compression",
          label: "Compression Level",
          type: "select",
          options: ["None", "Low", "Medium", "High", "Maximum"],
          defaultValue: "Medium",
          description: "Compression level for supported formats"
        },
        {
          key: "preserveTransparency",
          label: "Preserve Transparency",
          type: "switch",
          defaultValue: true,
          description: "Keep transparent backgrounds (PNG/WebP/GIF)"
        },
        {
          key: "removeExif",
          label: "Remove EXIF Data",
          type: "switch",
          defaultValue: false,
          description: "Remove metadata from images"
        },
        {
          key: "colorSpace",
          label: "Color Space",
          type: "select",
          options: ["sRGB", "Adobe RGB", "P3 Display", "Original"],
          defaultValue: "sRGB",
          description: "Color space for the output image"
        }
      ]}
      endpoint="/api/tools/image-format-converter"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}