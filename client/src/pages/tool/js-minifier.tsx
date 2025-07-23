import { ToolTemplate } from "@/components/ui/tool-template";
import { Code } from "lucide-react";

export default function JSMinifierPage() {
  return (
    <ToolTemplate
      toolId="js-minifier"
      toolName="JavaScript Minifier"
      description="Minify JavaScript code to reduce file size. Remove comments, whitespace, and optimize code for production deployment."
      icon={<Code className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/javascript": [".js"], "text/javascript": [".js"], "text/plain": [".txt"] }}
      maxFileSize={10 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "jsInput",
          label: "JavaScript Code",
          type: "textarea",
          placeholder: "function hello(name) {\n  // Greet the user\n  console.log('Hello, ' + name + '!');\n}",
          required: true,
          description: "JavaScript code to minify"
        },
        {
          key: "minificationLevel",
          label: "Minification Level",
          type: "select",
          options: ["Basic", "Standard", "Advanced"],
          defaultValue: "Standard",
          description: "Level of JavaScript optimization"
        },
        {
          key: "removeComments",
          label: "Remove Comments",
          type: "switch",
          defaultValue: true,
          description: "Strip all JavaScript comments"
        },
        {
          key: "removeWhitespace",
          label: "Remove Whitespace",
          type: "switch",
          defaultValue: true,
          description: "Remove unnecessary whitespace and line breaks"
        },
        {
          key: "shortenVariables",
          label: "Shorten Variable Names",
          type: "switch",
          defaultValue: false,
          description: "Rename variables to shorter names (may break code)"
        },
        {
          key: "removeConsole",
          label: "Remove Console Statements",
          type: "switch",
          defaultValue: false,
          description: "Remove console.log and debug statements"
        },
        {
          key: "preserveStrings",
          label: "Preserve String Literals",
          type: "switch",
          defaultValue: true,
          description: "Keep string content unchanged"
        },
        {
          key: "showStats",
          label: "Show Compression Stats",
          type: "switch",
          defaultValue: true,
          description: "Display before/after file size and savings"
        }
      ]}
      endpoint="/api/tools/js-minifier"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}