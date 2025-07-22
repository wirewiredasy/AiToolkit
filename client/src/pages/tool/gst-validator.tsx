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

export default function GSTValidator() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [gstNumber, setGstNumber] = useState("");
  const [validationResult, setValidationResult] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const validateGST = useMutation({
    mutationFn: async (gstNumber: string) => {
      return apiRequest('/api/tools/gst-validator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gstNumber }),
      });
    },
    onSuccess: (data: any) => {
      setValidationResult(data);
      if (data.isValid) {
        toast({
          title: "Valid GST Number!",
          description: "The GST number format is correct",
        });
      } else {
        toast({
          title: "Invalid GST Number",
          description: data.reason || "The GST number format is incorrect",
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
        description: "Please log in to validate GST numbers",
        variant: "destructive",
      });
      return;
    }

    if (!gstNumber.trim()) {
      toast({
        title: "GST Number Required",
        description: "Please enter a GST number to validate",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setValidationResult(null);
    validateGST.mutate(gstNumber.trim().toUpperCase());
  };

  const formatGSTNumber = (value: string) => {
    // Remove all non-alphanumeric characters and convert to uppercase
    const cleaned = value.replace(/[^A-Z0-9]/g, '').toUpperCase();
    
    // Format as: 12ABCDE1234F1Z5
    if (cleaned.length <= 15) {
      return cleaned;
    }
    return cleaned.substring(0, 15);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatGSTNumber(e.target.value);
    setGstNumber(formatted);
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
              GST Number Validator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Validate Indian GST identification numbers instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interface */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  GST Number Validation
                </CardTitle>
                <CardDescription>
                  Enter a GST number to validate its format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="gst-input">GST Number</Label>
                  <Input
                    id="gst-input"
                    placeholder="12ABCDE1234F1Z5"
                    value={gstNumber}
                    onChange={handleInputChange}
                    maxLength={15}
                    className="font-mono text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: 15 characters (2 digits + 10 alphanumeric + 1 digit + 1 character + 1 digit)
                  </p>
                </div>

                <Button
                  onClick={handleValidate}
                  disabled={!gstNumber || processing}
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
                      Validate GST Number
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
                          {validationResult.isValid ? 'Valid GST Number' : 'Invalid GST Number'}
                        </div>
                        {validationResult.details && (
                          <div className="space-y-1 text-sm">
                            <div>State Code: {validationResult.details.stateCode}</div>
                            <div>Entity Code: {validationResult.details.entityCode}</div>
                            <div>Check Digit: {validationResult.details.checkDigit}</div>
                          </div>
                        )}
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
                <CardTitle className="text-lg">GST Number Format</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    12ABCDE1234F1Z5
                  </div>
                  <ul className="space-y-1">
                    <li>• First 2 digits: State code</li>
                    <li>• Next 10 characters: Entity code</li>
                    <li>• 13th character: Check digit</li>
                    <li>• 14th character: Flag (A-Z)</li>
                    <li>• 15th character: Check digit</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Sample GST Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start font-mono text-xs"
                    onClick={() => setGstNumber("27AAPFU0939F1ZV")}
                  >
                    27AAPFU0939F1ZV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start font-mono text-xs"
                    onClick={() => setGstNumber("29AABCU9603R1ZX")}
                  >
                    29AABCU9603R1ZX
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start font-mono text-xs"
                    onClick={() => setGstNumber("06BZAHM6385P6Z2")}
                  >
                    06BZAHM6385P6Z2
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                This tool validates GST number format only. For business verification, please check with official GST portal.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}