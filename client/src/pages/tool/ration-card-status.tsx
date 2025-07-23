
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, CreditCard, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RationCardStatusPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [state, setState] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleStatusCheck = async () => {
    if (!cardNumber.trim() || !state) {
      toast({
        title: "Missing Information",
        description: "Please enter ration card number and select state.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch('/api/tools/ration-card-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber: cardNumber.trim(),
          state,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        toast({
          title: "Status Retrieved",
          description: "Ration card status checked successfully!",
        });
      } else {
        throw new Error('Status check failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check ration card status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ration Card Status Checker
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Check your ration card status and eligibility online
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-green-500" />
                Check Ration Card Status
              </CardTitle>
              <CardDescription>
                Enter your ration card details to check status and benefits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Ration Card Number</Label>
                  <Input
                    id="card-number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter ration card number"
                    maxLength={15}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state-select">State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((stateName) => (
                        <SelectItem key={stateName} value={stateName}>
                          {stateName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleStatusCheck}
                disabled={!cardNumber.trim() || !state || isChecking}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                size="lg"
              >
                {isChecking ? "Checking Status..." : "Check Status"}
              </Button>

              {result && (
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {result.isActive ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                      Card Status: {result.isActive ? "Active" : "Inactive"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Card Details</h3>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Card Number:</span> {result.cardNumber}</p>
                          <p><span className="font-medium">Card Type:</span> {result.cardType || "BPL"}</p>
                          <p><span className="font-medium">Family Size:</span> {result.familySize || "4 members"}</p>
                          <p><span className="font-medium">State:</span> {result.state}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Benefits</h3>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Rice Quota:</span> {result.riceQuota || "35 kg/month"}</p>
                          <p><span className="font-medium">Wheat Quota:</span> {result.wheatQuota || "35 kg/month"}</p>
                          <p><span className="font-medium">Sugar Quota:</span> {result.sugarQuota || "1 kg/month"}</p>
                          <p><span className="font-medium">Kerosene:</span> {result.kerosene || "5 liters/month"}</p>
                        </div>
                      </div>
                    </div>

                    {result.lastTransaction && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Last Transaction</h3>
                        <p className="text-sm">
                          <span className="font-medium">Date:</span> {result.lastTransaction.date || "15 Dec 2024"}<br/>
                          <span className="font-medium">Items:</span> {result.lastTransaction.items || "Rice: 35kg, Wheat: 35kg"}<br/>
                          <span className="font-medium">Amount:</span> ₹{result.lastTransaction.amount || "245"}
                        </p>
                      </div>
                    )}

                    {!result.isActive && (
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          <h3 className="font-semibold text-red-700 dark:text-red-300">Card Inactive</h3>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {result.reason || "Please contact your local ration office for reactivation."}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                  📋 Note:
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  This is a demonstration tool. For official ration card status, please visit your state's 
                  food department website or contact your local fair price shop.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quick Status
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Check your card status instantly
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Benefit Details
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    View your monthly quotas and entitlements
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Transaction History
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Track your recent ration purchases
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
