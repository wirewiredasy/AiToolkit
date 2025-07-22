import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function AadhaarValidator() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [validationResult, setValidationResult] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const validateAadhaar = useMutation({
    mutationFn: async (aadhaarNumber: string) => {
      return apiRequest('/api/tools/aadhaar-validator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaarNumber }),
      });
    },
    onSuccess: (data: any) => {
      setValidationResult(data);
      if (data.isValid) {
        toast({
          title: "Valid Aadhaar Number!",
          description: "The Aadhaar number format is correct",
        });
      } else {
        toast({
          title: "Invalid Aadhaar Number",
          description: data.reason || "The Aadhaar number format is incorrect",
          variant: "destructive",
        });
      }
      setProcessing(false);
    },
    onError: () => {
      toast({
        title: "Validation Failed",
        description: "Please try again",
        variant: "destructive",
      });
      setProcessing(false);
    }
  });

  const handleValidate = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to validate Aadhaar numbers",
        variant: "destructive",
      });
      return;
    }

    if (!aadhaarNumber.trim()) {
      toast({
        title: "Aadhaar Number Required",
        description: "Please enter an Aadhaar number to validate",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setValidationResult(null);
    validateAadhaar.mutate(aadhaarNumber.trim());
  };

  const formatAadhaarNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as: XXXX XXXX XXXX (with spaces every 4 digits)
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    if (cleaned.length <= 12) return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8)}`;
    
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaarNumber(e.target.value);
    setAadhaarNumber(formatted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-orange-900 dark:to-red-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Aadhaar Number Validator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Validate Indian Aadhaar card numbers instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interface */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Aadhaar Number Validation
                </CardTitle>
                <CardDescription>
                  Enter an Aadhaar number to validate its format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar-input">Aadhaar Number</Label>
                  <Input
                    id="aadhaar-input"
                    placeholder="1234 5678 9012"
                    value={aadhaarNumber}
                    onChange={handleInputChange}
                    maxLength={14} // 12 digits + 2 spaces
                    className="font-mono text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter 12 digits (spaces are automatically added)
                  </p>
                </div>

                <Button
                  onClick={handleValidate}
                  disabled={!aadhaarNumber || processing}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  size="lg"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Validate Aadhaar Number
                    </>
                  )}
                </Button>

                {/* Validation Result */}
                {validationResult && (
                  <Alert className={`${validationResult.isValid ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
                    {validationResult.isValid ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className={`font-semibold ${validationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
                          {validationResult.isValid ? 'Valid Aadhaar Number' : 'Invalid Aadhaar Number'}
                        </div>
                        {validationResult.reason && (
                          <div className="text-sm text-red-700 dark:text-red-300">
                            {validationResult.reason}
                          </div>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Aadhaar Format</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    1234 5678 9012
                  </div>
                  <ul className="space-y-1">
                    <li>• Must be exactly 12 digits</li>
                    <li>• Only numeric characters</li>
                    <li>• No special characters</li>
                    <li>• Cannot start with 0 or 1</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Sample Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start font-mono text-xs"
                    onClick={() => setAadhaarNumber("2234 5678 9012")}
                  >
                    2234 5678 9012
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start font-mono text-xs"
                    onClick={() => setAadhaarNumber("3456 7890 1234")}
                  >
                    3456 7890 1234
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start font-mono text-xs"
                    onClick={() => setAadhaarNumber("5678 9012 3456")}
                  >
                    5678 9012 3456
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                This tool validates Aadhaar number format only. For identity verification, please use official UIDAI services.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}