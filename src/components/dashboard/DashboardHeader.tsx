import { useState } from 'react';
import { Calendar, Filter, RefreshCw, Download, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PeriodFilter, ViewType } from '@/types/dashboard';

interface DashboardHeaderProps {
  currentPeriod: PeriodFilter;
  onPeriodChange: (period: PeriodFilter) => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onRefresh: () => void;
  onExport: () => void;
}

export function DashboardHeader({ 
  currentPeriod, 
  onPeriodChange, 
  currentView, 
  onViewChange,
  onRefresh,
  onExport
}: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    onRefresh();
    setIsRefreshing(false);
  };

  const views = [
    { id: 'global' as ViewType, label: 'Global', description: 'Vista general de métricas' },
    { id: 'teams' as ViewType, label: 'Por Equipo', description: 'Performance por equipos' },
    { id: 'individual' as ViewType, label: 'Individual', description: 'Métricas individuales' },
    { id: 'trends' as ViewType, label: 'Tendencias', description: 'Análisis temporal' }
  ];

  const periods = [
    { id: 'Q1' as PeriodFilter, label: 'Q1 2024' },
    { id: 'Q2' as PeriodFilter, label: 'Q2 2024' },
    { id: 'Q3' as PeriodFilter, label: 'Q3 2024' },
    { id: 'Q4' as PeriodFilter, label: 'Q4 2024' }
  ];

  return (
    <div className="dashboard-header px-6 py-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title and Description */}
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Station Performance Dashboard
            </h1>
            <Badge variant="outline" className="text-primary border-primary">
              Q4 2024
            </Badge>
            <div className="flex items-center space-x-1">
              <Bell className="h-4 w-4 text-warning" />
              <span className="text-sm text-warning font-medium">2 alertas</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-1">
            Dashboard ejecutivo para métricas de performance de equipos de desarrollo
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="hidden sm:flex"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button variant="outline" size="sm" onClick={onExport} className="hidden sm:flex">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Navigation and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-6">
        {/* View Navigation */}
        <div className="flex flex-wrap gap-2">
          {views.map((view) => (
            <Button
              key={view.id}
              variant={currentView === view.id ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange(view.id)}
              className="whitespace-nowrap"
            >
              {view.label}
            </Button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={currentPeriod} onValueChange={(value) => onPeriodChange(value as PeriodFilter)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.id} value={period.id}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrar equipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los equipos</SelectItem>
                <SelectItem value="toolfi">Toolfi MX</SelectItem>
                <SelectItem value="luca">Luca V2</SelectItem>
                <SelectItem value="ilana-app">ilana App</SelectItem>
                <SelectItem value="ilana-va">ilana Va</SelectItem>
                <SelectItem value="station">Station Core</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}