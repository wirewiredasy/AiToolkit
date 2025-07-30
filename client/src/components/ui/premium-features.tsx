
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';

export const PremiumFeatures: React.FC = () => {
  const premiumFeatures = [
    {
      name: 'Batch Processing',
      description: 'Process 100+ files at once',
      icon: '⚡',
      comingSoon: true
    },
    {
      name: 'API Access',
      description: 'Integrate with your applications',
      icon: '🔗',
      comingSoon: true
    },
    {
      name: 'Priority Processing',
      description: 'Faster processing for your files',
      icon: '🚀',
      comingSoon: true
    },
    {
      name: 'Cloud Storage',
      description: 'Save your processed files',
      icon: '☁️',
      comingSoon: true
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">👑</span>
          Premium Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <span className="text-2xl">{feature.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{feature.name}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
              {feature.comingSoon && (
                <Badge variant="secondary" className="text-xs">
                  Coming Soon
                </Badge>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
            Get Early Access
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Be the first to know when premium features launch
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
