import { ToolTemplate } from "@/components/ui/tool-template";
import { QrCode } from "lucide-react";

export default function QRGeneratorPage() {
  return (
    <ToolTemplate
      toolId="qr-generator"
      toolName="QR Code Generator"
      description="Generate QR codes for URLs, text, contact info, WiFi credentials, and more. Customize colors, size, and error correction levels."
      icon={<QrCode className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "content",
          label: "QR Code Content",
          type: "textarea",
          placeholder: "Enter URL, text, or data to encode",
          required: true,
          description: "The data to encode in the QR code"
        },
        {
          key: "qrType",
          label: "QR Code Type",
          type: "select",
          options: ["URL/Website", "Plain Text", "Email", "Phone", "SMS", "WiFi", "Contact Card"],
          defaultValue: "URL/Website",
          description: "Type of data to encode"
        },
        {
          key: "size",
          label: "Size (pixels)",
          type: "slider",
          min: 100,
          max: 1000,
          step: 50,
          defaultValue: 300,
          description: "QR code dimensions"
        },
        {
          key: "errorCorrection",
          label: "Error Correction",
          type: "select",
          options: ["Low (7%)", "Medium (15%)", "Quartile (25%)", "High (30%)"],
          defaultValue: "Medium (15%)",
          description: "Error correction level"
        },
        {
          key: "foregroundColor",
          label: "Foreground Color",
          type: "text",
          defaultValue: "#000000",
          placeholder: "#000000",
          description: "QR code color (hex format)"
        },
        {
          key: "backgroundColor",
          label: "Background Color",
          type: "text",
          defaultValue: "#FFFFFF",
          placeholder: "#FFFFFF",
          description: "Background color (hex format)"
        },
        {
          key: "includeMargin",
          label: "Include Margin",
          type: "switch",
          defaultValue: true,
          description: "Add quiet zone around QR code"
        }
      ]}
      endpoint="/api/tools/qr-generator"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}