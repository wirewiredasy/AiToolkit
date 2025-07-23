
import { ToolTemplate } from "@/components/ui/tool-template";
import { Filter } from "lucide-react";

export default function ImageFilterEffectsPage() {
  return (
    <ToolTemplate
      toolId="image-filter-effects"
      toolName="Image Filter Effects"
      description="Apply various artistic filters and effects to your images. Choose from vintage, black & white, sepia, blur, and more creative filters."
      icon={<Filter className="h-8 w-8 text-white" />}
      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "filterType",
          label: "Filter Type",
          type: "select",
          options: ["Vintage", "Black & White", "Sepia", "Blur", "Sharpen", "Emboss", "Edge Detection", "Oil Painting", "Watercolor", "Pop Art"],
          defaultValue: "Vintage",
          required: true,
          description: "Choose the filter effect to apply"
        },
        {
          key: "intensity",
          label: "Filter Intensity",
          type: "select",
          options: ["Light", "Medium", "Strong", "Maximum"],
          defaultValue: "Medium",
          description: "Intensity of the filter effect"
        },
        {
          key: "preserveOriginal",
          label: "Keep Original Colors",
          type: "switch",
          defaultValue: false,
          description: "Blend filter with original colors"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["JPEG", "PNG", "WEBP"],
          defaultValue: "JPEG",
          description: "Output image format"
        }
      ]}
      endpoint="/api/tools/image-filter-effects"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}
