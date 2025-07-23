import { ToolTemplate } from "@/components/ui/tool-template";
import { Palette } from "lucide-react";

export default function GradientGeneratorPage() {
  return (
    <ToolTemplate
      toolId="gradient-generator"
      toolName="CSS Gradient Generator"
      description="Create beautiful CSS gradients with visual editor. Generate linear, radial, and conic gradients with multiple color stops."
      icon={<Palette className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "gradientType",
          label: "Gradient Type",
          type: "select",
          options: ["Linear", "Radial", "Conic", "Repeating Linear", "Repeating Radial"],
          defaultValue: "Linear",
          description: "Type of gradient to create"
        },
        {
          key: "direction",
          label: "Direction/Angle",
          type: "slider",
          min: 0,
          max: 360,
          step: 15,
          defaultValue: 45,
          description: "Gradient direction in degrees"
        },
        {
          key: "color1",
          label: "Start Color",
          type: "text",
          defaultValue: "#FF6B6B",
          placeholder: "#FF6B6B",
          description: "First gradient color"
        },
        {
          key: "color2",
          label: "End Color",
          type: "text",
          defaultValue: "#4ECDC4",
          placeholder: "#4ECDC4",
          description: "Last gradient color"
        },
        {
          key: "colorStops",
          label: "Number of Colors",
          type: "slider",
          min: 2,
          max: 8,
          step: 1,
          defaultValue: 2,
          description: "Total number of color stops"
        },
        {
          key: "position",
          label: "Gradient Position",
          type: "select",
          options: ["Center", "Top Left", "Top Right", "Bottom Left", "Bottom Right", "Custom"],
          defaultValue: "Center",
          description: "Starting position for radial gradients"
        },
        {
          key: "size",
          label: "Gradient Size",
          type: "select",
          options: ["Closest Side", "Closest Corner", "Farthest Side", "Farthest Corner", "Custom"],
          defaultValue: "Farthest Corner",
          description: "Size of radial gradient"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["CSS Only", "CSS with Fallback", "SCSS", "Inline Style"],
          defaultValue: "CSS with Fallback",
          description: "Format of generated code"
        }
      ]}
      endpoint="/api/tools/gradient-generator"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}