import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricCard as MetricCardType } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  metric: MetricCardType;
}

export function MetricCard({ metric }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getCardVariant = () => {
    switch (metric.type) {
      case 'success':
        return 'metric-card-success';
      case 'warning':
        return 'metric-card-warning';
      case 'critical':
        return 'metric-card-critical';
      default:
        return '';
    }
  };

  return (
    <div className={cn("metric-card p-6", getCardVariant())}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {metric.title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-foreground">
              {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
            </p>
            {metric.unit && (
              <span className="text-sm text-muted-foreground">{metric.unit}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {metric.description}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <div className={cn("flex items-center space-x-1", getTrendColor())}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}