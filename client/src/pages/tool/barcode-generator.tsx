import { ToolTemplate } from "@/components/ui/tool-template";
import { ScanLine } from "lucide-react";

export default function BarcodeGeneratorPage() {
  return (
    <ToolTemplate
      toolId="barcode-generator"
      toolName="Barcode Generator"
      description="Generate various types of barcodes including UPC, EAN, Code 128, Code 39, and more. Perfect for product labeling and inventory management."
      icon={<ScanLine className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "content",
          label: "Barcode Content",
          type: "text",
          placeholder: "Enter numbers or text to encode",
          required: true,
          description: "The data to encode in the barcode"
        },
        {
          key: "barcodeType",
          label: "Barcode Type",
          type: "select",
          options: [
            "Code 128 (Alphanumeric)", 
            "Code 39 (Basic)", 
            "EAN-13 (Products)", 
            "EAN-8 (Small Products)", 
            "UPC-A (North America)", 
            "UPC-E (Compact)",
            "Interleaved 2 of 5",
            "Codabar (Libraries)"
          ],
          defaultValue: "Code 128 (Alphanumeric)",
          description: "Type of barcode to generate"
        },
        {
          key: "width",
          label: "Width (pixels)",
          type: "slider",
          min: 200,
          max: 800,
          step: 50,
          defaultValue: 400,
          description: "Barcode width"
        },
        {
          key: "height",
          label: "Height (pixels)",
          type: "slider",
          min: 50,
          max: 200,
          step: 10,
          defaultValue: 100,
          description: "Barcode height"
        },
        {
          key: "showText",
          label: "Show Text",
          type: "switch",
          defaultValue: true,
          description: "Display the encoded text below barcode"
        },
        {
          key: "fontSize",
          label: "Text Size",
          type: "slider",
          min: 8,
          max: 24,
          step: 2,
          defaultValue: 12,
          description: "Size of the text below barcode"
        },
        {
          key: "backgroundColor",
          label: "Background Color",
          type: "text",
          defaultValue: "#FFFFFF",
          placeholder: "#FFFFFF",
          description: "Background color (hex format)"
        }
      ]}
      endpoint="/api/tools/barcode-generator"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}