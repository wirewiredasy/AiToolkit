import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { authService } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const panSchema = z.object({
  panNumber: z.string()
    .min(10, 'PAN must be 10 characters')
    .max(10, 'PAN must be 10 characters')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format. Format: AAAAA9999A'),
});

type PanInput = z.infer<typeof panSchema>;

interface ValidationResult {
  success: boolean;
  valid: boolean;
  message: string;
  processingTime: number;
  panDetails?: {
    type: string;
    category: string;
    checkDigit: string;
  };
}

export default function PANValidator() {
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [validationHistory, setValidationHistory] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const form = useForm<PanInput>({
    resolver: zodResolver(panSchema),
    defaultValues: {
      panNumber: '',
    },
  });

  const validateMutation = useMutation({
    mutationFn: async (data: PanInput) => {
      if (!isAuthenticated) {
        throw new Error('Please sign in to use this tool');
      }

      const response = await fetch('/api/tools/government/pan-validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authService.getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'PAN validation failed');
      }

      return response.json();
    },
    onSuccess: (data: ValidationResult) => {
      setResult(data);
      
      // Add to history (masked)
      const maskedPAN = form.getValues('panNumber');
      const masked = maskedPAN.slice(0, 5) + '****' + maskedPAN.slice(-1);
      setValidationHistory(prev => [masked, ...prev.slice(0, 4)]);

      toast({
        title: data.valid ? 'Valid PAN' : 'Invalid PAN',
        description: data.message,
        variant: data.valid ? 'default' : 'destructive',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Validation Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: PanInput) => {
    validateMutation.mutate({ panNumber: data.panNumber.toUpperCase() });
  };

  const handleClear = () => {
    form.reset();
    setResult(null);
  };

  const getPanDetails = (panNumber: string) => {
    if (panNumber.length !== 10) return null;

    const fourthChar = panNumber[3];
    const fifthChar = panNumber[4];
    
    let type = 'Unknown';
    if (fourthChar === 'P') type = 'Person';
    else if (fourthChar === 'C') type = 'Company';
    else if (fourthChar === 'H') type = 'HUF (Hindu Undivided Family)';
    else if (fourthChar === 'F') type = 'Firm';
    else if (fourthChar === 'A') type = 'AOP (Association of Persons)';
    else if (fourthChar === 'T') type = 'Trust';
    else if (fourthChar === 'B') type = 'Body of Individuals';
    else if (fourthChar === 'L') type = 'Local Authority';
    else if (fourthChar === 'J') type = 'Artificial Juridical Person';
    else if (fourthChar === 'G') type = 'Government';

    return {
      type,
      category: `${fourthChar}${fifthChar}`,
      checkDigit: panNumber[9],
    };
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Government Toolkit', href: '/toolkit/government' },
    { label: 'PAN Validator' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="py-8 bg-neutral-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav items={breadcrumbItems} />
          
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <i className="fas fa-lock text-4xl text-neutral-300 mb-4"></i>
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-neutral-600 mb-6">Please sign in to use the PAN Validator tool.</p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/signup">Create Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-id-card text-3xl text-orange-600"></i>
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">PAN Card Validator</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Validate Indian PAN card format and get detailed information about the PAN structure. 
            This tool checks format compliance only.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Validation Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-neutral-800 mb-4">Enter PAN Number</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="panNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PAN Card Number</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="ABCDE1234F"
                              className="uppercase font-mono text-lg"
                              maxLength={10}
                              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            />
                          </FormControl>
                          <div className="text-sm text-neutral-500">
                            Format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3">
                      <Button 
                        type="submit" 
                        disabled={validateMutation.isPending}
                        className="flex-1"
                        size="lg"
                      >
                        {validateMutation.isPending ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Validating...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-check mr-2"></i>
                            Validate PAN
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleClear}
                        size="lg"
                      >
                        Clear
                      </Button>
                    </div>
                  </form>
                </Form>

                {/* Quick Examples */}
                <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                  <h4 className="font-medium text-neutral-800 mb-2">Example PAN formats:</h4>
                  <div className="space-y-1 text-sm text-neutral-600 font-mono">
                    <div>ABCDE1234F - Individual</div>
                    <div>ABCDC1234G - Company</div>
                    <div>ABCDH1234K - HUF</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation History */}
            {validationHistory.length > 0 && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-neutral-800 mb-4">Recent Validations</h3>
                  <div className="space-y-2">
                    {validationHistory.map((pan, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-neutral-50 rounded text-sm">
                        <span className="font-mono">{pan}</span>
                        <i className="fas fa-check-circle text-green-500"></i>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* PAN Information */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-neutral-800 mb-4">PAN Structure Information</h3>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-neutral-800 mb-2">PAN Format: AAAAA9999A</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">First 5 characters:</span> Random alphabetic series</div>
                      <div><span className="font-medium">4th character:</span> Status (P=Person, C=Company, etc.)</div>
                      <div><span className="font-medium">Next 4 characters:</span> Sequential number</div>
                      <div><span className="font-medium">Last character:</span> Alphabetic check digit</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-neutral-800 mb-2">Status Codes</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>P - Person</div>
                      <div>C - Company</div>
                      <div>H - HUF</div>
                      <div>F - Firm</div>
                      <div>A - AOP</div>
                      <div>T - Trust</div>
                      <div>B - BOI</div>
                      <div>G - Government</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Result Display */}
            {result && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className={`text-center ${result.valid ? 'text-green-600' : 'text-red-600'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      result.valid ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <i className={`text-2xl ${result.valid ? 'fas fa-check' : 'fas fa-times'}`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {result.valid ? 'Valid PAN Format' : 'Invalid PAN Format'}
                    </h3>
                    <p className="text-neutral-600 mb-4">{result.message}</p>
                    
                    {result.valid && (
                      <div className="bg-neutral-50 p-4 rounded-lg text-left">
                        <h4 className="font-medium text-neutral-800 mb-2">PAN Details:</h4>
                        <div className="space-y-1 text-sm">
                          <div>Type: {getPanDetails(form.getValues('panNumber'))?.type}</div>
                          <div>Category: {getPanDetails(form.getValues('panNumber'))?.category}</div>
                          <div>Check Digit: {getPanDetails(form.getValues('panNumber'))?.checkDigit}</div>
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-neutral-500 mt-4">
                      Validation time: {(result.processingTime / 1000).toFixed(3)}s
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Important Notice */}
        <Alert className="mt-8">
          <i className="fas fa-info-circle"></i>
          <AlertDescription>
            <strong>Important:</strong> This tool only validates the PAN format and structure. 
            It does not verify if the PAN is actually issued by the Income Tax Department. 
            For official verification, please use the Income Tax Department's official website.
          </AlertDescription>
        </Alert>

        {/* How It Works */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-neutral-800 mb-8 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Enter PAN</h4>
              <p className="text-neutral-600">
                Type or paste the 10-character PAN number you want to validate.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Format Check</h4>
              <p className="text-neutral-600">
                Our system checks the PAN against the official format rules.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Get Results</h4>
              <p className="text-neutral-600">
                Receive detailed validation results and PAN structure information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
