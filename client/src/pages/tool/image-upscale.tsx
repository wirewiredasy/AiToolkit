
import { ToolTemplate } from "@/components/ui/tool-template";
import { ZoomIn } from "lucide-react";

export default function ImageUpscalePage() {
  return (
    <ToolTemplate
      toolId="image-upscale"
      toolName="AI Image Upscaler"
      description="Upscale images to higher resolutions using AI technology. Increase image size while maintaining quality and adding realistic details."
      icon={<ZoomIn className="h-8 w-8 text-white" />}
      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png", ".webp", ".bmp"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "upscaleFactor",
          label: "Upscale Factor",
          type: "select",
          options: ["2x", "4x", "8x"],
          defaultValue: "2x",
          required: true,
          description: "How much to enlarge the image"
        },
        {
          key: "upscaleModel",
          label: "AI Model",
          type: "select",
          options: ["Real-ESRGAN", "EDSR", "SRCNN", "FSRCNN", "LapSRN"],
          defaultValue: "Real-ESRGAN",
          description: "AI model for upscaling"
        },
        {
          key: "imageType",
          label: "Image Type",
          type: "select",
          options: ["Photo", "Artwork", "Anime", "Face", "General"],
          defaultValue: "Photo",
          description: "Optimize for specific image type"
        },
        {
          key: "denoise",
          label: "Noise Reduction",
          type: "switch",
          defaultValue: true,
          description: "Remove noise during upscaling"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["PNG", "JPEG", "WEBP"],
          defaultValue: "PNG",
          description: "Output image format"
        }
      ]}
      endpoint="/api/tools/image-upscale"
      gradientFrom="from-green-500"
      gradientTo="to-teal-600"
    />
  );
}
