import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { TeamTable } from '@/components/dashboard/TeamTable';
import { DeveloperTable } from '@/components/dashboard/DeveloperTable';
import { TrendCharts } from '@/components/dashboard/TrendCharts';
import { AlertPanel } from '@/components/dashboard/AlertPanel';
import { PeriodFilter, ViewType } from '@/types/dashboard';
import { metricCards, teamsData, developersData, quarterlyTrends } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentPeriod, setCurrentPeriod] = useState<PeriodFilter>('Q4');
  const [currentView, setCurrentView] = useState<ViewType>('global');
  const { toast } = useToast();

  const handlePeriodChange = (period: PeriodFilter) => {
    setCurrentPeriod(period);
    toast({
      title: "Período actualizado",
      description: `Mostrando datos para ${period} 2024`,
    });
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleRefresh = () => {
    toast({
      title: "Datos actualizados",
      description: "La información del dashboard ha sido actualizada correctamente.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportando datos",
      description: "El reporte será descargado en formato PDF en unos momentos.",
    });
  };

  const renderGlobalView = () => (
    <>
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4 mb-8">
        {metricCards.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Team Performance Table */}
      <TeamTable teams={teamsData} />

      {/* Alerts Panel */}
      <AlertPanel />
    </>
  );

  const renderTeamsView = () => (
    <>
      {/* Key Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricCards.slice(0, 4).map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Team Performance Table */}
      <TeamTable teams={teamsData} />

      {/* Team Comparison Charts */}
      <TrendCharts trends={quarterlyTrends} />
    </>
  );

  const renderIndividualView = () => (
    <>
      {/* Individual Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metricCards.slice(0, 3).map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Developer Performance Table */}
      <DeveloperTable developers={developersData} />

      {/* Performance Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-card rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Top Performers del Trimestre
          </h3>
          <div className="space-y-3">
            {developersData.slice(0, 3).map((dev, index) => (
              <div key={dev.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{dev.name}</p>
                    <p className="text-sm text-muted-foreground">{dev.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-primary">{dev.score}/10</p>
                  <p className="text-xs text-muted-foreground">{dev.bugsResolved} bugs resueltos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Actividad Semanal Promedio
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Commits por semana</span>
              <span className="font-bold text-foreground">
                {(developersData.reduce((acc, dev) => acc + dev.commits, 0) / developersData.length).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">PRs por semana</span>
              <span className="font-bold text-foreground">
                {(developersData.reduce((acc, dev) => acc + dev.prs, 0) / developersData.length).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Code Reviews</span>
              <span className="font-bold text-foreground">
                {(developersData.reduce((acc, dev) => acc + dev.reviews, 0) / developersData.length).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Bugs resueltos</span>
              <span className="font-bold text-foreground">
                {Math.round(developersData.reduce((acc, dev) => acc + dev.bugsResolved, 0) / developersData.length)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderTrendsView = () => (
    <>
      {/* Trend Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricCards.slice(0, 4).map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* All Charts */}
      <TrendCharts trends={quarterlyTrends} />

      {/* Trend Analysis Summary */}
      <div className="bg-card rounded-xl shadow-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Análisis de Tendencias 2024
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">🚀 Mejoras Significativas</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Tiempo de ciclo reducido en 57%</li>
              <li>• Despliegues incrementados 214%</li>
              <li>• Productividad aumentada 41%</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">⚡ Áreas de Oportunidad</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Reducir desviación de fechas</li>
              <li>• Mejorar calidad de código</li>
              <li>• Optimizar resolución de bugs</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">🎯 Objetivos Q1 2025</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Tiempo ciclo &lt; 6 días</li>
              <li>• 20+ despliegues/semana</li>
              <li>• 95% productividad</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'teams':
        return renderTeamsView();
      case 'individual':
        return renderIndividualView();
      case 'trends':
        return renderTrendsView();
      default:
        return renderGlobalView();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        currentPeriod={currentPeriod}
        onPeriodChange={handlePeriodChange}
        currentView={currentView}
        onViewChange={handleViewChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />
      
      <main className="px-6 pb-8">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
