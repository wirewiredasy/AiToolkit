
import { ToolTemplate } from "@/components/ui/tool-template";
import { FileX } from "lucide-react";

export default function DeathCertificatePage() {
  return (
    <ToolTemplate
      toolId="death-certificate"
      toolName="Death Certificate Generator"
      description="Generate official-format death certificates with all required legal details. Suitable for government and legal documentation."
      icon={<FileX className="h-8 w-8 text-white" />}
      resultType="generation"
      settings={[
        {
          key: "deceasedName",
          label: "Deceased Person's Full Name",
          type: "text",
          placeholder: "Enter full name of deceased",
          required: true,
          description: "Complete name of the deceased person"
        },
        {
          key: "dateOfDeath",
          label: "Date of Death",
          type: "date",
          required: true,
          description: "Date when death occurred"
        },
        {
          key: "timeOfDeath",
          label: "Time of Death",
          type: "time",
          description: "Time when death occurred (if known)"
        },
        {
          key: "placeOfDeath",
          label: "Place of Death",
          type: "text",
          placeholder: "Hospital/Home address",
          required: true,
          description: "Location where death occurred"
        },
        {
          key: "age",
          label: "Age at Death",
          type: "number",
          min: 0,
          max: 150,
          required: true,
          description: "Age of deceased at time of death"
        },
        {
          key: "gender",
          label: "Gender",
          type: "select",
          options: ["Male", "Female", "Other"],
          required: true,
          description: "Gender of deceased"
        },
        {
          key: "causeOfDeath",
          label: "Cause of Death",
          type: "text",
          placeholder: "Medical cause of death",
          required: true,
          description: "Primary cause of death"
        },
        {
          key: "fatherName",
          label: "Father's Name",
          type: "text",
          placeholder: "Father's full name",
          required: true,
          description: "Deceased's father's name"
        },
        {
          key: "motherName",
          label: "Mother's Name", 
          type: "text",
          placeholder: "Mother's full name",
          required: true,
          description: "Deceased's mother's name"
        },
        {
          key: "spouseName",
          label: "Spouse Name",
          type: "text",
          placeholder: "Spouse's name (if applicable)",
          description: "Name of surviving spouse"
        },
        {
          key: "registrationNumber",
          label: "Registration Number",
          type: "text",
          placeholder: "Death registration number",
          required: true,
          description: "Official death registration number"
        },
        {
          key: "registrationDate",
          label: "Registration Date",
          type: "date",
          required: true,
          description: "Date of death registration"
        },
        {
          key: "registrar",
          label: "Registrar Name",
          type: "text",
          placeholder: "Registering officer name",
          required: true,
          description: "Name of registering authority"
        },
        {
          key: "district",
          label: "District",
          type: "text",
          placeholder: "District name",
          required: true,
          description: "District of death registration"
        },
        {
          key: "state",
          label: "State/UT",
          type: "text",
          placeholder: "State name",
          required: true,
          description: "State or Union Territory"
        }
      ]}
      endpoint="/api/tools/death-certificate"
      gradientFrom="from-gray-500"
      gradientTo="to-slate-600"
    />
  );
}
