
import { ToolTemplate } from "@/components/ui/tool-template";
import { Scale } from "lucide-react";

export default function AffidavitGeneratorPage() {
  return (
    <ToolTemplate
      toolId="affidavit-generator"
      toolName="Affidavit Generator"
      description="Generate legal affidavits for various purposes including name change, address proof, income declaration, and other sworn statements."
      icon={<Scale className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "affidavitType",
          label: "Affidavit Type",
          type: "select",
          options: [
            "Name Change Affidavit",
            "Address Proof Affidavit", 
            "Income Declaration",
            "Identity Affidavit",
            "Date of Birth Affidavit",
            "Relationship Affidavit",
            "General Purpose",
            "Custom Affidavit"
          ],
          required: true,
          description: "Type of affidavit to generate"
        },
        {
          key: "deponentName",
          label: "Deponent's Full Name",
          type: "text",
          placeholder: "Enter full name of person making affidavit",
          required: true,
          description: "Name of person making the sworn statement"
        },
        {
          key: "fatherName",
          label: "Father's/Husband's Name",
          type: "text",
          placeholder: "Enter father's or husband's name",
          required: true,
          description: "Father's or spouse's name"
        },
        {
          key: "age",
          label: "Age",
          type: "number",
          min: 18,
          max: 100,
          required: true,
          description: "Age of deponent"
        },
        {
          key: "occupation",
          label: "Occupation",
          type: "text",
          placeholder: "Enter occupation",
          required: true,
          description: "Profession or occupation"
        },
        {
          key: "address",
          label: "Residential Address",
          type: "textarea",
          placeholder: "Enter complete address",
          required: true,
          description: "Full residential address"
        },
        {
          key: "affidavitContent",
          label: "Affidavit Content",
          type: "textarea",
          placeholder: "Enter the main content/statements of the affidavit",
          required: true,
          description: "Main statements to be sworn"
        },
        {
          key: "purpose",
          label: "Purpose",
          type: "text",
          placeholder: "Purpose for which affidavit is required",
          required: true,
          description: "Why this affidavit is needed"
        },
        {
          key: "place",
          label: "Place of Execution",
          type: "text",
          placeholder: "City/Town where affidavit is executed",
          required: true,
          description: "Location where affidavit is signed"
        },
        {
          key: "date",
          label: "Date of Execution",
          type: "date",
          required: true,
          description: "Date of affidavit signing"
        },
        {
          key: "witnessRequired",
          label: "Include Witness Section",
          type: "switch",
          defaultValue: true,
          description: "Add witness verification section"
        },
        {
          key: "notaryRequired",
          label: "Include Notary Section",
          type: "switch",
          defaultValue: true,
          description: "Add notary verification section"
        },
        {
          key: "stampPaper",
          label: "Stamp Paper Value",
          type: "select",
          options: ["₹10", "₹20", "₹50", "₹100", "₹500"],
          defaultValue: "₹20",
          description: "Value of stamp paper to be used"
        }
      ]}
      endpoint="/api/tools/affidavit-generator"
      gradientFrom="from-purple-500"
      gradientTo="to-indigo-600"
    />
  );
}
