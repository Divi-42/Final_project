import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateSampleData } from '../utils/csvParser';
import { 
  TimeSeriesChart, 
  BarChartComponent, 
  PieChartComponent
} from '../components/Charts';

const Demo = () => {
  const [demoData, setDemoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState('retail');

  useEffect(() => {
    // Generate sample data based on selected dataset
    setIsLoading(true);
    const data = generateSampleData(selectedDataset);
    setDemoData(data);
    setIsLoading(false);
  }, [selectedDataset]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading demo data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Interactive Demo</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our dashboard features with sample data
            </p>
          </div>
          
          {/* Dataset Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Select Sample Dataset</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                className={`p-4 rounded-lg border-2 transition-colors duration-300 ${
                  selectedDataset === 'retail' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
                onClick={() => setSelectedDataset('retail')}
              >
                <h3 className="font-medium mb-1 text-gray-900 dark:text-white">Retail Sales</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Multi-category retail store data</p>
              </button>
              
              <button
                className={`p-4 rounded-lg border-2 transition-colors duration-300 ${
                  selectedDataset === 'ecommerce' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
                onClick={() => setSelectedDataset('ecommerce')}
              >
                <h3 className="font-medium mb-1 text-gray-900 dark:text-white">E-commerce</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Online store performance metrics</p>
              </button>
              
              <button
                className={`p-4 rounded-lg border-2 transition-colors duration-300 ${
                  selectedDataset === 'marketing' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
                onClick={() => setSelectedDataset('marketing')}
              >
                <h3 className="font-medium mb-1 text-gray-900 dark:text-white">Marketing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Campaign performance data</p>
              </button>
              
              <button
                className={`p-4 rounded-lg border-2 transition-colors duration-300 ${
                  selectedDataset === 'sales' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
                onClick={() => setSelectedDataset('sales')}
              >
                <h3 className="font-medium mb-1 text-gray-900 dark:text-white">Sales Team</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sales rep performance metrics</p>
              </button>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${(demoData?.summary?.totalSales / 1000).toFixed(1)}k
                </span>
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
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {demoData?.summary?.totalQuantity.toLocaleString()}
                </span>
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
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${demoData?.summary?.averageOrderValue.toFixed(2)}
                </span>
                <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+5.3%</span>
              </div>
            </motion.div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <TimeSeriesChart 
                data={demoData?.charts?.salesByDate || []} 
                title="Sales Over Time"
                colors={['#3B82F6']}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              {selectedDataset === 'marketing' ? (
                <BarChartComponent 
                  data={demoData?.rawData
                    ?.reduce((acc, item) => {
                      const existing = acc.find(x => x.campaign === item.campaign);
                      if (existing) {
                        existing.sales += parseFloat(item.sales) || 0;
                      } else {
                        acc.push({
                          category: item.campaign,
                          sales: parseFloat(item.sales) || 0
                        });
                      }
                      return acc;
                    }, [])
                    ?.sort((a, b) => b.sales - a.sales)
                    ?.slice(0, 5) || []
                  }
                  dataKey="sales"
                  categoryKey="category"
                  title="Sales by Campaign"
                  colors={['#F59E0B']}
                />
              ) : selectedDataset === 'sales' ? (
                <BarChartComponent 
                  data={demoData?.rawData
                    ?.reduce((acc, item) => {
                      const existing = acc.find(x => x.salesRep === item.salesRep);
                      if (existing) {
                        existing.sales += parseFloat(item.sales) || 0;
                      } else {
                        acc.push({
                          category: item.salesRep,
                          sales: parseFloat(item.sales) || 0
                        });
                      }
                      return acc;
                    }, [])
                    ?.sort((a, b) => b.sales - a.sales)
                    ?.slice(0, 5) || []
                  }
                  dataKey="sales"
                  categoryKey="category"
                  title="Sales by Representative"
                  colors={['#8B5CF6']}
                />
              ) : (
                <BarChartComponent 
                  data={demoData?.charts?.salesByCategory?.filter(item => item.sales > 0) || []}
                  dataKey="sales"
                  categoryKey="category"
                  title="Sales by Category"
                  colors={selectedDataset === 'ecommerce' ? ['#10B981'] : ['#3B82F6']}
                />
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <PieChartComponent 
                data={selectedDataset === 'marketing' 
                  ? demoData?.rawData
                      ?.reduce((acc, item) => {
                        const existing = acc.find(x => x.region === item.region);
                        if (existing) {
                          existing.sales += parseFloat(item.sales) || 0;
                        } else {
                          acc.push({ region: item.region, sales: parseFloat(item.sales) || 0 });
                        }
                        return acc;
                      }, [])
                      ?.sort((a, b) => b.sales - a.sales) || []
                  : selectedDataset === 'sales' ?
                      demoData?.rawData
                        ?.reduce((acc, item) => {
                          const existing = acc.find(x => x.region === item.region);
                          if (existing) {
                            existing.sales += parseFloat(item.sales) || 0;
                          } else {
                            acc.push({ region: item.region, sales: parseFloat(item.sales) || 0 });
                          }
                          return acc;
                        }, [])
                        ?.sort((a, b) => b.sales - a.sales) || []
                  : demoData?.charts?.salesByRegion?.filter(item => item.sales > 0) || []
                }
                dataKey="sales"
                nameKey="region"
                title="Sales by Region"
                colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <BarChartComponent 
                data={selectedDataset === 'sales' ?
                  demoData?.rawData
                    ?.reduce((acc, item) => {
                      const existing = acc.find(x => x.product === item.product);
                      if (existing) {
                        existing.sales += parseFloat(item.sales) || 0;
                      } else {
                        acc.push({ channel: item.product, sales: parseFloat(item.sales) || 0 });
                      }
                      return acc;
                    }, [])
                    ?.sort((a, b) => b.sales - a.sales)
                    ?.slice(0, 5) || []
                  :
                  demoData?.rawData
                    ?.filter(item => item.channel && item.sales > 0)
                    ?.reduce((acc, item) => {
                      const existing = acc.find(x => x.channel === item.channel);
                      if (existing) {
                        existing.sales += parseFloat(item.sales) || 0;
                      } else {
                        acc.push({ channel: item.channel, sales: parseFloat(item.sales) || 0 });
                      }
                      return acc;
                    }, [])
                    ?.sort((a, b) => b.sales - a.sales) || []
                }
                dataKey="sales"
                categoryKey="channel"
                title={selectedDataset === 'sales' ? 'Sales by Product' : 'Sales by Channel'}
                colors={['#8B5CF6']}
              />
            </motion.div>
          </div>
          
          {/* Features Showcase */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Dashboard Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Interactive Charts</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hover, click, and interact with all charts to explore your data in detail.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Advanced Filtering</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Filter your data by date, category, region, and more to focus on what matters.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Multiple Visualizations</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View your data through different chart types to gain comprehensive insights.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Real-time Updates</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      See your data update in real-time as you make changes or upload new information.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Data Security</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your data never leaves your browser, ensuring complete privacy and security.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Customizable Themes</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Switch between light and dark mode to suit your preferences and working environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ready to visualize your own data?
            </p>
            <a 
              href="/upload"
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg inline-block"
            >
              Upload Your CSV Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
