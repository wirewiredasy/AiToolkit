import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingIndicatorProps {
  status: "idle" | "processing" | "success" | "error";
  progress?: number;
  message?: string;
  details?: string;
  className?: string;
}

export function ProcessingIndicator({
  status,
  progress = 0,
  message,
  details,
  className
}: ProcessingIndicatorProps) {
  if (status === "idle") return null;

  const getIcon = () => {
    switch (status) {
      case "processing":
        return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case "error":
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "processing":
        return "border-blue-200 bg-blue-50 dark:bg-blue-950/20";
      case "success":
        return "border-green-200 bg-green-50 dark:bg-green-950/20";
      case "error":
        return "border-red-200 bg-red-50 dark:bg-red-950/20";
      default:
        return "";
    }
  };

  const getDefaultMessage = () => {
    switch (status) {
      case "processing":
        return "Processing your file...";
      case "success":
        return "Processing completed successfully!";
      case "error":
        return "An error occurred during processing";
      default:
        return "";
    }
  };

  return (
    <Card className={cn("border-2", getStatusColor(), className)}>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4">
          {getIcon()}
        </div>

        <h3 className="text-lg font-semibold mb-2">
          {message || getDefaultMessage()}
        </h3>

        {details && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {details}
          </p>
        )}

        {status === "processing" && (
          <div className="w-full space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-gray-500">
              {progress}% complete
            </p>
          </div>
        )}

        {status === "processing" && (
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
            <span className="text-xs text-gray-500">AI processing in progress</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}