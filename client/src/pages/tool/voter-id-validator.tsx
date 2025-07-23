import { ToolTemplate } from "@/components/ui/tool-template";
import { Vote } from "lucide-react";

export default function VoterIDValidatorPage() {
  return (
    <ToolTemplate
      toolId="voter-id-validator"
      toolName="Voter ID Validator"
      description="Validate Indian Voter ID card numbers. Check the format and structure of Electoral Photo Identity Card (EPIC) numbers for authenticity."
      icon={<Vote className="h-8 w-8 text-white" />}
      resultType="validation"
      endpoint="/api/tools/voter-id-validator"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
    />
  );
}