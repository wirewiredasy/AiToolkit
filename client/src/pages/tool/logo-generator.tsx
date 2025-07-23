import { ToolTemplate } from "@/components/ui/tool-template";
import { Zap } from "lucide-react";

export default function LogoGeneratorPage() {
  return (
    <ToolTemplate
      toolId="logo-generator"
      toolName="AI Logo Generator"
      description="Create professional logos using AI. Generate unique logo designs based on your business name, industry, and style preferences."
      icon={<Zap className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "businessName",
          label: "Business Name",
          type: "text",
          placeholder: "Your Company Name",
          required: true,
          description: "Name of your business or brand"
        },
        {
          key: "tagline",
          label: "Tagline (Optional)",
          type: "text",
          placeholder: "Your business tagline",
          description: "Optional tagline to include in logo"
        },
        {
          key: "industry",
          label: "Industry",
          type: "select",
          options: ["Technology", "Healthcare", "Finance", "Education", "Retail", "Food & Beverage", "Real Estate", "Creative", "Sports", "Other"],
          defaultValue: "Technology",
          description: "Your business industry"
        },
        {
          key: "logoStyle",
          label: "Logo Style",
          type: "select",
          options: ["Modern", "Classic", "Minimalist", "Vintage", "Playful", "Professional", "Abstract", "Geometric"],
          defaultValue: "Modern",
          description: "Overall design style"
        },
        {
          key: "colorScheme",
          label: "Color Scheme",
          type: "select",
          options: ["Monochrome", "Two Colors", "Colorful", "Blue Tones", "Red Tones", "Green Tones", "Purple Tones", "Custom"],
          defaultValue: "Two Colors",
          description: "Color palette preference"
        },
        {
          key: "primaryColor",
          label: "Primary Color",
          type: "text",
          placeholder: "#3B82F6",
          defaultValue: "#3B82F6",
          description: "Main brand color (hex format)"
        },
        {
          key: "logoType",
          label: "Logo Type",
          type: "select",
          options: ["Text Only", "Icon + Text", "Icon Only", "Badge/Emblem"],
          defaultValue: "Icon + Text",
          description: "Logo composition style"
        },
        {
          key: "iconStyle",
          label: "Icon Style",
          type: "select",
          options: ["Abstract", "Letter-based", "Symbol", "Animal", "Object", "Geometric"],
          defaultValue: "Abstract",
          description: "Type of icon or symbol"
        }
      ]}
      endpoint="/api/tools/logo-generator"
      gradientFrom="from-purple-500"
      gradientTo="to-pink-600"
    />
  );
}