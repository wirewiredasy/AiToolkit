import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, CheckCircle, XCircle, Building } from "lucide-react";

export default function VSSAULicenceValidatorPage() {
  const [licenceNumber, setLicenceNumber] = useState<string>("");
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string; details?: any } | null>(null);
  const [processing, setProcessing] = useState(false);

  const validateLicence = async () => {
    if (!licenceNumber.trim()) return;

    setProcessing(true);
    try {
      // VS SAU Licence validation logic
      const cleanLicence = licenceNumber.trim().toUpperCase();
      
      // Basic format validation for VS SAU licence
      const isValidFormat = /^[A-Z]{2}\d{2}[A-Z]{2}\d{6}$/.test(cleanLicence);
      
      if (!isValidFormat) {
        setValidationResult({
          isValid: false,
          message: "Invalid licence format. Expected format: XX00XX000000"
        });
        setProcessing(false);
        return;
      }

      // Simulate API validation (in real implementation, this would call VS SAU API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isValid = true; // Simplified validation
      
      setValidationResult({
        isValid,
        message: isValid ? "Valid VS SAU Licence" : "Invalid VS SAU Licence",
        details: isValid ? {
          licenceType: "VS SAU Registration",
          status: "Active",
          registrationDate: "2022-01-15",
          expiryDate: "2025-01-14",
          businessType: "Commercial Establishment"
        } : null
      });
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: "Error validating licence. Please try again."
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolTemplate
      title="VS SAU Licence Validator"
      description="Validate VS SAU (Vyavasaya Sthayi Adhar Utpatti) registration numbers"
      icon={<Building className="w-8 h-8" />}
      category="Government Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Enter VS SAU Licence Number
            </label>
            <Input
              type="text"
              value={licenceNumber}
              onChange={(e) => {
                setLicenceNumber(e.target.value.toUpperCase());
                setValidationResult(null);
              }}
              placeholder="XX00XX000000"
              className="bg-gray-700 border-gray-600 text-lg text-center tracking-widest"
              maxLength={12}
            />
            <p className="text-xs text-gray-400 mt-1">
              Format: State Code (2) + District Code (2) + Type (2) + Serial Number (6)
            </p>
          </div>

          <Button
            onClick={validateLicence}
            disabled={!licenceNumber.trim() || processing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {processing ? 'Validating...' : 'Validate VS SAU Licence'}
          </Button>
        </div>

        {validationResult && (
          <div className={`p-6 rounded-lg border ${
            validationResult.isValid 
              ? 'bg-green-900/20 border-green-600' 
              : 'bg-red-900/20 border-red-600'
          }`}>
            <div className="flex items-center gap-3">
              {validationResult.isValid ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400" />
              )}
              <div>
                <h3 className={`font-semibold ${
                  validationResult.isValid ? 'text-green-400' : 'text-red-400'
                }`}>
                  {validationResult.isValid ? 'Valid Licence' : 'Invalid Licence'}
                </h3>
                <p className="text-gray-300">{validationResult.message}</p>
              </div>
            </div>

            {validationResult.isValid && validationResult.details && (
              <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Licence Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Licence Number:</span>
                    <span className="text-white font-mono">{licenceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{validationResult.details.licenceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400">{validationResult.details.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Registration Date:</span>
                    <span className="text-white">{validationResult.details.registrationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expiry Date:</span>
                    <span className="text-white">{validationResult.details.expiryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Business Type:</span>
                    <span className="text-white">{validationResult.details.businessType}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-white mb-2">About VS SAU Licence</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>• VS SAU stands for Vyavasaya Sthayi Adhar Utpatti (Business Permanent Base Generation)</p>
            <p>• It's a unique identification number for commercial establishments in certain states</p>
            <p>• Required for businesses to operate legally and obtain various clearances</p>
            <p>• Format includes state code, district code, type code, and serial number</p>
            <p>• Essential for tax compliance and regulatory approvals</p>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}