import { ToolTemplate } from "@/components/ui/tool-template";
import { Minimize2 } from "lucide-react";

export default function CSSMinifierPage() {
  return (
    <ToolTemplate
      toolId="css-minifier"
      toolName="CSS Minifier & Optimizer"
      description="Minify and optimize CSS code to reduce file size. Remove comments, whitespace, and optimize selectors for better performance."
      icon={<Minimize2 className="h-8 w-8 text-white" />}
      acceptedFiles={{ "text/css": [".css"], "text/plain": [".txt"] }}
      maxFileSize={5 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "cssInput",
          label: "CSS Code",
          type: "textarea",
          placeholder: "body {\n  margin: 0;\n  padding: 0;\n  /* Remove default spacing */\n}",
          required: true,
          description: "CSS code to minify and optimize"
        },
        {
          key: "minificationLevel",
          label: "Minification Level",
          type: "select",
          options: ["Basic", "Standard", "Advanced", "Maximum"],
          defaultValue: "Standard",
          description: "Level of CSS optimization"
        },
        {
          key: "removeComments",
          label: "Remove Comments",
          type: "switch",
          defaultValue: true,
          description: "Strip all CSS comments"
        },
        {
          key: "removeWhitespace",
          label: "Remove Whitespace",
          type: "switch",
          defaultValue: true,
          description: "Remove unnecessary whitespace"
        },
        {
          key: "optimizeColors",
          label: "Optimize Colors",
          type: "switch",
          defaultValue: true,
          description: "Convert colors to shorter formats (#ffffff → #fff)"
        },
        {
          key: "mergeRules",
          label: "Merge Duplicate Rules",
          type: "switch",
          defaultValue: true,
          description: "Combine identical CSS rules"
        },
        {
          key: "shortenZeros",
          label: "Shorten Zero Values",
          type: "switch",
          defaultValue: true,
          description: "Convert 0px to 0, remove units from zero values"
        },
        {
          key: "showStats",
          label: "Show Compression Stats",
          type: "switch",
          defaultValue: true,
          description: "Display before/after file size and savings"
        }
      ]}
      endpoint="/api/tools/css-minifier"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}