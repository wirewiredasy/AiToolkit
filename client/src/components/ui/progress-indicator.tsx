import { Card, CardContent } from './card';

interface ProgressIndicatorProps {
  message: string;
  description?: string;
  progress?: number; // 0-100
  className?: string;
}

export default function ProgressIndicator({
  message,
  description,
  progress,
  className = ""
}: ProgressIndicatorProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          <div>
            <div className="font-semibold text-neutral-800">{message}</div>
            {description && (
              <div className="text-sm text-neutral-600">{description}</div>
            )}
          </div>
        </div>
        
        {progress !== undefined && (
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
