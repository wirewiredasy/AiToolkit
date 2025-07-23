import { ToolTemplate } from "@/components/ui/tool-template";
import { ArrowUpRight } from "lucide-react";

export default function ImageUpscalerPage() {
  return (
    <ToolTemplate
      toolId="image-upscaler"
      toolName="AI Image Upscaler"
      description="Increase image resolution with AI-powered upscaling. Enhance low-resolution images to high-quality prints without losing detail or introducing artifacts."
      icon={<ArrowUpRight className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"] 
      }}
      maxFileSize={25 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "upscaleRatio",
          label: "Upscale Ratio",
          type: "select",
          options: ["2x (Double)", "4x (Quadruple)", "6x", "8x"],
          defaultValue: "2x (Double)",
          description: "How much to increase the image size"
        },
        {
          key: "upscaleModel",
          label: "AI Model",
          type: "select",
          options: ["Real-ESRGAN", "ESRGAN", "Waifu2x", "SwinIR"],
          defaultValue: "Real-ESRGAN",
          description: "AI model for upscaling"
        },
        {
          key: "imageType",
          label: "Image Type",
          type: "select",
          options: ["Auto-Detect", "Photo/Real", "Artwork/Illustration", "Anime/Cartoon"],
          defaultValue: "Auto-Detect",
          description: "Optimize for specific image content"
        },
        {
          key: "denoising",
          label: "Denoising Level",
          type: "slider",
          min: 0,
          max: 3,
          step: 1,
          defaultValue: 1,
          description: "Remove noise during upscaling (0=none, 3=maximum)"
        },
        {
          key: "edgeEnhancement",
          label: "Edge Enhancement",
          type: "switch",
          defaultValue: true,
          description: "Sharpen edges and fine details"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["PNG (Lossless)", "JPG (Smaller)", "TIFF (Professional)"],
          defaultValue: "PNG (Lossless)",
          description: "Output image format"
        }
      ]}
      endpoint="/api/tools/image-upscaler"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}