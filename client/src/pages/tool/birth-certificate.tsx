
import { ToolTemplate } from "@/components/ui/tool-template";
import { Baby } from "lucide-react";

export default function BirthCertificatePage() {
  return (
    <ToolTemplate
      toolId="birth-certificate"
      toolName="Birth Certificate Generator"
      description="Generate official-format birth certificates with all required details. Suitable for government documentation and legal purposes."
      icon={<Baby className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "childName",
          label: "Child's Full Name",
          type: "text",
          placeholder: "Enter child's full name",
          required: true,
          description: "Full name of the child"
        },
        {
          key: "dateOfBirth",
          label: "Date of Birth",
          type: "date",
          required: true,
          description: "Child's date of birth"
        },
        {
          key: "timeOfBirth",
          label: "Time of Birth",
          type: "time",
          description: "Time of birth (optional)"
        },
        {
          key: "placeOfBirth",
          label: "Place of Birth",
          type: "text",
          placeholder: "Hospital/Home address",
          required: true,
          description: "Place where child was born"
        },
        {
          key: "gender",
          label: "Gender",
          type: "select",
          options: ["Male", "Female", "Other"],
          required: true,
          description: "Child's gender"
        },
        {
          key: "fatherName",
          label: "Father's Full Name",
          type: "text",
          placeholder: "Enter father's full name",
          required: true,
          description: "Father's complete name"
        },
        {
          key: "fatherNationality",
          label: "Father's Nationality",
          type: "text",
          placeholder: "e.g., Indian",
          defaultValue: "Indian",
          required: true,
          description: "Father's nationality"
        },
        {
          key: "motherName",
          label: "Mother's Full Name",
          type: "text",
          placeholder: "Enter mother's full name",
          required: true,
          description: "Mother's complete name"
        },
        {
          key: "motherNationality",
          label: "Mother's Nationality",
          type: "text",
          placeholder: "e.g., Indian",
          defaultValue: "Indian",
          required: true,
          description: "Mother's nationality"
        },
        {
          key: "registrationNumber",
          label: "Registration Number",
          type: "text",
          placeholder: "Birth registration number",
          required: true,
          description: "Official registration number"
        },
        {
          key: "registrationDate",
          label: "Registration Date",
          type: "date",
          required: true,
          description: "Date of birth registration"
        },
        {
          key: "registrar",
          label: "Registrar Name",
          type: "text",
          placeholder: "Name of registering officer",
          required: true,
          description: "Officer who registered the birth"
        },
        {
          key: "district",
          label: "District",
          type: "text",
          placeholder: "District name",
          required: true,
          description: "District of registration"
        },
        {
          key: "state",
          label: "State/UT",
          type: "text",
          placeholder: "State or Union Territory",
          required: true,
          description: "State or Union Territory"
        },
        {
          key: "hospitalName",
          label: "Hospital/Institution Name",
          type: "text",
          placeholder: "Name of hospital or institution",
          description: "Where child was born (if applicable)"
        }
      ]}
      endpoint="/api/tools/birth-certificate"
      gradientFrom="from-pink-500"
      gradientTo="to-rose-600"
    />
  );
}
