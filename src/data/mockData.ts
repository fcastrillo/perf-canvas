import { TeamMetrics, DeveloperMetrics, QuarterlyTrends, MetricCard } from '@/types/dashboard';

export const teamsData: TeamMetrics[] = [
  {
    name: "Toolfi MX",
    cycleTime: 6.8,
    deployments: 18.2,
    productivity: 92,
    quality: 8.9,
    deviation: 8,
    errors: 2.1,
    score: 9.2
  },
  {
    name: "Luca V2",
    cycleTime: 7.1,
    deployments: 16.5,
    productivity: 89,
    quality: 8.6,
    deviation: 10,
    errors: 2.8,
    score: 8.9
  },
  {
    name: "ilana App",
    cycleTime: 8.9,
    deployments: 14.1,
    productivity: 85,
    quality: 8.2,
    deviation: 15,
    errors: 3.5,
    score: 8.4
  },
  {
    name: "ilana Va",
    cycleTime: 9.2,
    deployments: 12.8,
    productivity: 82,
    quality: 7.9,
    deviation: 18,
    errors: 4.1,
    score: 8.1
  },
  {
    name: "Station Core",
    cycleTime: 10.1,
    deployments: 11.5,
    productivity: 78,
    quality: 7.6,
    deviation: 22,
    errors: 4.8,
    score: 7.8
  }
];

export const developersData: DeveloperMetrics[] = [
  {
    name: "Carlos M.",
    team: "Toolfi MX",
    commits: 12.3,
    prs: 8.7,
    reviews: 15.2,
    bugsResolved: 23,
    score: 9.4
  },
  {
    name: "Ana L.",
    team: "Luca V2",
    commits: 11.8,
    prs: 8.2,
    reviews: 14.8,
    bugsResolved: 21,
    score: 9.2
  },
  {
    name: "Miguel R.",
    team: "ilana App",
    commits: 10.9,
    prs: 7.9,
    reviews: 13.5,
    bugsResolved: 19,
    score: 8.9
  },
  {
    name: "Sofia P.",
    team: "ilana Va",
    commits: 10.2,
    prs: 7.4,
    reviews: 12.8,
    bugsResolved: 17,
    score: 8.7
  },
  {
    name: "Diego C.",
    team: "Station Core",
    commits: 9.8,
    prs: 7.1,
    reviews: 12.1,
    bugsResolved: 16,
    score: 8.5
  }
];

export const quarterlyTrends: QuarterlyTrends[] = [
  {
    quarter: "Q1 2024",
    cycleTime: 15.2,
    deployments: 5.8,
    productivity: 65,
    quality: 6.8
  },
  {
    quarter: "Q2 2024",
    cycleTime: 12.5,
    deployments: 8.7,
    productivity: 72,
    quality: 7.4
  },
  {
    quarter: "Q3 2024",
    cycleTime: 8.2,
    deployments: 15.3,
    productivity: 87,
    quality: 8.1
  },
  {
    quarter: "Q4 2024",
    cycleTime: 6.5,
    deployments: 18.2,
    productivity: 92,
    quality: 8.7
  }
];

export const metricCards: MetricCard[] = [
  {
    id: 'cycle-time',
    title: 'Tiempo de Ciclo Promedio',
    value: 8.2,
    unit: 'días',
    trend: 'down',
    trendValue: -23.5,
    description: 'Tiempo promedio desde commit hasta producción',
    type: 'success'
  },
  {
    id: 'deployments',
    title: 'Despliegues por Semana',
    value: 15.3,
    unit: 'deploys',
    trend: 'up',
    trendValue: 28.7,
    description: 'Frecuencia de releases a producción',
    type: 'success'
  },
  {
    id: 'productivity',
    title: 'Productividad Equipo',
    value: 87,
    unit: '%',
    trend: 'up',
    trendValue: 15.2,
    description: 'Eficiencia general de entrega',
    type: 'primary'
  },
  {
    id: 'quality',
    title: 'Calidad Código',
    value: 8.4,
    unit: '/10',
    trend: 'up',
    trendValue: 12.1,
    description: 'Score de calidad técnica',
    type: 'primary'
  },
  {
    id: 'deviation',
    title: 'Desviación Fechas Release',
    value: 12,
    unit: '%',
    trend: 'down',
    trendValue: -18.3,
    description: 'Varianza en fechas de entrega',
    type: 'warning'
  },
  {
    id: 'errors',
    title: 'Errores Post-Despliegue',
    value: 3.2,
    unit: '%',
    trend: 'down',
    trendValue: -25.6,
    description: 'Bugs críticos en producción',
    type: 'success'
  },
  {
    id: 'tickets',
    title: 'Tickets Críticos',
    value: 2.1,
    unit: 'avg',
    trend: 'neutral',
    trendValue: 0.8,
    description: 'Incidencias críticas pendientes',
    type: 'critical'
  }
];