import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChartComponent, PieChartComponent } from '../components/Charts';
import { generateSampleData } from '../utils/csvParser';

const Insights = () => {
  const [activeSection, setActiveSection] = useState('trends');
  const [insightsData, setInsightsData] = useState(null);

  useEffect(() => {
    const data = generateSampleData('retail');
    setInsightsData(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Data Insights</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover actionable insights based on your sales data
            </p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              className={`py-3 px-6 font-medium ${activeSection === 'trends' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveSection('trends')}
            >
              Trend Analysis
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeSection === 'recommendations' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveSection('recommendations')}
            >
              Recommendations
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeSection === 'checklist' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveSection('checklist')}
            >
              Action Checklist
            </button>
          </div>
          
          {/* Trends Section */}
          {activeSection === 'trends' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Trend Analysis</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We've identified key trends in your sales data to help you understand patterns and make informed decisions.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Sales by Category</h3>
                    <div className="h-64">
                      <BarChartComponent 
                        data={insightsData?.charts?.salesByCategory?.filter(item => item.sales > 0) || []}
                        dataKey="sales"
                        categoryKey="category"
                        colors={['#3B82F6']}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Regional Performance</h3>
                    <div className="h-64">
                      <PieChartComponent 
                        data={insightsData?.charts?.salesByRegion?.filter(item => item.sales > 0) || []}
                        dataKey="sales"
                        nameKey="region"
                        colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Key Insights</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                      <div className="flex items-start">
                        <div className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Electronics Category Growth</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Electronics sales have increased by 32% year-over-year, outperforming all other categories.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                      <div className="flex items-start">
                        <div className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Declining Western Region</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Sales in the Western region have declined by 8% in the last quarter, requiring attention.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Seasonal Pattern Detected</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Strong seasonal pattern identified with peaks in December and July, suggesting opportunity for seasonal promotions.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                      <div className="flex items-start">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full mr-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Product Bundle Impact</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Product bundles introduced in Q2 have increased average order value by 24%, suggesting expansion of bundling strategy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Recommendations Section */}
          {activeSection === 'recommendations' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">AI-Powered Recommendations</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Based on your data patterns and industry benchmarks, our AI has generated these actionable recommendations.
                </p>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Inventory Optimization</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Your current inventory levels for top-selling products are frequently depleted before restocking, potentially causing lost sales opportunities.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendation:</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          Increase safety stock levels for your top 5 products by 25% and implement an automated reordering system with dynamic thresholds based on sales velocity.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Potential Impact:</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">+8.3% Revenue</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-purple-50 dark:bg-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Cross-Selling Strategy</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Analysis shows strong correlation between certain product pairs, but your current cross-selling strategy doesn't capitalize on these patterns.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendation:</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          Implement targeted cross-selling for the 10 highest-correlation product pairs through bundle discounts and "frequently bought together" promotions.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Potential Impact:</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">+12.7% AOV</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-green-50 dark:bg-green-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Regional Marketing Focus</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        The Western region shows declining performance while having the highest customer acquisition cost among all regions.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendation:</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          Reallocate 30% of Western region marketing budget to the high-performing Northern region, and focus Western campaigns on retention rather than acquisition.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Potential Impact:</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">+15.2% ROI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Checklist Section */}
          {activeSection === 'checklist' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Action Checklist</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Based on our analysis, here are the recommended actions to improve your sales performance. Check them off as you complete them.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Adjust inventory levels for top 5 products</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Increase safety stock by 25% to prevent stockouts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Create product bundle promotions</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Implement bundles for the 10 highest-correlation product pairs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Reallocate marketing budget</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Shift 30% from Western to Northern region campaigns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Prepare for seasonal peaks</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Plan promotions and inventory for December and July peaks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Implement automated reordering system</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Set up dynamic thresholds based on sales velocity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Develop retention campaign for Western region</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Focus on customer loyalty and repeat purchases</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">Expand Electronics category offerings</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Capitalize on 32% YoY growth in this category</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                    Export Action Plan
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;
