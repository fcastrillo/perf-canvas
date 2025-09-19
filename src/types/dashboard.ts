export interface TeamMetrics {
  name: string;
  cycleTime: number;
  deployments: number;
  productivity: number;
  quality: number;
  deviation: number;
  errors: number;
  score: number;
}

export interface DeveloperMetrics {
  name: string;
  team: string;
  commits: number;
  prs: number;
  reviews: number;
  bugsResolved: number;
  score: number;
}

export interface QuarterlyTrends {
  quarter: string;
  cycleTime: number;
  deployments: number;
  productivity: number;
  quality: number;
}

export interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  description: string;
  type: 'primary' | 'success' | 'warning' | 'critical';
}

export type PeriodFilter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type ViewType = 'global' | 'teams' | 'individual' | 'trends';