import { ToolTemplate } from "@/components/ui/tool-template";
import { Star } from "lucide-react";

export default function FaviconGeneratorPage() {
  return (
    <ToolTemplate
      toolId="favicon-generator"
      toolName="Favicon Generator"
      description="Generate favicons in multiple sizes and formats from your logo or image. Create complete favicon packages for websites and apps."
      icon={<Star className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/*": [".jpg", ".jpeg", ".png", ".svg", ".gif"] 
      }}
      maxFileSize={10 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "faviconSizes",
          label: "Favicon Sizes",
          type: "select",
          options: ["Standard Sizes (16x16, 32x32, 48x48)", "All Sizes (16-512px)", "Apple Touch Icons", "Android Icons", "Custom Sizes"],
          defaultValue: "All Sizes (16-512px)",
          description: "Which favicon sizes to generate"
        },
        {
          key: "backgroundColor",
          label: "Background Color",
          type: "text",
          defaultValue: "transparent",
          placeholder: "#FFFFFF or transparent",
          description: "Background color for favicon"
        },
        {
          key: "padding",
          label: "Padding",
          type: "slider",
          min: 0,
          max: 30,
          step: 1,
          defaultValue: 5,
          description: "Padding around the icon (0-30%)"
        },
        {
          key: "roundCorners",
          label: "Round Corners",
          type: "slider",
          min: 0,
          max: 50,
          step: 5,
          defaultValue: 0,
          description: "Corner radius percentage (0-50%)"
        },
        {
          key: "includeManifest",
          label: "Include Web Manifest",
          type: "switch",
          defaultValue: true,
          description: "Generate web app manifest file"
        },
        {
          key: "includeMSConfig",
          label: "Include MS Config",
          type: "switch",
          defaultValue: true,
          description: "Generate browserconfig.xml for Windows tiles"
        },
        {
          key: "generateICO",
          label: "Generate ICO File",
          type: "switch",
          defaultValue: true,
          description: "Create classic .ico favicon file"
        }
      ]}
      endpoint="/api/tools/favicon-generator"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}