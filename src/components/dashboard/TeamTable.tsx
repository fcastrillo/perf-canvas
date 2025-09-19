import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TeamMetrics } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface TeamTableProps {
  teams: TeamMetrics[];
}

type SortField = keyof TeamMetrics;
type SortDirection = 'asc' | 'desc';

export function TeamTable({ teams }: TeamTableProps) {
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

  const sortedTeams = [...teams].sort((a, b) => {
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
    if (score >= 8) return 'text-blue-600 font-semibold';
    if (score >= 7) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const getMetricColor = (value: number, type: 'time' | 'deploy' | 'productivity' | 'quality' | 'deviation' | 'errors') => {
    switch (type) {
      case 'time':
        return value <= 7 ? 'text-green-600' : value <= 9 ? 'text-yellow-600' : 'text-red-600';
      case 'deploy':
        return value >= 15 ? 'text-green-600' : value >= 12 ? 'text-yellow-600' : 'text-red-600';
      case 'productivity':
        return value >= 90 ? 'text-green-600' : value >= 80 ? 'text-yellow-600' : 'text-red-600';
      case 'quality':
        return value >= 8.5 ? 'text-green-600' : value >= 7.5 ? 'text-yellow-600' : 'text-red-600';
      case 'deviation':
        return value <= 10 ? 'text-green-600' : value <= 15 ? 'text-yellow-600' : 'text-red-600';
      case 'errors':
        return value <= 3 ? 'text-green-600' : value <= 4 ? 'text-yellow-600' : 'text-red-600';
      default:
        return 'text-foreground';
    }
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
    <div className="bg-card rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-primary to-primary-light">
        <h3 className="text-lg font-semibold text-primary-foreground">
          Performance por Equipos
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="table-header">
            <tr>
              <SortableHeader field="name">Equipo</SortableHeader>
              <SortableHeader field="cycleTime">Tiempo Ciclo</SortableHeader>
              <SortableHeader field="deployments">Despliegues/Sem</SortableHeader>
              <SortableHeader field="productivity">Productividad</SortableHeader>
              <SortableHeader field="quality">Calidad</SortableHeader>
              <SortableHeader field="deviation">Desviación</SortableHeader>
              <SortableHeader field="errors">Errores</SortableHeader>
              <SortableHeader field="score">Score Total</SortableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedTeams.map((team, index) => (
              <tr 
                key={team.name} 
                className={cn(
                  "table-row hover:scale-[1.01] transition-all duration-200",
                  index % 2 === 0 ? "bg-card" : "bg-muted/30"
                )}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-foreground">{team.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn("font-medium", getMetricColor(team.cycleTime, 'time'))}>
                    {team.cycleTime} días
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn("font-medium", getMetricColor(team.deployments, 'deploy'))}>
                    {team.deployments}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn("font-medium", getMetricColor(team.productivity, 'productivity'))}>
                    {team.productivity}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn("font-medium", getMetricColor(team.quality, 'quality'))}>
                    {team.quality}/10
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn("font-medium", getMetricColor(team.deviation, 'deviation'))}>
                    {team.deviation}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn("font-medium", getMetricColor(team.errors, 'errors'))}>
                    {team.errors}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn("text-lg font-bold", getScoreColor(team.score))}>
                    {team.score}/10
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