import { ToolTemplate } from "@/components/ui/tool-template";
import { Palette } from "lucide-react";

export default function ColorPaletteGeneratorPage() {
  return (
    <ToolTemplate
      toolId="color-palette-generator"
      toolName="AI Color Palette Generator"
      description="Generate beautiful color palettes using AI. Create harmonious color schemes for designs, websites, and creative projects."
      icon={<Palette className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "baseColor",
          label: "Base Color",
          type: "text",
          placeholder: "#3B82F6",
          description: "Starting color for palette generation (hex format)"
        },
        {
          key: "paletteType",
          label: "Palette Type",
          type: "select",
          options: ["Complementary", "Analogous", "Triadic", "Tetradic", "Monochromatic", "Random Harmony"],
          defaultValue: "Complementary",
          description: "Color harmony scheme"
        },
        {
          key: "colorCount",
          label: "Number of Colors",
          type: "slider",
          min: 3,
          max: 10,
          step: 1,
          defaultValue: 5,
          description: "How many colors in the palette"
        },
        {
          key: "mood",
          label: "Mood/Theme",
          type: "select",
          options: ["Vibrant", "Pastel", "Dark", "Light", "Earth Tones", "Ocean", "Sunset", "Forest", "Retro"],
          defaultValue: "Vibrant",
          description: "Overall mood or theme"
        },
        {
          key: "saturation",
          label: "Saturation Level",
          type: "slider",
          min: 20,
          max: 100,
          step: 5,
          defaultValue: 70,
          description: "Color saturation (20-100%)"
        },
        {
          key: "brightness",
          label: "Brightness Level",
          type: "slider",
          min: 20,
          max: 100,
          step: 5,
          defaultValue: 60,
          description: "Color brightness (20-100%)"
        },
        {
          key: "exportFormat",
          label: "Export Format",
          type: "select",
          options: ["HEX", "RGB", "HSL", "CMYK", "All Formats"],
          defaultValue: "HEX",
          description: "Color format for export"
        }
      ]}
      endpoint="/api/tools/color-palette-generator"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}