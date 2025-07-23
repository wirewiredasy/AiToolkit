import { ToolTemplate } from "@/components/ui/tool-template";
import { Building } from "lucide-react";

export default function IFSCValidatorPage() {
  return (
    <ToolTemplate
      toolId="ifsc-validator"
      toolName="IFSC Code Validator"
      description="Validate Indian bank IFSC codes. Check the format and structure of Indian Financial System Code for bank branch identification."
      icon={<Building className="h-8 w-8 text-white" />}
      resultType="validation"
      endpoint="/api/tools/ifsc-validator"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
    />
  );
}