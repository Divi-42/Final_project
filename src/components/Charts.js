import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

// Line Chart Component for Time Series Data
export const TimeSeriesChart = ({ data, dataKey = 'sales', xAxisKey = 'date', title, colors = ['#3B82F6'] }) => {
  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">{title}</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => {
                // Format date if it's a date string
                if (typeof value === 'string' && value.includes('-')) {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }
                return value;
              }}
            />
            <YAxis 
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => {
                // Format numbers with k for thousands
                if (value >= 1000) {
                  return `$${(value / 1000).toFixed(1)}k`;
                }
                return `$${value}`;
              }}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, dataKey.charAt(0).toUpperCase() + dataKey.slice(1)]}
              labelFormatter={(label) => {
                if (typeof label === 'string' && label.includes('-')) {
                  const date = new Date(label);
                  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                }
                return label;
              }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Bar Chart Component for Category Comparison
export const BarChartComponent = ({ 
  data, 
  dataKey = 'sales', 
  categoryKey = 'category', 
  title, 
  colors = ['#3B82F6'],
  fontSize = 14,
  titleFontSize = 16
}) => {
  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300" style={{ fontSize: titleFontSize }}>
        {title}
      </h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey={categoryKey} 
              tick={{ fill: '#6B7280', fontSize: fontSize }}
              interval={0}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: fontSize }}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `$${(value / 1000).toFixed(1)}k`;
                }
                return `$${value}`;
              }}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, dataKey.charAt(0).toUpperCase() + dataKey.slice(1)]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                fontSize: fontSize
              }}
            />
            <Legend wrapperStyle={{ fontSize: fontSize }} />
            <Bar 
              dataKey={dataKey} 
              fill={colors[0]} 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Pie Chart Component for Distribution
export const PieChartComponent = ({ data, dataKey = 'sales', nameKey = 'name', title, colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'] }) => {
  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">{title}</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              animationDuration={1500}
              animationEasing="ease-in-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, dataKey.charAt(0).toUpperCase() + dataKey.slice(1)]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Area Chart Component for Stacked Data
export const AreaChartComponent = ({ data, dataKeys = ['sales'], xAxisKey = 'date', title, colors = ['#3B82F6', '#10B981', '#F59E0B'] }) => {
  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">{title}</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => {
                if (typeof value === 'string' && value.includes('-')) {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }
                return value;
              }}
            />
            <YAxis 
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `$${(value / 1000).toFixed(1)}k`;
                }
                return `$${value}`;
              }}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
              labelFormatter={(label) => {
                if (typeof label === 'string' && label.includes('-')) {
                  const date = new Date(label);
                  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                }
                return label;
              }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend />
            {dataKeys.map((key, index) => (
              <Area 
                key={key}
                type="monotone" 
                dataKey={key} 
                stackId="1"
                stroke={colors[index % colors.length]} 
                fill={colors[index % colors.length]} 
                fillOpacity={0.6}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Composite Chart for Dashboard Overview
export const DashboardOverviewChart = ({ data, title }) => {
  // Process data for the overview chart
  const processedData = data.map(item => ({
    date: item.date,
    sales: item.sales,
    orders: item.quantity,
    average: item.sales / (item.quantity || 1)
  }));

  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">{title}</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => {
                if (typeof value === 'string' && value.includes('-')) {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }
                return value;
              }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `$${(value / 1000).toFixed(1)}k`;
                }
                return `$${value}`;
              }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'sales') return [`$${value.toLocaleString()}`, 'Sales'];
                if (name === 'orders') return [value, 'Orders'];
                if (name === 'average') return [`$${value.toFixed(2)}`, 'Avg. Order'];
                return [value, name];
              }}
              labelFormatter={(label) => {
                if (typeof label === 'string' && label.includes('-')) {
                  const date = new Date(label);
                  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                }
                return label;
              }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="sales" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="orders" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="average" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
