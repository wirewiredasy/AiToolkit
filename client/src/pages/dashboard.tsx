import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { authService } from '@/lib/auth';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats', {
        headers: authService.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ['/api/dashboard/recent-activity'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/recent-activity', {
        headers: authService.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch activity');
      return response.json();
    },
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Please sign in</h2>
            <p className="text-neutral-600 mb-6">You need to be signed in to view your dashboard.</p>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-8 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">Dashboard</h1>
            <p className="text-neutral-600">Welcome back, {user?.name}! Here's your recent activity.</p>
          </div>
          <Button asChild>
            <Link href="/">
              <i className="fas fa-plus mr-2"></i>
              Browse Tools
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm">Files Processed</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {statsLoading ? '...' : stats?.filesProcessed || 0}
                  </p>
                </div>
                <i className="fas fa-file text-2xl text-blue-500"></i>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm">Tools Used</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {statsLoading ? '...' : stats?.toolsUsed || 0}
                  </p>
                </div>
                <i className="fas fa-tools text-2xl text-green-500"></i>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm">Processing Time</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {statsLoading ? '...' : `${Math.round((stats?.totalTime || 0) / 1000)}s`}
                  </p>
                </div>
                <i className="fas fa-clock text-2xl text-purple-500"></i>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {statsLoading ? '...' : '98%'}
                  </p>
                </div>
                <i className="fas fa-check-circle text-2xl text-green-500"></i>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="text-center py-8">
                <i className="fas fa-spinner fa-spin text-2xl text-neutral-400"></i>
                <p className="text-neutral-600 mt-2">Loading activity...</p>
              </div>
            ) : recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 py-3 border-b border-neutral-100 last:border-b-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-tools text-blue-600"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-800">
                        {activity.toolName} - {activity.success ? 'Success' : 'Failed'}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {activity.fileName || 'No file'} • {Math.round(activity.processingTime / 1000)}s
                      </p>
                    </div>
                    <div className="text-sm text-neutral-500">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <i className="fas fa-inbox text-4xl text-neutral-300 mb-4"></i>
                <p className="text-neutral-600">No activity yet. Start using our tools!</p>
                <Button className="mt-4" asChild>
                  <Link href="/">Browse Tools</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
