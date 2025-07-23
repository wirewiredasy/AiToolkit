
import { ToolTemplate } from "@/components/ui/tool-template";
import { Square } from "lucide-react";

export default function ImageBorderAdderPage() {
  return (
    <ToolTemplate
      toolId="image-border-adder"
      toolName="Image Border Adder"
      description="Add beautiful borders and frames to your images. Choose from various styles, colors, and patterns to enhance your photos."
      icon={<Square className="h-8 w-8 text-white" />}
      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "borderStyle",
          label: "Border Style",
          type: "select",
          options: ["Solid", "Gradient", "Pattern", "Shadow", "3D", "Vintage", "Modern", "Classic"],
          defaultValue: "Solid",
          required: true,
          description: "Style of border to add"
        },
        {
          key: "borderWidth",
          label: "Border Width",
          type: "select",
          options: ["Thin (5px)", "Medium (15px)", "Thick (30px)", "Extra Thick (50px)"],
          defaultValue: "Medium (15px)",
          description: "Width of the border"
        },
        {
          key: "borderColor",
          label: "Border Color",
          type: "select",
          options: ["White", "Black", "Gray", "Red", "Blue", "Green", "Yellow", "Purple", "Custom"],
          defaultValue: "White",
          description: "Color of the border"
        },
        {
          key: "cornerStyle",
          label: "Corner Style",
          type: "select",
          options: ["Square", "Rounded", "Circle", "Custom"],
          defaultValue: "Square",
          description: "Style of border corners"
        },
        {
          key: "shadowEffect",
          label: "Add Shadow",
          type: "switch",
          defaultValue: false,
          description: "Add drop shadow effect"
        }
      ]}
      endpoint="/api/tools/image-border-adder"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
    />
  );
}
