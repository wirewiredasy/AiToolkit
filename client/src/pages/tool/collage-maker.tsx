import { ToolTemplate } from "@/components/ui/tool-template";
import { Grid3X3 } from "lucide-react";

export default function CollageMakerPage() {
  return (
    <ToolTemplate
      toolId="collage-maker"
      toolName="Collage Maker"
      description="Create beautiful photo collages from multiple images. Choose from various layouts and customization options."
      icon={<Grid3X3 className="h-8 w-8 text-white" />}
      acceptedFiles={{ 
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"]
      }}
      maxFileSize={10 * 1024 * 1024} // 10MB per image
      allowMultiple={true}
      endpoint="/api/tools/collage-maker"
      resultType="file"
      settings={[
        {
          key: "layout",
          label: "Collage Layout",
          type: "select",
          options: ["Grid 2x2", "Grid 3x3", "Mosaic", "Strip Horizontal", "Strip Vertical"],
          defaultValue: "Grid 2x2",
          description: "Layout style for the collage"
        },
        {
          key: "spacing",
          label: "Image Spacing",
          type: "slider",
          min: 0,
          max: 50,
          defaultValue: 10,
          description: "Space between images in pixels"
        },
        {
          key: "backgroundColor",
          label: "Background Color",
          type: "text",
          defaultValue: "#FFFFFF",
          placeholder: "#FFFFFF",
          description: "Background color for the collage"
        }
      ]}
    />
  );
}