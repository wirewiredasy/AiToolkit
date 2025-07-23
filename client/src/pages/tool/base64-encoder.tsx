import { ToolTemplate } from "@/components/ui/tool-template";
import { Code } from "lucide-react";

export default function Base64EncoderPage() {
  return (
    <ToolTemplate
      toolId="base64-encoder"
      toolName="Base64 Encoder/Decoder"
      description="Encode and decode text or files to/from Base64 format. Essential tool for data encoding, API integration, and web development."
      icon={<Code className="h-8 w-8 text-white" />}
      acceptedFiles={{ "*/*": [] }}
      maxFileSize={50 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "operation",
          label: "Operation",
          type: "select",
          options: ["Encode to Base64", "Decode from Base64"],
          defaultValue: "Encode to Base64",
          description: "Choose encode or decode operation"
        },
        {
          key: "inputText",
          label: "Text Input",
          type: "textarea",
          placeholder: "Enter text to encode/decode (or upload a file)",
          description: "Text content to process"
        },
        {
          key: "encoding",
          label: "Text Encoding",
          type: "select",
          options: ["UTF-8", "ASCII", "UTF-16", "ISO-8859-1"],
          defaultValue: "UTF-8",
          description: "Character encoding for text"
        },
        {
          key: "lineBreaks",
          label: "Line Breaks",
          type: "select",
          options: ["No Line Breaks", "76 Characters", "64 Characters", "Custom"],
          defaultValue: "No Line Breaks",
          description: "Insert line breaks in output"
        },
        {
          key: "urlSafe",
          label: "URL Safe",
          type: "switch",
          defaultValue: false,
          description: "Use URL-safe Base64 encoding (replace + and / with - and _)"
        },
        {
          key: "removePadding",
          label: "Remove Padding",
          type: "switch",
          defaultValue: false,
          description: "Remove = padding characters from output"
        },
        {
          key: "showOriginalSize",
          label: "Show Size Information",
          type: "switch",
          defaultValue: true,
          description: "Display original and encoded size"
        }
      ]}
      endpoint="/api/tools/base64-encoder"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}