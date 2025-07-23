import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Copy, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const maskingOptions = [
  { value: "first-8", label: "Mask First 8 Digits (XXXX XXXX 1234)" },
  { value: "last-8", label: "Mask Last 8 Digits (1234 XXXX XXXX)" },
  { value: "middle-4", label: "Mask Middle 4 Digits (1234 XXXX 5678)" },
  { value: "all-but-4", label: "Show Only Last 4 Digits (XXXX XXXX 1234)" },
];

export default function AadhaarMaskerPage() {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [maskingOption, setMaskingOption] = useState("first-8");
  const [maskedResult, setMaskedResult] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { toast } = useToast();

  const formatAadhaar = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 14); // Limit to 12 digits with spaces
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaarNumber(formatted);
  };

  const validateAadhaar = (aadhaar: string) => {
    const digits = aadhaar.replace(/\s/g, '');
    return digits.length === 12 && /^\d{12}$/.test(digits);
  };

  const maskAadhaar = () => {
    if (!validateAadhaar(aadhaarNumber)) {
      toast({
        title: "Invalid Aadhaar",
        description: "Please enter a valid 12-digit Aadhaar number.",
        variant: "destructive",
      });
      return;
    }

    const digits = aadhaarNumber.replace(/\s/g, '');
    let masked = "";

    switch (maskingOption) {
      case "first-8":
        masked = "XXXX XXXX " + digits.slice(8);
        break;
      case "last-8":
        masked = digits.slice(0, 4) + " XXXX XXXX";
        break;
      case "middle-4":
        masked = digits.slice(0, 4) + " XXXX " + digits.slice(8);
        break;
      case "all-but-4":
        masked = "XXXX XXXX " + digits.slice(8);
        break;
      default:
        masked = "XXXX XXXX " + digits.slice(8);
    }

    setMaskedResult(masked);
    toast({
      title: "Success!",
      description: "Aadhaar number masked successfully.",
    });
  };

  const copyToClipboard = () => {
    if (maskedResult) {
      navigator.clipboard.writeText(maskedResult);
      toast({
        title: "Copied!",
        description: "Masked Aadhaar number copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Aadhaar Number Masker
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Securely mask Aadhaar numbers for privacy protection
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-500" />
                Mask Aadhaar Number
              </CardTitle>
              <CardDescription>
                Enter your Aadhaar number and choose a masking option for privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <div className="relative">
                  <Input
                    id="aadhaar"
                    type={showInput ? "text" : "password"}
                    value={aadhaarNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012"
                    maxLength={14}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowInput(!showInput)}
                  >
                    {showInput ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter 12 digits (spaces will be added automatically)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Masking Option</Label>
                <Select value={maskingOption} onValueChange={setMaskingOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select masking option" />
                  </SelectTrigger>
                  <SelectContent>
                    {maskingOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={maskAadhaar}
                disabled={!aadhaarNumber.trim()}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                size="lg"
              >
                Mask Aadhaar Number
              </Button>

              {maskedResult && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Masked Result:</span>
                      <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-lg font-mono">
                        {maskedResult}
                      </code>
                    </div>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Privacy Notice
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Your Aadhaar number is processed locally in your browser and is not sent to any server. 
                  This tool helps you create masked versions for documents where full privacy is needed.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Privacy First
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    All processing happens locally in your browser
                  </p>
                </div>
                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Options
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Choose from different masking patterns
                  </p>
                </div>
                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Instant Results
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get masked numbers immediately with copy functionality
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}