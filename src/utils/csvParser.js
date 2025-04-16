import Papa from 'papaparse';

/**
 * Parse CSV data using Papaparse
 * @param {File} file - The CSV file to parse
 * @returns {Promise} - Promise that resolves with the parsed data
 */
export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true, // First row will be treated as header
      dynamicTyping: true, // Automatically convert numeric values
      skipEmptyLines: true, // Skip empty lines
      complete: (results) => {
        if (results.errors.length) {
          reject(results.errors);
        } else {
          resolve(results.data);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

/**
 * Validate CSV data structure
 * @param {Array} data - The parsed CSV data
 * @returns {Object} - Validation result with status and errors if any
 */
export const validateCSVData = (data) => {
  const result = {
    isValid: true,
    errors: []
  };

  // Check if data is empty
  if (!data || data.length === 0) {
    result.isValid = false;
    result.errors.push('CSV file is empty');
    return result;
  }

  // Check if data has required columns for sales data
  const requiredColumns = ['date', 'product', 'category', 'region', 'sales', 'quantity'];
  const firstRow = data[0];
  const headers = Object.keys(firstRow).map(header => header.toLowerCase());
  
  const missingColumns = requiredColumns.filter(col => 
    !headers.some(header => header.includes(col))
  );

  if (missingColumns.length > 0) {
    result.isValid = false;
    result.errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  return result;
};

/**
 * Process and transform CSV data for visualization
 * @param {Array} data - The parsed CSV data
 * @returns {Object} - Processed data ready for visualization
 */
export const processCSVData = (data) => {
  // Normalize column names (handle different naming conventions)
  const normalizedData = data.map(row => {
    const newRow = {};
    
    // Iterate through each key in the row
    Object.keys(row).forEach(key => {
      const lowerKey = key.toLowerCase();
      
      // Map common column names to standardized names
      if (lowerKey.includes('date')) newRow.date = row[key];
      else if (lowerKey.includes('product')) newRow.product = row[key];
      else if (lowerKey.includes('category') || lowerKey.includes('department')) newRow.category = row[key];
      else if (lowerKey.includes('region') || lowerKey.includes('location')) newRow.region = row[key];
      else if (lowerKey.includes('sales') || lowerKey.includes('revenue') || lowerKey.includes('amount')) newRow.sales = row[key];
      else if (lowerKey.includes('quantity') || lowerKey.includes('units')) newRow.quantity = row[key];
      else newRow[key] = row[key]; // Keep other columns as is
    });
    
    return newRow;
  });

  // Extract unique values for filters
  const categories = [...new Set(normalizedData.map(item => item.category))].filter(Boolean);
  const regions = [...new Set(normalizedData.map(item => item.region))].filter(Boolean);
  const products = [...new Set(normalizedData.map(item => item.product))].filter(Boolean);
  
  // Calculate summary statistics
  const totalSales = normalizedData.reduce((sum, item) => sum + (parseFloat(item.sales) || 0), 0);
  const totalQuantity = normalizedData.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
  const averageOrderValue = totalQuantity > 0 ? totalSales / totalQuantity : 0;
  
  // Group data by different dimensions for charts
  const salesByCategory = categories.map(category => {
    const categorySales = normalizedData
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + (parseFloat(item.sales) || 0), 0);
    
    return { category, sales: categorySales };
  });
  
  const salesByRegion = regions.map(region => {
    const regionSales = normalizedData
      .filter(item => item.region === region)
      .reduce((sum, item) => sum + (parseFloat(item.sales) || 0), 0);
    
    return { region, sales: regionSales };
  });
  
  // Process time series data if date column exists
  let salesByDate = [];
  if (normalizedData[0]?.date) {
    // Group by date and sum sales
    const salesByDateMap = normalizedData.reduce((acc, item) => {
      const date = item.date;
      if (!date) return acc;
      
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += (parseFloat(item.sales) || 0);
      return acc;
    }, {});
    
    // Convert to array and sort by date
    salesByDate = Object.entries(salesByDateMap)
      .map(([date, sales]) => ({ date, sales }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  
  // Return processed data
  return {
    rawData: normalizedData,
    summary: {
      totalSales,
      totalQuantity,
      averageOrderValue,
      uniqueProducts: products.length,
      uniqueCategories: categories.length,
      uniqueRegions: regions.length
    },
    filters: {
      categories,
      regions,
      products
    },
    charts: {
      salesByCategory,
      salesByRegion,
      salesByDate
    }
  };
};

/**
 * Generate sample data for demo purposes
 * @param {string} datasetType - Type of sample dataset to generate
 * @returns {Object} - Processed sample data
 */
export const generateSampleData = (datasetType = 'retail') => {
  let sampleData = [];
  
  // Generate dates for the last 12 months
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates.reverse();
  };
  
  const dates = generateDates();
  
  if (datasetType === 'retail') {
    const categories = ['Electronics', 'Clothing', 'Home Goods', 'Accessories'];
    const regions = ['North', 'South', 'East', 'West'];
    const channels = ['In-Store', 'Online', 'TeleSales', 'Franchise', 'Wholesale'];
    const products = {
      'Electronics': ['Smartphone', 'Laptop', 'Tablet', 'Headphones'],
      'Clothing': ['T-Shirt', 'Jeans', 'Dress', 'Jacket'],
      'Home Goods': ['Sofa', 'Bed', 'Table', 'Chair'],
      'Accessories': ['Watch', 'Bag', 'Wallet', 'Sunglasses']
    };
    
    // Generate sample retail data
    dates.forEach(date => {
      categories.forEach(category => {
        regions.forEach(region => {
          channels.forEach(channel => {
            products[category].forEach(product => {
              // Random sales between 1000 and 10000
              const sales = Math.floor(Math.random() * 9000) + 1000;
              // Random quantity between 10 and 100
              const quantity = Math.floor(Math.random() * 90) + 10;
              
              sampleData.push({
                date,
                category,
                region,
                channel,
                product,
                sales,
                quantity
              });
            });
          });
        });
      });
    });
  } else if (datasetType === 'ecommerce') {
    const categories = ['Electronics', 'Fashion', 'Home Decor', 'Beauty', 'Books'];
    const regions = ['North America', 'Europe', 'Asia', 'Oceania', 'South America'];
    const channels = ['Direct', 'SEO Traffic', 'Paid Search', 'Social Media', 'Email'];
    const products = {
      'Electronics': ['Smartphones', 'Laptops', 'Tablets', 'Headphones'],
      'Fashion': ['T-Shirts', 'Jeans', 'Dresses', 'Shoes'],
      'Home Decor': ['Furniture', 'Decor', 'Kitchenware', 'Bedding'],
      'Beauty': ['Skincare', 'Makeup', 'Haircare', 'Fragrances'],
      'Books': ['Fiction', 'Non-Fiction', 'Educational', 'Children']
    };
    
    // Generate sample ecommerce data
    dates.forEach(date => {
      categories.forEach(category => {
        regions.forEach(region => {
          channels.forEach(channel => {
            products[category].forEach(product => {
              // Random sales between 1000 and 10000 for more realistic data
              const sales = Math.floor(Math.random() * 9000) + 1000;
              // Random quantity between 10 and 100
              const quantity = Math.floor(Math.random() * 90) + 10;
              // Random visitors between 100 and 1000
              const visitors = Math.floor(Math.random() * 900) + 100;
              // Random conversion rate between 1% and 10%
              const conversionRate = (Math.random() * 9 + 1).toFixed(2);
              
              sampleData.push({
                date,
                category,
                region,
                channel,
                product,
                sales,
                quantity,
                visitors,
                conversionRate
              });
            });
          });
        });
      });
    });
  } else if (datasetType === 'marketing') {
    const campaigns = ['Sale', 'Holiday Deal', 'New Launch', 'Clearance'];
    const channels = ['Social Ads', 'Search Ads', 'Display Ads', 'Email', 'Influencer']
    ;
    const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
    
    // Generate sample marketing data
    dates.forEach(date => {
      campaigns.forEach(campaign => {
        regions.forEach(region => {
          channels.forEach(channel => {
            // Random spend between 1000 and 10000
            const spend = Math.floor(Math.random() * 9000) + 1000;
            // Random impressions between 10000 and 100000
            const impressions = Math.floor(Math.random() * 90000) + 10000;
            // Random clicks between 100 and 5000
            const clicks = Math.floor(Math.random() * 4900) + 100;
            // Random conversions between 10 and 500
            const conversions = Math.floor(Math.random() * 490) + 10;
            // Random revenue/sales between 5000 and 50000
            const sales = Math.floor(Math.random() * 45000) + 5000;
            
            sampleData.push({
              date,
              campaign,
              region,
              channel,
              spend,
              impressions,
              clicks,
              conversions,
              sales,
              quantity: conversions // Using conversions as quantity for consistency
            });
          });
        });
      });
    });
  } else if (datasetType === 'sales') {
    const salesReps = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'Robert Wilson'];
    const regions = ['North', 'South', 'East', 'West'];
    const products = ['Product X', 'Product Y', 'Product Z', 'Service A', 'Service B'];
    
    // Generate sample sales team data
    dates.forEach(date => {
      salesReps.forEach(salesRep => {
        regions.forEach(region => {
          products.forEach(product => {
            // Random sales between 1000 and 10000
            const sales = Math.floor(Math.random() * 9000) + 1000;
            // Random quantity between 1 and 10
            const quantity = Math.floor(Math.random() * 9) + 1;
            // Random meetings between 1 and 10
            const meetings = Math.floor(Math.random() * 9) + 1;
            // Random calls between 5 and 30
            const calls = Math.floor(Math.random() * 25) + 5;
            
            sampleData.push({
              date,
              salesRep,
              region,
              product,
              sales,
              quantity,
              meetings,
              calls
            });
          });
        });
      });
    });
  }
  
  // Process the sample data using the same function as real data
  return processCSVData(sampleData);
};
