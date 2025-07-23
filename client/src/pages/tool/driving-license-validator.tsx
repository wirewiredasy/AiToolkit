import { ToolTemplate } from "@/components/ui/tool-template";
import { Car } from "lucide-react";

export default function DrivingLicenseValidatorPage() {
  return (
    <ToolTemplate
      toolId="driving-license-validator"
      toolName="Driving License Validator"
      description="Validate Indian driving license numbers. Check the format and structure of DL numbers to ensure they meet official Indian standards."
      icon={<Car className="h-8 w-8 text-white" />}
      resultType="validation"
      endpoint="/api/tools/driving-license-validator"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
    />
  );
}