import { AlertTriangle, TrendingDown, Clock, Bug } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface AlertItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  team?: string;
  metric: string;
  value: string;
  icon: React.ReactNode;
}

export function AlertPanel() {
  const alerts: AlertItem[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Alto número de tickets críticos',
      description: 'Station Core tiene 4 tickets críticos pendientes, superando el umbral de 3.',
      team: 'Station Core',
      metric: 'Tickets Críticos',
      value: '4',
      icon: <Bug className="h-4 w-4" />
    },
    {
      id: '2',
      type: 'warning',
      title: 'Desviación de fechas elevada',
      description: 'ilana Va y Station Core superan el 15% de desviación en fechas de release.',
      team: 'ilana Va, Station Core',
      metric: 'Desviación Release',
      value: '18-22%',
      icon: <Clock className="h-4 w-4" />
    }
  ];

  const getAlertColor = (type: AlertItem['type']) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getBadgeVariant = (type: AlertItem['type']) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h3 className="text-lg font-semibold text-foreground">
          Alertas Activas
        </h3>
        <Badge variant="secondary" className="ml-2">
          {alerts.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <Alert key={alert.id} className={getAlertColor(alert.type)}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {alert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {alert.title}
                  </h4>
                  <Badge variant={getBadgeVariant(alert.type)} className="text-xs">
                    {alert.type === 'critical' ? 'Crítico' : 'Advertencia'}
                  </Badge>
                </div>
                <AlertDescription className="text-sm text-muted-foreground mb-2">
                  {alert.description}
                </AlertDescription>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {alert.team && (
                    <span>
                      <strong>Equipo:</strong> {alert.team}
                    </span>
                  )}
                  <span>
                    <strong>Métrica:</strong> {alert.metric}
                  </span>
                  <span>
                    <strong>Valor:</strong> {alert.value}
                  </span>
                </div>
              </div>
            </div>
          </Alert>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <div className="text-green-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-muted-foreground">No hay alertas activas</p>
          <p className="text-sm text-muted-foreground mt-1">
            Todas las métricas están dentro de los rangos esperados
          </p>
        </div>
      )}
    </div>
  );
}