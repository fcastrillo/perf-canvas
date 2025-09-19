import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DeveloperMetrics } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface DeveloperTableProps {
  developers: DeveloperMetrics[];
}

type SortField = keyof DeveloperMetrics;
type SortDirection = 'asc' | 'desc';

export function DeveloperTable({ developers }: DeveloperTableProps) {
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedDevelopers = [...developers].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 font-semibold';
    if (score >= 8.5) return 'text-blue-600 font-semibold';
    if (score >= 8) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th 
      className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-primary-light transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden mt-6">
      <div className="px-6 py-4 bg-gradient-to-r from-primary to-primary-light">
        <h3 className="text-lg font-semibold text-primary-foreground">
          Performance Individual de Desarrolladores
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="table-header">
            <tr>
              <SortableHeader field="name">Desarrollador</SortableHeader>
              <SortableHeader field="team">Equipo</SortableHeader>
              <SortableHeader field="commits">Commits/Sem</SortableHeader>
              <SortableHeader field="prs">PRs/Sem</SortableHeader>
              <SortableHeader field="reviews">Code Reviews</SortableHeader>
              <SortableHeader field="bugsResolved">Bugs Resueltos</SortableHeader>
              <SortableHeader field="score">Score Individual</SortableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedDevelopers.map((developer, index) => (
              <tr 
                key={developer.name} 
                className={cn(
                  "table-row hover:scale-[1.01] transition-all duration-200",
                  index % 2 === 0 ? "bg-card" : "bg-muted/30"
                )}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-foreground">{developer.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                    {developer.team}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground font-medium">
                  {developer.commits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground font-medium">
                  {developer.prs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground font-medium">
                  {developer.reviews}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground font-medium">
                  {developer.bugsResolved}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn("text-lg font-bold", getScoreColor(developer.score))}>
                    {developer.score}/10
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}