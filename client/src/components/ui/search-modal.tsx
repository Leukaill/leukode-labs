import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'wouter';
import type { Project } from '@/types/portfolio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const packages = [
  {
    name: 'Professional Starter',
    description: 'Premium Web Solutions',
    price: '$15,000',
    slug: 'professional-starter',
    type: 'package'
  },
  {
    name: 'Enterprise Professional',
    description: 'Complete Digital Transformation',
    price: '$45,000',
    slug: 'enterprise-professional',
    type: 'package'
  },
  {
    name: 'Impossible Elite',
    description: 'Revolutionary Web Experience',
    price: '$85,000',
    slug: 'impossible-elite',
    type: 'package'
  }
];

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    enabled: isOpen,
  });

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const packageResults = packages
      .filter(pkg => 
        pkg.name.toLowerCase().includes(searchLower) ||
        pkg.description.toLowerCase().includes(searchLower)
      )
      .map(pkg => ({ ...pkg, type: 'package' }));

    const projectResults = (projects || [])
      .filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.category.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      )
      .map(project => ({ ...project, type: 'project' }));

    setFilteredResults([...packageResults, ...projectResults]);
  }, [searchTerm, projects]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // This would be called from parent component
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center p-6 border-b border-gray-200/50">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search packages and projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {searchTerm && filteredResults.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No results found for "{searchTerm}"
            </div>
          ) : (
            <div className="divide-y divide-gray-200/50">
              {filteredResults.map((result, index) => (
                <div key={index} className="p-4 hover:bg-gray-50/50 transition-colors">
                  {result.type === 'package' ? (
                    <Link
                      href={`/package/${result.slug}`}
                      className="block"
                      onClick={onClose}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{result.name}</h3>
                          <p className="text-sm text-gray-600">{result.description}</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Package
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">{result.price}</span>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="block">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{result.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Portfolio
                            </span>
                            <span className="text-xs text-gray-500">{result.category}</span>
                          </div>
                          {result.technologies && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {result.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                                <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};