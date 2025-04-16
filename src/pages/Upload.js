import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FileUploader from '../components/FileUploader';

const Upload = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [processedData, setProcessedData] = useState(null);
  const navigate = useNavigate();

  const handleDataProcessed = (data) => {
    setProcessedData(data);
  };

  const handleGoToDashboard = () => {
    // In a real application, we would store the processed data in a global state or context
    // For now, we'll use localStorage to simulate this
    if (processedData) {
      localStorage.setItem('dashboardData', JSON.stringify(processedData));
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">Upload Your CSV Data</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center">
            Transform your sales data into beautiful, interactive visualizations
          </p>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
            <button
              className={`py-3 px-6 ${activeTab === 'upload' 
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload CSV
            </button>
            <button
              className={`py-3 px-6 ${activeTab === 'format' 
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('format')}
            >
              CSV Format
            </button>
            <button
              className={`py-3 px-6 ${activeTab === 'examples' 
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('examples')}
            >
              Examples
            </button>
          </div>

          {/* Upload Tab Content */}
          {activeTab === 'upload' && (
            <div>
              <FileUploader onDataProcessed={handleDataProcessed} />
              
              {processedData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 text-center"
                >
                  <button
                    onClick={handleGoToDashboard}
                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                  >
                    Go to Dashboard
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* Format Tab Content */}
          {activeTab === 'format' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">CSV Format Requirements</h3>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Basic Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>File must be in CSV format (comma-separated values)</li>
                  <li>First row should contain column headers</li>
                  <li>File size should not exceed 10MB</li>
                  <li>UTF-8 encoding is recommended</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Required Columns for Sales Data:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Date (in YYYY-MM-DD format)</li>
                  <li>Product or Service Name</li>
                  <li>Category or Department</li>
                  <li>Region or Location</li>
                  <li>Sales Amount (numeric)</li>
                  <li>Quantity (numeric)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Example CSV Format:</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded font-mono text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  <pre>Date,Product,Category,Region,Sales,Quantity
2023-01-15,Widget A,Electronics,North,1200,24
2023-01-16,Widget B,Electronics,South,950,19
2023-01-17,Widget A,Electronics,East,1400,28
2023-01-18,Widget C,Accessories,West,800,16
2023-01-19,Widget B,Electronics,North,1100,22</pre>
                </div>
              </div>
            </motion.div>
          )}

          {/* Examples Tab Content */}
          {activeTab === 'examples' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Example Datasets</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Don't have your own data? Download one of our sample datasets to try out the dashboard features.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                  <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Retail Sales Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    12 months of retail sales data across multiple product categories and regions.
                  </p>
                  <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
                    Download CSV
                  </button>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                  <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">E-commerce Performance</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Online store performance metrics including sales, traffic, and conversion rates.
                  </p>
                  <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
                    Download CSV
                  </button>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                  <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Marketing Campaign Results</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Performance data from multiple marketing campaigns across different channels.
                  </p>
                  <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
                    Download CSV
                  </button>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                  <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Sales Team Performance</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Sales metrics for a team of representatives across different territories.
                  </p>
                  <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
                    Download CSV
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <Link
                  to="/demo"
                  className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  Try Demo with Sample Data
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
