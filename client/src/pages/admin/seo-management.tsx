import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Globe, Target, BarChart3, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SEOManagementPanel() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [seoData, setSeoData] = useState({
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonicalUrl: '',
    schema: '',
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });

  // Mock SEO analytics data
  const seoAnalytics = {
    searchConsole: {
      impressions: 25430,
      clicks: 1250,
      avgPosition: 12.5,
      ctr: 4.9,
    },
    pageSpeed: {
      desktop: 92,
      mobile: 87,
    },
    keywordRankings: [
      { keyword: 'web development rwanda', position: 3, change: '+2' },
      { keyword: 'software agency kigali', position: 5, change: '+1' },
      { keyword: 'mobile app development', position: 8, change: '-1' },
      { keyword: 'e-commerce solutions', position: 12, change: '+5' },
      { keyword: 'custom software', position: 15, change: 'new' },
    ],
    backlinks: {
      total: 156,
      domains: 45,
      newThisMonth: 12,
    }
  };

  const updateSEOMutation = useMutation({
    mutationFn: async (data: any) => {
      // In a real implementation, this would update SEO metadata
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'SEO Updated',
        description: 'SEO metadata has been updated successfully.',
      });
    },
  });

  const handleProjectSelect = (projectId: string) => {
    const project = projects?.find((p: any) => p.id.toString() === projectId);
    setSelectedProject(project);
    
    // Load existing SEO data for the project
    setSeoData({
      metaTitle: project?.title || '',
      metaDescription: project?.description || '',
      keywords: project?.technologies?.join(', ') || '',
      ogTitle: project?.title || '',
      ogDescription: project?.description || '',
      ogImage: project?.imageUrl || '',
      canonicalUrl: `https://arclabs.rw/project/${project?.id}`,
      schema: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": project?.title,
        "description": project?.description,
        "url": `https://arclabs.rw/project/${project?.id}`,
      }, null, 2),
    });
  };

  const handleSEOUpdate = () => {
    if (!selectedProject) {
      toast({
        title: 'No Project Selected',
        description: 'Please select a project to update SEO settings.',
        variant: 'destructive',
      });
      return;
    }
    updateSEOMutation.mutate({ projectId: selectedProject.id, ...seoData });
  };

  const getSEOScore = () => {
    let score = 0;
    if (seoData.metaTitle.length >= 30 && seoData.metaTitle.length <= 60) score += 20;
    if (seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160) score += 20;
    if (seoData.keywords.split(',').length >= 3) score += 15;
    if (seoData.ogTitle && seoData.ogDescription) score += 15;
    if (seoData.ogImage) score += 10;
    if (seoData.canonicalUrl) score += 10;
    if (seoData.schema) score += 10;
    return score;
  };

  const seoScore = getSEOScore();

  return (
    <div className="space-y-6">
      {/* SEO Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Search Impressions</CardTitle>
            <Search className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{seoAnalytics.searchConsole.impressions.toLocaleString()}</div>
            <p className="text-xs text-gray-300">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Click-through Rate</CardTitle>
            <Target className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{seoAnalytics.searchConsole.ctr}%</div>
            <p className="text-xs text-gray-300">Above industry average</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Avg. Position</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{seoAnalytics.searchConsole.avgPosition}</div>
            <p className="text-xs text-gray-300">Search result ranking</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Page Speed</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{seoAnalytics.pageSpeed.mobile}/100</div>
            <p className="text-xs text-gray-300">Mobile performance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="optimization" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="optimization" className="text-white">SEO Optimization</TabsTrigger>
          <TabsTrigger value="analytics" className="text-white">Analytics</TabsTrigger>
          <TabsTrigger value="keywords" className="text-white">Keywords</TabsTrigger>
          <TabsTrigger value="technical" className="text-white">Technical SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="optimization" className="space-y-6">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Project SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Selection */}
              <div className="space-y-2">
                <Label className="text-white">Select Project</Label>
                <Select onValueChange={handleProjectSelect}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Choose a project to optimize" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {projects?.map((project: any) => (
                      <SelectItem key={project.id} value={project.id.toString()} className="text-white">
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProject && (
                <>
                  {/* SEO Score */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">SEO Score</h3>
                      <p className="text-gray-300 text-sm">Based on optimization factors</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`text-2xl font-bold ${seoScore >= 80 ? 'text-green-400' : seoScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {seoScore}/100
                      </div>
                      {seoScore >= 80 ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-yellow-400" />
                      )}
                    </div>
                  </div>

                  {/* Meta Title */}
                  <div className="space-y-2">
                    <Label className="text-white">Meta Title</Label>
                    <Input
                      value={seoData.metaTitle}
                      onChange={(e) => setSeoData(prev => ({ ...prev, metaTitle: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter meta title (30-60 characters)"
                    />
                    <p className="text-xs text-gray-400">
                      Length: {seoData.metaTitle.length}/60 characters
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-2">
                    <Label className="text-white">Meta Description</Label>
                    <Textarea
                      value={seoData.metaDescription}
                      onChange={(e) => setSeoData(prev => ({ ...prev, metaDescription: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter meta description (120-160 characters)"
                    />
                    <p className="text-xs text-gray-400">
                      Length: {seoData.metaDescription.length}/160 characters
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="space-y-2">
                    <Label className="text-white">Keywords</Label>
                    <Input
                      value={seoData.keywords}
                      onChange={(e) => setSeoData(prev => ({ ...prev, keywords: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter keywords separated by commas"
                    />
                  </div>

                  {/* Open Graph */}
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Open Graph Settings</h3>
                    
                    <div className="space-y-2">
                      <Label className="text-white">OG Title</Label>
                      <Input
                        value={seoData.ogTitle}
                        onChange={(e) => setSeoData(prev => ({ ...prev, ogTitle: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">OG Description</Label>
                      <Textarea
                        value={seoData.ogDescription}
                        onChange={(e) => setSeoData(prev => ({ ...prev, ogDescription: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">OG Image URL</Label>
                      <Input
                        value={seoData.ogImage}
                        onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  {/* Technical */}
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Technical SEO</h3>
                    
                    <div className="space-y-2">
                      <Label className="text-white">Canonical URL</Label>
                      <Input
                        value={seoData.canonicalUrl}
                        onChange={(e) => setSeoData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Schema Markup (JSON-LD)</Label>
                      <Textarea
                        value={seoData.schema}
                        onChange={(e) => setSeoData(prev => ({ ...prev, schema: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSEOUpdate}
                    disabled={updateSEOMutation.isPending}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {updateSEOMutation.isPending ? 'Updating...' : 'Update SEO Settings'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Keyword Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoAnalytics.keywordRankings.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <span className="text-white font-medium">{keyword.keyword}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-purple-400 border-purple-400">
                        Position #{keyword.position}
                      </Badge>
                      <Badge className={`${
                        keyword.change.startsWith('+') ? 'bg-green-600' : 
                        keyword.change.startsWith('-') ? 'bg-red-600' : 'bg-blue-600'
                      } text-white`}>
                        {keyword.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Page Speed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Desktop</span>
                    <Badge className="bg-green-600 text-white">{seoAnalytics.pageSpeed.desktop}/100</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Mobile</span>
                    <Badge className="bg-green-600 text-white">{seoAnalytics.pageSpeed.mobile}/100</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Backlinks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Backlinks</span>
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      {seoAnalytics.backlinks.total}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Referring Domains</span>
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      {seoAnalytics.backlinks.domains}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">New This Month</span>
                    <Badge className="bg-green-600 text-white">
                      +{seoAnalytics.backlinks.newThisMonth}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}