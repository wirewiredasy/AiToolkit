import { ToolTemplate } from "@/components/ui/tool-template";
import { MapPin } from "lucide-react";

export default function PassportValidatorPage() {
  return (
    <ToolTemplate
      toolId="passport-validator"
      toolName="Passport Validator"
      description="Validate Indian passport numbers. Check the format and structure of Indian passport numbers to ensure they meet official standards."
      icon={<MapPin className="h-8 w-8 text-white" />}
      resultType="validation"
      endpoint="/api/tools/passport-validator"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
    />
  );
}