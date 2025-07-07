import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Plus, Trash2, Eye, BarChart3, Settings, Target, Globe, Users, Activity } from 'lucide-react';
import { ProjectEditModal } from './project-edit-modal';
import { AnalyticsPanel } from './analytics';
import { BulkOperationsPanel } from './bulk-operations';
import { SEOManagementPanel } from './seo-management';
import { Project } from '@/types/portfolio';
import { apiRequest } from '@/lib/queryClient';

export default function AdminDashboard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => apiRequest('/api/projects'),
  });

  const { data: contactSubmissions } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error('Failed to fetch contacts');
      return res.json();
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
    },
  });

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsCreating(false);
    setIsEditModalOpen(true);
  };

  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsCreating(true);
    setIsEditModalOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-violet-900/30 flex items-center justify-center">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  const stats = {
    totalProjects: projects?.length || 0,
    featuredProjects: projects?.filter((p: Project) => p.featured).length || 0,
    totalContacts: contactSubmissions?.length || 0,
    categories: new Set(projects?.map((p: Project) => p.category)).size || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-violet-900/30">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Comprehensive Admin Dashboard</h1>
          <p className="text-gray-300">Complete portfolio management, analytics, and optimization tools</p>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Projects</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
              <p className="text-xs text-gray-300">Active portfolio items</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Featured Projects</CardTitle>
              <Eye className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.featuredProjects}</div>
              <p className="text-xs text-gray-300">Highlighted showcases</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Contact Inquiries</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalContacts}</div>
              <p className="text-xs text-gray-300">Lead submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Categories</CardTitle>
              <Settings className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.categories}</div>
              <p className="text-xs text-gray-300">Project types</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700 p-1">
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-purple-600">
              <Settings className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="bulk" className="text-white data-[state=active]:bg-purple-600">
              <Activity className="h-4 w-4 mr-2" />
              Bulk Operations
            </TabsTrigger>
            <TabsTrigger value="seo" className="text-white data-[state=active]:bg-purple-600">
              <Target className="h-4 w-4 mr-2" />
              SEO Management
            </TabsTrigger>
            <TabsTrigger value="contacts" className="text-white data-[state=active]:bg-purple-600">
              <Users className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
          </TabsList>

          {/* Projects Management Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-white">Portfolio Projects Management</CardTitle>
                <Button
                  onClick={handleCreateProject}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Project
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects?.map((project: Project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                          {project.featured && (
                            <Badge className="bg-purple-600 text-white">Featured</Badge>
                          )}
                          <Badge variant="outline" className="text-gray-300 border-gray-500">
                            {project.category}
                          </Badge>
                          <Badge variant="outline" className="text-blue-400 border-blue-500">
                            ID: {project.id}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                          {project.description}
                        </p>
                        {project.technologies && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs text-purple-400 border-purple-400">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 4 && (
                              <Badge variant="outline" className="text-xs text-gray-400 border-gray-500">
                                +{project.technologies.length - 4} more
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                          {project.metrics && <span>Metrics: {project.metrics}</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProject(project)}
                          className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProject(project.id)}
                          className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsPanel />
          </TabsContent>

          {/* Bulk Operations Tab */}
          <TabsContent value="bulk">
            <BulkOperationsPanel />
          </TabsContent>

          {/* SEO Management Tab */}
          <TabsContent value="seo">
            <SEOManagementPanel />
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">Contact Inquiries Management</CardTitle>
              </CardHeader>
              <CardContent>
                {contactSubmissions && contactSubmissions.length > 0 ? (
                  <div className="space-y-4">
                    {contactSubmissions.map((contact: any) => (
                      <div
                        key={contact.id}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <h4 className="text-white font-medium">
                              {contact.firstName} {contact.lastName}
                            </h4>
                            <Badge variant="outline" className="text-purple-400 border-purple-400">
                              {contact.projectType}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-gray-300 text-sm">
                            <span className="text-gray-400">Email:</span> {contact.email}
                          </p>
                          {contact.company && (
                            <p className="text-gray-300 text-sm">
                              <span className="text-gray-400">Company:</span> {contact.company}
                            </p>
                          )}
                          <p className="text-gray-300 text-sm">
                            <span className="text-gray-400">Project Details:</span> {contact.projectDetails}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No contact inquiries yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit/Create Modal */}
      <ProjectEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={selectedProject}
        isCreating={isCreating}
      />
    </div>
  );
}