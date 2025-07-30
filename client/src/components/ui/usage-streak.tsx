
import React, { useState, useEffect } from 'react';
import { Badge } from './badge';
import { Card, CardContent } from './card';

export const UsageStreak: React.FC = () => {
  const [streak, setStreak] = useState(0);
  const [todayUsage, setTodayUsage] = useState(0);

  useEffect(() => {
    // Get user streak data
    const userStreak = localStorage.getItem('suntyn-streak') || '0';
    const lastVisit = localStorage.getItem('suntyn-last-visit');
    const today = new Date().toDateString();

    if (lastVisit === today) {
      setStreak(parseInt(userStreak));
    } else {
      // New day - increment streak
      const newStreak = lastVisit === new Date(Date.now() - 86400000).toDateString() 
        ? parseInt(userStreak) + 1 : 1;
      setStreak(newStreak);
      localStorage.setItem('suntyn-streak', newStreak.toString());
      localStorage.setItem('suntyn-last-visit', today);
    }

    // Get today's usage
    const todayTools = localStorage.getItem('suntyn-today-tools') || '0';
    setTodayUsage(parseInt(todayTools));
  }, []);

  return (
    <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">🔥 {streak} Day Streak</h3>
            <p className="text-sm opacity-90">{todayUsage} tools used today</p>
          </div>
          <div className="flex flex-col items-center">
            <Badge variant="secondary" className="bg-white text-orange-600">
              Active User
            </Badge>
            {streak >= 7 && (
              <Badge variant="secondary" className="bg-yellow-300 text-orange-700 mt-1">
                🏆 Power User
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
