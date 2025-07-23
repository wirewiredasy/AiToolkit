import { ToolTemplate } from "@/components/ui/tool-template";
import { Shield } from "lucide-react";

export default function PasswordGeneratorPage() {
  return (
    <ToolTemplate
      toolId="password-generator"
      toolName="Secure Password Generator"
      description="Generate strong, secure passwords with customizable criteria. Create unique passwords for enhanced security across all your accounts."
      icon={<Shield className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "length",
          label: "Password Length",
          type: "slider",
          min: 8,
          max: 128,
          step: 1,
          defaultValue: 16,
          description: "Number of characters in password"
        },
        {
          key: "includeUppercase",
          label: "Include Uppercase Letters",
          type: "switch",
          defaultValue: true,
          description: "Include A-Z characters"
        },
        {
          key: "includeLowercase",
          label: "Include Lowercase Letters",
          type: "switch",
          defaultValue: true,
          description: "Include a-z characters"
        },
        {
          key: "includeNumbers",
          label: "Include Numbers",
          type: "switch",
          defaultValue: true,
          description: "Include 0-9 digits"
        },
        {
          key: "includeSymbols",
          label: "Include Symbols",
          type: "switch",
          defaultValue: true,
          description: "Include special characters (!@#$%^&*)"
        },
        {
          key: "excludeSimilar",
          label: "Exclude Similar Characters",
          type: "switch",
          defaultValue: true,
          description: "Avoid confusing characters (0, O, l, 1, I)"
        },
        {
          key: "excludeAmbiguous",
          label: "Exclude Ambiguous Characters",
          type: "switch",
          defaultValue: false,
          description: "Avoid characters that look similar"
        },
        {
          key: "generateCount",
          label: "Number of Passwords",
          type: "slider",
          min: 1,
          max: 10,
          step: 1,
          defaultValue: 1,
          description: "How many passwords to generate"
        },
        {
          key: "passwordStrength",
          label: "Minimum Strength",
          type: "select",
          options: ["Any", "Good", "Strong", "Very Strong"],
          defaultValue: "Strong",
          description: "Minimum required password strength"
        }
      ]}
      endpoint="/api/tools/password-generator"
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
    />
  );
}