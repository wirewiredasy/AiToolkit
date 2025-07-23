import { ToolTemplate } from "@/components/ui/tool-template";
import { FileCheck } from "lucide-react";

export default function GSTValidatorPage() {
  return (
    <ToolTemplate
      toolId="gst-validator"
      toolName="GST Number Validator"
      description="Validate Indian GST (Goods and Services Tax) identification numbers. Check GSTIN format, structure, and validity."
      icon={<FileCheck className="h-8 w-8 text-white" />}
      resultType="validation"
      settings={[
        {
          key: "gstNumber",
          label: "GST Number",
          type: "text",
          placeholder: "22AAAAA0000A1Z5",
          required: true,
          description: "Enter 15-character GST number to validate"
        },
        {
          key: "validationType",
          label: "Validation Type",
          type: "select",
          options: ["Format Check", "Checksum Validation", "State Code Verification", "Complete Validation"],
          defaultValue: "Complete Validation",
          description: "Level of validation to perform"
        },
        {
          key: "showBreakdown",
          label: "Show Number Breakdown",
          type: "switch",
          defaultValue: true,
          description: "Display GST number structure breakdown"
        },
        {
          key: "stateMapping",
          label: "Show State Information",
          type: "switch",
          defaultValue: true,
          description: "Display state information from GST code"
        },
        {
          key: "entityType",
          label: "Detect Entity Type",
          type: "switch",
          defaultValue: true,
          description: "Identify business entity type from GST"
        }
      ]}
      endpoint="/api/tools/gst-validator"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
    />
  );
}