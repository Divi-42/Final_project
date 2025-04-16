import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateSampleData } from '../utils/csvParser';
import { 
  BarChartComponent, 
  PieChartComponent, 
  AreaChartComponent,
  DashboardOverviewChart
} from '../components/Charts';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('revenue');
  const [dateFilter, setDateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  useEffect(() => {
    // Try to get data from localStorage (from Upload page)
    const storedData = localStorage.getItem('dashboardData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setDashboardData(parsedData);
      } catch (error) {
        console.error('Error parsing dashboard data:', error);
        // If there's an error, use sample data as fallback
        setDashboardData(generateSampleData('retail'));
      }
    } else {
      // If no data in localStorage, use sample data
      setDashboardData(generateSampleData('retail'));
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Extract data for display
  const summary = dashboardData?.summary || {
    totalSales: 0,
    totalQuantity: 0,
    averageOrderValue: 0
  };
  
  const filters = dashboardData?.filters || {
    categories: [],
    regions: [],
    products: []
  };
  const getFilteredData = () => {
    if (!dashboardData || !dashboardData.rawData) return [];
    
    return dashboardData.rawData.filter(item => {
      let matchesCategory = true;
      let matchesRegion = true;
      
      if (categoryFilter !== 'all' && item.category) {
        matchesCategory = item.category === categoryFilter;
      }
      
      if (regionFilter !== 'all' && item.region) {
        matchesRegion = item.region === regionFilter;
      }
      
      return matchesCategory && matchesRegion;
    });
  };

  const filteredData = getFilteredData();

  // Prepare data for charts
  const prepareChartData = () => {
    // Group by date for time series
    const salesByDate = {};
    filteredData.forEach(item => {
      if (!item.date) return;
      
      if (!salesByDate[item.date]) {
        salesByDate[item.date] = { date: item.date, sales: 0, quantity: 0 };
      }
      
      salesByDate[item.date].sales += (parseFloat(item.sales) || 0);
      salesByDate[item.date].quantity += (parseInt(item.quantity) || 0);
    });
    
    // Convert to array and sort by date
    const timeSeriesData = Object.values(salesByDate).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    // Group by category
    const salesByCategory = {};
    filteredData.forEach(item => {
      if (!item.category) return;
      
      if (!salesByCategory[item.category]) {
        salesByCategory[item.category] = { category: item.category, sales: 0, quantity: 0 };
      }
      
      salesByCategory[item.category].sales += (parseFloat(item.sales) || 0);
      salesByCategory[item.category].quantity += (parseInt(item.quantity) || 0);
    });
    
    // Convert to array
    const categoryData = Object.values(salesByCategory);
    
    // Group by region
    const salesByRegion = {};
    filteredData.forEach(item => {
      if (!item.region) return;
      
      if (!salesByRegion[item.region]) {
        salesByRegion[item.region] = { name: item.region, sales: 0, quantity: 0 };
      }
      
      salesByRegion[item.region].sales += (parseFloat(item.sales) || 0);
      salesByRegion[item.region].quantity += (parseInt(item.quantity) || 0);
    });
    
    // Convert to array
    const regionData = Object.values(salesByRegion);
    
    // Group by product for top products
    const salesByProduct = {};
    filteredData.forEach(item => {
      if (!item.product) return;
      
      if (!salesByProduct[item.product]) {
        salesByProduct[item.product] = { product: item.product, sales: 0, quantity: 0 };
      }
      
      salesByProduct[item.product].sales += (parseFloat(item.sales) || 0);
      salesByProduct[item.product].quantity += (parseInt(item.quantity) || 0);
    });
    
    // Convert to array and sort by sales (descending)
    const productData = Object.values(salesByProduct)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5); // Top 5 products
    
    return {
      timeSeriesData,
      categoryData,
      regionData,
      productData
    };
  };

  const chartData = prepareChartData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sales Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Visualizing your sales performance data</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
              Export Data
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
              <select 
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select 
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {filters.categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
              <select 
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="all">All Regions</option>
                {filters.regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Total Sales</h3>
              <span className="p-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${(summary.totalSales / 1000).toFixed(1)}k</span>
              <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+24.8%</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Total Orders</h3>
              <span className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{summary.totalQuantity.toLocaleString()}</span>
              <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+18.2%</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Average Order</h3>
              <span className="p-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${summary.averageOrderValue.toFixed(2)}</span>
              <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+5.3%</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Conversion Rate</h3>
              <span className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">3.6%</span>
              <span className="ml-2 text-sm font-medium text-red-600 dark:text-red-400">-0.8%</span>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`py-4 px-6 font-medium ${activeTab === 'revenue' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('revenue')}
            >
              Revenue
            </button>
            <button
              className={`py-4 px-6 font-medium ${activeTab === 'orders' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button
              className={`py-4 px-6 font-medium ${activeTab === 'insights' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('insights')}
            >
              Insights
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'revenue' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DashboardOverviewChart 
                  data={chartData.timeSeriesData} 
                  title="Revenue Overview"
                />
              </motion.div>
            )}
            
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BarChartComponent 
                  data={chartData.categoryData} 
                  dataKey="quantity" 
                  categoryKey="category" 
                  title="Orders by Category"
                  colors={['#10B981']}
                />
              </motion.div>
            )}
            
            {activeTab === 'insights' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AreaChartComponent 
                  data={chartData.timeSeriesData} 
                  dataKeys={['sales']} 
                  title="Sales Trend Analysis"
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <PieChartComponent 
              data={chartData.regionData} 
              dataKey="sales" 
              nameKey="name" 
              title="Sales by Region"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <BarChartComponent 
              data={chartData.productData} 
              dataKey="sales" 
              categoryKey="product" 
              title="Top Products"
              colors={['#8B5CF6']}
            />
          </motion.div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {dashboardData && dashboardData.rawData && dashboardData.rawData.slice(0, 5).map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">#{(7890 + index).toString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${order.sales}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        index % 3 === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        index % 5 === 0 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {index % 3 === 0 ? 'Processing' : index % 5 === 0 ? 'Cancelled' : 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
                
                {(!dashboardData || !dashboardData.rawData || dashboardData.rawData.length === 0) && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No order data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
