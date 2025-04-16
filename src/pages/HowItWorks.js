import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FadeInView, 
  AnimatedTabs,
  ScrollTriggeredAnimation,
  HoverCard,
  AnimatedProgressBar
} from '../components/Animations';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('upload');
  
  const tabs = [
    { id: 'upload', label: 'Upload Data' },
    { id: 'visualize', label: 'Visualize' },
    { id: 'analyze', label: 'Analyze' },
    { id: 'share', label: 'Share Insights' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInView>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
              How It Works
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center">
              Transform your CSV data into beautiful visualizations in just a few simple steps
            </p>
          </FadeInView>
          
          {/* Animated Tabs */}
          <div className="mb-12">
            <AnimatedTabs 
              tabs={tabs} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              className="justify-center"
            />
          </div>
          
          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
            {activeTab === 'upload' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Step 1: Upload Your CSV Data</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Start by uploading your CSV sales data file. Our platform accepts standard CSV formats with headers.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Supported Data:</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Sales data with date, product, and revenue information</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Regional or category-based performance metrics</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Time-series data for trend analysis</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Upload Features:</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Drag-and-drop file upload</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Automatic data validation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Preview before processing</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    to="/upload" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
                  >
                    Try Uploading Now
                  </Link>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'visualize' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Step 2: Visualize Your Data</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Once your data is uploaded, our system automatically transforms it into interactive visualizations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Visualization Types:</h3>
                    <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium block">Line Charts</span>
                          <span className="text-sm">Perfect for time-series data and trends</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 mr-3 mt-0.5">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium block">Bar Charts</span>
                          <span className="text-sm">Ideal for category comparisons</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3 mt-0.5">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium block">Pie & Donut Charts</span>
                          <span className="text-sm">Great for showing proportions</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Visualization Features:</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Interactive Tooltips</span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">100%</span>
                        </div>
                        <AnimatedProgressBar value={100} color="blue" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Animated Transitions</span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">95%</span>
                        </div>
                        <AnimatedProgressBar value={95} color="green" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Responsive Design</span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">100%</span>
                        </div>
                        <AnimatedProgressBar value={100} color="purple" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode Support</span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">100%</span>
                        </div>
                        <AnimatedProgressBar value={100} color="blue" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    to="/demo" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
                  >
                    See Visualizations Demo
                  </Link>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'analyze' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Step 3: Analyze Your Data</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore your data through interactive filters and gain valuable insights from your visualizations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Analysis Tools:</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span>Dynamic filtering by date, category, and region</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span>Comparative analysis between time periods</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span>Trend identification and forecasting</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span>Performance metrics and KPI tracking</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Insights You'll Gain:</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Sales Trends</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Identify seasonal patterns and growth trends in your sales data
                        </p>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Product Performance</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Discover your top-performing products and categories
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Regional Analysis</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Compare performance across different regions and markets
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    to="/dashboard" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
                  >
                    Explore Dashboard Features
                  </Link>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'share' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Step 4: Share Your Insights</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Share your visualizations and insights with your team or stakeholders to drive data-informed decisions.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <HoverCard className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                    <div className="text-blue-500 mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Export Images</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Download high-quality images of your visualizations for presentations
                    </p>
                  </HoverCard>
                  
                  <HoverCard className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                    <div className="text-green-500 mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">PDF Reports</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Generate comprehensive PDF reports with all your visualizations
                    </p>
                  </HoverCard>
                  
                  <HoverCard className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                    <div className="text-purple-500 mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Shareable Links</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Create shareable links to your interactive dashboard
                    </p>
                  </HoverCard>
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    to="/upload" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
                  >
                    Start Creating Now
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Process Flow */}
          <ScrollTriggeredAnimation animation="fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                The Complete Process
              </h2>
              
              <div className="relative">
                {/* Process line */}
                <div 
                  className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-900 transform -translate-x-1/2 z-0"
                  style={{
                    height: '100%'
                  }}
                ></div>
                
                <div className="space-y-12">
                  <div className="relative flex flex-col md:flex-row items-center">
                    <div className="flex items-center justify-center z-20 w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xl font-bold mb-4 md:mb-0">
                      1
                    </div>
                    <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-none z-10 bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Your CSV File</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Simply drag and drop your CSV file or use the file browser to upload your sales data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row items-center md:flex-row-reverse">
                    <div className="flex items-center justify-center z-20 w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xl font-bold mb-4 md:mb-0">
                      2
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left order-1 md:order-none z-10 bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Automatic Data Processing</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Our system automatically processes and validates your data, preparing it for visualization.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row items-center">
                    <div className="flex items-center justify-center z-20 w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-xl font-bold mb-4 md:mb-0">
                      3
                    </div>
                    <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-none z-10 bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive Dashboard Generation</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your data is transformed into an interactive dashboard with multiple visualization types.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row items-center md:flex-row-reverse">
                    <div className="flex items-center justify-center z-20 w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 text-xl font-bold mb-4 md:mb-0">
                      4
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left order-1 md:order-none z-10 bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Explore and Analyze</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Use filters and interactive elements to explore your data and uncover valuable insights.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row items-center">
                    <div className="flex items-center justify-center z-20 w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-xl font-bold mb-4 md:mb-0">
                      5
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left order-1 md:order-none z-10 bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Share and Export</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Share your visualizations with others or export them for presentations and reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollTriggeredAnimation>
          
          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ready to transform your data into beautiful visualizations?
            </p>
            <Link 
              to="/upload" 
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg inline-block"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
