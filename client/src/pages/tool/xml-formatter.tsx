import { ToolTemplate } from "@/components/ui/tool-template";
import { Code2 } from "lucide-react";

export default function XMLFormatterPage() {
  return (
    <ToolTemplate
      toolId="xml-formatter"
      toolName="XML Formatter & Validator"
      description="Format, validate, and beautify XML documents. Check syntax errors, minify XML, and convert between XML and other formats."
      icon={<Code2 className="h-8 w-8 text-white" />}
      acceptedFiles={{ "application/xml": [".xml"], "text/xml": [".xml"], "text/plain": [".txt"] }}
      maxFileSize={10 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "xmlInput",
          label: "XML Input",
          type: "textarea",
          placeholder: '<root><item id="1"><name>Example</name></item></root>',
          required: true,
          description: "XML content to format or validate"
        },
        {
          key: "operation",
          label: "Operation",
          type: "select",
          options: ["Format (Beautify)", "Minify", "Validate Only", "Remove Comments"],
          defaultValue: "Format (Beautify)",
          description: "What to do with the XML"
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
          key: "sortAttributes",
          label: "Sort Attributes",
          type: "switch",
          defaultValue: false,
          description: "Alphabetically sort element attributes"
        },
        {
          key: "preserveWhitespace",
          label: "Preserve Whitespace",
          type: "switch",
          defaultValue: false,
          description: "Keep original whitespace in text content"
        },
        {
          key: "addLineNumbers",
          label: "Add Line Numbers",
          type: "switch",
          defaultValue: true,
          description: "Show line numbers in output"
        },
        {
          key: "validateSchema",
          label: "Validate Schema",
          type: "switch",
          defaultValue: false,
          description: "Perform XML schema validation"
        },
        {
          key: "showStatistics",
          label: "Show Statistics",
          type: "switch",
          defaultValue: true,
          description: "Display XML structure statistics"
        }
      ]}
      endpoint="/api/tools/xml-formatter"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}