import { ToolTemplate } from "@/components/ui/tool-template";
import { Package } from "lucide-react";

export default function ImageCompressorPage() {
  return (
    <ToolTemplate
      toolId="image-compressor"
      toolName="Image Compressor"
      description="Compress images to reduce file size while preserving quality. Perfect for web optimization, email attachments, and storage savings."
      icon={<Package className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"] 
      }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={true}
      settings={[
        {
          key: "quality",
          label: "Compression Quality",
          type: "slider",
          min: 10,
          max: 100,
          step: 5,
          defaultValue: 80,
          description: "Image quality after compression (10-100%)"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["Same as Input", "JPG (Smaller)", "PNG (Lossless)", "WebP (Modern)"],
          defaultValue: "Same as Input",
          description: "Target image format"
        },
        {
          key: "maxWidth",
          label: "Max Width (pixels)",
          type: "number",
          min: 100,
          max: 4000,
          defaultValue: 1920,
          description: "Maximum width to resize to (0 = no resize)"
        },
        {
          key: "maxHeight",
          label: "Max Height (pixels)",
          type: "number",
          min: 100,
          max: 4000,
          defaultValue: 1080,
          description: "Maximum height to resize to (0 = no resize)"
        },
        {
          key: "removeExif",
          label: "Remove EXIF Data",
          type: "switch",
          defaultValue: true,
          description: "Remove metadata to reduce file size"
        },
        {
          key: "progressive",
          label: "Progressive JPEG",
          type: "switch",
          defaultValue: true,
          description: "Enable progressive JPEG for better web loading"
        }
      ]}
      endpoint="/api/tools/image-compressor"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}