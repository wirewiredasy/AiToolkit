import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, CheckCircle, XCircle } from "lucide-react";

export default function UANValidatorPage() {
  const [uan, setUan] = useState<string>("");
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);

  const validateUAN = () => {
    // UAN (Universal Account Number) validation logic
    const cleanUAN = uan.replace(/\s/g, '');
    
    // UAN should be 12 digits
    if (!/^\d{12}$/.test(cleanUAN)) {
      setValidationResult({
        isValid: false,
        message: "UAN must be exactly 12 digits"
      });
      return;
    }

    // Additional UAN validation rules can be added here
    const isValid = true; // Simplified validation
    
    setValidationResult({
      isValid,
      message: isValid ? "Valid UAN number" : "Invalid UAN number"
    });
  };

  const formatUAN = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 12);
    return numbers.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3').trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUAN(e.target.value);
    setUan(formatted);
    setValidationResult(null);
  };

  return (
    <ToolTemplate
      title="UAN Validator"
      description="Validate Universal Account Number (UAN) for EPF accounts"
      icon={<Shield className="w-8 h-8" />}
      category="Government Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Enter UAN Number
            </label>
            <Input
              type="text"
              value={uan}
              onChange={handleInputChange}
              placeholder="1234 5678 9012"
              className="bg-gray-700 border-gray-600 text-lg text-center tracking-widest"
              maxLength={14} // 12 digits + 2 spaces
            />
            <p className="text-xs text-gray-400 mt-1">
              UAN should be 12 digits (format: XXXX XXXX XXXX)
            </p>
          </div>

          <Button
            onClick={validateUAN}
            disabled={!uan.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Validate UAN
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
                  {validationResult.isValid ? 'Valid UAN' : 'Invalid UAN'}
                </h3>
                <p className="text-gray-300">{validationResult.message}</p>
              </div>
            </div>

            {validationResult.isValid && (
              <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-600">
                <h4 className="font-semibold text-white mb-2">UAN Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">UAN:</span>
                    <span className="text-white font-mono">{uan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400">Valid Format</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Length:</span>
                    <span className="text-white">12 digits</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-white mb-2">About UAN</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>• UAN (Universal Account Number) is a 12-digit unique number allotted to EPF members</p>
            <p>• It remains same throughout your career even when you change jobs</p>
            <p>• UAN helps in tracking EPF contributions across multiple employers</p>
            <p>• You can check your EPF balance using UAN on the EPFO portal</p>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}