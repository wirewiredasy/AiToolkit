import { ToolTemplate } from "@/components/ui/tool-template";
import { Database } from "lucide-react";

export default function CSVToJSONPage() {
  return (
    <ToolTemplate
      toolId="csv-to-json"
      toolName="CSV to JSON Converter"
      description="Convert CSV files to JSON format with customizable options. Handle large datasets, custom delimiters, and nested structures."
      icon={<Database className="h-8 w-8 text-white" />}
      acceptedFiles={{ "text/csv": [".csv"], "text/plain": [".txt"] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "csvContent",
          label: "CSV Content",
          type: "textarea",
          placeholder: "name,age,city\nJohn,30,New York\nJane,25,Boston",
          description: "CSV data to convert (or upload CSV file)"
        },
        {
          key: "delimiter",
          label: "Delimiter",
          type: "select",
          options: ["Comma (,)", "Semicolon (;)", "Tab", "Pipe (|)", "Custom"],
          defaultValue: "Comma (,)",
          description: "CSV field separator"
        },
        {
          key: "customDelimiter",
          label: "Custom Delimiter",
          type: "text",
          placeholder: "|",
          description: "Custom delimiter character"
        },
        {
          key: "hasHeaders",
          label: "Has Headers",
          type: "switch",
          defaultValue: true,
          description: "First row contains column headers"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["Array of Objects", "Object with Arrays", "Nested JSON", "Pretty Print"],
          defaultValue: "Array of Objects",
          description: "JSON structure format"
        },
        {
          key: "dataTypes",
          label: "Auto-detect Data Types",
          type: "switch",
          defaultValue: true,
          description: "Convert numbers and booleans automatically"
        },
        {
          key: "trimWhitespace",
          label: "Trim Whitespace",
          type: "switch",
          defaultValue: true,
          description: "Remove leading/trailing spaces"
        },
        {
          key: "skipEmptyRows",
          label: "Skip Empty Rows",
          type: "switch",
          defaultValue: true,
          description: "Ignore empty rows in CSV"
        }
      ]}
      endpoint="/api/tools/csv-to-json"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}