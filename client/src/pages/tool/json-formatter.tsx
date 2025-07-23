import { ToolTemplate } from "@/components/ui/tool-template";
import { Braces } from "lucide-react";

export default function JSONFormatterPage() {
  return (
    <ToolTemplate
      toolId="json-formatter"
      toolName="JSON Formatter & Validator"
      description="Format, validate, and beautify JSON data. Check syntax errors, minify JSON, and convert between JSON and other formats."
      icon={<Braces className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/json": [".json"], "text/plain": [".txt"] }}
      maxFileSize={10 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "jsonInput",
          label: "JSON Input",
          type: "textarea",
          placeholder: '{"name": "John", "age": 30, "city": "New York"}',
          required: true,
          description: "JSON data to format or validate"
        },
        {
          key: "operation",
          label: "Operation",
          type: "select",
          options: ["Format (Beautify)", "Minify", "Validate Only", "Remove Comments"],
          defaultValue: "Format (Beautify)",
          description: "What to do with the JSON"
        },
        {
          key: "indentation",
          label: "Indentation",
          type: "select",
          options: ["2 Spaces", "4 Spaces", "Tab", "Compact"],
          defaultValue: "2 Spaces",
          description: "Indentation style for formatting"
        },
        {
          key: "sortKeys",
          label: "Sort Keys",
          type: "switch",
          defaultValue: false,
          description: "Alphabetically sort object keys"
        },
        {
          key: "showLineNumbers",
          label: "Show Line Numbers",
          type: "switch",
          defaultValue: true,
          description: "Display line numbers in output"
        },
        {
          key: "escapeUnicode",
          label: "Escape Unicode",
          type: "switch",
          defaultValue: false,
          description: "Escape non-ASCII characters"
        },
        {
          key: "showStatistics",
          label: "Show Statistics",
          type: "switch",
          defaultValue: true,
          description: "Display JSON structure statistics"
        }
      ]}
      endpoint="/api/tools/json-formatter"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}