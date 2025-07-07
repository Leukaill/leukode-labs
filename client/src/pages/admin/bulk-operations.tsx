import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Star, Archive, Download, Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BulkOperationsPanel() {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState('');
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

  const bulkUpdateMutation = useMutation({
    mutationFn: async ({ action, projectIds }: { action: string; projectIds: number[] }) => {
      const promises = projectIds.map(async (id) => {
        const project = projects?.find((p: any) => p.id === id);
        if (!project) return;

        let updateData = { ...project };
        
        switch (action) {
          case 'feature':
            updateData.featured = true;
            break;
          case 'unfeature':
            updateData.featured = false;
            break;
          case 'delete':
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(`Failed to delete project ${id}`);
            return;
          default:
            throw new Error('Invalid bulk action');
        }

        const res = await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });
        
        if (!res.ok) throw new Error(`Failed to update project ${id}`);
        return res.json();
      });

      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setSelectedProjects([]);
      setBulkAction('');
      toast({
        title: 'Bulk Operation Complete',
        description: `Successfully processed ${selectedProjects.length} projects.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Bulk Operation Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSelectAll = () => {
    if (selectedProjects.length === projects?.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(projects?.map((p: any) => p.id) || []);
    }
  };

  const handleSelectProject = (projectId: number) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedProjects.length === 0) {
      toast({
        title: 'Invalid Selection',
        description: 'Please select projects and an action.',
        variant: 'destructive',
      });
      return;
    }

    bulkUpdateMutation.mutate({ action: bulkAction, projectIds: selectedProjects });
  };

  const exportData = () => {
    const selectedData = projects?.filter((p: any) => selectedProjects.includes(p.id)) || [];
    const dataStr = JSON.stringify(selectedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `projects_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Export Complete',
      description: `Exported ${selectedProjects.length} projects.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Bulk Actions Header */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Bulk Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedProjects.length === projects?.length && projects?.length > 0}
                onCheckedChange={handleSelectAll}
                className="border-gray-400"
              />
              <span className="text-gray-300 text-sm">
                Select All ({selectedProjects.length} selected)
              </span>
            </div>

            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Choose action" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="feature" className="text-white">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Mark as Featured
                  </div>
                </SelectItem>
                <SelectItem value="unfeature" className="text-white">
                  <div className="flex items-center">
                    <Archive className="h-4 w-4 mr-2" />
                    Remove Featured
                  </div>
                </SelectItem>
                <SelectItem value="delete" className="text-white">
                  <div className="flex items-center">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Projects
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleBulkAction}
              disabled={selectedProjects.length === 0 || !bulkAction || bulkUpdateMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {bulkUpdateMutation.isPending ? 'Processing...' : 'Apply Action'}
            </Button>

            <Button
              onClick={exportData}
              disabled={selectedProjects.length === 0}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Selected
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Project Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projects?.map((project: any) => (
              <div
                key={project.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  selectedProjects.includes(project.id)
                    ? 'bg-purple-500/20 border-purple-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedProjects.includes(project.id)}
                    onCheckedChange={() => handleSelectProject(project.id)}
                    className="border-gray-400"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-medium">{project.title}</h3>
                      {project.featured && (
                        <Badge className="bg-purple-600 text-white">Featured</Badge>
                      )}
                      <Badge variant="outline" className="text-gray-300 border-gray-500">
                        {project.category}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-1">
                      {project.description}
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    ID: {project.id}
                  </Badge>
                  {project.metrics && (
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      <FileText className="h-3 w-3 mr-1" />
                      Metrics
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{projects?.length || 0}</div>
              <div className="text-sm text-gray-300">Total Projects</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{selectedProjects.length}</div>
              <div className="text-sm text-gray-300">Selected Projects</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {projects?.filter((p: any) => p.featured).length || 0}
              </div>
              <div className="text-sm text-gray-300">Featured Projects</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}