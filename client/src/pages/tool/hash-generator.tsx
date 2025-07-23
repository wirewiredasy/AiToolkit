import { ToolTemplate } from "@/components/ui/tool-template";
import { Hash } from "lucide-react";

export default function HashGeneratorPage() {
  return (
    <ToolTemplate
      toolId="hash-generator"
      toolName="Hash Generator"
      description="Generate cryptographic hashes from text or files. Support for MD5, SHA-1, SHA-256, SHA-512, and other hashing algorithms."
      icon={<Hash className="h-8 w-8 text-white" />}
      acceptedFiles={{ "*/*": [] }}
      maxFileSize={100 * 1024 * 1024}
      allowMultiple={false}
      settings={[
        {
          key: "inputText",
          label: "Text Input",
          type: "textarea",
          placeholder: "Enter text to hash (or upload a file)",
          description: "Text to generate hash from"
        },
        {
          key: "hashAlgorithm",
          label: "Hash Algorithm",
          type: "select",
          options: ["MD5", "SHA-1", "SHA-256", "SHA-512", "SHA-3-256", "SHA-3-512", "BLAKE2b", "All Algorithms"],
          defaultValue: "SHA-256",
          description: "Cryptographic hash function to use"
        },
        {
          key: "outputFormat",
          label: "Output Format",
          type: "select",
          options: ["Hexadecimal", "Base64", "Binary"],
          defaultValue: "Hexadecimal",
          description: "Format for hash output"
        },
        {
          key: "includeFileInfo",
          label: "Include File Information",
          type: "switch",
          defaultValue: true,
          description: "Show file size and type (for file uploads)"
        },
        {
          key: "caseSensitive",
          label: "Case Sensitive",
          type: "switch",
          defaultValue: true,
          description: "Consider letter case in text input"
        },
        {
          key: "showComparison",
          label: "Show Algorithm Comparison",
          type: "switch",
          defaultValue: false,
          description: "Display multiple hash algorithms side by side"
        }
      ]}
      endpoint="/api/tools/hash-generator"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}