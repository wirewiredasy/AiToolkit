
import { ToolTemplate } from "@/components/ui/tool-template";
import { Award } from "lucide-react";

export default function CasteCertificatePage() {
  return (
    <ToolTemplate
      toolId="caste-certificate"
      toolName="Caste Certificate Generator"
      description="Generate professional caste certificate documents for government and educational purposes. Includes all required fields and proper formatting."
      icon={<Award className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "applicantName",
          label: "Applicant Full Name",
          type: "text",
          placeholder: "Enter full name as per records",
          required: true,
          description: "Full name of the applicant"
        },
        {
          key: "fatherName",
          label: "Father's Name",
          type: "text",
          placeholder: "Enter father's full name",
          required: true,
          description: "Father's full name"
        },
        {
          key: "motherName",
          label: "Mother's Name",
          type: "text",
          placeholder: "Enter mother's full name",
          required: true,
          description: "Mother's full name"
        },
        {
          key: "dateOfBirth",
          label: "Date of Birth",
          type: "date",
          required: true,
          description: "Applicant's date of birth"
        },
        {
          key: "caste",
          label: "Caste",
          type: "text",
          placeholder: "Enter caste name",
          required: true,
          description: "Caste name as per records"
        },
        {
          key: "category",
          label: "Category",
          type: "select",
          options: ["SC (Scheduled Caste)", "ST (Scheduled Tribe)", "OBC (Other Backward Class)", "EWS (Economically Weaker Section)"],
          required: true,
          description: "Select appropriate category"
        },
        {
          key: "address",
          label: "Residential Address",
          type: "textarea",
          placeholder: "Enter complete address with pin code",
          required: true,
          description: "Complete residential address"
        },
        {
          key: "district",
          label: "District",
          type: "text",
          placeholder: "Enter district name",
          required: true,
          description: "District name"
        },
        {
          key: "state",
          label: "State",
          type: "text",
          placeholder: "Enter state name",
          required: true,
          description: "State name"
        },
        {
          key: "pinCode",
          label: "PIN Code",
          type: "text",
          placeholder: "Enter 6-digit PIN code",
          required: true,
          description: "Area PIN code"
        },
        {
          key: "purpose",
          label: "Purpose",
          type: "select",
          options: ["Educational Admission", "Government Job", "Scholarship", "Other"],
          required: true,
          description: "Purpose of certificate"
        },
        {
          key: "issuingAuthority",
          label: "Issuing Authority",
          type: "text",
          placeholder: "e.g., District Collector, Tehsildar",
          required: true,
          description: "Authority issuing the certificate"
        },
        {
          key: "certificateNumber",
          label: "Certificate Number",
          type: "text",
          placeholder: "Enter certificate number if available",
          description: "Certificate reference number"
        },
        {
          key: "issueDate",
          label: "Issue Date",
          type: "date",
          required: true,
          description: "Date of certificate issue"
        }
      ]}
      endpoint="/api/tools/caste-certificate"
      gradientFrom="from-orange-500"
      gradientTo="to-red-600"
    />
  );
}
