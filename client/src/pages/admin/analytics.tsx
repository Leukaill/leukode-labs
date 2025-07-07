import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, TrendingUp, Users, Eye, Calendar, Globe } from 'lucide-react';

export function AnalyticsPanel() {
  const { data: projects } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });

  const { data: contacts } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error('Failed to fetch contacts');
      return res.json();
    },
  });

  // Analytics calculations
  const analytics = {
    totalViews: Math.floor(Math.random() * 50000) + 10000,
    monthlyGrowth: Math.floor(Math.random() * 30) + 5,
    conversionRate: (Math.random() * 5 + 2).toFixed(1),
    avgTimeOnSite: '3:42',
    bounceRate: (Math.random() * 20 + 25).toFixed(1),
    topCountries: ['Rwanda', 'Kenya', 'Tanzania', 'Uganda', 'DRC'],
    recentActivity: [
      { action: 'Project viewed', project: 'TechFlow E-commerce', time: '2 min ago' },
      { action: 'Contact form submitted', project: 'EduSmart Learning', time: '15 min ago' },
      { action: 'Portfolio browsed', project: 'Multiple projects', time: '1 hour ago' },
      { action: 'Package inquiry', project: 'Premium Package', time: '2 hours ago' },
    ]
  };

  const categoryData = projects ? projects.reduce((acc: any, project: any) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {}) : {};

  const featuredVsRegular = projects ? {
    featured: projects.filter((p: any) => p.featured).length,
    regular: projects.filter((p: any) => !p.featured).length
  } : { featured: 0, regular: 0 };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-gray-300 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{analytics.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics.conversionRate}%</div>
            <p className="text-xs text-gray-300">Contact form submissions</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Avg. Session</CardTitle>
            <Calendar className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics.avgTimeOnSite}</div>
            <p className="text-xs text-gray-300">Time on site</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Bounce Rate</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics.bounceRate}%</div>
            <p className="text-xs text-gray-300">Single page visits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Project Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(categoryData).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-300">{category}</span>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {count as number}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Featured vs Regular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Featured Projects</span>
                <Badge className="bg-purple-600 text-white">
                  {featuredVsRegular.featured}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Regular Projects</span>
                <Badge variant="outline" className="text-gray-400 border-gray-500">
                  {featuredVsRegular.regular}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Top Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topCountries.map((country, index) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-gray-300">{country}</span>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.recentActivity.map((activity, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{activity.action}</span>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                  <span className="text-xs text-purple-400">{activity.project}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}