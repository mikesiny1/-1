import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ClientCategory, PropertyStatus } from '../types';

interface DistributionChartProps {
  type?: 'client' | 'property';
}

export default function DistributionChart({ type = 'client' }: DistributionChartProps) {
  const clientData = [
    { name: ClientCategory.NEW, value: 30 },
    { name: ClientCategory.RETURNING, value: 25 },
    { name: ClientCategory.VIP, value: 15 },
    { name: ClientCategory.POTENTIAL, value: 30 },
  ];

  const propertyData = [
    { name: PropertyStatus.AVAILABLE, value: 40 },
    { name: PropertyStatus.RESERVED, value: 20 },
    { name: PropertyStatus.SOLD, value: 25 },
    { name: PropertyStatus.IN_PROCESS, value: 15 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  const data = type === 'client' ? clientData : propertyData;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
            <span className="text-sm text-gray-600">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}