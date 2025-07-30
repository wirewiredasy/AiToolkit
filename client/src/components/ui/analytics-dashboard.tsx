
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface AnalyticsData {
  totalUsers: number;
  toolsUsed: number;
  popularTool: string;
  avgProcessingTime: number;
}

export const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    toolsUsed: 0,
    popularTool: '',
    avgProcessingTime: 0
  });

  useEffect(() => {
    // Real-time analytics fetching
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Analytics fetch error:', error);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</div>
          <p className="text-xs opacity-80">Active users today</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Tools Used</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.toolsUsed.toLocaleString()}</div>
          <p className="text-xs opacity-80">Files processed today</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Popular Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{analytics.popularTool || 'PDF Merger'}</div>
          <p className="text-xs opacity-80">Most used today</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg Speed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.avgProcessingTime}s</div>
          <p className="text-xs opacity-80">Processing time</p>
        </CardContent>
      </Card>
    </div>
  );
};
