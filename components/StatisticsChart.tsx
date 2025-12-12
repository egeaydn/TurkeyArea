// Population Statistics Chart Component
'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatisticsChartProps {
  data: Array<{
    name: string;
    population: number;
    districts: number;
  }>;
}

export default function StatisticsChart({ data }: StatisticsChartProps) {
  if (!data || data.length === 0) return null;

  // En kalabalık 10 ili al
  const topCities = [...data]
    .sort((a, b) => b.population - a.population)
    .slice(0, 10);

  const chartData = topCities.map(city => ({
    name: city.name,
    nüfus: city.population,
  }));

  const COLORS = [
    '#E62727', '#1E93AB', '#E62727', '#1E93AB', '#E62727',
    '#1E93AB', '#E62727', '#1E93AB', '#E62727', '#1E93AB'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#F3F2EC] rounded-2xl shadow-xl border-2 border-[#DCDCDC] p-6"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">📊 En Kalabalık 10 İl</h3>
        <p className="text-sm text-gray-600">Nüfus bazlı sıralama</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={80}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value;
            }}
          />
          <Tooltip 
            formatter={(value: number) => [value.toLocaleString('tr-TR'), 'Nüfus']}
            contentStyle={{ 
              backgroundColor: '#FFF', 
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="nüfus" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
