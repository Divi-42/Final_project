import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { parseCSV, validateCSVData, processCSVData } from '../utils/csvParser';

const FileUploader = ({ onDataProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (selectedFile) => {
    // Reset states
    setError(null);
    setIsLoading(true);
    setFile(selectedFile);
    
    try {
      // Parse the CSV file
      const parsedData = await parseCSV(selectedFile);
      
      // Validate the data structure
      const validationResult = validateCSVData(parsedData);
      
      if (!validationResult.isValid) {
        setError(validationResult.errors.join(', '));
        setIsLoading(false);
        return;
      }
      
      // Process the data for visualization
      const processedData = processCSVData(parsedData);
      
      // Set preview data for display
      setPreviewData({
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        rowCount: parsedData.length,
        columnCount: Object.keys(parsedData[0] || {}).length,
        previewRows: parsedData.slice(0, 5)
      });
      
      // Pass the processed data to the parent component
      if (onDataProcessed) {
        onDataProcessed(processedData);
      }
      
    } catch (err) {
      console.error('Error processing CSV file:', err);
      setError('Failed to process the CSV file. Please check the file format and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewData(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onDataProcessed) {
      onDataProcessed(null);
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            isDragging 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-700'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <svg 
            className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Drag and drop your CSV file here, or <span className="text-blue-600 dark:text-blue-400 cursor-pointer" onClick={() => fileInputRef.current.click()}>browse</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Supports CSV files up to 10MB
          </p>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            Select CSV File
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Processing your file...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="inline-block rounded-full h-12 w-12 bg-red-100 dark:bg-red-900/20 text-red-500 flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error Processing File</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <button 
                onClick={handleReset}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          ) : previewData && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{previewData.fileName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(previewData.fileSize / 1024).toFixed(2)} KB • {previewData.columnCount} columns • {previewData.rowCount} rows
                  </p>
                </div>
                <button 
                  onClick={handleReset}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      {previewData.previewRows[0] && Object.keys(previewData.previewRows[0]).map((column, index) => (
                        <th 
                          key={index}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {previewData.previewRows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((cell, cellIndex) => (
                          <td 
                            key={cellIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                          >
                            {cell !== null && cell !== undefined ? String(cell) : ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Your file has been successfully processed and is ready for visualization.
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FileUploader;
