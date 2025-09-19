import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { QuarterlyTrends } from '@/types/dashboard';

interface TrendChartsProps {
  trends: QuarterlyTrends[];
}

export function TrendCharts({ trends }: TrendChartsProps) {
  // Data for pie chart showing bug distribution by team
  const bugDistribution = [
    { name: 'Toolfi MX', value: 15, color: '#10b981' },
    { name: 'Luca V2', value: 18, color: '#3b82f6' },
    { name: 'ilana App', value: 22, color: '#f59e0b' },
    { name: 'ilana Va', value: 25, color: '#ef4444' },
    { name: 'Station Core', value: 20, color: '#8b5cf6' }
  ];

  // Data for team comparison
  const teamComparison = [
    { team: 'Toolfi MX', score: 9.2, deployments: 18.2, productivity: 92 },
    { team: 'Luca V2', score: 8.9, deployments: 16.5, productivity: 89 },
    { team: 'ilana App', score: 8.4, deployments: 14.1, productivity: 85 },
    { team: 'ilana Va', score: 8.1, deployments: 12.8, productivity: 82 },
    { team: 'Station Core', score: 7.8, deployments: 11.5, productivity: 78 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'productivity' ? '%' : entry.dataKey === 'cycleTime' ? ' días' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
      {/* Quarterly Trends Line Chart */}
      <div className="lg:col-span-2 bg-card rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Tendencias Trimestrales 2024
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="quarter" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="cycleTime" 
              stroke="#ef4444" 
              strokeWidth={3}
              name="Tiempo de Ciclo"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="deployments" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Despliegues"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="productivity" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Productividad"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bug Distribution Pie Chart */}
      <div className="bg-card rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Distribución de Bugs por Equipo
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={bugDistribution}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {bugDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Team Comparison Bar Chart */}
      <div className="lg:col-span-3 bg-card rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Comparativa de Equipos - Score vs Despliegues vs Productividad
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={teamComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="team" 
              stroke="#6b7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" fill="#3b82f6" name="Score Total" radius={[4, 4, 0, 0]} />
            <Bar dataKey="deployments" fill="#10b981" name="Despliegues/Sem" radius={[4, 4, 0, 0]} />
            <Bar dataKey="productivity" fill="#f59e0b" name="Productividad %" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}