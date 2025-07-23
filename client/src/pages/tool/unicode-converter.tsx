import { ToolTemplate } from "@/components/ui/tool-template";
import { Type } from "lucide-react";

export default function UnicodeConverterPage() {
  return (
    <ToolTemplate
      toolId="unicode-converter"
      toolName="Unicode Text Converter"
      description="Convert text between different Unicode formats and encodings. Handle UTF-8, UTF-16, ASCII, and special character conversions."
      icon={<Type className="h-8 w-8 text-white" />}
      settings={[
        {
          key: "inputText",
          label: "Input Text",
          type: "textarea",
          placeholder: "Enter text to convert...",
          required: true,
          description: "Text to convert between encodings"
        },
        {
          key: "sourceEncoding",
          label: "Source Encoding",
          type: "select",
          options: ["UTF-8", "UTF-16", "ASCII", "ISO-8859-1", "Windows-1252", "Auto-Detect"],
          defaultValue: "UTF-8",
          description: "Current text encoding"
        },
        {
          key: "targetEncoding",
          label: "Target Encoding",
          type: "select",
          options: ["UTF-8", "UTF-16", "ASCII", "ISO-8859-1", "Windows-1252", "HTML Entities", "URL Encoding"],
          defaultValue: "UTF-8",
          description: "Desired output encoding"
        },
        {
          key: "conversionType",
          label: "Conversion Type",
          type: "select",
          options: ["Standard Conversion", "Unicode Escape Sequences", "HTML Entities", "Punycode", "Base64"],
          defaultValue: "Standard Conversion",
          description: "Type of conversion to perform"
        },
        {
          key: "showCodePoints",
          label: "Show Unicode Code Points",
          type: "switch",
          defaultValue: false,
          description: "Display Unicode code points for each character"
        },
        {
          key: "normalizeText",
          label: "Normalize Text",
          type: "select",
          options: ["None", "NFC", "NFD", "NFKC", "NFKD"],
          defaultValue: "None",
          description: "Unicode normalization form"
        },
        {
          key: "handleInvalidChars",
          label: "Handle Invalid Characters",
          type: "select",
          options: ["Replace with ?", "Ignore", "Error", "Best Effort"],
          defaultValue: "Replace with ?",
          description: "How to handle unsupported characters"
        }
      ]}
      endpoint="/api/tools/unicode-converter"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}