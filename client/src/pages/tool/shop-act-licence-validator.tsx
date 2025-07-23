import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, CheckCircle, XCircle, Store } from "lucide-react";

export default function ShopActLicenceValidatorPage() {
  const [licenceNumber, setLicenceNumber] = useState<string>("");
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string; details?: any } | null>(null);
  const [processing, setProcessing] = useState(false);

  const validateLicence = async () => {
    if (!licenceNumber.trim()) return;

    setProcessing(true);
    try {
      // Shop Act Licence validation logic
      const cleanLicence = licenceNumber.trim().toUpperCase();
      
      // Basic format validation for Shop Act licence (varies by state)
      const isValidFormat = cleanLicence.length >= 8 && cleanLicence.length <= 15;
      
      if (!isValidFormat) {
        setValidationResult({
          isValid: false,
          message: "Invalid licence format. Length should be 8-15 characters"
        });
        setProcessing(false);
        return;
      }

      // Simulate API validation (in real implementation, this would call state Shop Act API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isValid = true; // Simplified validation
      
      setValidationResult({
        isValid,
        message: isValid ? "Valid Shop Act Licence" : "Invalid Shop Act Licence",
        details: isValid ? {
          licenceType: "Shop and Establishment Registration",
          businessName: "Sample Business Pvt Ltd",
          ownerName: "John Doe",
          status: "Active",
          registrationDate: "2022-03-20",
          expiryDate: "2025-03-19",
          address: "123 Business Street, Commercial Area",
          businessType: "Retail Store"
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
      title="Shop Act Licence Validator"
      description="Validate Shop and Establishment Act registration numbers"
      icon={<Store className="w-8 h-8" />}
      category="Government Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Enter Shop Act Licence Number
            </label>
            <Input
              type="text"
              value={licenceNumber}
              onChange={(e) => {
                setLicenceNumber(e.target.value.toUpperCase());
                setValidationResult(null);
              }}
              placeholder="Enter licence number"
              className="bg-gray-700 border-gray-600 text-lg text-center tracking-wider"
              maxLength={20}
            />
            <p className="text-xs text-gray-400 mt-1">
              Format varies by state. Usually 8-15 characters including letters and numbers.
            </p>
          </div>

          <Button
            onClick={validateLicence}
            disabled={!licenceNumber.trim() || processing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {processing ? 'Validating...' : 'Validate Shop Act Licence'}
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
                    <span className="text-gray-400">Business Name:</span>
                    <span className="text-white">{validationResult.details.businessName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Owner Name:</span>
                    <span className="text-white">{validationResult.details.ownerName}</span>
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
                <div className="mt-3 pt-3 border-t border-gray-600">
                  <div className="text-xs text-gray-400">Address:</div>
                  <div className="text-sm text-white">{validationResult.details.address}</div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-white mb-2">About Shop Act Licence</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>• Shop and Establishment Act registration is mandatory for businesses with employees</p>
            <p>• Required for all commercial establishments, shops, offices, and factories</p>
            <p>• Regulates working conditions, hours of work, and employment terms</p>
            <p>• Format and requirements vary by state/union territory</p>
            <p>• Essential for legal compliance and obtaining other business licenses</p>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}