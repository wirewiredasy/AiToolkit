
import { ToolTemplate } from "@/components/ui/tool-template";
import { FileText } from "lucide-react";

export default function RentAgreementPage() {
  return (
    <ToolTemplate
      toolId="rent-agreement"
      toolName="Rent Agreement Generator"
      description="Generate legal rent agreements as per Indian law. Create comprehensive rental contracts with all necessary clauses and terms."
      icon={<FileText className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "agreementType",
          label: "Agreement Type",
          type: "select",
          options: ["Residential Rent", "Commercial Rent", "Leave & License", "Sub-lease", "Paying Guest"],
          defaultValue: "Residential Rent",
          required: true,
          description: "Type of rental agreement"
        },
        {
          key: "landlordName",
          label: "Landlord Name",
          type: "text",
          placeholder: "Full name of property owner",
          required: true,
          description: "Property owner details"
        },
        {
          key: "tenantName",
          label: "Tenant Name",
          type: "text",
          placeholder: "Full name of tenant",
          required: true,
          description: "Tenant details"
        },
        {
          key: "propertyAddress",
          label: "Property Address",
          type: "textarea",
          placeholder: "Complete address of rental property",
          required: true,
          description: "Detailed property address"
        },
        {
          key: "monthlyRent",
          label: "Monthly Rent (₹)",
          type: "text",
          placeholder: "25000",
          required: true,
          description: "Monthly rental amount"
        },
        {
          key: "securityDeposit",
          label: "Security Deposit (₹)",
          type: "text",
          placeholder: "50000",
          required: true,
          description: "Security deposit amount"
        },
        {
          key: "tenurePeriod",
          label: "Tenure Period",
          type: "select",
          options: ["11 Months", "1 Year", "2 Years", "3 Years", "Custom"],
          defaultValue: "11 Months",
          description: "Rental period duration"
        },
        {
          key: "startDate",
          label: "Agreement Start Date",
          type: "text",
          placeholder: "DD/MM/YYYY",
          required: true,
          description: "When rent starts"
        },
        {
          key: "includeUtilities",
          label: "Include Utilities",
          type: "switch",
          defaultValue: false,
          description: "Include electricity, water bills"
        },
        {
          key: "petPolicy",
          label: "Pet Policy",
          type: "select",
          options: ["Not Allowed", "Allowed", "With Approval", "Additional Deposit"],
          defaultValue: "Not Allowed",
          description: "Pet keeping policy"
        },
        {
          key: "maintenanceClause",
          label: "Maintenance Responsibility",
          type: "select",
          options: ["Tenant", "Landlord", "Shared", "Custom"],
          defaultValue: "Tenant",
          description: "Who handles maintenance"
        },
        {
          key: "language",
          label: "Agreement Language",
          type: "select",
          options: ["English", "Hindi", "Both"],
          defaultValue: "English",
          description: "Document language"
        }
      ]}
      endpoint="/api/tools/rent-agreement"
      gradientFrom="from-blue-500"
      gradientTo="to-purple-600"
    />
  );
}
